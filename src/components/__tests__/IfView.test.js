import React from 'react'
import { mount } from 'enzyme'
import IfView from '../IfView'
import { ViewContext } from '../view-context'
import { makeConsumerContext } from '../../../test/utils'

describe('render props', () => {
  test('uses render prop on correct view', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <IfView view="abc">{({ view }) => <p>{view}</p>}</IfView>
        </ViewContext.Provider>
      </div>
    )
    expect(wrap.exists('p')).toBe(true)
    const p = wrap.find('p')
    expect(p.text()).toBe('abc')
  })

  test('renders null on incorrect view', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <IfView view="xyz">{({ view }) => <p>{view}</p>}</IfView>
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
          <IfView view="abc">
            {({ view, scenery }) => (
              <p view={view} scenery={scenery}>
                xyz
              </p>
            )}
          </IfView>
        </ViewContext.Provider>
      </div>
    )
    const p = wrap.find('p')
    expect(p.length).toBe(1)
    expect(p.prop('view')).toBe('abc')
    expect(p.prop('scenery')).toBe(ctx)
  })
})

describe('child elements', () => {
  test('renders children on correct view', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <IfView view="abc">
            <br />
          </IfView>
        </ViewContext.Provider>
      </div>
    )
    expect(wrap.exists('br')).toBe(true)
  })

  test('does not render children when view is not selected', () => {
    const ctx = makeConsumerContext({ abc: true })
    const wrap = mount(
      <div>
        <ViewContext.Provider value={ctx}>
          <IfView view="xyz">
            <br />
          </IfView>
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
          <IfView view="abc">
            <p>d</p>
            <p>e</p>
            <p>f</p>
          </IfView>
        </ViewContext.Provider>
      </div>
    )
    const ps = wrap.find('p')
    expect(ps.length).toBe(3)
    ps.forEach(node => {
      expect(node.prop('view')).toBe('abc')
      expect(node.prop('scenery')).toBe(ctx)
    })
  })
})
