import { Feather } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { router, useLocalSearchParams } from 'expo-router'
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const PIX_KEY = 'igreja.caminho@gmail.com'

const oneTimeOptions = ['R$ 20', 'R$ 50', 'R$ 100']
const monthlyOptions = ['R$ 30/mês', 'R$ 50/mês', 'R$ 100/mês']

export default function ContributeScreen() {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(PIX_KEY)
    Alert.alert('Chave copiada', 'A chave Pix foi copiada com sucesso.')
  }

  const handleSelectAmount = (value: string) => {
    Alert.alert('Contribuição', `Valor selecionado: ${value}`)
  }

  const { project } = useLocalSearchParams<{ project?: string }>()

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
          <Text style={s.kicker}>DOAÇÃO</Text>
          <Text style={s.title}>Apoie a missão da igreja</Text>
          <Text style={s.subtitle}>
            {project
              ? `Sua contribuição será direcionada para: ${project}`
              : 'Sua contribuição ajuda a sustentar a missão da igreja, seus projetos e ações de cuidado.'}
          </Text>
        </View>

        <View style={s.divider} />

        <View style={s.card}>
          <Text style={s.cardTitle}>Faça uma doação única</Text>
          <Text style={s.cardDescription}>
            Ajude nossa missão com uma contribuição pontual.
          </Text>

          <View style={s.amountRow}>
            {oneTimeOptions.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleSelectAmount(item)}
                style={({ pressed }) => [
                  s.amountButton,
                  pressed && s.amountButtonPressed,
                ]}
              >
                <Text style={s.amountButtonText}>{item}</Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => Alert.alert('Outro valor', 'Você pode doar qualquer valor via Pix.')}
              style={({ pressed }) => [
                s.amountButton,
                s.amountButtonWide,
                pressed && s.amountButtonPressed,
              ]}
            >
              <Text style={s.amountButtonText}>Outro valor</Text>
              <Feather name="chevron-right" size={18} color="#09070A" />
            </Pressable>
          </View>
        </View>

        <View style={s.card}>
          <View style={s.pixHeader}>
            <View style={s.pixHeaderText}>
              <Text style={s.cardTitle}>PIX</Text>
              <Text style={s.pixEmail}>{PIX_KEY}</Text>
            </View>

            <Pressable
              onPress={handleCopy}
              style={({ pressed }) => [
                s.copyButton,
                pressed && s.copyButtonPressed,
              ]}
            >
              <Feather name="copy" size={22} color="#E4B84E" />
            </Pressable>
          </View>

          <View style={s.pixDivider} />

          <View style={s.pixInfo}>
            <Text style={s.pixInfoText}>Agência: 0541-0</Text>
            <Text style={s.pixInfoText}>Conta: 5182-9</Text>
            <Text style={s.pixInfoText}>
              Favorecido: IGREJA BATISTA DO CAMINHO
            </Text>
            <Text style={s.pixInfoText}>CNPJ: 19.465.220/0001-19</Text>
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Apoie mensalmente</Text>
          <Text style={s.cardDescription}>
            Fortaleça nossa missão com doações recorrentes.
          </Text>

          <View style={s.amountRow}>
            {monthlyOptions.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleSelectAmount(item)}
                style={({ pressed }) => [
                  s.amountButton,
                  s.monthlyButton,
                  pressed && s.amountButtonPressed,
                ]}
              >
                <Text style={s.amountButtonText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text style={s.helperText}>
          Você também pode copiar a chave Pix e realizar a contribuição pelo app
          do seu banco.
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
    padding: 20,
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

  card: {
    backgroundColor: '#100D13',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 18,
    gap: 14,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  cardDescription: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(245,241,232,0.72)',
  },

  amountRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  amountButton: {
    minHeight: 56,
    minWidth: 110,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: '#E4B84E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  amountButtonWide: {
    paddingHorizontal: 20,
  },

  monthlyButton: {
    flex: 1,
    minWidth: 0,
  },

  amountButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09070A',
  },

  amountButtonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },

  pixHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },

  pixHeaderText: {
    flex: 1,
    gap: 6,
  },

  pixEmail: {
    fontSize: 17,
    lineHeight: 26,
    color: '#F5F1E8',
  },

  copyButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  copyButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },

  pixDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  pixInfo: {
    gap: 8,
  },

  pixInfoText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#F5F1E8',
  },

  helperText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(245,241,232,0.68)',
  },
})