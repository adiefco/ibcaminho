import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const LOGO_URI =
  'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

const sections = [
  {
    title: 'Coordenação',
    people: [
      { name: 'Maira Rossi', role: 'Coordenação Geral' },
      { name: 'Mariana Paz', role: 'Coordenação Financeira' },
    ],
  },

  {
    title: 'Secretaria',
    people: [
      { name: 'Mariana Amorim', role: 'Secretária' },
      { name: 'Thyago Machado', role: 'Secretário' },
    ],
  },

//   {
//     title: 'Comunicação',
//     people: [
//       { name: 'Nome aqui', role: 'Mídias e Comunicação' },
//     ],
//   },

//   {
//     title: 'Louvor',
//     people: [
//       { name: 'Nome aqui', role: 'Ministério de Louvor' },
//     ],
//   },

//   {
//     title: 'Acolhimento',
//     people: [
//       { name: 'Nome aqui', role: 'Recepção e cuidado' },
//     ],
//   },
]

export default function NossaEquipeScreen() {
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

          <Text style={s.kicker}>SOBRE NÓS</Text>

          <Text style={s.title}>Nossa Equipe</Text>

          <Text style={s.subtitle}>
            Pessoas que servem e constroem essa caminhada conosco.
          </Text>
        </View>

        <View style={s.divider} />

        {sections.map((section) => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>

            {section.people.map((person) => (
              <View key={person.name} style={s.personRow}>
                <View style={s.dot} />

                <View style={s.personContent}>
                  <Text style={s.personName}>{person.name}</Text>
                  <Text style={s.personRole}>{person.role}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
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
    gap: 8,
  },

  logo: {
    width: 72,
    height: 72,
    marginBottom: 8,
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
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: 'rgba(245,241,232,0.72)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 14,
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

  section: {
    marginBottom: 28,
    gap: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E4B84E',
  },

  personRow: {
    flexDirection: 'row',
    gap: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E4B84E',
    marginTop: 8,
  },

  personContent: {
    flex: 1,
    gap: 4,
  },

  personName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  personRole: {
    fontSize: 15,
    color: 'rgba(245,241,232,0.72)',
    lineHeight: 24,
  },
})