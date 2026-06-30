import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "../ui/CustomCursor";
import ScrollProgress from "../ui/ScrollProgress";

export default function Layout({ children }) {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
