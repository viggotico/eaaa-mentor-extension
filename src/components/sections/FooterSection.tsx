import Link from "next/link";
import { ApiFrontend } from "@/services/api/ApiFrontend";
import styles from "./FooterSection.module.css";

export const FooterSection = () => {
  return <footer className='section footer'>
    <div className={styles.column}>
      <Link href='/'><strong>Hjem</strong></Link>
      {
        ApiFrontend.currentUser ?
          <>
            <Link href='/#overview'><p>Overblik</p></Link>
            <Link href='/#bookings'><p>Bookinger</p></Link>
            <Link href='/#chat'><p>Chat</p></Link>
          </> :
          <>
            <Link href='/#intro'><p>Intro</p></Link>
            <Link href='/#about-us'><p>Om os</p></Link>
          </>
      }
    </div>
    <div className={styles.column}>
      <Link href='/about-mentorship'><strong>Om mentorordningen</strong></Link>
      <Link href='/about-mentorship#message'><p>Budskab</p></Link>
      {
        ApiFrontend.currentUser ?
          <>
            <Link href='/#about-us'><p>Om os</p></Link>
          </> : <></>
      }
    </div>
    <div className={styles.column}>
      <strong>Mentee</strong>
      <Link href='/mentee#support'><p>Vejledning</p></Link>
      <Link href='/mentor#find-mentor'><p>Find en mentor</p></Link>
    </div>
    <div className={styles.column}>
      <strong>Mentor</strong>
      <Link href='/mentor#find-mentor'><p>Find en mentor</p></Link>
    </div>
    <div className={styles.column}>
      <Link href={ApiFrontend.currentUser ? '/logout' : '/login'}>
        <strong>{ApiFrontend.currentUser ? 'Log ud' : 'Login'}</strong>
      </Link>
    </div>
  </footer>;
}
