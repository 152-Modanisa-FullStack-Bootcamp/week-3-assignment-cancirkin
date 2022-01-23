import Counter from "../Counter";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex"
import {state} from "../store";

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

    test("buttons exist", () => {
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
})