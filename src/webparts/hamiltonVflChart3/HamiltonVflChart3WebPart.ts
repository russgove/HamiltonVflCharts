import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDynamicField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HamiltonVflChart3WebPartStrings';
import HamiltonVflChart3 from './components/HamiltonVflChart3';
import { IHamiltonVflChart3Props } from './components/IHamiltonVflChart3Props';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { sp } from "@pnp/sp";
import { Item } from '../../dataModel';

export interface IHamiltonVflChart3WebPartProps {
  description: string;
  items: DynamicProperty<object>;
  startDate: DynamicProperty<Date>;
  endDate: DynamicProperty<Date>;
  listUrl: DynamicProperty<string>;
  viewName: string;
  chartOptions: any;
  majorGroupFieldName: string;
  majorGroupFieldValueColors: any;
  minorGroupFieldName: string;
  measures: any;
  colorPalette: string;
  filterField1: string;
  filterValue1: string;
}

export default class HamiltonVflChart3WebPart extends BaseClientSideWebPart<IHamiltonVflChart3WebPartProps> {

  public render(): void {

    var items = [];
    var chartOptions, measures, majorGroupFieldValueColors = {};
    var startDate, endDate: Date;
    var listUrl: string;
    if (this.properties.items) { items = this.properties.items.tryGetValues(); }
    if (this.properties.startDate) { startDate = this.properties.startDate.tryGetValue(); }
    if (this.properties.endDate) { endDate = this.properties.endDate.tryGetValue(); }
    if (this.properties.listUrl) { listUrl = this.properties.listUrl.tryGetValue(); }

    if (this.properties.chartOptions) { chartOptions = JSON.parse(this.properties.chartOptions); }
    if (this.properties.majorGroupFieldValueColors) { majorGroupFieldValueColors = JSON.parse(this.properties.majorGroupFieldValueColors); }
    if (this.properties.measures) { measures = JSON.parse(this.properties.measures); }


    const element: React.ReactElement<IHamiltonVflChart3Props> = React.createElement(
      HamiltonVflChart3,
      {
      
        items: items as Array<Item>,
        startDate: startDate,
        endDate: endDate,
        chartOptions: chartOptions,
        majorGroup: this.properties.majorGroupFieldName,
        majorGroupFieldValueColors: majorGroupFieldValueColors,
        minorGroup: this.properties.minorGroupFieldName,
        measures: measures,
        colorPalette: this.properties.colorPalette.split(','),
        filterField1: this.properties.filterField1,
        filterValue1: this.properties.filterValue1,
        listUrl: listUrl,
        viewName: this.properties.viewName
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
                  label: "List Item Provider"
                }),
                PropertyPaneDynamicField('startDate', {
                  label: "Start Date"
                }),
                PropertyPaneDynamicField('endDate', {
                  label: "End Date"
                }),
                PropertyPaneDynamicField('listUrl', {
                  label: "List Url (used to provide links back to the list)"
                }),
                PropertyPaneTextField('viewName', {
                  label: "The name of the view to be used when providing links back to the list(i.e. AllItems)"
                }),
                PropertyPaneTextField('majorGroupFieldName', {
                  label: "Major Group", description: "This is a field in the datasource. It will be presented as a bar, or as a segment of a bar if the chart is stacked"
                }),
                PropertyPaneTextField('filterField1', {
                  label: "Filter Field ", description: "filter field"
                }),
                PropertyPaneTextField('filterValue1', {
                  label: "Filter Value ", description: "filter value"
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
                PropertyPaneTextField('minorGroupFieldName', {
                  label: "Minor Group field"
                }),
                PropertyPaneTextField('colorPalette', {
                  label: "Color Palette"
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
