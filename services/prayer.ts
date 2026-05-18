import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

type CreatePrayerRequestInput = {
  message: string
  anonymous: boolean
}

export async function createPrayerRequest(input: CreatePrayerRequestInput) {
  await addDoc(collection(db, 'prayer_requests'), {
    message: input.message,
    anonymous: input.anonymous,
    createdAt: serverTimestamp(),
    status: 'new',
  })
}