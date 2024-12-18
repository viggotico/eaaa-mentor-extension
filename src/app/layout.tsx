'use client'

import "./globals.css";
import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import styles from "./layout.module.css";

import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

import { FooterSection } from "@/components/sections/FooterSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { NavBar } from "@/components/NavBar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default ({ children }: RootLayoutProps) => {
  const toggleMenu = (e: any) => {
    e?.preventDefault();
    const nav = document.getElementById('nav');
    nav?.style.setProperty('display', nav.style.display === 'flex' ? 'none' : 'flex');
  }
  
  const { loggedIn, currentUser, setLoggedIn, setCurrentUser } = useSession();

  useEffect(() => {
    document.title = 'Mentorordning - EAAA';
    console.log('attempting to auto login...', !!ApiFrontend.currentUser);
    // const validSession = localStorage.getItem('session');
    if (ApiFrontend.currentUser) return;
    ApiFrontend.auth.loginAuto()
      .then(user => {
        setLoggedIn(!!user);
        setCurrentUser(user ?? null);
      });
  }, []);
  
  return (
    <html lang="dk">
      <body>
        <div className={styles.layout}>
          <header className={styles.mainHeader}>
            <div className={styles.header}>
              <Link id='header-logo' href='/' className={styles.headerLogoLink}>
                <img src="/logo-da-small.svg" alt="Erhvervsakademi Aarhus Logo" />
              </Link>
              <div className={styles.headerSticky}>
                <div className={styles.headerLeft}>
                  <Link href='#' className={styles.headerIcon}>
                    <SearchIcon />
                  </Link>
                </div>
                <NavBar />
                <div className={styles.headerRight} onClick={toggleMenu}>
                  <div className={styles.headerIcon}>
                    <MenuIcon />
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
        <FooterSection />
        {/* {
          loggedIn ?
            <div className='auth-status'>
              Logged in as {currentUser?.name} ({currentUser?.type})
            </div> : <></>
        } */}
        <LoadingScreen />
      </body>
    </html>
  );
}
