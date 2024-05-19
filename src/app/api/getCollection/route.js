// app/api/getCollection/route.js
import { NextResponse } from 'next/server';
import { FIRESTORE } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(FIRESTORE, 'daftar buku'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from Firestore' }, { status: 500 });
  }
}
