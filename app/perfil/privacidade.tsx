import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

export default function PrivacidadeScreen() {
  return (
    <Screen contentStyle={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <Pressable onPress={() => router.back()} style={s.backButton}>
          <Feather name="arrow-left" size={20} color="#F5F1E8" />
        </Pressable>

        <View style={s.hero}>
          <Text style={s.kicker}>PERFIL</Text>
          <Text style={s.title}>Privacidade</Text>
          <Text style={s.subtitle}>
            Entenda como suas informações são usadas no app.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Dados salvos</Text>
          <Text style={s.cardText}>
            Guardamos apenas informações básicas da sua conta, como nome, e-mail
            e telefone, para melhorar sua experiência no app.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Pedidos de oração</Text>
          <Text style={s.cardText}>
            Quando você enviar um pedido de oração, ele será usado apenas para
            cuidado pastoral e acompanhamento da igreja.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Remoção de dados</Text>
          <Text style={s.cardText}>
            Caso queira alterar ou remover suas informações, entre em contato
            com a equipe da igreja.
          </Text>
        </View>
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
    paddingBottom: 44,
    gap: 20,
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
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },
  card: {
    backgroundColor: '#100D13',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E4B84E',
  },
  cardText: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.76)',
  },
})