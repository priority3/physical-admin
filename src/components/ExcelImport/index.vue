<template>
  <el-dialog
    class="excel-import"
    :visible.sync="uploadVisible"
    title="数据上传"
    @closed="uploadVisible = false"
  >
    <el-card class="diboot-import content">
      <div slot="header" class="clearfix">
        <span>数据上传</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          icon="el-icon-download"
          @click="handleDownloadExample"
        >下载示例文件</el-button>
      </div>
      <div class="clearfix upload-wrapper">
        <el-row type="flex" justify="space-around">
          <!-- <el-input v-model="comment" placeholder="备注信息" /> -->
          <el-upload
            class="upload-demo"
            drag
            :file-list="fileList"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            action
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-row>
        <el-row v-if="errMsg">
          <el-col :span="24">
            <el-alert type="error">
              <div>
                <b>请检查Excel文件，错误信息:</b>
                {{ errMsg }}
              </div>
            </el-alert>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button
        :disabled="uploadDisabled"
        type="primary"
        icon="el-icon-upload"
        @click="handleUpload"
      >上传数据</el-button>
      <el-button @click="uploadVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { export_excel_file } from '@/utils/exportFile'
export default {
  name: 'ExcelImport',
  components: {
  },

  props: {
    /**
     * 示例文件url
     */
    exampleUrl: {
      type: String,
      required: true
    },
    /**
     * 上传url
     */
    uploadUrl: {
      type: String,
      required: true
    },

    /**
     * 提交时候必须的参数
     */
    fieldsRequired: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      uploadVisible: false,
      /**
       * 上传的文件
       */
      fileList: [],
      /**
       * 文件备注
       */
      comment: '',
      /**
       * 是否禁用预览
       */
      previewDisabled: true,
      /**
       * 是否禁用上传
       */
      uploadDisabled: true,
      /**
       * 错误信息提示
       */
      errMsg: ''
    }
  },
  methods: {
    // 展示显示框
    showDialog() {
      this.uploadVisible = true
    },
    /**
       * 下载样例文件
       */
    handleDownloadExample() {
      console.log(this.exampleUrl)
      this.$store.dispatch(this.exampleUrl).then((res) => {
        this.$notify({
          title: '操作成功',
          message: '示例信息下载成功',
          type: 'success'
        })
        export_excel_file(res, '示例')
      }).catch(() => {
        this.$notify({
          title: '操作失败',
          message: '请稍后重试',
          type: 'danger'
        })
      })
    },

    /**
     * 删除操作
     */
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.uploadDisabled = this.fileList.length === 0
      this.importFileNameObj = {}
      this.errMsg = ''
    },
    /**
     * 上传之前操作
     */
    beforeUpload(file) {
      this.fileList = [...this.fileList, file].splice(-1)
      this.uploadDisabled = this.fileList.length === 0
      this.errMsg = ''
      return false
    },

    /**
       * 上传
       */
    handleUpload() {
      const { uploadUrl } = this
      this.uploadDisabled = true
      this.__sendUploadRequest(uploadUrl, this.__buildFileForm())
      this.uploadDisabled = false
    },

    /**
       * 发送上传请求
       */
    __sendUploadRequest(url, formData) {
      this.$store.dispatch(url, formData).then(res => {
        this.$notify({
          title: '操作成功',
          message: '导入数据成功',
          type: 'success'
        })
        this.$emit('complete')
      }).catch((err) => {
        this.$notify({
          title: '操作失败',
          message: '导入数据失败',
          type: 'error'
        })
        console.log(err)
      }).finally(() => {
        this.uploadVisible = false
      })
    },

    /**
       * 构建form表单数据
       * @returns {FormData}
       * @private
       */
    __buildFileForm() {
      const { fileList } = this
      const formData = new FormData()
      formData.append('file', fileList[0])
      return formData
    },

    /**
       * 重置数据
       * @private
       */
    __resetData() {
      this.fileList = []
      this.comment = ''
      this.uploadDisabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
// .diboot-import {
//   webkit-box-shadow: unset !important;
//   box-shadow: unset !important;
// }
// .diboot-import > .el-card__header {
//   border: unset;
// }
</style>
