import "./globals.css";
import styles from "./layout.module.css";

import type { Metadata } from "next";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

export const metadata: Metadata = {
  title: "Mentorordning",
  description: "EAAA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <header className={styles.mainHeader}>
            <div className={styles.header}>
              <Link href='/' className={styles.headerLogoLink}>
                <img src="/logo-da-small.svg" alt="Erhvervsakademi Aarhus Logo" />
              </Link>
              <div className={styles.headerSticky}>
                <div className={styles.headerLeft}>
                  <Link href='#' className={styles.headerIcon}>
                    <SearchIcon />
                  </Link>
                </div>
                <div className={styles.headerRight}>
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
      </body>
    </html>
  );
}
