import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PageTransition from "./components/ui/PageTransition";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import BlogList from "./components/sections/BlogList";
import BlogPost from "./components/sections/BlogPost";
import SEO from "./components/ui/SEO";

function Home() {
  return (
    <PageTransition>
      <SEO />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </PageTransition>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<PageTransition><BlogList /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
      </Routes>
    </Layout>
  );
}
