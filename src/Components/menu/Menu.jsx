import React from 'react';
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
                <div className={`${styles.bike} ${styles.black}`}>
                    <li>Велосипеды</li>
                    <img src={img1} alt="" />
                </div>
                <div className={styles.downblock}>
                    <div className={`${styles.tradein} ${styles.black}`}>
                        <li>Trade-in</li>
                        <img src={img2} alt="" />
                    </div>
                    <div className={styles.downleftblock}>

                        <div className={styles.miniblock1}>
                            <div className={`${styles.hellper} ${styles.black}`}>
                                <li>Запчасти</li>
                                <img src={img3} alt="" />
                            </div>
                            <div className={`${styles.аксесуар} ${styles.black}`}>
                                <img src={img4} alt="" />
                                <li>Аксессуары</li>
                            </div>
                        </div>
                        <div className={styles.miniblock2}>
                            <div className={`${styles.экипировка} ${styles.black}`}>
                                <li>Экипировка</li>
                                <img src={img5} alt="" />
                            </div>
                            <div className={`${styles.велостанки} ${styles.black}`}>
                                <li>Велостанки</li>
                                <img src={img6} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default Menu;