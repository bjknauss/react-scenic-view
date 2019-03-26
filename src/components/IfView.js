import React from 'react'
import ViewContext from './view-context'

export class IfView extends React.Component {
  static contextType = ViewContext

  render() {
    const { view, children } = this.props
    const { isViewSelected } = this.context
    const childProps = {
      view,
      scenery: this.context,
    }

    if (!isViewSelected(view)) {
      return null
    }

    if (typeof children === 'function') {
      return children(childProps)
    }

    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, childProps)
        )}
      </React.Fragment>
    )
  }
}

export default IfView
