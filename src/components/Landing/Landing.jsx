import { Link } from "react-router-dom";

import styles from './Landing.module.css';

const Landing = () => {
  return (
    <main className={styles.landingMain}>
      <h1 className={styles.landingH1}>Welcome to Flask</h1>
      <h2 className={styles.landingH2}>A laboratory inventory management system</h2>
      <p className={styles.slogan}>Science: Just writing stuff down.</p>
      <h3>
        Please
        <Link to="/signin"><span className={styles.link}> Sign In</span></Link> or
        <Link to="/signup"><span className={styles.link}> Sign Up </span></Link>
        to use lab facilities.
      </h3>
      <div className={styles.flaskContainer}>
        <div className={styles.flask}><div className={styles.flaskBody}><span className={styles.wavy}>_____</span></div></div>
        <div className={styles.flaskHead}></div>
      </div>
    </main>
  );
};

export default Landing;
