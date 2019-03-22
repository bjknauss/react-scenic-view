import React from 'react'
import AutoScene from '../AutoScene'

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
