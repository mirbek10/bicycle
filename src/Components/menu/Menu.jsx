import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.scss';

import img1 from '../../assets/image/MirbekImg/menu1img.png';
import img2 from '../../assets/image/MirbekImg/menu2img.png';
import img3 from '../../assets/image/MirbekImg/menu3img.png';
import img4 from '../../assets/image/MirbekImg/menu4img.png';
import img5 from '../../assets/image/MirbekImg/menu5img.png';
import img6 from '../../assets/image/MirbekImg/menu6img.png';

const Menu = () => {
  const nav = useNavigate()
  const goToCatalog = ()=>{
    nav('/catalog')
  }
  return (
    <div className={styles.menu}>
      <h1>КАТАЛОГ</h1>
      <ul>
        {/* Велосипеды */}
          <div className={`${styles.bike} ${styles.black}`}
          onClick={goToCatalog}
          >
            <li>Велосипеды</li>
            <img src={img1} alt="Велосипеды" />
          </div>
        

        <div className={styles.downblock}>
          {/* Trade-in */}
            <div className={`${styles.tradein} ${styles.black}`}
            onClick={goToCatalog}
            >
              <li>Trade-in</li>
              <img src={img2} alt="Trade-in" />
            </div>
          

          <div className={styles.downleftblock}>
            <div className={styles.miniblock1}>
              {/* Запчасти */}
                <div className={`${styles.hellper} ${styles.black}`}
                onClick={goToCatalog}
                >
                  <li>Запчасти</li>
                  <img src={img3} alt="Запчасти" />
                </div>
              

              {/* Аксессуары */}
                <div className={`${styles.аксесуар} ${styles.black}`}
                onClick={goToCatalog}
                >
                  <img src={img4} alt="Аксессуары" />
                  <li>Аксессуары</li>
                </div>
              
            </div>

            <div className={styles.miniblock2}>
              {/* Экипировка */}
                <div className={`${styles.экипировка} ${styles.black}`}
                onClick={goToCatalog}
                >
                  <li>Экипировка</li>
                  <img src={img5} alt="Экипировка" />
                </div>
              

              {/* Велостанки */}
                <div className={`${styles.велостанки} ${styles.black}`}
                onClick={goToCatalog}
                >
                  <li>Велостанки</li>
                  <img src={img6} alt="Велостанки" />
                </div>
              
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Menu;
