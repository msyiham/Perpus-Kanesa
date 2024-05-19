import React from "react";
import Link from "next/link";
import Image from "next/image";

import { contactData } from "../data/data";

import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

export default function ContactUs(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/bg1.jpg')", backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <p className="text-white-50 para-desc mx-auto mb-0">Ada masalah?</p>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Hubungi Kami</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link href="/">Beranda</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Hubungi Kami</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section pb-10">
            <div className="container mt-60">
                <div className="row g-4">
                    {contactData.map((item,index)=>{
                        let Icon = item.icon
                        return(
                            <div className="col-md-4" key={index}>
                                <div className="position-relative features text-center mx-lg-4 px-md-1">
                                    <div className="feature-icon bg-soft-primary rounded shadow mx-auto position-relative overflow-hidden d-flex justify-content-center align-items-center">
                                        <Icon className="fea icon-ex-md"/>
                                    </div>
            
                                    <div className="mt-4">
                                        <h5 className="mb-3">{item.title}</h5>
                                        <p className="text-muted">{item.desc}</p>
                                        <Link href={item.link} className="text-primary">{item.link}</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}