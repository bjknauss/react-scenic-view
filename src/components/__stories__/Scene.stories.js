import React from 'react'
import { storiesOf } from '@storybook/react'
import Scene from '../Scene'
import { IfViewInfo } from './utils'

class SceneWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      views: {
        abc: true,
        xyz: false,
      },
      setViews: this.setViews.bind(this),
    }
  }

  setViews(views) {
    this.setState({ views })
  }

  render() {
    const { views, setViews } = this.state
    return (
      <Scene views={views} setViews={setViews}>
        {this.props.children}
      </Scene>
    )
  }
}

storiesOf('Scene', module).add('with views', () => (
  <SceneWrapper>
    <IfViewInfo view="abc">This view should be visible.</IfViewInfo>
    <IfViewInfo view="xyz">This view should not be visible.</IfViewInfo>
  </SceneWrapper>
))
