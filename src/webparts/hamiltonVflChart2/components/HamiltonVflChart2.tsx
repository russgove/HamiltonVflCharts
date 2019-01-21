import * as React from 'react';
import styles from './HamiltonVflChart2.module.scss';
import { IHamiltonVflChart2Props } from './IHamiltonVflChart2Props';
import { escape, fromPairs } from '@microsoft/sp-lodash-subset';
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";

import { groupBy, countBy, reduce, uniqWith, isEqual ,uniq,map} from 'lodash';
import { VFL } from '../../../dataModel';

import { format } from 'date-fns';
export default class HamiltonVflChart2 extends React.Component<IHamiltonVflChart2Props, {}> {
  public componentWillReceiveProps(newProps: IHamiltonVflChart2Props, oldProps: IHamiltonVflChart2Props) {

    this.render();

  }
  public render(): React.ReactElement<IHamiltonVflChart2Props> {
    debugger;

    //get a list of unique values to sum by. These will be the individual bars, or bar segment(if stacked).
    // the legend for thes displays across the top of the page
    let uniqMajorGroups: string[] = uniq(map(this.props.vfls, x => {
      return x[this.props.majorGroup] ? x[this.props.majorGroup] : "{null}";// give the null values a label so we can index them
    }));

    let uniqMinorGroups: string[] = uniq(map(this.props.vfls, x => {
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
    let results = reduce(this.props.vfls, (memo, curr: VFL) => {
      let major=curr[this.props.majorGroup]==null?"{null}":curr[this.props.majorGroup];
      let minor=curr[this.props.minorGroup]==null?"{null}":curr[this.props.minorGroup];
      memo[major][minor]+=1;
      return memo;
    }, initMemo);
    debugger;
    // create the charData 
    let chartData: any = {};
    chartData.labels = uniqMinorGroups;

    chartData.datasets = [];
    for (var result in results) {
      let dataset = { label: result, data: [] };
      if (this.props.majorGroupFieldValueColors[result]) {
        dataset["backgroundColor"] = this.props.majorGroupFieldValueColors[result];
      }
      for (var minor of uniqMinorGroups) {
        dataset.data.push(results[result][minor]);
      }
      chartData.datasets.push(dataset);
    }

    // onterpoloate the title
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
      <div className={styles.hamiltonVflChart2}>
        <ChartControl type={ChartType.Bar}
          data={chartData}
          options={chartOptions}
        />
      </div>
    );
  }
  }