import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const LOGO_URI =
  'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

const members = [
  {
    name: 'Dalton Ximenes',
    role: 'Cientista',
    socialLabel: 'Instagram',
    socialUrl: 'https://instagram.com/daltox',
    image: require('@/assets/images/dalton.png'),
  },
  {
    name: 'Gidel Bomfim',
    role: 'Teólogo',
    image: require('@/assets/images/gidel.png'),
  },
  {
    name: 'Henrique Vieira',
    role: 'Pastor, Professor e Ator',
    socialLabel: 'Facebook',
    socialUrl: 'https://www.facebook.com/pastorhenriquevieira/',
    image: require('@/assets/images/henrique.png'),
  },
  {
    name: 'Agnes Alencar',
    role: 'Pastora, Historiadora e Teóloga Pesquisadora',
    socialLabel: 'Instagram',
    socialUrl: 'https://www.instagram.com/agnesalencar_/',
    image: require('@/assets/images/agnes.png'),
  },
  {
    name: 'Priscilla Ribeiro',
    role: 'Pastora, Teóloga e Musicista',
    socialLabel: 'Instagram',
    socialUrl: 'https://www.instagram.com/pri.tupi/',
    image: require('@/assets/images/priscilla.png'),
  },
]

export default function ColegiadoScreen() {
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
            <Text style={s.title}>Nosso colegiado</Text>
            <Text style={s.subtitle}>
              Pessoas eleitas em Assembleia Geral para estabelecer e orientar o
              desenvolvimento das atividades da igreja.
            </Text>
          </View>
        </View>

        <View style={s.divider} />

        <View style={s.list}>
          {members.map((member) => (
            <View key={member.name} style={s.memberItem}>
              <View style={s.avatar}>
                <Image
                  source={member.image}
                  style={s.avatarImage}
                />
              </View>

              <View style={s.memberContent}>
                <Text style={s.memberName}>{member.name}</Text>
                <Text style={s.memberRole}>{member.role}</Text>

                {member.socialLabel && member.socialUrl ? (
                  <Pressable
                    onPress={() => Linking.openURL(member.socialUrl!)}
                    style={({ pressed }) => [
                      s.socialButton,
                      pressed && s.pressed,
                    ]}
                  >
                    <Text style={s.socialText}>{member.socialLabel}</Text>
                    <Feather name="arrow-up-right" size={14} color="#E4B84E" />
                  </Pressable>
                ) : null}
              </View>
            </View>
          ))}
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

  list: {
    gap: 18,
  },

  memberItem: {
    flexDirection: 'row',
    gap: 14,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(228,184,78,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(228,184,78,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  avatarText: {
    color: '#E4B84E',
    fontSize: 18,
    fontWeight: '700',
  },

  memberContent: {
    flex: 1,
    gap: 6,
  },

  memberName: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#F5F1E8',
    textTransform: 'uppercase',
  },

  memberRole: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.78)',
  },

  socialButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E4B84E',
  },

  pressed: {
    opacity: 0.8,
  },
})