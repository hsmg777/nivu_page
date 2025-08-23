import NavbarPages from "../components/NavbarPages";
import CardsAbout from "../components/CardsAbout";
import TechAbout from "../components/TechAbout";
import CaptionAbout from "../components/CaptionAbout";
import Footer from "../components/Footer";
import ScrollHint from "../components/ScrollHint";


export default function About() {
  return (
    <>
    <ScrollHint
          pageId="main-v3"             
          showOncePerSession={false}   
          hideAfterMs={20000}
          startListenDelayMs={1000}
        />
      <NavbarPages />
      <CardsAbout />
      <TechAbout />
      <CaptionAbout />
      <Footer />
    </>
  );
}
