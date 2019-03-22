import React from 'react'
import PropTypes from 'prop-types'
import ViewContext from './view-context'
import {
  deselectViews,
  isViewSelected,
  selectViews,
  toViewObject,
  toggleViews,
} from '../utils'

export class Scene extends React.Component {
  static propTypes = {
    views: PropTypes.object,
    setViews: PropTypes.func,
  }

  static defaultProps = {
    views: {},
    setViews: function() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      deselectViews: this.deselectViews.bind(this),
      isViewSelected: this.isViewSelected.bind(this),
      selectViews: this.selectViews.bind(this),
      setViews: this.setViews.bind(this),
      toggleViews: this.toggleViews.bind(this),
      views: toViewObject(props.views),
    }
  }

  deselectViews(viewable) {
    this.props.setViews(deselectViews(this.state.views, viewable))
  }

  isViewSelected(view) {
    return isViewSelected(this.state.views, view)
  }

  selectViews(viewable) {
    this.props.setViews(selectViews(this.state.views, viewable))
  }

  setViews(viewable) {
    this.props.setViews(toViewObject(viewable))
  }

  toggleViews(viewable) {
    this.props.setViews(toggleViews(this.state.views, viewable))
  }

  componentDidUpdate(prevProps) {
    const { views, setViews } = this.props
    let newState = {}
    if (views !== prevProps.views) {
      newState.view = toViewObject(views)
    }
    if (setViews !== prevProps.setViews) {
      newState.setViews = setViews
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
