import defaultSettings from '@/settings'

const {
  showSettings,
  fixedHeader,
  sidebarLogo,
  pageSizes,
  loginTimeOut,
  userinfo,
  socketURL,
  imgURL,pdfURL
} = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  pageSizes: pageSizes,
  loginTimeOut: loginTimeOut,
  userinfo: userinfo,
  socketURL: socketURL,
  imgURL: imgURL,
  pdfURL: pdfURL
  
}

const mutations = {
  CHANGE_SETTING: (state, {
    key,
    value
  }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({
    commit
  }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}