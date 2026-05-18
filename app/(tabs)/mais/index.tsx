import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'

type SectionItemProps = {
  icon: keyof typeof Feather.glyphMap
  title: string
  onPress: () => void
}

type SectionProps = {
  title: string
  items: SectionItemProps[]
}

const LOGO_URI =
  'https://ibcaminho.com.br/wp-content/uploads/2021/08/logo-branca-menor.fw_.png'

export default function MaisScreen() {
  const sections: SectionProps[] = [
    {
      title: 'NOSSA IGREJA',
      items: [
        {
          icon: 'users',
          title: 'Quem somos',
          onPress: () => router.push('/mais/quem-somos'),
        },
        {
          icon: 'map',
          title: 'Nosso caminho',
          onPress: () => router.push('/mais/nosso-caminho'),
        },
        {
          icon: 'book-open',
          title: 'Em que acreditamos',
          onPress: () => router.push('/mais/em-que-acreditamos'),
        },
        {
          icon: 'star',
          title: 'Nossos valores',
          onPress: () => router.push('/mais/nossos-valores'),
        },
        {
          icon: 'shield',
          title: 'Colegiado',
          onPress: () => router.push('/mais/colegiado'),
        },
        {
          icon: 'user-check',
          title: 'Nossa equipe',
          onPress: () => router.push('/mais/nossa-equipe'),
        },
      ],
    },
    {
      title: 'CAMINHE CONOSCO',
      items: [
        {
          icon: 'briefcase',
          title: 'Projetos',
          onPress: () => router.push('/projetos'),
        },
        {
          icon: 'heart',
          title: 'Contribuição',
          onPress: () => router.push('/contribute'),
        },
      ],
    },
    {
      title: 'CONECTE-SE',
      items: [
        {
          icon: 'mail',
          title: 'Contato',
          onPress: () => router.push('/mais/contato'),
        },
      ],
    },
  ]

  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <View style={s.hero}>
          <Image
            source={{ uri: LOGO_URI }}
            style={s.logoImage}
            resizeMode="contain"
          />

          <View style={s.heroTextBox}>
            <Text style={s.heroKicker}>MENU</Text>
            <Text style={s.heroTitle}>Igreja Batista do Caminho</Text>
            <Text style={s.heroSubtitle}>
              Informação, comunhão e caminhos para seguir juntos.
            </Text>
          </View>
        </View>

        <View style={s.heroDivider} />

        {sections.map((section) => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>

            <View style={s.group}>
              {section.items.map((item, index) => (
                <SectionItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  onPress={item.onPress}
                  isLast={index === section.items.length - 1}
                />
              ))}
            </View>
          </View>
        ))}

        <View style={s.quoteBox}>
          <Text style={s.quoteText}>
            “Não só esperar pelos céus, mas construir hoje uma nova Terra”
          </Text>
          <Text style={s.quoteAuthor}>IB Caminho</Text>
        </View>
      </ScrollView>
    </Screen>
  )
}

function SectionItem({
  icon,
  title,
  onPress,
  isLast,
}: SectionItemProps & { isLast?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.item,
        !isLast && s.itemBorder,
        pressed && s.pressed,
      ]}
    >
      <View style={s.itemLeft}>
        <View style={[s.iconWrap, pressedIconStyle]}>
          <Feather name={icon} size={18} color="#E8DED0" />
        </View>

        <Text style={s.itemText}>{title}</Text>
      </View>

      <Feather name="chevron-right" size={20} color="#C8A75B" />
    </Pressable>
  )
}

const pressedIconStyle = {
  backgroundColor: 'rgba(200, 167, 91, 0.10)',
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09070A',
  },

  content: {
    paddingTop: 20,
    paddingBottom: 44,
    gap: 28,
  },

  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  logoImage: {
    width: 68,
    height: 68,
    opacity: 0.96,
  },

  heroTextBox: {
    flex: 1,
  },

  heroKicker: {
    color: '#C8A75B',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 6,
  },

  heroTitle: {
    color: '#F5F1E8',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },

  heroSubtitle: {
    color: 'rgba(245,241,232,0.72)',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 6,
  },

  heroDivider: {
    width: 56,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#C8A75B',
  },

  section: {
    gap: 14,
  },

  sectionTitle: {
    color: '#C8A75B',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  group: {
    borderRadius: 24,
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },

  item: {
    minHeight: 66,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 12,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },

  itemText: {
    color: '#F5F1E8',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },

  quoteBox: {
    paddingTop: 8,
    gap: 10,
    alignItems: 'center',
  },

  quoteText: {
    color: '#C8A75B',
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  quoteAuthor: {
    color: '#F5F1E8',
    fontSize: 15,
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.995 }],
  },
})