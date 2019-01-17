import * as React from 'react';
import styles from './HamiltonVflDataProvider.module.scss';
import { IHamiltonVflDataProviderProps } from './IHamiltonVflDataProviderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { PrimaryButton, ActionButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";

export default class HamiltonVflDataProvider extends React.Component<IHamiltonVflDataProviderProps, {}> {
  public render(): React.ReactElement<IHamiltonVflDataProviderProps> {
    return (
      <div className={styles.hamiltonVflDataProvider}>


        <table><tr>
          <td>
            <Label>Start Date</Label>
          </td>
          <td>

            <DatePicker  onSelectDate={this.props.startDateChanged} value={this.props.startDate} />
          </td>
          <Label>End Date</Label>
          <td>
            <DatePicker  onSelectDate={this.props.endDateChanged} value={this.props.endDate} />
          </td>
          <td>
            <PrimaryButton onClick={this.props.fetchData}>Get VFLs</PrimaryButton>
          </td>
          <td>
            <Label color="Red">{this.props.errorMessage}</Label>
          </td>

        </tr></table>





      </div>
    );
  }
}
