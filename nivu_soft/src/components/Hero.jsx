import React, { useEffect } from "react";
import "../css/Hero.css";

export default function Hero() {
  useEffect(() => {
  const cards = document.querySelectorAll(".example-card");

  const handleParallax = (e) => {
    cards.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

      img.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    });
  };

  const resetParallax = () => {
    cards.forEach((img) => {
      img.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    });
  };

  cards.forEach((img) => {
    const wrapper = img.parentElement;
    wrapper.style.perspective = "1000px";
    wrapper.addEventListener("mousemove", handleParallax);
    wrapper.addEventListener("mouseleave", resetParallax);
  });

  return () => {
    cards.forEach((img) => {
      const wrapper = img.parentElement;
      wrapper.removeEventListener("mousemove", handleParallax);
      wrapper.removeEventListener("mouseleave", resetParallax);
    });
  };
}, []);


  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Crea tu<br />próximo sitio web</h1>
        <button className="hero-button">🖥️ Agenda tu demo</button>
      </div>

      <div className="hero-examples">
        <div className="example-container">
          <div className="card-one">
            <img src="/images/example_one.png" className="example-card" />
          </div>
          <div className="card-two">
            <img src="/images/example_two.png" className="example-card" />
          </div>
        </div>
      </div>
    </section>
  );
}
