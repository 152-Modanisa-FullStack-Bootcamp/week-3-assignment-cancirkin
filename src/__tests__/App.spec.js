import App from "../App";
import {createLocalVue, mount} from "@vue/test-utils";
import {actions, getters, mutations, state} from "../store";
import Vuex from "vuex";
import Counter from "../Counter";

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    return mount(App, {
        localVue,
        store: new Vuex.Store({
            state,
            getters
        })
    });
}

describe('App.vue', () => {

    test('h1 element render correctly', () => {
        const wrapper = mountComponent()
        const h1Element = wrapper.find('h1')
        expect(h1Element.exists()).toBeTruthy()
        expect(h1Element.text()).toEqual('Daily Corona Cases in Turkey')
    })

    test('Notification Area text message check', () => {
        const dailyCount = 3
        const localVue = createLocalVue()
        localVue.use(Vuex)
        const wrapper = mount(App, {
            localVue,
            store: new Vuex.Store({
                state:{
                    count: dailyCount
                },
                getters,
            })
        })

        const countText = wrapper.find('.notificationArea').text()
        expect(countText).toEqual(`So safe. Case count is ${dailyCount}k`)
    })

    it.each`
        caseName | count | expectedStyle 
        ${'when count 15'} | ${15} | ${"danger"}
        ${'when count 5'} | ${5} | ${"normal"}
        ${'when count 0'} | ${0} | ${"safe"}
    `('returns $expectedStyle when $caseName with count',
        async ({caseName, count, expectedStyle}) => {
            const wrapper = mount(App, {
                store: new Vuex.Store({
                    state,
                    getters
                })
            })
            wrapper.vm.$store.state.count = count
            await wrapper.vm.$nextTick()
            const notificationArea = wrapper.find('.notificationArea')
            expect(notificationArea.classes()).toContain(expectedStyle)
        });
})