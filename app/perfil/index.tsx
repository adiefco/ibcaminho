import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { Screen } from '@/components/ui/Screen'
import { Text } from '@/components/ui/Text'
import { useAuth } from '@/contexts/AuthContext'
import { fetchMyProfile } from '@/services/supabase/profiles'

export default function PerfilScreen() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<{
    id: string
    name: string | null
    phone: string | null
  } | null>(null)

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return

      const data = await fetchMyProfile(user.id)
      setProfile(data)
    }

    loadProfile()
  }, [user?.id])

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login')
    }
  }, [user])

  const name =
    profile?.name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Visitante'

  const email = user?.email || ''


  function handleLogout() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await signOut()
          router.replace('/auth/login')
        },
      },
    ])
  }

  return (
    <Screen contentStyle={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <View style={s.header}>
          <Pressable onPress={() => router.back()} style={s.backButton}>
            <Feather name="arrow-left" size={20} color="#F5F1E8" />
          </Pressable>
        </View>

        <View style={s.hero}>
          <Text style={s.kicker}>PERFIL</Text>
          <Text style={s.title}>Sua conta</Text>
          <Text style={s.subtitle}>
            Gerencie suas informações e preferências no app.
          </Text>
        </View>

        <View style={s.divider} />

        <View style={s.profileCard}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>

          <View style={s.profileInfo}>
            <Text style={s.name}>{name}</Text>
            <Text style={s.email}>{email}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Conta</Text>

          <View style={s.group}>
            <ProfileItem
              icon="user"
              label="Editar perfil"
              onPress={() => router.push('/perfil/editar')}
              isLast={false}
            />

            <ProfileItem
              icon="bell"
              label="Notificações"
              onPress={() => router.push('/perfil/notificacoes')}
              isLast={false}
            />
            
            <ProfileItem
              icon="heart"
              label="Meus pedidos de oração"
              onPress={() => router.push('/perfil/oracoes')}
              isLast={false}
            />

            <ProfileItem
              icon="shield"
              label="Privacidade"
              onPress={() => router.push('/perfil/privacidade')}
              isLast={false}
            />

            <ProfileItem
              icon="help-circle"
              label="Ajuda"
              onPress={() => router.push('/perfil/ajuda')}
              isLast
            />
          </View>
        </View>

        <Pressable style={({ pressed }) => [s.logoutButton, pressed && s.pressed]} onPress={handleLogout}>
          <Feather name="log-out" size={18} color="#D96B5F" />
          <Text style={s.logoutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  )
}

type ProfileItemProps = {
  icon: keyof typeof Feather.glyphMap
  label: string
  onPress: () => void
  isLast?: boolean
}

function ProfileItem({ icon, label, onPress, isLast }: ProfileItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        s.item,
        !isLast && s.itemBorder,
        pressed && s.pressed,
      ]}
      onPress={onPress}
    >
      <View style={s.itemLeft}>
        <View style={s.itemIcon}>
          <Feather name={icon} size={18} color="#E4B84E" />
        </View>

        <Text style={s.itemLabel}>{label}</Text>
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

  profileCard: {
    backgroundColor: '#100D13',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E4B84E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#09070A',
  },

  profileInfo: {
    flex: 1,
    gap: 4,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F5F1E8',
  },

  email: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(245,241,232,0.72)',
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E4B84E',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  group: {
    borderRadius: 22,
    backgroundColor: '#100D13',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },

  item: {
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
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
  },

  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(228,184,78,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F5F1E8',
    flex: 1,
  },

  logoutButton: {
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(217,107,95,0.22)',
    backgroundColor: 'rgba(217,107,95,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D96B5F',
  },

  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.995 }],
  },
})