const express = require('express');
const authMiddleware = require('./middleware/auth');
const { sendSOAPRequest } = require('./services/soapClient');

const app = express();

// Middleware para parsear JSON (nativo de Express)
app.use(express.json());

// Middleware para capturar errores de JSON mal formado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON inválido en body:', err.message);
    return res.status(400).json({ error: 'JSON inválido en body' });
  }
  next();
});

let solicitudes = [];

// POST /solicitudes -> crea nueva solicitud
app.post('/solicitudes', authMiddleware, async (req, res) => {
  try {
    // Llamada al servicio SOAP externo (mock)
    const data = await sendSOAPRequest(req.body);

    // Crear solicitud con estado retornado por SOAP
    const newSolicitud = { id: solicitudes.length + 1, estado: data.estado };
    solicitudes.push(newSolicitud);

    res.status(201).json(newSolicitud);
  } catch (err) {
    console.error('Error al registrar solicitud:', err);
    res.status(500).json({ error: 'Error al registrar solicitud' });
  }
});
// GET /solicitudes -> retorna todas las solicitudes
app.get('/solicitudes', (req, res) => {
    res.json(solicitudes);
  });
// GET /solicitudes/:id -> obtiene solicitud por id
app.get('/solicitudes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const solicitud = solicitudes.find(s => s.id === id);

  if (!solicitud) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  res.json(solicitud);
});

// Iniciar servidor en puerto 3000
app.listen(18081, () => console.log('SolicitudService en puerto 3000'));
