import ReactiveState from "./ReactiveState";
declare type addListener = () => void;
declare type removeListener = () => void;
declare function useReactiveStateHandler(Handler: ReactiveState, filterKeys?: Array<string>): [any, addListener, removeListener];
export default useReactiveStateHandler;
