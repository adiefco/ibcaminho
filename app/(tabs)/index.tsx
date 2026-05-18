import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { AppButton } from '@/components/ui/AppButton'
import { QuickActionCard } from '@/components/ui/QuickActionCard'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { useAuth } from '@/contexts/AuthContext'
import { fetchHome, fetchNextFeaturedEvent } from '@/services/sanity/home'
import { fetchPlaylist } from '@/services/spotify'
import { fetchMyProfile } from '@/services/supabase/profiles'
import { fetchVideos } from '@/services/youtube'

type Playlist = {
  id: string
  name: string
  description: string
  image: string
  totalFollowers: number
  url: string
}

const movementItems = [
  {
    title: 'Projetos',
    subtitle: 'Conheça nossas frentes',
    icon: 'briefcase' as keyof typeof Feather.glyphMap,
    onPress: () => router.push('/projetos'),
  },
  {
    title: 'Quem somos',
    subtitle: 'Nossa história e visão',
    icon: 'users' as keyof typeof Feather.glyphMap,
    onPress: () => router.push('/mais/quem-somos'),
  },
  {
    title: 'Nosso caminho',
    subtitle: 'A caminhada da comunidade',
    icon: 'map' as keyof typeof Feather.glyphMap,
    onPress: () => router.push('/mais/nosso-caminho'),
  },
  {
    title: 'Nossos valores',
    subtitle: 'O que sustenta nossa fé',
    icon: 'star' as keyof typeof Feather.glyphMap,
    onPress: () => router.push('/mais/nossos-valores'),
  },
]

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export default function HomeScreen() {
  const { user } = useAuth()

  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [home, setHome] = useState<any>(null)
  const [nextEvent, setNextEvent] = useState<any>(null)
  const [liveVideo, setLiveVideo] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)


  const userName =
    profile?.name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0]

  function getGreeting() {
    const hour = new Date().getHours()

    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  useEffect(() => {
    async function loadPlaylist() {
      try {
        const data = await fetchPlaylist()
        setPlaylist(data)
      } catch (error) {
        console.error('Erro ao carregar playlist:', error)
      }
    }

    loadPlaylist()
  }, [])

  useEffect(() => {
    async function loadLiveVideo() {
      try {
        const videos = await fetchVideos()

        if (videos.length > 0) {
          setLiveVideo(videos[0])
        }
      } catch (error) {
        console.error('Erro ao carregar vídeo ao vivo:', error)
      }
    }

    loadLiveVideo()
  }, [])

  useEffect(() => {
    async function loadCmsHome() {
      try {
        const [homeData, eventData] = await Promise.all([
          fetchHome(),
          fetchNextFeaturedEvent(),
        ])
        setHome(homeData)
        setNextEvent(eventData)
        console.log(homeData, eventData)
      } catch (error) {
        console.error('Erro ao carregar home:', error)
      }
    }

    loadCmsHome()
  }, [])

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return

      const data = await fetchMyProfile(user.id)
      setProfile(data)
    }

    loadProfile()
  }, [user?.id])

  async function handleOpenPlaylist() {
    if (!playlist?.url) return
    await Linking.openURL(playlist.url)
  }

  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.kicker}>INÍCIO</Text>
            <Text style={s.greeting}>
              {getGreeting()}
              {userName ? `, ${userName}` : ''}
            </Text>
            <Text style={s.subGreeting}>Que bom ter você por aqui!</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              s.profileButton,
              pressed && s.pressedButton,
            ]}
            onPress={() => router.push(user ? '/perfil' : '/auth/login')}
          >
            <Feather name="user" size={20} color="#F5F1E8" />
          </Pressable>
        </View>

        <View style={s.divider} />

        {playlist ? (
          <Pressable
            style={({ pressed }) => [
              s.playlistCard,
              pressed && s.pressedCard,
            ]}
            onPress={handleOpenPlaylist}
          >
            <Image
              source={{ uri: playlist.image }}
              style={s.playlistCover}
              resizeMode="cover"
            />

            <View style={s.playlistContent}>
              <Text style={s.playlistEyebrow}>SPOTIFY</Text>
              <Text style={s.playlistTitle} numberOfLines={2}>
                Músicas que cantamos juntos
              </Text>
              <Text style={s.playlistDescription} numberOfLines={2}>
                {playlist.totalFollowers} seguidores
              </Text>
            </View>

            <View style={s.playButton}>
              <Feather name="play" size={20} color="#09070A" />
            </View>
          </Pressable>
        ) : null}

        {nextEvent ? (
          <View style={s.eventCard}>
            <Text style={s.eventBadge}>PRÓXIMO ENCONTRO</Text>
            <Text style={s.eventTitle}>{nextEvent.title}</Text>
            <Text style={s.eventMeta}>{formatEventDate(nextEvent.startDate)}</Text>

            {nextEvent.location ? (
              <View style={s.eventLocationRow}>
                <Feather name="map-pin" size={16} color="#E4B84E" />
                <Text style={s.eventLocation}>{nextEvent.location}</Text>
              </View>
            ) : null}

            <View style={s.eventActions}>
              <AppButton onPress={() => router.push(`/agenda/${nextEvent.id}`)}>
                Ver detalhes
              </AppButton>

              {liveVideo ? (
                <AppButton
                  variant="secondary"
                  onPress={() => router.push({ pathname: '/cultos/live', params: { videoId: liveVideo.id } })}
                >
                  Assistir ao vivo
                </AppButton>
              ) : null}
            </View>
          </View>
        ) : null}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Acessos rápidos</Text>

          <View style={s.grid}>
            <QuickActionCard
              title="Agenda"
              icon="calendar"
              onPress={() => router.push('/agenda')}
            />

            <QuickActionCard
              title="Oração"
              icon="heart"
              onPress={() => router.push('/oracao')}
            />

            <QuickActionCard
              title="Apoie"
              icon="gift"
              onPress={() => router.push('/contribute')}
            />

            <QuickActionCard
              title="Cultos"
              icon="play-circle"
              onPress={() => router.push('/cultos')}
            />
          </View>
        </View>

        {home?.weeklyWord ? (
          <View style={s.wordCard}>
            <Text style={s.wordKicker}>INSPIRAÇÃO DA SEMANA</Text>

            <Text style={s.wordVerse}>
              {home.weeklyWord}
            </Text>

            {home.weeklyReference ? (
              <Text style={s.wordRef}>
                {home.weeklyReference}
              </Text>
            ) : null}
          </View>
        ) : null}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Igreja em movimento</Text>

          <View style={s.movementList}>
            {movementItems.map((item) => (
              <Pressable
                key={item.title}
                onPress={item.onPress}
                style={({ pressed }) => [
                  s.movementItem,
                  pressed && s.pressedCard,
                ]}
              >
                <View style={s.movementLeft}>
                  <View style={s.movementIcon}>
                    <Feather name={item.icon} size={18} color="#E4B84E" />
                  </View>

                  <View style={s.movementText}>
                    <Text style={s.movementTitle}>{item.title}</Text>
                    <Text style={s.movementSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>

                <Feather name="chevron-right" size={18} color="#E4B84E" />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={s.quoteBox}>
          <Text style={s.quoteText}>
            “Não só esperar pelos céus, mas construir hoje uma nova Terra”
          </Text>
          <Text style={s.quoteAuthor}>IB Caminho</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },

  headerLeft: {
    flex: 1,
    gap: 6,
  },

  kicker: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: '#E4B84E',
  },

  greeting: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
    color: '#F5F1E8',
  },

  subGreeting: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    width: 56,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#E4B84E',
  },

  eventCard: {
    backgroundColor: '#100D13',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(228,184,78,0.16)',
    gap: 12,
  },

  eventBadge: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#E4B84E',
  },

  eventTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  eventMeta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E4B84E',
  },

  eventLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  eventLocation: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
    flex: 1,
  },

  eventActions: {
    gap: 10,
    marginTop: 4,
  },

  playlistCard: {
    backgroundColor: '#100D13',
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  playlistCover: {
    width: 92,
    height: 92,
    borderRadius: 16,
  },

  playlistContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },

  playlistEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E4B84E',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  playlistTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    color: '#F5F1E8',
  },

  playlistDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(245,241,232,0.68)',
  },

  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E4B84E',
    alignItems: 'center',
    justifyContent: 'center',
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

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  wordCard: {
    backgroundColor: 'rgba(228,184,78,0.08)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(228,184,78,0.14)',
    gap: 10,
  },

  wordKicker: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#E4B84E',
  },

  wordVerse: {
    fontSize: 20,
    lineHeight: 30,
    color: '#F5F1E8',
    fontWeight: '600',
  },

  wordRef: {
    fontSize: 14,
    color: '#E4B84E',
    fontWeight: '700',
  },

  movementList: {
    gap: 12,
  },

  movementItem: {
    backgroundColor: '#100D13',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  movementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  movementIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(228,184,78,0.08)',
  },

  movementText: {
    flex: 1,
    gap: 4,
  },

  movementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  movementSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(245,241,232,0.68)',
  },

  quoteBox: {
    paddingTop: 8,
    gap: 10,
    alignItems: 'center',
  },

  quoteText: {
    color: '#E4B84E',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  quoteAuthor: {
    color: '#F5F1E8',
    fontSize: 15,
    fontWeight: '600',
  },

  pressedButton: {
    opacity: 0.84,
    transform: [{ scale: 0.97 }],
  },

  pressedCard: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
})