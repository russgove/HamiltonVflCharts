import * as React from 'react';
import styles from './HamiltpnVflChart1.module.scss';
import { IHamiltpnVflChart1Props } from './IHamiltpnVflChart1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";
import { groupBy, countBy, reduce } from 'lodash';
import { VFL } from '../../../dataModel';
export default class HamiltpnVflChart1 extends React.Component<IHamiltpnVflChart1Props, {}> {
  public render(): React.ReactElement<IHamiltpnVflChart1Props> {
    debugger;
    let results = reduce(this.props.vfls, (memo, curr: VFL) => {
      switch (curr.VFL_Role) {
        case "Management":
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
        default:
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
    }, {
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
        }, Other: {
          Moment_High_Impact: 0,
          Mng_Walkaround: 0,
          DarnGoodQuestion: 0,
          SafetyStumpSpeech: 0,
          Sorry: 0,
          Golden_x0020_Rules: 0,
          Toolbox_mtg: 0
        }
      })
    debugger;
    return (
      <div className={styles.hamiltpnVflChart1}>
        <ChartControl type={ChartType.Bar}
          data={{
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
                backgroundColor: "rgba(54, 162, 235, 0.5)",
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
                backgroundColor: "rgba(255, 99, 132, 0.5)",
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
              }
              ,
              {
                label: "Contractor",
                backgroundColor: "rgba(12, 99, 132, 0.5)",
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
          }}
          options={{
            scales: {
              xAxes: [{
                stacked: true,
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  autoSkip: false // otherwise some labels are hidden
                }
              }]
            }
          }} />


      </div>
    );
  }
}
