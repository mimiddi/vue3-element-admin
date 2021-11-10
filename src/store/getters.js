const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  user_info: state => state.user.user_info,
  role: state => state.user.role,
  permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs

  cachedViews: state => state.tagsView.cachedViews,

  testState: state => state.testState.testState
}

export default getters
