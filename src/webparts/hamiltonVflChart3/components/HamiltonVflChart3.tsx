import * as React from 'react';
import styles from './HamiltonVflChart3.module.scss';
import { IHamiltonVflChart3Props } from './IHamiltonVflChart3Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";
import { groupBy, countBy, reduce, uniqWith, isEqual, uniq, map } from 'lodash';
import { Item } from '../../../dataModel';
import { format } from 'date-fns';
import { autobind } from '@uifabric/utilities/lib';
import { DetailsList, IColumn, DetailsListLayoutMode } from "office-ui-fabric-react/lib/DetailsList";
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class HamiltonVflChart3 extends React.Component<IHamiltonVflChart3Props, {}> {
  @autobind
  public onClick(c: any, i: any): void {

    const chart: any = i[0]._chart;
    chart.getElementAtEvent(c);
    var firstPoint = chart.getElementAtEvent(c)[0];
    if (firstPoint) {
      var label = chart.data.labels[firstPoint._index];
      let year = label.substr(4, 2);
      let monthName = label.substr(0, 3);
      var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(monthName) / 3 + 1;
      var datasetLabel = chart.data.datasets[firstPoint._datasetIndex].label;
      let url = `${this.props.listUrl}/${this.props.viewName}.aspx?useFiltersInViewXml=1&FilterField1=VFL_Year&FilterValue1=${year}&FilterType1=Text&FilterField2=VFL_Month&FilterValue2=${month}&FilterType2=Text&FilterField3=${datasetLabel}&FilterValue3=0&FilterOp3=Gt&FilterType3=Number&FilterField4=${this.props.filterField1}&FilterValue4=${this.props.filterValue1}`;
      window.open(url, "_blank");
    }
  }
  public render(): React.ReactElement<IHamiltonVflChart3Props> {
    //get a list of unique values to sum by. These will be the individual bars, or bar segment(if stacked).
    // the legend for thes displays across the top of the page
    let uniqMajorGroups: string[] = uniq(map(this.props.items, x => {
      return x[this.props.majorGroup] ? x[this.props.majorGroup] : "{null}";// give the null values a label so we can index them
    }));
    // create the memo object used by  the reducer
    let initMemo = {};
    for (var majorGroup of uniqMajorGroups) {
      initMemo[majorGroup] = {};
      for (var measure in this.props.measures) {
        initMemo[majorGroup][measure] = 0;
      }
    }

    // reduce (summarize) the data
    let results = reduce(this.props.items, (memo, curr: Item) => {
      // test filter valuesL
      if (curr[this.props.filterField1] === this.props.filterValue1) {
        for (var measure2 in this.props.measures) {
          if (curr[this.props.majorGroup] == null) {
            memo["{null}"][measure2] += (measure2 == '*') ? 1 : curr[measure2]; // if measyre us '*' just add to counter
          }
          else {
            memo[curr[this.props.majorGroup]][measure2] += (measure2 == '*') ? 1 : curr[measure2];
          }
        }
      }
      return memo;
    }, initMemo);


    // create the charData 
    let chartData: any = {};
    chartData.labels = [];
    for (var m of uniqMajorGroups) {
      chartData.labels.push(m); // these get display on the X - axes
    }

    chartData.datasets = [];
    var colorSelectpr: number = 0;
    for (var m2 in this.props.measures) {

      let dataset = {
        backgroundColor: this.props.colorPalette[colorSelectpr++],
        label: m2,
        data: []
      };

      for (var result in results) {
        dataset.data.push(results[result][m2]);
      }
      chartData.datasets.push(dataset);
    }

    // interpoloate the title

    let chartOptions = this.props.chartOptions;
    let chartTitle="";
    if (chartOptions && chartOptions.title && chartOptions.title.text) {
       chartTitle = chartOptions.title.text;
      if (this.props.startDate) {
        chartTitle = chartTitle.replace("${startDate}", this.props.startDate.toLocaleDateString());
      }
      if (this.props.endDate) {
        chartTitle = chartTitle.replace("${endDate}", this.props.endDate.toLocaleDateString());
      }

      chartOptions.title.text = chartTitle;
    }

    //extract data for grid,
    var resultArray = [];

    let cols: Array<IColumn> = [{ key: 'title', name: '', fieldName: 'title', minWidth: 150, isResizable: true }];
    for (var m3 of uniqMajorGroups) {
      cols.push({
        key: m3, name: m3, fieldName: m3, minWidth: 72, isResizable: true
      });
    }


    for (var ms in this.props.measures) {
      let x = { title: ms };
      for (var r in results) {
        x[r] = results[result][ms];
      }
      resultArray.push(x);

    }



    return (
      <div className={styles.hamiltonVflChart3}>
        <ChartControl type={ChartType.Bar}
          data={chartData}
          options={chartOptions}
          onClick={this.onClick}
        />
        <Label className={styles.header} >{chartTitle + " (details)"} </Label>
        <DetailsList items={resultArray} columns={cols}

        />

      </div>
    );
  }
}
