import toggleViews from '../toggle-views'

const makeViewObj = () => ({
  abc: true,
  xyz: false,
  another: false,
})

test('toggles views', () => {
  const vo = makeViewObj()
  const expected = {
    abc: false,
    xyz: true,
    another: false,
  }
  expect(toggleViews(vo, { abc: true, xyz: true })).toEqual(expected)
})

test('accepts string input', () => {
  const vo = makeViewObj()
  const expected = {
    abc: true,
    xyz: true,
    another: false,
  }
  expect(toggleViews(vo, 'xyz')).toEqual(expected)
})

test('accepts array of strings as input', () => {
  const vo = makeViewObj()
  const expected = {
    abc: false,
    xyz: true,
    another: false,
  }
  expect(toggleViews(vo, ['abc', 'xyz'])).toEqual(expected)
})
