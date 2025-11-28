import blogBeautyTech from "@/assets/blog/beauty-tech.jpg";
import blogHairCare from "@/assets/blog/hair-care.jpg";
import blogFacialMassage from "@/assets/blog/facial-massage.jpg";
import blogIPL from "@/assets/blog/ipl-hair-removal.jpg";
import blogCleansing from "@/assets/blog/facial-cleansing.webp";
import blogMesotherapy from "@/assets/blog/mesotherapy.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  readTime: string;
  image?: string;
  date: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "tecnologia-belleza-profesional-casa",
    title: "Tecnología de Belleza Profesional en Casa",
    excerpt: "Descubre cómo la tecnología profesional ha revolucionado el cuidado personal en casa con dispositivos de última generación.",
    category: "Guías",
    categorySlug: "guias",
    readTime: "5 min",
    image: blogBeautyTech,
    date: "2025-11-20",
    author: "Equipo Garett Beauty",
    content: `
      <p>En <strong>Garett Beauty</strong>, revolucionamos el cuidado personal con dispositivos de belleza profesional diseñados para uso doméstico. Nuestra tecnología avanzada te permite disfrutar de tratamientos profesionales sin salir de casa.</p>

      <h2>¿Por Qué Elegir Dispositivos de Belleza Profesional?</h2>
      
      <p>Los <strong>dispositivos de belleza profesional</strong> han revolucionado la industria del cuidado personal. A diferencia de los productos convencionales, estos aparatos utilizan tecnologías clínicamente probadas que ofrecen resultados visibles y duraderos.</p>

      <h3>Resultados Profesionales en Tu Hogar</h3>
      
      <ul>
        <li><strong>Tecnología Profesional:</strong> La misma que se usa en salones de belleza, ahora accesible para tu rutina diaria</li>
        <li><strong>Innovación Probada:</strong> Desde tecnología iónica hasta IPL de última generación</li>
        <li><strong>Garantía Extendida:</strong> 2 años de garantía en todos nuestros productos</li>
        <li><strong>Cuidado Integral:</strong> Soluciones completas para cabello, rostro y cuerpo</li>
      </ul>

      <h3>Ventajas vs Clínica</h3>
      
      <p>La principal diferencia es la comodidad y el ahorro. Los tratamientos profesionales de clínica cuestan entre 1.500-3.000€, mientras que nuestros dispositivos se pagan solos en pocas semanas. Obtienes tecnología profesional que puedes usar cuando quieras, sin citas y sin desplazamientos.</p>
    `
  },
  {
    slug: "cuidado-capilar-tecnologia-ionica",
    title: "Cuidado Capilar con Tecnología Iónica: Guía Completa",
    excerpt: "Todo lo que necesitas saber sobre la tecnología iónica para un cabello brillante, suave y sin encrespamiento.",
    category: "Cuidado Capilar",
    categorySlug: "cuidado-capilar",
    readTime: "7 min",
    image: blogHairCare,
    date: "2025-11-18",
    author: "Equipo Garett Beauty",
    content: `
      <p>Nuestra <a href="/categoria/cuidado-capilar">línea de cuidado capilar</a> incluye planchas y secadores con <strong>tecnología iónica avanzada</strong>. Esta innovación neutraliza la electricidad estática, sella la cutícula del cabello y proporciona un acabado profesional.</p>

      <h2>¿Cómo Funciona la Tecnología Iónica?</h2>
      
      <p>Los iones negativos emitidos por nuestros dispositivos sellan la cutícula del cabello, reteniendo la humedad natural y protegiendo de daños por calor. Esto resulta en:</p>

      <ul>
        <li>Reducción del 90% del encrespamiento</li>
        <li>Brillo intenso y duradero</li>
        <li>Protección contra daños térmicos</li>
        <li>Tiempo de secado/alisado reducido en un 40%</li>
      </ul>

      <h2>Tipos de Cabello y Temperatura Ideal</h2>
      
      <h3>Cabello Fino o Dañado</h3>
      <p>Temperatura: 150-170°C. Usa protector térmico siempre y pasa rápidamente por cada mechón.</p>

      <h3>Cabello Normal</h3>
      <p>Temperatura: 170-180°C. La temperatura perfecta para un alisado efectivo sin daño.</p>

      <h3>Cabello Grueso o Rizado</h3>
      <p>Temperatura: 180-200°C. Necesitas más calor para alisar efectivamente el cabello grueso.</p>

      <h2>Consejos de Uso Diario</h2>
      
      <p>Aunque nuestras planchas están diseñadas para uso diario, te recomendamos:</p>
      
      <ol>
        <li>Usar siempre protector térmico</li>
        <li>Asegurar que el cabello esté completamente seco</li>
        <li>No pasar más de 2 veces por el mismo mechón</li>
        <li>Limpiar las placas regularmente</li>
      </ol>

      <p>Descubre nuestra colección completa en <a href="/categoria/cuidado-capilar">dispositivos de cuidado capilar</a>.</p>
    `
  },
  {
    slug: "masajeadores-faciales-guia-completa",
    title: "Masajeadores Faciales: Guía de Uso y Beneficios",
    excerpt: "Aprende a usar correctamente los masajeadores faciales para obtener un efecto lifting natural y piel radiante.",
    category: "Cuidado Facial",
    categorySlug: "masajeadores-faciales",
    readTime: "6 min",
    image: blogFacialMassage,
    date: "2025-11-15",
    author: "Equipo Garett Beauty",
    content: `
      <p>Los <a href="/categoria/masajeadores-faciales">masajeadores faciales profesionales</a> estimulan la circulación, mejoran la absorción de productos y proporcionan un efecto lifting natural.</p>

      <h2>Tecnologías Combinadas</h2>
      
      <h3>Vibración Sónica</h3>
      <p>Estimula la circulación y ayuda a drenar toxinas. Es como un masaje profesional profundo que mejora la absorción de tus productos.</p>

      <h3>Pulsos EMS (Electroestimulación)</h3>
      <p>Tonifican los 43 músculos faciales. Como hacer ejercicio para tu rostro—fortalecen y reafirman naturalmente.</p>

      <h3>Terapia LED</h3>
      <ul>
        <li><strong>Luz Roja:</strong> Estimula colágeno, efecto anti-edad</li>
        <li><strong>Luz Azul:</strong> Calma, reduce imperfecciones y acné</li>
        <li><strong>Luz Verde:</strong> Unifica tono, reduce manchas</li>
      </ul>

      <h2>Rutina de Uso Recomendada</h2>
      
      <h3>Paso 1: Preparación</h3>
      <p>Limpia tu rostro a fondo con un <a href="/categoria/limpieza-facial">cepillo de limpieza facial</a>.</p>

      <h3>Paso 2: Aplicación de Productos</h3>
      <p>Aplica tu sérum o gel conductor generosamente. Los masajeadores potencian la absorción hasta un 70%.</p>

      <h3>Paso 3: Masaje (10 minutos)</h3>
      <p>Desliza el dispositivo hacia arriba y hacia fuera. Zonas clave: mejillas, mandíbula, frente, cuello.</p>

      <h3>Paso 4: Sellado</h3>
      <p>Finaliza con tu crema hidratante para sellar los beneficios.</p>

      <h2>Resultados Esperados</h2>
      
      <ul>
        <li><strong>2-4 semanas:</strong> Piel más luminosa, efecto "buena cara"</li>
        <li><strong>8-12 semanas:</strong> Óvalo facial definido, líneas finas suavizadas</li>
        <li><strong>3-6 meses:</strong> Lifting natural visible, piel firme</li>
      </ul>

      <p>Explora nuestra gama completa de <a href="/categoria/masajeadores-faciales">masajeadores faciales</a> y <a href="/categoria/mesoterapia">dispositivos de mesoterapia</a>.</p>
    `
  },
  {
    slug: "depilacion-ipl-guia-definitiva",
    title: "Depilación IPL: Guía Definitiva para Resultados Permanentes",
    excerpt: "Todo lo que necesitas saber sobre la depilación láser IPL en casa: funcionamiento, resultados y consejos.",
    category: "Depilación IPL",
    categorySlug: "depilacion-ipl",
    readTime: "8 min",
    image: blogIPL,
    date: "2025-11-12",
    author: "Equipo Garett Beauty",
    content: `
      <p>La <a href="/categoria/depilacion-ipl">tecnología IPL (Luz Pulsada Intensa)</a> es el método más efectivo para <strong>depilación permanente en casa</strong>. Nuestros dispositivos ofrecen hasta 500,000 pulsaciones, suficientes para tratarte durante años.</p>

      <h2>¿Cómo Funciona la Depilación IPL?</h2>
      
      <p>La tecnología IPL emite destellos de luz que el vello absorbe. Esta energía se transforma en calor suave que debilita el folículo piloso desde la raíz, ralentizando su crecimiento de forma progresiva.</p>

      <h3>No Es Dolor, Es Efectividad</h3>
      <p>El sistema trabaja selectivamente sobre la melanina del vello, respetando tu piel. La mayoría de usuarias describen la sensación como un ligero calor o pequeño pellizco.</p>

      <h2>Cronograma de Resultados</h2>
      
      <table>
        <tr>
          <td><strong>4 semanas:</strong></td>
          <td>Primeros pelos más finos, crecimiento más lento</td>
        </tr>
        <tr>
          <td><strong>8-12 semanas:</strong></td>
          <td>Reducción notable del vello, espaciar sesiones</td>
        </tr>
        <tr>
          <td><strong>6 meses:</strong></td>
          <td>Hasta 90% menos vello, solo retoques mensuales</td>
        </tr>
      </table>

      <h2>Protocolo de Uso Correcto</h2>
      
      <ol>
        <li><strong>Depílate con cuchilla</strong> 24h antes (nunca cera)</li>
        <li><strong>Limpia y seca</strong> la zona completamente</li>
        <li><strong>Selecciona intensidad</strong> según tu tono de piel</li>
        <li><strong>Aplica pulsos</strong> cada 2-3 cm, sin solapar</li>
        <li><strong>Repite semanalmente</strong> durante 8-12 semanas</li>
        <li><strong>Mantenimiento mensual</strong> después</li>
      </ol>

      <h2>¿En Qué Tipos de Piel Funciona?</h2>
      
      <p>La IPL funciona mejor en pieles claras con vello oscuro (fototipos I-IV). En vello rubio, pelirrojo o canoso los resultados son limitados, ya que contienen poca melanina.</p>

      <h3>Nuestros Modelos Avanzados</h3>
      <p>Algunos modelos como el Cold White funcionan también en tonos más oscuros gracias a tecnología mejorada.</p>

      <h2>Precauciones Importantes</h2>
      
      <ul>
        <li>No exponerse al sol 48h antes y después</li>
        <li>No usar en piel bronceada o irritada</li>
        <li>Hacer test de sensibilidad antes</li>
        <li>Usar gafas protectoras (incluidas)</li>
      </ul>

      <h2>IPL vs Láser de Clínica</h2>
      
      <p>Una depilación láser profesional cuesta 1.500-2.500€ para cuerpo completo. Con IPL en casa:</p>
      
      <ul>
        <li>Inversión única de ~200-300€</li>
        <li>Mismo resultado en 6-12 meses</li>
        <li>Sin citas ni desplazamientos</li>
        <li>Uso ilimitado durante años</li>
      </ul>

      <p>Descubre nuestra gama de <a href="/categoria/depilacion-ipl">dispositivos de depilación IPL</a>.</p>
    `
  },
  {
    slug: "limpieza-facial-profunda-rutina",
    title: "Limpieza Facial Profunda: La Base de una Piel Radiante",
    excerpt: "Descubre por qué la limpieza sónica es 10 veces más efectiva y cómo incorporarla en tu rutina diaria.",
    category: "Cuidado Facial",
    categorySlug: "limpieza-facial",
    readTime: "5 min",
    image: blogCleansing,
    date: "2025-11-10",
    author: "Equipo Garett Beauty",
    content: `
      <p>Nuestros <a href="/categoria/limpieza-facial">dispositivos de limpieza facial profunda</a> eliminan impurezas hasta 10 veces más efectivamente que la limpieza manual, dejando tu piel radiante y renovada.</p>

      <h2>¿Por Qué Limpieza Sónica?</h2>
      
      <p>Las 7.500 vibraciones sónicas por minuto llegan a los poros profundos donde tus dedos no pueden alcanzar, eliminando:</p>

      <ul>
        <li>Restos de maquillaje incrustados</li>
        <li>Células muertas acumuladas</li>
        <li>Exceso de sebo en poros</li>
        <li>Contaminación ambiental</li>
      </ul>

      <h2>Tecnología Sónica vs Manual</h2>
      
      <table>
        <tr>
          <th>Aspecto</th>
          <th>Limpieza Manual</th>
          <th>Limpieza Sónica</th>
        </tr>
        <tr>
          <td>Efectividad</td>
          <td>50-60%</td>
          <td>95-98%</td>
        </tr>
        <tr>
          <td>Tiempo</td>
          <td>3-5 minutos</td>
          <td>1 minuto</td>
        </tr>
        <tr>
          <td>Profundidad</td>
          <td>Superficial</td>
          <td>Poros profundos</td>
        </tr>
        <tr>
          <td>Exfoliación</td>
          <td>Puede ser agresiva</td>
          <td>Suave y efectiva</td>
        </tr>
      </table>

      <h2>Rutina de Limpieza Perfecta</h2>
      
      <h3>Mañana (1 minuto)</h3>
      <ol>
        <li>Humedece tu rostro con agua tibia</li>
        <li>Aplica tu limpiador facial favorito</li>
        <li>Usa el cepillo en velocidad suave</li>
        <li>Aclara y aplica sérum + hidratante</li>
      </ol>

      <h3>Noche (1 minuto)</h3>
      <ol>
        <li>Retira maquillaje con agua micelar</li>
        <li>Segunda limpieza con cepillo</li>
        <li>Usa velocidad media/alta</li>
        <li>Tónico + tratamiento nocturno</li>
      </ol>

      <h2>Cabezales para Cada Necesidad</h2>
      
      <ul>
        <li><strong>Cerdas suaves:</strong> Piel sensible o diaria</li>
        <li><strong>Cerdas normales:</strong> Uso general, todo tipo de piel</li>
        <li><strong>Exfoliante:</strong> 1-2 veces/semana, elimina células muertas</li>
        <li><strong>Silicona:</strong> Zona del contorno de ojos</li>
      </ul>

      <h2>Resultados Visibles</h2>
      
      <ul>
        <li><strong>1 semana:</strong> Piel más suave, maquillaje se aplica mejor</li>
        <li><strong>2-4 semanas:</strong> Granitos reducidos, textura uniforme</li>
        <li><strong>2 meses:</strong> Poros menos visibles, piel radiante</li>
      </ul>

      <h3>Potencia Tus Productos</h3>
      <p>Una piel limpia profundamente absorbe tus productos hasta 5 veces mejor. Ese sérum de 60€ finalmente funcionará como debe.</p>

      <p>Combina con <a href="/categoria/masajeadores-faciales">masajeadores faciales</a> y <a href="/categoria/mesoterapia">mesoterapia</a> para resultados profesionales completos.</p>
    `
  },
  {
    slug: "mesoterapia-sin-agujas-casa",
    title: "Mesoterapia Sin Agujas: Penetración Profunda Sin Dolor",
    excerpt: "Cómo la electroporación lleva tus sérums hasta las capas profundas de la piel sin inyecciones.",
    category: "Cuidado Facial",
    categorySlug: "mesoterapia",
    readTime: "6 min",
    image: blogMesotherapy,
    date: "2025-11-08",
    author: "Equipo Garett Beauty",
    content: `
      <p>Nuestros <a href="/categoria/mesoterapia">dispositivos de mesoterapia</a> utilizan electroporación para que tus sérums penetren hasta capas profundas sin agujas ni dolor.</p>

      <h2>¿Qué Es la Electroporación?</h2>
      
      <p>Impulsos eléctricos suaves (totalmente imperceptibles) que abren microcanales temporales en tu piel durante 15-30 minutos. Durante esa ventana, los activos penetran hasta la dermis.</p>

      <h3>Es Como Tener Acceso VIP</h3>
      <p>Normalmente, el 90% de los activos de tus sérums se quedan en la superficie. Con electroporación, ese porcentaje penetra realmente donde debe actuar.</p>

      <h2>Mejores Sérums para Mesoterapia</h2>
      
      <h3>Ácido Hialurónico</h3>
      <p><strong>Beneficio:</strong> Hidratación profunda, efecto "relleno" natural<br>
      <strong>Peso molecular:</strong> Bajo peso para mejor penetración</p>

      <h3>Vitamina C</h3>
      <p><strong>Beneficio:</strong> Antimanchas, iluminador, antioxidante<br>
      <strong>Concentración:</strong> 10-20% para resultados óptimos</p>

      <h3>Retinol</h3>
      <p><strong>Beneficio:</strong> Anti-edad, renovación celular<br>
      <strong>Frecuencia:</strong> 2-3 veces/semana, siempre de noche</p>

      <h3>Péptidos</h3>
      <p><strong>Beneficio:</strong> Estimulan colágeno, firmeza<br>
      <strong>Combinación:</strong> Funciona mejor con ácido hialurónico</p>

      <h2>Protocolo de Tratamiento</h2>
      
      <h3>Preparación</h3>
      <ol>
        <li>Limpia rostro con <a href="/categoria/limpieza-facial">cepillo sónico</a></li>
        <li>Aplica sérum generosamente (no escatimes)</li>
        <li>Asegura que la piel esté completamente cubierta</li>
      </ol>

      <h3>Aplicación (10-15 minutos)</h3>
      <ol>
        <li>Desliza el dispositivo lentamente (2 cm cada 3 segundos)</li>
        <li>Cubre toda la cara de forma uniforme</li>
        <li>Insiste en zonas problemáticas (arrugas, manchas)</li>
      </ol>

      <h3>Post-Tratamiento</h3>
      <ol>
        <li>Deja absorber 2-3 minutos</li>
        <li>Aplica crema hidratante para sellar</li>
        <li>Evita sol directo 24h después</li>
      </ol>

      <h2>Cronograma de Resultados</h2>
      
      <ul>
        <li><strong>1-2 semanas:</strong> Piel más hidratada y jugosa</li>
        <li><strong>4-6 semanas:</strong> Manchas más claras, tono uniforme</li>
        <li><strong>3 meses:</strong> Arrugas suavizadas, piel renovada</li>
      </ul>

      <h2>Mesoterapia Casera vs Clínica</h2>
      
      <table>
        <tr>
          <th>Aspecto</th>
          <th>Clínica</th>
          <th>Casa</th>
        </tr>
        <tr>
          <td>Precio/sesión</td>
          <td>100-150€</td>
          <td>0€ después inversión</td>
        </tr>
        <tr>
          <td>Sesiones necesarias</td>
          <td>6-10 sesiones</td>
          <td>Ilimitadas</td>
        </tr>
        <tr>
          <td>Dolor</td>
          <td>Agujas, molesto</td>
          <td>Sin dolor</td>
        </tr>
        <tr>
          <td>Tiempo recuperación</td>
          <td>24-48h rojez</td>
          <td>0h, inmediato</td>
        </tr>
      </table>

      <h2>Tips Pro</h2>
      
      <ul>
        <li>Usa 2-3 veces por semana, no más</li>
        <li>Invierte en sérums de calidad, el dispositivo los potencia</li>
        <li>Combina con <a href="/categoria/masajeadores-faciales">masaje facial</a> después</li>
        <li>Guarda en nevera para efecto calmante</li>
      </ul>

      <p>Complementa tu rutina con <a href="/categoria/corporales">tratamientos corporales</a> para cuidado integral.</p>
    `
  }
];

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter(post => post.categorySlug === categorySlug);
};

export const getLatestBlogPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
