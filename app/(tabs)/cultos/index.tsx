import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { AppYoutubePlayer } from '@/components/ui/AppYoutubePlayer'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { fetchVideos } from '@/services/youtube'

type Video = {
  id: string
  title: string
  thumbnail: string
}

export default function CultosScreen() {
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchVideos()
        setVideos(data)

        if (data.length > 0) {
          setCurrentVideo(data[0].id)
        }
      } catch (error) {
        console.error('Erro ao buscar vídeos:', error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const selectedVideo = videos.find((video) => video.id === currentVideo)

  if (loading) {
    return (
      <Screen contentStyle={s.container}>
        <View style={s.content}>
          <View style={s.header}>
            <Text style={s.kicker}>CULTOS</Text>
            <Text style={s.title}>Cultos e mensagens</Text>
            <Text style={s.subtitle}>
              Acompanhe transmissões e conteúdos recentes da igreja.
            </Text>
          </View>

          <View style={s.divider} />

          <Text style={s.helperText}>Carregando cultos...</Text>
        </View>
      </Screen>
    )
  }

  if (!videos.length) {
    return (
      <Screen contentStyle={s.container}>
        <View style={s.content}>
          <View style={s.header}>
            <Text style={s.kicker}>CULTOS</Text>
            <Text style={s.title}>Cultos e mensagens</Text>
            <Text style={s.subtitle}>
              Acompanhe transmissões e conteúdos recentes da igreja.
            </Text>
          </View>

          <View style={s.divider} />

          <Text style={s.helperText}>
            Nenhum culto disponível no momento.
          </Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <View style={s.header}>
          <Text style={s.kicker}>CULTOS</Text>
          <Text style={s.title}>Cultos e mensagens</Text>
          <Text style={s.subtitle}>
            Acompanhe transmissões, reveja mensagens e compartilhe com outras
            pessoas.
          </Text>
        </View>

        <View style={s.divider} />

        {currentVideo ? (
          <View style={s.featured}>
            <Text style={s.featuredBadge}>EM DESTAQUE</Text>

            <View style={s.playerWrap}>
              <AppYoutubePlayer
                videoId={currentVideo}
                thumbnail={selectedVideo?.thumbnail}
                height={220}
              />
            </View>

            {selectedVideo ? (
              <Text style={s.featuredTitle}>{selectedVideo.title}</Text>
            ) : null}
          </View>
        ) : null}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Últimos cultos</Text>

          <View style={s.list}>
            {videos.map((video) => {
              const isActive = currentVideo === video.id

              return (
                <Pressable
                  key={video.id}
                  onPress={() => setCurrentVideo(video.id)}
                  style={({ pressed }) => [
                    s.card,
                    isActive && s.activeCard,
                    pressed && s.pressed,
                  ]}
                >
                  <Image
                    source={{ uri: video.thumbnail }}
                    style={s.thumbnail}
                    resizeMode="cover"
                  />

                  <View style={s.textContainer}>
                    <Text style={s.cardTitle} numberOfLines={2}>
                      {video.title}
                    </Text>

                    <Text style={s.cardSubtitle}>
                      {isActive ? 'Reproduzindo agora' : 'Toque para assistir'}
                    </Text>
                  </View>

                  <Feather
                    name={isActive ? 'pause-circle' : 'play-circle'}
                    size={22}
                    color="#E4B84E"
                  />
                </Pressable>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09070A',
  },

  content: {
    paddingTop: 24,
    paddingBottom: 44,
    gap: 24,
  },

  header: {
    gap: 8,
  },

  kicker: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: '#E4B84E',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#F5F1E8',
    lineHeight: 36,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },

  divider: {
    width: 56,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#E4B84E',
  },

  helperText: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },

  featured: {
    gap: 12,
  },

  featuredBadge: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#E4B84E',
  },

  playerWrap: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  featuredTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E4B84E',
    letterSpacing: 0.6,
  },

  list: {
    gap: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  activeCard: {
    borderColor: 'rgba(228,184,78,0.28)',
    backgroundColor: 'rgba(228,184,78,0.06)',
  },

  thumbnail: {
    width: 96,
    height: 72,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  textContainer: {
    flex: 1,
    gap: 4,
  },

  cardTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  cardSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(245,241,232,0.68)',
  },

  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.995 }],
  },
})