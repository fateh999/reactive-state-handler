# reactive-state-handler

A Cross Framework Javascript State Management Library using rxjs

[![NPM](https://nodei.co/npm/reactive-state-handler.png?downloads=true)](https://nodei.co/npm/reactive-state-handler/)

## Install Peer Dependency ( in case not installed already )

```javascript
  npm i rxjs
```

## Steps to Install

```javascript
  npm i reactive - state - handler
```

## Example Usage

1. Create a new file (suppose AppStateHandler.js) and initialize your initial state and default export Singleton Class.

```javascript
import ReactiveState from 'reactive-state-handler';

export default new ReactiveState({
  loggedIn: false,
  user: null,
  darkMode: false,
  jwt: '',
});
```

2. Import in any file and then you can use any of it's methods & properties listed below

```typescript
// Used for listening to state changes
AppStateHandler.subscriber$.subscribe((state: any) => {
  console.log("State Changed", state);
});

// Used for setting a single value in our state
AppStateHandler.setValue(keyName: string, value: any);

// Returns single value from state
const value = AppStateHandler.getValue(keyName: string);

// Used for setting multiple values in the state
AppStateHandler.setState(values: any);

// Returns current state
const state = AppStateHandler.getState();

// Used to reset state back to initial state
AppStateHandler.resetState();
```

3. Usage with React

Create a custom react hook

```javascript
import { useEffect, useRef, useState } from 'react';

function useReactiveState(Handler, keyName) {
  const listenerRef = useRef();
  const [value, setValue] = useState(
    keyName ? Handler.getValue(keyName) : Handler.getState()
  );
  useEffect(() => {
    listenerRef.current = Handler.subscriber$.subscribe((state) => {
      if (keyName) {
        setValue(state[keyName]);
      } else {
        setValue(state);
      }
    });
    return () => {
      if (listenerRef.current) {
        listenerRef.current.unsubscribe();
      }
    };
  }, [keyName]);

  return value;
}

export default useReactiveState;
```

Now you can easily reuse this generic custom hook, just add this code in the file created in Step 1

```javascript
export function useAppState(keyName) {
  return useReactiveState(AppStateHandler, keyName);
}
```

Lastly, just use this in your functional component

```javascript
// Returns single value from state
const value = useAppState('keyName');
// Returns current state
const state = useAppState();
```
