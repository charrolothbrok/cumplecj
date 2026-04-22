import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funciones auxiliares para la base de datos
export const invitadosDB = {
  async getAll() {
    const { data, error } = await supabase
      .from('invitados')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getByToken(token) {
    const { data, error } = await supabase
      .from('invitados')
      .select('*')
      .eq('token', token)
      .single()
    if (error) throw error
    return data
  },

  async create(invitado) {
    const { data, error } = await supabase
      .from('invitados')
      .insert([invitado])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('invitados')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('invitados')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async checkIn(id, hora) {
    return this.update(id, {
      checked_in: true,
      checked_in_at: new Date().toISOString(),
      hora_entrada: hora
    })
  }
}

export const confirmacionesDB = {
  async getAll() {
    const { data, error } = await supabase
      .from('confirmaciones')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async create(confirmacion) {
    const { data, error } = await supabase
      .from('confirmaciones')
      .insert([confirmacion])
      .select()
    if (error) throw error
    return data[0]
  }
}

export const configDB = {
  async get(clave) {
    const { data, error } = await supabase
      .from('configuracion')
      .select('valor')
      .eq('clave', clave)
      .single()
    if (error) return null
    return data?.valor
  },

  async set(clave, valor) {
    const { error } = await supabase
      .from('configuracion')
      .upsert({ clave, valor }, { onConflict: 'clave' })
    if (error) throw error
  }
}
