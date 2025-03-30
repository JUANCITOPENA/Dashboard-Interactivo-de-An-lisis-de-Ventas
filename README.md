# 📊 Dashboard de Ventas Avanzado 📈

¡Bienvenido al Dashboard Interactivo de Análisis de Ventas! Este proyecto visualiza datos clave de rendimiento de ventas de forma clara e intuitiva, permitiendo identificar tendencias, comparar períodos y obtener insights rápidos sobre el negocio. ✨

## 🚀 Descripción del Proyecto

Este dashboard ofrece una visión completa del rendimiento de ventas a lo largo de varios años (2020-2025). Presenta:

*   **KPIs Principales:** Un resumen rápido de métricas vitales como Ingreso Total, Margen, y Unidades Vendidas.
*   **Análisis Anual:** Comparativas detalladas de ventas, diferencias absolutas y crecimiento porcentual año contra año.
*   **Rentabilidad:** Desglose de Ingresos, Costos y Márgenes.
*   **Visualizaciones Clave:** Gráficos interactivos que muestran tendencias, distribución y comparativas.
*   **Exportación a PDF:** Funcionalidad para descargar el dashboard completo en un archivo PDF bien formateado. 📄➡️

## ✨ Características Principales

*   **🃏 Tarjetas KPI (Cards):** Resumen visual instantáneo de los indicadores más importantes.
*   **📊 Gráfico de Barras (Ventas Anuales):** Tendencia clara del volumen de ventas por año.
*   **📉📈 Gráfico de Barras (Crecimiento %):** Visualización del crecimiento o decrecimiento porcentual anual con colores condicionales (verde/rojo).
*   **💰➡️ Gráfico de Barras Horizontales (Rentabilidad):** Desglose del Ingreso Total en Costos y Margen Total.
*   **🔢 Tablas Detalladas:** Comparativa anual con diferencias, crecimiento y tendencia, además de una tabla resumen de KPIs globales.
*   **🍰 Gráfico de Dona (Distribución):** Porcentaje de contribución de las ventas de cada año al total, con etiquetas detalladas (Año, Monto, %).
*   **🔗 Gráfico Combinado (Ventas vs Crecimiento):** Comparación directa de las Ventas Anuales (barras) con la tasa de Crecimiento % (línea) usando dos ejes Y.
*   **🖱️ Interactividad:** Tooltips detallados al pasar el cursor sobre los gráficos.
*   **📄 Exportación a PDF:** Generación de un reporte PDF con `jsPDF` y `html2canvas`, respetando un diseño vertical y paginado por secciones específicas.

## 📸 Screenshots (Ejemplos)

*(¡Recuerda reemplazar estas rutas con las de tus propias capturas!)*

**KPIs y Evolución Anual:**
![Screenshot KPI y Evolución](screenshots/kpis_evolucion.png)

**Análisis de Rentabilidad y Tablas:**
![Screenshot Rentabilidad y Tablas](screenshots/rentabilidad_tablas.png)

**Análisis Extra (Dona y Combo):**
![Screenshot Análisis Extra](screenshots/analisis_extra.png)

**Ejemplo del PDF Exportado:**
![Screenshot PDF](screenshots/pdf_export.png)

## 🛠️ Tecnologías Utilizadas

*   **🌐 HTML5:** Estructura del dashboard.
*   **🎨 CSS3:** Estilos y diseño visual (incluyendo Flexbox para layout).
*   **💻 JavaScript (ES6+):** Lógica del dashboard, manipulación del DOM, cálculos y creación de gráficos.
*   **📊 Chart.js:** Librería principal para la creación de gráficos interactivos.
*   **🏷️ chartjs-plugin-datalabels:** Plugin para mostrar etiquetas directamente sobre los gráficos (usado extensivamente en el gráfico de dona).
*   **📄 jsPDF:** Librería para generar el archivo PDF en el cliente.
*   **🖼️ html2canvas:** Librería para capturar elementos HTML (secciones, gráficos, tablas) como imágenes para incluirlas en el PDF.
*   **👍 Font Awesome:** Para los iconos en las tarjetas KPI.

## ⚙️ Fuente de Datos y Proceso (ETL/ETF Simplificado)

Los datos utilizados en este dashboard son **estáticos y agregados**, representando un resumen pre-calculado del rendimiento de ventas para el período 2020-2025.

*   **Extracción (E):** Los datos fueron proporcionados como una única fila consolidada (o están hardcodeados directamente en `script.js`).
*   **Transformación (T):** Se realizaron cálculos adicionales directamente en JavaScript (`script.js`) para:
    *   Derivar las diferencias y crecimientos anuales que faltaban.
    *   Preparar las estructuras de datos necesarias para cada gráfico de Chart.js (arrays de etiquetas, datos, colores, etc.).
    *   Formatear valores (moneda, porcentaje, números).
*   **Carga (L - Load):** Los datos transformados se "cargan" directamente en las configuraciones de los gráficos de Chart.js y en las tablas/KPIs del HTML al renderizar la página.

Este enfoque es ideal para visualizaciones rápidas de resúmenes ya procesados. Para un escenario real, los datos provendrían probablemente de una API, un archivo JSON o una base de datos, y el proceso ETL sería más robusto.

## 🚀 Cómo Empezar (Instalación y Ejecución)

Este proyecto es puramente **frontend** (HTML, CSS, JavaScript) y no requiere un servidor backend ni dependencias complejas para visualizar el dashboard.

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```
    *(Reemplaza `tu-usuario/tu-repositorio` con la URL real)*
2.  **Navegar a la Carpeta:**
    ```bash
    cd tu-repositorio
    ```
3.  **Abrir el Archivo Principal:** Simplemente abre el archivo `index.html` en tu navegador web preferido (Chrome, Firefox, Edge, etc.).

¡Eso es todo! El dashboard debería cargarse y mostrar las visualizaciones con los datos de ejemplo. 🎉

## 🖱️ Uso del Dashboard

*   **Explorar:** Navega por las diferentes secciones para ver los KPIs, gráficos y tablas.
*   **Interactuar:** Pasa el cursor sobre las barras, líneas o porciones de los gráficos para ver tooltips con información detallada.
*   **Exportar:** Haz clic en el botón "Descargar Dashboard en PDF" para generar un reporte estático del estado actual del dashboard.

## 🔮 Posibles Mejoras Futuras

*   **🔗 Conexión a Datos Reales:** Integrar con una API o permitir cargar datos desde un archivo (JSON, CSV).
*   **📅 Filtros de Fecha:** Añadir selectores para filtrar los datos por rangos de fechas específicos.
*   **📊 Más Tipos de Gráficos:** Explorar otros tipos de visualizaciones relevantes (mapas de calor, scatter plots si hay más dimensiones).
*   **🎨 Personalización:** Permitir al usuario elegir temas de color o tipos de gráficos.
*   **⚙️ Backend (Opcional):** Crear un backend (Node.js, Python/Flask/Django, etc.) para servir los datos y manejar lógica más compleja.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles (si incluyes uno).

---

¡Gracias por revisar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en abrir un *Issue*. 😊
