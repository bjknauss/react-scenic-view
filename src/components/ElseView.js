import React from 'react'
import ViewContext from './view-context'

export class ElseView extends React.Component {
  static contextType = ViewContext

  render() {
    const { view, children } = this.props
    const { isViewSelected } = this.context

    if (isViewSelected(view)) {
      return null
    }

    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            view,
            ...this.context,
          })
        )}
      </React.Fragment>
    )
  }
}

export default ElseView
