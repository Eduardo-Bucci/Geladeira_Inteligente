"use client";

import { useState } from "react";
import Image from "next/image"; 

const IMAGENS = [
  { src: "/EcoFridge.jpeg", alt: "Descrição 1" },
  { src: "/imagem.jfif", alt: "Descrição 2" },
  { src: "/imagem1.jfif", alt: "Descrição 3" },
];

export default function Carrossel() {
  const [slideAtual, setSlideAtual] = useState(0);

  const proximoSlide = () => {
    setSlideAtual((prev) => (prev === IMAGENS.length - 1 ? 0 : prev + 1));
  };

  const slideAnterior = () => {
    setSlideAtual((prev) => (prev === 0 ? IMAGENS.length - 1 : prev - 1));
  };

  return (
    <div className="bg-emerald-100 pt-2 relative max-w-md h-full max-h-md w-full mx-auto overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-101 transition">
      
      <div 
        className="flex transition-transform duration-500 ease-out "
        style={{ transform: `translateX(-${slideAtual * 100}%)` }}
      >
        {IMAGENS.map((img, index) => (
          <div key={index} className="w-full shrink-0 relative h-64">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={index === 0} 
            />
          </div>
        ))}
      </div>
            <p className="text-center text-gray-600 mt-4 mb-4">
              Descubra como a EcoFridge pode transformar sua experiência de cozinha!
            </p>

      
      <button onClick={slideAnterior} className="absolute left-2 top-1/2 -translate-y-4/5 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
        &#10094;
      </button>
      <button onClick={proximoSlide} className="absolute right-2 top-1/2 -translate-y-4/5 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
        &#10095;
      </button>
    </div>
  );
}
