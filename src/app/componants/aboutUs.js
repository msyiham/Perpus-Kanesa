'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ModalVideo from 'react-modal-video';
import '../../../node_modules/react-modal-video/scss/modal-video.scss';

export default function AboutUs({containerClass}){
    let [isOpen, setOpen] = useState(false);
    return(
        <>
            <div className={containerClass}>
                <div className="row g-4 align-items-center">
                    <div className="col-lg-6 col-md-6 mb-5">
                        <div className="about-left">
                            <div className="position-relative shadow rounded img-one">
                                <Image src='/images/about/responsive.png' width={0} height={0} sizes='100vw' style={{width:'100%',height:'auto'}} className="img-fluid rounded" alt=""/>
                            </div>

                            <div className="img-two shadow rounded p-2">
                                <Image src='/images/about/books.png' width={0} height={0} sizes='100vw' style={{width:'100%',height:'auto'}} className="img-fluid rounded" alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="section-title ms-lg-5">
                            <h4 className="title mb-3">Penjelasan singkat.</h4>
                            <p className="text-muted para-desc mb-0">Selamat datang di katalog buku digital SMKN 1 Kepanjen! Website ini dirancang oleh tim Asistensi Mengajar Universitas Negeri Malang tahun 2024 sebagai bagian dari program kerja mereka. Tujuan utama dari website ini adalah untuk memudahkan siswa dalam memilih buku sebelum mengunjungi perpustakaan. Dengan antarmuka yang ramah pengguna dan pencarian yang efisien, siswa dapat menjelajahi berbagai koleksi buku yang tersedia, mulai dari buku pelajaran hingga karya sastra populer. Kami berharap platform ini dapat meningkatkan minat baca dan mempermudah akses informasi bagi seluruh siswa. Selamat menjelajah dan temukan buku favorit Anda!.</p>
                            <div className="mt-4">
                                <Link href="/book" className="btn btn-primary">Lihat Daftar Buku <i className="mdi mdi-arrow-right align-middle"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}