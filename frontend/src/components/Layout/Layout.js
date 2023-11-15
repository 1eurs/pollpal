import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children, isAuthenticated, user }) => {
  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
