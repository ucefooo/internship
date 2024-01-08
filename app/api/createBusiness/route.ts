import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";


export async function POST(request: NextRequest) {
    const {name,email,user} = await request.json()
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies:()=>cookieStore});

    const {data:dat,error:err} = await supabase.from('users').select(
        `id`
      ).eq('email', user.email
    ).single();
    if (err || !dat) {
        console.log('err', err)
        return new Response('error', { status: 405 })
    }

    const { data, error } = await supabase
        .from('business')
        .insert([
            { name: name, email: email, created_by: dat.id, created_by_email: user.email },
        ])
        .select()
    if (error) {
        console.log('error', error)
        return new Response('error', { status: 405 })
    }
    return NextResponse.json('ok',{status:200 })
  }