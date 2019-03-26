## Scenic View

A simple view management library to make managing conditionally rendered components simple. This library is still in early stages so the API is likely to change. This library uses React's context API to control what components get rendered. If you have any questions or suggestions, I'd love to hear them.

Here is a very simple example for demonstration purposes:

```jsx
import React from 'React'
import { AutoScene, IfView, ElseView } from '@knaussb/scenic-view'

const App = props => (
  <AutoScene
    initialViews={{
      clean: true,
      loading: false,
      submitting: false,
      error: false,
      valid: true,
    }}
  >
    <form>
      <IfView view="error">
        <h3>An error has occurred!</h3>
      </IfView>
      <IfView view="loading">
        <LoadingPanel>
          <h1>Loading... Please wait.</h1>
        </LoadingPanel>
      </IfView>
      <ElseView view="valid">
        <input type="submit" value="Submit" />
      </ElseView>
    </form>
  </AutoScene>
)
```

### Scene

The `Scene` component is a fully controlled component that requires `views` and `onViewsChange` props.

### AutoScene

The `AutoScene` component is the uncontrolled equivalent of the `Scene` component. It has an `initialViews` prop that it uses to set the views on mount.

### Viewable Type

The `Viewable` type is the types that functions like `toggleViews`, `unselectViews`, etc. can accept which can be resolved to "view objects". It is either a string, array of strings, or plain object.

### IfView

The `IfView` component takes a `view` prop and children can be react elements or a render function. It will only render it's children when the view is enabled.

```jsx
const Example = props => (
  <AutoScene initialViews="abc">
    <IfView view="abc">
      <p>This will be rendered because the abc view is enabled.</p>
    </IfView>
    <IfView view="xyz">
      {() => <p>This will not be rendered because xyz is not enabled.</p>}
    </IfView>
  </AutoScene>
)
```

### ElseView

The `ElseView` component is the opposite of the `IfView` component in that it takes a view prop and only renders it's children when that view is not selected. It can also take children elements or as a render prop.

```jsx
const Example = props => (
  <AutoScene initialViews="abc">
    <IfView view="abc">
      <p>This will not be rendered because the abc view is enabled.</p>
    </IfView>
    <IfView view="xyz">
      {() => <p>This will be rendered because xyz is not enabled.</p>}
    </IfView>
  </AutoScene>
)
```
