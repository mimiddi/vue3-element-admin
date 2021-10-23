// svgo svg压缩配置
const svgoOptions = {
  plugins: [
    {
      removeAttrs: {
        attrs: ['fill', 'fill-rule']
      }
    }
  ]
}
