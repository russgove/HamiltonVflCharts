import * as React from 'react';
import styles from './HamiltonVflChart2.module.scss';
import { IHamiltonVflChart2Props } from './IHamiltonVflChart2Props';
import { escape, fromPairs } from '@microsoft/sp-lodash-subset';
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Label } from "office-ui-fabric-react/lib/Label";

import { groupBy, countBy, reduce, uniqWith, isEqual, uniq, map } from 'lodash';
import { Item } from '../../../dataModel';

import { format } from 'date-fns';
import { autobind } from '@uifabric/utilities/lib';
import { createPortal } from 'react-dom';
export default class HamiltonVflChart2 extends React.Component<IHamiltonVflChart2Props, {}> {
  private chartData: any = {};
  public componentWillReceiveProps(newProps: IHamiltonVflChart2Props, oldProps: IHamiltonVflChart2Props) {

    this.render();

  }
  @autobind
  public onClick(c: any, i: any): void {
    debugger;
    const chart: any = i[0]._chart;
    chart.getElementAtEvent(c);
    var firstPoint = chart.getElementAtEvent(c)[0];
    if (firstPoint) {
      var label = chart.data.labels[firstPoint._index];
      let year = label.substr(4, 2);
      let monthName = label.substr(0, 3);
      var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(monthName) / 3 + 1;
      var datasetLabel = chart.data.datasets[firstPoint._datasetIndex].label;
      let url = `${this.props.listUrl}/${this.props.viewName}.aspx?FilterField1=${this.props.majorGroup}&FilterValue1=${datasetLabel}&FilterField3=VFL_Month&FilterValue3=${month}&FilterType3=Text&FilterField2=VFL_Year&FilterValue2=${year}&FilterType2=Text`;
      window.open(url, "_blank");
    }
  }
  public render(): React.ReactElement<IHamiltonVflChart2Props> {
    debugger;

    //get a list of unique values to sum by. These will be the individual bars, or bar segment(if stacked).
    // the legend for thes displays across the top of the page
    let uniqMajorGroups: string[] = uniq(map(this.props.items, x => {
      return x[this.props.majorGroup] ? x[this.props.majorGroup] : "{null}";// give the null values a label so we can index them
    }));

    let uniqMinorGroups: string[] = uniq(map(this.props.items, x => {
      return x[this.props.minorGroup] ? x[this.props.minorGroup] : "{null}";// give the null values a label so we can index them
    }));

    // create the memo object used by  the reducer
    let initMemo = {};
    for (var majorGroup of uniqMajorGroups) {
      initMemo[majorGroup] = {};
      for (var minorGroup of uniqMinorGroups) {
        initMemo[majorGroup][minorGroup] = 0;
      }
    }

    // reduce (summarize) the data
    let results = reduce(this.props.items, (memo, curr: Item) => {
      let major = curr[this.props.majorGroup] == null ? "{null}" : curr[this.props.majorGroup];
      let minr = curr[this.props.minorGroup] == null ? "{null}" : curr[this.props.minorGroup];
      memo[major][minr] += 1;
      return memo;
    }, initMemo);
    debugger;
    // create the charData 

    this.chartData.labels = uniqMinorGroups;

    this.chartData.datasets = [];
    for (var result in results) {
      let dataset = { label: result, data: [] };
      if (this.props.majorGroupFieldValueColors[result]) {
        dataset["backgroundColor"] = this.props.majorGroupFieldValueColors[result];
      }
      for (var minor of uniqMinorGroups) {
        dataset.data.push(results[result][minor]);
      }
      this.chartData.datasets.push(dataset);
    }

    // onterpoloate the title
    debugger;
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
    for (var res in results) {
      let copy = results[res];
      copy.title = res;
      resultArray.push(copy);
    }
    let cols: Array<IColumn> = [{ key: 'title', name: '', fieldName: 'title', minWidth: 72, isResizable: true }];
    for (var lbl of uniqMinorGroups) {
      cols.push({
        key: lbl, name: lbl, fieldName: lbl, minWidth: 72, isResizable: true
      });
    }

    return (
      <div className={styles.hamiltonVflChart2}>
        <ChartControl type={ChartType.Bar}
          data={this.chartData}
          options={chartOptions}
          onClick={this.onClick}
        />
        <Label className={styles.header} >{chartTitle + " (details)"} </Label>
        <DetailsList items={resultArray} columns={cols}

        >

        </DetailsList>
      </div>
    );
  }
}