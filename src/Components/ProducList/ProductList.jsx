import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CatalogCard from '../Card/catalogCard/CatalogCard';
import './ProductList.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function ProductList({ data }) {
  return (
    <motion.div
      className="catalog-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <AnimatePresence>
        {data?.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <CatalogCard el={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProductList;