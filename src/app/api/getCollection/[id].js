// app/api/getCollection/[id].js
import { FIRESTORE } from '@/app/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request) {
  try {
    const { id } = request.params;
    const docRef = doc(FIRESTORE, 'daftar buku', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { error: 'Book not found' };
    }

    const bookData = { id: docSnap.id, ...docSnap.data() };
    return bookData;
  } catch (error) {
    console.error('Error fetching book data:', error);
    return { error: 'Failed to fetch book data' };
  }
}
