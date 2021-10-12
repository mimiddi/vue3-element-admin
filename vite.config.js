import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// element-ui auto import
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const port = process.env.port || process.env.npm_config_port || 9000 // dev port
console.info(process)

// https://vitejs.dev/config/
export default defineConfig({
  // https://vitejs.dev/config/#server-host
  server: {
    host: '0.0.0.0', // --host 显示Network的ip
    port: port,
    open: true, // --open 运行时打开浏览器
    // 跨域
    proxy: {
      'api': {
        target: 'http://xcztc.cn', // 要请求的地址
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': '/'
        }
      }
    }
  },
  plugins: [
    vue(),

    // element-ui auto import
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  }
})
