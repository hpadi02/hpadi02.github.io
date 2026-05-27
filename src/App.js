import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="footer__inner">
          <a href="#" className="footer__logo">
            HP<span className="footer__logo-dot">.</span>
          </a>
          <p className="footer__text">
            Built with React. Deployed on GitHub Pages.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
