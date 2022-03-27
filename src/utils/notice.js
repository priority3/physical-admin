export const selfConfirm = (
  self,
  title,
  message,
  type = 'error',
  confirmButtonText = '确定',
  cancelButtonText = '取消'
) => {
  return new Promise((resolve, reject) => {
    self.$confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

export const selfNotify = () => {

}
