import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { storeConfig } from '../../src/static/store.js'
import SidePanel from '@/components/SidePanel/SidePanel.vue'

let store
const localVue = createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
  store = new Vuex.Store(storeConfig)
})

describe('SidePanel.vue', () => {
  it('renders props.mobile when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SidePanel, {
      propsData: {
        mobile: true,
        title: 'Panel Title'
      },
      store,
      localVue
    })
    expect(wrapper.find('.mobile-header').exists()).toBe(true)
    expect(wrapper.find('.sub-heading').text()).toBe('Panel Title')
  })
})
