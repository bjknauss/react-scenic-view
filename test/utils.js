import React from 'react'

export const makeConsumerContext = (views = { abc: true }) => {
  const isViewSelected = jest.fn(v => !!views[v])
  return {
    views,
    deselectViews: jest.fn(),
    isViewSelected,
    selectViews: jest.fn(),
    setViews: jest.fn(),
    toggleViews: jest.fn(),
  }
}

export const ViewsList = ({ views, children }) => {
  const lis = []
  for (const v in views) {
    if (views[v]) {
      lis.push(<li key={v}>{v}</li>)
    }
  }

  return (
    <div>
      <ul>{lis}</ul>
      {children}
    </div>
  )
}
