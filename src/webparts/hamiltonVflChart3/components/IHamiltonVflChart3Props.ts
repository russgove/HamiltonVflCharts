import { Item } from "../../../dataModel";
export interface IHamiltonVflChart3Props {
 
  items: Array<Item>;
  startDate: Date;
  endDate: Date;
  chartOptions: any;
  majorGroup: string;
  minorGroup: string;
  measures: any;
  majorGroupFieldValueColors: object;
  colorPalette: Array<string>;
  filterField1: string;
  filterValue1: string;
  listUrl: string;
  viewName: string;
}
