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
import { Item } from '../../dataModel';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

export interface IHamiltpnVflChart1WebPartProps {
  description: string;
  items: DynamicProperty<object>;
  startDate: DynamicProperty<Date>;
  endDate: DynamicProperty<Date>;
  chartOptions: any;
  majorGroupFieldName: string;
  majorGroupFieldValueColors: any;
  minorGroupFieldName: string;
  measures: any;

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

    var items = [];
    var chartOptions, measures, majorGroupFieldValueColors = {};
    var startDate, endDate: Date;
    if (this.properties.items) { items = this.properties.items.tryGetValues(); }
    if (this.properties.startDate) { startDate = this.properties.startDate.tryGetValue(); }
    if (this.properties.endDate) { endDate = this.properties.endDate.tryGetValue(); }

    if (this.properties.chartOptions) { chartOptions = JSON.parse(this.properties.chartOptions); }
    if (this.properties.majorGroupFieldValueColors) { majorGroupFieldValueColors = JSON.parse(this.properties.majorGroupFieldValueColors); }
    if (this.properties.measures) { measures = JSON.parse(this.properties.measures); }


    const element: React.ReactElement<IHamiltpnVflChart1Props> = React.createElement(
      HamiltpnVflChart1,
      {
        description: this.properties.items ? "Item COUNT" + items.length : "Nothing yet",
        items: items as Array<Item>,
        startDate: startDate,
        endDate: endDate,
        chartOptions: chartOptions,
        majorGroup: this.properties.majorGroupFieldName,
        majorGroupFieldValueColors: majorGroupFieldValueColors,
        minorGroup: this.properties.minorGroupFieldName,
        measures: measures
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


                PropertyPaneDynamicField('items', {
                  label: "Item Provider"
                }),
                PropertyPaneDynamicField('startDate', {
                  label: "Start Date"
                }),
                PropertyPaneDynamicField('endDate', {
                  label: "End Date"
                }),
                PropertyPaneTextField('majorGroupFieldName', {
                  label: "Major Group",description:"This is a field in the datasource. It will be presented as a bar, or as a segment of a bar if the chart is stacked"
                }),
                PropertyFieldCodeEditor('majorGroupFieldValueColors', {
                  language: PropertyFieldCodeEditorLanguages.JSON, label: 'foR each value of the Major Group, assign a color',
                  panelTitle: 'set colors for field values',
                  initialValue: this.properties.majorGroupFieldValueColors,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId2',

                }),
                PropertyPaneTextField('minorGroupFieldNaem', {
                  label: "minor Group"
                }),


                PropertyFieldCodeEditor('measures', {
                  language: PropertyFieldCodeEditorLanguages.JSON, label: 'Edit Measures',
                  panelTitle: 'Measures and their labels',
                  initialValue: this.properties.measures,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId3',

                }),


                PropertyFieldCodeEditor('chartOptions', {
                  language: PropertyFieldCodeEditorLanguages.JSON, label: 'Edit Chart Configuration',
                  panelTitle: 'Edit Chart Configuration',
                  initialValue: this.properties.chartOptions,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',

                }),


              ]
            }
          ]
        }
      ]
    };
  }
}
