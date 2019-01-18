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
    let mewChartData: any = {};
    let initMemo2 = {};
    let allMajorGroups: string[] = map(this.props.vfls, x => {
      return x[this.props.majorGroup] ? x[this.props.majorGroup] : "{null}"// give the null values a label so we can index them
    });
    let uniqMajorGroups: string[] = uniq(allMajorGroups);

    for (var majorGroup of uniqMajorGroups) {
      initMemo2[majorGroup] = {};
      for (var measure of this.props.measures) {
        initMemo2[majorGroup][measure] = 0;
      }
    }
    debugger;
    let results2 = reduce(this.props.vfls, (memo, curr: VFL) => {
      for (var measure of this.props.measures) {
        if (curr[this.props.majorGroup] == null) {
          memo["{null}"][measure] += curr[measure];
        }
        else {
          memo[curr[this.props.majorGroup]][measure] += curr[measure];
        }

      }
      memo[VFL[this.props.majorGroup]]
      return memo
    }, initMemo2);
    mewChartData.labels = this.props.measures;
    mewChartData.datasets = [];
    for (var result in results2) {
      let dataset = { label: result, data: [] };
      if (this.props.majorGroupFieldValueColors[result]){
        dataset["backgroundColor"]=this.props.majorGroupFieldValueColors[result];
      }
      for (var measure of this.props.measures) {
        dataset.data.push(results2[result][measure]);
      }
      mewChartData.datasets.push(dataset)

    };






    let initMemo = {
      Management: {
        Moment_High_Impact: 0,
        Mng_Walkaround: 0,
        DarnGoodQuestion: 0,
        SafetyStumpSpeech: 0,
        Sorry: 0,
        Golden_x0020_Rules: 0,
        Toolbox_mtg: 0
      }, Frontline: {
        Moment_High_Impact: 0,
        Mng_Walkaround: 0,
        DarnGoodQuestion: 0,
        SafetyStumpSpeech: 0,
        Sorry: 0,
        Golden_x0020_Rules: 0,
        Toolbox_mtg: 0
      }, Contractor: {
        Moment_High_Impact: 0,
        Mng_Walkaround: 0,
        DarnGoodQuestion: 0,
        SafetyStumpSpeech: 0,
        Sorry: 0,
        Golden_x0020_Rules: 0,
        Toolbox_mtg: 0
      }, OETeam: {
        Moment_High_Impact: 0,
        Mng_Walkaround: 0,
        DarnGoodQuestion: 0,
        SafetyStumpSpeech: 0,
        Sorry: 0,
        Golden_x0020_Rules: 0,
        Toolbox_mtg: 0
      }, TAndI: {
        Moment_High_Impact: 0,
        Mng_Walkaround: 0,
        DarnGoodQuestion: 0,
        SafetyStumpSpeech: 0,
        Sorry: 0,
        Golden_x0020_Rules: 0,
        Toolbox_mtg: 0
      }, Other: {
        Moment_High_Impact: 0,
        Mng_Walkaround: 0,
        DarnGoodQuestion: 0,
        SafetyStumpSpeech: 0,
        Sorry: 0,
        Golden_x0020_Rules: 0,
        Toolbox_mtg: 0
      }
    };
    let results = reduce(this.props.vfls, (memo, curr: VFL) => {
      switch (curr.VFL_Role) {
        case "Mgmt":
          memo.Management.Moment_High_Impact += curr.Moment_High_Impact;
          memo.Management.Mng_Walkaround += curr.Mng_Walkaround;
          memo.Management.DarnGoodQuestion += curr.DarnGoodQuestion;
          memo.Management.SafetyStumpSpeech += curr.SafetyStumpSpeech;
          memo.Management.Sorry += curr.Sorry;
          memo.Management.Golden_x0020_Rules += curr.Golden_x0020_Rules;
          memo.Management.Toolbox_mtg += curr.Toolbox_mtg;
          break;
        case "Frontline":
          memo.Frontline.Moment_High_Impact += curr.Moment_High_Impact;
          memo.Frontline.Mng_Walkaround += curr.Mng_Walkaround;
          memo.Frontline.DarnGoodQuestion += curr.DarnGoodQuestion;
          memo.Frontline.SafetyStumpSpeech += curr.SafetyStumpSpeech;
          memo.Frontline.Sorry += curr.Sorry;
          memo.Frontline.Golden_x0020_Rules += curr.Golden_x0020_Rules;
          memo.Frontline.Toolbox_mtg += curr.Toolbox_mtg;
          break;
        case "Contractor":
          memo.Contractor.Moment_High_Impact += curr.Moment_High_Impact;
          memo.Contractor.Mng_Walkaround += curr.Mng_Walkaround;
          memo.Contractor.DarnGoodQuestion += curr.DarnGoodQuestion;
          memo.Contractor.SafetyStumpSpeech += curr.SafetyStumpSpeech;
          memo.Contractor.Sorry += curr.Sorry;
          memo.Contractor.Golden_x0020_Rules += curr.Golden_x0020_Rules;
          memo.Contractor.Toolbox_mtg += curr.Toolbox_mtg;
          break;
        case "OE Team":
          memo.OETeam.Moment_High_Impact += curr.Moment_High_Impact;
          memo.OETeam.Mng_Walkaround += curr.Mng_Walkaround;
          memo.OETeam.DarnGoodQuestion += curr.DarnGoodQuestion;
          memo.OETeam.SafetyStumpSpeech += curr.SafetyStumpSpeech;
          memo.OETeam.Sorry += curr.Sorry;
          memo.OETeam.Golden_x0020_Rules += curr.Golden_x0020_Rules;
          memo.OETeam.Toolbox_mtg += curr.Toolbox_mtg;
          break;
        case "T & I":
          memo.TAndI.Moment_High_Impact += curr.Moment_High_Impact;
          memo.TAndI.Mng_Walkaround += curr.Mng_Walkaround;
          memo.TAndI.DarnGoodQuestion += curr.DarnGoodQuestion;
          memo.TAndI.SafetyStumpSpeech += curr.SafetyStumpSpeech;
          memo.TAndI.Sorry += curr.Sorry;
          memo.TAndI.Golden_x0020_Rules += curr.Golden_x0020_Rules;
          memo.TAndI.Toolbox_mtg += curr.Toolbox_mtg;
          break;
        default:
          console.log(curr.VFL_Role);
          memo.Other.Moment_High_Impact += curr.Moment_High_Impact;
          memo.Other.Mng_Walkaround += curr.Mng_Walkaround;
          memo.Other.DarnGoodQuestion += curr.DarnGoodQuestion;
          memo.Other.SafetyStumpSpeech += curr.SafetyStumpSpeech;
          memo.Other.Sorry += curr.Sorry;
          memo.Other.Golden_x0020_Rules += curr.Golden_x0020_Rules;
          memo.Other.Toolbox_mtg += curr.Toolbox_mtg;
          break;
      }


      return memo;
    }, initMemo);
    debugger;
    var chartData = {
      labels: [
        "Moment of High Impact",
        "Mgt by Walking Around",
        "Darn Good Question",
        "Safety Stump",
        "Sorry",
        "Golden Rules",
        "Toolbox Meeting"
      ],
      datasets: [
        {
          label: "Management",
          backgroundColor: "rgba(45, 63, 146, 1)",
          data: [
            results.Management.Moment_High_Impact,
            results.Management.Mng_Walkaround,
            results.Management.DarnGoodQuestion,
            results.Management.SafetyStumpSpeech,
            results.Management.Sorry,
            results.Management.Golden_x0020_Rules,
            results.Management.Toolbox_mtg
          ],

          borderWidth: 1
        },
        {
          label: "Frontline",
          backgroundColor: "rgba(148, 201, 71, 1)",
          data: [
            results.Frontline.Moment_High_Impact,
            results.Frontline.Mng_Walkaround,
            results.Frontline.DarnGoodQuestion,
            results.Frontline.SafetyStumpSpeech,
            results.Frontline.Sorry,
            results.Frontline.Golden_x0020_Rules,
            results.Frontline.Toolbox_mtg
          ],

          borderWidth: 1
        },
        {
          label: "OE Team",
          backgroundColor: "rgba(248, 232, 22, 1)",
          data: [
            results.OETeam.Moment_High_Impact,
            results.OETeam.Mng_Walkaround,
            results.OETeam.DarnGoodQuestion,
            results.OETeam.SafetyStumpSpeech,
            results.OETeam.Sorry,
            results.OETeam.Golden_x0020_Rules,
            results.OETeam.Toolbox_mtg
          ],

          borderWidth: 1
        },
        {
          label: "T & I",
          backgroundColor: "rgba(131, 121, 184, 1)",
          data: [
            results.TAndI.Moment_High_Impact,
            results.TAndI.Mng_Walkaround,
            results.TAndI.DarnGoodQuestion,
            results.TAndI.SafetyStumpSpeech,
            results.TAndI.Sorry,
            results.TAndI.Golden_x0020_Rules,
            results.TAndI.Toolbox_mtg
          ],

          borderWidth: 1
        }
        ,
        {
          label: "Contractor",
          backgroundColor: "rgba(243, 108, 49, 1)",
          data: [
            results.Contractor.Moment_High_Impact,
            results.Contractor.Mng_Walkaround,
            results.Contractor.DarnGoodQuestion,
            results.Contractor.SafetyStumpSpeech,
            results.Contractor.Sorry,
            results.Contractor.Golden_x0020_Rules,
            results.Contractor.Toolbox_mtg
          ],


          borderWidth: 1
        },
        {
          label: "Other",
          backgroundColor: "rgba(43, 99, 132, 0.5)",
          data: [
            results.Other.Moment_High_Impact,
            results.Other.Mng_Walkaround,
            results.Other.DarnGoodQuestion,
            results.Other.SafetyStumpSpeech,
            results.Other.Sorry,
            results.Other.Golden_x0020_Rules,
            results.Other.Toolbox_mtg
          ],


          borderWidth: 1
        },
      ]
    };
    return (
      <div className={styles.hamiltpnVflChart1}>
        <ChartControl type={ChartType.Bar}
          data={mewChartData}
          options={this.props.chartOptions}
        // options={{
        //   'title': {
        //     'display': true, 'position': 'top',
        //     'text': `from ${this.props.startDate ? this.props.startDate.toDateString() : '?'} to ${this.props.endDate ? this.props.endDate.toDateString() : '?'}`

        //   },
        //   'scales': {
        //     'xAxes': [{
        //       'stacked': true,
        //       'ticks': {
        //         'stepSize': 1,
        //         'min': 0,
        //        'autoSkip': false
        //       }
        //     }],
        //     'yAxes': [{
        //       'stacked': true,
        //       'ticks': {
        //         'beginAtZero': true,
        //         'autoSkip': false 
        //       }
        //     }]
        //   }
        // }}

        />


      </div>
    );
  }
}
