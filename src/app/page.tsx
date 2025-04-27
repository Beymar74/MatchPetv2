"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const sections = [
  {
    id: "hero",
    title: "¡Bienvenido a MatchPet!",
    subtitle: "¿Listo para cambiar una vida... o dos? ¡Únete hoy!",
    description: "Donde cada historia comienza con un encuentro especial. Explora, conecta y encuentra el compañero perfecto para ti.",
    cta1: "Más Información",
    cta2: "Iniciar Sesión",
    image: "https://picsum.photos/id/237/400/300",
    style: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
  },
  {
    id: "about-us",
    title: "Sobre Nosotros",
    content: [
      "En MatchPet, creemos que cada mascota merece un hogar lleno de amor y que cada persona merece encontrar a su compañero perfecto.",
      "Nacimos con la misión de conectar corazones: unir a mascotas rescatadas con adoptantes responsables de forma fácil, segura y llena de esperanza.",
      "Trabajamos junto a refugios y asociaciones, usando tecnología que mejora las coincidencias y agilizamos el proceso de adopción.",
    ],
    style: "bg-secondary",
  },
  {
    id: "adoption-process",
    title: "Conoce el Proceso de Adopción que Manejamos",
    description: "En MatchPet, buscamos que cada adopción sea especial, responsable y segura. Por eso, seguimos un proceso sencillo pero muy cuidado:",
    steps: [
      { title: "Explora y elige", description: "Encuentra a tu compañero ideal entre las mascotas disponibles." },
      { title: "Envía tu solicitud", description: "Una vez que encuentres a tu match, completa una breve solicitud de adopción." },
      { title: "Evaluación y contacto", description: "El refugio revisará tu solicitud y se pondrá en contacto para coordinar una entrevista." },
      { title: "Adopción y nuevos comienzos", description: "Si todo sale bien, ¡la adopción se concreta y llevas a casa a tu nuevo miembro de la familia!" },
    ],
    style: "bg-muted",
  },
  {
    id: "adoptable-pets",
    title: "Nuestras Mascotas Adoptables",
    pets: [
      { name: "Pelusa", description: "Juguetón, Joven", image: "https://picsum.photos/id/238/400/300" },
      { name: "Kuro", description: "Tranquilo, Macho", image: "https://picsum.photos/id/181/400/300" },
    ],
    style: "bg-background",
  },
  {
    id: "community",
    title: "Conoce a Nuestra Comunidad",
    members: [
      { name: "Dr. Jenny Wilson", description: "+20 años de experiencia", image: "https://picsum.photos/id/1005/400/300" },
      { name: "Dr. Jane Cooper", description: "+20 años de experiencia", image: "https://picsum.photos/id/1074/400/300" },
    ],
    style: "bg-secondary",
  },
  {
    id: "stats",
    title: "Cifras que llenan el corazón",
    stats: [
      { value: "100+", label: "Adopciones realizadas" },
      { value: "50+", label: "Mascotas disponibles" },
      { value: "10+", label: "Refugios registrados" },
    ],
    style: "bg-muted",
  },
  {
    id: "explore",
    title: "Explora, conecta y sé parte de esta gran familia que transforma corazones",
    cta: "Comenzar",
    style: "bg-background",
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "PageDown" || event.key === "ArrowDown") {
        setCurrentPage((prev) => Math.min(prev + 1, sections.length - 1));
      } else if (event.key === "PageUp" || event.key === "ArrowUp") {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-background overflow-hidden">
      <div className="page-container" style={{ transform: `translateY(-${currentPage * 100}%)`, transition: "transform 0.5s ease-in-out" }}>
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className={`page min-h-screen flex items-center justify-center ${section.style} py-24`}>
            <ContentSection section={section} />
          </section>
        ))}
      </div>
    </main>
  );
}

function ContentSection({ section }: { section: (typeof sections)[number] }) {
  switch (section.id) {
    case "hero":
      return <HeroSection section={section} />;
    case "about-us":
      return <AboutUsSection section={section} />;
    case "adoption-process":
      return <AdoptionProcessSection section={section} />;
    case "adoptable-pets":
      return <AdoptablePetsSection section={section} />;
    case "community":
      return <CommunitySection section={section} />;
    case "stats":
      return <StatsSection section={section} />;
    case "explore":
      return <ExploreSection section={section} />;
    default:
      return <div className="text-2xl">Section Not Found</div>;
  }
}

function HeroSection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="container mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-center">
      <div className="text-container mr-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
          {section.title}
        </h1>
        <h2 className="text-2xl sm:text-3xl mb-6">{section.subtitle}</h2>
        <p className="text-lg sm:text-xl mb-8 text-gray-300">{section.description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full">
            {section.cta1}
          </Button>
          <Button className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full">
            {section.cta2}
          </Button>
        </div>
      </div>

      <div className="image-container rounded-lg shadow-md">
        <Image
          src={section.image}
          width={400}
          height={300}
          alt="Mascota"
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

function AboutUsSection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-semibold mb-8">{section.title}</h2>
      {section.content?.map((paragraph, index) => (
        <p key={index} className="text-gray-700 text-lg mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function AdoptionProcessSection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-12">{section.title}</h2>
      {section.description && (
        <p className="text-gray-700 text-lg text-center mb-8">{section.description}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {section.steps?.map((step, index) => (
          <div key={index} className="text-center p-6 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdoptablePetsSection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-12">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {section.pets?.map((pet, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <Image
              src={pet.image}
              width={400}
              height={300}
              alt={pet.name}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
            <p className="text-gray-600 mb-4">{pet.description}</p>
            <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full">
              Adoptar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunitySection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-12">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {section.members?.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <Image
              src={member.image}
              width={400}
              height={300}
              alt={member.name}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-12">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {section.stats?.map((stat, index) => (
          <div key={index} className="bg-pink-100 text-center p-8 rounded-lg shadow-md">
            <h3 className="text-4xl font-bold mb-4">{stat.value}</h3>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreSection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-semibold mb-8">{section.title}</h2>
      <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full">
        {section.cta}
      </Button>
    </div>
  );
}
