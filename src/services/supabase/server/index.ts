import { cookies } from 'next/headers'

import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const sbServer = createServerComponentClient<Database>({ cookies })
