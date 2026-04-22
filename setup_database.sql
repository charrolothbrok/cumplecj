-- Invitados
CREATE TABLE IF NOT EXISTS invitados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  familia TEXT,
  num_pases INTEGER DEFAULT 1,
  token TEXT UNIQUE DEFAULT upper(substr(md5(random()::text), 1, 8)),
  lado TEXT DEFAULT 'ambos',
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  invitacion_enviada BOOLEAN DEFAULT FALSE,
  invitacion_enviada_at TIMESTAMPTZ,
  telefono TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Confirmaciones RSVP
CREATE TABLE IF NOT EXISTS confirmaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitado_id UUID REFERENCES invitados(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  telefono TEXT,
  num_personas INTEGER DEFAULT 1,
  asistira BOOLEAN DEFAULT TRUE,
  restriccion_alimentaria TEXT,
  mensaje TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configuracion del evento
CREATE TABLE IF NOT EXISTS configuracion (
  clave TEXT PRIMARY KEY,
  valor TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fotos galeria
CREATE TABLE IF NOT EXISTS fotos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  descripcion TEXT,
  tipo TEXT DEFAULT 'galeria',
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Regalos / tiendas
CREATE TABLE IF NOT EXISTS regalos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT DEFAULT 'tienda',
  nombre TEXT,
  link TEXT,
  logo_url TEXT,
  banco TEXT,
  titular TEXT,
  num_cuenta TEXT,
  clabe TEXT,
  concepto TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Config inicial
INSERT INTO configuracion (clave, valor) VALUES
  ('misa_lugar', 'Iglesia Central'),
  ('misa_hora', '7:00 AM'),
  ('misa_direccion', 'Avenida Principal 456'),
  ('misa_maps', ''),
  ('salon_nombre', 'Salón Los Girasoles'),
  ('salon_direccion', 'Calle Principal 123, Centro'),
  ('salon_hora', '5:00 PM'),
  ('salon_maps', ''),
  ('fecha_evento', '8 de Agosto de 2026'),
  ('regalos_activo', 'true'),
  ('regalos_mensaje', 'Tu presencia es nuestro mejor regalo. Si deseas hacernos un obsequio, aquí te dejamos algunas opciones:'),
  ('musica_url', '')
ON CONFLICT (clave) DO NOTHING;

-- RLS
ALTER TABLE invitados ENABLE ROW LEVEL SECURITY;
ALTER TABLE confirmaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE regalos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_all" ON invitados;
DROP POLICY IF EXISTS "public_all" ON confirmaciones;
DROP POLICY IF EXISTS "public_all" ON configuracion;
DROP POLICY IF EXISTS "public_all" ON fotos;
DROP POLICY IF EXISTS "public_all" ON regalos;

CREATE POLICY "public_all" ON invitados FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON confirmaciones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON configuracion FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON fotos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON regalos FOR ALL USING (true) WITH CHECK (true);
