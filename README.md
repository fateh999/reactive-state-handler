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
import { ReactiveState } from "reactive-state-handler";

export default new ReactiveState({
  loggedIn: false,
  user: null,
  darkMode: false,
  jwt: "",
});
```

2. Import in any file and then you can use any of it's methods & properties listed below

```typescript
// Used for listening to state changes
AppStateHandler.subscriber$.subscribe((state) => {
  console.log("State Changed", state);
});

// Used for setting values in the state
AppStateHandler.setState(values);

// Returns current state
const state = AppStateHandler.getState();

// Used to reset state back to initial state
AppStateHandler.resetState();
```

3. Usage with React

Create a custom react hook

```javascript
import { useReactiveStateHandler } from "reactive-state";

export function useAppState(filterKeys) {
  return useReactiveStateHandler(AppStateHandler, filterKeys);
}
```

Lastly, just use this in your functional component

```javascript
// Returns only values passed in the filterKeys, use this to reduce unnecessary re renders if other state values changes.
const [{ keyName1, keyName2 }, removeListener, addListener] = useAppState([
  "keyName1",
  "keyName2",
]);
// Returns current state
const [state, removeListener, addListener] = useAppState();
```
