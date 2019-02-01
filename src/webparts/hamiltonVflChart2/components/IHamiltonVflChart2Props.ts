
import { Item } from "../../../dataModel";
export interface IHamiltonVflChart2Props {

  items: Array<Item>;
  startDate: Date;
  endDate: Date;
  chartOptions: any;
  majorGroup: string;
  minorGroup: string;
  measures: any;
  majorGroupFieldValueColors:object;
  colorPalette:Array<string>;
  listUrl:string;
  viewName:string;
 
}
