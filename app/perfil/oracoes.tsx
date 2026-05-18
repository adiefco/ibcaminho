import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/services/supabase/client'

type PrayerRequest = {
  id: string
  title: string | null
  message: string
  is_private: boolean
  created_at: string
}

export default function MinhasOracoesScreen() {
  const { user } = useAuth()
  const [items, setItems] = useState<PrayerRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user?.id) {
        router.replace('/auth/login')
        return
      }

      const { data, error } = await supabase
        .from('prayer_requests')
        .select('id, title, message, is_private, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error) setItems(data ?? [])
      setLoading(false)
    }

    load()
  }, [user?.id])

  return (
    <Screen contentStyle={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <Pressable onPress={() => router.back()} style={s.backButton}>
          <Feather name="arrow-left" size={20} color="#F5F1E8" />
        </Pressable>

        <View style={s.hero}>
          <Text style={s.kicker}>PERFIL</Text>
          <Text style={s.title}>Meus pedidos</Text>
          <Text style={s.subtitle}>
            Acompanhe os pedidos de oração que você já enviou.
          </Text>
        </View>

        {loading ? (
          <Text style={s.empty}>Carregando pedidos...</Text>
        ) : items.length === 0 ? (
          <View style={s.emptyCard}>
            <Feather name="heart" size={24} color="#E4B84E" />
            <Text style={s.emptyTitle}>Nenhum pedido ainda</Text>
            <Text style={s.empty}>
              Quando você enviar um pedido de oração, ele aparecerá aqui.
            </Text>
          </View>
        ) : (
          <View style={s.list}>
            {items.map((item) => (
              <View key={item.id} style={s.card}>
                <View style={s.cardHeader}>
                  <Text style={s.cardTitle}>
                    {item.title || 'Pedido de oração'}
                  </Text>

                  <View style={s.badge}>
                    <Text style={s.badgeText}>
                      {item.is_private ? 'Privado' : 'Compartilhado'}
                    </Text>
                  </View>
                </View>

                <Text style={s.date}>
                  {new Date(item.created_at).toLocaleDateString('pt-BR')}
                </Text>

                <Text style={s.message}>{item.message}</Text>
              </View>
            ))}
          </View>
        )}
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
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: '#100D13',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#F5F1E8',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(228,184,78,0.1)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E4B84E',
  },
  date: {
    fontSize: 13,
    color: 'rgba(245,241,232,0.56)',
  },
  message: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.78)',
  },
  emptyCard: {
    backgroundColor: '#100D13',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F5F1E8',
  },
  empty: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: 'rgba(245,241,232,0.68)',
  },
})