import { Text } from '@/components/ui/Text'
import { useAppTheme } from '@/theme'
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native'

type Props = {
  videoId: string
  thumbnail?: string
  height?: number
}

export function AppYoutubePlayer({
  videoId,
  thumbnail,
  height = 220,
}: Props) {
  const theme = useAppTheme()
  const s = styles(theme, height)

  return (
    <Pressable
      onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`)}
      style={s.container}
    >
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={s.image} resizeMode="cover" />
      ) : (
        <View style={s.image} />
      )}

      <View style={s.overlay}>
        <Text style={s.overlayText}>Abrir vídeo no YouTube</Text>
      </View>
    </Pressable>
  )
}

const styles = (theme: any, height: number) =>
  StyleSheet.create({
    container: {
      height,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
    },
    image: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.card,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.30)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    overlayText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
    },
  })