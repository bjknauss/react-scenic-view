import React from 'react'
import { mount } from 'enzyme'
import ViewContext from '../view-context'

const createConsumer = () =>
  mount(
    <div>
      <ViewContext.Consumer>
        {ctx => <TestProp {...ctx} />}
      </ViewContext.Consumer>
    </div>
  )

const TestProp = props => <br />

describe('default context', () => {
  test('includes views object', () => {
    const wrap = createConsumer()
    const tp = wrap.find(TestProp)
    expect(tp.prop('views')).toEqual({})
  })

  test('includes fns: deselectViews, selectViews, setViews, toggleViews', () => {
    const fns = ['deselectViews', 'selectViews', 'setViews', 'toggleViews']
    const wrap = createConsumer()
    const tp = wrap.find(TestProp)
    fns.forEach(f => {
      const propFn = tp.prop(f)
      expect(typeof propFn).toBe('function')
      expect(propFn()).toBe(undefined)
    })
  })

  test('isViewSelected returns false', () => {
    const wrap = createConsumer()
    const tp = wrap.find(TestProp)
    const isViewSelected = tp.prop('isViewSelected')
    expect(isViewSelected()).toBe(false)
  })
})
