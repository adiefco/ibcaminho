import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'

import { AppButton } from '@/components/ui/AppButton'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/services/supabase/client'
import { fetchMyProfile } from '@/services/supabase/profiles'

export default function EditarPerfilScreen() {
  const { user } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) {
        router.replace('/auth/login')
        return
      }

      setEmail(user.email || '')

      const profile = await fetchMyProfile(user.id)

      if (profile) {
        setName(profile.name || '')
        setPhone(profile.phone || '')
      }
    }

    loadProfile()
  }, [user?.id])

  async function handleSave() {
    if (!user?.id)  return 

    if (!name.trim()) {
      Alert.alert('Atenção', 'Informe seu nome.')
      return
    }

    if (!email.trim()) {
      Alert.alert('Atenção', 'Informe seu e-mail.')
      return
    }

    setLoading(true)

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        name,
        phone,
      })
      .eq('id', user.id)

    const { error: authError } = await supabase.auth.updateUser({
      email,
      data: {
        name,
        phone,
      }
    })

    setLoading(false)

    if (profileError || authError) {
      Alert.alert('Erro', profileError?.message || authError?.message || 'Não foi possível atualizar.')
      return
    }

    Alert.alert('Perfil atualizado', 'Seus dados foram salvos com sucesso.')
    router.back()
  }

  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <View style={s.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [s.backButton, pressed && s.pressed]}
          >
            <Feather name="arrow-left" size={20} color="#F5F1E8" />
          </Pressable>
        </View>

        <View style={s.hero}>
          <Text style={s.kicker}>PERFIL</Text>
          <Text style={s.title}>Editar perfil</Text>
          <Text style={s.subtitle}>
            Atualize suas informações pessoais no app.
          </Text>
        </View>

        <View style={s.divider} />

        <View style={s.form}>
          <View style={s.field}>
            <Text style={s.label}>Nome</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor="rgba(245,241,232,0.38)"
              style={s.input}
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Seu e-mail"
              placeholderTextColor="rgba(245,241,232,0.38)"
              keyboardType="email-address"
              autoCapitalize="none"
              style={s.input}
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Telefone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="(00) 00000-0000"
              placeholderTextColor="rgba(245,241,232,0.38)"
              keyboardType="phone-pad"
              style={s.input}
            />
          </View>
        </View>

        <AppButton onPress={handleSave}>{loading ? 'Salvando...' : 'Salvar alterações'}</AppButton>
      </ScrollView>
    </Screen>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09070A',
  },

  content: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 44,
    gap: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hero: {
    gap: 8,
  },

  kicker: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: '#E4B84E',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#F5F1E8',
    lineHeight: 36,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },

  divider: {
    width: 56,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#E4B84E',
  },

  form: {
    gap: 18,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E4B84E',
    letterSpacing: 0.4,
  },

  input: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#F5F1E8',
  },

  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.995 }],
  },
})