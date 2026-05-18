import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { fetchEvents } from '@/services/sanity/events'

type EventItem = {
  _id: string
  id: string
  title: string
  startDate: string
  endDate?: string
  location?: string
  description: string
  featured?: boolean
  imageUrl?: string
}

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export default function AgendaScreen() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents()
        setEvents(data)
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const featuredEvent = events.find((event) => event.featured)
  const otherEvents = featuredEvent
    ? events.filter((event) => event.id !== featuredEvent.id)
    : events

  return (
    <Screen contentStyle={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
        <View style={s.header}>
          <Text style={s.kicker}>AGENDA</Text>
          <Text style={s.title}>Próximos encontros</Text>
          <Text style={s.subtitle}>
            Acompanhe a programação da Igreja Batista do Caminho.
          </Text>
        </View>

        <View style={s.divider} />

        {loading ? (
          <Text style={s.emptyText}>Carregando eventos...</Text>
        ) : events.length === 0 ? (
          <Text style={s.emptyText}>Nenhum evento disponível no momento.</Text>
        ) : (
          <>
            {featuredEvent ? (
              <Pressable
                onPress={() => router.push(`/agenda/${featuredEvent.id}`)}
                style={({ pressed }) => [s.featuredCard, pressed && s.pressed]}
              >
                <View style={s.featuredTop}>
                  <Text style={s.featuredBadge}>PRÓXIMO EVENTO</Text>
                  <Feather name="arrow-up-right" size={18} color="#E4B84E" />
                </View>

                <Text style={s.featuredTitle}>{featuredEvent.title}</Text>

                <Text style={s.featuredMeta}>
                  {formatEventDate(featuredEvent.startDate)}
                </Text>

                <Text style={s.featuredDescription}>
                  {featuredEvent.description}
                </Text>
              </Pressable>
            ) : null}

            <View style={s.section}>
              <Text style={s.sectionTitle}>
                {featuredEvent ? 'Outros eventos' : 'Eventos'}
              </Text>

              <View style={s.list}>
                {otherEvents.map((event) => (
                  <Pressable
                    key={event._id}
                    onPress={() => router.push(`/agenda/${event.id}`)}
                    style={({ pressed }) => [s.card, pressed && s.pressed]}
                  >
                    <View style={s.cardLeft}>
                      <View style={s.dateBox}>
                        <Feather name="calendar" size={18} color="#E4B84E" />
                      </View>

                      <View style={s.textContainer}>
                        <Text style={s.cardTitle}>{event.title}</Text>
                        <Text style={s.cardSubtitle}>
                          {formatEventDate(event.startDate)}
                        </Text>
                        <Text style={s.cardDescription} numberOfLines={2}>
                          {event.description}
                        </Text>
                      </View>
                    </View>

                    <Feather name="chevron-right" size={20} color="#E4B84E" />
                  </Pressable>
                ))}
              </View>
            </View>
          </>
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
  featuredCard: {
    backgroundColor: '#100D13',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(228,184,78,0.16)',
    padding: 20,
    gap: 10,
  },
  featuredTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredBadge: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#E4B84E',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F5F1E8',
    lineHeight: 30,
  },
  featuredMeta: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E4B84E',
  },
  featuredDescription: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.75)',
  },
  section: {
    gap: 14,
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
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  dateBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(228,184,78,0.08)',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F5F1E8',
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E4B84E',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(245,241,232,0.68)',
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.995 }],
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },
})