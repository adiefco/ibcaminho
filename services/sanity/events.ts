import { sanityClient } from './client'
import { eventBySlugQuery, eventsQuery } from './queries'

export async function fetchEvents() {
  return sanityClient.fetch(eventsQuery)
}

export async function fetchEventBySlug(slug: string) {
    return sanityClient.fetch(eventBySlugQuery, { slug })
}