export interface IHamiltonVflDataProviderProps {
  description: string;
  startDateChanged:(dt:Date)=>void;
  endDateChanged:(dt:Date)=>void;
  startDate:Date;
  endDate:Date;
  fetchData:()=>void;
}
