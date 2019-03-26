import toViewObject from '../to-view-object'

test('undefined returns an empty object', () => {
  expect(toViewObject()).toEqual({})
})

test('null returns empty object', () => {
  expect(toViewObject(null)).toEqual({})
})

test('accepts strings and converts to an object with string as property with true as value', () => {
  expect(toViewObject('abc')).toEqual({ abc: true })
})

test('accepts array and converts to obj with items in arrays as props', () => {
  expect(toViewObject(['abc', 'xyz'])).toEqual({ abc: true, xyz: true })
})

test('accepts objects and converts values to booleans', () => {
  const input = {
    abc: null,
    def: true,
    xyz: false,
    num: 1,
  }
  const expected = {
    abc: false,
    def: true,
    xyz: false,
    num: true,
  }
  expect(toViewObject(input)).toEqual(expected)
})

test('numbers and functions return empty objects', () => {
  expect(toViewObject(1)).toEqual({})
  expect(toViewObject(() => 'abc')).toEqual({})
})
