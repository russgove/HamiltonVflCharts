import * as React from 'react';
import styles from './HamiltonVflChart3.module.scss';
import { IHamiltonVflChart3Props } from './IHamiltonVflChart3Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";

import { groupBy, countBy, reduce, uniqWith, isEqual, uniq, map } from 'lodash';
import { VFL } from '../../../dataModel';

import { format } from 'date-fns';

export default class HamiltonVflChart3 extends React.Component<IHamiltonVflChart3Props, {}> {
  public render(): React.ReactElement<IHamiltonVflChart3Props> {
    debugger;

    //get a list of unique values to sum by. These will be the individual bars, or bar segment(if stacked).
    // the legend for thes displays across the top of the page
    let uniqMajorGroups: string[] = uniq(map(this.props.vfls, x => {
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
    // for (var measure in this.props.measures) {
    //   initMemo[measure] = {};
    //   for (var majorGroup of uniqMajorGroups) {
    //     initMemo[measure][majorGroup] = 0;
    //   }
    // }

    // reduce (summarize) the data
    let results = reduce(this.props.vfls, (memo, curr: VFL) => {
      for (var measure2 in this.props.measures) {
        if (curr[this.props.majorGroup] == null) {
          memo["{null}"][measure2] += (measure2 == '*') ? 1 : curr[measure2]; // if measyre us '*' just add to counter
        }
        else {
          memo[curr[this.props.majorGroup]][measure2] += (measure2 == '*') ? 1 : curr[measure2];
        }
      }
      return memo;
    }, initMemo);
    debugger;

    // create the charData 
    let chartData: any = {};
    chartData.labels = [];
    for (var m of uniqMajorGroups) {
      chartData.labels.push(m); // these get display on the X - axes
    }

    chartData.datasets = [];
    for (var measure in this.props.measures) {
      let dataset = { label: measure, data: [] };
      for (var result in results){
        dataset.data.push(results[result][measure]);
      }
      chartData.datasets.push(dataset);
    }

    // for (var result in results) {
    //   let dataset = { label: result, data: [] };// how can i create this as a typed object?
    //   if (this.props.majorGroupFieldValueColors[result]) {
    //     dataset["backgroundColor"] = this.props.majorGroupFieldValueColors[result];
    //   }
    //   for (var measure in this.props.measures) {
    //     dataset.data.push(results[result][measure]);
    //   }
    //   chartData.datasets.push(dataset);
    // }

    // interpoloate the title
    debugger;
    let chartOptions = this.props.chartOptions;
    let chartTitle: string = chartOptions.title.text;
    if (this.props.startDate) {
      chartTitle = chartTitle.replace("${startDate}", this.props.startDate.toLocaleDateString());
    }
    if (this.props.endDate) {
      chartTitle = chartTitle.replace("${endDate}", this.props.endDate.toLocaleDateString());
    }

    chartOptions.title.text = chartTitle;



    return (
      <div className={styles.hamiltonVflChart3}>
        <ChartControl type={ChartType.Bar}
          data={chartData}
          options={chartOptions}
        />
      </div>
    );
  }
}
