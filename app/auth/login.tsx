import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'

import { AppButton } from '@/components/ui/AppButton'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { supabase } from '@/services/supabase/client'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha email e senha')
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      Alert.alert('Erro ao entrar', error.message)
    } else {
      router.replace('/') // volta pra home
    }
  }

  return (
    <Screen contentStyle={s.container}>
      <View style={s.content}>
        <Text style={s.title}>Entrar</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={s.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#999"
          style={s.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AppButton onPress={handleLogin}>
          {loading ? 'Entrando...' : 'Entrar'}
        </AppButton>

        <AppButton
          variant="secondary"
          onPress={() => router.push('/auth/cadastro')}
        >
          Criar conta
        </AppButton>
      </View>
    </Screen>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09070A',
    justifyContent: 'center',
  },

  content: {
    padding: 20,
    gap: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F5F1E8',
    marginBottom: 12,
  },

  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#100D13',
    color: '#F5F1E8',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
})