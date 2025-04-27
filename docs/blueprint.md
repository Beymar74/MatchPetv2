# **App Name**: PetMatch Landing

## Core Features:

- Hero Section: Display a hero section with a gradient background, a title, a subtitle, a call-to-action button, and a pet image.
- Adoption Process: Showcase the adoption process in three steps with icons and descriptions.
- Pet Cards: Display adoptable pets in a grid with their image, name, age, and an adoption button.

## Style Guidelines:

- Primary color: Use a gradient of pink and purple tones for the hero section background, as requested.
- Secondary color: Light pastel shades for backgrounds of cards and sections.
- Accent: Use a bright teal (#008080) for call-to-action buttons and interactive elements.
- Use simple and friendly icons for the adoption process steps.
- Maintain a clean and spacious layout with consistent padding and margins.

## Original User Request:
Crear la Página Principal de MatchPet
Secciones a Implementar:
Hero Section (Introducción Principal)

La sección debe tener un fondo degradado de tonos rosas y morados.

Debe contener un título grande y llamativo ("Encuentra tu huellita compatible").

Debe haber un botón de llamada a la acción (CTA) ("Comienza Ahora") visible.

Imágenes de fondo: una foto de una mascota debe ocupar el espacio de la derecha.

Código HTML:

html
Copiar
<section class="hero-section">
  <div class="hero-text">
    <h1 class="hero-title">Encuentra tu huellita compatible</h1>
    <p class="hero-subtitle">Conecta con tu compañero ideal a través de nuestra plataforma de compatibilidad. Conecta con tu compañero ideal y descubre la felicidad de adoptar.</p>
    <button class="cta-button">Comienza Ahora</button>
  </div>
  <div class="hero-image">
    <img src="images/dog.jpg" alt="Perro Adoptable">
  </div>
</section>
CSS:

css
Copiar
.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 20px;
  background: linear-gradient(145deg, #BF3952, #D94676);
  color: white;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.4;
}

.hero-button {
  padding: 15px 30px;
  background-color: #883CBB;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.hero-button:hover {
  background-color: #D94676;
}
Proceso de Adopción:

Crear una grilla de tres elementos que describan los pasos del proceso de adopción (con iconos).

Código HTML:

html
Copiar
<section class="process-section">
  <h2>Conoce el Proceso de Adopción que Manejamos</h2>
  <div class="process-item">
    <img src="icons/step1.png" alt="Paso 1">
    <h3>Deja tu solicitud</h3>
    <p>Realiza tu solicitud de adopción completando nuestro formulario online.</p>
  </div>
  <div class="process-item">
    <img src="icons/step2.png" alt="Paso 2">
    <h3>Revisión de solicitud</h3>
    <p>Revisamos tu solicitud para asegurar que todo esté correcto.</p>
  </div>
  <div class="process-item">
    <img src="icons/step3.png" alt="Paso 3">
    <h3>Adopción exitosa</h3>
    <p>Una vez aceptada, ¡podrás llevarte a tu nueva mascota!</p>
  </div>
</section>
CSS:

css
Copiar
.process-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.process-item {
  text-align: center;
  background-color: #E8C9F2;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.process-item img {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}
Nuestras Mascotas Adoptables:

Mostrar las tarjetas de mascotas con su imagen, nombre, edad y un botón de adopción.

Código HTML:

html
Copiar
<section class="pets-section">
  <h2>Nuestras Mascotas Adoptables</h2>
  <div class="pet-card">
    <img src="images/pet1.jpg" alt="Mascota 1">
    <h3>Fido</h3>
    <p>Joven, Pequeño</p>
    <button>Adoptar</button>
  </div>
  <div class="pet-card">
    <img src="images/pet2.jpg" alt="Mascota 2">
    <h3>Whiskers</h3>
    <p>Adulto, Mediano</p>
    <button>Adoptar</button>
  </div>
</section>
CSS:

css
Copiar
.pets-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 40px;
}

.pet-card {
  background-color: #F5F5F5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.pet-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.pet-card h3 {
  font-size: 1.25rem;
  font-weight: bold;
}

.pet-card p {
  font-size: 1rem;
  color: #555;
}

.pet-card button {
  padding: 10px 20px;
  background-color: #D94676;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
Sección "Cifras que Llenan el Corazón":

Mostrar las estadísticas clave como adopciones realizadas, mascotas disponibles y refugios registrados.

Código HTML:

html
Copiar
<section class="stats-section">
  <div class="stat-card">
    <h3>100</h3>
    <p>Adopciones realizadas</p>
  </div>
  <div class="stat-card">
    <h3>50</h3>
    <p>Mascotas disponibles</p>
  </div>
  <div class="stat-card">
    <h3>10</h3>
    <p>Refugios registrados</p>
  </div>
</section>
CSS:

css
Copiar
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.stat-card {
  background-color: #E8C9F2;
  text-align: center;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 1rem;
  color: #555;
}
Footer (Pie de Página):

Asegúrate de que contenga enlaces importantes y redes sociales bien organizadas.

Código HTML:

html
Copiar
<footer>
  <div class="footer-logo">
    <img src="images/logo.png" alt="Logo MatchPet">
  </div>
  <div class="footer-links">
    <a href="#contacto">Contacto</a>
    <a href="#terminos">Términos</a>
    <a href="#politica">Política</a>
  </div>
  <div class="footer-social">
    <a href="https://www.instagram.com" target="_blank">Instagram</a>
    <a href="https://www.facebook.com" target="_blank">Facebook</a>
    <a href="https://www.twitter.com" target="_blank">Twitter</a>
  </div>
</footer>
CSS:

css
Copiar
footer {
  background-color: #4A90E2;
  padding: 20px;
  color: white;
  text-align: center;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.footer-text {
  margin-top: 20px;
  font-size: 0.875rem;
}
  