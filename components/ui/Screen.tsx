import { useAppTheme } from '@/theme'
import { PropsWithChildren } from 'react'
import { ScrollView, StyleSheet, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = PropsWithChildren<{
    scroll?: boolean
    contentStyle?: ViewStyle
}>

export function Screen({ children, scroll = true, contentStyle }: Props) {
    const theme = useAppTheme()

    if (scroll) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
                <ScrollView contentContainerStyle={[styles.content, contentStyle]}>
                    {children}
                </ScrollView>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                styles.content,
                { backgroundColor: theme.background },
                contentStyle,
            ]}
        >
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 32,
        gap: 16,
    }
})