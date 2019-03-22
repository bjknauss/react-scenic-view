import toViewObject from './to-view-object'

export default function(viewObj, toggledViews) {
  const toggled = toViewObject(toggledViews)
  for (const view in toggled) {
    toggled[view] = !viewObj[view]
  }
  return { ...viewObj, ...toggled }
}
