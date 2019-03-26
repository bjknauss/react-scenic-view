import React from 'react'
import { mount } from 'enzyme'
import ElseView from '../ElseView'
import { ViewContext } from '../view-context'
import { makeConsumerContext } from '../../../test/utils'

describe('render props', () => {
  test('uses render prop when view unselected', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <ElseView view="xyz">{({ view }) => <p>{view}</p>}</ElseView>
        </ViewContext.Provider>
      </div>
    )
    expect(wrap.exists('p')).toBe(true)
    const p = wrap.find('p')
    expect(p.text()).toBe('xyz')
  })

  test('renders null on view selected', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <ElseView view="abc">{({ view }) => <p>{view}</p>}</ElseView>
        </ViewContext.Provider>
      </div>
    )
    expect(wrap.exists('p')).toBe(false)
  })

  test('passes view and scenery as args', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <ElseView view="xyz">
            {({ view, scenery }) => (
              <p view={view} scenery={scenery}>
                xyz
              </p>
            )}
          </ElseView>
        </ViewContext.Provider>
      </div>
    )
    const p = wrap.find('p')
    expect(p.length).toBe(1)
    expect(p.prop('view')).toBe('xyz')
    expect(p.prop('scenery')).toBe(ctx)
  })
})

describe('child elements', () => {
  test('renders children when view unselected', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <ElseView view="xyz">
            <br />
          </ElseView>
        </ViewContext.Provider>
      </div>
    )
    expect(wrap.exists('br')).toBe(true)
  })

  test('does not render children when view is selected', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <ElseView view="abc">
            <br />
          </ElseView>
        </ViewContext.Provider>
      </div>
    )
    expect(wrap.exists('br')).toBe(false)
  })

  test('passes view and scenery context to each child', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <ElseView view="xyz">
            <p>d</p>
            <p>e</p>
            <p>f</p>
          </ElseView>
        </ViewContext.Provider>
      </div>
    )
    const ps = wrap.find('p')
    expect(ps.length).toBe(3)
    ps.forEach(node => {
      expect(node.prop('view')).toBe('xyz')
      expect(node.prop('scenery')).toBe(ctx)
    })
  })
})
