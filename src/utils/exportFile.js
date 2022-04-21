export function export_excel_file(export_data, list_name) {
  const link = document.createElement('a')
  //    type就是blob的type,是MIME类型的，可以自己查看MIME类型都有哪些
  const blogw = new Blob([export_data], { type: 'application/vnd.ms-excel;charset=utf-8' })
  const objectUrl = window.URL.createObjectURL(blogw) // 创建一个新的url对象
  link.href = objectUrl
  const file_name = `${list_name}列表.xlsx`
  link.download = file_name //  下载的时候自定义的文件名
  link.click()
  window.URL.revokeObjectURL(objectUrl) // 为了更好地性能和内存使用状况，应该在适当的时候释放url.
}
