import { AppButton } from '@/components/ui/AppButton'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { addEventToCalendar } from '@/services/calendar'
import { fetchEventBySlug } from '@/services/sanity/events'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Share, StyleSheet, View } from 'react-native'

type Event = {
  title: string
  startDate: string
  location?: string
  description: string
  content?: string
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export default function EventDetail() {
  const { id } = useLocalSearchParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchEventBySlug(id as string)
        setEvent(data)
      } catch (error) {
        console.error('Erro ao carregar evento:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) load()
  }, [id])

  async function shareEvent(event: Event) {
    try {
      await Share.share({
        message: `✨ ${event.title}

🕒 ${formatDate(event.startDate)}
📍 ${event.location || 'Igreja Batista do Caminho'}

Você é muito bem-vindo(a)! 💛`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <Screen contentStyle={s.container}>
        <Text style={s.title}>Carregando evento...</Text>
      </Screen>
    )
  }

  if (!event) {
    return (
      <Screen contentStyle={s.container}>
        <Text style={s.title}>Evento não encontrado</Text>
      </Screen>
    )
  }

  return (
    <Screen contentStyle={s.container}>
      <Text style={s.title}>{event.title}</Text>

      <Text style={s.date}>{formatDate(event.startDate)}</Text>

      {event.location ? (
        <Text style={s.location}>{event.location}</Text>
      ) : null}

      <Text style={s.description}>{event.description}</Text>

      {event.content ? (
        <Text style={s.content}>{event.content}</Text>
      ) : null}

      <View style={s.actions}>
        <AppButton
          onPress={() =>
            addEventToCalendar({
              title: event.title,
              startDate: new Date(event.startDate),
              endDate: new Date(
                new Date(event.startDate).getTime() + 60 * 60 * 1000
              ),
            })
          }
        >
          Adicionar ao calendário
        </AppButton>

        <AppButton variant="secondary" onPress={() => shareEvent(event)}>
          Compartilhar
        </AppButton>
      </View>
    </Screen>
  )
}

const s = StyleSheet.create({
  container: {
    gap: 16,
    padding: 20,
    backgroundColor: '#09070A',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  date: {
    color: '#E4B84E',
    fontSize: 16,
    fontWeight: '600',
  },

  location: {
    fontSize: 14,
    color: 'rgba(245,241,232,0.72)',
  },

  description: {
    fontSize: 15,
    color: '#F5F1E8',
    lineHeight: 22,
    marginTop: 8,
  },

  content: {
    fontSize: 15,
    color: 'rgba(245,241,232,0.85)',
    lineHeight: 24,
    marginTop: 10,
  },

  actions: {
    marginTop: 20,
    gap: 10,
  },
})