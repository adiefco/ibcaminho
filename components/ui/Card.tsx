import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../theme/colors'
import { radius, spacing } from '../../theme/spacing'

export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
})