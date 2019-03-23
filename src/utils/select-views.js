import toViewObject from './to-view-object'

export default function selectViews(viewObj, selectedViews) {
  return { ...viewObj, ...toViewObject(selectedViews) }
}
