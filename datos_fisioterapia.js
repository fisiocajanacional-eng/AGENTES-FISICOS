/*
  FISIOTERAPIA CNS - Base de datos clínica
  ----------------------------------------
  Este archivo contiene TODO el contenido editable de la calculadora:
    - patologias   : lista de diagnósticos (código CIE-10, nombre, grupo y tejido)
    - dosificacion : parámetros por agente físico y fase evolutiva
    - reglas       : alertas de seguridad e indicaciones según agente, tejido y fase

  Para actualizar la herramienta basta con editar este archivo y subirlo a GitHub.
  No es necesario modificar la página (calculadora_fisioterapia.html).

  Campos de cada patología:
    c = código CIE-10 | n = nombre | g = grupo | t = tejido principal
    x = etiquetas adicionales (opcional, lista) | s = sinónimos para el buscador (opcional)

  Tejidos válidos (campo "t"):
    tendon, ligamento, hueso, articulacion, musculo, nervio, disco, bursa, fascia,
    menisco, sistemico, postquirurgico, luxacion, snc, suelo_pelvico, piel, vascular

  Etiquetas adicionales (campo "x") usadas actualmente: pediatrico, dolor_pelvico

  Otros bloques:
    - umbrales                : días que separan fase aguda, subaguda y crónica (por tejido o por defecto)
    - dosificacion_especifica : parámetros propios de un tejido o etiqueta (reemplazan a la tabla general)

  Fases válidas: aguda, subaguda, cronica
*/

window.DATOS_FISIO = {

  version: "2.1",
  fecha: "2026-10-10",
  clasificacion: "CIE-10",

  // Abreviaturas que el buscador reemplaza antes de comparar (clave en minúsculas, sin tildes)
  sinonimosBusqueda: {
    sx: "sindrome", sd: "sindrome", sdr: "sindrome",
    esg: "esguince", itb: "iliotibial", tfcc: "triangular"
  },

  fases: {
    aguda:    { etiqueta: "Aguda",    detalle: "hasta 7 días" },
    subaguda: { etiqueta: "Subaguda", detalle: "8 a 28 días" },
    cronica:  { etiqueta: "Crónica",  detalle: "más de 28 días" }
  },

  agentes: [
    { id: "electroterapia",    nombre: "Electroterapia (TENS)" },
    { id: "nmes",              nombre: "Electroestimulación (NMES)" },
    { id: "ultrasonido",       nombre: "Ultrasonido" },
    { id: "terapia_combinada", nombre: "Terapia combinada" },
    { id: "laser",             nombre: "Láser de baja intensidad" },
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
    "Luxaciones y subluxaciones",
    "Artropatías y sistémicas",
    "Traumatismos y fracturas",
    "Neurológico (sistema nervioso central)",
    "Suelo pélvico y uroginecología",
    "Pediatría",
    "Piel, vascular y otros",
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
    { c: "M76.3", n: "Síndrome de la banda iliotibial", g: "Rodilla", t: "tendon", s: "sx sd cintilla bandeleta iliotibial itb corredor friccion" },
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
    { c: "Z96.6", n: "Presencia de implante ortopédico articular (prótesis)", g: "Posquirúrgico", t: "postquirurgico" },
    { c: "Z89.9", n: "Ausencia adquirida de miembro (amputación), sin otra especificación", g: "Posquirúrgico", t: "postquirurgico", s: "amputado muñón protesis" },

    // Ampliación v2.1: esguinces, ligamentos, tendones y fracturas frecuentes
    { c: "S63.5", n: "Esguince de muñeca", g: "Muñeca y mano", t: "ligamento", s: "sx torcedura muneca" },
    { id: "S63.5-TFCC", c: "S63.5", n: "Lesión del complejo del fibrocartílago triangular (ligamento triangular, TFCC)", g: "Muñeca y mano", t: "ligamento", s: "tfcc ligamento triangular fibrocartilago triangular muneca cubital" },
    { c: "S63.3", n: "Ruptura traumática de ligamento de la muñeca (p. ej. escafolunar)", g: "Muñeca y mano", t: "ligamento", s: "escafolunar inestabilidad carpiana muneca" },
    { c: "S62.0", n: "Fractura del hueso escafoides de la mano", g: "Traumatismos y fracturas", t: "hueso", s: "navicular muneca" },
    { c: "S53.4", n: "Esguince de codo", g: "Codo", t: "ligamento", s: "torcedura codo" },
    { c: "S43.4", n: "Esguince de la articulación del hombro", g: "Hombro", t: "ligamento", s: "torcedura hombro" },
    { c: "S43.5", n: "Esguince de la articulación acromioclavicular", g: "Hombro", t: "ligamento", s: "ac torcedura hombro" },
    { c: "S42.0", n: "Fractura de la clavícula", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S42.2", n: "Fractura de la extremidad superior del húmero", g: "Traumatismos y fracturas", t: "hueso", s: "humero proximal hombro" },
    { c: "G56.3", n: "Lesión del nervio radial", g: "Nervios periféricos", t: "nervio", s: "mano caida" },
    { c: "S73.1", n: "Esguince de cadera", g: "Cadera", t: "ligamento", s: "torcedura cadera" },
    { c: "S76.2", n: "Lesión del músculo y tendón aductor del muslo (aductores)", g: "Músculo y tejidos blandos", t: "musculo", s: "ingle pubalgia aductores desgarro" },
    { c: "S76.1", n: "Lesión del músculo y tendón del cuádriceps", g: "Músculo y tejidos blandos", t: "musculo", s: "cuadriceps desgarro muslo" },
    { c: "G57.0", n: "Lesión del nervio ciático (incluye síndrome del piriforme)", g: "Nervios periféricos", t: "nervio", s: "piriforme piramidal sx" },
    { c: "S72.1", n: "Fractura trocantérica", g: "Traumatismos y fracturas", t: "hueso", s: "cadera fractura" },
    { c: "S72.3", n: "Fractura de la diáfisis del fémur", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S82.0", n: "Fractura de la rótula", g: "Traumatismos y fracturas", t: "hueso", s: "patela" },
    { c: "M71.2", n: "Quiste sinovial del hueco poplíteo (quiste de Baker)", g: "Rodilla", t: "bursa", s: "baker popliteo" },
    { c: "M92.5", n: "Osteocondrosis juvenil de la tibia y del peroné (enfermedad de Osgood-Schlatter)", g: "Rodilla", t: "tendon", x: ["pediatrico"], s: "osgood schlatter tuberosidad tibial" },
    { c: "M76.7", n: "Tendinitis de los peroneos", g: "Pie y tobillo", t: "tendon", s: "peroneos peroneo tobillo" },
    { c: "M76.8", n: "Tendinitis del tibial posterior (otras entesopatías del miembro inferior)", g: "Pie y tobillo", t: "tendon", s: "tibial posterior tibial anterior" },
    { c: "S93.6", n: "Esguince de pie", g: "Pie y tobillo", t: "ligamento", s: "torcedura pie lisfranc" },
    { c: "G57.5", n: "Síndrome del túnel del tarso", g: "Nervios periféricos", t: "nervio", s: "sx tarso tibial posterior nervio" },
    { c: "M20.4", n: "Dedo del pie en martillo (adquirido)", g: "Pie y tobillo", t: "articulacion", s: "dedos garra" },
    { c: "S82.6", n: "Fractura del maléolo externo (peroné distal)", g: "Traumatismos y fracturas", t: "hueso", s: "tobillo peroné fractura" },
    { c: "S92.0", n: "Fractura del calcáneo", g: "Traumatismos y fracturas", t: "hueso", s: "talon" },
    { c: "M19.0", n: "Artrosis primaria de otras articulaciones (hombro, codo, muñeca, tobillo)", g: "Artropatías y sistémicas", t: "articulacion", s: "artrosis hombro codo muneca tobillo omartrosis" },
    { c: "I69.1", n: "Secuelas de hemorragia intracerebral", g: "Neurológico (sistema nervioso central)", t: "snc", s: "acv hemorragico derrame hemiparesia" },
    { c: "G71.0", n: "Distrofia muscular", g: "Neurológico (sistema nervioso central)", t: "snc", s: "duchenne becker miopatia" },

    // Columna vertebral (ampliación)
    { c: "M54.6", n: "Dolor en la columna dorsal (dorsalgia)", g: "Columna vertebral", t: "musculo" },
    { c: "M54.9", n: "Dorsalgia, no especificada", g: "Columna vertebral", t: "musculo" },
    { c: "M51.2", n: "Desplazamiento de disco intervertebral (hernia discal)", g: "Columna vertebral", t: "disco", s: "hernia discal lumbar" },
    { c: "M50.2", n: "Desplazamiento de disco cervical (hernia discal cervical)", g: "Columna vertebral", t: "disco" },
    { c: "M43.1", n: "Espondilolistesis", g: "Columna vertebral", t: "articulacion" },
    { c: "M53.1", n: "Síndrome cervicobraquial", g: "Columna vertebral", t: "nervio" },
    { c: "M53.3", n: "Trastorno sacrococcígeo (coccigodinia)", g: "Columna vertebral", t: "ligamento", s: "coxis cóccix" },
    { c: "M43.6", n: "Tortícolis", g: "Columna vertebral", t: "musculo" },
    { c: "M40.0", n: "Cifosis postural", g: "Columna vertebral", t: "musculo" },
    { c: "G44.2", n: "Cefalea tensional", g: "Columna vertebral", t: "musculo", s: "cefalea cervicogenica dolor de cabeza" },

    // Rodilla y pie (ampliación)
    { c: "M23.5", n: "Inestabilidad crónica de la rodilla", g: "Rodilla", t: "ligamento" },
    { c: "M21.4", n: "Pie plano adquirido", g: "Pie y tobillo", t: "ligamento" },

    // Nervios periféricos (ampliación)
    { c: "G50.0", n: "Neuralgia del trigémino", g: "Nervios periféricos", t: "nervio" },
    { c: "G54.0", n: "Trastorno del plexo braquial", g: "Nervios periféricos", t: "nervio" },
    { c: "G57.3", n: "Lesión del nervio ciático poplíteo externo (parálisis peronea)", g: "Nervios periféricos", t: "nervio", s: "pie caído" },
    { c: "G57.6", n: "Lesión del nervio plantar (neuroma de Morton)", g: "Nervios periféricos", t: "nervio" },

    // Luxaciones y subluxaciones
    { c: "S43.0", n: "Luxación de la articulación del hombro (glenohumeral)", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S43.1", n: "Luxación de la articulación acromioclavicular", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S53.1", n: "Luxación del codo", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S63.0", n: "Luxación de la muñeca", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S63.1", n: "Luxación de dedo de la mano", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S73.0", n: "Luxación de la cadera", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S83.0", n: "Luxación de la rótula", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S83.1", n: "Luxación de la rodilla", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S93.0", n: "Luxación de la articulación del tobillo", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S93.3", n: "Luxación del pie", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S03.0", n: "Luxación de la mandíbula (articulación temporomandibular)", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "S13.1", n: "Luxación de vértebra cervical", g: "Luxaciones y subluxaciones", t: "luxacion" },
    { c: "M24.4", n: "Luxación recidivante y subluxación articular (inestabilidad)", g: "Luxaciones y subluxaciones", t: "luxacion", s: "subluxacion" },

    // Artropatías (ampliación)
    { c: "M25.4", n: "Derrame articular", g: "Artropatías y sistémicas", t: "articulacion" },
    { c: "M25.5", n: "Dolor articular", g: "Artropatías y sistémicas", t: "articulacion", s: "artralgia" },
    { c: "M79.6", n: "Dolor en miembro", g: "Artropatías y sistémicas", t: "musculo" },

    // Traumatismos y fracturas (ampliación)
    { c: "S52.5", n: "Fractura de la epífisis inferior del radio (Colles)", g: "Traumatismos y fracturas", t: "hueso", s: "muneca" },
    { c: "S72.0", n: "Fractura del cuello del fémur", g: "Traumatismos y fracturas", t: "hueso", s: "fractura de cadera" },
    { c: "S12", n: "Fractura del cuello (columna cervical)", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S22", n: "Fractura de costilla(s), esternón y columna torácica", g: "Traumatismos y fracturas", t: "hueso" },
    { c: "S32", n: "Fractura de la columna lumbar y de la pelvis", g: "Traumatismos y fracturas", t: "hueso" },

    // Neurológico (sistema nervioso central)
    { c: "G81.9", n: "Hemiplejía / hemiparesia, no especificada", g: "Neurológico (sistema nervioso central)", t: "snc", s: "hemiparesia hemiparesis acv" },
    { c: "G81.0", n: "Hemiplejía flácida", g: "Neurológico (sistema nervioso central)", t: "snc", s: "hemiparesia" },
    { c: "G81.1", n: "Hemiplejía espástica", g: "Neurológico (sistema nervioso central)", t: "snc", s: "hemiparesia espasticidad" },
    { c: "I69.3", n: "Secuelas de infarto cerebral", g: "Neurológico (sistema nervioso central)", t: "snc", s: "acv isquemico hemiparesia derrame" },
    { c: "I69.4", n: "Secuelas de accidente cerebrovascular, no especificado", g: "Neurológico (sistema nervioso central)", t: "snc", s: "acv derrame hemiparesia" },
    { c: "G82.2", n: "Paraplejía, no especificada", g: "Neurológico (sistema nervioso central)", t: "snc", s: "paraparesia" },
    { c: "G82.5", n: "Tetraplejía, no especificada", g: "Neurológico (sistema nervioso central)", t: "snc", s: "cuadriplejia tetraparesia" },
    { c: "T91.3", n: "Secuelas de traumatismo de la médula espinal", g: "Neurológico (sistema nervioso central)", t: "snc", s: "lesion medular" },
    { c: "S06.9", n: "Traumatismo intracraneal, no especificado", g: "Neurológico (sistema nervioso central)", t: "snc", s: "tce traumatismo craneoencefalico" },
    { c: "G20", n: "Enfermedad de Parkinson", g: "Neurológico (sistema nervioso central)", t: "snc" },
    { c: "G35", n: "Esclerosis múltiple", g: "Neurológico (sistema nervioso central)", t: "snc" },
    { c: "G12.2", n: "Enfermedad de la neurona motora (esclerosis lateral amiotrófica)", g: "Neurológico (sistema nervioso central)", t: "snc", s: "ela" },
    { c: "G61.0", n: "Síndrome de Guillain-Barré", g: "Neurológico (sistema nervioso central)", t: "snc" },
    { c: "G62.9", n: "Polineuropatía, no especificada", g: "Neurológico (sistema nervioso central)", t: "nervio" },
    { c: "R26.8", n: "Otras anormalidades de la marcha y de la movilidad", g: "Neurológico (sistema nervioso central)", t: "snc", s: "ataxia alteracion de la marcha" },

    // Suelo pélvico y uroginecología
    { c: "N81.1", n: "Cistocele", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico", s: "prolapso vesical" },
    { c: "N81.0", n: "Uretrocele", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico" },
    { c: "N81.6", n: "Rectocele", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico" },
    { c: "N81.2", n: "Prolapso uterovaginal incompleto", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico", s: "prolapso uterino" },
    { c: "N81.3", n: "Prolapso uterovaginal completo", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico", s: "prolapso uterino" },
    { c: "N39.3", n: "Incontinencia urinaria de esfuerzo", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico" },
    { c: "N39.4", n: "Otras incontinencias urinarias especificadas (urgencia, mixta)", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico" },
    { c: "R32", n: "Incontinencia urinaria, no especificada", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico" },
    { c: "N32.8", n: "Otros trastornos especificados de la vejiga (vejiga hiperactiva)", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico" },
    { c: "R15", n: "Incontinencia fecal", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico" },
    { c: "R10.2", n: "Dolor pélvico y perineal", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico", x: ["dolor_pelvico"] },
    { c: "N94.1", n: "Dispareunia", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico", x: ["dolor_pelvico"] },
    { c: "N94.2", n: "Vaginismo", g: "Suelo pélvico y uroginecología", t: "suelo_pelvico", x: ["dolor_pelvico"] },
    { c: "M62.0", n: "Diástasis del músculo (diástasis de rectos abdominales)", g: "Suelo pélvico y uroginecología", t: "musculo", s: "posparto" },

    // Pediatría
    { c: "G80.9", n: "Parálisis cerebral, no especificada", g: "Pediatría", t: "snc", x: ["pediatrico"], s: "pci" },
    { c: "Q05.9", n: "Espina bífida, sin otra especificación", g: "Pediatría", t: "snc", x: ["pediatrico"], s: "mielomeningocele" },
    { c: "Q90.9", n: "Síndrome de Down, sin otra especificación", g: "Pediatría", t: "snc", x: ["pediatrico"], s: "hipotonia" },
    { c: "R62.0", n: "Retraso en el logro de hitos del desarrollo", g: "Pediatría", t: "snc", x: ["pediatrico"], s: "retraso psicomotor" },
    { c: "Q66.0", n: "Pie equinovaro congénito", g: "Pediatría", t: "articulacion", x: ["pediatrico"], s: "pie zambo" },
    { c: "Q65.9", n: "Defecto congénito de la cadera, no especificado (displasia de cadera)", g: "Pediatría", t: "articulacion", x: ["pediatrico"] },
    { c: "Q68.0", n: "Tortícolis congénita", g: "Pediatría", t: "musculo", x: ["pediatrico"] },
    { c: "P14.0", n: "Parálisis de Erb por traumatismo del nacimiento", g: "Pediatría", t: "nervio", x: ["pediatrico"], s: "plexo braquial obstetrico" },

    // Piel, vascular y otros
    { c: "L90.5", n: "Cicatriz y fibrosis de la piel", g: "Piel, vascular y otros", t: "piel", s: "cicatriz adherencia" },
    { c: "L91.0", n: "Cicatriz queloide", g: "Piel, vascular y otros", t: "piel" },
    { c: "L89.9", n: "Úlcera por presión (de decúbito), no especificada", g: "Piel, vascular y otros", t: "piel", s: "escara" },
    { c: "I89.0", n: "Linfedema, no clasificado en otra parte", g: "Piel, vascular y otros", t: "vascular" },
    { c: "I87.2", n: "Insuficiencia venosa crónica (periférica)", g: "Piel, vascular y otros", t: "vascular", s: "varices" }
  ],

  /*
    Umbrales de fase evolutiva, en días.
    aguda: hasta ese día | subaguda: hasta ese día | crónica: después.
    Se usa el umbral del tejido (o etiqueta) del diagnóstico; si no existe, el de "default".
  */
  umbrales: {
    default: { aguda: 7, subaguda: 28 },
    snc:     { aguda: 7, subaguda: 180 }
  },

  /*
    Dosificación específica por tejido o etiqueta (reemplaza a la tabla general).
    Estructura: tejido/etiqueta > agente > fase ("*" = todas las fases).
    El campo "nota" se muestra como información, no como parámetro.
  */
  dosificacion_especifica: {
    suelo_pelvico: {
      electroterapia: {
        "*": {
          modalidad: "Electroestimulación del suelo pélvico (endocavitaria o perineal superficial)",
          frecuencia: "Incontinencia de esfuerzo: 35 - 50 Hz | Urgencia o vejiga hiperactiva: 5 - 10 Hz",
          ancho_pulso: "200 - 300 µs",
          intensidad: "Contracción perineal perceptible, sin dolor",
          tiempo: "15 - 20 minutos (relación trabajo:reposo 1:2)",
          nota: "Parámetros orientativos. En prolapso e incontinencia la electroestimulación complementa el entrenamiento muscular del suelo pélvico y no lo sustituye."
        }
      }
    },
    dolor_pelvico: {
      electroterapia: {
        "*": {
          modalidad: "TENS analgésico (perineal o sacro) o estimulación relajante",
          frecuencia: "80 - 100 Hz (analgesia) | 2 - 10 Hz (relajación)",
          ancho_pulso: "100 - 200 µs",
          intensidad: "Sensitiva, sin contracción dolorosa",
          tiempo: "20 - 30 minutos",
          nota: "Parámetros orientativos. La estimulación excitomotora no está indicada si existe hipertonía del suelo pélvico."
        }
      }
    },
    snc: {
      electroterapia: {
        "*": {
          modalidad: "Electroestimulación neuromuscular (NMES/FES) sobre la musculatura parética, o TENS para dolor y espasticidad",
          frecuencia: "NMES: 20 - 50 Hz | TENS para espasticidad: 80 - 100 Hz",
          ancho_pulso: "200 - 300 µs",
          intensidad: "Contracción visible y tolerable, sin dolor ni reacciones asociadas excesivas",
          tiempo: "15 - 30 minutos",
          nota: "Parámetros orientativos. Complementan el programa de rehabilitación funcional y no lo reemplazan."
        }
      }
    }
  },

  // Parámetros por agente físico y fase.
  //   ref        = claves del bloque "fuentes"
  //   estado     = verificada (se consultó la fuente primaria)
  //                parcial    (parte del valor es criterio de progresión, no texto de la fuente)
  //                pendiente  (referencia general; sin fuente primaria verificada)
  //   notaFuente = aclaración de qué respalda y qué no respalda la fuente
  //   Una fila con clave "*" aplica a todas las fases.
  dosificacion: {

    electroterapia: {
      aguda: {
        modalidad: "TENS de alta frecuencia (analgesia)",
        frecuencia: "Alta frecuencia (> 100 Hz; ejemplo de ensayo: 100 Hz)",
        ancho_pulso: "200 µs (ejemplo de ensayo)",
        intensidad: "Fuerte pero cómoda, sin contracción muscular",
        tiempo: "30 minutos (ejemplo de ensayo en dolor agudo)",
        ref: ["vance_2022"], estado: "parcial",
        notaFuente: "La revisión no fija una dosis única: describe dosis de ensayos individuales (p. ej. 100 Hz, 200 µs, 30 min en dolor agudo por fractura de fémur). La asignación a la fase aguda es criterio de progresión."
      },
      subaguda: {
        modalidad: "TENS de frecuencia mixta (alternando baja y alta)",
        frecuencia: "Alternar baja (< 10 Hz, p. ej. 2 Hz) y alta (≈ 100 Hz)",
        ancho_pulso: "200 µs (ejemplo de ensayo)",
        intensidad: "Fuerte pero cómoda; subir al menos 10 % si disminuye la sensación (tolerancia)",
        tiempo: "20 - 30 minutos",
        ref: ["vance_2022"], estado: "parcial",
        notaFuente: "Vance 2022 describe el modo mixto para limitar la tolerancia y sesiones de 20 a 30 min en distintos ensayos. La asignación a la fase subaguda es criterio de progresión."
      },
      cronica: {
        modalidad: "TENS de baja frecuencia o de frecuencia mixta",
        frecuencia: "Baja (< 10 Hz) o modo mixto",
        ancho_pulso: "200 µs (ejemplo de ensayo)",
        intensidad: "Fuerte pero cómoda; variar los parámetros si se aplica a diario (la tolerancia aparece en pocos días)",
        tiempo: "20 - 30 minutos",
        ref: ["vance_2022"], estado: "parcial",
        notaFuente: "La revisión advierte que la misma dosis diaria puede generar tolerancia en pocos días y que la magnitud del efecto es incierta por la baja calidad de la evidencia."
      }
    },

    nmes: {
      "*": {
        modalidad: "Electroestimulación neuromuscular (revisión sobre cuádriceps; extrapolar a otros grupos con criterio clínico)",
        frecuencia: "30 - 50 Hz",
        ancho_pulso: "400 - 600 µs (resumen del artículo); 200 - 400 µs (conclusión). El artículo no resuelve la diferencia",
        intensidad: "La mayor tolerable, buscando una fuerza evocada superior al 50 % de la contracción voluntaria máxima",
        tiempo: "Ciclo de 10 s de contracción y 50 s de reposo (1:5). Duración de sesión y número de sesiones: no especificados en la fuente",
        electrodos: "≈ 20 cm² (los más cómodos para el cuádriceps)",
        ref: ["glaviano_2016"], estado: "parcial",
        notaFuente: "Los rangos de amplitud (mA) de las tablas del artículo provienen de estudios individuales y no son una recomendación."
      }
    },

    ultrasonido: {
      aguda: {
        modalidad: "Pulsado, razón 1:4 o 1:3 (ciclo de trabajo 20 - 25 %)",
        frecuencia: "3 MHz (lesión superficial) / 1 MHz (profunda; límite aproximado: 2 cm)",
        intensidad: "≈ 0.2 W/cm² en la lesión (dosis no térmica)",
        tiempo: "1 min × n.º de áreas de cabezal × (suma de la razón de pulso). Ejemplo: 1 área, 1:4 → 5 min",
        ref: ["watson_us"], estado: "verificada",
        notaFuente: "Valores de los ejemplos de Watson. La intensidad indicada es la requerida en la lesión; en lesiones profundas la intensidad en superficie debe ser mayor para compensar la atenuación. Profundidad de semivalor: ≈ 2.5 cm a 3 MHz y ≈ 4.0 cm a 1 MHz."
      },
      subaguda: {
        modalidad: "Pulsado, razón 1:2 o 1:1 (ciclo de trabajo 33 - 50 %)",
        frecuencia: "3 MHz (superficial) / 1 MHz (profunda)",
        intensidad: "≈ 0.4 W/cm² en la lesión (dosis no térmica)",
        tiempo: "1 min × n.º de áreas de cabezal × (suma de la razón de pulso). Ejemplo: 2 áreas, 1:2 → 6 min",
        ref: ["watson_us"], estado: "verificada",
        notaFuente: "Valores de los ejemplos de Watson (intensidad requerida en la lesión)."
      },
      cronica: {
        modalidad: "Pulsado 1:1 o continuo",
        frecuencia: "1 MHz (profunda) / 3 MHz (superficial)",
        intensidad: "≈ 0.5 W/cm² en la lesión; ≥ 0.6 W/cm² en cronicidad marcada con emisión continua",
        tiempo: "1 min × n.º de áreas de cabezal × (suma de la razón de pulso). Ejemplos: 2 áreas, 1:1 → 4 min; 3 áreas, continuo → 3 min",
        ref: ["watson_us"], estado: "verificada",
        notaFuente: "Valores de los ejemplos de Watson (dosis no térmicas). Los protocolos térmicos de ultrasonido continuo a mayor intensidad no están cubiertos por la fuente consultada."
      }
    },

    terapia_combinada: {
      aguda: {
        modalidad: "US pulsado 1:4 + TENS de alta frecuencia, aplicados simultáneamente",
        frecuencia: "US 3 MHz (1 MHz si es profundo) | Corriente ≈ 100 Hz, 200 µs",
        intensidad: "US ≈ 0.2 W/cm² | Corriente fuerte pero cómoda, sin contracción",
        tiempo: "El del ultrasonido: 1 min × áreas de cabezal × 5. La corriente acompaña ese tiempo",
        ref: ["watson_us", "vance_2022"], estado: "pendiente",
        notaFuente: "No se encontró un protocolo combinado verificado: se componen las dosis individuales de cada agente. Confirme con el manual de su equipo."
      },
      subaguda: {
        modalidad: "US pulsado 1:2 o 1:1 + TENS de frecuencia mixta",
        frecuencia: "US 1 - 3 MHz | Corriente mixta (< 10 Hz y ≈ 100 Hz), 200 µs",
        intensidad: "US ≈ 0.4 W/cm² | Corriente fuerte pero cómoda",
        tiempo: "El del ultrasonido: 1 min × áreas de cabezal × (suma de la razón de pulso)",
        ref: ["watson_us", "vance_2022"], estado: "pendiente",
        notaFuente: "No se encontró un protocolo combinado verificado: se componen las dosis individuales de cada agente."
      },
      cronica: {
        modalidad: "US pulsado 1:1 o continuo + TENS de baja frecuencia o mixto",
        frecuencia: "US 1 MHz | Corriente < 10 Hz o mixta, 200 µs",
        intensidad: "US ≈ 0.5 W/cm² o más | Corriente fuerte pero cómoda",
        tiempo: "El del ultrasonido: 1 min × áreas de cabezal × (suma de la razón de pulso)",
        ref: ["watson_us", "vance_2022"], estado: "pendiente",
        notaFuente: "No se encontró un protocolo combinado verificado: se componen las dosis individuales de cada agente."
      }
    },

    laser: {
      "*": {
        modalidad: "Láser de baja intensidad Clase 3B (fotobiomodulación), 780 - 860 nm",
        frecuencia: "Emisión continua o pulsada; potencia media de 5 a 500 mW",
        intensidad: "Dosis según la estructura (tabla WALT; use el cálculo de precisión). Máximo 100 mW/cm² en epicondilitis, tracto iliotibial y Aquiles. Reducir la dosis un 30 % cuando la inflamación esté controlada",
        tiempo: "20 a 300 segundos de irradiación. Diario durante 2 semanas, o en días alternos durante 3 a 4 semanas",
        ref: ["walt_2010"], estado: "verificada",
        notaFuente: "La ventana terapéutica es de ± 50 % de la dosis de la tabla; fuera de ella no se considera LLLT. Las dosis son para piel blanca. El documento no aclara si los julios son por punto o totales: el cálculo de precisión aplica por defecto la lectura conservadora."
      }
    },

    magnetoterapia: {
      aguda: { modalidad: "Emisión pulsada (efecto antiedematoso)", frecuencia: "5 - 15 Hz", intensidad: "20 - 40 Gauss", tiempo: "30 minutos", ref: ["general"], estado: "pendiente" },
      subaguda: { modalidad: "Emisión continua o pulsada", frecuencia: "20 - 50 Hz", intensidad: "40 - 60 Gauss", tiempo: "30 - 40 minutos", ref: ["general"], estado: "pendiente" },
      cronica: { modalidad: "Emisión continua (efecto trófico)", frecuencia: "50 - 100 Hz", intensidad: "60 - 100 Gauss", tiempo: "45 minutos", ref: ["general"], estado: "pendiente" }
    },

    ondas_choque: {
      aguda: {
        bloqueo: true,
        mensaje: "Criterio de prudencia general: no se recomienda iniciar ondas de choque en fase inflamatoria aguda. Este criterio no figura en la fuente consultada.",
        ref: ["tenforde_2022"], estado: "pendiente"
      },
      subaguda: {
        bloqueo: true,
        mensaje: "Criterio de prudencia general: se prefiere esperar a la fase crónica. Este criterio no figura en la fuente consultada.",
        ref: ["tenforde_2022"], estado: "pendiente"
      },
      cronica: {
        modalidad: "Focal o radial (ambas con eficacia descrita en fascitis plantar y tendinopatías)",
        frecuencia: "Impulsos y frecuencia por sesión: no especificados en la fuente consultada",
        intensidad: "Iniciar con energía baja y titular según tolerancia. Densidad de flujo de energía (EFD): baja < 0.08, media 0.08 - 0.28, alta > 0.29 - 0.60 mJ/mm². Tendinopatías: baja a media. Tendinopatía calcificante y trastornos óseos: alta",
        tiempo: "3 - 5 sesiones, con intervalo de 1 semana. Energía total = EFD × n.º de impulsos",
        ref: ["tenforde_2022"], estado: "parcial",
        notaFuente: "El artículo imprime el rango bajo como '<0.08-10' (probable errata) y advierte que los puntos de corte varían entre autores. No informa impulsos por sesión, frecuencia (Hz) ni presión (bar)."
      }
    },

    alta_frecuencia: {
      aguda: { modalidad: "Capacitiva atérmica (bioestimulación celular)", frecuencia: "448 kHz aprox.", intensidad: "Escala térmica grado 0 (sin calor detectable)", tiempo: "10 - 15 minutos", ref: ["general"], estado: "pendiente" },
      subaguda: { modalidad: "Capacitiva o resistiva térmica suave", frecuencia: "448 kHz", intensidad: "Escala térmica grado 1 - 2 (calor muy leve)", tiempo: "15 - 20 minutos", ref: ["general"], estado: "pendiente" },
      cronica: { modalidad: "Resistiva hipertérmica (flexibilización del colágeno)", frecuencia: "448 kHz", intensidad: "Escala térmica grado 3 (calor intenso pero confortable)", tiempo: "20 minutos", ref: ["general"], estado: "pendiente" }
    },

    onda_corta: {
      aguda: { modalidad: "Pulsada atérmica (inductiva)", frecuencia: "Baja frecuencia de pulso", intensidad: "Potencia media baja", tiempo: "15 minutos", ref: ["general"], estado: "pendiente" },
      subaguda: { modalidad: "Pulsada con ligero gradiente térmico", frecuencia: "Media frecuencia de pulso", intensidad: "Potencia moderada", tiempo: "15 - 20 minutos", ref: ["general"], estado: "pendiente" },
      cronica: { modalidad: "Continua (térmica profunda, campo condensador)", frecuencia: "Emisión constante", intensidad: "Sensación térmica agradable", tiempo: "20 minutos", ref: ["general"], estado: "pendiente" }
    }
  },

  /*
    FUENTES
    Cada dosificación indica en "ref" las claves de este bloque.
    estado: verificada = se consultó el documento | pendiente = referencia general sin fuente primaria verificada
  */
  fuentes: {
    watson_tens: {
      cita: "Watson T. TENS. Electrotherapy Association (electrotherapy.org). © Tim Watson 1995-2025.",
      url: "https://www.electrotherapy.org/tens",
      detalle: "Principios de colocación: a ambos lados de la lesión o zona dolorosa, nivel de la raíz, nervio periférico proximal, punto motor, puntos gatillo o de acupuntura, dermatoma, miotoma o esclerotoma, y uso de dos canales. La página no cubre tamaño ni separación de electrodos. El sitio indica que algunas páginas están en reconstrucción.",
      estado: "verificada"
    },
    watson_if: {
      cita: "Watson T. Interferential. Electrotherapy Association (electrotherapy.org).",
      url: "https://www.electrotherapy.org/interferential",
      detalle: "Disposición de cuatro polos o bipolar sin diferencia fisiológica conocida, tamaño de electrodos y precauciones de colocación. La lista completa de contraindicaciones del sitio solo estaba disponible como imágenes y no se pudo leer.",
      estado: "verificada"
    },
    watson_nmes: {
      cita: "Watson T. Muscle Stimulation (NMES). Electrotherapy Association (electrotherapy.org).",
      url: "https://www.electrotherapy.org/muscle-stimulation-nmes",
      detalle: "Un electrodo en cada extremo del vientre muscular, variabilidad de los puntos motores, tamaño de electrodos y polaridad. No trata la separación entre electrodos.",
      estado: "verificada"
    },
    general: {
      cita: "Valores de referencia general de la práctica fisioterapéutica.",
      detalle: "No se verificó una fuente primaria en esta versión. Confirme con el manual del equipo y la literatura antes de aplicarlos en clínica.",
      estado: "pendiente"
    },
    watson_us: {
      cita: "Watson T. Ultrasound dose calculations. Electrotherapy Association (electrotherapy.org).",
      url: "https://www.electrotherapy.org/ultrasound-dose-calculations",
      detalle: "Método de cálculo del tiempo (1 min por área de cabezal × factor de pulso), razones de pulso por fase e intensidades de los ejemplos. La página consultada no incluye fórmulas de ERA ni de energía total: esas magnitudes se calculan aquí como definiciones físicas (potencia = intensidad × área; energía = potencia × tiempo).",
      estado: "verificada"
    },
    walt_2010: {
      cita: "World Association of Laser Therapy (WALT). Recommended treatment doses for Low Level Laser Therapy, 780-860 nm. Revisión de abril de 2010.",
      url: "https://waltpbm.org/wp-content/uploads/2021/08/Dose_table_780-860nm_for_Low_Level_Laser_Therapy_WALT-2010.pdf",
      detalle: "Tabla de dosis por estructura, mínimos por punto, límite de 100 mW/cm², tiempo de irradiación de 20 a 300 s, ventana terapéutica de ± 50 % y reducción del 30 % al controlar la inflamación. El documento no indica si la columna de julios es dosis por punto o total del área; esta herramienta aplica por defecto la lectura conservadora (total del área) y permite cambiarla. La tabla de 904 nm no se incluyó porque sus unidades eran ambiguas en la copia consultada.",
      estado: "verificada"
    },
    tenforde_2022: {
      cita: "Tenforde AS, Borgstrom HE, DeLuca S, McCormack M, Singh M, Soo Hoo J, Yun PH. Best practices for extracorporeal shockwave therapy in musculoskeletal medicine: clinical application and training consideration. PM&R. 2022;14(5):611-619. doi:10.1002/pmrj.12790.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9321712",
      detalle: "Categorías de densidad de flujo de energía, esquema de 3 a 5 sesiones semanales, titulación desde energía baja y contraindicaciones.",
      estado: "verificada"
    },
    glaviano_2016: {
      cita: "Glaviano NR, Saliba S. Can the use of neuromuscular electrical stimulation be improved to optimize quadriceps strengthening? Sports Health. 2016;8(1):79-85. doi:10.1177/1941738115618174.",
      url: "https://doi.org/10.1177/1941738115618174",
      detalle: "Frecuencia, ancho de pulso, ciclo de trabajo e intensidad relativa para NMES de cuádriceps.",
      estado: "verificada"
    },
    vance_2022: {
      cita: "Vance CGT, Dailey DL, Chimenti RL, Van Gorp BJ, Crofford LJ, Sluka KA. Using TENS for pain control: update on the state of the evidence. Medicina (Kaunas). 2022;58(10):1332. doi:10.3390/medicina58101332.",
      url: "https://doi.org/10.3390/medicina58101332",
      detalle: "Definición de frecuencias, descripción de la intensidad, ejemplos de dosis de ensayos y tolerancia con el uso diario.",
      estado: "verificada"
    },
    acsm_2009: {
      cita: "American College of Sports Medicine. Position Stand: Progression models in resistance training for healthy adults. Med Sci Sports Exerc. 2009;41(3):687-708.",
      url: "https://www.sportgeneeskunde.com/wp-content/uploads/ACSM-Position-Stand-Progression-Models-in-Resistance-Training-for-Healthy-Adults.pdf",
      detalle: "Carga, descanso, velocidad y frecuencia por objetivo y nivel de entrenamiento. En la copia consultada algunos caracteres de la sección de resistencia muscular eran ilegibles; esos valores figuran como parciales.",
      estado: "verificada"
    },
    acsm_2026: {
      cita: "Phillips SM (chair), Currier BS, D'Souza AC, Fiatarone Singh MA, Lowisz CV, Rawson ES, Schoenfeld BJ, Smith-Ryan AE, Steen JP, Thomas GA, Triplett NT, Washington TA, Werner TJ. Resistance training prescription for muscle function, hypertrophy, and physical performance in healthy adults: an overview of reviews. Med Sci Sports Exerc. Abril de 2026.",
      url: "https://acsm.org/science-spotlight-acsm-releases-new-position-stand-on-resistance-training/",
      detalle: "Se consultó la presentación resumen publicada por ACSM, no el texto completo. Actualiza la postura de 2009 para adultos sanos.",
      estado: "verificada"
    },
    lacio_2010: {
      cita: "Lacio et al. (2010). Motricidade. Comparación de ecuaciones de predicción de 1RM en press de banca (O'Conner 1989, Baechle y Groves 2000, Epley, Brzycki 1993, Lander 1985, Adams 1994).",
      url: "https://www.redalyc.org/pdf/2730/273019708005.pdf",
      detalle: "Fórmulas tal como las publica el estudio. Validado en 31 varones con 4 a 10 repeticiones; el propio estudio recomienda probarlas en mujeres, adolescentes y adultos mayores.",
      estado: "verificada"
    },
    rio_2015: {
      cita: "Rio E, Kidgell D, Purdam C, Gaida J, Moseley GL, Pearce AJ, Cook J. Isometric exercise induces analgesia and reduces inhibition in patellar tendinopathy. Br J Sports Med. 2015. doi:10.1136/bjsports-2014-094386.",
      url: "https://doi.org/10.1136/bjsports-2014-094386",
      detalle: "Estudio cruzado en 6 atletas con tendinopatía rotuliana. Extrapolar a otros tendones es criterio clínico.",
      estado: "verificada"
    },
    beyer_2015: {
      cita: "Beyer R, Kongsgaard M, Hougs Kjær B, Øhlenschlæger T, Kjær M, Magnusson SP. Heavy slow resistance versus eccentric training as treatment for Achilles tendinopathy: a randomized controlled trial. Am J Sports Med. 2015;43(7):1704-1711.",
      detalle: "Ensayo en 58 pacientes con tendinopatía aquílea de la porción media. Protocolo de carga lenta y pesada (HSR) y protocolo excéntrico de Alfredson, con reglas de dolor.",
      estado: "verificada"
    },
    patterson_2019: {
      cita: "Patterson SD, Hughes L, Warmington S, Burr J, Scott BR, Owens J, Abe T, Nielsen JL, Libardi CA, Laurentino G, Neto GR, Brandner C, Martin-Hernandez J, Loenneke J. Blood flow restriction exercise: considerations of methodology, application, and safety. Front Physiol. 2019;10:533. doi:10.3389/fphys.2019.00533.",
      url: "https://doi.org/10.3389/fphys.2019.00533",
      detalle: "Carga, esquema de repeticiones, descanso, frecuencia, presión relativa a la oclusión arterial y ancho de manguito. El documento no incluye una lista explícita de contraindicaciones.",
      estado: "verificada"
    }
  },

  /*
    POSICIÓN DE ELECTRODOS (electroterapia y NMES)
    Las estrategias y notas provienen de las fuentes citadas en "ref".
    La asignación de estrategias por tejido es una aplicación de esos principios, no una tabla de la fuente.
    Para agregar o cambiar una asignación, edite "porTejido" con claves de "estrategias".
  */
  electrodos: {
    estrategias: {
      flanquear: {
        nombre: "A ambos lados de la zona dolorosa",
        texto: "Es el enfoque más habitual: un electrodo a cada lado de la lesión o del área dolorosa, de modo que la corriente atraviese la zona.",
        ref: ["watson_tens"]
      },
      nervio: {
        nombre: "Sobre el nervio periférico, proximal al dolor",
        texto: "Estimular el nervio periférico que inerva la zona, en un punto proximal al área dolorosa. Los electrodos se colocan sobre el trayecto del nervio.",
        ref: ["watson_tens", "vance_2022"]
      },
      raiz: {
        nombre: "Nivel de la raíz nerviosa o dermatoma",
        texto: "Dirigir el estímulo al nivel medular que corresponde al dolor: raíz nerviosa, dermatoma, miotoma o esclerotoma.",
        ref: ["watson_tens"]
      },
      dos_canales: {
        nombre: "Dos canales (cuatro electrodos)",
        texto: "En dolor vago, difuso o extenso se pueden usar ambos canales a la vez. En dolor local con componente referido, un canal para cada componente. Con cuatro polos las corrientes se cruzan en el tejido.",
        ref: ["watson_tens", "watson_if"]
      },
      puntos: {
        nombre: "Puntos gatillo o puntos de acupuntura",
        texto: "Colocar los electrodos sobre puntos gatillo o de acupuntura relacionados con el mismo nivel segmentario.",
        ref: ["watson_tens"]
      },
      vientre: {
        nombre: "Extremos del vientre muscular (NMES)",
        texto: "Un electrodo en cada extremo del vientre del músculo o del grupo muscular que se desea activar.",
        ref: ["watson_nmes"]
      },
      punto_motor: {
        nombre: "Sobre el punto motor (NMES)",
        texto: "Algunos profesionales prefieren colocar un electrodo sobre el punto motor. Los puntos motores no están en posición fija y varían bastante entre personas: los mapas solo muestran posiciones promedio.",
        ref: ["watson_nmes"]
      }
    },

    // Primera estrategia = sugerida (con su esquema); las demás son alternativas.
    porTejido: {
      tens: {
        tendon:       ["flanquear", "nervio", "puntos"],
        fascia:       ["flanquear", "nervio", "puntos"],
        bursa:        ["flanquear", "nervio", "puntos"],
        ligamento:    ["flanquear", "nervio", "puntos"],
        menisco:      ["flanquear", "nervio", "puntos"],
        luxacion:     ["flanquear", "nervio", "puntos"],
        articulacion: ["flanquear", "nervio", "puntos"],
        musculo:      ["flanquear", "puntos", "nervio"],
        hueso:        ["flanquear", "nervio"],
        postquirurgico: ["flanquear", "nervio"],
        nervio:       ["nervio", "raiz", "flanquear"],
        disco:        ["raiz", "dos_canales", "flanquear"],
        sistemico:    ["dos_canales", "raiz", "puntos"]
      },
      nmes: { "*": ["vientre", "punto_motor"] }
    },

    // Para estos tejidos no se incluye una colocación específica
    sinColocacion: {
      snc: "En patología neurológica central la colocación depende del objetivo (por ejemplo, activar un grupo muscular parético o reducir la espasticidad) y la define el equipo de neurorrehabilitación. No se incluye una colocación específica en esta versión.",
      suelo_pelvico: "La colocación en el suelo pélvico (perineal o endocavitaria) requiere indicación y formación específicas. No se incluye en esta versión.",
      piel: "Sobre piel lesionada no se colocan electrodos. Esta versión no incluye una colocación específica para este diagnóstico.",
      vascular: "No se incluye una colocación específica para este diagnóstico en esta versión."
    },

    // Notas generales (cada una con su fuente)
    notas: [
      { texto: "La estimulación de baja frecuencia (tipo acupuntura) puede aplicarse también en el lado contralateral del cuerpo.", ref: ["watson_tens"] },
      { texto: "Prefiera electrodos autoadhesivos prellenados con gel: la reacción cutánea de tipo alérgico es la queja más común (≈ 2 - 3 % de los pacientes) y casi siempre se debe a los electrodos, al gel o a la cinta.", ref: ["watson_tens"] },
      { texto: "Los electrodos grandes son más cómodos y efectivos en NMES. En el cuádriceps se describieron electrodos de ≈ 20 cm² como los más cómodos.", ref: ["watson_nmes", "glaviano_2016"] },
      { texto: "Los electrodos pequeños y muy cercanos aumentan el riesgo de irritación superficial y de quemadura.", ref: ["watson_if"] },
      { texto: "Con una onda bifásica la polaridad (rojo o negro) no cambia de forma relevante el resultado.", ref: ["watson_nmes"] },
      { texto: "No colocar electrodos sobre la pared torácica anterior, los ojos, la cara anterior del cuello, los senos carotídeos ni piel lesionada, ni sobre el tronco o la pelvis durante el embarazo. Si hay sensibilidad alterada, elegir otro sitio.", ref: ["watson_if"] },
      { texto: "Las fuentes consultadas no indican una distancia mínima entre electrodos ni un tamaño para TENS.", ref: [] }
    ]
  },

  /*
    DOSIMETRÍA DE PRECISIÓN (cálculos opcionales)
  */
  dosimetria: {

    // Ultrasonido: método de Watson (1 minuto de energía por cada área de cabezal)
    ultrasonido: {
      minutosPorArea: 1,
      factorPulso: { "1:4": 5, "1:3": 4, "1:2": 3, "1:1": 2, "continuo": 1 },
      porFase: {
        aguda:    { razon: "1:4",      intensidad: 0.2, mhz: 3 },
        subaguda: { razon: "1:2",      intensidad: 0.4, mhz: 3 },
        cronica:  { razon: "1:1",      intensidad: 0.5, mhz: 1 }
      },
      semivalor_cm: { "1": 4.0, "3": 2.5 },
      ref: ["watson_us"]
    },

    // Láser de baja intensidad: tabla WALT 780 - 860 nm
    laser: {
      ref: ["walt_2010"],
      longitud_onda: "780 - 860 nm (Clase 3B, GaAlAs)",
      tiempo_irradiacion_s: [20, 300],
      reduccion_control_inflamacion: 0.30,
      ventana: 0.50,
      esquema: "Diario durante 2 semanas, o en días alternos durante 3 a 4 semanas",
      // joules = valor de la tabla | puntos = [min, max] | minPunto = J mínimos por punto | maxMwCm2 = límite de densidad de potencia
      estructuras: [
        { id: "tunel_carpiano",    nombre: "Túnel carpiano",                grupo: "Tendinopatías", puntos: [2, 3], joules: 8,  minPunto: 4, cie: ["G56.0"] },
        { id: "epicondilitis",     nombre: "Epicondilitis lateral",         grupo: "Tendinopatías", puntos: [1, 2], joules: 4,  maxMwCm2: 100, cie: ["M77.1", "M77.0"] },
        { id: "biceps",            nombre: "Tendón largo del bíceps",       grupo: "Tendinopatías", puntos: [1, 2], joules: 6,  cie: ["M75.2"] },
        { id: "supraespinoso",     nombre: "Supraespinoso",                 grupo: "Tendinopatías", puntos: [2, 3], joules: 8,  minPunto: 4, cie: ["M75.1", "M75.3", "M75.4", "S46.0"] },
        { id: "infraespinoso",     nombre: "Infraespinoso",                 grupo: "Tendinopatías", puntos: [2, 3], joules: 8,  minPunto: 4, cie: [] },
        { id: "trocanter",         nombre: "Trocánter mayor",               grupo: "Tendinopatías", puntos: [2, 4], joules: 8,  cie: ["M70.6", "M76.0"] },
        { id: "rotuliano",         nombre: "Tendón rotuliano",              grupo: "Tendinopatías", puntos: [2, 3], joules: 8,  cie: ["M76.5"] },
        { id: "tracto_iliotibial", nombre: "Tracto iliotibial",             grupo: "Tendinopatías", puntos: [1, 2], joules: 4,  maxMwCm2: 100, cie: ["M76.3"] },
        { id: "aquiles",           nombre: "Tendón de Aquiles",             grupo: "Tendinopatías", puntos: [2, 3], joules: 8,  maxMwCm2: 100, cie: ["M76.6", "S86.0"] },
        { id: "fascitis_plantar",  nombre: "Fascitis plantar",              grupo: "Tendinopatías", puntos: [2, 3], joules: 8,  minPunto: 4, cie: ["M72.2", "M77.3"] },

        { id: "dedo",              nombre: "Dedo (IFP o MCF)",              grupo: "Articulaciones", puntos: [1, 2], joules: 4,  cie: ["M65.3", "S63.6"] },
        { id: "muneca",            nombre: "Muñeca",                        grupo: "Articulaciones", puntos: [2, 4], joules: 8,  cie: ["M65.4", "S63.5", "S63.3"] },
        { id: "humerorradial",     nombre: "Articulación humerorradial",    grupo: "Articulaciones", puntos: [1, 2], joules: 4,  cie: [] },
        { id: "codo",              nombre: "Codo",                          grupo: "Articulaciones", puntos: [2, 4], joules: 8,  cie: ["M70.2"], nota: "El documento imprime '2.4' como número de puntos; se interpreta como 2 a 4." },
        { id: "glenohumeral",      nombre: "Articulación glenohumeral",     grupo: "Articulaciones", puntos: [2, 4], joules: 8,  minPunto: 4, cie: ["M75.0", "M75.5"] },
        { id: "acromioclavicular", nombre: "Articulación acromioclavicular", grupo: "Articulaciones", puntos: [1, 2], joules: 4, cie: ["S43.1"] },
        { id: "atm",               nombre: "Articulación temporomandibular", grupo: "Articulaciones", puntos: [1, 2], joules: 4, cie: ["M26.6"] },
        { id: "cervical",          nombre: "Columna cervical",              grupo: "Articulaciones", puntos: [4, 12], joules: 16, minPunto: 4, cie: ["M54.2", "M50.1", "M50.2", "M53.1"] },
        { id: "lumbar",            nombre: "Columna lumbar",                grupo: "Articulaciones", puntos: [4, 8], joules: 16, minPunto: 4, cie: ["M54.5", "M51.1", "M51.2", "M47.8", "M48.0", "S33.5"] },
        { id: "cadera",            nombre: "Cadera",                        grupo: "Articulaciones", puntos: [2, 4], joules: 12, minPunto: 6, cie: ["M16.9"] },
        { id: "rodilla",           nombre: "Rodilla (compartimento medial)", grupo: "Articulaciones", puntos: [3, 6], joules: 12, minPunto: 4, cie: ["M17.9", "M22.2", "M94.2", "M23.5"] },
        { id: "tobillo",           nombre: "Tobillo",                       grupo: "Articulaciones", puntos: [2, 4], joules: 8,  cie: ["S93.4"] }
      ]
    },

    // Ondas de choque: Tenforde 2022
    ondas_choque: {
      efd: { baja: "< 0.08", media: "0.08 - 0.28", alta: "> 0.29 - 0.60" },
      limites: { media: [0.08, 0.28], alta: [0.29, 0.60] },
      sesiones: "3 a 5, con intervalo de 1 semana",
      ref: ["tenforde_2022"]
    }
  },

  /*
    EJERCICIO TERAPÉUTICO
    Carga prescrita con porcentaje del 1RM (o RM), ajustada por tejido lesionado y antigüedad.
  */
  ejercicio: {

    // Estimación de 1RM a partir de una carga submáxima y las repeticiones realizadas (Lacio 2010).
    //   tipo "mult": 1RM = carga × (a + b × reps)   |   tipo "div": 1RM = carga / (a − b × reps)
    formulas1RM: [
      { id: "epley",    nombre: "Epley",              tipo: "mult", a: 1,     b: 0.033333 },
      { id: "brzycki",  nombre: "Brzycki",            tipo: "div",  a: 1.0278, b: 0.0278 },
      { id: "lander",   nombre: "Lander",             tipo: "div",  a: 1.013,  b: 0.0267123 },
      { id: "oconner",  nombre: "O'Conner",           tipo: "mult", a: 1,     b: 0.025 },
      { id: "baechle",  nombre: "Baechle y Groves",   tipo: "mult", a: 0.978, b: 0.0375 },
      { id: "adams",    nombre: "Adams",              tipo: "div",  a: 1,     b: 0.02 }
    ],
    formulaPorDefecto: "epley",
    maxRepsValidez: 10,
    // Equivalencia entre n.º de repeticiones máximas (RM) y %1RM: Brzycki, %1RM = 102.78 − 2.78 × n
    equivalenciaRM: { a: 102.78, b: 2.78 },

    // Frecuencia semanal por nivel de entrenamiento (ACSM 2009)
    niveles: {
      novato:     { nombre: "Principiante", frecuencia: "2 - 3 días/semana" },
      intermedio: { nombre: "Intermedio (≈ 6 meses de entrenamiento)", frecuencia: "3 - 4 días/semana" },
      avanzado:   { nombre: "Avanzado (años de entrenamiento)", frecuencia: "4 - 5 días/semana" }
    },

    // Orden de las columnas de la matriz de progresión: ver "ordenObjetivos"
    ordenObjetivos: ["isometrico", "hsr", "alfredson", "fuerza", "hipertrofia", "potencia", "resistencia", "bfr"],

    // tipo: carga = se calcula con %1RM | isometrico, hsr, bfr, fijo = protocolos propios
    objetivos: {
      fuerza: {
        nombre: "Fuerza máxima", tipo: "carga", rm: [1, 6], pctMin: 80, pctMax: 100,
        series: "2 - 3 por ejercicio (ACSM 2026)",
        repeticiones: "1 - 6 RM (ACSM 2009)",
        tempo: "Moderado: 1 - 2 s concéntrico y 1 - 2 s excéntrico (ACSM 2009)",
        descanso: "3 - 5 minutos (ACSM 2009)",
        frecuenciaPorNivel: true,
        progresion: "Aumentar la carga 2 - 10 % cuando se logren 1 - 2 repeticiones por encima de lo planificado (ACSM 2009)",
        notaFuente: "ACSM 2026 indica cargas ≥ 80 % del 1RM; ACSM 2009 indica 1 - 6 RM (≈ 86 - 100 %).",
        ref: ["acsm_2009", "acsm_2026"], estado: "verificada"
      },
      hipertrofia: {
        nombre: "Hipertrofia", tipo: "carga", rm: [6, 12],
        series: "Volumen ≥ 10 series semanales por grupo muscular (ACSM 2026); varias series por ejercicio (ACSM 2009)",
        repeticiones: "6 - 12 RM (ACSM 2009)",
        tempo: "Moderado: 1 - 2 s concéntrico y 1 - 2 s excéntrico (ACSM 2009)",
        descanso: "1 - 2 minutos (ACSM 2009)",
        frecuenciaPorNivel: true,
        progresion: "Aumentar la carga 2 - 10 % cuando se logren 1 - 2 repeticiones por encima de lo planificado (ACSM 2009)",
        notaFuente: "El porcentaje del 1RM se obtiene de la equivalencia de Brzycki para 6 y 12 RM. ACSM 2026 señala que entrenar hasta el fallo muscular no mejora de forma consistente los resultados en adultos sanos.",
        ref: ["acsm_2009", "acsm_2026"], estado: "verificada"
      },
      potencia: {
        nombre: "Potencia", tipo: "carga", pctMin: 30, pctMax: 70,
        series: "3 - 5 por ejercicio (ACSM 2009)",
        repeticiones: "Pocas repeticiones por serie, de modo que repeticiones × series < 24 (ACSM 2026)",
        tempo: "Fase concéntrica lo más rápida posible (ACSM 2009 y 2026)",
        descanso: "3 - 5 minutos (ACSM 2009)",
        frecuenciaPorNivel: true,
        progresion: "Priorizar la velocidad de ejecución; subir la carga solo si se mantiene la velocidad",
        notaFuente: "ACSM 2026: 30 - 70 % del 1RM. ACSM 2009: 0 - 60 % en tren inferior y 30 - 60 % en tren superior. La regla de progresión por velocidad es criterio general.",
        ref: ["acsm_2009", "acsm_2026"], estado: "parcial"
      },
      resistencia: {
        nombre: "Resistencia muscular local", tipo: "carga", pctMin: 40, pctMax: 60,
        series: "No especificadas en la fuente consultada",
        repeticiones: "Altas (≈ 10 - 15 o más). El texto consultado era parcialmente ilegible",
        tempo: "Moderado",
        descanso: "Cortos, de 90 s o menos (texto parcialmente ilegible)",
        frecuenciaPorNivel: true,
        progresion: "Aumentar repeticiones y luego carga",
        notaFuente: "ACSM 2026 declara datos insuficientes para recomendar una carga en resistencia muscular. Los valores de ACSM 2009 se leyeron en una copia con caracteres ilegibles: verifique contra el original.",
        ref: ["acsm_2009", "acsm_2026"], estado: "parcial"
      },
      isometrico: {
        nombre: "Isométrico analgésico (tendón)", tipo: "isometrico",
        carga: "70 % de la contracción voluntaria máxima isométrica (CVM). No se calcula con el 1RM",
        series: "5 contracciones",
        repeticiones: "45 segundos por contracción",
        tempo: "Contracción sostenida, sin movimiento articular",
        descanso: "2 minutos entre contracciones (recuperación completa)",
        frecuencia: "El estudio evaluó una sola sesión; el alivio duró al menos 45 minutos",
        progresion: "Ajustar según el dolor. El efecto analgésico se aprovecha antes de otras formas de carga",
        notaFuente: "Estudio cruzado en 6 atletas con tendinopatía rotuliana. Extrapolar a otros tendones es criterio clínico.",
        ref: ["rio_2015"], estado: "parcial"
      },
      hsr: {
        nombre: "Carga lenta y pesada (HSR, tendón de Aquiles)", tipo: "hsr",
        tempo: "3 s excéntrico + 3 s concéntrico (6 s por repetición)",
        descanso: "2 - 3 minutos entre series; 5 minutos entre ejercicios",
        frecuencia: "3 sesiones por semana durante 12 semanas",
        ejercicios: "Elevación de talones con rodilla flexionada (máquina sentado), con rodilla extendida (prensa) y con rodilla extendida de pie sobre un disco con barra en los hombros",
        notaFuente: "Protocolo del ensayo en tendinopatía aquílea de la porción media. Extrapolar a otros tendones es criterio clínico.",
        ref: ["beyer_2015"], estado: "parcial"
      },
      alfredson: {
        nombre: "Excéntrico de Alfredson (tendón de Aquiles)", tipo: "fijo",
        carga: "Peso corporal; progresar con mochila cargada a medida que disminuye el dolor (sin tabla semanal)",
        series: "3 series por ejercicio, con 2 ejercicios (rodilla extendida y flexionada)",
        repeticiones: "15 repeticiones por serie",
        tempo: "≈ 3 segundos por repetición (descenso del talón desde un escalón)",
        descanso: "2 minutos entre series; 5 minutos entre los dos ejercicios",
        frecuencia: "2 veces al día, 7 días a la semana, durante 12 semanas",
        progresion: "Añadir carga con mochila cuando el dolor disminuya",
        notaFuente: "En el ensayo la adherencia fue del 78 % con este protocolo frente al 92 % con HSR.",
        ref: ["beyer_2015"], estado: "verificada"
      },
      bfr: {
        nombre: "Restricción del flujo sanguíneo (BFR)", tipo: "bfr", pctMin: 20, pctMax: 40,
        series: "2 - 4 series (el esquema 30-15-15-15 usa 4)",
        repeticiones: "30 - 15 - 15 - 15 (75 repeticiones en total) o series hasta el fallo",
        tempo: "Controlado",
        descanso: "30 - 60 segundos, manteniendo la restricción",
        frecuencia: "2 - 3 sesiones por semana durante más de 3 semanas (1 - 2 sesiones al día si el programa dura 1 - 3 semanas)",
        presion: "40 - 80 % de la presión de oclusión arterial (AOP)",
        manguito: "5 cm (pequeño), 10 - 12 cm (mediano) o 17 - 18 cm (grande). A mayor ancho, menor presión absoluta",
        progresion: "Aumentar la presión o la carga de forma gradual, según tolerancia",
        notaFuente: "Útil cuando la carga alta no es aconsejable (p. ej. posoperatorio). El documento menciona como factores de riesgo de tromboembolismo la cirugía ortopédica mayor, el cáncer, la obesidad y el embarazo, sin presentarlos como una lista de contraindicaciones.",
        ref: ["patterson_2019"], estado: "verificada"
      }
    },

    // Progresión del protocolo HSR (Beyer 2015): semanas, series y repeticiones máximas (RM)
    hsrSemanas: [
      { desde: 1, hasta: 1,  series: 3, rm: 15 },
      { desde: 2, hasta: 3,  series: 3, rm: 12 },
      { desde: 4, hasta: 5,  series: 4, rm: 10 },
      { desde: 6, hasta: 8,  series: 4, rm: 8 },
      { desde: 9, hasta: 12, series: 4, rm: 6 }
    ],
    reglaDolor: "Durante el ejercicio se aceptó un dolor de 40 - 50 mm en la escala visual análoga de 100 mm, siempre que disminuya antes de la sesión siguiente. Si no remite, ajustar la carga o las actividades (Beyer 2015, tendinopatía aquílea).",

    // Tejido de cada diagnóstico → grupo de progresión
    tejidoAGrupo: {
      tendon: "tendon", fascia: "tendon", bursa: "tendon",
      musculo: "musculo",
      ligamento: "ligamento", menisco: "ligamento", luxacion: "ligamento",
      articulacion: "articulacion", disco: "articulacion", sistemico: "articulacion",
      hueso: "hueso", postquirurgico: "postquirurgico", nervio: "nervio", snc: "snc"
    },

    /*
      Matriz de progresión según tejido y fase evolutiva.
      Cada cadena de 8 letras sigue el orden de "ordenObjetivos":
      isometrico, hsr, alfredson, fuerza, hipertrofia, potencia, resistencia, bfr
      I = indicado | P = con precaución | N = no indicado
      Es un criterio general de progresión por tejido y antigüedad; NO proviene de una guía específica.
    */
    matriz: {
      tendon:         { aguda: "INNNNNNP", subaguda: "IPPNPNPI", cronica: "IIIPIPII" },
      musculo:        { aguda: "PNNNNNNN", subaguda: "IPNPPNII", cronica: "IINIIPII" },
      ligamento:      { aguda: "PNNNNNNN", subaguda: "IPNPPNII", cronica: "IINIIPII" },
      articulacion:   { aguda: "PNNNNNPN", subaguda: "IPNPPNII", cronica: "IINIIPII" },
      hueso:          { aguda: "NNNNNNNP", subaguda: "PNNNNNNP", cronica: "PPNPPNPP" },
      postquirurgico: { aguda: "PNNNNNNP", subaguda: "PNNNNNPI", cronica: "IPNPPNII" },
      nervio:         { aguda: "PNNNNNNN", subaguda: "INNPNNPN", cronica: "IPNPPNIN" },
      snc:            { aguda: "PNNNNNPN", subaguda: "PNNPPPPN", cronica: "PNNPPPPN" },
      otros:          { aguda: "NNNNNNNN", subaguda: "NNNNNNNN", cronica: "NNNNNNNN" }
    },

    mensajes: {
      tendon: {
        aguda: "Tendón reactivo o irritable: priorizar isométricos guiados por el dolor. Evitar cargas pesadas y progresiones rápidas.",
        subaguda: "Introducir carga de forma gradual, empezando por las repeticiones más altas (p. ej. 15 RM en HSR) y respetando la regla de dolor.",
        cronica: "Es la fase en la que se estudiaron los protocolos de carga lenta y pesada y excéntrico. Progresar la carga según el dolor y la respuesta."
      },
      musculo: {
        aguda: "Evitar la carga sobre el músculo lesionado. Solo contracciones submáximas sin dolor, si el cuadro lo permite.",
        subaguda: "Cargas bajas a moderadas sin dolor; la restricción de flujo es una opción cuando la carga alta aún no es aconsejable.",
        cronica: "Progresar a cargas altas según tolerancia; reservar la potencia para la reincorporación deportiva."
      },
      ligamento: {
        aguda: "Proteger la estructura. Contracciones submáximas sin estresar el ligamento; seguir la indicación médica sobre inmovilización.",
        subaguda: "Cargas bajas a moderadas y controladas, sin provocar inestabilidad ni dolor.",
        cronica: "Progresar la carga y la complejidad; la potencia se reserva para el retorno deportivo con estabilidad confirmada."
      },
      articulacion: {
        aguda: "Brote o dolor agudo: movilidad y contracciones submáximas sin dolor; evitar carga alta.",
        subaguda: "Carga progresiva dentro del rango sin dolor; considerar la restricción de flujo si hay intolerancia a la carga alta.",
        cronica: "El entrenamiento de fuerza progresivo es adecuado; ajustar a la tolerancia articular y a los brotes."
      },
      hueso: {
        aguda: "No cargar el foco de fractura. Trabajar solo segmentos no afectados y seguir la indicación médica. Considerar el riesgo de tromboembolismo antes de usar restricción de flujo.",
        subaguda: "Contracciones submáximas de la musculatura adyacente solo si el médico lo autoriza. Sin cargas sobre el foco.",
        cronica: "Más de 28 días no equivale a consolidación. Confirmar la consolidación radiológica y la autorización médica antes de progresar la carga."
      },
      postquirurgico: {
        aguda: "Seguir estrictamente el protocolo del cirujano. No se prescriben cargas por porcentaje de 1RM.",
        subaguda: "La restricción de flujo se ha descrito como alternativa cuando la carga alta no es aconsejable en el posoperatorio. Confirmar con el equipo quirúrgico.",
        cronica: "Progresar según el protocolo del cirujano y la evolución clínica."
      },
      nervio: {
        aguda: "Evitar el estiramiento y la compresión del nervio; solo contracciones submáximas sin síntomas neurológicos.",
        subaguda: "Cargas bajas, vigilando parestesias, debilidad o dolor irradiado.",
        cronica: "Progresar con cautela, monitorizando los síntomas neurológicos."
      },
      snc: {
        aguda: "Paciente neurológico en fase temprana: la prescripción de carga la define el equipo de rehabilitación neurológica.",
        subaguda: "Evaluar espasticidad, fatiga y control motor antes de prescribir carga. Las fases se miden con umbrales propios del sistema nervioso central.",
        cronica: "Evaluar espasticidad, fatiga y control motor antes de prescribir carga; individualizar según la capacidad funcional."
      },
      otros: {
        aguda: "Esta herramienta no prescribe carga por porcentaje de 1RM para este diagnóstico.",
        subaguda: "Esta herramienta no prescribe carga por porcentaje de 1RM para este diagnóstico.",
        cronica: "Esta herramienta no prescribe carga por porcentaje de 1RM para este diagnóstico (p. ej. el entrenamiento del suelo pélvico requiere programas específicos no incluidos)."
      }
    },

    notaGeneral: "Los estados Indicado, Precaución y No indicado son un criterio general de progresión según el tejido y la antigüedad; no provienen de una guía específica. En un segmento lesionado no se recomienda evaluar el 1RM de forma directa: use una estimación submáxima o el segmento contralateral. La prescripción final es responsabilidad del fisioterapeuta."
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
    },

    // Láser
    {
      agentes: ["laser"],
      tejidos: "*",
      fases: "*",
      nivel: "precaucion",
      titulo: "Seguridad con láser",
      mensaje: "Use protección ocular para el paciente y el operador, no irradie directamente los ojos ni zonas con tumor conocido. Criterio general de seguridad no extraído de la tabla WALT; consulte el manual del equipo."
    },

    // Luxaciones
    {
      agentes: "*",
      tejidos: ["luxacion"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Luxación o subluxación",
      mensaje: "Confirmar que la articulación está reducida y descartar fractura asociada y lesión neurovascular antes de aplicar cualquier agente físico. Respetar el período de inmovilización indicado por el médico tratante."
    },

    // Suelo pélvico
    {
      agentes: "*",
      tejidos: ["suelo_pelvico"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Región pélvica",
      mensaje: "Descartar embarazo, infección urinaria o vaginal activa, sangrado sin diagnóstico, neoplasia y marcapasos antes de aplicar. Verificar la presencia de DIU u otro material metálico antes de usar campos electromagnéticos, alta frecuencia o ultrasonido sobre la zona."
    },

    // Neurológico central
    {
      agentes: "*",
      tejidos: ["snc"],
      fases: "*",
      nivel: "info",
      titulo: "Patología neurológica central",
      mensaje: "Los agentes físicos son un complemento del programa de rehabilitación funcional. Las fases evolutivas se calculan con umbrales propios del sistema nervioso central (subaguda hasta aproximadamente 6 meses). Ajustar siempre según la respuesta y la tolerancia del paciente."
    },
    {
      agentes: ["ultrasonido", "onda_corta", "alta_frecuencia", "terapia_combinada"],
      tejidos: ["snc"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Sensibilidad alterada",
      mensaje: "Verificar la sensibilidad térmica y dolorosa antes de aplicar. Con hipoestesia, alteraciones cognitivas o dificultad para comunicarse, el paciente puede no referir sobrecalentamiento."
    },
    {
      agentes: ["electroterapia", "terapia_combinada"],
      tejidos: ["snc"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Estimulación eléctrica en paciente neurológico",
      mensaje: "En antecedente de epilepsia o crisis convulsivas evitar la estimulación en cabeza y cuello. Observar la respuesta del tono muscular y de la espasticidad durante y después de la aplicación."
    },

    // Piel
    {
      agentes: "*",
      tejidos: ["piel"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Integridad de la piel",
      mensaje: "No aplicar sobre heridas abiertas ni sobre piel con signos de infección. Proteger la zona con el medio de acoplamiento adecuado y vigilar la tolerancia cutánea."
    },

    // Vascular
    {
      agentes: "*",
      tejidos: ["vascular"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Compromiso circulatorio o linfático",
      mensaje: "Descartar trombosis venosa profunda antes de aplicar cualquier agente en el miembro. Evitar los efectos térmicos intensos sobre zonas con edema o con circulación comprometida."
    },

    // Pediatría
    {
      agentes: ["ultrasonido", "onda_corta", "alta_frecuencia", "terapia_combinada", "ondas_choque"],
      tejidos: ["pediatrico"],
      fases: "*",
      nivel: "precaucion",
      titulo: "Paciente pediátrico",
      mensaje: "Evitar la aplicación sobre cartílagos de crecimiento (fisis) abiertos. El calor profundo y las ondas de choque solo deben usarse con criterio especializado y a intensidades reducidas."
    },
    {
      agentes: "*",
      tejidos: ["pediatrico"],
      fases: "*",
      nivel: "info",
      titulo: "Dosificación pediátrica",
      mensaje: "Los valores mostrados corresponden a adultos. En niños reducir intensidad y tiempo de aplicación según edad, peso y tolerancia."
    }
  ]
};
