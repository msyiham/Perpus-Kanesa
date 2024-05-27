'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../componants/navbar';
import Footer from '../componants/footer';
import ScrollTop from '../componants/scrollTop';
import { FiUsers, FiEdit2 } from "../assets/icons/vander";
import { collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE } from '../firebaseConfig';
export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(16); // Number of books to display per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIRESTORE, 'daftar buku'), (snapshot) => {
      const booksWithId = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksWithId);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const searchBooks = () => {
      let filtered = books;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(book => {
          const title = book.Judul?.toLowerCase() || '';
          const publisher = book.Penerbit?.toLowerCase() || '';
          const author = book.Penulis?.toLowerCase() || '';
          return title.includes(query) || publisher.includes(query) || author.includes(query);
        });
      }

      if (category !== 'all') {
        filtered = filtered.filter(book => book.Kategori === category);
      }

      setFilteredBooks(filtered);
    };

    searchBooks();
  }, [searchQuery, category, books]);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <section className="bg-half-170 d-table w-100 bg-primary" style={{ backgroundImage: "url('/images/bg2.png')", backgroundPosition: 'center' }}>
        <div className="section-title text-center">
          <h4 className="title mb-3 text-light">DAFTAR BUKU</h4>
        </div>
      </section>
      <section className="section">
        <div className="container mt-60">
          <div className="row">
            <div>

              <div className='row'>
                <div className='col-lg-8 col-md-6 col-sm-6 col-sm-12'>
                  <input
                    type="text"
                    placeholder="Cari berdasar judul, penerbit, atau penulis"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ width: '100%', border: '1px solid', borderColor: 'gray' }}
                    className='form-control'
                  />
                </div>
                <div className='col-lg-4 col-md-6 col-sm-6 col-sm-12'>
                  <div className='row'>
                    <div className='col-md-5 mt-2'>
                      <b>Pilh Kategori</b>
                    </div>
                    <div className='col-md-7'>
                      <select className='form-select form-control' value={category} onChange={e => setCategory(e.target.value)} style={{ border: '1px solid', borderColor: 'gray' }}>
                        <option value="all">Semua</option>
                        <option value="Teks">Teks</option>
                        <option value="Fiksi">Fiksi</option>
                        <option value="Referensi">Referensi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row text-dark mt-5'>
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center mt-4">
                      <h4>Loading...</h4>
                    </div>
                  ) : (
                    currentBooks.map((book, index) => (
                      <div className="col-12 mb-2" key={index}>
                        <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
                          <div className="d-flex align-items-center w-310px">
                            <div className="ms-3">
                              <Link href={`/book/${book.id}`} className="h5 title text-dark">{book.Judul}</Link>
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                            <span className="badge bg-soft-primary rounded-pill"><FiUsers className="fea icon-sm me-1 align-middle" />Penerbit:</span>
                            <span className="text-muted d-flex align-items-center fw-medium mt-md-2">{book.Penerbit}</span>
                          </div>

                          <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                            <span className="text-muted d-flex align-items-center"><FiEdit2 className="fea icon-sm me-1 align-middle" />Penulis:</span>
                            <span className="d-flex fw-medium mt-md-2">{book.Penulis}</span>
                          </div>

                          <div className="mt-3 mt-md-0">
                            <Link href={`/book/${book.id}`} className="btn btn-sm btn-primary w-full ms-md-1">Baca Sinopsis</Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Pagination
                booksPerPage={booksPerPage}
                totalBooks={filteredBooks.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>

      </section>
      <Footer />
      <ScrollTop />
    </>
  );
}

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='mt-4'>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <Link href="#!" onClick={() => paginate(number)} className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
