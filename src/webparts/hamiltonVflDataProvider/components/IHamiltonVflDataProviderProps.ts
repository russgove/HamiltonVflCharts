export interface IHamiltonVflDataProviderProps {
  startDateChanged:(dt:Date)=>void;
  endDateChanged:(dt:Date)=>void;
  startDate:Date;
  endDate:Date;
  fetchData:()=>void;
  errorMessage:string;
}
