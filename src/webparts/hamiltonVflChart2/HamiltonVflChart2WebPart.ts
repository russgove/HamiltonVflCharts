import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDynamicField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HamiltonVflChart2WebPartStrings';
import HamiltonVflChart2 from './components/HamiltonVflChart2';
import { IHamiltonVflChart2Props } from './components/IHamiltonVflChart2Props';
import { sp } from "@pnp/sp";
import { VFL } from '../../dataModel';
import { DynamicProperty } from '@microsoft/sp-component-base';

export interface IHamiltonVflChart2WebPartProps {
  description: string;
  vfls: DynamicProperty<object>;
  startDate: DynamicProperty<Date>;
  endDate: DynamicProperty<Date>;
}

export default class HamiltonVflChart2WebPart extends BaseClientSideWebPart<IHamiltonVflChart2WebPartProps> {
   /**
  * Event handler for clicking the Configure button on the Placeholder
  */
 private _onConfigure = (): void => {
  this.context.propertyPane.open();
}
protected onInit(): Promise<void> {
  return Promise.resolve();
}


public render(): void {

  var vfls = [];
  var startDate, endDate: Date;
  if (this.properties.vfls) { vfls = this.properties.vfls.tryGetValues(); }
  if (this.properties.startDate) { startDate = this.properties.startDate.tryGetValue(); }
  if (this.properties.endDate) { endDate = this.properties.endDate.tryGetValue(); }
  const element: React.ReactElement<IHamiltonVflChart2Props> = React.createElement(
    HamiltonVflChart2,
    {
      description: this.properties.vfls ? "VFL COUNT" + vfls.length : "Nothing yet",
      vfls: vfls as Array<VFL>,
      startDate: startDate, endDate: endDate
    }
  );

  ReactDom.render(element, this.domElement);
}

 

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

                PropertyPaneDynamicField('vfls', {
                  label: "VFL Provider"
                }),
                PropertyPaneDynamicField('startDate', {
                  label: "Start Date"
                }),
                PropertyPaneDynamicField('endDate', {
                  label: "End Date"
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
