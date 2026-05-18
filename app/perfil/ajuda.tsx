import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

export default function AjudaScreen() {
  return (
    <Screen contentStyle={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <Pressable onPress={() => router.back()} style={s.backButton}>
          <Feather name="arrow-left" size={20} color="#F5F1E8" />
        </Pressable>

        <View style={s.hero}>
          <Text style={s.kicker}>PERFIL</Text>
          <Text style={s.title}>Ajuda</Text>
          <Text style={s.subtitle}>
            Precisa falar com a igreja ou tirar alguma dúvida?
          </Text>
        </View>

        <View style={s.group}>
          <HelpItem
            icon="message-circle"
            title="WhatsApp"
            subtitle="Fale com a equipe"
            onPress={() => Linking.openURL('https://chat.whatsapp.com/Frr3tQFEk9D1Q0mHa3HAGf')}
          />

          <HelpItem
            icon="mail"
            title="E-mail"
            subtitle="Enviar mensagem"
            onPress={() => Linking.openURL('mailto:contato@ibcaminho.com')}
          />

          <HelpItem
            icon="instagram"
            title="Instagram"
            subtitle="Acompanhe a igreja"
            onPress={() => Linking.openURL('https://www.instagram.com/ibcaminho/')}
            isLast
          />
        </View>
      </ScrollView>
    </Screen>
  )
}

function HelpItem({ icon, title, subtitle, onPress, isLast }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.item,
        !isLast && s.itemBorder,
        pressed && s.pressed,
      ]}
    >
      <View style={s.itemLeft}>
        <View style={s.itemIcon}>
          <Feather name={icon} size={18} color="#E4B84E" />
        </View>

        <View>
          <Text style={s.itemTitle}>{title}</Text>
          <Text style={s.itemSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <Feather name="chevron-right" size={18} color="#E4B84E" />
    </Pressable>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09070A',
  },
  content: {
    padding: 20,
    paddingBottom: 44,
    gap: 24,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
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
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },
  group: {
    borderRadius: 22,
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  item: {
    minHeight: 72,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(228,184,78,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F5F1E8',
  },
  itemSubtitle: {
    fontSize: 14,
    color: 'rgba(245,241,232,0.68)',
  },
  pressed: {
    opacity: 0.84,
  },
})