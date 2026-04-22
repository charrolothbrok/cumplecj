import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export const invitadosDB = {
  getAll: async () => {
    const { data } = await supabase.from('invitados').select('*, confirmaciones(*)').order('created_at', { ascending: false })
    return data || []
  },
  create: async (inv) => {
    const token = Math.random().toString(36).substr(2, 8).toUpperCase()
    const { data } = await supabase.from('invitados').insert([{ ...inv, token }]).select()
    return data
  },
  update: async (id, updates) => {
    const { data } = await supabase.from('invitados').update(updates).eq('id', id).select()
    return data
  },
  delete: async (id) => { await supabase.from('invitados').delete().eq('id', id) },
  marcarEnviada: async (id) => {
    const { data } = await supabase.from('invitados').update({ invitacion_enviada: true, invitacion_enviada_at: new Date().toISOString() }).eq('id', id).select()
    return data
  },
  checkIn: async (token) => {
    const { data } = await supabase.from('invitados').update({ checked_in: true, checked_in_at: new Date().toISOString() }).eq('token', token).select()
    return data
  },
  undoCheckIn: async (id) => {
    const { data } = await supabase.from('invitados').update({ checked_in: false, checked_in_at: null }).eq('id', id).select()
    return data
  }
}

export const confirmacionesDB = {
  getAll: async () => {
    const { data } = await supabase.from('confirmaciones').select('*').order('created_at', { ascending: false })
    return data || []
  },
  create: async (conf) => {
    const { data } = await supabase.from('confirmaciones').insert([conf]).select()
    return data
  }
}

export const configDB = {
  getAll: async () => {
    const { data } = await supabase.from('configuracion').select('*')
    const obj = {}
    ;(data || []).forEach(c => { obj[c.clave] = c.valor })
    return obj
  },
  set: async (clave, valor) => {
    await supabase.from('configuracion').upsert({ clave, valor, updated_at: new Date().toISOString() })
  },
  setMany: async (obj) => {
    const upserts = Object.entries(obj).map(([clave, valor]) => ({ clave, valor, updated_at: new Date().toISOString() }))
    await supabase.from('configuracion').upsert(upserts)
  }
}

export const fotosDB = {
  getAll: async (tipo) => {
    let q = supabase.from('fotos').select('*').order('orden', { ascending: true })
    if (tipo) q = q.eq('tipo', tipo)
    const { data } = await q
    return data || []
  },
  create: async (foto) => {
    const { data } = await supabase.from('fotos').insert([foto]).select()
    return data
  },
  delete: async (id) => { await supabase.from('fotos').delete().eq('id', id) },
  upload: async (file, tipo) => {
    const ext = file.name.split('.').pop()
    const name = `${tipo}-${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('fotos').upload(name, file, { upsert: true })
    if (error) throw error
    const { data: { publicUrl } } = supabase.storage.from('fotos').getPublicUrl(name)
    return publicUrl
  }
}

export const regalosDB = {
  getAll: async () => {
    const { data } = await supabase.from('regalos').select('*').order('orden', { ascending: true })
    return data || []
  },
  create: async (r) => {
    const { data } = await supabase.from('regalos').insert([r]).select()
    return data
  },
  update: async (id, updates) => {
    const { data } = await supabase.from('regalos').update(updates).eq('id', id).select()
    return data
  },
  delete: async (id) => { await supabase.from('regalos').delete().eq('id', id) }
}
