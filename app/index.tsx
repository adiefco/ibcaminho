import { useAppTheme } from '@/theme'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'

export default function SplashScreen() {
  const theme = useAppTheme()

  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)

  useEffect(() => {
    // entrada
    opacity.value = withTiming(1, { duration: 700 })
    scale.value = withTiming(1, { duration: 700 })

    // saída + navegação
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 400 })
      scale.value = withTiming(0.9, { duration: 400 })

      setTimeout(() => {
        router.replace('/(tabs)')
      }, 400)
    }, 1200)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Animated.View style={animatedStyle}>
        <Image
          source={require('@/assets/images/ibcaminho.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
  },
})