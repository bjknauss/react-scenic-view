import React from 'react'

export const ViewContext = React.createContext({
  views: {},
  deselectViews: function() {},
  isViewSelected: function() {
    return false
  },
  selectViews: function() {},
  setViews: function() {},
  toggleViews: function() {},
})

export default ViewContext
