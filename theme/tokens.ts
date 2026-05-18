// theme/tokens.ts

export const colors = {
    primary: '#FDD406',
  
    light: {
      background: '#FFFFFF',
      surface: '#F4F4F4',
      card: '#FFFFFF',
      text: '#111111',
      subtext: '#6E6963',
      border: '#E5E5E5',
    },
  
    dark: {
      background: '#111111',
      surface: '#1A1A1A',
      card: '#1C1C1C',
      text: '#FFFFFF',
      subtext: '#B3B3B3',
      border: '#2A2A2A',
    },
  }
  
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  }
  
  export const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  }
  
  export const typography = {
    h1: {
      fontSize: 28,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
    },
  }