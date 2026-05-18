// theme/useAppTheme.ts

import { useColorScheme } from '@/hooks/use-color-scheme'
import { colors } from './tokens'

export function useAppTheme() {
  const scheme = useColorScheme()

  const base = scheme === 'dark' ? colors.dark : colors.light

  return {
    ...base,
    primary: colors.primary,
  }
}