import { BehaviorSubject } from "rxjs";
declare class ReactiveState {
  initialState: any;
  subscriber$: BehaviorSubject<any>;
  constructor(initialState: any);
  setValue(keyName: string, value: any): void;
  getValue(keyName: string): any;
  setState(values: any): void;
  getState(): any;
  resetState(): any;
}
export default ReactiveState;
