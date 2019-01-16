import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HamiltonVflChart2WebPartStrings';
import HamiltonVflChart2 from './components/HamiltonVflChart2';
import { IHamiltonVflChart2Props } from './components/IHamiltonVflChart2Props';

export interface IHamiltonVflChart2WebPartProps {
  description: string;
}

export default class HamiltonVflChart2WebPart extends BaseClientSideWebPart<IHamiltonVflChart2WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHamiltonVflChart2Props > = React.createElement(
      HamiltonVflChart2,
      {
        description: this.properties.description
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
