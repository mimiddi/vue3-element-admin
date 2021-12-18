import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * element-ui auto import
 * 但自定义主题不好使
 */
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 或者使用 unplugin-element-plus
// import ElementPlus from 'unplugin-element-plus/vite'

// svg插件
import viteSvgIcons from 'vite-plugin-svg-icons'

// mock
import { viteMockServe } from 'vite-plugin-mock'

// 国际化插件 https://kazupon.github.io/vue-i18n/zh/

/**
 * process.env.port：
 * dos命令，设置当前目录下的port：set port=9527
 * 查看当前 port： set port
 * 设置port为空： set port=
 *
 * process.env.npm_config_port：
 * dos命令运行项目时：npm run dev --port=9527
 */
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  return defineConfig({
    // https://vitejs.dev/config/#server-host
    server: {
      base: '/',
      host: '0.0.0.0', // --host 显示Network的ip
      port: port,
      open: true, // --open 运行时打开浏览器
      // 跨域
      proxy: {
        // 开发模式下，将/dev-api 转成 、/api
        '/dev-api': {
          // target: 'http://www.lgb.com', // 要请求的地址
          target: 'http://localhost:9528', // 要请求的地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, '/api')
        }
      }
    },
    plugins: [
      vue(),

      viteMockServe({
        ignore: /^_/, // 忽略以下划线`_`开头的文件
        mockPath: 'mock', // 指定mock目录中的文件全部是mock接口
        supportTs: false, // mockPath目录中的文件是否支持ts文件，现在我们不使用ts，所以设为false
        localEnabled: mode === 'mock', // 开发环境是否开启mock功能（可以在package.json的启动命令中指定mode为mock）
        prodEnabled: mode === 'mock', // 生产环境是否开启mock功能
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer';
          setupProdMockServer();
        `,
      }),

      // element-ui auto import
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [
      //     ElementPlusResolver({
      //       importStyle: "sass",
      //       // directives: true,
      //       // version: "1.2.0-beta.1",
      //     }),
      //   ],
      // }),
      // or use unplugin-element-plus
      // ElementPlus({
      //   useSource: true,
      // }),

      // svg
      viteSvgIcons({
        // 配置路劲在你的src里的svg存放文件
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 全局变量
          additionalData: '@import "./src/assets/styles/global-variables.scss";',
          // additionalData: `@use "./src/assets/styles/element-variables.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src')
      }
    },
    define: {
      'process.env': {} // 解决vue3被移除
    }
  })
}
