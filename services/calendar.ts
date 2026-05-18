import * as Calendar from 'expo-calendar'

export async function addEventToCalendar({
  title,
  startDate,
  endDate,
}: {
  title: string
  startDate: Date
  endDate: Date
}) {
  const { status } = await Calendar.requestCalendarPermissionsAsync()

  if (status !== 'granted') {
    alert('Permissão para acessar o calendário foi negada.')
    return
  }

  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  )

  const defaultCalendar = calendars.find(
    (cal) => cal.allowsModifications
  )

  if (!defaultCalendar) {
    alert('Nenhum calendário disponível.')
    return
  }

  await Calendar.createEventAsync(defaultCalendar.id, {
    title,
    startDate,
    endDate,
    timeZone: 'America/Sao_Paulo',
  })

  alert('Evento adicionado ao calendário! 📅')
}