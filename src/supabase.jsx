
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pmqycqwbjxdxtwhgmeyb.supabase.co'
const supabaseKey = "sb_publishable_YN3pLBsmkgYB4DnmllF0tA_ag0Fv3fZ"
export const supabase = createClient(supabaseUrl, supabaseKey)