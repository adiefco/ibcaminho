import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { Linking, ScrollView, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

import { AppButton } from '@/components/ui/AppButton'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const YOUTUBE_URL =
  'https://www.youtube.com/watch?v=OdJO4dvpxBg'

const { videoId } = useLocalSearchParams<{ videoId: string }>()

const embedUrl = `https://www.youtube.com/embed/${videoId}`

export default function LiveScreen() {


  async function handleOpenYoutube() {
    await Linking.openURL(YOUTUBE_URL)
  }

  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <View style={s.header}>
          <Text style={s.kicker}>TRANSMISSÃO</Text>
          <Text style={s.title}>Culto ao vivo</Text>
          <Text style={s.subtitle}>
            Participe conosco desse momento de comunhão, louvor e esperança.
          </Text>
        </View>

        <View style={s.divider} />

        <View style={s.liveStatus}>
          <View style={s.liveDot} />
          <Text style={s.liveText}>AO VIVO AGORA</Text>
        </View>

        <View style={s.playerCard}>
          <WebView
            source={{ uri: embedUrl }}
            style={s.webview}
            javaScriptEnabled
            domStorageEnabled
          />
        </View>

        <AppButton onPress={handleOpenYoutube}>
          Abrir no YouTube
        </AppButton>

        <View style={s.infoCard}>
          <Feather name="heart" size={18} color="#E4B84E" />

          <Text style={s.infoText}>
            Se esta transmissão tocar seu coração, compartilhe com alguém.
          </Text>
        </View>

        <View style={s.quoteBox}>
          <Text style={s.quote}>
            “Onde dois ou três estiverem reunidos em meu nome...”
          </Text>
          <Text style={s.quoteRef}>Mateus 18:20</Text>
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
    padding: 20,
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
    lineHeight: 36,
    color: '#F5F1E8',
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

  liveStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E74C3C',
  },

  liveText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#E74C3C',
  },

  playerCard: {
    height: 230,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  webview: {
    flex: 1,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(228,184,78,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(228,184,78,0.14)',
  },

  infoText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: '#F5F1E8',
  },

  quoteBox: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },

  quote: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#E4B84E',
  },

  quoteRef: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F5F1E8',
  },
})