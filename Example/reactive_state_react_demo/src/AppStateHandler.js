import { ReactiveState, useReactiveStateHandler } from "reactive-state-handler";

const AppStateHandler = new ReactiveState({ counter1: 0, counter2: 0 });

export default AppStateHandler;

export const useAppState = (filterKeys) => {
  return useReactiveStateHandler(AppStateHandler, filterKeys);
};
