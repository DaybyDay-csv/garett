import { LucideIcon } from "lucide-react";

export interface ProductContent {
  pdpHeadline?: string;
  pdpSubheadline?: string;
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
    pdpHeadline: 'Reduce hasta un 90% del vello visible en 8 semanas',
    pdpSubheadline: 'Luz pulsada doméstica certificada para depilación permanente desde casa',
    quickBenefits: [
      { icon: 'Zap', text: '400.000 pulsos de luz' },
      { icon: 'Check', text: 'Resultados desde semana 4' },
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

  // Pretty Face - Masajeador facial con EMS (sin vibración ni LED)
  'pretty-face': {
    pdpHeadline: 'Piel más firme y efecto "lifting" en 4 semanas, sin agujas',
    pdpSubheadline: 'Combina EMS y masaje relajante para trabajar flacidez y firmeza desde casa',
    quickBenefits: [
      { icon: 'Zap', text: 'Tecnología EMS Fitness' },
      { icon: 'Heart', text: 'Modo Relajación' },
      { icon: 'Clock', text: 'Resultados desde semana 4' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Masajeador facial innovador con dos modos para el cuidado de tu piel',
        details: [
          'Modo Relajación: masaje suave que relaja los músculos faciales, mejora la circulación sanguínea y favorece la absorción de ingredientes activos de cremas, sérums o mascarillas.',
          'Modo EMS Fitness: restaura la firmeza y elasticidad de la piel. Estimula la producción de colágeno y elastina, revitaliza la piel y suaviza las líneas de expresión y arrugas. Restaura el óvalo facial y promueve la absorción de ingredientes activos.',
          'El masaje abre los poros permitiendo que los cosméticos penetren más profundamente y actúen con mayor eficacia.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '2-4 semanas',
            description: 'Piel más relajada y descansada. Los productos se absorben mejor. Mejora visible en la circulación sanguínea.'
          },
          {
            timeframe: '8-12 semanas',
            description: 'Mayor firmeza y elasticidad. Líneas de expresión suavizadas. Óvalo facial más definido y cutis radiante.'
          },
          {
            timeframe: '3-6 meses',
            description: 'Piel más sana y radiante. Resultados visibles continuos. Momentos de relajación placentera.'
          }
        ],
        usageNote: 'Usa regularmente para obtener beneficios en la apariencia del rostro, cuello y escote. Una mejor circulación sanguínea ayuda a suministrar más nutrientes a las células de la piel.'
      },
      howToUse: {
        steps: [
          'Limpia tu rostro a fondo',
          'Aplica tu crema, sérum o mascarilla favorita generosamente',
          'Selecciona el modo: Relajación para desconectar o EMS Fitness para tonificar',
          'Masajea suavemente hacia arriba y hacia fuera',
          'Zonas clave: rostro, cuello y escote',
          'Disfruta de los momentos de relajación placentera que proporciona el dispositivo'
        ],
        additionalNote: 'No usar sobre heridas activas.'
      },
      whatMakesDifferent: [
        {
          title: 'Dos modos en un solo dispositivo',
          description: 'Modo Relajación para desconectar tras un largo día y Modo EMS Fitness para tonificar y rejuvenecer. Adaptado a lo que tu piel necesita en cada momento.'
        },
        {
          title: 'Máxima absorción de productos',
          description: 'Los poros se abren permitiendo que tus cosméticos penetren más profundamente. Tus productos caros finalmente funcionan al 100% de su potencial.'
        },
        {
          title: 'Resultados profesionales en casa',
          description: 'Una sesión de masaje facial en clínica cuesta 60-100€. Con pocos usos ya has recuperado la inversión y puedes disfrutar de momentos de relajación cuando quieras.'
        }
      ]
    }
  },

  // Masajeadores Faciales (Lift Skin, Fresh Eye) - con vibración y LED
  'masajeadores-faciales': {
    pdpHeadline: 'Piel más firme y efecto "lifting" en 4 semanas, sin agujas',
    pdpSubheadline: 'Vibración sónica + EMS + LED para reafirmar y tonificar desde casa, en sesiones de 10 minutos',
    quickBenefits: [
      { icon: 'Clock', text: 'Resultados desde semana 4' },
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
    pdpHeadline: 'Cutis limpio y receptivo a tus cremas',
    pdpSubheadline: 'Te guiamos hacia una limpieza profunda que ayuda a que tus tratamientos penetren mejor',
    quickBenefits: [
      { icon: 'Clock', text: '1 min al día' },
      { icon: 'Sparkles', text: 'Limpieza 10x más profunda' },
      { icon: 'Check', text: 'Para pieles maduras y sensibles' }
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
    pdpHeadline: 'Piel más firme y efecto "lifting" en 4 semanas, sin agujas',
    pdpSubheadline: 'Mesoterapia sin agujas, sin dolor. Utiliza la misma base tecnológica que los tratamientos de cabina',
    quickBenefits: [
      { icon: 'Droplets', text: 'Absorción 90% mayor' },
      { icon: 'Clock', text: 'Resultados desde semana 4' },
      { icon: 'Check', text: 'Sin agujas, sin dolor' }
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

  // AeroGlow - Plancha de pelo con tecnología iónica
  'cuidado-capilar': {
    pdpHeadline: 'Pelo liso y protegido, sin daños por calor',
    pdpSubheadline: 'Peina y seca con aire, sin quemar tu melena. Tecnología pensada para pelo maduro y teñido',
    quickBenefits: [
      { icon: 'Wind', text: 'Seca y alisa con aire' },
      { icon: 'Shield', text: 'Sin daño térmico' },
      { icon: 'Sparkles', text: 'Para pelo teñido y maduro' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Cómo funciona?',
        summary: 'Plancha de aire con ionización y motor profesional',
        details: [
          'Motor BLDC 110.000 RPM genera flujo de aire de 11.2 m/s que seca y alisa al mismo tiempo.',
          'Iones negativos sellan las cutículas del cabello, eliminando el frizz y reteniendo la hidratación natural.',
          '5 niveles de temperatura (80-150°C) con control inteligente que ajusta según humedad del cabello.',
          'Modo húmedo/seco: úsala directamente después del lavado sin secador previo.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: 'Primera aplicación',
            description: 'Cabello liso y brillante en la mitad del tiempo. Frizz eliminado por 24h+ incluso con humedad.'
          },
          {
            timeframe: '1 semana',
            description: 'Tiempo de peinado reducido a 10-15 minutos. Cabello más manejable que "recuerda" el liso.'
          },
          {
            timeframe: '1 mes',
            description: 'Cabello más sano por usar temperaturas bajas. Menos puntas abiertas. Brillo natural recuperado.'
          }
        ],
        usageNote: 'Usa 2-3 veces por semana. Temperatura baja (80-110°C) para cabello fino, media-alta (120-150°C) para cabello grueso.'
      },
      howToUse: {
        steps: [
          'Lava tu cabello (puede quedar húmedo, no necesitas secarlo)',
          'Selecciona temperatura según tu tipo de cabello en la pantalla LCD',
          'Divide el cabello en secciones de 3cm',
          'Pasa lentamente desde 1cm de la raíz hasta las puntas',
          'Una sola pasada por sección es suficiente',
          'Finaliza con aire frío para sellar el resultado'
        ],
        additionalNote: 'El modo inteligente detecta humedad y ajusta temperatura automáticamente. Cable giratorio 360° para máxima comodidad.'
      },
      whatMakesDifferent: [
        {
          title: 'Plancha de aire profesional',
          description: 'Combina potencia de secador (1400-1600W) con precisión de plancha. Alisa mientras seca = mitad del tiempo.'
        },
        {
          title: 'Iones negativos reales',
          description: 'No es ionización simbólica. Genera millones de iones que neutralizan el frizz a nivel molecular.'
        },
        {
          title: 'Temperatura inteligente con LCD',
          description: 'Muestra temperatura exacta en tiempo real. Detecta humedad del cabello y ajusta potencia automáticamente.'
        },
        {
          title: 'Seguridad incorporada',
          description: 'Apagado automático. Bloqueo de placas. Control de temperatura constante. Diseñada para uso diario sin daño.'
        }
      ]
    }
  },

  // Multi Care Brush - Cepillo multifuncional con EMS
  'multi-care-brush': {
    quickBenefits: [
      { icon: 'Zap', text: '5 niveles EMS' },
      { icon: 'Sparkles', text: 'Fototerapia integrada' },
      { icon: 'Grip', text: '3 cabezales magnéticos' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Cómo funciona?',
        summary: 'Electroestimulación + fototerapia + aplicación de activos',
        details: [
          'EMS (5 niveles): electroestimulación que relaja músculos, oxigena tejidos y estimula circulación en cuero cabelludo.',
          'Fototerapia LED: luz roja que penetra hasta los folículos pilosos, activando el crecimiento y fortaleciendo la raíz.',
          'Aplicación directa de cosméticos: las cerdas aplican sérums/tratamientos directamente en cuero cabelludo con masaje.',
          '3 cabezales magnéticos intercambiables: cuero cabelludo (tratamiento capilar), rostro (lifting), cuerpo (masaje profundo).'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '1-2 semanas',
            description: 'Cuero cabelludo más irrigado. Reducción de descamación. Absorción visible de tratamientos aplicados.'
          },
          {
            timeframe: '4-6 semanas',
            description: 'Cabello más fuerte desde la raíz. Menos caída al cepillar. Mayor volumen y densidad aparente.'
          },
          {
            timeframe: '3 meses',
            description: 'Folículos pilosos fortalecidos. Cabello nuevo más grueso. Reducción notable de calvicie o zonas débiles.'
          }
        ],
        usageNote: 'Usa 3 veces por semana en cuero cabelludo con tu tratamiento anticaída. También funciona en rostro y cuerpo.'
      },
      howToUse: {
        steps: [
          'Selecciona el cabezal adecuado (cuero cabelludo/rostro/cuerpo)',
          'Aplica tu sérum o tratamiento capilar en la zona',
          'Enciende el dispositivo y selecciona nivel EMS (1-5)',
          'Masajea en movimientos circulares durante 5-10 minutos',
          'El dispositivo aplica el producto mientras estimula con EMS y luz',
          'Usa 3 veces por semana para resultados óptimos'
        ],
        additionalNote: 'Empieza con nivel EMS bajo (1-2) y aumenta según tolerancia. Ideal con tratamientos anticaída o sérums capilares.'
      },
      whatMakesDifferent: [
        {
          title: '3 dispositivos en 1',
          description: 'Cuero cabelludo, rostro y cuerpo. Cabezales magnéticos que cambias en 1 segundo. Inversión que multiplica funciones.'
        },
        {
          title: 'EMS de 5 niveles ajustable',
          description: 'No es vibración genérica. Electroestimulación real que relaja músculos y estimula circulación profunda.'
        },
        {
          title: 'Fototerapia LED integrada',
          description: 'Luz roja que penetra hasta folículos pilosos. Tecnología usada en clínicas de tricología profesional.'
        },
        {
          title: 'Aplicación efectiva de productos',
          description: 'Tus tratamientos capilares penetran de verdad. No se quedan en superficie. Multiplica la eficacia de tus cosméticos.'
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
      { icon: 'Clock', text: 'Fácil de usar' },
      { icon: 'Check', text: 'Resultados visibles' },
      { icon: 'Award', text: 'Calidad premium' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Tecnología avanzada para resultados profesionales',
        details: [
          'Este dispositivo utiliza tecnología de última generación diseñada para ofrecerte los mejores resultados.',
          'Desarrollado con los más altos estándares de calidad y seguridad.',
          'Fácil de usar en casa con resultados profesionales. Cada uso te acerca más a tus objetivos.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: '2-4 semanas',
            description: 'Primeras mejoras visibles. Notarás la diferencia desde el inicio.'
          },
          {
            timeframe: '8-12 semanas',
            description: 'Resultados claros y evidentes. Cambios que tú y los demás notan.'
          },
          {
            timeframe: '3-6 meses',
            description: 'Resultados óptimos. Mejora continua con uso regular.'
          }
        ],
        usageNote: 'La constancia es clave. Usa según las instrucciones para resultados óptimos.'
      },
      howToUse: {
        steps: [
          'Lee el manual de instrucciones completo',
          'Prepara según las indicaciones específicas',
          'Sigue los pasos recomendados por el fabricante',
          'Usa regularmente según frecuencia recomendada',
          'Mantén el dispositivo limpio y en buen estado'
        ],
        additionalNote: 'Consulta el manual completo antes del primer uso. Respeta tiempos y frecuencias recomendadas.'
      },
      whatMakesDifferent: [
        {
          title: 'Tecnología premium',
          description: 'Dispositivo de alta calidad con características profesionales disponibles para uso en casa.'
        },
        {
          title: 'Garantía de 3 años',
          description: 'Confiamos en la durabilidad de nuestros dispositivos. 3 años de garantía completa para tu tranquilidad.'
        },
        {
          title: 'Marca reconocida',
          description: 'Garett es una marca de confianza con presencia en El Corte Inglés y principales retailers.'
        },
        {
          title: 'Inversión inteligente',
          description: 'Una inversión única que ofrece resultados duraderos vs tratamientos profesionales recurrentes.'
        }
      ]
    }
  }
};

// Helper function to detect product category
export function detectProductCategory(product: any): string {
  const handle = product.handle?.toLowerCase() || '';
  const title = product.title?.toLowerCase() || '';
  const productType = product.productType?.toLowerCase() || '';
  
  // ===== HAIR CARE - SPECIFIC PRODUCTS FIRST (before generic tags) =====
  
  // ===== SPECIFIC PRODUCTS FIRST (highest priority) =====
  
  // Pretty Face - Masajeador facial sin vibración ni LED
  if (handle.includes('pretty-face') || handle.includes('dispositivo-mesoterapia-pretty-face')) {
    return 'pretty-face';
  }
  
  // Multi Care Brush - Specific detection
  if (handle.includes('multi-care') || handle.includes('multicare') || handle.includes('multi_care') ||
      handle.includes('multi care') || title.includes('multi care') || title.includes('multi cuidado') ||
      title.includes('multicuidado')) {
    return 'multi-care-brush';
  }
  
  // AeroGlow - Specific detection
  if (handle.includes('aeroglow') || title.includes('aeroglow') ||
      handle.includes('plancha-de-pelo') || handle.includes('plancha-pelo') ||
      (handle.includes('plancha') && handle.includes('pelo'))) {
    return 'cuidado-capilar';
  }
  
  // ===== GENERIC CATEGORY TAGS (after specific products) =====
  const categoryTag = product.tags?.find((tag: string) => tag.startsWith('category:'));
  if (categoryTag) {
    const category = categoryTag.split(':')[1];
    // Normalize category names
    if (category === 'capilar') return 'cuidado-capilar';
    return category;
  }
  
  // IPL devices
  if (handle.includes('flash') || handle.includes('cold-white') || handle.includes('ipl') || 
      title.includes('depilación') || title.includes('ipl')) {
    return 'depilacion-ipl';
  }
  
  // Facial massagers (otros masajeadores con vibración y LED)
  // Note: Pretty Face is handled at the top as specific product
  if (handle.includes('lift') || handle.includes('fresh-eye') ||
      title.includes('masajeador facial') || title.includes('contorno ojos')) {
    return 'masajeadores-faciales';
  }
  
  // Mesotherapy
  if (handle.includes('calm-skin') || handle.includes('fresh-skin') || handle.includes('serum-skin') ||
      handle.includes('mesoterapia') || title.includes('mesoterapia') || title.includes('penetración')) {
    return 'mesoterapia';
  }
  
  // Cleansing (exclude Multi Care Brush)
  if ((handle.includes('clean') || handle.includes('sonic-scrub') || title.includes('limpieza')) &&
      !handle.includes('multi') && !title.includes('multi')) {
    return 'limpieza-facial';
  }
  
  // Body
  if (handle.includes('body') || handle.includes('cellu') || handle.includes('perfect-body') ||
      title.includes('corporal') || title.includes('celulitis')) {
    return 'corporales';
  }
  
  // Generic hair care fallback (only if not detected as specific product above)
  if (handle.includes('capilar') || handle.includes('hair') || handle.includes('secador') ||
      title.includes('capilar') || title.includes('cabello') || title.includes('pelo')) {
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
