import React from 'react';
import "keen-slider/styles.css";
import { useKeenSlider } from 'keen-slider/react';

const technologies = [
  { name: 'React', logo: '/images/react.png' },
  { name: 'Laravel', logo: '/images/laravel.png' },
  { name: 'Tailwind CSS', logo: '/images/tailwind.png' },
  { name: 'Node.js', logo: '/images/node.png' },
  { name: 'Docker', logo: '/images/docker.png' },
  { name: 'OpenAI API', logo: '/images/openai.png' },
  { name: 'Python', logo: '/images/python.png' },
  { name: 'C#', logo: '/images/csharp.png' },
  { name: 'Java', logo: '/images/java.png' },
];

export default function TechCarousel() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 5, spacing: 20 },
      },
    },
  });

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-center text-[#000] mb-6">TECNOLOGÍAS QUE MANEJAMOS</h2>

      <div className="bg-[#fcf9f9] p-6 rounded-lg shadow-md">
        <div ref={sliderRef} className="keen-slider">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-white rounded-xl shadow flex flex-col items-center justify-center p-4"
            >
              <img src={tech.logo} alt={tech.name} className="w-16 h-16 object-contain mb-2" />
              <span className="text-[#002b62] font-medium text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
