import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { View } from 'react-native'

import { useAppTheme } from '@/theme'

export default function TabsLayout() {
  const theme = useAppTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtext,
        tabBarStyle: {
          height: 78,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="agenda/index"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cultos/index"
        options={{
          title: 'Cultos',
          tabBarIcon: ({ color, size }) => (
            <Feather name="play-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: () => (
            <View
              style={{
                width: 58,
                height: 58,
                borderRadius: 29,
                backgroundColor: theme.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -24,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Feather name="home" size={26} color="#111111" />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            marginTop: 4,
          },
        }}
      />

      <Tabs.Screen
        name="oracao/index"
        options={{
          title: 'Oração',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mais/index"
        options={{
          title: 'Mais',
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}