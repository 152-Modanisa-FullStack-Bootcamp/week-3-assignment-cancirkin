import Counter from "../Counter";
import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import Vuex from "vuex"
import {actions, getters, mutations, state} from "../store";

describe('Counter.vue', () => {
    test("Counter component exist", () => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        let wrapper = shallowMount(Counter, {
            localVue,
            store: new Vuex.Store({
                state
            })
        })
        expect(wrapper.exists()).toBe(true)
    })

    test("Increase and decrease buttons exist", () => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        let wrapper = shallowMount(Counter, {
            localVue,
            store: new Vuex.Store({
                state
            })
        })
        expect(wrapper.find('#increase-button').exists()).toBeTruthy()
        expect(wrapper.find('#decrease-button').exists()).toBeTruthy()
    })

    test('Increment button work correctly', async () => {
        let dispatchMock = jest.fn()
        const wrapper = shallowMount(Counter,{
            mocks:{
                $store: {
                    state,
                    dispatch: dispatchMock
                }
            }
        })

        const button = wrapper.find('#increase-button')
        await button.trigger('click')
        expect(dispatchMock).toHaveBeenCalledWith('increment')
    })

    test('Decrement button work correctly', async () => {
        let dispatchMock = jest.fn()
        const wrapper = shallowMount(Counter,{
            mocks:{
                $store: {
                    state,
                    dispatch: dispatchMock
                }
            }
        })

        const button = wrapper.find('#decrease-button')
        await button.trigger('click')
        expect(dispatchMock).toHaveBeenCalledWith('decrement')
    })

    test('Count text is exist', () => {
        const wrapper = shallowMount(Counter,{
            mocks:{
                $store: {
                    state,
                }
            }
        })
        const countText = wrapper.find('span')
        expect(countText.exists()).toBeTruthy()
    })

    test('2 increase + decrease functionality check together', async () => {
        const localVue = createLocalVue()
        localVue.use(Vuex)
        const wrapper = mount(Counter, {
            localVue,
            store: new Vuex.Store({
                state,
                getters,
                actions,
                mutations
            })
        })
        const increaseButton = wrapper.find('#increase-button')
        const decreaseButton = wrapper.find('#decrease-button')
        await increaseButton.trigger('click')
        await increaseButton.trigger('click')
        await decreaseButton.trigger('click')
        expect(wrapper.vm.$store.state.count).toEqual(1)
    })
})