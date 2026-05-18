import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'

import { AppButton } from '@/components/ui/AppButton'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { fetchProjectBySlug } from '@/services/sanity/projects'

export default function ProjectDetail() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [project, setProject] = useState<any>(null)

    useEffect(() => {
        async function load() {
            const data = await fetchProjectBySlug(id)
            setProject(data)
        }

        if (id) load()
    }, [id])

    if (!project) {
        return (
            <Screen contentStyle={s.container}>
                <Text style={s.title}>Carregando projeto...</Text>
            </Screen>
        )
    }

    return (
        <Screen contentStyle={s.container}>
            <ScrollView contentContainerStyle={s.content}>
                {project.imageUrl ? (
                    <Image source={{ uri: project.imageUrl }} style={s.image} />
                ) : null}

                <Text style={s.title}>{project.title}</Text>

                {project.description ? (
                    <Text style={s.description}>{project.description}</Text>
                ) : null}

                {project.content ? (
                    <Text style={s.contentText}>{project.content}</Text>
                ) : null}
                <AppButton
                    onPress={() =>
                        router.push({
                            pathname: '/contribute',
                            params: {
                                project: project.title,
                            },
                        })
                    }
                >
                    Apoiar este projeto
                </AppButton>
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
        gap: 16,
        paddingBottom: 40,
    },

    image: {
        width: '100%',
        height: 220,
        borderRadius: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#F5F1E8',
    },

    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#E4B84E',
    },

    contentText: {
        fontSize: 15,
        lineHeight: 24,
        color: 'rgba(245,241,232,0.8)',
    },
})