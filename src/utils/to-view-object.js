/**
 *
 * @param {*} inputViews
 * @return {Object<string, boolean>}
 */
export default function toViewObject(inputViews) {
  const inputType = typeof inputViews
  if (inputType === 'undefined' || inputViews === null) {
    return {}
  }
  if (inputType === 'string') {
    return { [inputViews]: true }
  }

  if (Array.isArray(inputViews)) {
    return inputViews.reduce((views, current) => {
      views[current] = true
      return views
    }, {})
  }

  if (inputType === 'object') {
    return Object.keys(inputViews).reduce((views, current) => {
      views[current] = !!inputViews[current]
      return views
    }, {})
  }
  return {}
}
