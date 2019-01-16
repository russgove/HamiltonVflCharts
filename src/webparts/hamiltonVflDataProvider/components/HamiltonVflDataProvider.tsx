import * as React from 'react';
import styles from './HamiltonVflDataProvider.module.scss';
import { IHamiltonVflDataProviderProps } from './IHamiltonVflDataProviderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {DatePicker} from "office-ui-fabric-react/lib/DatePicker" 
import {PrimaryButton} from "office-ui-fabric-react/lib/Button" 

export default class HamiltonVflDataProvider extends React.Component<IHamiltonVflDataProviderProps, {}> {
  public render(): React.ReactElement<IHamiltonVflDataProviderProps> {
    return (
      <div className={ styles.hamiltonVflDataProvider }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
           
            
                <DatePicker label="StartDate" onSelectDate={this.props.startDateChanged} value={this.props.startDate}  />
                <DatePicker label="EndDate" onSelectDate={this.props.endDateChanged} value={this.props.endDate} />
                <PrimaryButton  onClick={this.props.fetchData}></PrimaryButton>
         
            </div>
          </div>
        </div>
      </div>
    );
  }
}
