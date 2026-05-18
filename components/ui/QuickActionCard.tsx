import { useAppTheme } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from './Text'

type Props = {
    title: string
    icon: keyof typeof Feather.glyphMap
    onPress?: () => void
}

export function QuickActionCard({ title, icon, onPress }: Props) {
    const theme = useAppTheme()
    const s = styles(theme)

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                s.card,
                {
                    transform: [{ scale: pressed ? 0.96 : 1 }],
                    opacity: pressed ? 0.9 : 1,
                },
            ]}
        >
            <View style={s.iconContainer}>
                <Feather name={icon} size={20} color={theme.background} />
            </View>

            <Text style={s.title}>{title}</Text>
        </Pressable>
    )
}

const styles = (theme: any) =>
    StyleSheet.create({
        card: {
            flex: 1,
            backgroundColor: theme.card,
            borderRadius: 18,
            padding: 16,
            gap: 10,
            alignItems: 'center',
            textAlign: 'center',

            borderWidth: 1,
            borderColor: theme.border,

            // sombra leve
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
        },

        pressed: {
            opacity: 0.85,
            transform: [{ scale: 0.98 }],
        },

        iconContainer: {
            width: 42,
            height: 42,
            borderRadius: 12,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },

        title: {
            fontSize: 12,
            fontWeight: '600',
            color: theme.text,
        },
    })