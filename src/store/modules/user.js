import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_USERINFO: (state, user_info) => {
    state.user_info = user_info
  }
}

const actions = {
  // user login
  login({ commit }, loginForm) {
    const { username, password } = loginForm
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data, message } = response
        const { token } = data
        commit('SET_TOKEN', token)
        setToken(token)
        resolve({ message })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { role, name, avatar } = data
        // 权限必须存在
        if (!role || !role.type) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLE', role)
        commit('SET_USERINFO', { name, avatar })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getUserInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getUserInfo(state.token).then(response => {
  //       const { data } = response
  //       if (!data) {
  //         reject('验证失败，请重新登录')
  //       }

  //       const { role, name, avatar } = data
  //       // 权限必须存在
  //       if (!role || !role.type) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }

  //       commit('SET_ROLE', role)
  //       commit('SET_USERINFO', { name, avatar })
  //     })
  //     // const { data } = response
  //     const { data } = {
  //       code: 1,
  //       data: {
  //         roles: ['admin'],
  //         introduction: 'I am a super administrator',
  //         avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  //         name: 'Super Admin'
  //       }
  //     }

  //     if (!data) {
  //       reject('Verification failed, please Login again.')
  //     }

  //     const { roles, name, avatar, introduction } = data

  //     // roles must be a non-empty array
  //     if (!roles || roles.length <= 0) {
  //       reject('getInfo: roles must be a non-null array!')
  //     }
  //     commit('SET_ROLE', roles)
  //     // commit('SET_NAME', name)
  //     // commit('SET_AVATAR', avatar)
  //     // commit('SET_INTRODUCTION', introduction)
  //     resolve(data)
  //   })
  // },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token'

  //   commit('SET_TOKEN', token)
  //   setToken(token)

  //   const { roles } = await dispatch('getInfo')

  //   resetRouter()

  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes)

  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true })
  // }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
