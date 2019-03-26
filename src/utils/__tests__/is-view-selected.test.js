import isViewSelected from '../is-view-selected'

const makeViewObj = () => ({
  abc: true,
  xyz: false,
})

test('returns true if view is in the view object', () => {
  const vo = makeViewObj()
  expect(isViewSelected(vo, 'abc')).toBe(true)
})

test('returns false if view is in view object but false', () => {
  const vo = makeViewObj()
  expect(isViewSelected(vo, 'xyz')).toBe(false)
})

test('returns false if view is not in the view object', () => {
  const vo = makeViewObj()
  expect(isViewSelected(vo, 'random')).toBe(false)
})
