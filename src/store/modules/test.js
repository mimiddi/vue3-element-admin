const state = {
  testState: false
}

const mutations = {
  SET_TEST_STATE: (state, boolean) => {
    state.testState = boolean
  }
}

const actions = {
  setTestState({ commit }, boolean) {
    return new Promise(resolve => {
      commit('SET_TEST_STATE', boolean)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
