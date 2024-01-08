import FormToCreateNewBusiness from "@/components/FormToCreateNewBusiness";
import HeaderPage from "@/components/HeaderPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Page = async () => {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies:()=>cookieStore});

    const {data:{user}} = await supabase.auth.getUser();

    return (
        <div>
            <HeaderPage Usef={user} isOnlin={user ? true : false} />
            <FormToCreateNewBusiness Usef={user}/>
        </div>
    );
};

export default Page;