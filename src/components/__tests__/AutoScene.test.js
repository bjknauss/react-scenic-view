import React from 'react'
import { mount } from 'enzyme'
import AutoScene from '../AutoScene'
import ViewContext from '../view-context'
import { ViewsList } from '../../../test/utils'

const Consumer = ViewContext.Consumer

const makeInitial = () => ({
  abc: true,
  xyz: true,
  another: false,
})

test('can use initial views', () => {
  const init = makeInitial()
  const wrap = mount(
    <AutoScene initialViews={init}>
      <Consumer>{({ views }) => <ViewsList views={views} />}</Consumer>
    </AutoScene>
  )
  const lis = wrap.find('li')
  expect(lis.length).toBe(2)
})

describe('deselecting views', () => {
  const tests = [
    { name: 'accepts string value', value: 'xyz' },
    { name: 'accepts array of strings', value: ['xyz'] },
    { name: 'accepts object of <string, bool>', value: { xyz: true } },
  ]

  tests.forEach(t => {
    test(t.name, () => {
      const init = makeInitial()
      const wrap = mount(
        <AutoScene initialViews={init}>
          <Consumer>
            {({ deselectViews, views }) => (
              <ViewsList views={views}>
                <button onClick={() => deselectViews(t.value)} />
              </ViewsList>
            )}
          </Consumer>
        </AutoScene>
      )
      const btn = wrap.find('button')
      btn.simulate('click')
      const vl = wrap.find(ViewsList)
      const views = vl.prop('views')
      expect(views.abc).toBeTruthy()
      expect(views.xyz).toBeFalsy()
    })
  })
})

test('passes isViewSelected in context', () => {
  const init = makeInitial()
  const wrap = mount(
    <AutoScene initialViews={init}>
      <Consumer>
        {({ isViewSelected, views }) => (
          <ViewsList views={views} isViewSelected={isViewSelected} />
        )}
      </Consumer>
    </AutoScene>
  )
  const vl = wrap.find(ViewsList)
  let isViewSelected = vl.prop('isViewSelected')
  expect(isViewSelected('abc')).toBeTruthy()
  expect(isViewSelected('another')).toBeFalsy()
  expect(isViewSelected('random')).toBeFalsy()
})

describe('selecting views', () => {
  const tests = [
    { name: 'accepts string value', value: 'sel' },
    { name: 'accepts array of strings', value: ['sel'] },
    { name: 'accepts object of <string, bool>', value: { sel: true } },
  ]

  tests.forEach(t => {
    test(t.name, () => {
      const init = makeInitial()
      const wrap = mount(
        <AutoScene initialViews={init}>
          <Consumer>
            {({ selectViews, views }) => (
              <ViewsList views={views}>
                <button onClick={() => selectViews(t.value)} />
              </ViewsList>
            )}
          </Consumer>
        </AutoScene>
      )
      const btn = wrap.find('button')
      btn.simulate('click')
      const vl = wrap.find(ViewsList)
      const views = vl.prop('views')
      expect(views.abc).toBeTruthy()
      expect(views.another).toBeFalsy()
      expect(views.sel).toBeTruthy()
    })
  })
})

describe('setting views', () => {
  const tests = [
    { name: 'accepts string value', value: 'sel' },
    { name: 'accepts array of strings', value: ['sel'] },
    { name: 'accepts object of <string, bool>', value: { sel: true } },
  ]

  tests.forEach(t => {
    test(t.name, () => {
      const init = makeInitial()
      const wrap = mount(
        <AutoScene initialViews={init}>
          <Consumer>
            {({ setViews, views }) => (
              <ViewsList views={views}>
                <button onClick={() => setViews(t.value)} />
              </ViewsList>
            )}
          </Consumer>
        </AutoScene>
      )
      const btn = wrap.find('button')
      btn.simulate('click')
      const vl = wrap.find(ViewsList)
      const views = vl.prop('views')
      expect(views.abc).toBeFalsy()
      expect(views.sel).toBeTruthy()
    })
  })
})

describe('toggling views', () => {
  test('accepts string', () => {
    const init = makeInitial()
    const wrap = mount(
      <AutoScene initialViews={init}>
        <Consumer>
          {({ toggleViews, views }) => (
            <ViewsList views={views}>
              <button onClick={() => toggleViews('abc')} />
            </ViewsList>
          )}
        </Consumer>
      </AutoScene>
    )
    const btn = wrap.find('button')
    btn.simulate('click')
    const vl = wrap.find(ViewsList)
    const views = vl.prop('views')
    expect(views.abc).toBeFalsy()
    expect(views.xyz).toBeTruthy()
    expect(views.another).toBeFalsy()
  })

  const tests = [
    { name: 'accepts array of strings', value: ['abc', 'another', 'random'] },
    {
      name: 'accepts object of <string, bool>',
      value: { abc: true, another: true, random: true },
    },
  ]

  tests.forEach(t => {
    test(t.name, () => {
      const init = makeInitial()
      const wrap = mount(
        <AutoScene initialViews={init}>
          <Consumer>
            {({ toggleViews, views }) => (
              <ViewsList views={views}>
                <button onClick={() => toggleViews(t.value)} />
              </ViewsList>
            )}
          </Consumer>
        </AutoScene>
      )
      const btn = wrap.find('button')
      btn.simulate('click')
      const vl = wrap.find(ViewsList)
      const views = vl.prop('views')
      expect(views.abc).toBeFalsy()
      expect(views.xyz).toBeTruthy()
      expect(views.random).toBeTruthy()
      expect(views.another).toBeTruthy()
    })
  })
})
