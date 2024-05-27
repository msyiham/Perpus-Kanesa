// app/api/getCollection/[id].js
import { FIRESTORE } from '@/app/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ error: 'Missing id parameter' });
      return;
    }

    const docRef = doc(FIRESTORE, 'daftar buku', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    const bookData = { id: docSnap.id, ...docSnap.data() };
    res.status(200).json(bookData);
  } catch (error) {
    console.error('Error fetching book data:', error);
    res.status(500).json({ error: 'Failed to fetch book data' });
  }
}
