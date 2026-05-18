import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const LOGO_URI =
  'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

export default function QuemSomosScreen() {
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
          <Image
            source={{ uri: LOGO_URI }}
            style={s.logo}
            resizeMode="contain"
          />

          <View style={s.headerText}>
            <Text style={s.kicker}>SOBRE NÓS</Text>
            <Text style={s.title}>Igreja Batista do Caminho</Text>
            <Text style={s.subtitle}>Quem somos</Text>
          </View>
        </View>

        <View style={s.divider} />

        <View style={s.article}>
          <Text style={s.paragraph}>
            Somos a Igreja Batista do Caminho, formada por pessoas que aceitaram
            o convite do Evangelho para fazer parte do seguimento de Jesus.
            Cremos na revelação de Deus, em Jesus de Nazaré, como expressão
            máxima de amor e de solidariedade divina com a humanidade.
          </Text>

          <Text style={s.paragraph}>
            Cremos que seguir Jesus significa uma entrega profunda, fruto da
            Graça, para ajudar o mundo a ser um lugar de justiça, solidariedade
            e liberdade para todas as pessoas.
          </Text>

          <Text style={s.paragraph}>
            Confiamos na comunhão, na partilha, na convivência e na amizade e
            por isso decidimos nos constituir uma comunidade de fé.
          </Text>

          <Text style={s.paragraph}>
            Lemos a Bíblia pelo viés dos povos oprimidos e das vítimas da terra,
            e acreditamos que o semblante de Deus se revela especialmente no
            rosto daqueles e daquelas que sofrem.
          </Text>

          <Text style={s.paragraph}>
            Discernimos que toda forma de opressão, preconceito, injustiça e
            exploração constitui uma ofensa à humanidade e ao próprio coração de
            Deus.
          </Text>

          <Text style={s.paragraph}>
            Apostamos no diálogo, nos movimentos ecumênicos e inter-religiosos e
            na busca pelo bem comum. Temos o Reino de Deus como esperança de
            consumação de vida plena para toda a humanidade, como fruto da obra
            redentora de Cristo.
          </Text>

          <Text style={s.paragraph}>
            Assumimos que a esperança desse Reino não nos deve fazer esperar,
            mas protagonizar com humildade as mudanças que sinalizam esta nova
            Vida.
          </Text>

          <Text style={s.paragraph}>
            Carregamos nossos limites e contradições, mas estamos aqui de portas
            e corações abertos nessa fé comum em Jesus. Esta é nossa aposta e
            assim vamos pelo Caminho.
          </Text>
        </View>

        <View style={s.quoteBlock}>
          <Text style={s.quote}>
            “Assim resplandeça a vossa luz diante dos homens, para que vejam as
            vossas boas obras e glorifiquem a vosso Pai, que está nos céus.”
          </Text>
          <Text style={s.quoteAuthor}>Mateus 5:16</Text>
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
    paddingTop: 0,
    paddingBottom: 40,
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
    marginBottom: 24,
  },

  header: {
    alignItems: 'center',
    gap: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },

  logo: {
    width: 72,
    height: 72,
  },

  headerText: {
    alignItems: 'center',
    gap: 6,
  },

  kicker: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: '#E4B84E',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: '#F5F1E8',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: 'rgba(245,241,232,0.72)',
    textAlign: 'center',
  },

  divider: {
    width: 56,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#E4B84E',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 28,
  },

  article: {
    gap: 18,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 30,
    color: '#F5F1E8',
  },

  quoteBlock: {
    marginTop: 36,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(228,184,78,0.15)',
    alignItems: 'center',
    gap: 10,
  },

  quote: {
    fontSize: 18,
    lineHeight: 30,
    color: '#E4B84E',
    textAlign: 'center',
  },

  quoteAuthor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F5F1E8',
  },
})