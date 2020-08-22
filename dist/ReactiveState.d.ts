import { BehaviorSubject } from "rxjs";
declare class ReactiveState {
    initialState: any;
    subscriber$: BehaviorSubject<any>;
    constructor(_initialState: any);
    setState(values: any): void;
    getState(): any;
    resetState(): void;
}
export default ReactiveState;
