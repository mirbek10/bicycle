import { motion } from "framer-motion";
import { Heart } from "lucide-react"; 
import styles from "./EmptyFavorites.module.scss";
import { useNavigate } from "react-router-dom";

export const EmptyFavorites = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/catalog");
    };
  return (
    <motion.div
      className={styles.emptyFavorites}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Heart onClick={handleNavigate} className={styles.heartIcon} />
      </motion.div>
      <h3 className={styles.title}>Список избранного пуст</h3>
      <p className={styles.text}>В списке пока нет ни одного избранного товара</p>
      <p className={styles.hint}>Нажимайте на ♡ чтобы добавлять товары в избранное</p>
    </motion.div>
  );
};