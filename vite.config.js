import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// element-ui auto import
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// svg插件
import viteSvgIcons from 'vite-plugin-svg-icons'

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
export default ({command, mode}) => {
  return defineConfig({
    // https://vitejs.dev/config/#server-host
    server: {
      base: '/',
      host: '0.0.0.0', // --host 显示Network的ip
      port: port,
      open: true, // --open 运行时打开浏览器
      // 跨域
      proxy: {
        // 开发模式下，将/dev-api去除
        '/dev-api': {
          target: 'http://xcztc.cn', // 要请求的地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, '')
        }
      }
    },
    plugins: [
      vue(),

      // element-ui auto import
      Components({
        resolvers: [ElementPlusResolver()],
      }),

      // svg
      viteSvgIcons({
        // 配置路劲在你的src里的svg存放文件
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src')
      }
    }
  })
}
