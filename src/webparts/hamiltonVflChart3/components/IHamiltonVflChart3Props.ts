import { VFL } from "../../../dataModel";
export interface IHamiltonVflChart3Props {
  description: string;
  vfls: Array<VFL>;
  startDate: Date;
  endDate: Date;
  chartOptions: any;
  majorGroup: string;
  minorGroup: string;
  measures: any;
  majorGroupFieldValueColors:object;

  colorPalette:Array<string>;
  filterField1:string;
  filterValue1:string;
}
