import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export const invitadosDB = {
  getAll: async () => {
    const { data } = await supabase.from('invitados').select('*').order('created_at', { ascending: false })
    return data || []
  },
  create: async (inv) => {
    const { data } = await supabase.from('invitados').insert([inv]).select()
    return data
  },
  update: async (id, updates) => {
    const { data } = await supabase.from('invitados').update(updates).eq('id', id).select()
    return data
  },
  delete: async (id) => {
    await supabase.from('invitados').delete().eq('id', id)
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
  get: async (clave) => {
    const { data } = await supabase.from('configuracion').select('valor').eq('clave', clave).single()
    return data?.valor
  },
  set: async (clave, valor) => {
    await supabase.from('configuracion').upsert({ clave, valor, updated_at: new Date().toISOString() })
  },
  getAll: async () => {
    const { data } = await supabase.from('configuracion').select('*')
    return data || []
  }
}

export const fotosDB = {
  getAll: async () => {
    const { data } = await supabase.from('fotos').select('*').order('orden', { ascending: true })
    return data || []
  },
  create: async (foto) => {
    const { data } = await supabase.from('fotos').insert([foto]).select()
    return data
  },
  delete: async (id) => {
    await supabase.from('fotos').delete().eq('id', id)
  }
}
