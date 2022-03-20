import day from 'dayjs'

const formatDate = (date) => day(date).format('YYYY-MM-DD')

export {
  formatDate
}
