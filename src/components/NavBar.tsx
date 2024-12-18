'use client'

import Link from "next/link";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from "./NavBar.module.css";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavLink = ({ children, href }: NavLinkProps) => {
  const onClick = (e: any) => {
    // e?.preventDefault();
    const navWrapper = document?.getElementById('nav');
    if (!navWrapper) return;
    setTimeout(() => {
      navWrapper.style.display = 'none';
    }, 700);
  }
  return <Link href={href} onClick={onClick}>{children}</Link>;
}

export const NavBar = () => {
  return <div id='nav' className={styles.navWrapper}>
    <nav>
      <ul>
        <li>
          <span><NavLink href='/'><strong>Hjem</strong></NavLink><ArrowForwardIosIcon /></span>
          <div>
            {
              ApiFrontend.currentUser ?
                <>
                  <span><NavLink href='/'><p>Overblik</p></NavLink><ArrowForwardIosIcon /></span>
                  <span><NavLink href='/'><p>Bookinger</p></NavLink><ArrowForwardIosIcon /></span>
                  {/* <span><NavLink href='/#chat'><p>Chat</p></NavLink><ArrowForwardIosIcon /></span> */}
                </> :
                <>
                  <span><NavLink href='/'><p>Intro</p></NavLink><ArrowForwardIosIcon /></span>
                  <span><NavLink href='/'><p>Om os</p></NavLink><ArrowForwardIosIcon /></span>
                </>
            }
          </div>
        </li>
        <li>
          <span><NavLink href='/about-mentorship'><strong>Om mentorordningen</strong></NavLink><ArrowForwardIosIcon /></span>
          <div>
            <span><NavLink href='/about-mentorship#message'><p>Budskab</p></NavLink><ArrowForwardIosIcon /></span>
            {
              ApiFrontend.currentUser ?
                <>
                  <span><NavLink href='/#about-us'><p>Om os</p></NavLink><ArrowForwardIosIcon /></span>
                </> : <></>
            }
          </div>
        </li>
        <li>
          <span><strong>Mentee</strong><ArrowForwardIosIcon /></span>
          <div>
            <span><NavLink href='/mentee#support'><p>Vejledning</p></NavLink><ArrowForwardIosIcon /></span>
            <span><NavLink href='/mentor#find-mentor'><p>Find en mentor</p></NavLink><ArrowForwardIosIcon /></span>
          </div>
        </li>
        <li>
          <span><strong>Mentor</strong></span>
          <div>
            <span><NavLink href='/mentor#find-mentor'><p>Find en mentor</p></NavLink><ArrowForwardIosIcon /></span>
          </div>
        </li>
        <li>
          <span>
            <NavLink href={ApiFrontend.currentUser ? '/logout' : '/login'}>
                <strong>{ApiFrontend.currentUser ? 'Log ud' : 'Login'}</strong>
            </NavLink>
            <ArrowForwardIosIcon />
          </span>
        </li>
      </ul>
    </nav>
  </div>;
}
