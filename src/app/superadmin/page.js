'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../componants/navbar';
import {FiTrash2, FiClock, FiMapPin} from "../assets/icons/vander"
import AboutTwo from '../componants/aboutTwo'
import Companies from '../componants/companies'
import Blog from '../componants/blog'
import Footer from '../componants/footer'
import ScrollTop from '../componants/scrollTop'
export default function Home() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10); // Number of books to display per page
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/getCollection'); // Ensure this endpoint exists and is correct
          const result = await response.json();
  
          const booksWithId = result.map(item => ({
            ...item,
            id: item.id // or whatever the ID field is called
          }));
  
          setBooks(booksWithId);
          console.log("data", booksWithId);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };  
      fetchData();
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (currentBooks && currentBooks.length > 0) {
        setLoading(false);
      }
    }, [currentBooks]);
    
  return (

    <>
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-lg-8 col-md-6 col-sm-12 mb-2">
          <input
            type="text"
            placeholder="Search by title, publisher, or author"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ border: '1px solid', borderColor: 'gray' }}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="row">
            <div className="col-md-5 mt-2">
              <b>Pilih Kategori</b>
            </div>
            <div className="col-md-7">
              <select
                className="form-select form-control"
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ border: '1px solid', borderColor: 'gray' }}
              >
                <option value="all">Semua</option>
                <option value="Teks">Teks</option>
                <option value="Fiksi">Fiksi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row text-dark">
        {loading ? (
          <div className="col-12 text-center mt-4">
            <h4>Loading...</h4>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th>Penerbit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{index + 1 + indexOfFirstBook}</td>
                    <td>
                      <Link className="text-dark" href={`/book/${book.id}`} passHref>
                        {book.Judul}
                      </Link>
                    </td>
                    <td>{book.Penulis}</td>
                    <td>{book.Penerbit}</td>
                    <td>
                      <Link className="btn btn-link text-dark" href={`/book/${book.id}`} passHref>
                        <i className="mdi mdi-pencil"></i>
                      </Link>
                      <Link className="btn btn-link text-dark" href={`/book/${book.id}`} passHref>
                        <FiTrash2></FiTrash2>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={filteredBooks.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
    </>
  )
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
              <Link onClick={() => paginate(number)} href="#!" className="page-link">
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
};
