import { useEffect, useRef, useState, useCallback } from "react";
import { Subscription } from "rxjs";
import ReactiveState from "./ReactiveState";
import isEqual from "lodash.isequal";

type addListener = () => void;

type removeListener = () => void;

function useReactiveStateHandler(
  Handler: ReactiveState,
  filterKeys?: Array<string>
): [any, addListener, removeListener] {
  const handlerRef = useRef<ReactiveState>(Handler);
  const filterKeysRef = useRef<Array<string> | undefined>(filterKeys);
  const listenerRef = useRef<Subscription>();
  const [value, setValue]: any = useState(
    _getInitialValue(filterKeysRef.current, handlerRef.current)
  );

  const removeListener = useCallback(() => {
    if (listenerRef.current) {
      listenerRef.current.unsubscribe();
    }
  }, []);

  const addListener = useCallback(() => {
    removeListener();
    listenerRef.current = handlerRef.current.subscriber$.subscribe(
      (state: any) => {
        if (Array.isArray(filterKeysRef.current)) {
          if (filterKeysRef.current.length > 0) {
            setValue((_value: any) => {
              if (filterKeysRef.current) {
                const _nextValue = _pick(filterKeysRef.current, state);
                return isEqual(_value, _nextValue) ? _value : _nextValue;
              }
            });
          } else {
            setValue(state);
          }
        } else {
          setValue(state);
        }
      }
    );
  }, [removeListener]);

  useEffect(() => {
    addListener();
    return removeListener;
  }, [addListener, removeListener]);

  return [value, removeListener, addListener];
}

const _pick = (_arr: Array<string>, _object: any) => {
  return _arr.reduce((result: any, key) => {
    result[key] = _object[key];
    return result;
  }, {});
};

const _getInitialValue = (
  keys: Array<string> | undefined,
  handler: ReactiveState
) => {
  return Array.isArray(keys)
    ? keys.length > 0
      ? _pick(keys, handler.getState())
      : handler.getState()
    : handler.getState();
};

export default useReactiveStateHandler;
