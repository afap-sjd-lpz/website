const resourceDateFormatter = new Intl.DateTimeFormat('es-BO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatResourceDate(value: string) {
  return resourceDateFormatter.format(new Date(`${value}T00:00:00Z`))
}

interface ResourceRouteData {
  _type: 'article' | 'material' | 'video'
  slug: string
}

export function getResourceDetailHref(resource: ResourceRouteData) {
  const routeSegments = {
    article: 'articulos',
    material: 'materiales',
    video: 'videos',
  } as const

  return `/recursos/${routeSegments[resource._type]}/${resource.slug}`
}
