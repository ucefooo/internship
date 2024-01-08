import FormToUpdateNewBusiness from "@/components/FormToUpdateNewBusiness";
import HeaderPage from "@/components/HeaderPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



const Page = async () => {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies:()=>cookieStore});

    const {data:{user}} = await supabase.auth.getUser();

    return (
        <div className="gap-y-4">
            <HeaderPage Usef={user} isOnlin={user ? true : false}/>
            <FormToUpdateNewBusiness Usef={user}/>
        </div>
    );
}


export default Page;