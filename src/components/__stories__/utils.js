import React from 'react'
import AutoScene from '../AutoScene'

export const sceneDecorator = selectedView => storyFn => (
  <div style={{ textAlign: 'center' }}>
    <AutoScene initialView={selectedView}>
      <h1>Selected View: {selectedView}</h1>
      <div
        style={{
          padding: 20,
          margin: 20,
          border: '2px solid lightgray',
          borderRadius: 2,
        }}
      >
        {storyFn()}
      </div>
    </AutoScene>
  </div>
)
