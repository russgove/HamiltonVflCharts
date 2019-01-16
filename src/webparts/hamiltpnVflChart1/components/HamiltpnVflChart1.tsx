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
    let results = reduce(this.props.vfls, (memo: VFL, curr: VFL) => {

      memo.Moment_High_Impact += curr.Moment_High_Impact;
      memo.Mng_Walkaround += curr.Mng_Walkaround;
      memo.DarnGoodQuestion += curr.DarnGoodQuestion;
      memo.SafetyStumpSpeech += curr.SafetyStumpSpeech;
      memo.Sorry += curr.Sorry;
      memo.Golden_x0020_Rules += curr.Golden_x0020_Rules;
      memo.Toolbox_mtg += curr.Toolbox_mtg;

      return memo;
    }, {
        Moment_High_Impact: 0,
        Mng_Walkaround: 0,
        DarnGoodQuestion: 0,
        SafetyStumpSpeech: 0,
        Sorry: 0,
        Golden_x0020_Rules: 0,
        Toolbox_mtg: 0
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
            datasets: [{
              label: '# of Reports',
              data: [
                results.Moment_High_Impact,
                results.Mng_Walkaround,
                results.DarnGoodQuestion,
                results.SafetyStumpSpeech,
                results.Sorry,
                results.Golden_x0020_Rules,
                results.Toolbox_mtg
              ],

              borderWidth: 1
            }]
          }}
          options={{
            scales: {
              xAxes: [{
                  stacked: false,
                  
                  scaleLabel: {
                      labelString: 'Month'
                  },
                  ticks: {
                      stepSize: 1,
                      min: 0,
                      autoSkip: false
                  }
              }]
          }
          }} />


      </div>
    );
  }
}
