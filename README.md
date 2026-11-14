# FISIOTERAPIA CNS - Calculadora de dosificación

Autor: Lic. Luis F. Castro

Herramienta web (HTML + JavaScript) que sugiere la dosificación de agentes físicos y de ejercicio terapéutico
según el diagnóstico (CIE-10), la antigüedad de la lesión y el agente u objetivo seleccionado.
Cada recomendación muestra su fuente y su estado de verificación.

## Archivos

| Archivo | Contenido |
|---|---|
| `calculadora_fisioterapia.html` | Interfaz y motor de cálculo. Rara vez necesita cambios. |
| `datos_fisioterapia.js` | Diagnósticos, dosificaciones, fuentes, tablas de dosimetría, protocolos de ejercicio y reglas. Es el archivo que se actualiza. |

Ambos archivos deben estar en la misma carpeta. Funciona abriendo el HTML en el navegador o publicado en GitHub Pages.

## Módulos

- **Agentes físicos:** electroterapia (TENS), NMES, ultrasonido, terapia combinada, láser de baja intensidad,
  campo magnético, ondas de choque, alta frecuencia y onda corta.
- **Cálculo de precisión (opcional):** ultrasonido y terapia combinada (frecuencia 1 o 3 MHz, ERA, área, ciclo de trabajo 20, 50 o 100 %, SATA, energía),
  láser (estructura, potencia, área del haz, puntos, tiempo por punto, densidades) y ondas de choque (energía total).
- **Posición de electrodos (TENS y NMES):** recuadro con esquema ilustrativo, colocación sugerida, alternativas y consideraciones,
  basado en principios de Watson (electrotherapy.org). La asignación por tejido es criterio de aplicación, no una tabla de la fuente.
  Se edita en el bloque `electrodos` del archivo de datos.
- **Referencia de aplicación:** recuadro con esquema ilustrativo y técnica para ultrasonido, terapia combinada, láser,
  ondas de choque, campo magnético, alta frecuencia y onda corta (bloque `referencias`). Los puntos con `ref` citan su fuente;
  los marcados `general: true` son práctica general sin fuente verificada. Para mostrar una fotografía propia, copie la imagen
  a una carpeta `imagenes/` del repositorio y escriba su ruta en el campo `foto` (por ejemplo `foto: "imagenes/ultrasonido.jpg"`).
- **Ondas de choque:** intensidad radial en bar, energía focal en mJ/mm², impulsos por sesión, frecuencia (Hz) y sesiones.
  Los valores de bar, impulsos y Hz provienen de ensayos de fascitis plantar (no son una guía para otras patologías).
- **Ejercicio terapéutico:** fuerza, hipertrofia, potencia, resistencia local, isométrico analgésico, carga lenta y pesada (HSR),
  excéntrico de Alfredson y restricción del flujo sanguíneo. Calcula los kilos a partir del 1RM (ingresado o estimado
  con seis fórmulas) y ajusta el estado (indicado, precaución, no indicado) según el tejido y la antigüedad.

## Estado de verificación de cada dosis

| Estado | Significado |
|---|---|
| Fuente verificada | Se consultó el documento original y el valor figura en él. |
| Fuente parcial | Parte del valor proviene de la fuente y parte es criterio de progresión o extrapolación. La nota lo explica. |
| Sin fuente verificada | Referencia general de la práctica clínica, pendiente de contrastar con una fuente primaria. |

Pendientes de verificar en esta versión: campo magnético, alta frecuencia, onda corta, terapia combinada,
protocolos de suelo pélvico y neurológico, la matriz de progresión por tejido y la tabla de láser de 904 nm (no incluida).

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub (por ejemplo `fisioterapia-cns`).
2. Subir los dos archivos. Para que la página abra directamente en la dirección principal,
   renombrar `calculadora_fisioterapia.html` a `index.html`.
3. En el repositorio: Settings > Pages > Source: "Deploy from a branch" > rama `main`, carpeta `/ (root)` > Save.
4. Después de uno o dos minutos la herramienta queda disponible en
   `https://TU-USUARIO.github.io/fisioterapia-cns/`.

## Cómo actualizar contenido

Editar `datos_fisioterapia.js` (en GitHub: abrir el archivo > icono del lápiz > editar > Commit changes).
Los cambios se publican solos en pocos minutos. Recuerde actualizar `version` y `fecha` al inicio del archivo.

- **Agregar un diagnóstico:** añadir una línea en `patologias`:
  `{ c: "M75.1", n: "Nombre del diagnóstico", g: "Hombro", t: "tendon" }`
  (`c` código CIE, `n` nombre, `g` grupo existente en `grupos`, `t` tejido).
  Si el mismo código se repite en dos diagnósticos, agregar `id: "CODIGO-ETIQUETA"` único.
  Opcionalmente `s: "sinónimos para el buscador"` y `x: ["pediatrico"]` para activar reglas de una etiqueta adicional.
- **Abreviaturas del buscador** (Sx, ITB, TFCC...): bloque `sinonimosBusqueda`. La búsqueda exige que todas las palabras escritas aparezcan.
- **Cambiar una dosis:** editar el bloque del agente en `dosificacion`. Cada dosis lleva `ref` (claves de `fuentes`)
  y `estado` (`verificada`, `parcial` o `pendiente`). Al verificar una dosis con su fuente, cambie el estado y agregue la cita.
- **Agregar una fuente:** añadir una entrada en `fuentes` con `cita`, `url`, `detalle` y `estado`.
- **Parámetros propios de un tejido:** usar `dosificacion_especifica`.
- **Límites de las fases:** ajustar los días en `umbrales`.
- **Tablas de láser y ondas de choque:** bloque `dosimetria`.
- **Fórmulas de 1RM, protocolos y matriz de progresión por tejido:** bloque `ejercicio`
  (la matriz usa una cadena de 8 letras por tejido y fase: I indicado, P precaución, N no indicado,
  en el orden indicado en `ordenObjetivos`).
- **Agregar una alerta o indicación:** añadir un bloque en `reglas` indicando agentes, tejidos y fases.

Tejidos disponibles: `tendon`, `ligamento`, `hueso`, `articulacion`, `musculo`, `nervio`, `disco`,
`bursa`, `fascia`, `menisco`, `sistemico`, `postquirurgico`, `luxacion`, `snc`, `suelo_pelvico`,
`piel`, `vascular`. Etiquetas adicionales: `pediatrico`, `dolor_pelvico`.

## Aviso

Los valores son recomendaciones paramétricas. La dosificación final es responsabilidad
exclusiva del fisioterapeuta clínico.
