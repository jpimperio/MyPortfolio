import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "../ui/CustomCursor";
import CursorTrail from "../ui/CursorTrail";
import ScrollProgress from "../ui/ScrollProgress";
import GameOverlay from "../ui/GameOverlay";
import GameHUD from "../ui/GameHUD";

export default function Layout({ children }) {
  return (
    <>
      <GameOverlay />
      <GameHUD />
      <ScrollProgress />
      <CursorTrail />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
