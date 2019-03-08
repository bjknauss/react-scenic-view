import React from 'react'
import ViewContext from './view-context'

export class IfView extends React.Component {
  static contextType = ViewContext

  render() {
    const { view, children } = this.props
    const context = this.context

    if (view !== context.view) {
      return null
    }

    if (typeof children === 'function') {
      return children(context)
    }

    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            view: context.view,
            setView: context.setView,
          })
        )}
      </React.Fragment>
    )
  }
}

export default IfView
