const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY
const CHANNEL_ID = 'UCGqrMtNyCVDa-rXUdWx4cug'

export async function fetchVideos() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=10`
  )

  const data = await res.json()

  function decodeHtml(text: string) {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  }

  function formatTitle(text: string) {
    return decodeHtml(text)
      .replace('Culto IB Caminho - ', '')
      .trim()
  }

  return data.items
    .filter((item: any) => item.id.videoId)
    .map((item: any) => ({
      id: item.id.videoId,
      title: formatTitle(item.snippet.title),
      thumbnail: item.snippet.thumbnails.high.url,
    }))
}