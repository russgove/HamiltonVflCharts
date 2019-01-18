import * as React from 'react';
import styles from './HamiltonVflChart2.module.scss';
import { IHamiltonVflChart2Props } from './IHamiltonVflChart2Props';
import { escape, fromPairs } from '@microsoft/sp-lodash-subset';
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";

import { groupBy, countBy, reduce, uniqWith, isEqual } from 'lodash';
import { VFL } from '../../../dataModel';
import { format } from 'date-fns';
export default class HamiltonVflChart2 extends React.Component<IHamiltonVflChart2Props, {}> {
  public componentWillReceiveProps(newProps: IHamiltonVflChart2Props, oldProps: IHamiltonVflChart2Props) {

    this.render();

  }
  public render(): React.ReactElement<IHamiltonVflChart2Props> {
    var chartData:any={};
    var allmonthyears = this.props.vfls.map((vfl: VFL) => {
      return {
        year: vfl.Date_VFL.getFullYear(),
        month: vfl.Date_VFL.getMonth(),
        desc: format(vfl.Date_VFL, "MMM-YY")
      };
    });
    chartData.labels = uniqWith(allmonthyears, isEqual);
    let memo = chartData.labels.map((umy) => {
      return {
        ...umy, Mgmt: 0, FrontLine: 0, Contractor: 0, Other: 0

      };
    });
    debugger;
    
    chartData.datasets=reduce(this.props.vfls, (memox, curr: VFL) => {
    
      for (var memoItem of memox) {
        if (curr.Date_VFL.getFullYear() == memoItem['year'] && curr.Date_VFL.getMonth() == memoItem['month']) {
          switch (curr.VFL_Role) {
            case "Mgmt":
              memoItem["mgt"]++;
              break;
            case "Frontline":
              memoItem["FrontLine"]++;
              break;
            case "Contractor":
              memoItem["Contractor"]++;
              break;
            default:
              memoItem["Other"]++;


          }
        }
      }
      return memo;
    }, memo);

    
    debugger;
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
      });
    debugger;
    return (
      <div className={styles.hamiltonVflChart2}>
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
          }}
          options={{
            title: {
              display: true, position: 'top',
              text: `from ${this.props.startDate ? this.props.startDate.toDateString() : '?'} to ${this.props.endDate ? this.props.endDate.toDateString() : '?'}`

            },
            scales: {
              xAxes: [{
                stacked: false,
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }],
              yAxes: [{
                stacked: false,
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