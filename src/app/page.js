import React from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "./componants/navbar";
import FormSelect from "./componants/formSelect";
import Blog from "./componants/blog";
import Companies from "./componants/companies";
import AboutUs from "./componants/aboutUs";
import ServicesTwo from "./componants/sercicesTwo";
import Footer from "./componants/footer";
import ScrollTop from "./componants/scrollTop";

import { jobData } from "./data/data";
import { FiClock, FiMapPin, FiBookmark } from "./assets/icons/vander"

export default function IndexTwo(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-260 d-table w-100" style={{backgroundImage:'url("/images/bg3.jpeg")'}}>
            <div className="bg-overlay bg-primary-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-10">
                        <div className="title-heading text-center">
                            <h1 className="heading text-white fw-bold">Selamat Datang <br/> Siswa Siswi SMKN 1 Kepanjen</h1>
                            <p className="para-desc text-white-50 mx-auto mb-0">Temukan Buku Favoritmu, Mudah dan Cepat langsung dari perangkatmu.<br/></p>
                        

                            <div className="mt-2">
                                <span className="text-white-50"><span className="text-white">Quotes:</span> Buku adalah jendela ilmu.</span>
                            </div>
                        </div>
                    </div>
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

        <section className="section">
            <AboutUs containerClass="container mt-60"/>

        </section>

        <Footer/>
        <ScrollTop/>
        </>
    )
}