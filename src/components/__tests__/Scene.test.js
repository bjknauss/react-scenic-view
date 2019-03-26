import React from 'react'
import { mount } from 'enzyme'
import ViewContext from '../view-context'
import Scene from '../Scene'
import { ViewsList } from '../../../test/utils'

const Consumer = ViewContext.Consumer

const makeInitial = (val = {}) => {
  const initialValue = {
    abc: true,
    xyz: true,
    another: false,
  }
  return { ...initialValue, ...val }
}

test('views to be passed to context', () => {
  const ctx = makeInitial()
  const setViews = jest.fn()
  const wrap = mount(
    <Scene views={ctx} setViews={setViews}>
      <Consumer>{({ views }) => <ViewsList views={views} />}</Consumer>
    </Scene>
  )
  expect(wrap.find(ViewsList).prop('views')).toHaveProperty('abc', true)
})

test('views in context update when views prop updates', () => {
  const ctx = makeInitial()
  const onViewsChange = jest.fn()
  const wrap = mount(
    <Scene views={ctx} onViewsChange={onViewsChange}>
      <Consumer>{({ views }) => <ViewsList views={views} />}</Consumer>
    </Scene>
  )
  wrap.setProps({ views: { testing: true } })
  wrap.update()
  const vl = wrap.find(ViewsList)
  const views = vl.prop('views')
  expect(views.abc).not.toBeTruthy()
  expect(views.testing).toBeTruthy()
})

test('onViewsChange is updated when prop changes', () => {
  const ctx = makeInitial()
  const onViewsChange = jest.fn()
  const updatedViewsChange = jest.fn()
  const wrap = mount(
    <Scene views={ctx} onViewsChange={onViewsChange}>
      <Consumer>
        {({ views, setViews }) => (
          <ViewsList views={views}>
            <button onClick={() => setViews('random')} />
          </ViewsList>
        )}
      </Consumer>
    </Scene>
  )
  wrap.setProps({ onViewsChange: updatedViewsChange })
  wrap.update()
  const btn = wrap.find('button')
  btn.simulate('click')
  expect(updatedViewsChange).toHaveBeenCalledWith({ random: true })
})

test('deselectViews passes views to onViewsChange', () => {
  const ctx = makeInitial()
  const onViewsChange = jest.fn()
  const wrap = mount(
    <Scene views={ctx} onViewsChange={onViewsChange}>
      <Consumer>
        {({ views, deselectViews }) => (
          <ViewsList views={views}>
            <button onClick={() => deselectViews('abc')} />
          </ViewsList>
        )}
      </Consumer>
    </Scene>
  )
  const btn = wrap.find('button')
  btn.simulate('click')
  const call = onViewsChange.mock.calls[0][0]
  expect(call.abc).not.toBeTruthy()
  expect(call.xyz).toBeTruthy()
})

test('isViewSelected is passed in context', () => {
  const ctx = makeInitial()
  const onViewsChange = jest.fn()
  const wrap = mount(
    <Scene views={ctx} onViewsChange={onViewsChange}>
      <Consumer>
        {({ views, isViewSelected }) => (
          <ViewsList views={views} isViewSelected={isViewSelected} />
        )}
      </Consumer>
    </Scene>
  )
  const vl = wrap.find(ViewsList)
  const isViewSelected = vl.prop('isViewSelected')
  expect(isViewSelected('abc')).toBeTruthy()
  expect(isViewSelected('another')).toBeFalsy()
  expect(isViewSelected('random value')).toBeFalsy()
})

test('selectViews enables views', () => {
  const ctx = makeInitial({ xyz: false })
  const onViewsChange = jest.fn()
  const wrap = mount(
    <Scene views={ctx} onViewsChange={onViewsChange}>
      <Consumer>
        {({ views, selectViews }) => (
          <ViewsList views={views}>
            <button
              onClick={() => selectViews(['abc', 'testing', 'another'])}
            />
          </ViewsList>
        )}
      </Consumer>
    </Scene>
  )
  const btn = wrap.find('button')
  btn.simulate('click')
  const call = onViewsChange.mock.calls[0][0]
  expect(call.abc).toBeTruthy()
  expect(call.xyz).toBeFalsy()
  expect(call.testing).toBeTruthy()
  expect(call.another).toBeTruthy()
})

test('setViews sets the views to the value passed', () => {
  const ctx = makeInitial()
  const onViewsChange = jest.fn()
  const wrap = mount(
    <Scene views={ctx} onViewsChange={onViewsChange}>
      <Consumer>
        {({ views, setViews }) => (
          <ViewsList views={views}>
            <button onClick={() => setViews(['testing', 'random'])} />
          </ViewsList>
        )}
      </Consumer>
    </Scene>
  )
  const btn = wrap.find('button')
  btn.simulate('click')
  const call = onViewsChange.mock.calls[0][0]
  expect(call.abc).toBeFalsy()
  expect(call.testing).toBeTruthy()
  expect(call.random).toBeTruthy()
})

test('toggleViews toggles the views passed', () => {
  const ctx = makeInitial()
  const onViewsChange = jest.fn()
  const wrap = mount(
    <Scene views={ctx} onViewsChange={onViewsChange}>
      <Consumer>
        {({ views, toggleViews }) => (
          <ViewsList views={views}>
            <button onClick={() => toggleViews(['abc', 'another', 'random'])} />
          </ViewsList>
        )}
      </Consumer>
    </Scene>
  )
  const btn = wrap.find('button')
  btn.simulate('click')
  const call = onViewsChange.mock.calls[0][0]
  expect(call.xyz).toBeTruthy()
  expect(call.abc).toBeFalsy()
  expect(call.another).toBeTruthy()
  expect(call.random).toBeTruthy()
})
