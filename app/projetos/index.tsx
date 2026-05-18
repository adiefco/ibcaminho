import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { fetchProjects } from '@/services/sanity/projects'

type Project = {
  _id: string
  id: string
  title: string
  description?: string
  imageUrl?: string
}

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProjects()
        setProjects(data)
      } catch (error) {
        console.error('Erro ao carregar projetos:', error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <Screen contentStyle={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.kicker}>PROJETOS</Text>
          <Text style={s.title}>Igreja em movimento</Text>
          <Text style={s.subtitle}>
            Conheça as iniciativas e ações sociais da igreja.
          </Text>
        </View>

        <View style={s.divider} />

        {loading ? (
          <Text style={s.empty}>Carregando projetos...</Text>
        ) : projects.length === 0 ? (
          <Text style={s.empty}>Nenhum projeto disponível.</Text>
        ) : (
          <View style={s.list}>
            {projects.map((project) => (
              <Pressable
                key={project._id}
                onPress={() => router.push(`/projetos/${project.id}`)}
                style={({ pressed }) => [s.card, pressed && s.pressed]}
              >
                {project.imageUrl ? (
                  <Image
                    source={{ uri: project.imageUrl }}
                    style={s.image}
                  />
                ) : null}

                <View style={s.cardContent}>
                  <Text style={s.cardTitle}>{project.title}</Text>

                  {project.description ? (
                    <Text style={s.cardDescription} numberOfLines={2}>
                      {project.description}
                    </Text>
                  ) : null}
                </View>
              </Pressable>
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

  list: {
    gap: 16,
  },

  card: {
    backgroundColor: '#100D13',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 180,
  },

  cardContent: {
    padding: 16,
    gap: 6,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(245,241,232,0.68)',
  },

  empty: {
    fontSize: 15,
    color: 'rgba(245,241,232,0.72)',
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
})