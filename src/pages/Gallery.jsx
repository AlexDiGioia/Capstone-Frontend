import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { fetchWithAuth } from '../utils/api';
import config from '../config';
import styles from '../styles/Gallery.module.scss';

function Gallery() {
  const [disegni, setDisegni] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisegni = async () => {
      try {
        const data = await fetchWithAuth(`${config.apiBaseUrl}/disegni`);
        setDisegni(data);
      } catch (err) {
        setError('Errore nel recupero dei disegni. Per favore riprova.');
        console.error(err);
      }
    };

    fetchDisegni();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className={styles.galleryContainer}>
      {error && <p>{error}</p>}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {Array.isArray(disegni) && disegni.map((disegno) => (
          <div key={disegno.idDisegno} className={styles.galleryItem}>
            <img src={disegno.imageUrl} alt={disegno.title} className={styles.galleryImage} />
            <div className={styles.hoverOverlay}>
              <span>{disegno.title}</span>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default Gallery;