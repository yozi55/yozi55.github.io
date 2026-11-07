import { Hero } from "../components/Hero";
import { Projects } from "./Projects";
import { About } from "./About";
import { Interests } from "./Interests";
import { Contact } from "./Contact";
import { Divider } from "../components/Section";

/**
 * 单页首页：Hero → About → Work → Interests → Contact。
 * 各区块均有 data-section-label 供滚动指示器读取。
 */
export function Home() {
  return (
    <div>
      <Hero />
      <Divider />
      <div data-section-label="About">
        <About />
      </div>
      <Divider />
      <div data-section-label="Work">
        <Projects />
      </div>
      <Divider />
      <div data-section-label="Interests">
        <Interests />
      </div>
      <Divider />
      <div data-section-label="Contact">
        <Contact />
      </div>
    </div>
  );
}
