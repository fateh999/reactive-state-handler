import { BehaviorSubject } from "rxjs";
class ReactiveState {
  constructor(initialState) {
    this.initialState = initialState;
    this.subscriber$ = new BehaviorSubject(initialState);
  }
  setValue(keyName, value) {
    const currentState = this.subscriber$.getValue();
    this.subscriber$.next({}, ...currentState, [keyName], value);
  }

  getValue(keyName) {
    const currentState = this.subscriber$.getValue();
    return currentState[keyName];
  }
  setState(values) {
    const currentState = this.subscriber$.getValue();
    this.subscriber$.next({}, ...currentState, ...values);
  }
  getState() {
    return this.subscriber$.getValue();
  }
  resetState() {
    this.subscriber$.next(this.initialState);
  }
}
export default ReactiveState;
