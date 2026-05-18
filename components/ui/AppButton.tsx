import { useAppTheme } from '@/theme'
import { PropsWithChildren } from 'react'
import { Pressable, Text as RNText, StyleSheet } from 'react-native'

type Props = PropsWithChildren<{
    onPress?: () => void
    variant?: 'primary' | 'secondary'
}>

export function AppButton({ children, onPress, variant = 'primary' }: Props) {
    const theme = useAppTheme()
    const s = styles(theme)

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                s.button,
                variant === 'secondary' && s.secondary,
                pressed && { opacity: 0.7 },
            ]}
        >
            <RNText
                style={[
                    s.text,
                    variant === 'secondary' && s.secondaryText,
                ]}
            >
                {children}
            </RNText>
        </Pressable>
    )
}

const styles = (theme: any) =>
    StyleSheet.create({
        button: {
            backgroundColor: theme.primary,
            borderRadius: 16,
            paddingVertical: 14,
            paddingHorizontal: 16,
            alignItems: 'center',
        },

        secondary: {
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
        },

        text: {
            color: '#111111',
            fontWeight: '700',
            fontSize: 16,
        },

        secondaryText: {
            color: theme.text,
        },
    })