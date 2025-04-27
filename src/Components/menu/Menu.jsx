import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

import img1 from '../../assets/image/MirbekImg/menu1img.png';
import img2 from '../../assets/image/MirbekImg/menu2img.png';
import img3 from '../../assets/image/MirbekImg/menu3img.png';
import img4 from '../../assets/image/MirbekImg/menu4img.png';
import img5 from '../../assets/image/MirbekImg/menu5img.png';
import img6 from '../../assets/image/MirbekImg/menu6img.png';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <h1>КАТАЛОГ</h1>
      <ul>
        {/* Велосипеды */}
        <Link to="/category/Велосипеды" className={styles.link}>
          <div className={`${styles.bike} ${styles.black}`}>
            <li>Велосипеды</li>
            <img src={img1} alt="Велосипеды" />
          </div>
        </Link>

        <div className={styles.downblock}>
          {/* Trade-in */}
          <Link to="/category/Trade-in" className={styles.link}>
            <div className={`${styles.tradein} ${styles.black}`}>
              <li>Trade-in</li>
              <img src={img2} alt="Trade-in" />
            </div>
          </Link>

          <div className={styles.downleftblock}>
            <div className={styles.miniblock1}>
              {/* Запчасти */}
              <Link to="/category/Запчасти" className={styles.link}>
                <div className={`${styles.hellper} ${styles.black}`}>
                  <li>Запчасти</li>
                  <img src={img3} alt="Запчасти" />
                </div>
              </Link>

              {/* Аксессуары */}
              <Link to="/category/Аксессуары" className={styles.link}>
                <div className={`${styles.аксесуар} ${styles.black}`}>
                  <li>Аксессуары</li>
                  <img src={img4} alt="Аксессуары" />
                </div>
              </Link>
            </div>

            <div className={styles.miniblock2}>
              {/* Экипировка */}
              <Link to="/category/Экипировка" className={styles.link}>
                <div className={`${styles.экипировка} ${styles.black}`}>
                  <li>Экипировка</li>
                  <img src={img5} alt="Экипировка" />
                </div>
              </Link>

              {/* Велостанки */}
              <Link to="/category/Велостанки" className={styles.link}>
                <div className={`${styles.велостанки} ${styles.black}`}>
                  <li>Велостанки</li>
                  <img src={img6} alt="Велостанки" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Menu;
