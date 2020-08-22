import { BehaviorSubject } from "rxjs";
class ReactiveState {
  initialState: any;
  subscriber$: BehaviorSubject<any>;

  constructor(_initialState: any) {
    this.initialState = _initialState;
    this.subscriber$ = new BehaviorSubject(_initialState);
  }
  setState(values: any): void {
    const currentState = this.subscriber$.getValue();
    this.subscriber$.next({ ...currentState, ...values });
  }
  getState(): any {
    return this.subscriber$.getValue();
  }
  resetState(): void {
    this.subscriber$.next(this.initialState);
  }
}
export default ReactiveState;
