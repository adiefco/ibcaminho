import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const LOGO_URI =
    'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

export default function NossoCaminhoScreen() {
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
                            Nosso caminho
                        </Text>
                    </View>
                </View>



                <View style={s.divider} />

                <View style={s.article}>
                    <Text style={s.sectionTitle}>
                        Uma história construída em comunhão, fé e esperança.

                    </Text>
                    <Text style={s.paragraph}>
                        A Igreja Batista do Caminho foi fundada como Congregação da
                        Primeira Igreja Batista de Niterói, em julho de 2009, em
                        Piratininga – Niterói, e emancipada como igreja em dezembro de 2012.
                    </Text>

                    <Text style={s.paragraph}>
                        Formar uma nova igreja foi um sonho nascido do encontro de cerca de
                        vinte jovens ligados à liderança de jovens e adolescentes da PIBN na
                        época.
                    </Text>

                    <Text style={s.paragraph}>
                        A oportunidade de dar continuidade à experiência religiosa
                        individual e coletiva surgiu através de um projeto evangelístico de
                        implantação de igrejas.
                    </Text>

                    <Text style={s.paragraph}>
                        Após meses de reuniões, devocionais e debates, o grupo inaugurou a
                        Igreja Batista do Caminho em julho de 2009, sob os cuidados do
                        pastor Henrique Vieira e de um colegiado eleito em Assembleia.
                    </Text>

                    <Text style={s.paragraph}>
                        Desde então, a comunidade desenvolveu iniciativas pastorais,
                        pedagógicas, culturais e comunicacionais.
                    </Text>

                    <Text style={s.paragraph}>
                        Por meio de cultos, partilha bíblica, oficinas, saraus, congressos
                        artísticos e debates teológicos, buscou viver um evangelho amplo,
                        profundo e transformador.
                    </Text>

                    <Text style={s.paragraph}>
                        A comunhão e o cuidado pastoral compartilhado sempre foram marcas da
                        comunidade. A igreja tem sido cenário de conversões, batismos,
                        reconciliações e reaproximações.
                    </Text>

                    <Text style={s.paragraph}>
                        Em novembro de 2015, após anos em endereço fixo, a comunidade
                        reformulou sua forma geográfica de ser igreja: encontros mensais,
                        casas abertas e presença em diferentes lugares.
                    </Text>

                    <Text style={s.paragraph}>
                        Durante a pandemia, os encontros migraram para o formato online,
                        alcançando pessoas em diversos lugares do mundo.
                    </Text>

                    <Text style={s.paragraph}>
                        No retorno ao presencial, novos caminhos foram discernidos e nasceu
                        o desejo de um espaço fixo novamente: um lugar potente e
                        transformador no Centro do Rio de Janeiro.
                    </Text>

                    <Text style={s.paragraph}>
                        Hoje a igreja está situada na Rua Sacadura Cabral, 60C - Saúde - Rio
                        de Janeiro, de braços abertos para receber cada pessoa.
                    </Text>

                    <Text style={s.paragraph}>
                        Nossos cultos acontecem aos domingos, às 10h30. Acompanhe também a
                        programação pelo Instagram @ibcaminho.
                    </Text>
                </View>

                <View style={s.quoteBlock}>
                    <Text style={s.quote}>
                        Em todo lugar, em todo o tempo, com tudo o que somos.
                    </Text>
                    <Text style={s.quoteAuthor}>IB Caminho</Text>
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