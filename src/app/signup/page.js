'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {FIREBASE_AUTH, FIRESTORE} from "../firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
export default function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = FIREBASE_AUTH;
    const db = FIRESTORE;
    const router = useRouter();
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Save the user's name in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email
            });
            router.push('/login');
            alert("Pendaftaran Berhasil!");

        } catch (error) {
            console.error("Error signing up: ", error);
            alert("Error signing up: " + error.message);
        }
    };
    return(
        <section className="bg-home d-flex align-items-center" style={{backgroundImage:"url('/images/bg3.jpeg')", backgroundPosition:'center'}}>
            <div className="bg-overlay bg-linear-gradient-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={handleSignup}>
                                <Link href="/"><Image src="/images/logo-dark.png" width={120} height={18} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h6 className="mb-3 fw-semibold">Daftarkan Akunmu</h6>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Nama</label>
                                    <input name="name" id="name" type="text" className="form-control" placeholder="Isilah Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input name="email" id="email" type="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                    <input type="password" className="form-control" id="loginpass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                            
                                <button className="btn btn-primary w-100" type="submit">Daftar</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted small me-2">Sudah punya akun? </span> <Link href="/login" className="text-dark fw-semibold small">Masuk</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}