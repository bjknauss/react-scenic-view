import React from 'react'
import PropTypes from 'prop-types'
import ViewContext from './view-context'

export class Scene extends React.Component {
  static propTypes = {
    view: PropTypes.string,
    setView: PropTypes.func,
  }

  static defaultProps = {
    view: '',
    setView: function() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      view: props.view,
      setView: props.setView,
    }
  }

  componentDidUpdate(prevProps) {
    const { view, setView } = this.props
    let newState = {}
    if (view !== prevProps.view) {
      newState.view = view
    }
    if (setView !== prevProps.setView) {
      newState.setView = setView
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
    }
  }

  render() {
    return (
      <ViewContext.Provider value={this.state}>
        {this.props.children}
      </ViewContext.Provider>
    )
  }
}

export default Scene
