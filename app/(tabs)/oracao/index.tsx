import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native'

import { AppButton } from '@/components/ui/AppButton'
import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/services/supabase/client'

export default function PrayerScreen() {
  const { user } = useAuth()
  
  const [anonymous, setAnonymous] = useState(true)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!user?.id) {
      router.push('/auth/login')
      return
    }

    if (!message.trim()) {
      Alert.alert('Atenção', 'Escreva seu pedido de oração.')
      return
    }

    try {
      setLoading(true)

     const { error } = await supabase.from('prayer_requests').insert({
        user_id: user.id,
        message: message.trim(),
        is_private: anonymous,
      })

      if (error) {
        Alert.alert('Erro', error.message || 'Não foi possível enviar seu pedido.')
        return  
      }

      Alert.alert(
        'Pedido enviado',
        'Recebemos seu pedido com carinho. Vamos orar com você. 🙏'
      )

      setMessage('')
      setAnonymous(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <Pressable onPress={() => router.back()} style={s.backButton}>
          <Feather name="arrow-left" size={20} color="#F5F1E8" />
        </Pressable>

        <View style={s.header}>
          <Text style={s.kicker}>ORAÇÃO</Text>
          <Text style={s.title}>Pedido de oração</Text>
          <Text style={s.subtitle}>
            Compartilhe seu pedido. Vamos caminhar em oração com
            você.
          </Text>
        </View>

        <View style={s.divider} />

        <View style={s.introBox}>
          <Feather name="heart" size={18} color="#E4B84E" />
          <Text style={s.introText}>
            Este espaço é para acolher seu coração com cuidado, respeito e fé.
          </Text>
        </View>

        <View style={s.form}>
          <Text style={s.label}>Seu pedido</Text>

          <TextInput
            multiline
            placeholder="Escreva aqui seu pedido..."
            placeholderTextColor="rgba(245,241,232,0.38)"
            value={message}
            onChangeText={setMessage}
            style={s.input}
          />

          <View style={s.row}>
            <View style={s.rowText}>
              <Text style={s.toggleTitle}>Enviar como anônimo</Text>
              <Text style={s.toggleSubtitle}>
                Seu nome não será identificado no pedido.
              </Text>
            </View>

            <Switch
              value={anonymous}
              onValueChange={setAnonymous}
              trackColor={{
                false: 'rgba(255,255,255,0.14)',
                true: '#C8A75B',
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <AppButton onPress={handleSubmit}>
          {loading ? 'Enviando...' : 'Enviar pedido'}
        </AppButton>

        <Text style={s.helperText}>
          Se preferir, você também pode conversar pessoalmente com a equipe da
          igreja.
        </Text>
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
    paddingTop: 20,
    paddingBottom: 44,
    gap: 22,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  header: {
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

  introBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(228,184,78,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(228,184,78,0.14)',
  },

  introText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: '#F5F1E8',
  },

  form: {
    gap: 14,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E4B84E',
  },

  input: {
    minHeight: 180,
    backgroundColor: '#100D13',
    borderRadius: 22,
    padding: 18,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 26,
    color: '#F5F1E8',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  rowText: {
    flex: 1,
    gap: 4,
  },

  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F1E8',
  },

  toggleSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(245,241,232,0.68)',
  },

  helperText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(245,241,232,0.62)',
    textAlign: 'center',
  },
})