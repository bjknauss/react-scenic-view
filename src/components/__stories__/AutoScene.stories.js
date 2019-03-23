import React from 'react'
import { storiesOf } from '@storybook/react'
import AutoScene from '../AutoScene'
import IfView from '../IfView'
import { IfViewInfo } from './utils'

storiesOf('AutoScene', module)
  .add('with one view', () => (
    <AutoScene initialViews="a">
      <IfViewInfo view="a">
        <p>visible</p>
      </IfViewInfo>
      <IfViewInfo view="b">
        <p>invisible</p>
      </IfViewInfo>
    </AutoScene>
  ))
  .add('with array of views', () => (
    <AutoScene initialViews={['a', 'b']}>
      <IfViewInfo view="a">Should be visible.</IfViewInfo>
      <IfViewInfo view="b">Should also be visible.</IfViewInfo>
      <IfViewInfo view="c">Should not be visible.</IfViewInfo>
    </AutoScene>
  ))
  .add('with object of views', () => (
    <AutoScene initialViews={{ a: true, b: true, c: false }}>
      <IfViewInfo view="a">Should be visible.</IfViewInfo>
      <IfViewInfo view="b">Should also be visible.</IfViewInfo>
      <IfViewInfo view="c">Should not be visible.</IfViewInfo>
    </AutoScene>
  ))
