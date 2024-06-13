'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import {FIREBASE_AUTH} from "../firebaseConfig";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Initialize router
    const auth = FIREBASE_AUTH
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/'); // Redirect to home page or another protected page
        } catch (error) {
            console.error("Error logging in: ", error);
            alert("Error logging in: " + error.message);
        }
    };
    return(
        <section className="bg-home d-flex align-items-center" style={{backgroundImage:"url('/images/bg3.jpeg')", backgroundPosition:'center'}}>
            <div className="bg-overlay bg-linear-gradient-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={handleLogin}>
                                <Link href="/"><Image src='/images/logo-dark.png' width={120} height={18} className="mb-4 d-block mx-auto" alt=""/></Link>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input name="email" id="email" type="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                    <input type="password" className="form-control" id="loginpass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                            
                                <div className="d-flex justify-content-center">
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <span className="forgot-pass text-muted small mb-0"><Link href="/reset-password" className="text-muted">Lupa password ?</Link></span>
                                        </div>
                                    </div>
                                </div>
                
                                <button className="btn btn-primary w-100" type="submit">Masuk</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2 small">Tidak punya akun?</span> <Link href="/signup" className="text-dark fw-semibold small">Daftar</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}