import { BehaviorSubject } from "rxjs";
class ReactiveState {
    constructor(_initialState) {
        this.initialState = _initialState;
        this.subscriber$ = new BehaviorSubject(_initialState);
    }
    setState(values) {
        const currentState = this.subscriber$.getValue();
        this.subscriber$.next({ ...currentState, ...values });
    }
    getState() {
        return this.subscriber$.getValue();
    }
    resetState() {
        this.subscriber$.next(this.initialState);
    }
}
export default ReactiveState;
