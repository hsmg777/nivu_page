import NavbarPages from "../components/NavbarPages";
import PricingServices from "../components/PricingServices";
import ScrollHint from "../components/ScrollHint";

export default function PricingServicesPage() {
  return (
    <>
    <ScrollHint
          pageId="main-v3"             
          showOncePerSession={false}   
          hideAfterMs={20000}
          startListenDelayMs={1000}
        />
      <NavbarPages />
      <PricingServices />
    </>
  );
}
