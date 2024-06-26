'use client';
import { useEffect, useState } from 'react';
import { FIRESTORE, FIREBASE_AUTH } from '@/app/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from '@/app/componants/navbar';
import Footer from '@/app/componants/footer';
import ScrollTop from '@/app/componants/scrollTop';
import { LuBadgeInfo } from "../../assets/icons/vander"; // Adjust the import according to your project structure

export default function BookDetail({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(FIRESTORE, 'daftar buku', encodeURIComponent(id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section className="bg-half-170 d-table w-100" style={{ backgroundImage: "url('/images/bg1.jpg')", backgroundPosition: 'center' }}>
        <div className="bg-overlay bg-gradient-overlay-2"></div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="#EEEEEE"></path>
          </svg>
        </div>
      </div>

      <section className="section" style={{ backgroundColor: '#EEEEEE' }}>
        {user ? (
          book ? (
            <div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 mt-4">
                    <div className="features-absolute">
                      <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-4">
                        <div className="d-flex align-items-center">
                          <Image src='/images/book.png' width={80} height={80} className="avatar avatar-md-md rounded shadow p-3 bg-white" alt="" />
                          <div className="ms-3">
                            <h5>{book.Judul}</h5>
                            <span className="text-muted d-flex align-items-center"><LuBadgeInfo className="fea icon-sm me-1" />Detail Buku</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mt-5">
                <div className="row g-4">
                  <div className="col-lg-8 col-md-7 col-12">
                    <div className="row g-4">
                      {book.Foto && (
                        <div className="col-6">
                          <Image
                            src={book.Foto}
                            width={500}
                            height={500}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            className="rounded shadow img-fluid"
                            alt="Foto Buku"
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                    {book.Sinopsis && (
                      <>
                        <h4 className="mb-4 mt-5">Sinopsis:</h4>
                        <p className="text-muted mb-5" style={{ textAlign: 'justify' }}>{book.Sinopsis}.</p>
                      </>
                    )}
                    <Link href="/book">
                      <button className="btn btn-primary">Kembali</button>
                    </Link>
                  </div>

                  <div className="col-lg-4 col-md-5 col-12">
                    <div className="card bg-white p-4 rounded shadow sticky-bar">
                      <div className="mt-3">
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <span className="text-muted fw-medium">Penulis:</span>
                          <span>{book.Penulis}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <span className="text-muted fw-medium">Penerbit:</span>
                          <span>{book.Penerbit}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <span className="text-muted fw-medium">Tahun:</span>
                          <span>{book.Tahun}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <span className="text-muted fw-medium">Kategori:</span>
                          <span>{book.Kategori}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )
        ) : (
          <p className='text-center'>
            Mohon Masuk untuk melihat detail buku dan membaca sinopsis.
            <br />
            <Link href={`/login?redirect=/book/${encodeURIComponent(id)}`}>
              <button className="btn btn-primary">Masuk</button>
            </Link>
          </p>
        )}
      </section>
      <Footer />
      <ScrollTop />
    </>
  );
}
