-- ===================================
-- Script para crear tablas en Supabase
-- ===================================
-- Copiar y ejecutar en el SQL Editor de Supabase

-- 1. Tabla de Invitados
CREATE TABLE IF NOT EXISTS invitados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  familia TEXT,
  num_pases INTEGER DEFAULT 1,
  token TEXT UNIQUE,
  lado TEXT DEFAULT 'ambos',
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP,
  hora_entrada TEXT,
  invitacion_enviada BOOLEAN DEFAULT FALSE,
  invitacion_enviada_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabla de Confirmaciones RSVP
CREATE TABLE IF NOT EXISTS confirmaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  telefono TEXT,
  num_personas INTEGER,
  asistira BOOLEAN DEFAULT TRUE,
  restriccion_alimentaria TEXT,
  mensaje TEXT,
  lado TEXT,
  invitado_id UUID REFERENCES invitados(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Tabla de Configuración
CREATE TABLE IF NOT EXISTS configuracion (
  clave TEXT PRIMARY KEY,
  valor TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- Habilitar Row Level Security (RLS)
-- ===================================

-- Tabla invitados
ALTER TABLE invitados ENABLE ROW LEVEL SECURITY;

-- Tabla confirmaciones
ALTER TABLE confirmaciones ENABLE ROW LEVEL SECURITY;

-- Tabla configuracion
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

-- ===================================
-- Políticas de Acceso
-- ===================================

-- Invitados - Lectura pública
CREATE POLICY "invitados_select_public" ON invitados
  FOR SELECT USING (true);

-- Invitados - Inserción pública
CREATE POLICY "invitados_insert_public" ON invitados
  FOR INSERT WITH CHECK (true);

-- Invitados - Actualización pública
CREATE POLICY "invitados_update_public" ON invitados
  FOR UPDATE USING (true) WITH CHECK (true);

-- Confirmaciones - Lectura pública
CREATE POLICY "confirmaciones_select_public" ON confirmaciones
  FOR SELECT USING (true);

-- Confirmaciones - Inserción pública
CREATE POLICY "confirmaciones_insert_public" ON confirmaciones
  FOR INSERT WITH CHECK (true);

-- Configuracion - Lectura pública
CREATE POLICY "configuracion_select_public" ON configuracion
  FOR SELECT USING (true);

-- Configuracion - Inserción/Actualización
CREATE POLICY "configuracion_upsert_public" ON configuracion
  FOR INSERT WITH CHECK (true);

CREATE POLICY "configuracion_update_public" ON configuracion
  FOR UPDATE USING (true) WITH CHECK (true);

-- ===================================
-- Crear índices para mejor rendimiento
-- ===================================

CREATE INDEX idx_invitados_token ON invitados(token);
CREATE INDEX idx_invitados_familia ON invitados(familia);
CREATE INDEX idx_invitados_checked_in ON invitados(checked_in);
CREATE INDEX idx_confirmaciones_nombre ON confirmaciones(nombre);
CREATE INDEX idx_confirmaciones_asistira ON confirmaciones(asistira);

-- ===================================
-- Datos de ejemplo (opcional)
-- ===================================

-- INSERT INTO invitados (nombre, familia, num_pases, token)
-- VALUES 
--   ('Juan García', 'García', 2, 'token1234'),
--   ('María López', 'López', 1, 'token5678');

-- ===================================
-- FIN DEL SCRIPT
-- ===================================
