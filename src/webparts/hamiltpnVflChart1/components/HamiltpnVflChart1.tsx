import * as React from 'react';
import styles from './HamiltpnVflChart1.module.scss';
import { IHamiltpnVflChart1Props } from './IHamiltpnVflChart1Props';

import { ChartControl, ChartType } from "@pnp/spfx-controls-react";
import { escape, isEqual, groupBy, countBy, reduce, map, uniqBy, uniq } from 'lodash';
import { VFL } from '../../../dataModel';
import { memoize } from '@uifabric/utilities/lib';
import { PropertyPaneSlider } from '@microsoft/sp-webpart-base';
export default class HamiltpnVflChart1 extends React.Component<IHamiltpnVflChart1Props, {}> {
  public componentWillReceiveProps(newProps: IHamiltpnVflChart1Props, oldProps: IHamiltpnVflChart1Props) {
    debugger;
    this.render();

  }
  public render(): React.ReactElement<IHamiltpnVflChart1Props> {

    debugger;

    //get a list of unique values to sum by
    let uniqMajorGroups: string[] = uniq(map(this.props.vfls, x => {
      return x[this.props.majorGroup] ? x[this.props.majorGroup] : "{null}";// give the null values a label so we can index them
    }));

    // create the memo object used by  the reducer
    let initMemo = {};
    for (var majorGroup of uniqMajorGroups) {
      initMemo[majorGroup] = {};
      for (var measure of this.props.measures) {
        initMemo[majorGroup][measure] = 0;
      }
    }

    // reduce (summarize) the data
    let results = reduce(this.props.vfls, (memo, curr: VFL) => {
      for (var measure2 of this.props.measures) {
        if (curr[this.props.majorGroup] == null) {
          memo["{null}"][measure2] += curr[measure2];
        }
        else {
          memo[curr[this.props.majorGroup]][measure2] += curr[measure2];
        }
      }
      return memo;
    }, initMemo);

    // create the charData 
    let chartData: any = {};
    chartData.labels = this.props.measures;
    chartData.datasets = [];
    for (var result in results) {
      let dataset = { label: result, data: [] };// how can i create this as a typed object?
      if (this.props.majorGroupFieldValueColors[result]) {
        dataset["backgroundColor"] = this.props.majorGroupFieldValueColors[result];
      }
      for (var measure of this.props.measures) {
        dataset.data.push(results[result][measure]);
      }
      chartData.datasets.push(dataset);
    }
    
    // onterpoloate the title
    debugger;
    let chartOptions=this.props.chartOptions;
    let chartTitle:string =chartOptions.title.text;
    chartTitle=chartTitle.replace("${startDate}",this.props.startDate.toLocaleDateString());
    chartTitle=chartTitle.replace("${endDate}",this.props.endDate.toLocaleDateString());

    chartOptions.title.text=chartTitle;



    return (
      <div className={styles.hamiltpnVflChart1}>
        <ChartControl type={ChartType.Bar}
          data={chartData}
          options={chartOptions}
        />
      </div>
    );
  }
}
