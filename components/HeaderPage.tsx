'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "next-auth";


const HeaderPage = (props:{Usef:User | null,isOnlin:boolean}) => {
    const [isOnline,setIsOnline] = useState(props?.isOnlin);
    const User = props?.Usef ? props?.Usef.email : 'Guest';
    const router = useRouter();
    const supabase = createClientComponentClient();


    const onClickLog = async () => {
        if (props.user)
        {
            await supabase.auth.signOut();
            router.push('/admin/login');
            router.refresh();
        }
        else
        {
            router.push('/admin/login');
            router.refresh();
        }
    };
    const onClickCreate = () => {
        console.log('clicked create')
    };



    return (
        <div className="relative flex items-center justify-around py-4 bg-slate-500 w-full h-[2%]">
            <div className="flex items-center justify-center flex-col group">
                <Link className="text-3xl font-bold hover:bg-slate-400 p-2" href='/'>Welcome To Business</Link>
                <div className="group-hover:flex hidden">Go to index page</div>
            </div>
            <div className="flex justify-center gap-x-4 items-center flex-wrap gap-y-2">
                <div className={isOnline ? 'bg-green-600  py-2 px-7 rounded-full' : 'bg-red-800  py-2 px-7 rounded-full'}>
                    {isOnline ? `${User} is Online` : 'Guest session'}
                </div>
                <button className="transform active:scale-90 bg-gray-400 px-7 py-2 rounded hover:bg-gray-700" onClick={onClickLog}>{isOnline ? 'Log Out' : 'Log In'}</button>
                {isOnline && <Link href='/admin/create' className="">
                    <button className="transform active:scale-90 bg-blue-700 px-7 py-2 rounded hover:bg-blue-600" onClick={onClickCreate}>Create A new Business
                    </button></Link>
                    }
            </div>
        </div>
    );
};

export default HeaderPage;
