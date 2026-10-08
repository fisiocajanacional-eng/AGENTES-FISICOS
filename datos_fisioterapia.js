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

  version: "1.1",
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
    { c: "Z96.6", n: "Presencia de implante ortopédico articular (prótesis)", g: "Posquirúrgico", t: "postquirurgico" },
    { c: "Z89.9", n: "Ausencia adquirida de miembro (amputación), sin otra especificación", g: "Posquirúrgico", t: "postquirurgico", s: "amputado muñón protesis" },

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
