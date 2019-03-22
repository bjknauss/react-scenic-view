import React from 'react'
import { storiesOf } from '@storybook/react'
import AutoScene from '../AutoScene'
import IfView from '../IfView'
import { Border } from './utils'

const ViewInfo = ({ view, children }) => (
  <Border>
    <h4>View: {view}</h4>
    <p>{children}</p>
  </Border>
)

storiesOf('AutoScene', module)
  .add('with one view', () => (
    <AutoScene initialViews="a">
      <IfView view="a">
        <p>visible</p>
      </IfView>
      <IfView view="b">
        <p>invisible</p>
      </IfView>
    </AutoScene>
  ))
  .add('with array of views', () => (
    <AutoScene initialViews={['a', 'b']}>
      <IfView view="a">
        <ViewInfo>Should be visible.</ViewInfo>
      </IfView>
      <IfView view="b">
        <ViewInfo>Should also be visible.</ViewInfo>
      </IfView>
      <IfView view="c">
        <ViewInfo>Should not be visible.</ViewInfo>
      </IfView>
    </AutoScene>
  ))
  .add('with object of views', () => (
    <AutoScene initialViews={{ a: true, b: true, c: false }}>
      <IfView view="a">
        <ViewInfo>Should be visible.</ViewInfo>
      </IfView>
      <IfView view="b">
        <ViewInfo>Should also be visible.</ViewInfo>
      </IfView>
      <IfView view="c">
        <ViewInfo>Should not be visible.</ViewInfo>
      </IfView>
    </AutoScene>
  ))
