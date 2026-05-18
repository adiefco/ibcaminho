import { sanityClient } from "./client";
import { projectBySlugQuery, projectsQuery } from "./queries";

export async function fetchProjects() {
  return sanityClient.fetch(projectsQuery)
}

export async function fetchProjectBySlug(slug: string) {
  return sanityClient.fetch(projectBySlugQuery, { slug })
}