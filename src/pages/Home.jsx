import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/HomePage.module.scss';

const Home = () => {
  return (
    <Container className={styles.homeContainer}>
      <div className={styles.imageSection}>
        <img src="/src/img/akuma red.png" alt="Akuma" className={styles.heroImage} />
      </div>
      <div className={styles.textSection}>
        <h1 className={styles.artistName}>DANISE ERWIN HIDALGO</h1>
        <h2 className={styles.subtitle}>2D COVER ARTIST</h2>
      </div>
      <div className={styles.sideText}>HOME</div>
    </Container>
  );
};

export default Home;