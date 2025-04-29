'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// --- Types ---
type Filter = 'Adoptantes';

interface CommunityMember {
  name: string;
  experience: string;
  image: string; // Path relative to the public folder
}

// --- Predefined Data (for randomization) ---
const names = [
  'Dr. Jenny Wilson', 'Dr. Jane Cooper', 'Dr. Jacob Jones', 'Dr. Guy Hawkins',
  'Esther Howard', 'Cameron Williamson', 'Brooklyn Simmons', 'Wade Warren',
  'Robert Fox', 'Kristin Watson'
];

const experiences = [
  '20+ Years Experience', '15 Years Experience', '10 Years Experience', '5 Years Experience',
  'New Adopter', 'Volunteer', 'Shelter Manager', 'Foster Parent', 'Vet Tech', 'Animal Behaviorist'
];

const filters: Filter[] = ['Adoptantes'];

// --- Helper Functions ---
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function CommunitySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Adoptantes');
  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch image filenames from the API route
  // Function to fetch image filenames from the API route
  const fetchImages = async (filter: Filter): Promise<string[]> => {
    setIsLoading(true);
    setError(null);
  
    let apiUrl: string;
    // Map each filter to its corresponding API endpoint
    switch(filter) {
      case 'Adoptantes':
        apiUrl = '/api/getAdoptantes';
        break;
      
      default:
        throw new Error('Invalid filter');
    }
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: string[] = await response.json();
      // Filtrar archivos no-imagen si es necesario
      return data.filter(file => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file));
    } catch (err) {
      console.error("Error fetching images:", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      return []; // Return empty array on error
    } finally {
      setIsLoading(false);
    }
  };
  


  // Effect to load members when the active filter changes
  useEffect(() => {
    const loadMembers = async () => {
      const imageFiles = await fetchImages(activeFilter);

      if (!imageFiles || imageFiles.length === 0) {
        setCommunityMembers([]); // Clear members if no images
        if (!error) {
          setError(`No images found for ${activeFilter}.`);
        }
        return;
      }

      const members: CommunityMember[] = [];
      const usedNames = new Set<string>();
      const usedExperiences = new Set<string>();
      const usedImageIndices = new Set<number>();

      // Generate up to 4 unique members
      while (members.length < 4 && members.length < imageFiles.length) {
        let randomName: string;
        let randomExperience: string;
        let randomImageIndex: number;
        let imagePath: string = '';

        // Get unique image
        do {
          randomImageIndex = Math.floor(Math.random() * imageFiles.length);
        } while (usedImageIndices.has(randomImageIndex));
        usedImageIndices.add(randomImageIndex);
        
        // Use the correct folder based on the active filter
        const imageFolder = activeFilter === 'Adoptantes' ? 'Adoptante' : 
                           activeFilter === 'Gatos' ? 'Gato' :
                           activeFilter === 'Perros' ? 'Perro' : 'Refugio';
                           
        imagePath = `/${imageFolder}/${imageFiles[randomImageIndex]}`;

        // Get unique name
        let nameAttempts = 0;
        do {
          randomName = getRandomItem(names);
          nameAttempts++;
        } while (usedNames.has(randomName) && nameAttempts < names.length * 2);
        usedNames.add(randomName);

        // Get unique experience
        let expAttempts = 0;
        do {
          randomExperience = getRandomItem(experiences);
          expAttempts++;
        } while (usedExperiences.has(randomExperience) && expAttempts < experiences.length * 2);
        usedExperiences.add(randomExperience);

        members.push({
          name: randomName,
          experience: randomExperience,
          image: imagePath,
        });
      }

      setCommunityMembers(members);
    };

    loadMembers();
  }, [activeFilter, error]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto flex flex-col space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Conoce a Nuestra Comunidad
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Aquí podrás conocer a quienes forman parte de esta hermosa comunidad: adoptantes, mascotas esperando un hogar y refugios que cambian vidas.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition duration-200 ${
                activeFilter === filter
                  ? 'bg-[#BF3952] text-white border-[#BF3952] hover:bg-[#a53147]'
                  : 'bg-white text-[#30588C] border-[#30588C] hover:bg-[#eef3f8] hover:text-[#254559]'
              }`}
              disabled={isLoading}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Community Grid */}
        {isLoading && <div className="text-center text-gray-600">Cargando...</div>}
        {error && <div className="text-center text-red-600">Error: {error}</div>}
        {!isLoading && !error && communityMembers.length === 0 && (
          <div className="text-center text-gray-600">No se encontraron miembros para mostrar en esta categoría.</div>
        )}
        {!isLoading && !error && communityMembers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {communityMembers.map((member, index) => (
              <div
                key={`${activeFilter}-${index}-${member.name}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 group transition duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`Imagen de ${member.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 4}
                  />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">{member.name}</h4>
                    <div className="flex items-center text-xs text-gray-500 flex-wrap">
                      <Briefcase className="w-3 h-3 mr-1 flex-shrink-0" />
                      {member.experience}
                    </div>
                  </div>
                  <button className="bg-[#30588C] hover:bg-[#254559] rounded-full p-2 transition duration-300 flex-shrink-0 ml-2">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}