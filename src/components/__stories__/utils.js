import React from 'react'
import AutoScene from '../AutoScene'
import IfView from '../IfView'

export const sceneDecorator = selectedViews => storyFn => (
  <div style={{ textAlign: 'center' }}>
    <AutoScene initialViews={selectedViews}>
      <h1>Selected View: {selectedViews}</h1>
      <Border>{storyFn()}</Border>
    </AutoScene>
  </div>
)

export const Border = ({ margin = 10, padding = 10, radius = 2, children }) => (
  <div
    style={{
      padding,
      margin,
      border: `${radius}px solid lightgray`,
    }}
  >
    {children}
  </div>
)

export const IfViewInfo = ({ view, children }) => (
  <IfView view={view}>
    <Border>
      <h4>View: {view}</h4>
      <p>{children}</p>
    </Border>
  </IfView>
)
