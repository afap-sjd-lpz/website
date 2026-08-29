const resourceDateFormatter = new Intl.DateTimeFormat('es-BO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatResourceDate(value: string) {
  return resourceDateFormatter.format(new Date(`${value}T00:00:00Z`))
}
