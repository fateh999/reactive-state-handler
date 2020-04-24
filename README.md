# reactive-state-handler

A Cross Framework Javascript State Management Library using rxjs

[![NPM](https://nodei.co/npm/reactive-state-handler.png?downloads=true)](https://nodei.co/npm/reactive-state-handler/)

## Install Peer Dependency ( in case not installed already )

```javascript
  npm i rxjs
```

## Steps to Install

```javascript
  npm i reactive-state-handler
```

## Example Usage

1. Create a new file (suppose ReactiveStateHandler.js) and initialize your initial state and default export Singleton Class.

```javascript
import ReactiveState from "reactive-state-handler";

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
ReactiveStateHandler.subscriber$.subscribe((state: any) => {
  console.log("State Changed", state);
});

// Used for setting a single value in our state
ReactiveStateHandler.setValue(keyName: string, value: any);

// Returns single value from state
ReactiveStateHandler.getValue(keyName: string);

// Used for setting multiple values in the state
ReactiveStateHandler.setState(values: any);

// Returns current state
ReactiveStateHandler.getState();

// Used to reset state back to initial state
ReactiveStateHandler.resetState();
```
