'use client';

import axios from 'axios';
import { User } from 'next-auth';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const FormToUpdateNewBusiness = (props:{Usef:User | null}) => {
    const user = props.Usef ? props.Usef : null;
    const searchParams = useSearchParams().get('id') ?? '';
    const router = useRouter();
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')

    const getData = async (id:string) => {
        console.log('this is id',id);
        const returnRes = await axios.get(`/api/getBusiness/${id}`).then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
        }).catch((err) => {
    });
    }
    getData(searchParams);

    const submitForm = async (event: any) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        await axios.put(`/api/modifyBusiness/${searchParams}`,{name,email}).then((res) => {
            if (res.status === 200)
            {
                console.log('res',res);
                // add the toast succes
                toast.success('Business info updated successfully')
            }
            else
            {
                console.log('err',res);
                //add the toast error
                toast.error('Failed to update Business info');
            }
        }
        ).catch((err) => {
            console.log('err',err);
            //add the toast error
            toast.error('Failed to update Business info');
        });
        router.push('/');
        setTimeout(() => {
            router.refresh();
        }, 5000)
    };

    const onClickDelete = async () => {
        const returnRes = await axios.delete(`http://localhost:3000/api/deleteBusiness/${searchParams}`).then((res) => {
            if (res.status === 200)
            {
                console.log('res',res);
                // add the toast succes
                toast.success('Business info deleted successfully')
            }
            else
            {
                console.log('err',res);
                //add the toast error
                toast.error('Failed to delete Business info');
            }
    }).catch((err) => {
        console.log(err);
        //add the toast error
        toast.error('Failed to delete Business info');
    });
    router.push('/');
    setTimeout(() => {
        router.refresh();
    }, 5000)
    }

    return (
        <>
        <ToastContainer />
        <div className="flex justify-center items-center py-2">
            <div className='flex items-center justify-start flex-col w-[50%] h-[95%] bg-slate-300 rounded-md pt-4 pb-4 gap-4 p-4'>
                <h1 className='text-2xl font-bold text-slate-800'>Update Business Info</h1> 
                <form method="POST" onSubmit={submitForm} className="flex items-center justify-start flex-col pt-4 pb-4 gap-10 w-full">
                    <div className="flex justify-center flex-col items-center w-[50%] gap-2">
                        <label className="flex items-center justify-center text-xl" htmlFor="name">Business Name: {name}</label>
                        <input className="w-full h-[50px] bg-slate-200 rounded p-4" type="text" name="name" id="name" />
                    </div>

                    <div className="flex justify-center flex-col items-center w-[50%] gap-2">
                        <label className="flex items-center justify-center text-xl" htmlFor="email">Business email: {email}</label>
                        <input className="w-full h-[50px] bg-slate-200 rounded p-4" type="text" name="email" id="email" />
                    </div>

                    <button className="transform active:scale-90 flex items-center justify-end bg-green-800 hover:bg-green-500 text-slate-200 px-4 py-2 rounded" 
                    type="submit">Update Business info</button>

                </form>
                    <Link href={'/'}
                        className="transform active:scale-90 flex items-center justify-end bg-sky-900 hover:bg-sky-500 text-slate-200 px-4 py-2 rounded" 
                        >Go Back to All Business Page(CANCEL...)
                    </Link>
                    <button  onClick={onClickDelete}
                    className="transform active:scale-90 flex items-center justify-end bg-red-900 hover:bg-red-500 text-slate-200 px-4 py-2 rounded">
                         DELETE BUSINESS INFO
                    </button>
            </div>
        </div>
        </>
    );
};

export default FormToUpdateNewBusiness;