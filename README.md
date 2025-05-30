# Proyecto Integración de Sistemas - Plataforma de Servicios Estudiantiles
Estructura de entregables
Diagrama de Arquitectura (archivo PNG o PDF) + descripción en README

Microservicio REST (SolicitudService) con validación JWT y llamada a servicio SOAP (mock)

Configuración API Gateway (ejemplo con Kong Gateway o descripción) + capturas

Archivo YAML con configuración de Circuit Breaking y Retry (pseudocódigo para Istio)

Documento breve con monitoreo y trazabilidad

README general con instrucciones y detalles

1. DIAGRAMA DE ARQUITECTURA + DESCRIPCIÓN
![image](https://github.com/user-attachments/assets/47b96904-fa1a-401d-afa8-b1f999ea9b26)
La arquitectura está compuesta por un API Gateway que expone el microservicio 'SolicitudService'. Este servicio se encarga de validar tokens JWT, registrar solicitudes y comunicarse con un servicio externo SOAP (simulado) para certificados. Se aplican políticas de seguridad, rate limiting, y patrones de resiliencia como retry y circuit breaking. Se contemplan prácticas de monitoreo y trazabilidad para cada solicitud.
 - Puntos clave:

  API Gateway: control de seguridad (JWT), rate limiting.
  
  SolicitudService: valida token, hace retry + circuit breaker en llamada SOAP.
  
  Trazabilidad: logs en API Gateway y microservicio, métricas de errores, latencia.
  
  Circuit Breaker + Retry en llamada SOAP para resiliencia.

  2. MICROSERVICIO REST
![image](https://github.com/user-attachments/assets/e766e38a-a7a3-4561-8820-58849e268f31)
![image](https://github.com/user-attachments/assets/ae036f0f-4d2e-498a-9716-5c6f3013308f)
![image](https://github.com/user-attachments/assets/266755b9-d900-4e35-8348-b1a89cbb43b0)
![image](https://github.com/user-attachments/assets/58129e81-2641-45c6-8cf2-b1998f7ddfd9)
![image](https://github.com/user-attachments/assets/1b57a75a-8f70-4328-838a-7b91c91d0f86)
![image](https://github.com/user-attachments/assets/18da9c5a-e4fd-4b35-9f5c-4636f2ba36a0)


4. API GATEWAY (ejemplo con Kong Gateway)
Configura un API Gateway para exponer /solicitudes

Aplica:

  Validación JWT
  
  Rate Limiting (ejemplo: 10 requests/minuto)
![image](https://github.com/user-attachments/assets/e0852920-e9e1-4ca3-874e-5657dbc61ec6)
![image](https://github.com/user-attachments/assets/2d7ace8a-8332-498e-90d4-97f3ed174aec)
![Uploading image.png…]()


5. MONITOREO Y TRAZABILIDAD
Cómo implementar:

Usar Prometheus para métricas (latencia, tasa de error, throughput).

Usar Jaeger o Zipkin para trazabilidad distribuida (capturar spans en llamadas REST y SOAP).

Log centralizado con ELK Stack o Loki.

Métricas clave:

Tiempo respuesta de /solicitudes

Número de errores (4xx, 5xx)

Número de reintentos y circuit breaker activados

Trazabilidad para poder seguir una solicitud desde cliente hasta SOAP.

# Plataforma Servicios Estudiantiles - SolicitudService

## Descripción
Microservicio REST que integra sistemas REST y SOAP, validando JWT y aplicando patrones de resiliencia (Circuit Breaker y Retry).

## Requisitos
- Node.js v16+
- npm
- Kong Gateway (opcional para API Gateway)
- Herramientas de monitoreo recomendadas: Prometheus, Jaeger

## Instalación y ejecución

1. Clonar repositorio:

```bash
git clone <url-del-repo>
cd solicitud-service
Instalar dependencias:

bash
Copiar
Editar
npm install
Ejecutar servicio:

bash
Copiar
Editar
node index.js
El servicio estará disponible en http://localhost:3000

Endpoints
POST /solicitudes

Header: Authorization: Bearer <token JWT>

Body JSON: { "tipo": "nueva" }

Respuesta: estado final de la solicitud.

GET /solicitudes/:id

Header: Authorization: Bearer <token JWT>

Respuesta: estado de la solicitud simulada.

API Gateway (Kong)
Configurar servicio, ruta y plugins JWT + Rate Limiting.

Ver archivo kong-config.yaml para configuración exportada.

Circuit Breaking y Retry
Configuración en archivo istio-circuitbreaker.yaml

Aplica máximo 2 reintentos y circuito si 3 errores en 60 segundos.

Monitoreo y Trazabilidad
Recomiendo Prometheus + Jaeger para métricas y trazabilidad.

Capturar métricas de latencia, errores y reintentos.
