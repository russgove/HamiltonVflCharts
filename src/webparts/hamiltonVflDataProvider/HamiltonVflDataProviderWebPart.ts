import * as React from 'react';
import * as ReactDom from 'react-dom';
import "@pnp/polyfill-ie11";
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
import { sp, List, Folder } from "@pnp/sp";
import { Item } from '../../dataModel';
import { autobind, baseElementEvents } from '@uifabric/utilities/lib';
import { addMonths, lastDayOfMonth, format, startOfMonth } from 'date-fns';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
export interface IHamiltonVflDataProviderWebPartProps {
  description: string;
  list: string;
}

export default class HamiltonVflDataProviderWebPart extends BaseClientSideWebPart<IHamiltonVflDataProviderWebPartProps> implements IDynamicDataCallables {
  private _selectedItems: Array<Item> = [];
  private _endDate: Date = lastDayOfMonth(new Date());
  private _startDate: Date = startOfMonth(addMonths(lastDayOfMonth(new Date()), -6));
  private _listUrl: string;
  private errorMessage: string;

  @autobind
  private _startDateChanged(sd: Date): void {
    this._startDate = startOfMonth(sd);
  }
  @autobind
  private _endDateChanged(ed: Date): void {
    this._endDate = lastDayOfMonth(ed);
  }
  @autobind
  private _fetchData(): void {
    debugger;

    sp.web.lists.getById(this.properties.list).items.filter(`Date_VFL ge datetime'${this._startDate.toISOString()}' and Date_VFL le datetime'${this._endDate.toISOString()}'`).getAll()
      .then(items => {

        this._selectedItems = items.map((item) => {
          item.Date_VFL = new Date(item.Date_VFL);
          item.$$$year = item.Date_VFL.getFullYear();
          item.$$$mont = item.Date_VFL.getMonth();
          item.$$$MMM_YY = format(item.Date_VFL, "MMM-YY");

          return item;
        });
        // notify subscribers that the selected event has changed
        this.context.dynamicDataSourceManager.notifyPropertyChanged('items');
        this.context.dynamicDataSourceManager.notifyPropertyChanged('startDate');
        this.context.dynamicDataSourceManager.notifyPropertyChanged('endDate');
        this.context.dynamicDataSourceManager.notifyPropertyChanged('listUrl');
        this.errorMessage = "";
        this.render();
      })
      .catch((err) => {
        debugger;
        this.errorMessage = err.message;
        this.render();
      });
  }
  protected onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });
    // register this web part as dynamic data source
    this.context.dynamicDataSourceManager.initializeSource(this);
    this._fetchData();
    return this.setListUrl();

  }

  /**
    * Return list of dynamic data properties that this dynamic data source
    * returns
    */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: 'items',
        title: 'Items'
      }, {
        id: 'startDate',
        title: 'Start Date'
      },
      {
        id: 'endDate',
        title: 'End Date'
      },
      {
        id: 'listUrl',
        title: 'List', description: 'The URL of the SharePoint List that data is retrieved from '
      },

    ];
  }
  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): Array<Item> | Date | string {

    switch (propertyId) {
      case 'items':
        return this._selectedItems;

      case 'startDate':
        return this._startDate;

      case 'endDate':
        return this._endDate;
      case 'listUrl':
        return this._listUrl;


    }
    this.errorMessage = "Invalid Properrty ID";
    throw new Error('Bad property id');
  }


  public render(): void {
    const element: React.ReactElement<IHamiltonVflDataProviderProps> = React.createElement(
      HamiltonVflDataProvider,
      {
     
        startDateChanged: this._startDateChanged,
        endDateChanged: this._endDateChanged, fetchData: this._fetchData,
        startDate: this._startDate,
        endDate: this._endDate,
        errorMessage: this.errorMessage
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
  protected setListUrl(): Promise<any> {
    return sp.web.lists.getById(this.properties.list).rootFolder.get()
      .then((spList) => {
        debugger;

        this._listUrl = `https://${window.location.hostname}/${spList.ServerRelativeUrl}`;
      }).catch((err) => {
        debugger;
        this._listUrl = "";
      });
  }
  protected async onListPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    debugger;
    this.setListUrl().then(() => {
      this.context.dynamicDataSourceManager.notifyPropertyChanged('listUrl');
    });

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
                }),
                PropertyFieldListPicker('list', {
                  label: 'Select a list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onListPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
