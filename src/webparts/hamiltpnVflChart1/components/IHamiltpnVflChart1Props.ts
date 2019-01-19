import { VFL } from "../../../dataModel";
export interface IHamiltpnVflChart1Props {
  description: string;
  vfls: Array<VFL>;
  startDate: Date;
  endDate: Date;
  chartOptions: any;
  majorGroup: string;
  minorGroup: string;
  measures: any;
  majorGroupFieldValueColors:object;
 
}
