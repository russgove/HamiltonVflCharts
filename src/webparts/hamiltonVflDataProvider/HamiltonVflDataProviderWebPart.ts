import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';
import * as strings from 'HamiltonVflDataProviderWebPartStrings';
import HamiltonVflDataProvider from './components/HamiltonVflDataProvider';
import { IHamiltonVflDataProviderProps } from './components/IHamiltonVflDataProviderProps';
import { sp } from "@pnp/sp";
import { VFL } from '../../dataModel';
import { autobind } from '@uifabric/utilities/lib';
import {addMonths,  lastDayOfMonth} from 'date-fns';
export interface IHamiltonVflDataProviderWebPartProps {
  description: string;
}

export default class HamiltonVflDataProviderWebPart extends BaseClientSideWebPart<IHamiltonVflDataProviderWebPartProps> implements IDynamicDataCallables {
  private _selectedVFls: Array<VFL>=[];
  private _endDate: Date=lastDayOfMonth(new Date());
  private _startDate: Date =addMonths(lastDayOfMonth(new Date()),-6) ;
  
  
  /**
  * Event handler for selecting an event in the list
  */
  private _eventSelected = (vfls: Array<VFL>): void => {
    // store the currently selected event in the class variable. Required
    // so that connected component will be able to retrieve its value
    this._selectedVFls = vfls;
    // notify subscribers that the selected event has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged('vfls');
  }

  @autobind
  private _startDateChanged(sd:Date):void{

    this._startDate=sd;
  }
  @autobind
  private _endDateChanged(ed:Date):void{
    this._endDate=ed;
  }
  @autobind
  private _fetchData():void{
    
    sp.web.lists.getByTitle('VFL').items.filter(`Date_VFL ge datetime'${this._startDate.toISOString()}' and Date_VFL le datetime'${this._endDate.toISOString()}'`  ).getAll()
    .then(items=>{
      
      this._selectedVFls = items;
      // notify subscribers that the selected event has changed
      this.context.dynamicDataSourceManager.notifyPropertyChanged('vfls');
      this.context.dynamicDataSourceManager.notifyPropertyChanged('startDate');
      this.context.dynamicDataSourceManager.notifyPropertyChanged('endDate');
    })
    .catch((err)=>{
      debugger;
    });
  }
  protected onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });
    // register this web part as dynamic data source
    this.context.dynamicDataSourceManager.initializeSource(this);
    this._fetchData();
    return Promise.resolve();
  }

  /**
    * Return list of dynamic data properties that this dynamic data source
    * returns
    */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'vfls',
        title: 'VFLs'
      },{
        id: 'startDate',
        title: 'startDate'
      },
      {
        id: 'endDate',
        title: 'endDate'
      },

    ];
  }
  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): Array<VFL> | Date {
  
    switch (propertyId) {
      case 'vfls':
        return this._selectedVFls;
        
        case 'startDate':
        return this._startDate;
        
        case 'endDate':
        return this._endDate;
        

    }

    throw new Error('Bad property id');
  }


  public render(): void {
    const element: React.ReactElement<IHamiltonVflDataProviderProps> = React.createElement(
      HamiltonVflDataProvider,
      {
        description: this.properties.description,
        startDateChanged:this._startDateChanged,
        endDateChanged:this._endDateChanged,fetchData:this._fetchData,
        startDate:this._startDate,
        endDate:this._endDate
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
