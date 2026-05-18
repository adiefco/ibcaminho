export const eventsQuery = `*[_type == "event" && active == true] | order(startDate asc) {
    _id,
    title,
    "id": slug.current,
    startDate,
    endDate,
    location,
    description,
    content,
    featured,
    "imageUrl": image.asset->url
  }`

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "id": slug.current,
    startDate,
    endDate,
    location,
    description,
    content,
    "imageUrl": image.asset->url
  }
`
export const homeQuery = `
  *[_type == "home"][0] {
    greeting,
    weeklyWord,
    weeklyReference
  }
`
export const nextFeaturedEventQuery = `
  *[_type == "event" && active == true && featured == true] | order(startDate asc)[0] {
    _id,
    title,
    "id": slug.current,
    startDate,
    location,
    description
  }
`
export const liveQuery = `
  *[_type == "live"][0] {
    title,
    youtubeUrl,
    isLive,
    description
  }
`
export const projectsQuery = `
  *[_type == "project" && active == true] {
    _id,
    title,
    "id": slug.current,
    description,
    content,
    "imageUrl": image.asset->url
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "id": slug.current,
    description,
    content,
    "imageUrl": image.asset->url
  }
`