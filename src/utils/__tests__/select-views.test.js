import selectViews from '../select-views'

const makeViewObj = () => ({
  abc: true,
  xyz: false,
  another: false,
})

test('selectViews enables the views passed to be selected', () => {
  const vo = makeViewObj()
  const expected = {
    abc: true,
    xyz: true,
    another: false,
  }
  expect(selectViews(vo, { abc: true, xyz: true })).toEqual(expected)
})

test('accepts strings', () => {
  const vo = makeViewObj()
  const expected = {
    abc: true,
    xyz: true,
    another: false,
  }
  expect(selectViews(vo, 'xyz')).toEqual(expected)
})

test('accepts arrays of strings', () => {
  const vo = makeViewObj()
  const expected = {
    abc: true,
    xyz: true,
    another: false,
  }
  expect(selectViews(vo, ['xyz'])).toEqual(expected)
})
