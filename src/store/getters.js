const getters = {
  // 页面基础配置
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  // 缓存页面
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // 登录信息
  token: state => state.user.token,
  user_info: state => state.user.user_info,
  role: state => state.user.role,
  // 根据role获取的路由
  permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs
  testState: state => state.testState.testState
}

export default getters
