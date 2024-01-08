import { type NextRequest } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { headers } from 'next/headers'
 
export async function GET(request: NextRequest) {
  const headersList = headers()
  const referer = headersList.get('referer')

  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies:()=>cookieStore});

  const { data, error } = await supabase
    .from('business')
    .select('*')
  if (error) {
    console.log('error', error)
    return new Response(error.message, { status: 500 })
  }
  if (!data) {
    throw new Error('Not found')
  }

  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  })
}
