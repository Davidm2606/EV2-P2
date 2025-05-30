const opossum = require('opossum');

// Función simulada de llamada SOAP (se debe cambiar para SOAP real)
async function callSOAP(data) {
  // Simulamos una respuesta exitosa del SOAP:
  // En realidad llamarías el cliente SOAP con librería 'soap' o similar
  console.log('Simulando llamada SOAP con datos:', data);

  // Simular fallo aleatorio para probar circuit breaker
  if (Math.random() < 0.2) {
    throw new Error('Error simulado SOAP');
  }

  return { estado: 'procesado' };
}

const options = {
  timeout: 5000, // Timeout de 5 segundos
  errorThresholdPercentage: 50,
  resetTimeout: 30000 // 30 segundos antes de intentar resetear circuito
};

const breaker = new opossum(callSOAP, options);

// Fallback en caso de circuito abierto o fallo
breaker.fallback(() => ({ estado: 'en revisión' }));

async function sendSOAPRequest(data) {
  return breaker.fire(data);
}

module.exports = { sendSOAPRequest };
