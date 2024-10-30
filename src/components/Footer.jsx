import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faArtstation, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a href="https://www.instagram.com/erwin_hidda?igsh=MTV1YWVib3VpbWc2MQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.artstation.com/erwinhidalgo9" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faArtstation} />
        </a>
        <a href="https://www.linkedin.com/in/danise-erwin-hidalgo-8bb8492a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="mailto:danise.erwin.hidalgo@gmail.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
