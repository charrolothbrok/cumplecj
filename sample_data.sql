-- ===================================
-- Datos de ejemplo para la BD
-- ===================================
-- Copiar y ejecutar en Supabase para agregar invitados de ejemplo

-- Insertar invitados de ejemplo
INSERT INTO invitados (nombre, familia, num_pases, token, lado, invitacion_enviada)
VALUES
  ('Juan García', 'García', 2, 'inv_juan001', 'papá', true),
  ('María López', 'López', 2, 'inv_maria001', 'mamá', true),
  ('Carlos Rodríguez', 'Rodríguez', 1, 'inv_carlos001', 'amigo', true),
  ('Ana Martínez', 'Martínez', 3, 'inv_ana001', 'familia', true),
  ('Pedro Sánchez', 'Sánchez', 1, 'inv_pedro001', 'amigo', true),
  ('Rosa González', 'González', 2, 'inv_rosa001', 'familia', true),
  ('Luis Fernández', 'Fernández', 2, 'inv_luis001', 'amigo', true),
  ('Sofía Torres', 'Torres', 1, 'inv_sofia001', 'amiga', true),
  ('Diego Moreno', 'Moreno', 2, 'inv_diego001', 'familia', true),
  ('Elena Ruiz', 'Ruiz', 3, 'inv_elena001', 'familia', true);

-- Insertar confirmaciones de ejemplo
INSERT INTO confirmaciones (nombre, telefono, num_personas, asistira, restriccion_alimentaria, mensaje)
VALUES
  ('Juan García', '+34 612 345 678', 2, true, NULL, '¡Nos encanta celebrar con ustedes!'),
  ('María López', '+34 623 456 789', 2, true, 'Vegetariana', 'Será un día muy especial'),
  ('Carlos Rodríguez', '+34 634 567 890', 1, true, NULL, '¡Qué emoción! Ahí estaremos'),
  ('Ana Martínez', '+34 645 678 901', 3, true, 'Sin gluten', 'Gracias por la invitación'),
  ('Pedro Sánchez', '+34 656 789 012', 1, false, NULL, 'Disculpen, no podré asistir');

-- Consultar los datos insertados
SELECT * FROM invitados;
SELECT * FROM confirmaciones;

-- ===================================
-- Si necesitas limpiar los datos:
-- ===================================
-- DELETE FROM confirmaciones;
-- DELETE FROM invitados;

-- ===================================
-- Agregar más invitados manualmente
-- ===================================
-- INSERT INTO invitados (nombre, familia, num_pases, token)
-- VALUES
--   ('Tu nombre', 'Tu familia', 1, 'inv_unico_token_aqui'),
--   ('Otro nombre', 'Otra familia', 2, 'inv_otro_token_aqui');
