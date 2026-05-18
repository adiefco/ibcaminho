import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

const LOGO_URI =
  'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

const CONTACT = {
  email: 'contato@ibcaminho.com.br',
  address: 'Rua Sacadura Cabral, 60c - Saúde - Rio de Janeiro',
  facebook: 'https://www.facebook.com/ibdocaminho/',
  youtube: 'https://www.youtube.com/c/IBCaminho/featured',
  instagram: 'https://www.instagram.com/ibcaminho/',
  whatsappGroup: 'https://chat.whatsapp.com/Frr3tQFEk9D1Q0mHa3HAGf',
}

type ContactItemProps = {
  icon: keyof typeof Feather.glyphMap
  title: string
  subtitle?: string
  onPress: () => void
}

export default function ContatoScreen() {
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
            <Text style={s.kicker}>CONTATO</Text>
            <Text style={s.title}>Fale Conosco</Text>
            <Text style={s.subtitle}>
              Entre em contato por um dos nossos canais de atendimento.
            </Text>
          </View>
        </View>

        <View style={s.divider} />

        <View style={s.section}>
          <ContactItem
            icon="mail"
            title={CONTACT.email}
            subtitle="E-mail"
            onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
          />

          <ContactItem
            icon="map-pin"
            title={CONTACT.address}
            subtitle="Localização"
            onPress={() =>
              Linking.openURL(
                'https://maps.google.com/?q=Rua+Sacadura+Cabral,+60c+-+Saúde+-+Rio+de+Janeiro'
              )
            }
          />
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Siga-nos</Text>

          <ContactItem
            icon="facebook"
            title="Facebook"
            onPress={() => Linking.openURL(CONTACT.facebook)}
          />

          <ContactItem
            icon="youtube"
            title="YouTube"
            onPress={() => Linking.openURL(CONTACT.youtube)}
          />

          <ContactItem
            icon="instagram"
            title="Instagram"
            onPress={() => Linking.openURL(CONTACT.instagram)}
          />
        </View>

        <View style={s.whatsBlock}>
          <Text style={s.whatsKicker}>GRUPO DO WHATSAPP</Text>
          <Text style={s.whatsText}>
            Faça parte do nosso grupo e acompanhe mais de perto a caminhada da igreja.
          </Text>

          <Pressable
            onPress={() => Linking.openURL(CONTACT.whatsappGroup)}
            style={({ pressed }) => [s.whatsButton, pressed && s.pressed]}
          >
            <Text style={s.whatsButtonText}>Fazer parte</Text>
            <Feather name="arrow-up-right" size={18} color="#09070A" />
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  )
}

function ContactItem({ icon, title, subtitle, onPress }: ContactItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.item, pressed && s.pressed]}
    >
      <View style={s.itemLeft}>
        <View style={s.iconWrap}>
          <Feather name={icon} size={18} color="#E4B84E" />
        </View>

        <View style={s.itemTextBox}>
          {subtitle ? <Text style={s.itemSubtitle}>{subtitle}</Text> : null}
          <Text style={s.itemTitle}>{title}</Text>
        </View>
      </View>

      <Feather name="chevron-right" size={18} color="#E4B84E" />
    </Pressable>
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
    fontSize: 30,
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
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E4B84E',
  },

  item: {
    minHeight: 72,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(228, 184, 78, 0.08)',
  },

  itemTextBox: {
    flex: 1,
    gap: 2,
  },

  itemSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: '#E4B84E',
    textTransform: 'uppercase',
  },

  itemTitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#F5F1E8',
  },

  whatsBlock: {
    marginTop: 8,
    padding: 20,
    borderRadius: 22,
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(228,184,78,0.15)',
    gap: 12,
  },

  whatsKicker: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#E4B84E',
  },

  whatsText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#F5F1E8',
  },

  whatsButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E4B84E',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  whatsButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#09070A',
  },

  pressed: {
    opacity: 0.82,
  },
})