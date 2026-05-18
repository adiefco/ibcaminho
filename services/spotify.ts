const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET!
const PLAYLIST_ID = '0634g4bi7gscyM11b5VFM2'

type SpotifyPlaylistResponse = {
    collaborative: boolean
    description: string
    external_urls: {
      spotify: string
    }
    followers: {
      href: string | null
      total: number
    }
    href: string
    id: string
    images: {
      height: number | null
      url: string
      width: number | null
    }[]
    name: string
    owner: {
      display_name: string
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      type: string
      uri: string
    }
    primary_color: string | null
    public: boolean
    snapshot_id: string
    type: string
    uri: string
  }
  
  type Playlist = {
    id: string
    name: string
    description: string
    image: string
    totalFollowers: number
    url: string
  }

async function getSpotifyToken() {
  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    throw new Error('Erro ao autenticar com Spotify')
  }

  const data = await res.json()
  return data.access_token as string
}

export async function fetchPlaylist(): Promise<Playlist> {
  const token = await getSpotifyToken()

  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Erro ao buscar playlist')
  }

  const data: SpotifyPlaylistResponse = await res.json()

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    image: data.images?.[0]?.url ?? '',
    totalFollowers: data.followers.total,
    url: data.external_urls.spotify,
  }
}