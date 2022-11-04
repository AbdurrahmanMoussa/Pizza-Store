import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, menuOpen, setMenuOpen }) => {
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
