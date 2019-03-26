import toViewObject from './to-view-object'

export default function deselectViews(viewObj, deselectedViews) {
  const deselected = toViewObject(deselectedViews)
  for (const view in deselected) {
    deselected[view] = false
  }
  return { ...viewObj, ...deselected }
}
