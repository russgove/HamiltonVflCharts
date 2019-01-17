import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  DynamicDataSharedDepth
} from '@microsoft/sp-webpart-base';
import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

import * as strings from 'HamiltpnVflChart1WebPartStrings';
import HamiltpnVflChart1 from './components/HamiltpnVflChart1';
import { IHamiltpnVflChart1Props } from './components/IHamiltpnVflChart1Props';
import { sp } from "@pnp/sp";
import { VFL } from '../../dataModel';
import { DynamicProperty } from '@microsoft/sp-component-base';

export interface IHamiltpnVflChart1WebPartProps {
  description: string;
  vfls: DynamicProperty<object>;
}

export default class HamiltpnVflChart1WebPart extends BaseClientSideWebPart<IHamiltpnVflChart1WebPartProps>   {

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
    if (this.properties.vfls) { vfls = this.properties.vfls.tryGetValues(); }
    const element: React.ReactElement<IHamiltpnVflChart1Props> = React.createElement(
      HamiltpnVflChart1,
      {
        description: this.properties.vfls ? "VFL COUNT" + vfls.length : "Nothing yet",
        vfls: vfls as Array<VFL>
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

              ]
            }
          ]
        }
      ]
    };
  }
}
