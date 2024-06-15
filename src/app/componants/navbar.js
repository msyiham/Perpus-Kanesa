'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { LuSearch, FiUser, FiSettings, FiLock, FiLogOut } from "../assets/icons/vander";
import { FIREBASE_AUTH } from "../firebaseConfig";
import logout from "../utils/logout";
import { useRouter } from 'next/navigation';

export default function Navbar({ navClass, navLight }) {
  let [isOpen, setMenu] = useState(false);
  let [scroll, setScroll] = useState(false);
  let [search, setSearch] = useState(false);
  let [cartitem, setCartitem] = useState(false);
  let [manu, setManu] = useState('');
  let pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setManu(pathname);

    function scrollHandler() {
      setScroll(window.scrollY > 50);
    }

    if (typeof window !== "undefined") {
      window.addEventListener('scroll', scrollHandler);
      window.scrollTo(0, 0);
    }

    let searchModal = () => { setSearch(false) };
    document.addEventListener('mousedown', searchModal);

    let cartModal = () => { setCartitem(false) };
    document.addEventListener('mousedown', cartModal);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('mousedown', searchModal);
      document.removeEventListener('mousedown', cartModal);
    };
  }, [pathname]);

  useEffect(() => {
    const navigation = document.getElementById("navigation");
    if (navigation) {
      const anchorArray = Array.from(navigation.getElementsByTagName("a"));
      anchorArray.forEach(element => {
        element.addEventListener('click', (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            const submenu = elem.target.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
              submenu.classList.toggle('open');
            }
          }
        });
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setMenu(!isOpen);
  }

  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const currentPath = encodeURIComponent(router.asPath);

  return (
    <header id="topnav" className={`${scroll ? 'nav-sticky' : ''} ${navClass}`}>
      <div className="container">
        {navLight === true ?
          <Link className="logo" href="/">
            <span className="logo-light-mode">
              <Image src='/images/logo-dark.png' width={120} height={18} className="l-dark" alt="" />
              <Image src='/images/logo-light.png' width={120} height={18} className="l-light" alt="" />
            </span>
            <Image src='/images/logo-light.png' width={120} height={18} className="logo-dark-mode" alt="" />
          </Link> :
          <Link className="logo" href="/">
            <span className="logo-light-mode">
              <Image src='/images/logo-dark.png' width={120} height={18} className="l-dark" alt="" />
              <Image src='/images/logo-white.png' width={120} height={18} className="l-light" alt="" />
            </span>
            <Image src='/images/logo-white.png' width={120} height={18} className="logo-dark-mode" alt="" />
          </Link>
        }
        <div className="menu-extras">
          <div className="menu-item">
            <Link href='#' className={`navbar-toggle ${isOpen ? 'open' : ''}`} id="isToggle" onClick={toggleMenu}>
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          </div>
        </div>

        <div id="navigation" className={isOpen ? 'open' : ''}>
          <ul className="navigation-menu nav-right nav-light">
            <li className={manu === "/" ? "active" : ""}><Link href="/" className="sub-menu-item">Beranda</Link></li>
            <li className={manu === "/book" ? "active" : ""}><Link href="/book" className="sub-menu-item">Daftar Buku</Link></li>
            <li className={manu === "/contactus" ? "active" : ""}><Link href="/contactus" className="sub-menu-item">Hubungi Kami</Link></li>
            {user ? (
              <li className={manu === "/logout" ? "active" : ""}><Link href="/#" onClick={logout} className="sub-menu-item">Logout</Link></li>
            ) : (
              <li className={manu === "/login" ? "active" : ""}><Link href={`/login?redirect=${currentPath}`} className="sub-menu-item">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
