import day from 'dayjs'

// 时间格式转换
const formatDate = (date, mat = 'YYYY-MM-DD') => day(date).format(mat)

// 将 小时 转为 对于的时间格式
const getOriginDate = (date) => {
  if (typeof (date) !== 'string') return ''
  const dateArr = date.split('-')
  const yearArr = day().format('YYYY-MM-DD')
  return [new Date(yearArr[0], yearArr[1], yearArr[2], dateArr[0].split(':')[0], dateArr[0].split(':')[1], dateArr[0].split(':')[2]),
    new Date(yearArr[0], yearArr[1], yearArr[2], dateArr[1].split(':')[0], dateArr[1].split(':')[1], dateArr[1].split(':')[2])]
}

const getFormatHour = (date) => {
  console.log(date)
  if (Array.isArray(date)) {
    return date.map((item) => {
      if (!isNaN(Date.parse(item)) && isNaN(item)) {
        formatDate(item, 'HH:mm:ss').join('-')
      } else {
        return item
      }
    })
  } else {
    if (!isNaN(Date.parse(date)) && isNaN(date)) {
      return formatDate(date, 'HH:mm:ss').join('-')
    } else {
      return
    }
  }
}
export {
  formatDate,
  getOriginDate,
  getFormatHour
}
