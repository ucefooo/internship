import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";



export async function DELETE(request: NextRequest,
    { params }: { params: { id: string } }) {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies:()=>cookieStore});

    
    let {error} = await supabase.from('business').delete().eq('id',params.id);
    if (error) {
        console.log('error', error)
        return new Response('error', { status: 405 })
    }
    return NextResponse.json('ok',{status:200 })
  }