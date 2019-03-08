import React from 'react'
import ViewContext from './view-context'

export class AutoScene extends React.Component {
  static defaultProps = {
    initialView: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      view: props.initialView,
      setView: this.setView.bind(this),
    }
  }

  setView(view) {
    this.setState({ view })
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
