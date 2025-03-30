import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots

# --- 1. Tus Datos ---
data = {
    "Total_Registros": 12005,
    "Venta_2025": 6160185.00,
    "Venta_2024": 5918625.00,
    "Venta_2023": 6027100.00,
    "Venta_2022": 6046340.00,
    "Venta_2021": 6152755.00,
    "Venta_2020": 6090220.00,
    "Diferencia_2025_vs_2024": 241560.00,
    "Diferencia_2024_vs_2023": -108475.00,
    "Diferencia_2023_vs_2022": -19240.00,
    "Diferencia_2022_vs_2021": -106415.00,
    "Diferencia_2021_vs_2020": 62535.00,
    "Crecimiento_2025_vs_2024": 4.081353, # %
    "Crecimiento_2024_vs_2023": -1.799787, # %
    "Ingreso_Total": 36395225.00,
    "Cantidad_Total": 600643,
    "Costo_Total": 24382365.00,
    "Margen_Total": 12012860.00,
    "Porcentaje_Margen": 0.330066 # 33.01%
}

# Calcular crecimientos faltantes (como %)
data['Crecimiento_2023_vs_2022'] = (data['Venta_2023'] / data['Venta_2022'] - 1) * 100 if data['Venta_2022'] else 0
data['Crecimiento_2022_vs_2021'] = (data['Venta_2022'] / data['Venta_2021'] - 1) * 100 if data['Venta_2021'] else 0
data['Crecimiento_2021_vs_2020'] = (data['Venta_2021'] / data['Venta_2020'] - 1) * 100 if data['Venta_2020'] else 0

# Convertir a DataFrame para facilidad (opcional para una fila, pero bueno para estructura)
df = pd.DataFrame([data])

# --- 2. Preparar Datos para Gráficos ---

# Datos de Ventas Anuales
years = ['2020', '2021', '2022', '2023', '2024', '2025']
sales = [data['Venta_2020'], data['Venta_2021'], data['Venta_2022'], data['Venta_2023'], data['Venta_2024'], data['Venta_2025']]

# Datos de Diferencias Anuales
diff_periods = ['21 vs 20', '22 vs 21', '23 vs 22', '24 vs 23', '25 vs 24']
differences = [
    data['Diferencia_2021_vs_2020'], data['Diferencia_2022_vs_2021'],
    data['Diferencia_2023_vs_2022'], data['Diferencia_2024_vs_2023'],
    data['Diferencia_2025_vs_2024']
]
diff_colors = ['green' if d > 0 else 'red' for d in differences]

# Datos de Crecimiento Anual (%)
growth_periods = ['21 vs 20', '22 vs 21', '23 vs 22', '24 vs 23', '25 vs 24']
growths = [
    data['Crecimiento_2021_vs_2020'], data['Crecimiento_2022_vs_2021'],
    data['Crecimiento_2023_vs_2022'], data['Crecimiento_2024_vs_2023'],
    data['Crecimiento_2025_vs_2024']
]
growth_colors = ['green' if g > 0 else 'red' for g in growths]


# --- 3. Visualización ---

# --- Sección 1: Rendimiento Anual ---

# Gráfico 1.1: Tendencia de Ventas Anuales
fig_sales_trend = go.Figure()
fig_sales_trend.add_trace(go.Bar(
    x=years,
    y=sales,
    name='Ventas Anuales',
    marker_color='skyblue',
    text=[f"${s:,.0f}" for s in sales], # Mostrar valor en la barra
    textposition='outside'
))
fig_sales_trend.update_layout(
    title='Tendencia de Ventas Anuales (2020-2025)',
    xaxis_title='Año',
    yaxis_title='Ventas ($)',
    yaxis_tickformat=',.0f'
)
fig_sales_trend.show()
# fig_sales_trend.write_html("1_1_ventas_anuales.html")


# Gráfico 1.2: Diferencia Anual en Ventas (Absoluta)
fig_diff = go.Figure()
fig_diff.add_trace(go.Bar(
    x=diff_periods,
    y=differences,
    name='Diferencia vs Año Anterior',
    marker_color=diff_colors, # Color condicional
    text=[f"${d:,.0f}" for d in differences],
    textposition='auto'
))
fig_diff.update_layout(
    title='Diferencia Absoluta en Ventas vs Año Anterior',
    xaxis_title='Periodo de Comparación',
    yaxis_title='Diferencia ($)',
    yaxis_tickformat=',.0f'
)
fig_diff.show()
# fig_diff.write_html("1_2_diferencia_anual.html")

# Gráfico 1.3: Crecimiento Anual en Ventas (%)
fig_growth = go.Figure()
fig_growth.add_trace(go.Bar(
    x=growth_periods,
    y=growths,
    name='Crecimiento vs Año Anterior',
    marker_color=growth_colors, # Color condicional
    text=[f"{g:.2f}%" for g in growths],
    textposition='auto'
))
fig_growth.update_layout(
    title='Crecimiento Porcentual (%) en Ventas vs Año Anterior',
    xaxis_title='Periodo de Comparación',
    yaxis_title='Crecimiento (%)',
    yaxis_tickformat='.2f', # Formato porcentaje en eje Y
    yaxis_ticksuffix='%'
)
fig_growth.show()
# fig_growth.write_html("1_3_crecimiento_anual.html")


# --- Sección 2: Resumen Financiero Total ---

# Gráfico 2.1: Desglose Ingreso Total
financial_labels = ['Ingreso Total', 'Costo Total', 'Margen Total']
financial_values = [data['Ingreso_Total'], data['Costo_Total'], data['Margen_Total']]

fig_financial = go.Figure(data=[go.Bar(
    x=financial_labels,
    y=financial_values,
    text=[f"${v:,.0f}" for v in financial_values],
    textposition='auto',
    marker_color=['blue', 'orange', 'green'] # Colores distintivos
)])
fig_financial.update_layout(
    title='Resumen Financiero Total (Acumulado)',
    yaxis_title='Monto ($)',
    yaxis_tickformat=',.0f'
)
fig_financial.show()
# fig_financial.write_html("2_1_resumen_financiero.html")


# --- Sección 3: Tabla de Indicadores Clave ---

# Preparar datos para la tabla
kpi_data = {
    'Indicador': [
        'Total Registros',
        'Ingreso Total ($)',
        'Cantidad Total (Unidades)',
        'Costo Total ($)',
        'Margen Total ($)',
        'Margen Porcentual (%)'
    ],
    'Valor': [
        f"{data['Total_Registros']:,}",
        f"${data['Ingreso_Total']:,.2f}",
        f"{data['Cantidad_Total']:,}",
        f"${data['Costo_Total']:,.2f}",
        f"${data['Margen_Total']:,.2f}",
        f"{data['Porcentaje_Margen']:.2%}" # Formato como porcentaje
    ]
}
df_kpi = pd.DataFrame(kpi_data)

# Definir colores condicionales para la tabla (ej. para el margen)
# Consideraremos >30% bueno (verde), <15% malo (rojo), intermedio (amarillo)
margin_percentage_value = data['Porcentaje_Margen'] * 100
if margin_percentage_value > 30:
    margin_color = 'lightgreen'
elif margin_percentage_value < 15:
    margin_color = 'lightcoral'
else:
    margin_color = 'lightyellow'

# Crear lista de colores para las celdas de 'Valor'
cell_colors = ['white'] * (len(kpi_data['Indicador']) - 1) + [margin_color] # Color solo para margen %


fig_table = go.Figure(data=[go.Table(
    header=dict(values=list(df_kpi.columns),
                fill_color='paleturquoise',
                align='left',
                font=dict(size=14)),
    cells=dict(values=[df_kpi.Indicador, df_kpi.Valor],
               fill_color=[['white']*len(df_kpi), cell_colors], # Aplicar colores a la columna 'Valor'
               align='left',
               font_size=13,
               height=30)
)])

fig_table.update_layout(
    title='Tabla de Indicadores Clave (KPIs)',
    margin=dict(l=10, r=10, t=50, b=10) # Ajustar márgenes
)
fig_table.show()
# fig_table.write_html("3_tabla_kpi.html")


print("Análisis y visualizaciones con tus datos completadas.")
# Si descomentaste las líneas write_html, se habrán generado archivos HTML.