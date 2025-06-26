import React, { useEffect } from "react";
import "../css/Hero.css";

export default function Hero() {
  useEffect(() => {
    const card = document.querySelector(".example-card");

    const handleParallax = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    };

    const resetParallax = () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    };

    const wrapper = card.parentElement;
    wrapper.style.perspective = "1000px";
    wrapper.addEventListener("mousemove", handleParallax);
    wrapper.addEventListener("mouseleave", resetParallax);

    return () => {
      wrapper.removeEventListener("mousemove", handleParallax);
      wrapper.removeEventListener("mouseleave", resetParallax);
    };
  }, []);


  return (
    <section className="hero-section min-h-screen pt-32" id="inicio">
      <div className="hero-content">
        <h1 className="hero-title">Crea tu<br />próximo sitio web</h1>
        <a
          href="https://wa.me/593999567465?text=Hola%21%20me%20gustaría%20agendar%20una%20demo"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-button inline-block"
        >
          🖥️ Agenda una demostración
        </a>
      </div>


      <div className="hero-examples">
        <div className="example-container">
          <div className="card-one">
            <img src="/images/example_one.png" className="example-card" />
          </div>
        </div>
      </div>
    </section>
  );
}
