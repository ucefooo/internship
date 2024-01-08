import AllBlogs from "@/components/AllBlogs";
import HeaderPage from "@/components/HeaderPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {

  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies:()=>cookieStore});

  const {data:{user}} = await supabase.auth.getUser();
  return (
    <div className="flex justify-center items-center flex-col h-full w-full gap-y-4">
      <HeaderPage  Usef={user} isOnlin={user ? true : false}/>
      <AllBlogs  Usef={user} isOnlin={user ? true : false}/>
    </div>
  );
}
