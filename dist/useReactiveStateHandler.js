import { useLayoutEffect, useRef, useState, useCallback } from "react";
import isEqual from "lodash.isequal";
function useReactiveStateHandler(Handler, filterKeys) {
    const handlerRef = useRef(Handler);
    const filterKeysRef = useRef(filterKeys);
    const listenerRef = useRef();
    const [value, setValue] = useState(_getInitialValue(filterKeysRef.current, handlerRef.current));
    const removeListener = useCallback(() => {
        if (listenerRef.current) {
            listenerRef.current.unsubscribe();
        }
    }, []);
    const addListener = useCallback(() => {
        removeListener();
        listenerRef.current = handlerRef.current.subscriber$.subscribe((state) => {
            if (Array.isArray(filterKeysRef.current)) {
                if (filterKeysRef.current.length > 0) {
                    setValue((_value) => {
                        if (filterKeysRef.current) {
                            const _nextValue = _pick(filterKeysRef.current, state);
                            return isEqual(_value, _nextValue) ? _value : _nextValue;
                        }
                    });
                }
                else {
                    setValue(state);
                }
            }
            else {
                setValue(state);
            }
        });
    }, [removeListener]);
    useLayoutEffect(() => {
        addListener();
        return removeListener;
    }, [addListener, removeListener]);
    return [value, removeListener, addListener];
}
const _pick = (_arr, _object) => {
    return _arr.reduce((result, key) => {
        result[key] = _object[key];
        return result;
    }, {});
};
const _getInitialValue = (keys, handler) => {
    return Array.isArray(keys)
        ? keys.length > 0
            ? _pick(keys, handler.getState())
            : handler.getState()
        : handler.getState();
};
export default useReactiveStateHandler;
