import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const LOGO_URI =
    'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

export default function EmQueAcreditamosScreen() {
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
                        <Text style={s.subtitle}>
                            Em que acreditamos
                        </Text>
                    </View>
                </View>

                <View style={s.divider} />

                <View style={s.article}>
                    <Text style={s.sectionTitle}>
                        DECLARAÇÃO DE COMPROMISSO COM O REINO DE DEUS
                    </Text>

                    <Text style={s.paragraph}>
                        Reconhecemos que a Igreja de Cristo deve resguardar sua autonomia
                        frente ao Estado, aos partidos e às instituições.
                    </Text>

                    <Text style={s.paragraph}>
                        Concordamos que o Evangelho de Jesus suplanta todo modelo de
                        sociedade e vertente política, apontando para uma utopia de plena
                        realização da condição humana.
                    </Text>

                    <Text style={s.paragraph}>
                        Afirmamos também que o Evangelho não é neutro diante das injustiças
                        históricas. Portanto, a Igreja também não deve ser.
                    </Text>

                    <Text style={s.paragraph}>
                        Em toda Tradição Bíblica grita o compromisso de Deus com os pobres e
                        os oprimidos. Em Jesus, Deus assumiu radicalmente a experiência do
                        povo oprimido, confundindo ricos e poderosos.
                    </Text>

                    <Text style={s.paragraph}>
                        Cremos que o Reino de Deus é feito de justiça, paz e alegria no
                        Espírito Santo.
                    </Text>

                    <Text style={s.paragraph}>
                        Cremos que justiça não é vingança; é retirar dos opressores seus
                        instrumentos de privilégios para que os oprimidos tenham plena
                        libertação. Justiça é igualdade na diversidade, pão repartido, fome
                        saciada e liberdade para ser em plenitude.
                    </Text>

                    <Text style={s.paragraph}>
                        Cremos que a paz não vem com armas, guerras e manifestações da
                        violência. A paz é filha e fruto da justiça.
                    </Text>

                    <Text style={s.paragraph}>
                        Cremos que a alegria é um direito da Vida e um desejo do Coração de
                        Deus. A alegria só é plena em ambientes livres de opressões e de
                        imposição de sofrimento.
                    </Text>

                    <Text style={s.paragraph}>
                        Por isso reconhecemos a luta do povo negro, das mulheres, da
                        comunidade LGBT, dos quilombolas, dos indígenas, dos sem-teto, dos
                        sem-terra, dos ribeirinhos, dos trabalhadores e dos pobres como
                        expressão justa de reparação histórica e de apontamento do Reino de
                        Deus.
                    </Text>


                    <Text style={s.highlight}>Cremos na força revolucionária do Amor.</Text>

                    <Text style={s.paragraph}>
                        Reconhecemos nossa precariedade, nossa finitude, nossa imperfeição.
                        Precisamos muito uns dos outros, da comunhão, da comunidade de fé.
                        Precisamos muito da bondade, da misericórdia, do amor e do carinho
                        de Deus.
                    </Text>

                    <Text style={s.paragraph}>
                        Cremos na força revolucionária do Amor.
                    </Text>

                    <Text style={s.paragraph}>
                        O amor que acolhe, respeita, se enche de compaixão, se alegra com a
                        justiça e se revolta contra as opressões. O amor que não reproduz o
                        ódio, não se utiliza da violência, não naturaliza a tortura, não
                        comemora a morte, não se alegra com a prisão, mas se folga com a
                        liberdade e promove Vida.
                    </Text>

                    <Text style={s.highlight}>Amai-vos. Não armai-vos.</Text>

                    <Text style={s.paragraph}>
                        Todas e todos têm acesso à mesa. Venham, vamos, de mãos dadas. Em
                        consolo mútuo nasce a esperança, desperta o grito, bate firme o
                        coração e os lábios entoam louvores ao Amigo Jesus de Nazaré.
                    </Text>

                    <Text style={s.paragraph}>
                        O futuro é de Deus. É dos pobres. É da Vida!
                    </Text>

                    <Text style={s.paragraph}>
                        Ser uma igreja reconhecida por uma vivência relevante do evangelho,
                        pela valorização do ser humano em todas as suas dimensões, pela
                        comunhão e pela prática do amor.
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
        paddingTop: 0,
        paddingBottom: 44,
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
        lineHeight: 24,
        paddingHorizontal: 12,
    },

    divider: {
        width: 56,
        height: 2,
        borderRadius: 999,
        backgroundColor: '#E4B84E',
        alignSelf: 'center',
        marginTop: 26,
        marginBottom: 30,
    },

    article: {
        gap: 18,
    },

    sectionTitle: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '700',
        letterSpacing: 1.2,
        color: '#E4B84E',
        textAlign: 'center',
        marginBottom: 8,
    },

    paragraph: {
        fontSize: 16,
        lineHeight: 30,
        color: '#F5F1E8',
    },
    highlight: {
        fontSize: 20,
        lineHeight: 30,
        color: '#E4B84E',
        textAlign: 'center',
        fontWeight: '700',
        marginVertical: 4,
      },
})