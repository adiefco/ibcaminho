import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'

import { AppButton } from '@/components/ui/AppButton'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { supabase } from '@/services/supabase/client'

export default function CadastroScreen() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    if (loading) return

    if (!name || !email || !password) {
      return Alert.alert('Erro', 'Preencha nome, email e senha.')
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
        },
      },
    })

    if (error) {
      setLoading(false)
      return Alert.alert('Erro ao criar conta', error.message)
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        name,
        phone,
      })

      if (profileError) {
        setLoading(false)
        return Alert.alert('Erro ao salvar perfil', profileError.message)
      }
    }

    setLoading(false)

    Alert.alert('Conta criada!', 'Agora você já pode entrar.')
    router.replace('/auth/login')
  }

  return (
    <Screen contentStyle={s.container}>
      <View style={s.content}>
        <Text style={s.title}>Criar conta</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#999"
          style={s.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Telefone"
          placeholderTextColor="#999"
          style={s.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={s.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#999"
          style={s.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AppButton onPress={handleSignUp}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </AppButton>

        <AppButton variant="secondary" onPress={() => router.push('/auth/login')}>
          Já tenho conta
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