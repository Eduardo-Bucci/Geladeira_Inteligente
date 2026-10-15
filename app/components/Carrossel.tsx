"use client";

import { useState } from "react";
import Image from "next/image"; 

const IMAGENS = [
  { src: "/imagem.jfif", alt: "Descrição 1" },
  { src: "/images.jfif", alt: "Descrição 2" },
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
    <div className="relative w-full max-w-sm h-full max-h-sm mx-auto overflow-hidden rounded-lg border border-green-700 shadow-lg">
      
      <div 
        className="flex transition-transform duration-500 ease-out"
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

      
      <button onClick={slideAnterior} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black-100">
        &#10094;
      </button>
      <button onClick={proximoSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black-100">
        &#10095;
      </button>
    </div>
  );
}
