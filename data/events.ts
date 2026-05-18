export type EventItem = {
    id: string
    title: string
    weekday: string
    time: string
    location: string
    description: string
    featured?: boolean
    startDate: string
    endDate: string
  }
  
  export const events: EventItem[] = [
    {
      id: 'culto-domingo',
      title: 'Culto de Domingo',
      weekday: 'Domingo',
      time: '10h30',
      location: 'Rua Sacadura Cabral, 60C - Saúde - Rio de Janeiro',
      description:
        'Um momento de comunhão, louvor e reflexão para toda a igreja.',
      featured: true,
      startDate: '2026-04-26T10:30:00',
      endDate: '2026-04-26T12:00:00',
    },
    {
      id: 'encontro-jovens',
      title: 'Encontro de Jovens',
      weekday: 'Sexta-feira',
      time: '20h',
      location: 'Igreja Batista do Caminho',
      description:
        'Um tempo de encontro, conversa, partilha e espiritualidade.',
      startDate: '2026-04-24T20:00:00',
      endDate: '2026-04-24T22:00:00',
    },
    {
      id: 'acao-social',
      title: 'Ação Social',
      weekday: 'Sábado',
      time: '9h',
      location: 'Igreja Batista do Caminho',
      description: 'Serviço e cuidado com a comunidade.',
      startDate: '2026-04-25T09:00:00',
      endDate: '2026-04-25T12:00:00',
    },
  ]