import { useAppTheme } from '@/theme'
import { Text as RNText } from 'react-native'

export function Text({ children, style }: any) {
    const theme = useAppTheme()

  return (
    <RNText style={[{ color: theme.text }, style]}>
      {children}
    </RNText>
  )
}