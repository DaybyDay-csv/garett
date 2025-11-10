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
      { icon: 'Sparkles', text: 'Efecto lifting inmediato' },
      { icon: 'Zap', text: 'RF + EMS dual' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Tecnología dual que trabaja en capas profundas y músculos',
        details: [
          'Radiofrecuencia que calienta las capas profundas de tu piel (45-50°C) estimulando la producción natural de colágeno. Es como decirle a tu piel que vuelva a fabricar su propia estructura de soporte.',
          'EMS (electroestimulación) que tonifica los músculos faciales como si entrenasen en el gym. Los 43 músculos de tu cara también necesitan ejercicio.',
          'El resultado: piel más firme desde dentro + contornos faciales más definidos. No es tensión temporal, es reactivación real.'
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
          title: 'Tecnología dual RF + EMS',
          description: 'Mientras otros dispositivos solo hacen una cosa, este trabaja en dos niveles simultáneamente. Doble tecnología = doble efectividad.'
        },
        {
          title: 'Resultados profesionales en casa',
          description: 'Una sesión de RF en clínica cuesta 80-120€. Con 3 usos ya has recuperado la inversión. Y puedes usarlo años.'
        },
        {
          title: 'Calor controlado y seguro',
          description: 'La temperatura se mantiene en el rango terapéutico óptimo (45-50°C). Efectivo pero totalmente seguro para uso doméstico.'
        },
        {
          title: 'Compatible con tus productos favoritos',
          description: 'Potencia la absorción de sérums y cremas. Ese producto caro que tienes ahora funciona 3 veces mejor.'
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
      { icon: 'Zap', text: 'Secado rápido' },
      { icon: 'Sparkles', text: 'Brillo de salón' },
      { icon: 'Shield', text: 'Sin daño térmico' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Tecnología infrarroja que cuida mientras alisa',
        details: [
          'Tecnología infrarroja que calienta tu cabello desde el interior de la fibra capilar, sellando la cutícula y creando ese brillo espejo natural.',
          'Mientras las planchas tradicionales queman la superficie del pelo (por eso se pone áspero), esta trabaja con calor inteligente que respeta la estructura.',
          'Placas de cerámica de turmalina que distribuyen el calor uniformemente. No hay puntos calientes que quemen zonas. Todo tu pelo recibe el mismo tratamiento de salón.'
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
          title: 'Infrarrojo vs calor directo tradicional',
          description: 'Es como cocinar a baja temperatura vs freír. El resultado final es igual de bueno, pero el proceso es mucho más respetuoso.'
        },
        {
          title: 'Placas de cerámica premium',
          description: 'Deslizamiento perfecto sin enganches ni tirones. Tu pelo se desliza como la seda, no se arrastra.'
        },
        {
          title: 'Calentamiento rápido y temperatura estable',
          description: 'Lista en 30 segundos. La temperatura no fluctúa durante el uso. Cada pasada es igual de efectiva que la primera.'
        },
        {
          title: 'Larga duración del resultado',
          description: 'El alisado aguanta hasta el próximo lavado, incluso con humedad. No se abre al cabo de 2 horas.'
        }
      ]
    }
  },

  // Smartwatches (GRC Activity, Men, Women, Kids)
  'smartwatches': {
    quickBenefits: [
      { icon: 'Battery', text: 'Batería 7 días' },
      { icon: 'Activity', text: 'Monitoreo 24/7' },
      { icon: 'Shield', text: 'Resistente al agua IP68' }
    ],
    dropdowns: {
      howItWorks: {
        title: '¿Por qué funciona?',
        summary: 'Sensores avanzados que monitorizan tu salud en tiempo real',
        details: [
          'Sensores ópticos avanzados que registran tu frecuencia cardíaca, oxígeno en sangre, pasos, calorías y calidad de sueño las 24 horas del día.',
          'Toda esta información se sincroniza automáticamente con tu móvil, donde una app intuitiva te muestra patrones, tendencias y recomendaciones personalizadas.',
          'Es como tener un entrenador personal y un médico en tu muñeca. Los datos te ayudan a tomar mejores decisiones sobre tu salud cada día.'
        ]
      },
      expectedResults: {
        phases: [
          {
            timeframe: 'Inmediato',
            description: 'Conoces tus patrones reales de sueño, actividad y frecuencia cardíaca. Los números no mienten.'
          },
          {
            timeframe: '2-4 semanas',
            description: 'Empiezas a mejorar tus hábitos de forma consciente. Más pasos, mejor sueño, más actividad física.'
          },
          {
            timeframe: '3 meses',
            description: 'Objetivos fitness alcanzados gracias a datos reales. Has creado hábitos saludables sostenibles.'
          }
        ],
        usageNote: 'Llévalo puesto día y noche para datos completos. Sincroniza con la app cada mañana para ver tu evolución.'
      },
      howToUse: {
        steps: [
          'Carga el reloj completamente (tarda 2h)',
          'Descarga la app GRC Smartwatch (iOS/Android)',
          'Conecta por Bluetooth siguiendo las instrucciones',
          'Ajusta correa para que quede cómoda pero firme',
          'Personaliza notificaciones y objetivos',
          'Vive tu día normalmente, él hace el resto'
        ],
        additionalNote: 'Limpia el sensor en la parte trasera cada semana para lecturas precisas. Resistente al agua pero no presiones botones bajo el agua.'
      },
      whatMakesDifferent: [
        {
          title: 'Batería de 7 días reales',
          description: 'No como otros smartwatches que mueren en 1 día y medio. Una carga a la semana y olvídate. Vive sin ansiedad de batería.'
        },
        {
          title: 'Tracking de salud completo',
          description: 'Frecuencia cardíaca, oxígeno en sangre, calidad de sueño, pasos, calorías, 12 modos deportivos. Todo lo que necesitas para cuidarte.'
        },
        {
          title: 'Notificaciones inteligentes',
          description: 'Llamadas, mensajes, redes sociales. Ve lo importante sin sacar el móvil del bolsillo. Filtras mejor tu atención.'
        },
        {
          title: 'Precio honesto y sin trampas',
          description: 'Calidad premium sin pagar la marca. Las mismas funciones que relojes de 300€, pero con precio justo. No estás pagando publicidad.'
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
