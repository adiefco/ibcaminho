import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

export default function NotificacoesScreen() {
  const [churchNews, setChurchNews] = useState(true)
  const [events, setEvents] = useState(true)
  const [prayers, setPrayers] = useState(false)

  return (
    <Screen contentStyle={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <Pressable onPress={() => router.back()} style={s.backButton}>
          <Feather name="arrow-left" size={20} color="#F5F1E8" />
        </Pressable>

        <View style={s.hero}>
          <Text style={s.kicker}>PERFIL</Text>
          <Text style={s.title}>Notificações</Text>
          <Text style={s.subtitle}>
            Escolha quais avisos deseja receber no app.
          </Text>
        </View>

        <View style={s.group}>
          <NotificationItem
            title="Avisos da igreja"
            description="Comunicados e novidades importantes."
            value={churchNews}
            onValueChange={setChurchNews}
          />

          <NotificationItem
            title="Lembretes de eventos"
            description="Alertas sobre cultos e encontros."
            value={events}
            onValueChange={setEvents}
          />

          <NotificationItem
            title="Pedidos de oração"
            description="Atualizações relacionadas à oração."
            value={prayers}
            onValueChange={setPrayers}
            isLast
          />
        </View>
      </ScrollView>
    </Screen>
  )
}

function NotificationItem({
  title,
  description,
  value,
  onValueChange,
  isLast,
}: {
  title: string
  description: string
  value: boolean
  onValueChange: (value: boolean) => void
  isLast?: boolean
}) {
  return (
    <View style={[s.item, !isLast && s.itemBorder]}>
      <View style={s.itemText}>
        <Text style={s.itemTitle}>{title}</Text>
        <Text style={s.itemDescription}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#2A252D', true: '#E4B84E' }}
        thumbColor="#F5F1E8"
      />
    </View>
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
    minHeight: 78,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  itemText: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F5F1E8',
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(245,241,232,0.68)',
  },
})