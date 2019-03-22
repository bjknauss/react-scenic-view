import React from 'react'
import { storiesOf } from '@storybook/react'
import { sceneDecorator } from './utils'
import ElseView from '../ElseView'

storiesOf('ElseView', module)
  .addDecorator(sceneDecorator('a'))
  .add(
    'with a selected view',
    () => (
      <ElseView view="a">
        <p>This should not be visible.</p>
      </ElseView>
    ),
    { notes: 'Nothing should be visible here.' }
  )
  .add('with an unselected view', () => (
    <ElseView view="b">
      <p>View b is not selected.</p>
    </ElseView>
  ))
