import React from 'react'
import { storiesOf } from '@storybook/react'
import { sceneDecorator } from './utils'
import IfView from '../IfView'

storiesOf('IfView', module)
  .addDecorator(sceneDecorator('a'))
  .add('with selected view', () => (
    <IfView view="a">
      <p>visible</p>
    </IfView>
  ))
  .add(
    'with unselected view',
    () => (
      <IfView view="b">
        <p>not visible</p>
      </IfView>
    ),
    { notes: 'Nothing should be visible since b is not the selected view.' }
  )
