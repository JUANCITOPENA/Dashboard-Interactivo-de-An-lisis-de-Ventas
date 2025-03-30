document.addEventListener('DOMContentLoaded', () => {
    // Registrar el plugin de datalabels
    Chart.register(ChartDataLabels);
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    Chart.defaults.plugins.title.font.size = 16;
    Chart.defaults.plugins.title.color = '#2c3e50';
    Chart.defaults.plugins.legend.position = 'bottom';
    Chart.defaults.plugins.datalabels.display = false;
  
    // --- 1. Datos iniciales ---
    const data = {
      Total_Registros: 12005,
      Venta_2025: 6160185.00,
      Venta_2024: 5918625.00,
      Venta_2023: 6027100.00,
      Venta_2022: 6046340.00,
      Venta_2021: 6152755.00,
      Venta_2020: 6090220.00,
      Diferencia_2025_vs_2024: 241560.00,
      Diferencia_2024_vs_2023: -108475.00,
      Diferencia_2023_vs_2022: -19240.00,
      Diferencia_2022_vs_2021: -106415.00,
      Diferencia_2021_vs_2020: 62535.00,
      Crecimiento_2025_vs_2024: 4.081353,
      Crecimiento_2024_vs_2023: -1.799787,
      Ingreso_Total: 36395225.00,
      Cantidad_Total: 600643,
      Costo_Total: 24382365.00,
      Margen_Total: 12012860.00,
      Porcentaje_Margen: 0.330066
    };
  
    // Calcular crecimientos y diferencias faltantes
    data.Crecimiento_2023_vs_2022 = data.Venta_2022 !== 0 ? ((data.Venta_2023 / data.Venta_2022) - 1) * 100 : 0;
    data.Crecimiento_2022_vs_2021 = data.Venta_2021 !== 0 ? ((data.Venta_2022 / data.Venta_2021) - 1) * 100 : 0;
    data.Crecimiento_2021_vs_2020 = data.Venta_2020 !== 0 ? ((data.Venta_2021 / data.Venta_2020) - 1) * 100 : 0;
    data.Diferencia_2023_vs_2022 = data.Venta_2023 - data.Venta_2022;
    data.Diferencia_2022_vs_2021 = data.Venta_2022 - data.Venta_2021;
    data.Diferencia_2021_vs_2020 = data.Venta_2021 - data.Venta_2020;
  
    // --- Helpers de formateo ---
    const formatCurrency = (value, digits = 0) =>
      value.toLocaleString('es-ES', { style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits });
    const formatNumber = (value) =>
      value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const formatPercent = (value, inputIsDecimal = true, decimals = 1) => {
      const number = inputIsDecimal ? value * 100 : value;
      return number.toLocaleString('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + '%';
    };
    const getTrendEmoji = (value) => {
      if (value > 1) return '📈';
      if (value < -1) return '📉';
      return '📊';
    };
    const getMarginEmoji = (percentage) => {
      if (percentage > 0.35) return '🤩';
      if (percentage > 0.25) return '👍';
      if (percentage > 0.10) return '😐';
      return '😟';
    };
    const getConditionalClass = (value, thresholdPositive = 0, thresholdNegative = 0) => {
      if (value > thresholdPositive) return 'positive';
      if (value < thresholdNegative) return 'negative';
      return 'neutral';
    };
  
    // --- Sección 1: KPIs Principales ---
    function renderKPIs() {
      // Ingreso Total
      const ingresoCard = document.getElementById('kpiIngresoTotal');
      ingresoCard.querySelector('.kpi-value').textContent = formatCurrency(data.Ingreso_Total);
      const ingresoLastYear = data.Venta_2025;
      const ingresoPrevYear = data.Venta_2024;
      const ingresoDiff = ingresoLastYear - ingresoPrevYear;
      const ingresoComp = ingresoCard.querySelector('.kpi-comparison');
      ingresoComp.textContent = `${ingresoDiff >= 0 ? '+' : ''}${formatCurrency(ingresoDiff)} vs '24`;
      ingresoComp.className = `kpi-comparison ${getConditionalClass(ingresoDiff)}`;
  
      // Margen Total
      const margenCard = document.getElementById('kpiMargenTotal');
      margenCard.querySelector('.kpi-value').textContent = formatCurrency(data.Margen_Total);
      margenCard.querySelector('.kpi-comparison').textContent = `Margen Acumulado`;
  
      // Margen Porcentual
      const margenPorcCard = document.getElementById('kpiMargenPorc');
      margenPorcCard.querySelector('.kpi-value').textContent = formatPercent(data.Porcentaje_Margen);
      const margenIndicator = margenPorcCard.querySelector('.kpi-indicator');
      margenIndicator.textContent = getMarginEmoji(data.Porcentaje_Margen);
      margenIndicator.className = `kpi-indicator ${getConditionalClass(data.Porcentaje_Margen, 0.25, 0.10)}`;
  
      // Unidades Totales
      const cantidadCard = document.getElementById('kpiCantidad');
      cantidadCard.querySelector('.kpi-value').textContent = formatNumber(data.Cantidad_Total);
    }
    renderKPIs();
  
    // --- Sección 2: Evolución Anual de Ventas ---
    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
    const salesData = [data.Venta_2020, data.Venta_2021, data.Venta_2022, data.Venta_2023, data.Venta_2024, data.Venta_2025];
    const growthPeriods = ['21 vs 20', '22 vs 21', '23 vs 22', '24 vs 23', '25 vs 24'];
    const growthValues = [data.Crecimiento_2021_vs_2020, data.Crecimiento_2022_vs_2021, data.Crecimiento_2023_vs_2022, data.Crecimiento_2024_vs_2023, data.Crecimiento_2025_vs_2024];
    const growthColors = growthValues.map(v => v >= 0 ? 'rgba(40, 167, 69, 0.8)' : 'rgba(220, 53, 69, 0.8)');
  
    // Gráfico: Ventas Anuales (Bar)
    const ctxSales = document.getElementById('ventasAnualesChart').getContext('2d');
    new Chart(ctxSales, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: 'Ventas Anuales ($)',
          data: salesData,
          backgroundColor: 'rgba(52, 152, 219, 0.7)',
          borderColor: 'rgba(41, 128, 185, 1)',
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // OK para gráficos de barras donde la altura no depende tanto del ratio
        plugins: {
          title: { display: true, text: 'Ventas Anuales (2020-2025)' },
          tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}` } },
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'end',
            formatter: (value) => formatCurrency(value/1000000, 1) + 'M',
            font: { size: 10, weight: 'bold' },
            color: '#333'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: { callback: value => formatCurrency(value/1000000, 1) + 'M' }
          }
        }
      }
    });
  
    // Gráfico: Crecimiento Anual (%) (Bar)
    const ctxGrowth = document.getElementById('crecimientoAnualChart').getContext('2d');
    new Chart(ctxGrowth, {
      type: 'bar',
      data: {
        labels: growthPeriods,
        datasets: [{
          label: 'Crecimiento vs Año Anterior (%)',
          data: growthValues,
          backgroundColor: growthColors,
          borderColor: growthValues.map(v => v >= 0 ? 'rgba(39, 174, 96, 1)' : 'rgba(192, 57, 43, 1)'),
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // OK para gráficos de barras
        plugins: {
          title: { display: true, text: 'Crecimiento Porcentual (%) vs Año Anterior' },
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` Crecimiento: ${ctx.parsed.y.toFixed(1)}%` } },
          datalabels: {
            display: true,
            anchor: 'center',
            align: 'center',
            formatter: (value) => value.toFixed(1) + '%',
            color: '#fff',
            font: { weight: 'bold' }
          }
        },
        scales: {
          y: { ticks: { callback: value => `${value.toFixed(1)}%` } }
        }
      }
    });
  
    // --- Sección 3: Rentabilidad y Costos ---
    const financialLabels = ['Ingreso Total', 'Costo Total', 'Margen Total'];
    const financialValues = [data.Ingreso_Total, data.Costo_Total, data.Margen_Total];
    const financialColors = ['rgba(52, 152, 219, 0.7)', 'rgba(243, 156, 18, 0.7)', 'rgba(40, 167, 69, 0.7)'];
  
    const ctxFinancial = document.getElementById('resumenFinancieroChart').getContext('2d');
    new Chart(ctxFinancial, {
      type: 'bar',
      data: {
        labels: financialLabels,
        datasets: [{
          label: 'Monto ($)',
          data: financialValues,
          backgroundColor: financialColors,
          borderColor: ['rgba(41, 128, 185, 1)', 'rgba(211, 84, 0, 1)', 'rgba(39, 174, 96, 1)'],
          borderWidth: 1,
          borderRadius: { topLeft: 5, topRight: 5, bottomLeft: 5, bottomRight: 5 },
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false, // OK para gráficos de barras horizontales
        plugins: {
          title: { display: true, text: 'Desglose Financiero Total (Ingreso, Costo, Margen)' },
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${formatCurrency(ctx.parsed.x)}` } },
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'right',
            formatter: (value) => formatCurrency(value),
            font: { weight: 'bold' },
            color: '#333',
            padding: { left: 10 }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { callback: value => formatCurrency(value/1000000) + 'M' }
          }
        }
      }
    });
  
    // Tabla: Distribución % Rentabilidad
    const rentabilidadTableBody = document.getElementById('rentabilidadTableBody');
    rentabilidadTableBody.innerHTML = '';
    const costoPorc = data.Ingreso_Total !== 0 ? (data.Costo_Total / data.Ingreso_Total) : 0;
    const margenPorc = data.Ingreso_Total !== 0 ? (data.Margen_Total / data.Ingreso_Total) : 0;
    const rentabilidadItems = [
      { label: 'Costo s/ Ingreso', value: costoPorc, emoji: costoPorc < 0.7 ? '👍' : '⚠️' },
      { label: 'Margen s/ Ingreso', value: margenPorc, emoji: getMarginEmoji(margenPorc) }
    ];
    rentabilidadItems.forEach(item => {
      const row = rentabilidadTableBody.insertRow();
      row.insertCell().textContent = item.label;
      row.insertCell().textContent = formatPercent(item.value);
      const emojiCell = row.insertCell();
      emojiCell.textContent = item.emoji;
      emojiCell.classList.add('indicator-cell');
    });
  
    // --- Sección 4: Detalles Anuales y KPIs Completos ---
    const anualDetailTableBody = document.getElementById('anualDetailTableBody');
    anualDetailTableBody.innerHTML = '';
    const anualData = [
      { year: 2020, sales: data.Venta_2020, diff: null, growth: null },
      { year: 2021, sales: data.Venta_2021, diff: data.Diferencia_2021_vs_2020, growth: data.Crecimiento_2021_vs_2020 },
      { year: 2022, sales: data.Venta_2022, diff: data.Diferencia_2022_vs_2021, growth: data.Crecimiento_2022_vs_2021 },
      { year: 2023, sales: data.Venta_2023, diff: data.Diferencia_2023_vs_2022, growth: data.Crecimiento_2023_vs_2022 },
      { year: 2024, sales: data.Venta_2024, diff: data.Diferencia_2024_vs_2023, growth: data.Crecimiento_2024_vs_2023 },
      { year: 2025, sales: data.Venta_2025, diff: data.Diferencia_2025_vs_2024, growth: data.Crecimiento_2025_vs_2024 },
    ];
    anualData.forEach(item => {
      const row = anualDetailTableBody.insertRow();
      row.insertCell().textContent = item.year;
      row.insertCell().textContent = formatCurrency(item.sales);
      const diffCell = row.insertCell();
      const growthCell = row.insertCell();
      const trendCell = row.insertCell();
      trendCell.classList.add('indicator-cell');
      if (item.diff !== null) {
        diffCell.textContent = formatCurrency(item.diff);
        diffCell.classList.add(getConditionalClass(item.diff));
      } else {
        diffCell.textContent = '-';
      }
      if (item.growth !== null) {
        growthCell.textContent = formatPercent(item.growth, false);
        growthCell.classList.add(getConditionalClass(item.growth));
        trendCell.textContent = getTrendEmoji(item.growth);
      } else {
        growthCell.textContent = '-';
        trendCell.textContent = '-';
      }
    });
  
    const kpiTableBody = document.getElementById('kpiTableBody');
    kpiTableBody.innerHTML = '';
    const kpiItems = [
      { label: 'Total Registros', value: formatNumber(data.Total_Registros), status: '-' },
      { label: 'Ingreso Total', value: formatCurrency(data.Ingreso_Total), status: '-' },
      { label: 'Cantidad Total', value: formatNumber(data.Cantidad_Total), status: '-' },
      { label: 'Costo Total', value: formatCurrency(data.Costo_Total), status: '-' },
      { label: 'Margen Total', value: formatCurrency(data.Margen_Total), status: '-' },
      { label: 'Margen Porcentual', value: formatPercent(data.Porcentaje_Margen), status: getMarginEmoji(data.Porcentaje_Margen), rawValue: data.Porcentaje_Margen }
    ];
    kpiItems.forEach(item => {
      const row = kpiTableBody.insertRow();
      row.insertCell().textContent = item.label;
      row.insertCell().textContent = item.value;
      const statusCell = row.insertCell();
      statusCell.textContent = item.status;
      statusCell.classList.add('indicator-cell');
      if (item.label === 'Margen Porcentual') {
        const valueCell = row.cells[1];
        // Limpiar clases previas por si acaso
        valueCell.classList.remove('positive','negative','neutral');
        // Aplicar color de fondo basado en valor
        if (item.rawValue > 0.30) { valueCell.style.backgroundColor = 'rgba(40, 167, 69, 0.15)'; }
        else if (item.rawValue < 0.15) { valueCell.style.backgroundColor = 'rgba(220, 53, 69, 0.15)'; }
        else { valueCell.style.backgroundColor = 'rgba(255, 193, 7, 0.15)'; }
      }
    });
  
  
  
  
    // --- Sección 5: Análisis Extra ---
  
    // Gráfico 1: Distribución de Ventas (Doughnut) - SIN CAMBIOS, MANTIENE DATALABELS DETALLADOS
    const ctxDistribucion = document.getElementById('distribucionVentasChart').getContext('2d');
    new Chart(ctxDistribucion, {
      type: 'doughnut',
      data: {
        labels: years, // ['2020', '2021', ...]
        datasets: [{
          data: salesData, // [6090220, 6152755, ...]
          backgroundColor: [
            'rgba(52, 152, 219, 0.8)', // Azul
            'rgba(46, 204, 113, 0.8)',  // Verde
            'rgba(241, 196, 15, 0.8)',  // Amarillo
            'rgba(231, 76, 60, 0.8)',   // Rojo
            'rgba(155, 89, 182, 0.8)',  // Morado
            'rgba(52, 73, 94, 0.8)'     // Gris Azulado
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Distribución de Ventas por Año' },
          tooltip: { // Tooltip interactivo detallado
              callbacks: {
                  label: function(context) {
                      const label = context.label || '';
                      const value = context.parsed || 0;
                      const total = context.chart.getDatasetMeta(0).total || salesData.reduce((a, b) => a + b, 0);
                      const percentage = total ? (value / total) * 100 : 0;
                      const formattedValue = formatCurrency(value);
                      const formattedPercentage = percentage.toFixed(1) + '%';
                      return [
                          `Año: ${label}`,
                          `Ventas: ${formattedValue}`,
                          `Porcentaje: ${formattedPercentage}`
                      ];
                  }
              }
          },
          datalabels: { // Datalabels estáticos detallados para el PDF
            display: true,
            formatter: (value, context) => {
              const label = context.chart.data.labels[context.dataIndex];
              const total = salesData.reduce((a, b) => a + b, 0);
              const percentage = total ? (value / total) * 100 : 0;
              const formattedValueShort = formatCurrency(value / 1000000, 1) + 'M';
              const formattedPercentage = percentage.toFixed(1) + '%';
              return `${label}\n${formattedValueShort}\n${formattedPercentage}`;
            },
            color: '#fff',
            font: {
                weight: 'bold',
                size: 22
            },
            textAlign: 'center',
            // Opcional: fondo para mejorar contraste
            // backgroundColor: 'rgba(0, 0, 0, 0.4)',
            // borderRadius: 4,
            // padding: 3
          }
        }
      }
    });
  
    // Gráfico 2: Ventas Anuales ($) vs Crecimiento Anual (%) (Combo Bar/Line) - REEMPLAZO DEL DE LÍNEA
    const ctxComboTendencia = document.getElementById('tendenciaAcumuladaChart').getContext('2d'); // Usa el mismo ID de canvas
    new Chart(ctxComboTendencia, {
      type: 'bar', // Tipo base
      data: {
        labels: years, // ['2020', '2021', ...]
        datasets: [
          {
            type: 'bar',
            label: 'Ventas Anuales ($)',
            data: salesData, // [6090220, 6152755, ...]
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(41, 128, 185, 1)',
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: 'ySales', // Eje izquierdo
            order: 2 // Detrás de la línea
          },
          {
            type: 'line', // Tipo línea para este dataset
            label: 'Crecimiento Anual (%)',
            // Usamos slice(1) para alinear los datos de crecimiento con el año en que ocurren (crecimiento '21 vs '20 se muestra en 2021)
            // Necesitamos añadir un null o NaN al principio para que coincida con los años
            data: [null, ...growthValues], // [null, 1.03..., -1.74..., etc.]
            borderColor: 'rgba(231, 76, 60, 0.9)', // Rojo
            backgroundColor: 'rgba(231, 76, 60, 0.3)',
            yAxisID: 'yGrowth', // Eje derecho
            tension: 0.1,
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 7,
            order: 1 // Encima de las barras
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
          title: { display: true, text: 'Ventas Anuales ($) vs Crecimiento (%)' },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) { label += ': '; }
                      if (context.parsed.y !== null) {
                          if (context.dataset.yAxisID === 'yGrowth') {
                              label += context.parsed.y.toFixed(1) + '%'; // Porcentaje
                          } else {
                              label += formatCurrency(context.parsed.y); // Moneda
                          }
                      } else {
                          label += 'N/A'; // Para el primer punto null de crecimiento
                      }
                      return label;
                  }
              }
          },
          datalabels: { display: false } // Desactivados para el combo chart
        },
        scales: {
          x: {
              title: { display: true, text: 'Año' }
          },
          ySales: { // Eje Izquierdo - Ventas
              type: 'linear',
              position: 'left',
              beginAtZero: false,
              title: {
                  display: true,
                  text: 'Ventas Anuales ($)',
                  color: 'rgba(41, 128, 185, 1)' // Azul
              },
              ticks: {
                  callback: value => formatCurrency(value / 1000000, 1) + 'M', // Millones
                  color: 'rgba(41, 128, 185, 1)'
              },
              grid: { drawOnChartArea: true }
          },
          yGrowth: { // Eje Derecho - Crecimiento
              type: 'linear',
              position: 'right',
              title: {
                  display: true,
                  text: 'Crecimiento Anual (%)',
                  color: 'rgba(192, 57, 43, 1)' // Rojo
              },
              ticks: {
                  callback: value => value.toFixed(1) + '%', // Porcentaje
                  color: 'rgba(192, 57, 43, 1)'
              },
              // Usar filter(Number.isFinite) para ignorar el 'null' inicial en min/max
              suggestedMin: Math.min(...growthValues.filter(Number.isFinite)) - 2,
              suggestedMax: Math.max(...growthValues.filter(Number.isFinite)) + 2,
              grid: { drawOnChartArea: false } // Grid solo para el eje izquierdo
          }
        }
      }
    });
  
  // ... (El resto del código, incluyendo la función de exportar PDF, sigue aquí)
  
    console.log("Dashboard Avanzado cargado con tus datos.");
  
    // --- Función para exportar a PDF con narrativa (VERSIÓN MEJORADA PARA LAYOUT VERTICAL)   // --- Función para exportar a PDF con AGRUPACIÓN DE PÁGINAS ESPECÍFICA ---
   
    document.getElementById('exportPdfBtn').addEventListener('click', async () => {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p'ortrait, 'mm' millimeters, 'a4' size
      let yPosition = 15; // Start position with top margin
      const margin = 15; // Left/right margin
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const usableWidth = pageWidth - margin * 2;
      const spacing = 8; // Default spacing between elements
      const titleFontSize = 14;
      const narrativeFontSize = 10;
      const lineSpacingFactor = 1.2; // Adjust line spacing for text
  
      // Helper function to check space and add a new page if needed (NATURAL page break)
      function checkAndAddPage(requiredHeight) {
        const buffer = 5; // Extra buffer
        // Check if the *next* element would go off the page
        if (yPosition + requiredHeight + buffer > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin; // Reset Y position for the new page
          console.log("   -- Salto de página natural añadido --");
          return true; // Indicate a page break occurred
        }
        return false;
      }
  
      // Definir narrativas (asegúrate de que coincidan con los H2)
      const narratives = {
          'Resumen General Rápido': 'KPIs principales para una visión rápida: ingresos, márgenes y unidades vendidas.',
          'Evolución Anual de Ventas': 'Visualización de ventas y crecimiento porcentual año/año para análisis de tendencias.',
          'Análisis de Rentabilidad': 'Desglose financiero (Ingreso, Costo, Margen) y proporción de Costo/Margen sobre Ingreso.',
          'Detalles Anuales y KPIs Completos': 'Tabla detallada de ventas anuales (diferencia absoluta/%) y tabla resumen de KPIs globales.',
          'Análisis Extra': 'Distribución porcentual de ventas anuales y curva de ventas acumuladas.'
          // Añade más si tienes más secciones con H2
      };
  
      console.log("Iniciando exportación a PDF (Layout Paginado Específico)...");
  
      const sections = document.querySelectorAll('main > section'); // Select direct child sections of main
  
      for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const sectionTitleElement = section.querySelector('h2');
          if (!sectionTitleElement) continue; // Skip sections without H2
  
          const sectionTitle = sectionTitleElement.textContent;
          console.log(`Procesando sección: ${sectionTitle}`);
  
          // --- Añadir Título y Narrativa PRIMERO ---
          // (Misma lógica que antes para añadir título y narrativa con checkAndAddPage)
          const titleHeight = titleFontSize * 0.352778 * lineSpacingFactor;
          checkAndAddPage(titleHeight);
          pdf.setFontSize(titleFontSize); pdf.setFont(undefined, 'bold'); pdf.setTextColor(44, 62, 80);
          pdf.text(sectionTitle, margin, yPosition);
          yPosition += titleHeight + (spacing / 2);
  
          const narrativeText = narratives[sectionTitle];
          if (narrativeText) {
              pdf.setFontSize(narrativeFontSize); pdf.setFont(undefined, 'normal'); pdf.setTextColor(51, 51, 51);
              const splitNarrative = pdf.splitTextToSize(narrativeText, usableWidth);
              const narrativeHeight = pdf.getTextDimensions(splitNarrative, { fontSize: narrativeFontSize }).h * lineSpacingFactor;
              checkAndAddPage(narrativeHeight);
              pdf.text(splitNarrative, margin, yPosition);
              yPosition += narrativeHeight + spacing;
          } else {
               yPosition += (spacing / 3);
          }
  
          // --- Procesar y añadir CADA ELEMENTO VISUAL dentro de la sección ---
          const visualElements = section.querySelectorAll('.kpi-container, .chart-container, .table-container');
          for (let j = 0; j < visualElements.length; j++) {
              const element = visualElements[j];
              console.log(`  Procesando elemento visual ${j + 1}/${visualElements.length} de ${sectionTitle}`);
              try {
                  // await new Promise(resolve => setTimeout(resolve, 50)); // Pequeña pausa opcional
                  const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
                  const imgData = canvas.toDataURL('image/png');
                  const imgProps = pdf.getImageProperties(imgData);
                  const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;
  
                  checkAndAddPage(pdfImgHeight); // Check space *before* adding element image
  
                  pdf.addImage(imgData, 'PNG', margin, yPosition, usableWidth, pdfImgHeight);
                  yPosition += pdfImgHeight + spacing; // Add space *after* this element's image
  
              } catch (error) {
                  console.error(`Error al procesar elemento visual ${j + 1} en sección ${sectionTitle}:`, error);
                  const errorText = `Error al renderizar un elemento en: ${sectionTitle}`;
                  const errorHeight = narrativeFontSize * 0.352778;
                  checkAndAddPage(errorHeight);
                  pdf.setFontSize(narrativeFontSize); pdf.setTextColor(255, 0, 0);
                  pdf.text(errorText, margin, yPosition);
                  yPosition += errorHeight + spacing;
              }
          } // End loop through visual elements
  
          // --- *** FORZAR SALTOS DE PÁGINA DESPUÉS DE SECCIONES ESPECÍFICAS *** ---
          const forceBreakAfter = [
              'Evolución Anual de Ventas',         // Fin de la Página 1
              'Detalles Anuales y KPIs Completos' // Fin de la Página 2
          ];
  
          // Si el título actual está en la lista Y no es la última sección del documento
          if (forceBreakAfter.includes(sectionTitle) && i < sections.length - 1) {
              // Solo añade la página si NO estamos ya al principio de una nueva página
              // (evita dobles saltos si el último elemento ya causó un salto natural)
              if (yPosition > margin + 5) { // Un pequeño umbral para estar seguros
                   console.log(`*** Forzando salto de página DESPUÉS de: ${sectionTitle} ***`);
                   pdf.addPage();
                   yPosition = margin; // Reset Y para la nueva página
              }
          }
      } // End loop through sections
  
      console.log("Guardando PDF...");
      pdf.save('Dashboard_Ventas_Paginado.pdf'); // Changed filename again
      console.log("PDF guardado.");
  }); // End of exportPdfBtn listener
  
  });