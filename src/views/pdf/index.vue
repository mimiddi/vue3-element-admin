<template>
  <div class="pdf-container">
    <!--此处根据pdf的页数动态生成相应数量的canvas画布-->
    <canvas v-for="pageIndex in pdfPages" :id="`pdf-canvas-`+pageIndex" :key="pageIndex" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import * as PdfJs from 'pdfjs-dist/legacy/build/pdf.js' // 注意导入的写法
import Pdf from '@/assets/files/test.pdf'

export default defineComponent({
  setup() {
    const state = reactive({
      pdfPages: 0
    })

    let pdfDoc = ''
    const pdfScale = 1.0

    const loadFile = function(page = 1) {
      // Setting worker path to worker bundle.
      PdfJs.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js'

      const loadingTask = PdfJs.getDocument(Pdf)
      loadingTask.promise
        .then(function(pdf) {
          pdfDoc = pdf
          state.pdfPages = pdf.numPages
          return renderPage(page)
        })
        .catch(function(reason) {
          console.error('Error: ' + reason)
        })
    }

    const renderPage = function(page) {
      pdfDoc.getPage(page).then(function(pdfPage) {
        const canvasId = 'pdf-canvas-' + page // 第num个canvas画布的id
        const canvas = document.getElementById(canvasId)
        // 以下canvas的使用过程
        const ctx = canvas.getContext('2d')

        // const dpr = window.devicePixelRatio || 1
        // const bsr = ctx.webkitBackingStorePixelRatio ||
        //           ctx.mozBackingStorePixelRatio ||
        //           ctx.msBackingStorePixelRatio ||
        //           ctx.oBackingStorePixelRatio ||
        //           ctx.backingStorePixelRatio ||
        //           1
        // const ratio = dpr / bsr

        // Display page on the existing canvas with 100% scale.
        const viewport = pdfPage.getViewport({ scale: pdfScale }) // 设置pdf文件显示比例
        canvas.width = viewport.width
        canvas.height = viewport.height

        // canvas.style.width = viewport.width + 'px'
        // canvas.style.height = viewport.height + 'px'
        // ctx.setTransform(ratio, 0, 0, ratio, 0, 0) // 设置当pdf文件处于缩小或放大状态时，可以拖动

        const renderContext = {
          canvasContext: ctx,
          viewport
        }
        // 将pdf文件的内容渲染到canvas中
        // const renderTask = pdfPage.render(renderContext)
        // return renderTask.promise

        pdfPage.render(renderContext)
        if (state.pdfPages > page) {
          const temp = page + 1
          loadFile(temp)
        }
      })
    }

    // Request a first page
    loadFile()

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>
