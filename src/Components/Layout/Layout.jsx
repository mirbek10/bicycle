import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../utils/ScrollToTop";
import "./Layout.scss"; 

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="layout-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="page-content"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
