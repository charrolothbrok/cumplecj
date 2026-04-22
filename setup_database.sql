-- Invitados
CREATE TABLE IF NOT EXISTS invitados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  familia TEXT,
  num_pases INTEGER DEFAULT 1,
  token TEXT UNIQUE,
  lado TEXT DEFAULT 'ambos',
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP,
  invitacion_enviada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Confirmaciones
CREATE TABLE IF NOT EXISTS confirmaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  telefono TEXT,
  num_personas INTEGER DEFAULT 1,
  asistira BOOLEAN DEFAULT TRUE,
  restriccion_alimentaria TEXT,
  mensaje TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Configuracion
CREATE TABLE IF NOT EXISTS configuracion (
  clave TEXT PRIMARY KEY,
  valor TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Fotos
CREATE TABLE IF NOT EXISTS fotos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  descripcion TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Datos iniciales de configuracion
INSERT INTO configuracion (clave, valor) VALUES
  ('misa_lugar', 'Iglesia Central'),
  ('misa_hora', '7:00 AM'),
  ('misa_direccion', 'Avenida Principal 456'),
  ('salon_nombre', 'Salón Los Girasoles'),
  ('salon_direccion', 'Calle Principal 123, Centro'),
  ('salon_hora', '5:00 PM'),
  ('salon_maps', ''),
  ('fecha_evento', '8 de Agosto de 2026')
ON CONFLICT (clave) DO NOTHING;

-- RLS (Row Level Security)
ALTER TABLE invitados ENABLE ROW LEVEL SECURITY;
ALTER TABLE confirmaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON invitados FOR SELECT USING (true);
CREATE POLICY "Public insert" ON invitados FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update" ON invitados FOR UPDATE USING (true);
CREATE POLICY "Public delete" ON invitados FOR DELETE USING (true);

CREATE POLICY "Public read" ON confirmaciones FOR SELECT USING (true);
CREATE POLICY "Public insert" ON confirmaciones FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read" ON configuracion FOR SELECT USING (true);
CREATE POLICY "Public insert" ON configuracion FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update" ON configuracion FOR UPDATE USING (true);

CREATE POLICY "Public read" ON fotos FOR SELECT USING (true);
CREATE POLICY "Public insert" ON fotos FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete" ON fotos FOR DELETE USING (true);
