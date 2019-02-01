
import { Item } from "../../../dataModel";
export interface IHamiltonVflChart2Props {
  description: string;
  vfls: Array<Item>;
  startDate: Date;
  endDate: Date;
  chartOptions: any;
  majorGroup: string;
  minorGroup: string;
  measures: any;
  majorGroupFieldValueColors:object;
  colorPalette:Array<string>;
 
}
