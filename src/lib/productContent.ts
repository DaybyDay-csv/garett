import { LucideIcon } from "lucide-react";

export interface ProductContent {
  quickBenefits: Array<{
    icon: string;
    text: string;
  }>;
  dropdowns: {
    howItWorks: {
      title: string;
      summary: string;
      details: string[];
    };
    expectedResults: {
      phases: Array<{
        timeframe: string;
        description: string;
      }>;
      usageNote: string;
    };
    howToUse: {
      steps: string[];
      additionalNote: string;
    };
    whatMakesDifferent: Array<{
      title: string;
      description: string;
    }>;
  };
}

const productContentMap: Record<string, ProductContent> = {
  // IPL / Depilación (Flash, Flash Pro, Cold White)
  'depilacion-ipl': {
    quickBenefits: [
      { icon: 'Zap', text: '400.000 pulsos de luz' },
      { icon: 'Check', text: 'Resultados desde 4 semanas' },
      { icon: 'Award', text: 'Tecnología clínica en casa' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Tecnología IPL profesional que elimina el vello desde la raíz',
        details: [
          'La tecnología IPL (Luz Pulsada Intensa) emite destellos de luz que el vello absorbe. Esta energía se transforma en calor suave que debilita el folículo piloso desde la raíz, ralentizando su crecimiento de forma progresiva.',
          'No es dolor, es efectividad. El sistema trabaja selectivamente sobre la melanina del vello, respetando tu piel.',
          'Cada pulso cubre un área amplia, haciendo el tratamiento rápido y cómodo. Es como tener tu propia clínica láser en casa.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '4 semanas',
            description: 'Primeros pelos más finos y menos visibles. Ya notas que crece más despacio.'
          },
          {
            timeframe: '8-12 semanas',
            description: 'Reducción notable del vello. Empiezas a espaciar las sesiones cada 2 semanas.'
          },
          {
            timeframe: '6 meses',
            description: 'Hasta 90% menos vello. Solo necesitas retoques cada 1-2 meses para mantener resultados.'
          }
        ],
        usageNote: 'Los resultados son acumulativos. La constancia en las primeras 8 semanas marca la diferencia.'
      },
      howToUse: {
        steps: [
          'Depila la zona con cuchilla (no cera) 24h antes',
          'Limpia y seca bien la piel',
          'Selecciona la intensidad según tu tono de piel',
          'Aplica el pulso de luz cada 2-3 cm',
          'Repite 1 vez por semana durante 8-12 semanas',
          'Después, solo retoques de mantenimiento'
        ],
        additionalNote: 'Importante: No exponerse al sol 48h antes y después. Funciona mejor en pieles claras con vello oscuro.'
      },
      whatMakesDifferent: [
        {
          title: '400.000 pulsos: Años de uso garantizado',
          description: 'Mientras otras lámparas se agotan pronto, esta te dura años tratando todo el cuerpo. No necesitarás recambios.'
        },
        {
          title: 'Sensor de piel inteligente',
          description: 'Solo se activa si detecta un tono de piel seguro. No puedes equivocarte ni dañarte.'
        },
        {
          title: 'Certificado médico clase IIa',
          description: 'No es un juguete de belleza. Es un dispositivo médico certificado con eficacia probada clínicamente.'
        },
        {
          title: 'Ahorro vs depilación láser',
          description: 'Una depilación láser profesional cuesta 1.500-2.500€. Esto se paga solo en 3 meses.'
        }
      ]
    }
  },

  // Masajeadores Faciales (Lift Skin, Pretty Face, Fresh Eye)
  'masajeadores-faciales': {
    quickBenefits: [
      { icon: 'Clock', text: '10 min al día' },
      { icon: 'Sparkles', text: 'Firmeza natural' },
      { icon: 'Zap', text: 'Vibración + EMS + LED' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Tecnología múltiple que trabaja en capas profundas y músculos',
        details: [
          'Vibración sónica de alta frecuencia que estimula la circulación, ayuda a drenar toxinas y mejora la absorción de tus productos. Es como un masaje profesional profundo.',
          'Pulsos EMS (electroestimulación) que tonifican los 43 músculos faciales. Como hacer ejercicio para tu rostro—fortalecen y reafirman naturalmente.',
          'Terapia LED de 3 colores: luz roja estimula colágeno, luz azul calma y reduce imperfecciones, adaptándose a tus necesidades.',
          'El resultado: piel más firme, contornos definidos y luminosidad que se nota desde las primeras semanas. No es tensión temporal, es reactivación real.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '2-4 semanas',
            description: 'Piel más luminosa e hidratada. Ese efecto "buena cara" que todos notan pero nadie sabe por qué.'
          },
          {
            timeframe: '8-12 semanas',
            description: 'Óvalo facial más definido. Líneas finas menos marcadas. Tu piel se ve más descansada.'
          },
          {
            timeframe: '3-6 meses',
            description: 'Lifting natural visible. Piel firme y tersa. Los resultados mejoran con el uso continuo.'
          }
        ],
        usageNote: 'Úsalo 5-6 días a la semana para resultados óptimos. Es tu ritual de autocuidado que realmente funciona.'
      },
      howToUse: {
        steps: [
          'Limpia tu rostro a fondo',
          'Aplica gel conductor (incluido) o tu sérum favorito',
          'Enciende el dispositivo y selecciona modo',
          'Desliza hacia arriba y hacia fuera durante 10 minutos',
          'Zonas clave: mejillas, mandíbula, frente, cuello',
          'Finaliza con tu crema hidratante habitual'
        ],
        additionalNote: 'No usar sobre heridas activas ni con marcapasos. El calor es normal y seguro.'
      },
      whatMakesDifferent: [
        {
          title: 'Tecnología 4-en-1',
          description: 'Vibración sónica + EMS + terapia LED + calor terapéutico. Mientras otros dispositivos solo hacen una cosa, este trabaja en múltiples niveles simultáneamente.'
        },
        {
          title: 'Resultados profesionales en casa',
          description: 'Una sesión de tratamiento facial en clínica cuesta 80-120€. Con pocos usos ya has recuperado la inversión. Y puedes usarlo años.'
        },
        {
          title: '3 modos adaptables',
          description: 'Masaje suave y relajante, estimulación intensa, o modo alternativo. Adaptas el tratamiento a lo que tu piel necesita cada día.'
        },
        {
          title: 'Compatible con tus productos favoritos',
          description: 'Potencia la absorción de sérums y cremas. Ese producto caro que tienes ahora penetra mejor y funciona de verdad.'
        }
      ]
    }
  },

  // Limpieza Facial (Clean, Clean Pro, Sonic Scrub)
  'limpieza-facial': {
    quickBenefits: [
      { icon: 'Clock', text: '1 min al día' },
      { icon: 'Sparkles', text: 'Limpieza 10x más profunda' },
      { icon: 'Check', text: 'Poros visiblemente más finos' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Vibración sónica que limpia donde tus dedos no llegan',
        details: [
          '7.500 vibraciones sónicas por minuto que eliminan impurezas, restos de maquillaje y células muertas incrustadas en tus poros.',
          'Es como un cepillo de dientes eléctrico, pero diseñado específicamente para la delicada piel de tu cara. Suave, efectivo, científicamente probado.',
          'Las vibraciones crean microburbujas que arrastran la suciedad sin necesidad de frotar. Tu piel queda limpia de verdad, no solo en la superficie.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '1 semana',
            description: 'Piel más suave al tacto. El maquillaje se aplica mejor y dura más. Notas la diferencia inmediatamente.'
          },
          {
            timeframe: '2-4 semanas',
            description: 'Brotes y granitos reducidos notablemente. Textura de piel más uniforme. Tu cara luce más luminosa.'
          },
          {
            timeframe: '2 meses',
            description: 'Poros menos visibles. Piel radiante y sana. Tus productos de cuidado se absorben mucho mejor.'
          }
        ],
        usageNote: 'Úsalo mañana y noche para resultados óptimos. Solo 60 segundos que transforman tu rutina.'
      },
      howToUse: {
        steps: [
          'Humedece tu rostro con agua tibia',
          'Aplica tu limpiador facial favorito',
          'Enciende el cepillo y selecciona velocidad',
          'Masajea en círculos suaves durante 1 minuto',
          'Zonas: frente (20s), mejillas (20s cada una), nariz y mentón (20s)',
          'Aclara con agua y aplica tu tónico/sérum'
        ],
        additionalNote: 'Cambia el cabezal cada 3 meses para mantener la efectividad. Es suave pero no uses si tienes piel muy irritada.'
      },
      whatMakesDifferent: [
        {
          title: 'Tecnología sónica, no abrasiva',
          description: 'No raspa ni daña tu barrera cutánea. Las vibraciones hacen el trabajo, respetando la integridad de tu piel.'
        },
        {
          title: 'Cabezales intercambiables para cada necesidad',
          description: 'Piel sensible, normal o necesitas exfoliación profunda. Un dispositivo, múltiples soluciones.'
        },
        {
          title: 'Impermeable IPX7',
          description: 'Úsalo bajo la ducha sin miedo. Enjuágalo directamente bajo el grifo. Diseñado para tu vida real.'
        },
        {
          title: 'Batería de larga duración',
          description: 'Una carga = 2 semanas de uso diario. Olvídate de cables y enchufes en el baño.'
        }
      ]
    }
  },

  // Mesoterapia (Calm Skin, Fresh Skin Pro, Serum Skin)
  'mesoterapia': {
    quickBenefits: [
      { icon: 'Droplets', text: 'Absorción 90% mayor' },
      { icon: 'Sparkles', text: 'Sin agujas, sin dolor' },
      { icon: 'Check', text: 'Penetración profunda' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Electroporación que abre las puertas de tu piel',
        details: [
          'Electroporación: impulsos eléctricos suaves (totalmente imperceptibles) que abren microcanales temporales en tu piel durante 15-30 minutos.',
          'Durante esa ventana, los activos de tus sérums penetran hasta las capas profundas de la dermis. Es como tener acceso VIP para tus productos más caros.',
          'Sin agujas, sin dolor, sin tiempo de recuperación. Los resultados de la mesoterapia de clínica, pero en tu sofá.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '1-2 semanas',
            description: 'Piel más hidratada y "jugosa". Notas que tus productos se absorben de verdad en lugar de quedarse en la superficie.'
          },
          {
            timeframe: '4-6 semanas',
            description: 'Manchas más claras. Tono más uniforme. Las marcas de acné y pigmentación empiezan a difuminarse.'
          },
          {
            timeframe: '3 meses',
            description: 'Arrugas finas suavizadas. Piel renovada y luminosa. El efecto acumulativo es impresionante.'
          }
        ],
        usageNote: 'Úsalo 2-3 veces por semana con sérums específicos (vitamina C, ácido hialurónico, retinol). Invierte en buenos sérums, este dispositivo hará que valgan el triple.'
      },
      howToUse: {
        steps: [
          'Limpia tu rostro a fondo',
          'Aplica tu sérum favorito generosamente',
          'Desliza el dispositivo lentamente (2 cm cada 3 segundos)',
          'Cubre toda la cara durante 10-15 minutos',
          'Deja que se absorba 2-3 minutos',
          'Finaliza con crema hidratante para sellar'
        ],
        additionalNote: 'Mejores resultados con sérums de moléculas pequeñas (ácido hialurónico, vitamina C). No usar sobre heridas activas.'
      },
      whatMakesDifferent: [
        {
          title: 'Mesoterapia sin agujas ni clínica',
          description: 'Una sesión de mesoterapia profesional cuesta 100-150€. Necesitas 6-10 sesiones. Esto se paga solo en 1 mes.'
        },
        {
          title: 'Potencia tus productos existentes',
          description: 'Ese sérum de 60€ que tienes y que sientes que no hace nada, ahora penetra de verdad. No necesitas comprar más, necesitas que funcione mejor.'
        },
        {
          title: 'Tecnología médica validada',
          description: 'Electroporación usada en hospitales para administrar medicamentos transdérmicos. No es un invento de belleza, es ciencia médica aplicada.'
        },
        {
          title: 'Resultados desde casa',
          description: 'Sin citas, sin desplazamientos, sin dolor. Tratamiento profesional cuando tú quieras, cuantas veces necesites.'
        }
      ]
    }
  },

  // Corporales (Perfect Body, Cellu Body, Multi Care)
  'corporales': {
    quickBenefits: [
      { icon: 'Clock', text: '20 min 3x/semana' },
      { icon: 'Sparkles', text: 'Reduce celulitis visible' },
      { icon: 'Flame', text: 'Calor + masaje profundo' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Radiofrecuencia + masaje de vacum para celulitis y flacidez',
        details: [
          'Radiofrecuencia que calienta la grasa subcutánea (40-42°C), mejorando la circulación sanguínea y linfática. La grasa se moviliza, la piel se tensa.',
          'Masaje de vacum que drena líquidos retenidos y rompe los nódulos de grasa que crean el efecto "piel de naranja".',
          'Estimula la producción de colágeno y elastina en zonas donde más lo necesitas. El combo perfecto para suavizar, reafirmar y tonificar.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '4-6 semanas',
            description: 'Piel más suave al tacto. Mejor circulación en piernas. Sientes la zona más firme.'
          },
          {
            timeframe: '8-12 semanas',
            description: 'Celulitis visiblemente menos marcada. Contornos más definidos. La ropa te sienta mejor.'
          },
          {
            timeframe: '6 meses',
            description: 'Piel más firme y tonificada. Resultados mantenibles con uso regular. Transformación real.'
          }
        ],
        usageNote: 'Constancia = resultados. 20 minutos 3 veces por semana. Combina con ejercicio moderado para potenciar efectos.'
      },
      howToUse: {
        steps: [
          'Aplica gel conductor (incluido) en la zona a tratar',
          'Enciende el dispositivo y selecciona nivel',
          'Movimientos circulares lentos en dirección al corazón',
          '10 minutos por zona (piernas, glúteos, abdomen, brazos)',
          'Insiste en zonas con más celulitis',
          'Limpia y aplica crema reafirmante'
        ],
        additionalNote: 'Bebe agua antes y después para facilitar el drenaje. No usar durante embarazo ni sobre varices severas.'
      },
      whatMakesDifferent: [
        {
          title: 'Cabezal grande para áreas corporales',
          description: 'Diseñado específicamente para piernas, glúteos y abdomen. Trata áreas amplias en menos tiempo.'
        },
        {
          title: 'Calor controlado y terapéutico',
          description: 'Temperatura óptima de 40-42°C. Efectivo para movilizar grasa pero totalmente seguro. Sientes el calor agradable, no quema.'
        },
        {
          title: 'Alternativa real a tratamientos de clínica',
          description: 'Un tratamiento de radiofrecuencia corporal cuesta 80-120€/sesión. Necesitas 10-15 sesiones. Haz las cuentas: esto se paga solo en 1 mes.'
        },
        {
          title: 'Resultados visibles y medibles',
          description: 'No es solo "sensación de mejora". La celulitis se suaviza, los contornos se definen. Hazte fotos cada 4 semanas.'
        }
      ]
    }
  },

  // Cuidado Capilar (AeroGlow plancha)
  'cuidado-capilar': {
    quickBenefits: [
      { icon: 'Wind', text: 'Motor 110.000 rpm' },
      { icon: 'Sparkles', text: 'Iones negativos' },
      { icon: 'Thermometer', text: '5 niveles temperatura' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Motor de alta velocidad + iones negativos para secado inteligente',
        details: [
          'Motor BLDC de 110.000 rpm que genera un flujo de aire potente (11.2 m/s) pero controlado. Seca rápido sin necesidad de calor extremo que daña.',
          'Iones negativos que neutralizan la electricidad estática del cabello y sellan la cutícula, dejándolo liso, brillante y sin frizz.',
          '5 niveles de temperatura (80°-150°C) con control inteligente. Eliges la temperatura exacta para tu tipo de pelo: fino, normal, grueso.',
          'El resultado: brillo de salón profesional con secado rápido, usando menos calor = menos daño a largo plazo.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: 'Inmediato',
            description: 'Pelo perfectamente liso, brillante y sin frizz. Ese acabado profesional que dura hasta el próximo lavado.'
          },
          {
            timeframe: '2-4 semanas',
            description: 'Tu cabello se ve más sano. Menos puntas abiertas. La diferencia con tu plancha anterior es evidente.'
          },
          {
            timeframe: '3 meses',
            description: 'Melena visiblemente más saludable. El cabello no está maltratado, está cuidado. Brilla con luz natural.'
          }
        ],
        usageNote: 'Usa protector térmico siempre. Aunque esta plancha es más segura, la protección extra nunca está de más.'
      },
      howToUse: {
        steps: [
          'Lava y seca completamente tu cabello',
          'Aplica protector térmico de medios a puntas',
          'Divide el pelo en secciones de 3-4 cm',
          'Ajusta temperatura según tu tipo de pelo',
          'Pasadas suaves y continuas de raíz a puntas',
          'No repitas más de 2 veces por sección'
        ],
        additionalNote: 'Pelo fino: 150-170°C. Pelo normal: 170-190°C. Pelo grueso/rizado: 190-210°C. Empieza siempre por temperatura baja.'
      },
      whatMakesDifferent: [
        {
          title: 'Motor profesional de 110.000 rpm',
          description: 'Secado en minutos, no en media hora. Potencia de salón en casa. Cuanto menos tiempo de calor, menos daño.'
        },
        {
          title: 'Tecnología de iones negativos',
          description: 'Elimina el frizz desde la raíz. El brillo no es artificial, es la cutícula del pelo perfectamente sellada.'
        },
        {
          title: '5 temperaturas + modo inteligente',
          description: 'Pelo húmedo y seco reconocidos automáticamente. No más quemar zonas porque olvidaste ajustar la temperatura.'
        },
        {
          title: 'Apagado automático y seguridad',
          description: 'Si te olvidas de apagarlo, él solo se cuida. Cable giratorio 360° de 2.5m para movimiento total sin enredos.'
        }
      ]
    }
  },

  // Smartwatches (GRC Activity, Men, Women, Kids)
  'smartwatches': {
    quickBenefits: [
      { icon: 'Battery', text: 'Hasta 20 días batería' },
      { icon: 'Activity', text: 'Monitoreo salud 24/7' },
      { icon: 'Droplets', text: 'Resistente IP68' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Cómo funciona?',
        summary: 'Sensores médicos que registran tu salud en tiempo real',
        details: [
          'Sensores ópticos de grado médico que miden frecuencia cardíaca continua, saturación de oxígeno (SpO2), presión arterial y calidad del sueño con precisión.',
          'Acelerómetro y giroscopio que registran pasos, distancia, calorías quemadas y reconocen automáticamente más de 100 modos deportivos.',
          'Pantalla AMOLED de 1.43" con resolución 466x466px. Always-On Display, colores vibrantes, legible bajo el sol directo.',
          'Batería de 370 mAh con autonomía de hasta 20 días en modo normal. Bluetooth 5.2 para conexión estable con tu móvil.',
          'El resultado: un coach de salud en tu muñeca 24/7 con datos precisos para mejorar tu bienestar día a día.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: 'Desde el día 1',
            description: 'Conoces tu frecuencia cardíaca en tiempo real, calidad de sueño, pasos exactos y calorías quemadas'
          },
          {
            timeframe: '1-2 semanas',
            description: 'Identificas patrones: a qué hora duermes peor, cuándo eres más activo, cómo responde tu cuerpo al esfuerzo'
          },
          {
            timeframe: '1 mes',
            description: 'Cambias hábitos basados en datos reales. Duermes mejor, te mueves más, comes más consciente'
          },
          {
            timeframe: '3 meses',
            description: 'Objetivos fitness alcanzados. El reloj es tu compañero para mantener el ritmo y seguir mejorando'
          }
        ],
        usageNote: 'Llévalo puesto día y noche para datos completos. Sincroniza con la app cada mañana para ver tu evolución.'
      },
      howToUse: {
        steps: [
          'Carga el reloj completamente (primera carga 2 horas)',
          'Descarga Garett Smart app gratis (Android 8.0+ / iOS 13.0+)',
          'Vincula por Bluetooth 5.2 y personaliza tu esfera favorita de cientos disponibles',
          'Llévalo 24/7—es resistente al agua IP68 (puedes ducharte, nadar sin problemas)',
          'Revisa tu progreso en la pantalla AMOLED o en la app. Ajusta objetivos según tus datos reales'
        ],
        additionalNote: 'Con llamadas Bluetooth, notificaciones de apps, control de música, asistente de voz y más de 100 modos deportivos.'
      },
      whatMakesDifferent: [
        {
          title: 'Batería real de hasta 20 días',
          description: 'Hasta 20 días de autonomía en uso normal, modo ahorro aún más. No como otros smartwatches que cargas cada noche.'
        },
        {
          title: 'Pantalla AMOLED premium 1.43"',
          description: 'Resolución 466x466px con Always-On Display. Colores vibrantes, legible bajo el sol. Como smartphones de gama alta.'
        },
        {
          title: 'Monitoreo médico completo',
          description: 'SpO2, frecuencia cardíaca continua, presión arterial, análisis de sueño avanzado, entrenamiento respiratorio. Como un chequeo médico diario.'
        },
        {
          title: 'Precio sin marca premium',
          description: 'Mismo nivel de funciones que smartwatches de 200-300€. Sin pagar el logo de marca. Relación calidad-precio imbatible.'
        }
      ]
    }
  },

  // Accesorios (Recambios de lámparas, correas, bandas)
  'accessories': {
    quickBenefits: [
      { icon: 'Check', text: 'Compatible 100%' },
      { icon: 'Package', text: 'Fácil instalación' },
      { icon: 'Shield', text: 'Calidad original' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué necesitas esto?',
        summary: 'Repuestos originales para que tu dispositivo funcione siempre como el primer día',
        details: [
          'Recambios oficiales fabricados con las mismas especificaciones que las piezas originales. No son imitaciones, son el producto real.',
          'Cada componente está diseñado específicamente para tu dispositivo. Encaja perfecto, funciona perfecto.',
          'Mantener tu dispositivo con piezas originales garantiza su efectividad, seguridad y vida útil. No arriesgues con imitaciones.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: 'Inmediato',
            description: 'Tu dispositivo vuelve a funcionar como nuevo. Misma potencia, misma seguridad, misma efectividad.'
          }
        ],
        usageNote: 'Cambia las piezas según las indicaciones del manual de tu dispositivo.'
      },
      howToUse: {
        steps: [
          'Verifica la compatibilidad con tu dispositivo',
          'Sigue las instrucciones de instalación incluidas',
          'Para lámparas IPL: encaja en el cabezal y gira',
          'Para correas: desliza por los rieles laterales',
          'Para cabezales: presiona y gira hasta el click'
        ],
        additionalNote: 'Si tienes dudas sobre compatibilidad, consulta antes de comprar. Nuestro equipo te ayuda.'
      },
      whatMakesDifferent: [
        {
          title: 'Piezas originales certificadas',
          description: 'No arriesgues con imitaciones que pueden dañar tu dispositivo o ser inefectivas. Estas son las piezas reales.'
        },
        {
          title: 'Garantía de compatibilidad',
          description: 'Si está en nuestra tienda oficial, es compatible con tu dispositivo Garett. Sin sorpresas, sin problemas.'
        },
        {
          title: 'Stock permanente',
          description: 'Siempre disponible cuando lo necesites. No te quedas sin poder usar tu dispositivo porque no hay recambios.'
        },
        {
          title: 'Precio justo',
          description: 'Repuestos a precio honesto. No inflamos los precios porque sabemos que ya has invertido en el dispositivo principal.'
        }
      ]
    }
  },

  // Default - Belleza general
  'default': {
    quickBenefits: [
      { icon: 'Clock', text: '15 min/día' },
      { icon: 'Check', text: 'Resultados en 8-12 semanas' },
      { icon: 'Award', text: 'Tecnología profesional' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Tecnología profesional adaptada para casa',
        details: [
          'Este dispositivo utiliza tecnología de grado profesional, previamente disponible solo en clínicas de belleza y centros estéticos.',
          'Trabaja en las capas profundas de tu piel donde realmente se producen los cambios visibles y duraderos.',
          'No es magia, es ciencia aplicada de forma segura y efectiva. Cada sesión acumula resultados.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '2-4 semanas',
            description: 'Primeras mejoras visibles. Tu piel luce más luminosa y descansada.'
          },
          {
            timeframe: '8-12 semanas',
            description: 'Resultados claros y evidentes. Cambios que tú y los demás notan.'
          },
          {
            timeframe: '3-6 meses',
            description: 'Transformación completa. Resultados óptimos que se mantienen con uso regular.'
          }
        ],
        usageNote: 'La constancia es clave. Usa según las instrucciones para resultados óptimos.'
      },
      howToUse: {
        steps: [
          'Limpia y seca bien tu piel',
          'Aplica gel o sérum según el dispositivo',
          'Sigue los movimientos indicados en el manual',
          'Usa regularmente según frecuencia recomendada',
          'Finaliza con tu rutina habitual de cuidado'
        ],
        additionalNote: 'Lee el manual completo antes del primer uso. Respeta tiempos y frecuencias recomendadas.'
      },
      whatMakesDifferent: [
        {
          title: 'Tecnología profesional en casa',
          description: 'Los mismos tratamientos que cuestan 80-150€/sesión en clínica, ahora disponibles cuando quieras desde tu casa.'
        },
        {
          title: 'Garantía de 3 años',
          description: 'Confiamos en la durabilidad de nuestros dispositivos. 3 años de garantía completa para tu tranquilidad.'
        },
        {
          title: 'Respaldado por El Corte Inglés',
          description: 'Disponible en puntos de venta oficiales. No es una marca desconocida, es calidad certificada.'
        },
        {
          title: 'Inversión vs gasto recurrente',
          description: 'Una inversión única que se paga sola en pocos meses vs tratamientos de clínica que nunca terminan de cobrarse.'
        }
      ]
    }
  }
};

// Helper function to detect product category
export function detectProductCategory(product: any): string {
  // Check for category tag first
  const categoryTag = product.tags?.find((tag: string) => tag.startsWith('category:'));
  if (categoryTag) {
    return categoryTag.split(':')[1];
  }
  
  // Fallback: check product type or handle
  const productType = product.productType?.toLowerCase() || '';
  const handle = product.handle?.toLowerCase() || '';
  const title = product.title?.toLowerCase() || '';
  
  // IPL devices
  if (handle.includes('flash') || handle.includes('cold-white') || handle.includes('ipl') || 
      title.includes('depilación') || title.includes('ipl')) {
    return 'depilacion-ipl';
  }
  
  // Facial massagers
  if (handle.includes('lift') || handle.includes('pretty-face') || handle.includes('fresh-eye') ||
      title.includes('masajeador facial') || title.includes('contorno ojos')) {
    return 'masajeadores-faciales';
  }
  
  // Cleansing
  if (handle.includes('clean') || handle.includes('sonic-scrub') || 
      title.includes('limpieza') || title.includes('cepillo')) {
    return 'limpieza-facial';
  }
  
  // Mesotherapy
  if (handle.includes('calm-skin') || handle.includes('fresh-skin') || handle.includes('serum-skin') ||
      title.includes('mesoterapia') || title.includes('penetración')) {
    return 'mesoterapia';
  }
  
  // Body
  if (handle.includes('body') || handle.includes('cellu') || handle.includes('perfect-body') ||
      title.includes('corporal') || title.includes('celulitis')) {
    return 'corporales';
  }
  
  // Hair care
  if (handle.includes('aeroglow') || handle.includes('plancha') || 
      title.includes('pelo') || title.includes('capilar')) {
    return 'cuidado-capilar';
  }
  
  // Smartwatches
  if (handle.includes('grc') || handle.includes('smartwatch') || handle.includes('reloj') ||
      title.includes('smartwatch') || title.includes('actividad')) {
    return 'smartwatches';
  }
  
  // Accessories
  if (handle.includes('recambio') || handle.includes('correa') || handle.includes('accesorio') ||
      title.includes('lámpara') || title.includes('banda') || title.includes('correa')) {
    return 'accessories';
  }
  
  return 'default';
}

// Main function to get product content
export function getProductContent(categoryOrProduct: string | any, handle?: string): ProductContent {
  let category: string;
  
  // If we receive a full product object, detect category
  if (typeof categoryOrProduct === 'object') {
    category = detectProductCategory(categoryOrProduct);
  } else {
    category = categoryOrProduct;
  }
  
  // Return the corresponding content or default
  return productContentMap[category] || productContentMap['default'];
}
