import React from 'react'
import ViewContext from './view-context'
import {
  deselectViews,
  isViewSelected,
  selectViews,
  toViewObject,
  toggleViews,
} from '../utils'
import { Viewable } from '../shared-props'
import PropTypes from 'prop-types'

export class AutoScene extends React.Component {
  static defaultProps = {
    initialViews: '',
  }

  static propTypes = {
    initialViews: Viewable,
  }

  constructor(props) {
    super(props)
    this.state = {
      views: toViewObject(props.initialViews),
      deselectViews: this.deselectViews.bind(this),
      isViewSelected: this.isViewSelected.bind(this),
      selectViews: this.selectViews.bind(this),
      setViews: this.setViews.bind(this),
      toggleViews: this.toggleViews.bind(this),
    }
  }

  deselectViews(viewable) {
    this.setState(state => {
      return {
        views: deselectViews(state.views, viewable),
      }
    })
  }

  isViewSelected(view) {
    const { views } = this.state
    return isViewSelected(views, view)
  }

  selectViews(viewable) {
    this.setState(state => {
      return {
        views: selectViews(state.views, viewable),
      }
    })
  }

  setViews(viewable) {
    this.setState({ views: toViewObject(viewable) })
  }

  toggleViews(views) {
    this.setState(state => {
      return {
        views: toggleViews(state.views, views),
      }
    })
  }

  render() {
    return (
      <ViewContext.Provider value={this.state}>
        {this.props.children}
      </ViewContext.Provider>
    )
  }
}

export default AutoScene
