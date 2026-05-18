import { sanityClient } from './client'
import { homeQuery, nextFeaturedEventQuery } from './queries'

export async function fetchHome() {
  return sanityClient.fetch(homeQuery)
}

export async function fetchNextFeaturedEvent() {
  return sanityClient.fetch(nextFeaturedEventQuery)
}