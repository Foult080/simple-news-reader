// получить url сервиса
export const baseUrl = import.meta.env.VITE_SERVICE_URL || ''

// форматирование даты и времени
export const formatDateTime = (date) => {
  if (!date) return ''
  const opions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
  return new Intl.DateTimeFormat('ru', opions).format(new Date(date))
}
