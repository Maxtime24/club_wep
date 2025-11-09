// src/pages/api/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id, table } = req.body

  if (!id || !table || (table !== 'posts' && table !== 'projects')) {
    return res.status(400).json({ error: 'Invalid parameters' })
  }

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ message: 'Deleted successfully' })
}
