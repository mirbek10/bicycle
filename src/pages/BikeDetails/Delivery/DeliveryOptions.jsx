import styles from './Delivery.module.scss';
import image from '../../../assets/image/MirbekImg/deliveryImage.png'

const Delivery = () => {
  return (
    <section className={styles.delivery}>
      <h1 className={styles.title}>ДОСТАВКА</h1>
      <div className={styles.image} />
      <div className={styles.content}>
        <p className={styles.text}>
          Для удобства покупателей действует несколько способов доставки товаров
        </p>
        <ul className={styles.list}>
          <li>Доставка по Москве, в пределах МКАД</li>
          <li>Доставка по Московской Области</li>
          <li>Доставка в другие регионы России</li>
        </ul>
        <div className={styles.note}>
          Любой из способов доступен при оформлении заказа через сайт или у операторов
        </div>
        <p className={styles.subtext}>
          Велосипеды и вело-станки доставляются в собранном и настроенном виде.
        </p>
        <p className={styles.subtext}>
          На любые вопросы по правилам и стоимости доставки ответят оператор: <span className={styles.phone}>+7 (495) 055-75-86</span>
        </p>
      </div>
    </section>
  );
};

export default Delivery;
