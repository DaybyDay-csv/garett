import type { ProductContent } from "./productContent";

// Contenido de PDP POR PRODUCTO (clave = handle del catálogo local).
// Extraído de garett.eu (fichas reales de cada dispositivo) y adaptado a
// la estructura de alta conversión de Garett España.
// Los productos sin entrada específica caen al contenido por categoría.
export const PRODUCT_CONTENT_BY_HANDLE: Record<string, ProductContent> = {
  // ===== Masajeadores faciales =====
  "fresh-eye": {
    pdpHeadline: "Mirada descansada: menos ojeras y bolsas en semanas",
    pdpSubheadline: "Masajeador de contorno de ojos con vibración y luz LED para reducir ojeras, bolsas y líneas de expresión.",
    quickBenefits: [
      { icon: "Zap", text: "Masaje vibrante para el contorno" },
      { icon: "Sparkles", text: "Luz LED antiedad" },
      { icon: "Droplets", text: "Infusión de activos" },
      { icon: "Check", text: "Antibacteriano · USB-C" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Combina vibración y microcorriente para activar la microcirculación del contorno del ojo: descongestiona, drena las bolsas y reduce las ojeras.",
        details: [
          "La vibración estimula la circulación y ayuda a drenar la retención de líquido bajo el ojo.",
          "La luz LED favorece la regeneración de la piel fina del contorno.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Contorno más descansado y deshinchado al despertar." },
          { timeframe: "4 semanas", description: "Bolsas y ojeras visiblemente reducidas." },
          { timeframe: "8 semanas", description: "Mirada más luminosa y despejada." },
        ],
        usageNote: "Úsalo de forma constante sobre la piel limpia para mejores resultados.",
      },
      howToUse: {
        steps: [
          "Aplica tu contorno de ojos o sérum habitual.",
          "Desliza el dispositivo por la zona orbital durante 2-3 minutos.",
          "Úsalo 1-2 veces al día.",
        ],
        additionalNote: "Incluye: dispositivo, cable de carga USB-C y manual.",
      },
      whatMakesDifferent: [
        { title: "Antibacteriano", description: "Diseñado para la zona más sensible del rostro, con higiene reforzada." },
        { title: "Carga USB-C", description: "Carga cómoda y universal." },
      ],
    },
  },

  "lift-skin": {
    pdpHeadline: "Reafirma y redefine el óvalo facial desde casa",
    pdpSubheadline: "Masajeador facial con vibración sónica, pulsos EMS y calor para reafirmar la piel y definir el óvalo.",
    quickBenefits: [
      { icon: "Zap", text: "Vibración sónica" },
      { icon: "Activity", text: "Pulsos EMS" },
      { icon: "Thermometer", text: "Calor terapéutico" },
      { icon: "Sun", text: "Terapia de fotones" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La vibración de alta frecuencia, los pulsos EMS y el calor trabajan juntos para estimular la musculatura facial, activar la circulación y reafirmar la piel.",
        details: [
          "Los pulsos EMS estimulan los músculos del rostro, ayudando a tonificar el óvalo.",
          "El calor relaja los tejidos y favorece la absorción de tus cosméticos.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel con más tono y sensación de frescura." },
          { timeframe: "4 semanas", description: "Óvalo facial más definido y contornos más marcados." },
          { timeframe: "8 semanas", description: "Piel visiblemente más firme y tersa." },
        ],
        usageNote: "Resultados progresivos con uso regular.",
      },
      howToUse: {
        steps: [
          "Limpia y seca el rostro.",
          "Desliza el cabezal por mejillas, mandíbula y cuello en movimientos ascendentes.",
          "Usa 5-10 minutos al día, idealmente con tu sérum.",
        ],
        additionalNote: "Incluye: dispositivo, manual PL/EN, cable de carga y comprobante de compra.",
      },
      whatMakesDifferent: [
        { title: "4 tecnologías en 1", description: "Vibración, EMS, calor y fotones en un solo gesto." },
        { title: "Uso diario", description: "Rutina rápida que se adapta a tu día a día." },
      ],
    },
  },

  "lift-skin-pro": {
    pdpHeadline: "Lifting de rostro y cuello con tecnología 4-en-1",
    pdpSubheadline: "Masajeador sónico Pro con EMS, luz LED roja/azul/violeta y compresa tibia para reducir arrugas y reafirmar.",
    quickBenefits: [
      { icon: "Sparkles", text: "Lifting facial y de cuello" },
      { icon: "Activity", text: "Masaje relajante EMS" },
      { icon: "Sun", text: "Luz LED roja, azul y violeta" },
      { icon: "Thermometer", text: "Compresa tibia" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Combina varias tecnologías avanzadas que nutren en profundidad y mejoran visiblemente el estado de la piel, aportando un efecto lifting sin salir de casa.",
        details: [
          "El EMS tonifica la musculatura del rostro y el cuello.",
          "La triple luz LED actúa sobre arrugas, imperfecciones y luminosidad.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más receptiva y tonificada." },
          { timeframe: "4 semanas", description: "Arrugas y líneas de expresión atenuadas." },
          { timeframe: "8 semanas", description: "Efecto lifting visible en rostro y cuello." },
        ],
        usageNote: "Ideal para integrar en tu rutina de noche.",
      },
      howToUse: {
        steps: [
          "Selecciona el modo que prefieras.",
          "Desliza por el rostro y el cuello siguiendo las líneas de masaje.",
          "Úsalo 10 minutos, 4-5 veces por semana.",
        ],
        additionalNote: "Incluye: dispositivo, manual PL/EN, cable de carga y comprobante de compra.",
      },
      whatMakesDifferent: [
        { title: "4-en-1 profesional", description: "La versión más completa de la línea de masajeadores." },
        { title: "Cubre cuello", description: "Trata la zona del cuello, clave en el envejecimiento." },
      ],
    },
  },

  "pretty-face": {
    pdpHeadline: "EMS Fitness: entrena tu rostro y eleva tu piel",
    pdpSubheadline: "Masajeador facial con electroestimulación EMS Fitness, masaje mecánico y efecto lifting.",
    quickBenefits: [
      { icon: "Activity", text: "Electroestimulación EMS Fitness" },
      { icon: "Zap", text: "Masaje mecánico" },
      { icon: "Sparkles", text: "Efecto lifting" },
      { icon: "Droplets", text: "Infusión de activos" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La electroestimulación EMS ejercita los músculos faciales como un gimnasio para la cara, mientras el masaje mecánico activa la circulación y el lifting.",
        details: [
          "El EMS fortalece la musculatura, mejorando la firmeza.",
          "El masaje favorece la absorción de tus sérums.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Sensación de piel más tonificada." },
          { timeframe: "4 semanas", description: "Contornos más definidos." },
          { timeframe: "8 semanas", description: "Efecto lifting progresivo." },
        ],
        usageNote: "Combínalo con tu sérum favorito para potenciar resultados.",
      },
      howToUse: {
        steps: [
          "Aplica un sérum o gel conductor.",
          "Desliza el dispositivo por el rostro en movimientos ascendentes.",
          "Usa 5-10 minutos al día.",
        ],
        additionalNote: "Incluye: dispositivo y manual de uso.",
      },
      whatMakesDifferent: [
        { title: "EMS Fitness", description: "Tecnología de electroestimulación pensada para tonificar." },
        { title: "Doble acción", description: "Masaje mecánico + electroestimulación." },
      ],
    },
  },

  "beauty-lift": {
    pdpHeadline: "Lifting facial sencillo y eficaz en casa",
    pdpSubheadline: "Dispositivo de lifting facial con estimulación para reafirmar y tonificar la piel.",
    quickBenefits: [
      { icon: "Sparkles", text: "Efecto lifting" },
      { icon: "Zap", text: "Estimulación facial" },
      { icon: "Heart", text: "Reafirma la piel" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La estimulación ayuda a tonificar la musculatura facial y a mejorar la firmeza de la piel de forma progresiva.",
        details: [
          "Estimula los tejidos para un aspecto más terso.",
          "Rutina cómoda que se integra en tu cuidado diario.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más receptiva." },
          { timeframe: "4 semanas", description: "Firmeza mejorada." },
          { timeframe: "8 semanas", description: "Efecto lifting visible." },
        ],
        usageNote: "Usa de forma constante para mantener los resultados.",
      },
      howToUse: {
        steps: [
          "Limpia el rostro antes de usarlo.",
          "Desliza por las zonas a tratar en movimientos ascendentes.",
          "Usa varios minutos al día.",
        ],
        additionalNote: "Incluye: dispositivo y manual.",
      },
      whatMakesDifferent: [
        { title: "Sencillo", description: "Ideal para iniciarse en los dispositivos de lifting." },
        { title: "Cuidado diario", description: "Perfecto para mantener la rutina facial." },
      ],
    },
  },

  // ===== Limpieza facial =====
  "multiclean": {
    pdpHeadline: "Limpieza profunda + ionización + LED en un cepillo",
    pdpSubheadline: "Dispositivo 4-en-1: limpieza sónica, ionización, luz LED roja y compresa tibia (termolifting).",
    quickBenefits: [
      { icon: "Waves", text: "Vibraciones sónicas" },
      { icon: "Droplets", text: "Ionización de activos" },
      { icon: "Sun", text: "Luz LED roja" },
      { icon: "Thermometer", text: "Termolifting" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Limpia la piel mediante vibraciones sónicas, inyecta los activos con ionización y estimula la regeneración con luz LED y calor.",
        details: [
          "2 modos de funcionamiento y 3 niveles de potencia.",
          "IPX7: resistente al agua para usar en la ducha.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "1 semana", description: "Piel más limpia y poros menos visibles." },
          { timeframe: "4 semanas", description: "Mayor absorción de tus cosméticos." },
          { timeframe: "8 semanas", description: "Cutis más luminoso y uniforme." },
        ],
        usageNote: "500 mAh · dimensiones 71×60×36 mm · 106 g.",
      },
      howToUse: {
        steps: [
          "Humedece el rostro y aplica tu limpiador.",
          "Masajea en círculos con el cabezal sónico.",
          "Termina con el modo ionización y tu sérum.",
        ],
        additionalNote: "Incluye: dispositivo, funda protectora/estación de carga y manual PL/EN.",
      },
      whatMakesDifferent: [
        { title: "4 funciones en 1", description: "Limpieza, ionización, LED y termolifting." },
        { title: "IPX7", description: "Impermeable para uso en la ducha." },
      ],
    },
  },

  "breeze-scrub": {
    pdpHeadline: "Peeling por cavitación: piel nueva sin dolor",
    pdpSubheadline: "Exfoliador facial por cavitación ultrasónica con sonoforesis y humidificación automática por vapor.",
    quickBenefits: [
      { icon: "Waves", text: "Cavitación ultrasónica" },
      { icon: "Droplets", text: "Sonoforesis de activos" },
      { icon: "Wind", text: "Vapor hidratante" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Elimina el exceso de sebo, impurezas y células muertas de forma indolora mediante cavitación ultrasónica, dejando la piel más suave.",
        details: [
          "La sonoforesis ayuda a penetrar los activos en profundidad.",
          "El vapor mantiene la piel hidratada durante el tratamiento.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "1 semana", description: "Piel más suave y textura refinada." },
          { timeframe: "4 semanas", description: "Poros limpios y luminosidad." },
          { timeframe: "8 semanas", description: "Tez uniforme y radiante." },
        ],
        usageNote: "No usar sobre acné activo o piel irritada.",
      },
      howToUse: {
        steps: [
          "Limpia y seca el rostro.",
          "Desliza la espátula por la piel con suavidad.",
          "Aplica tu sérum tras el tratamiento.",
        ],
        additionalNote: "Incluye: dispositivo, 2 pipetas, manual PL/EN y cable de carga.",
      },
      whatMakesDifferent: [
        { title: "Cavitación", description: "Exfoliación profunda sin abrasión mecánica." },
        { title: "Con vapor", description: "Hidratación automática durante el uso." },
      ],
    },
  },

  "refresh-scrub": {
    pdpHeadline: "Limpieza, rejuvenecimiento y EMS en una paleta",
    pdpSubheadline: "Dispositivo de limpieza por cavitación con sonoforesis, EMS y mejora del flujo sanguíneo y linfático.",
    quickBenefits: [
      { icon: "Waves", text: "Limpieza por cavitación" },
      { icon: "Droplets", text: "Sonoforesis de activos" },
      { icon: "Activity", text: "Rejuvenecimiento EMS" },
      { icon: "Sparkles", text: "Paleta perfilada fácil de usar" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Limpia mediante cavitación ultrasónica, inyecta activos por sonoforesis y mejora el flujo sanguíneo y linfático con EMS.",
        details: [
          "La cavitación retira impurezas y células muertas.",
          "El EMS reactiva la piel y mejora su aspecto.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "1 semana", description: "Piel más limpia y fresca." },
          { timeframe: "4 semanas", description: "Mejor circulación y tono." },
          { timeframe: "8 semanas", description: "Piel rejuvenecida y luminosa." },
        ],
        usageNote: "La paleta perfilada facilita el manejo en todas las zonas.",
      },
      howToUse: {
        steps: [
          "Humedece la piel o usa sobre el limpiador.",
          "Desliza la paleta en movimientos suaves.",
          "Aplica tu tratamiento habitual después.",
        ],
        additionalNote: "Incluye: dispositivo y manual.",
      },
      whatMakesDifferent: [
        { title: "Paleta perfilada", description: "Alcance cómodo en zonas delicadas." },
        { title: "3 tecnologías", description: "Cavitación + sonoforesis + EMS." },
      ],
    },
  },

  // ===== Mesoterapia =====
  "calm-skin": {
    pdpHeadline: "Mesoterapia calmante con frío y calor",
    pdpSubheadline: "Dispositivo de mesoterapia sin agujas con EMS, compresa fría/tibia, luz roja/azul y efecto lifting.",
    quickBenefits: [
      { icon: "Activity", text: "Electroestimulación EMS" },
      { icon: "Thermometer", text: "Compresa fría / tibia" },
      { icon: "Sparkles", text: "Estiramiento facial" },
      { icon: "Sun", text: "Luz roja y azul" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Combina electroestimulación, compresa fría/tibia y luz LED para limpiar, hidratar y calmar la piel mientras inyecta activos.",
        details: [
          "La compresa fría descongestiona; la tibia relaja y abre los poros.",
          "La luz azul calma; la roja estimula la regeneración.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más calmada e hidratada." },
          { timeframe: "4 semanas", description: "Mejor absorción de activos." },
          { timeframe: "8 semanas", description: "Piel más firme y luminosa." },
        ],
        usageNote: "Ideal para pieles sensibles y reactivas.",
      },
      howToUse: {
        steps: [
          "Aplica tu sérum sobre la piel.",
          "Selecciona el modo frío o caliente.",
          "Desliza por el rostro durante 5-10 minutos.",
        ],
        additionalNote: "Incluye: dispositivo, manual EN/PL, soporte blanco y cable tipo C.",
      },
      whatMakesDifferent: [
        { title: "Frío + calor", description: "Compresa térmica para tratar según la necesidad." },
        { title: "Calma la piel", description: "Pensado para pieles sensibles." },
      ],
    },
  },

  "fresh-skin-pro": {
    pdpHeadline: "Mesoterapia Pro: RF, EMS, frío, calor y LED",
    pdpSubheadline: "Dispositivo de mesoterapia sin agujas con modo RF, EMS, luz LED roja/azul, compresa fría/tibia y acción antiarrugas.",
    quickBenefits: [
      { icon: "Flame", text: "Modo RF" },
      { icon: "Activity", text: "Electroestimulación EMS" },
      { icon: "Sun", text: "Luz LED roja y azul" },
      { icon: "Thermometer", text: "Frío y calor" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Nutre y reaviva la piel apagada combinando radiofrecuencia, EMS y fototerapia, con acción antiarrugas y calmante de irritaciones.",
        details: [
          "La radiofrecuencia ayuda a tensar y reafirmar.",
          "El EMS y el LED actúan sobre arrugas y luminosidad.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más nutrida y con más brillo." },
          { timeframe: "4 semanas", description: "Arrugas atenuadas y tono mejorado." },
          { timeframe: "8 semanas", description: "Piel visiblemente más firme y luminosa." },
        ],
        usageNote: "Combina con tu sérum para maximizar la penetración.",
      },
      howToUse: {
        steps: [
          "Limpia y seca el rostro.",
          "Aplica un sérum y selecciona el modo.",
          "Desliza el dispositivo 10 minutos, 4-5 veces por semana.",
        ],
        additionalNote: "Incluye: dispositivo, manual PL/EN, cable de carga USB-C y comprobante de compra.",
      },
      whatMakesDifferent: [
        { title: "Radiofrecuencia", description: "La tecnología más completa de la gama mesoterapia." },
        { title: "Frío y calor", description: "Tratamiento térmico dual." },
      ],
    },
  },

  "bright-skin": {
    pdpHeadline: "Luz roja, violeta y azul + EMS para iluminar",
    pdpSubheadline: "Dispositivo de mesoterapia sin agujas con fototerapia LED (roja, violeta y azul), corrientes EMS y vibraciones sónicas.",
    quickBenefits: [
      { icon: "Sun", text: "Fototerapia LED triple" },
      { icon: "Activity", text: "Corrientes EMS" },
      { icon: "Waves", text: "Vibraciones sónicas" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La fototerapia de triple color trabaja la luminosidad y el tono de la piel, mientras el EMS y la vibración sónica estimulan y tonifican.",
        details: [
          "La luz violeta ayuda a unificar el tono y a tratar manchas.",
          "La luz roja y azul actúan sobre firmeza e imperfecciones.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más luminosa." },
          { timeframe: "4 semanas", description: "Tono más uniforme." },
          { timeframe: "8 semanas", description: "Cutis radiante y terso." },
        ],
        usageNote: "Resultados visibles con uso constante.",
      },
      howToUse: {
        steps: [
          "Aplica tu sérum.",
          "Desliza el dispositivo por el rostro.",
          "Usa 5-10 minutos al día.",
        ],
        additionalNote: "Incluye: dispositivo, manual PL/EN, cable de carga y comprobante de compra.",
      },
      whatMakesDifferent: [
        { title: "Triple luz", description: "Roja + violeta + azul para luminosidad y tono." },
        { title: "Combinado", description: "Fototerapia + EMS + sónica." },
      ],
    },
  },

  "serum-skin": {
    pdpHeadline: "Tu sérum, ahora con absorción profesional",
    pdpSubheadline: "Dispositivo de mesoterapia con recipiente incorporado para activos, EMS, luz LED roja/azul e ionización sónica.",
    quickBenefits: [
      { icon: "Droplets", text: "Recipiente para activos" },
      { icon: "Activity", text: "Electroestimulación EMS" },
      { icon: "Sun", text: "Luz LED roja y azul" },
      { icon: "Waves", text: "Ionización sónica" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Gracias al contenedor incorporado, aplica tus activos directamente mientras la ionización y el EMS mejoran su penetración en la piel.",
        details: [
          "El set incluye 2 contenedores adicionales para tus sérums.",
          "La ionización ayuda a introducir los activos en profundidad.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Mejor absorción de tu sérum." },
          { timeframe: "4 semanas", description: "Piel más nutrida e hidratada." },
          { timeframe: "8 semanas", description: "Piel reafirmada y luminosa." },
        ],
        usageNote: "Compatible con tus cosméticos habituales.",
      },
      howToUse: {
        steps: [
          "Rellena el recipiente con tu sérum.",
          "Selecciona el modo y desliza por el rostro.",
          "Usa 5-10 minutos al día.",
        ],
        additionalNote: "Incluye: dispositivo, 3 dispensadores, manual PL/EN y cable de carga.",
      },
      whatMakesDifferent: [
        { title: "Dosificador integrado", description: "Aplica y trata a la vez." },
        { title: "3 dispensadores", description: "Para alternar tus sérums favoritos." },
      ],
    },
  },

  // ===== Corporales =====
  "cellu-body": {
    pdpHeadline: "Redefine tu figura: menos grasa y piel más firme",
    pdpSubheadline: "Dispositivo corporal con radiofrecuencia y masaje para remodelar, reducir el tejido graso y relajar la musculatura.",
    quickBenefits: [
      { icon: "Flame", text: "Remodelación corporal" },
      { icon: "Activity", text: "Reducción del tejido graso" },
      { icon: "Droplets", text: "Absorción de activos" },
      { icon: "Heart", text: "Masaje relajante" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Ayuda a modelar el cuerpo y alisar la piel trabajando sobre el tejido graso, además de relajar los músculos tras el entrenamiento.",
        details: [
          "Estimula la zona para reducir la apariencia de la celulitis.",
          "Relaja la musculatura y mejora la sensación de ligereza.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más suave y tonificada." },
          { timeframe: "4 semanas", description: "Reducción visible de la celulitis." },
          { timeframe: "8 semanas", description: "Figura más modelada y firme." },
        ],
        usageNote: "Combínalo con ejercicio y una buena hidratación.",
      },
      howToUse: {
        steps: [
          "Aplica un aceite o crema corporal.",
          "Masajea las zonas (piernas, glúteos, abdomen) en movimientos circulares.",
          "Usa 10-15 minutos por zona, 3-4 veces por semana.",
        ],
        additionalNote: "Incluye: dispositivo y manual.",
      },
      whatMakesDifferent: [
        { title: "Remodela", description: "Trabaja la celulitis y la flacidez." },
        { title: "Relajante", description: "También ideal tras el deporte." },
      ],
    },
  },

  "cuerpo-perfecto": {
    pdpHeadline: "Ventosas + EMS + luz roja para una piel tersa",
    pdpSubheadline: "Dispositivo anticelulítico con terapia EMS, masaje al vacío (ventosas chinas) y fototerapia de luz roja.",
    quickBenefits: [
      { icon: "Activity", text: "Terapia de impulsos EMS" },
      { icon: "Flame", text: "Reducción del tejido adiposo" },
      { icon: "Wind", text: "Masaje al vacío (ventosas)" },
      { icon: "Sun", text: "Fototerapia roja" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Moldea el cuerpo y suaviza la piel combinando impulsos EMS, masaje de succión y luz roja para combatir celulitis y pliegues.",
        details: [
          "El masaje al vacío activa la circulación y drena.",
          "La luz roja mejora la firmeza y elasticidad de la piel.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más tersa y elástica." },
          { timeframe: "4 semanas", description: "Celulitis y pliegues reducidos." },
          { timeframe: "8 semanas", description: "Piernas y glúteos más firmes." },
        ],
        usageNote: "Resultados progresivos con uso regular.",
      },
      howToUse: {
        steps: [
          "Aplica crema o aceite en la zona.",
          "Desliza el cabezal de ventosas sobre la piel.",
          "Usa 10-15 minutos por zona, 3-4 veces por semana.",
        ],
        additionalNote: "Incluye: dispositivo, 2 tapas, filtros reemplazables, manual PL/EN y cable de carga.",
      },
      whatMakesDifferent: [
        { title: "Ventosas", description: "Función de masaje al vacío estilo ventosas chinas." },
        { title: "Filtros reemplazables", description: "Higiene y larga duración." },
      ],
    },
  },

  // ===== Capilar =====
  "multi-care-brush": {
    pdpHeadline: "Un dispositivo para cuero cabelludo, rostro y cuerpo",
    pdpSubheadline: "Cepillo multifunción con 3 cabezales intercambiables, EMS, fototerapia y efecto antiarrugas y anticelulítico.",
    quickBenefits: [
      { icon: "Activity", text: "Cuero cabelludo: fortalece los bulbos" },
      { icon: "Sparkles", text: "Rostro: efecto antiarrugas" },
      { icon: "Flame", text: "Cuerpo: efecto anticelulítico" },
      { icon: "Sun", text: "Fototerapia" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Un solo dispositivo con tres cabezales para cuidar el cuero cabelludo, el rostro y el cuerpo mediante EMS y fototerapia.",
        details: [
          "El accesorio capilar fortalece los bulbos pilosos.",
          "El accesorio facial y corporal reafirma la piel.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Sensación de cuero cabelludo y piel más tonificados." },
          { timeframe: "4 semanas", description: "Piel más firme y cabello con más vida." },
          { timeframe: "8 semanas", description: "Resultados visibles en las tres zonas." },
        ],
        usageNote: "Cambia el cabezal según la zona a tratar.",
      },
      howToUse: {
        steps: [
          "Coloca el cabezal según la zona (capilar, facial o corporal).",
          "Desliza suavemente sobre la zona limpia.",
          "Usa 5-10 minutos por zona.",
        ],
        additionalNote: "Incluye: dispositivo, 3 cabezales intercambiables, estación de carga, cable y manual.",
      },
      whatMakesDifferent: [
        { title: "3 cabezales", description: "Cuero cabelludo, rostro y cuerpo en uno." },
        { title: "EMS + fototerapia", description: "Doble tecnología para reafirmar." },
      ],
    },
  },

  "curly": {
    pdpHeadline: "Rizos perfectos sin esfuerzo, de 150 a 200 °C",
    pdpSubheadline: "Rizador inalámbrico con función de rizado automático, pantalla LCD y batería de 4800 mAh.",
    quickBenefits: [
      { icon: "Zap", text: "Rizado automático" },
      { icon: "Thermometer", text: "150-200 °C, 4 niveles" },
      { icon: "Battery", text: "Batería 4800 mAh" },
      { icon: "Shield", text: "Apagado automático" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Su función de rizado automático enrolla el mechón y lo moldea a la temperatura elegida, logrando rizos definidos sin dañar el cabello.",
        details: [
          "Rango de 150 a 200 °C con 4 grados de regulación.",
          "Inalámbrico: llévalo a cualquier parte.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "Primer uso", description: "Rizos definidos y duraderos." },
          { timeframe: "Con el uso", description: "Menos encrespamiento y más brillo." },
          { timeframe: "Rutina", description: "Peinados de peluquería en casa." },
        ],
        usageNote: "Para cabello seco y desenredado.",
      },
      howToUse: {
        steps: [
          "Selecciona la temperatura según tu cabello.",
          "Introduce el mechón en la cámara de rizado.",
          "Suelta al cabo de unos segundos y fija el rizo.",
        ],
        additionalNote: "Incluye: dispositivo y manual.",
      },
      whatMakesDifferent: [
        { title: "Inalámbrico", description: "Sin cables, ideal para viajar." },
        { title: "Auto-apagado", description: "Seguridad tras un tiempo de inactividad." },
      ],
    },
  },

  "aeroglow": {
    pdpHeadline: "Seca y alisa sin placas calientes",
    pdpSubheadline: "Plancha de pelo aérea que seca y alisa en húmedo, apta para todo tipo de cabello, con 5 niveles de calor y pantalla LCD.",
    quickBenefits: [
      { icon: "Wind", text: "Secado + alisado" },
      { icon: "Droplets", text: "Peinado en húmedo" },
      { icon: "Thermometer", text: "5 niveles de calor" },
      { icon: "Shield", text: "Sin placas calientes" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Combina un potente flujo de aire con ionización para secar y alisar el cabello húmedo a la vez, sin contacto directo con placas calientes.",
        details: [
          "Reduce el daño por calor frente a las planchas tradicionales.",
          "Pantalla LCD para controlar la temperatura fácilmente.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "Primer uso", description: "Cabello liso y sin encrespamiento." },
          { timeframe: "Con el uso", description: "Menos daño térmico y más brillo." },
          { timeframe: "Rutina", description: "Peinado rápido y profesional a diario." },
        ],
        usageNote: "Ideal sobre cabello húmedo.",
      },
      howToUse: {
        steps: [
          "Lava y escurre bien el cabello.",
          "Selecciona el nivel de calor.",
          "Desliza mechón a mechón para secar y alisar.",
        ],
        additionalNote: "Incluye: dispositivo y manual.",
      },
      whatMakesDifferent: [
        { title: "Sin placas", description: "Menos daño que una plancha convencional." },
        { title: "En húmedo", description: "Ahorra tiempo: seca y alisa a la vez." },
      ],
    },
  },

  // ===== IPL =====
  "ipl-flash-pro": {
    pdpHeadline: "Hasta 999.999 pulsos de depilación profesional",
    pdpSubheadline: "Depiladora IPL con cabezal de enfriamiento, superficie de 4,5 cm², 5 niveles de potencia y 2 modos.",
    quickBenefits: [
      { icon: "Zap", text: "999.999 pulsos" },
      { icon: "Snowflake", text: "Cabezal de enfriamiento" },
      { icon: "Maximize2", text: "Superficie 4,5 cm²" },
      { icon: "Settings", text: "2 modos (auto/manual)" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La luz pulsada actúa sobre la raíz del vello debilitándolo de forma progresiva, con un cabezal frío que hace el tratamiento más cómodo.",
        details: [
          "El cabezal de enfriamiento protege y calma la piel.",
          "Incluye gafas de seguridad y maquinilla.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "4 semanas", description: "Primeros pelos más finos." },
          { timeframe: "8 semanas", description: "Reducción visible del vello." },
          { timeframe: "12 semanas", description: "Depilación duradera." },
        ],
        usageNote: "Resultados según fototipo y color del vello.",
      },
      howToUse: {
        steps: [
          "Afeita la zona antes de usar.",
          "Elige el nivel de potencia.",
          "Pasa el cabezal por la zona con pulsos.",
        ],
        additionalNote: "Incluye: dispositivo, gafas y maquinilla.",
      },
      whatMakesDifferent: [
        { title: "Superficie 4,5 cm²", description: "Tratamiento más rápido en zonas amplias." },
        { title: "Cabezal frío", description: "Máximo confort durante la sesión." },
      ],
    },
  },

  "ipl-flash-dorada": {
    pdpHeadline: "Hasta 999.000 pulsos con cabezal refrescante",
    pdpSubheadline: "Depiladora IPL con 5 niveles de potencia, área de 3 cm², pantalla LCD y cabezal reemplazable con compresa refrescante.",
    quickBenefits: [
      { icon: "Zap", text: "Hasta 999.000 pulsos" },
      { icon: "Snowflake", text: "Cabezal refrescante" },
      { icon: "Gauge", text: "5 niveles de potencia" },
      { icon: "Shield", text: "Gafas protectoras" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Debilita el vello desde la raíz con luz pulsada, con lámpara reemplazable y cabezal con compresa refrescante para una depilación cómoda.",
        details: [
          "Las lámparas se pueden reemplazar cuando se desgastan.",
          "Área de depilación de 3 cm².",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "4 semanas", description: "Vello más fino y lento." },
          { timeframe: "8 semanas", description: "Zonas con menos vello." },
          { timeframe: "12 semanas", description: "Resultados duraderos." },
        ],
        usageNote: "Incluye adaptador de CA.",
      },
      howToUse: {
        steps: [
          "Afeita la zona antes del tratamiento.",
          "Selecciona la potencia.",
          "Aplica pulsos sobre la piel.",
        ],
        additionalNote: "Incluye: dispositivo, gafas protectoras y adaptador.",
      },
      whatMakesDifferent: [
        { title: "Lámpara reemplazable", description: "Mayor vida útil del dispositivo." },
        { title: "Compresa refrescante", description: "Tratamiento más agradable." },
      ],
    },
  },

  "ipl-plateada": {
    pdpHeadline: "Depilación IPL con cabezal refrescante y 999.000 pulsos",
    pdpSubheadline: "Depiladora IPL con 5 niveles de potencia, área de 3 cm², pantalla LCD y cabezal reemplazable con compresa refrescante.",
    quickBenefits: [
      { icon: "Zap", text: "Hasta 999.000 pulsos" },
      { icon: "Snowflake", text: "Cabezal refrescante" },
      { icon: "Gauge", text: "5 niveles de potencia" },
      { icon: "Shield", text: "Gafas protectoras" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La luz pulsada debilita el vello desde la raíz de forma progresiva, con lámpara reemplazable y cabezal con compresa refrescante.",
        details: [
          "Las lámparas se pueden reemplazar cuando se desgastan.",
          "Área de depilación de 3 cm².",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "4 semanas", description: "Vello más fino." },
          { timeframe: "8 semanas", description: "Menos densidad de vello." },
          { timeframe: "12 semanas", description: "Resultados duraderos." },
        ],
        usageNote: "Incluye adaptador de CA.",
      },
      howToUse: {
        steps: [
          "Afeita la zona antes del tratamiento.",
          "Selecciona la potencia.",
          "Aplica pulsos sobre la piel.",
        ],
        additionalNote: "Incluye: dispositivo, gafas protectoras y adaptador.",
      },
      whatMakesDifferent: [
        { title: "Lámpara reemplazable", description: "Mayor vida útil." },
        { title: "Compresa refrescante", description: "Tratamiento más cómodo." },
      ],
    },
  },

  "cool": {
    pdpHeadline: "Depilación IPL con cabezal de refrigeración",
    pdpSubheadline: "Depiladora IPL con cabezal de enfriamiento, 5 niveles de potencia y área de 3 cm².",
    quickBenefits: [
      { icon: "Snowflake", text: "Cabezal de refrigeración" },
      { icon: "Gauge", text: "5 niveles de potencia" },
      { icon: "Maximize2", text: "Área de 3 cm²" },
      { icon: "Shield", text: "Incluye gafas y maquinilla" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "Elimina el vello no deseado de forma duradera mediante luz pulsada, con cabezal de enfriamiento que hace el tratamiento más cómodo.",
        details: [
          "El cabezal frío calma la piel durante la sesión.",
          "5 niveles de potencia para adaptarse a tu piel.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "4 semanas", description: "Vello más fino y lento." },
          { timeframe: "8 semanas", description: "Zonas con menos vello." },
          { timeframe: "12 semanas", description: "Depilación duradera." },
        ],
        usageNote: "Resultados según fototipo y color del vello.",
      },
      howToUse: {
        steps: [
          "Afeita la zona antes de usar.",
          "Selecciona el nivel de potencia.",
          "Desliza el cabezal aplicando pulsos.",
        ],
        additionalNote: "Incluye: dispositivo, gafas de seguridad, maquinilla, manual PL/EN y cable de alimentación.",
      },
      whatMakesDifferent: [
        { title: "Refrigeración", description: "Cabezal frío para máxima comodidad." },
        { title: "Set completo", description: "Gafas y maquinilla incluidas." },
      ],
    },
  },

  // ===== Terapia de luz LED =====
  "manopla-led": {
    pdpHeadline: "150 LEDs para rejuvenecer tus manos en casa",
    pdpSubheadline: "Manopla de fototerapia LED con 7 colores, 150 LEDs y 4 modos de intensidad para una piel más suave y luminosa.",
    quickBenefits: [
      { icon: "Sun", text: "7 colores de luz LED" },
      { icon: "Sparkles", text: "150 LEDs de cobertura total" },
      { icon: "Gauge", text: "4 modos de intensidad" },
      { icon: "Droplets", text: "Mejora el efecto de los cosméticos" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La fototerapia de 7 colores penetra en la piel de las manos para mejorar su estado y potenciar el efecto de tus cremas y sérums.",
        details: [
          "Cobertura total de la mano gracias a 150 LEDs.",
          "Cada color actúa sobre una necesidad distinta.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Manos más suaves." },
          { timeframe: "4 semanas", description: "Piel más luminosa." },
          { timeframe: "8 semanas", description: "Aspecto rejuvenecido de las manos." },
        ],
        usageNote: "Úsalo con tu crema de manos habitual.",
      },
      howToUse: {
        steps: [
          "Aplica tu crema o sérum.",
          "Introduce la mano en la manopla.",
          "Selecciona el color e intensidad durante 10-15 min.",
        ],
        additionalNote: "Incluye: dispositivo y manual.",
      },
      whatMakesDifferent: [
        { title: "7 colores", description: "Tratamiento completo según la necesidad." },
        { title: "Potencia cosméticos", description: "Mejora la absorción de tus cremas." },
      ],
    },
  },

  "mascara-led": {
    pdpHeadline: "Máscara LED de 4 colores para rostro y cuello",
    pdpSubheadline: "Máscara de fototerapia LED flexible con 4 colores, control remoto y acción antienvejecimiento para rostro y cuello.",
    quickBenefits: [
      { icon: "Sun", text: "Terapia LED de 4 colores" },
      { icon: "Sparkles", text: "Antienvejecimiento y regeneración" },
      { icon: "Activity", text: "Rostro y cuello" },
      { icon: "Shield", text: "Flexible e higiénica" },
    ],
    dropdowns: {
      howItWorks: {
        title: "¿Por qué funciona?",
        summary: "La fototerapia de 4 colores estimula la regeneración de la piel del rostro y el cuello, combatiendo los signos del envejecimiento.",
        details: [
          "Cada color actúa sobre una necesidad: firmeza, manchas, imperfecciones.",
          "Máscara flexible que se adapta al rostro y al cuello.",
        ],
      },
      expectedResults: {
        phases: [
          { timeframe: "2 semanas", description: "Piel más luminosa." },
          { timeframe: "4 semanas", description: "Tono más uniforme." },
          { timeframe: "8 semanas", description: "Menos signos de envejecimiento." },
        ],
        usageNote: "Apta para todo tipo de piel.",
      },
      howToUse: {
        steps: [
          "Limpia y seca el rostro.",
          "Coloca la máscara y selecciona el color con el mando.",
          "Usa 10-20 minutos, 3-5 veces por semana.",
        ],
        additionalNote: "Incluye: máscara y control remoto.",
      },
      whatMakesDifferent: [
        { title: "Rostro + cuello", description: "Trata dos zonas clave a la vez." },
        { title: "Control remoto", description: "Cómodo manejo durante la sesión." },
      ],
    },
  },
};
