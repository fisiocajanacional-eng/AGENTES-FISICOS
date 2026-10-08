/*
  FISIOTERAPIA CNS - Base de datos clínica
  ----------------------------------------
  Este archivo contiene TODO el contenido editable de la calculadora:
    - patologias   : lista de diagnósticos (código CIE-10, nombre, grupo y tejido)
    - dosificacion : parámetros por agente físico y fase evolutiva
    - reglas       : alertas de seguridad e indicaciones según agente, tejido y fase

  Para actualizar la herramienta basta con editar este archivo y subirlo a GitHub.
  No es necesario modificar la página (calculadora_fisioterapia.html).

  Tejidos válidos (campo "t" de cada patología):
    tendon, ligamento, hueso, articulacion, musculo, nervio, disco,
    bursa, fascia, menisco, sistemico, postquirurgico

  Fases válidas: aguda, subaguda, cronica
*/

window.DATOS_FISIO = {

  version: "1.0",
  fecha: "2026-10-08",
  clasificacion: "CIE-10",

  fases: {
    aguda:    { etiqueta: "Aguda",    detalle: "hasta 7 días" },
    subaguda: { etiqueta: "Subaguda", detalle: "8 a 28 días" },
    cronica:  { etiqueta: "Crónica",  detalle: "más de 28 días" }
  },

  agentes: [
    { id: "electroterapia",    nombre: "Electroterapia" },
    { id: "ultrasonido",       nombre: "Ultrasonido" },
    { id: "terapia_combinada", nombre: "Terapia combinada" },
    { id: "magnetoterapia",    nombre: "Campo magnético" },
    { id: "ondas_choque",      nombre: "Ondas de choque" },
    { id: "alta_frecuencia",   nombre: "Alta frecuencia (Tecar)" },
    { id: "onda_corta",        nombre: "Onda corta" }
  ],

  // Orden en que se muestran los grupos en el buscador
  grupos: [
    "Columna vertebral",
    "Hombro",
    "Codo",
    "Muñeca y mano",
    "Cadera",
    "Rodilla",
    "Pie y tobillo",
    "Músculo y tejidos blandos",
    "Nervios periféricos",
    "Artropatías y sistémicas",
    "Traumatismos y fracturas",
    "Posquirúrgico"
  ],

  // c = código CIE-10 | n = nombre | g = grupo | t = tejido principal
  patologias: [
    // Columna vertebral
    { c: "M54.5", n: "Lumbalgia (dolor lumbar bajo)", g: "Columna vertebral", t: "musculo" },
    { c: "M54.2", n: "Cervicalgia", g: "Columna vertebral", t: "musculo" },
    { c: "M54.1", n: "Radiculopatía", g: "Columna vertebral", t: "nervio" },
    { c: "M54.3", n: "Ciática", g: "Columna vertebral", t: "nervio" },
    { c: "M51.1", n: "Trastorno de disco lumbar con radiculopatía", g: "Columna vertebral", t: "disco" },
    { c: "M50.1", n: "Trastorno de disco cervical con radiculopatía", g: "Columna vertebral", t: "disco" },
    { c: "M48.0", n: "Estenosis espinal", g: "Columna vertebral", t: "disco" },
    { c: "M47.8", n: "Espondilosis (artrosis vertebral)", g: "Columna vertebral", t: "articulacion" },
    { c: "M41.9", n: "Escoliosis", g: "Columna vertebral", t: "musculo" },
    { c: "S13.4", n: "Esguince cervical (latigazo)", g: "Columna vertebral", t: "ligamento" },
    { c: "S33.5", n: "Esguince lumbar", g: "Columna vertebral", t: "ligamento" },

    // Hombro
    { c: "M75.0", n: "Capsulitis adhesiva del hombro (hombro congelado)", g: "Hombro", t: "articulacion" },
    { c: "M75.1", n: "Síndrome del manguito rotador", g: "Hombro", t: "tendon" },
    { c: "M75.2", n: "Tendinitis del bíceps", g: "Hombro", t: "tendon" },
    { c: "M75.3", n: "Tendinitis calcificante del hombro", g: "Hombro", t: "tendon" },
    { c: "M75.4", n: "Síndrome de pinzamiento del hombro", g: "Hombro", t: "tendon" },
    { c: "M75.5", n: "Bursitis del hombro", g: "Hombro", t: "bursa" },
    { c: "S46.0", n: "Lesión traumática del manguito rotador", g: "Hombro", t: "tendon" },

    // Codo
    { c: "M77.1", n: "Epicondilitis lateral (codo de tenista)", g: "Codo", t: "tendon" },
    { c: "M77.0", n: "Epicondilitis medial (codo de golfista)", g: "Codo", t: "tendon" },
    { c: "M70.2", n: "Bursitis olecraniana", g: "Codo", t: "bursa" },

    // Muñeca y mano
    { c: "G56.0", n: "Síndrome del túnel carpiano", g: "Muñeca y mano", t: "nervio" },
    { c: "M65.4", n: "Tenosinovitis de De Quervain", g: "Muñeca y mano", t: "tendon" },
    { c: "M65.3", n: "Dedo en gatillo", g: "Muñeca y mano", t: "tendon" },
    { c: "M18.9", n: "Artrosis de la primera articulación carpometacarpiana (rizartrosis)", g: "Muñeca y mano", t: "articulacion" },
    { c: "S63.6", n: "Esguince de dedos de la mano", g: "Muñeca y mano", t: "ligamento" },

    // Cadera
    { c: "M16.9", n: "Coxartrosis (artrosis de cadera)", g: "Cadera", t: "articulacion" },
    { c: "M70.6", n: "Bursitis trocantérica", g: "Cadera", t: "bursa" },
    { c: "M76.0", n: "Tendinitis glútea", g: "Cadera", t: "tendon" },
    { c: "M76.1", n: "Tendinitis del psoas", g: "Cadera", t: "tendon" },

    // Rodilla
    { c: "M17.9", n: "Gonartrosis (artrosis de rodilla)", g: "Rodilla", t: "articulacion" },
    { c: "M22.2", n: "Trastorno femororrotuliano", g: "Rodilla", t: "articulacion" },
    { c: "M94.2", n: "Condromalacia rotuliana", g: "Rodilla", t: "articulacion" },
    { c: "M76.5", n: "Tendinitis rotuliana", g: "Rodilla", t: "tendon" },
    { c: "M76.3", n: "Síndrome de la banda iliotibial", g: "Rodilla", t: "tendon" },
    { c: "M23.2", n: "Trastorno de menisco por desgarro antiguo", g: "Rodilla", t: "menisco" },
    { c: "S83.2", n: "Desgarro meniscal reciente", g: "Rodilla", t: "menisco" },
    { c: "S83.5", n: "Esguince de ligamento cruzado de la rodilla", g: "Rodilla", t: "ligamento" },
    { c: "S83.4", n: "Esguince de ligamento colateral de la rodilla", g: "Rodilla", t: "ligamento" },
    { c: "M70.4", n: "Bursitis prerrotuliana", g: "Rodilla", t: "bursa" },
    { c: "M70.5", n: "Bursitis de la pata de ganso y otras bursitis de rodilla", g: "Rodilla", t: "bursa" },

    // Pie y tobillo
    { c: "S93.4", n: "Esguince de tobillo", g: "Pie y tobillo", t: "ligamento" },
    { c: "M76.6", n: "Tendinitis aquílea", g: "Pie y tobillo", t: "tendon" },
    { c: "S86.0", n: "Lesión del tendón de Aquiles", g: "Pie y tobillo", t: "tendon" },
    { c: "M72.2", n: "Fascitis plantar", g: "Pie y tobillo", t: "fascia" },
    { c: "M77.3", n: "Espolón calcáneo", g: "Pie y tobillo", t: "fascia" },
    { c: "M77.4", n: "Metatarsalgia", g: "Pie y tobillo", t: "articulacion" },
    { c: "M20.1", n: "Hallux valgus", g: "Pie y tobillo", t: "articulacion" },

    // Músculo y tejidos blandos
    { c: "M62.4", n: "Contractura muscular", g: "Músculo y tejidos blandos", t: "musculo" },
    { c: "M62.6", n: "Distensión muscular", g: "Músculo y tejidos blandos", t: "musculo" },
    { c: "S76.3", n: "Lesión muscular del muslo (isquiotibiales, cuádriceps)", g: "Músculo y tejidos blandos", t: "musculo" },
    { c: "S70.1", n: "Contusión del muslo", g: "Músculo y tejidos blandos", t: "musculo" },
    { c: "M79.1", n: "Mialgia / síndrome de dolor miofascial", g: "Músculo y tejidos blandos", t: "musculo" },
    { c: "M62.5", n: "Atrofia muscular por desuso", g: "Músculo y tejidos blandos", t: "musculo" },

    // Nervios periféricos
    { c: "G51.0", n: "Parálisis facial de Bell", g: "Nervios periféricos", t: "nervio" },
    { c: "G56.2", n: "Lesión del nervio cubital", g: "Nervios periféricos", t: "nervio" },
    { c: "G57.1", n: "Meralgia parestésica", g: "Nervios periféricos", t: "nervio" },

    // Artropatías y sistémicas
    { c: "M19.9", n: "Artrosis, no especificada", g: "Artropatías y sistémicas", t: "articulacion" },
    { c: "M15.9", n: "Poliartrosis", g: "Artropatías y sistémicas", t: "articulacion" },
    { c: "M25.6", n: "Rigidez articular", g: "Artropatías y sistémicas", t: "articulacion" },
    { c: "M24.5", n: "Contractura articular", g: "Artropatías y sistémicas", t: "articulacion" },
    { c: "M26.6", n: "Trastorno de la articulación temporomandibular", g: "Artropatías y sistémicas", t: "articulacion" },
    { c: "M06.9", n: "Artritis reumatoide", g: "Artropatías y sistémicas", t: "sistemico" },
    { c: "M45", n: "Espondilitis anquilosante", g: "Artropatías y sistémicas", t: "sistemico" },
    { c: "M79.7", n: "Fibromialgia", g: "Artropatías y sistémicas", t: "sistemico" },

    // Traumatismos y fracturas
    { c: "S42", n: "Fractura del hombro y del brazo", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S52", n: "Fractura del antebrazo", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S62", n: "Fractura a nivel de la muñeca y de la mano", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S72", n: "Fractura del fémur", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S82", n: "Fractura de la pierna, incluido el tobillo", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S92", n: "Fractura del pie", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "M84.1", n: "Falta de unión de la fractura (pseudoartrosis)", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "M84.0", n: "Consolidación defectuosa de fractura", g: "Traumatismos y fracturas", t: "hueso" },

    // Posquirúrgico
    { c: "Z47.8", n: "Cuidados posteriores a cirugía ortopédica", g: "Posquirúrgico", t: "postquirurgico" },
    { c: "Z96.6", n: "Presencia de implante ortopédico articular (prótesis)", g: "Posquirúrgico", t: "postquirurgico" }
  ],

  // Parámetros por agente físico y fase
  dosificacion: {
    electroterapia: {
      aguda:    { modalidad: "TENS convencional (analgesia)", frecuencia: "80 - 120 Hz", intensidad: "Sensitiva (sin contracción)", tiempo: "15 - 20 minutos" },
      subaguda: { modalidad: "Corriente interferencial bipolar", frecuencia: "50 - 80 Hz", intensidad: "Sensitiva mantenida", tiempo: "20 minutos" },
      cronica:  { modalidad: "TENS endorfínico o corrientes motoras", frecuencia: "1 - 10 Hz", intensidad: "Motora (contracción visible y tolerable)", tiempo: "25 - 30 minutos" }
    },
    ultrasonido: {
      aguda:    { modalidad: "Pulsado (ciclo de trabajo 20 %)", frecuencia: "3 MHz (superficial) / 1 MHz (profundo)", intensidad: "0.2 - 0.5 W/cm²", tiempo: "1.5 min por área de cabezal" },
      subaguda: { modalidad: "Pulsado (ciclo de trabajo 50 %)", frecuencia: "Según profundidad de la estructura", intensidad: "0.5 - 0.8 W/cm²", tiempo: "2 min por área de cabezal" },
      cronica:  { modalidad: "Continuo (efecto térmico y mecánico)", frecuencia: "1 MHz (generalmente profundo)", intensidad: "1.0 - 1.5 W/cm²", tiempo: "5 - 8 minutos totales" }
    },
    terapia_combinada: {
      aguda:    { modalidad: "US pulsado (20 %) + TENS / interferencial sensitivo", frecuencia: "US 3 MHz | Corriente 80 - 100 Hz", intensidad: "US 0.2 - 0.4 W/cm² | Corriente sensitiva", tiempo: "5 - 8 minutos" },
      subaguda: { modalidad: "US pulsado (50 %) + interferencial", frecuencia: "US 1 - 3 MHz | Corriente 50 - 100 Hz", intensidad: "US 0.5 - 0.8 W/cm² | Corriente sensitiva a motora", tiempo: "8 - 10 minutos" },
      cronica:  { modalidad: "US continuo + interferencial o corriente motora", frecuencia: "US 1 MHz | Corriente 1 - 10 Hz (motora) u 80 - 100 Hz (analgesia)", intensidad: "US 1.0 - 1.5 W/cm² | Corriente motora tolerable", tiempo: "8 - 10 minutos" }
    },
    magnetoterapia: {
      aguda:    { modalidad: "Emisión pulsada (efecto antiedematoso)", frecuencia: "5 - 15 Hz", intensidad: "20 - 40 Gauss", tiempo: "30 minutos" },
      subaguda: { modalidad: "Emisión continua o pulsada", frecuencia: "20 - 50 Hz", intensidad: "40 - 60 Gauss", tiempo: "30 - 40 minutos" },
      cronica:  { modalidad: "Emisión continua (efecto trófico)", frecuencia: "50 - 100 Hz", intensidad: "60 - 100 Gauss", tiempo: "45 minutos" }
    },
    ondas_choque: {
      aguda:    { bloqueo: true, mensaje: "Las ondas de choque no se aplican en fases inflamatorias agudas." },
      subaguda: { bloqueo: true, mensaje: "No recomendadas en fase subaguda. Se prefiere esperar a la fase crónica, cuando el tejido ya está consolidado." },
      cronica:  { modalidad: "Radial o focal (según profundidad)", frecuencia: "4 - 8 Hz", intensidad: "1.5 - 3.0 bar / densidad de flujo media", tiempo: "2000 - 3000 disparos (una sesión semanal)" }
    },
    alta_frecuencia: {
      aguda:    { modalidad: "Capacitiva atérmica (bioestimulación celular)", frecuencia: "448 kHz aprox.", intensidad: "Escala térmica grado 0 (sin calor detectable)", tiempo: "10 - 15 minutos" },
      subaguda: { modalidad: "Capacitiva o resistiva térmica suave", frecuencia: "448 kHz", intensidad: "Escala térmica grado 1 - 2 (calor muy leve)", tiempo: "15 - 20 minutos" },
      cronica:  { modalidad: "Resistiva hipertérmica (flexibilización del colágeno)", frecuencia: "448 kHz", intensidad: "Escala térmica grado 3 (calor intenso pero confortable)", tiempo: "20 minutos" }
    },
    onda_corta: {
      aguda:    { modalidad: "Pulsada atérmica (inductiva)", frecuencia: "Baja frecuencia de pulso", intensidad: "Potencia media baja", tiempo: "15 minutos" },
      subaguda: { modalidad: "Pulsada con ligero gradiente térmico", frecuencia: "Media frecuencia de pulso", intensidad: "Potencia moderada", tiempo: "15 - 20 minutos" },
      cronica:  { modalidad: "Continua (térmica profunda, campo condensador)", frecuencia: "Emisión constante", intensidad: "Sensación térmica agradable", tiempo: "20 minutos" }
    }
  },

  /*
    Reglas de seguridad e indicación.
    agentes / tejidos / fases: "*" (todos) o lista de valores.
    nivel: restriccion | precaucion | indicacion | info
  */
  reglas: [
    {
      agentes: ["ultrasonido", "onda_corta", "terapia_combinada"],
      tejidos: ["hueso"],
      fases: ["aguda", "subaguda"],
      nivel: "precaucion",
      titulo: "Consolidación ósea",
      mensaje: "El ultrasonido sobre un foco de fractura no consolidado puede provocar dolor perióstico o interferir con la formación del callo si no se emplean intensidades muy bajas (LIPUS). Evitar la aplicación directa sobre el foco en fase temprana."
    },
    {
      agentes: ["onda_corta", "alta_frecuencia"],
      tejidos: ["hueso", "postquirurgico"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Material de osteosíntesis o prótesis metálica",
      mensaje: "Verificar la presencia de placas, clavos, tornillos o prótesis metálicas antes de aplicar campos electromagnéticos o corrientes de alta frecuencia en la zona."
    },
    {
      agentes: ["magnetoterapia"],
      tejidos: ["hueso"],
      fases: ["subaguda", "cronica"],
      nivel: "indicacion",
      titulo: "Estimulación de la consolidación",
      mensaje: "La magnetoterapia está indicada como apoyo a la consolidación ósea y en los retardos de consolidación. Descartar marcapasos o implantes electrónicos."
    },
    {
      agentes: ["ondas_choque"],
      tejidos: ["tendon"],
      fases: ["cronica"],
      nivel: "indicacion",
      titulo: "Indicación favorable",
      mensaje: "Las tendinopatías crónicas (más de 2 meses) suelen responder bien al estímulo mecánico de las ondas de choque, que favorece la neovascularización y la remodelación del tendón."
    },
    {
      agentes: ["ondas_choque"],
      tejidos: ["fascia"],
      fases: ["cronica"],
      nivel: "indicacion",
      titulo: "Indicación favorable",
      mensaje: "La fascitis plantar y el espolón calcáneo crónicos cuentan con buena evidencia de respuesta a las ondas de choque."
    },
    {
      agentes: ["ondas_choque"],
      tejidos: ["nervio"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Trayecto nervioso",
      mensaje: "Evitar la aplicación directa sobre troncos nerviosos superficiales. Dirigir el estímulo a la estructura musculotendinosa asociada."
    },
    {
      agentes: ["ondas_choque"],
      tejidos: ["disco"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Región vertebral",
      mensaje: "No aplicar sobre el canal medular ni directamente sobre los discos. Limitar el tratamiento a la musculatura paravertebral."
    },
    {
      agentes: ["ultrasonido", "terapia_combinada"],
      tejidos: ["nervio"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Nervio superficial o zona hipoestésica",
      mensaje: "Evitar intensidades altas sobre nervios superficiales y no aplicar en zonas con sensibilidad disminuida, donde el paciente no puede referir sobrecalentamiento."
    },
    {
      agentes: ["onda_corta", "alta_frecuencia"],
      tejidos: ["sistemico"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Enfermedad inflamatoria sistémica",
      mensaje: "Evitar el efecto térmico sobre articulaciones con inflamación activa. Priorizar modalidades atérmicas durante los brotes."
    },
    {
      agentes: "*",
      tejidos: ["postquirurgico"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Herida quirúrgica",
      mensaje: "Verificar cicatrización completa y ausencia de signos de infección antes de aplicar cualquier agente físico sobre la zona intervenida."
    },
    {
      agentes: ["terapia_combinada"],
      tejidos: "*",
      fases: "*",
      nivel: "info",
      titulo: "Técnica de aplicación",
      mensaje: "El cabezal de ultrasonido actúa como electrodo activo: mantenerlo siempre en movimiento, con gel conductor, y colocar bien el electrodo de retorno. Evitar la aplicación sobre metal, marcapasos, zonas sin sensibilidad o embarazo."
    }
  ]
};
