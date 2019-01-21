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
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';


export interface IHamiltonVflChart2WebPartProps {
  description: string;
  vfls: DynamicProperty<object>;
  startDate: DynamicProperty<Date>;
  endDate: DynamicProperty<Date>;
  chartOptions: any;
  majorGroupFieldName: string;
  majorGroupFieldValueColors: any;
  minorGroupFieldName: string;
  measures: any;
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
  var chartOptions, measures, majorGroupFieldValueColors = {};
  var startDate, endDate: Date;
  if (this.properties.vfls) { vfls = this.properties.vfls.tryGetValues(); }
  if (this.properties.startDate) { startDate = this.properties.startDate.tryGetValue(); }
  if (this.properties.endDate) { endDate = this.properties.endDate.tryGetValue(); }

  if (this.properties.chartOptions) { chartOptions = JSON.parse(this.properties.chartOptions); }
  if (this.properties.majorGroupFieldValueColors) { majorGroupFieldValueColors = JSON.parse(this.properties.majorGroupFieldValueColors); }
  if (this.properties.measures) { measures = JSON.parse(this.properties.measures); }


  const element: React.ReactElement<IHamiltonVflChart2Props> = React.createElement(
    HamiltonVflChart2,
    {
      description: this.properties.vfls ? "VFL COUNT" + vfls.length : "Nothing yet",
      vfls: vfls as Array<VFL>,
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


              PropertyPaneDynamicField('vfls', {
                label: "VFL Provider"
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
              PropertyPaneTextField('minorGroupFieldName', {
                label: "Minor Group field"
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
