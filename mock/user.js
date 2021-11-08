export default [
  // login
  {
    url: '/vue3-element-admin/user/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }) => {
      // 响应内容
      return +body.password === 123456
        ? {
          code: 20000,
          message: '登录成功',
          data: {
            token: '@word(50, 100)', // @word()是mockjs的语法
            refresh_token: '@word(50, 100)', // refresh_token是用来重新生成token的
          },
        }
        : {
          code: 40000,
          message: '密码错误',
        }
    },
  },
  // getUserInfo
  {
    url: '/vue3-element-admin/user/info',
    method: 'get',
    timeout: 100,
    statusCode: 200,
    response: {
      code: 20000,
      message: '获取用户信息成功',
      data: {
        id: 1,
        name: 'jpp',
        // 'role|1': ['admin', 'visitor'], // 随机返回一个角色admin或visitor
        // 超级管理员
        role: {
          type: 'admin'
        },
        // role: {
        //   type: 'visitor', // 管理员（普通管理员还需要根据权限表决定显示哪些菜单和页面）
        //   access: ['table/index', 'table/detail', 'table2/index', 'table3/index', 'permission/index', 'permission/edit'], // 权限为结构树生成的自定义权限，返回可配置的权限数组
        // },
        avatar: "@image('48x48', '#fb0a2a')",
      },
    },
  },
]
