import YoutubePlayer from 'react-native-youtube-iframe'

type Props = {
  videoId: string
  height?: number
}

export function AppYoutubePlayer({ videoId, height = 220 }: Props) {
  return <YoutubePlayer height={height} play={false} videoId={videoId} />
}