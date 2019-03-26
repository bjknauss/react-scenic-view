import deselectViews from '../deselect-views'

const makeViewObj = () => ({
  abc: true,
  def: true,
  xyz: false,
})

test('returns deselected views merged with the view object', () => {
  const viewObj = makeViewObj()
  const expected = {
    abc: true,
    def: false,
    xyz: false,
  }
  const result = deselectViews(viewObj, { def: false, xyz: false })
  expect(result).toEqual(expected)
})

test('accepts string view', () => {
  const viewObj = makeViewObj()
  const expected = {
    abc: true,
    def: false,
    xyz: false,
  }
  const result = deselectViews(viewObj, 'def')
  expect(result).toEqual(expected)
})

test('accepts array', () => {
  const viewObj = makeViewObj()
  const expected = {
    abc: true,
    def: false,
    xyz: false,
  }
  const result = deselectViews(viewObj, ['def'])
  expect(result).toEqual(expected)
})
