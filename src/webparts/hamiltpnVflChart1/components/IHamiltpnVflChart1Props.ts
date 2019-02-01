import { Item } from "../../../dataModel";
export interface IHamiltpnVflChart1Props {
  description: string;
  items: Array<Item>;
  startDate: Date;
  endDate: Date;
  chartOptions: any;
  majorGroup: string;
  minorGroup: string;
  measures: any;
  majorGroupFieldValueColors:object;
 
}
