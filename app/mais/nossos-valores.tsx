import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const LOGO_URI =
  'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

const values = [
  'Justiça social',
  'Respeito a toda criação divina',
  'Amar',
  'Ética',
  'Sensibilidade cultural',
  'Alteridade',
  'Discipulado',
  'Coerência com os princípios bíblicos',
  'Valorização da família',
]

export default function NossosValoresScreen() {
  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <Pressable onPress={() => router.back()} style={s.backButton}>
          <Feather name="arrow-left" size={20} color="#F5F1E8" />
        </Pressable>

        <View style={s.header}>
          <Image
            source={{ uri: LOGO_URI }}
            style={s.logo}
            resizeMode="contain"
          />

          <View style={s.headerText}>
            <Text style={s.kicker}>SOBRE NÓS</Text>
            <Text style={s.title}>Nossos Valores</Text>
            <Text style={s.subtitle}>
              Aquilo que sustenta nossa caminhada.
            </Text>
          </View>
        </View>

        <View style={s.divider} />

        <View style={s.intro}>
          <Text style={s.paragraph}>
            Nossa comunidade busca viver o evangelho de forma prática,
            amorosa e relevante para o tempo presente.
          </Text>

          <Text style={s.paragraph}>
            Estes valores orientam nossas decisões, relações e missão.
          </Text>
        </View>

        <View style={s.valuesGrid}>
          {values.map((item, index) => (
            <View key={index} style={s.valueCard}>
              <View style={s.dot} />
              <Text style={s.valueText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={s.quoteBlock}>
          <Text style={s.quote}>
            Amar a Deus, servir pessoas e construir esperança.
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
    padding: 20,
    paddingTop: 0,
    paddingBottom: 44,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 24,
  },

  header: {
    alignItems: 'center',
    gap: 16,
  },

  logo: {
    width: 72,
    height: 72,
  },

  headerText: {
    alignItems: 'center',
    gap: 6,
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
    lineHeight: 34,
    color: '#F5F1E8',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: 'rgba(245,241,232,0.72)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 12,
  },

  divider: {
    width: 56,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#E4B84E',
    alignSelf: 'center',
    marginTop: 26,
    marginBottom: 30,
  },

  intro: {
    gap: 16,
    marginBottom: 28,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 30,
    color: '#F5F1E8',
    textAlign: 'center',
  },

  valuesGrid: {
    gap: 14,
  },

  valueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E4B84E',
  },

  valueText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#F5F1E8',
    fontWeight: '500',
  },

  quoteBlock: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(228,184,78,0.15)',
    alignItems: 'center',
    gap: 10,
  },

  quote: {
    fontSize: 18,
    lineHeight: 30,
    color: '#E4B84E',
    textAlign: 'center',
  },

  quoteAuthor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F5F1E8',
  },
})