import Link from "next/link";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from "./NavBar.module.css";

export const NavBar = () => {
  return <div id='nav' className={styles.navWrapper}>
    <nav>
      <ul>
        <li>
          <span><Link href='/'><strong>Hjem</strong></Link><ArrowForwardIosIcon /></span>
          <div>
            {
              ApiFrontend.currentUser ?
                <>
                  <span><Link href='/#overview'><p>Overblik</p></Link><ArrowForwardIosIcon /></span>
                  <span><Link href='/#bookings'><p>Bookinger</p></Link><ArrowForwardIosIcon /></span>
                  <span><Link href='/#chat'><p>Chat</p></Link><ArrowForwardIosIcon /></span>
                </> :
                <>
                  <span><Link href='/#intro'><p>Intro</p></Link><ArrowForwardIosIcon /></span>
                  <span><Link href='/#about-us'><p>Om os</p></Link><ArrowForwardIosIcon /></span>
                </>
            }
          </div>
        </li>
        <li>
          <span><Link href='/about-mentorship'><strong>Om mentorordningen</strong></Link><ArrowForwardIosIcon /></span>
          <div>
            <span><Link href='/about-mentorship#message'><p>Budskab</p></Link><ArrowForwardIosIcon /></span>
            {
              ApiFrontend.currentUser ?
                <>
                  <span><Link href='/#about-us'><p>Om os</p></Link><ArrowForwardIosIcon /></span>
                </> : <></>
            }
          </div>
        </li>
        <li>
          <span><strong>Mentee</strong><ArrowForwardIosIcon /></span>
          <div>
            <span><Link href='/mentee#support'><p>Vejledning</p></Link><ArrowForwardIosIcon /></span>
            <span><Link href='/mentor#find-mentor'><p>Find en mentor</p></Link><ArrowForwardIosIcon /></span>
          </div>
        </li>
        <li>
          <span><strong>Mentor</strong></span>
          <div>
            <span><Link href='/mentor#find-mentor'><p>Find en mentor</p></Link><ArrowForwardIosIcon /></span>
          </div>
        </li>
        <li>
          <span>
            <Link href={ApiFrontend.currentUser ? '/logout' : '/login'}>
                <strong>{ApiFrontend.currentUser ? 'Log ud' : 'Login'}</strong>
            </Link>
            <ArrowForwardIosIcon />
          </span>
        </li>
      </ul>
    </nav>
  </div>;
}
