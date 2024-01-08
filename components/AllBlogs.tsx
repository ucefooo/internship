"use client";
import axios from "axios";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";


  const AllBlogs = (props:{Usef:User | null,isOnlin:boolean}) => {
    const [isOnline,setIsOnline] = useState(props?.isOnlin);
    const [allBusinesses,setAllBusinesses] = useState([]);
    const User = props.Usef ? props.Usef : null;
    const router = useRouter();

    const getData = async () => {
        const returnRes = await axios.get(`/api/getBusiness/`).then((res) => {
            setAllBusinesses(()=>res.data);
            console.log('res',res.data);
        }).catch((err) => {
    });
    }
    useEffect(()=>{
        if (User)
            setIsOnline(true);
        else
            setIsOnline(false);
        getData();
    },[])
    
    const onClickEdit = (item: ItemType) => {
        router.push(`admin/update/${item.id}?id=${item.id}`)
      };

      const onClickDelete = async (item) => {
        const returnRes = await axios.delete(`http://localhost:3000/api/deleteBusiness/${item.id}`).then((res) => {
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
    const formatDate = (dateString: string) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
      };
    return (
        <div className="flex flex-col justify-center items-center w-[100%] gap-y-4">
            <div className="text-5xl p-4 font-bold underline">
                    All Business
            </div>
            <div className="flex justify-evenly flex-wrap gap-10 w-[80%]">
            {allBusinesses.length == 0 ? 
                <h1>No Business INFO</h1>
                :
                allBusinesses.map((item,index)=>(
                    <div className=" rounded flex justify-around items-center flex-col bg-slate-400 w-[40%] h-[200px] p-4 hover:bg-slate-300 min-w-[260px] max-w-[600px]">
                        <div className="flex justify-center items-center bg-gray-500 px-4 py-1 rounded hover:bg-gray-400">
                            <h1 className="text-3xl text-bold text-blue-950 hover:text-4xl">{item.name}</h1>
                        </div>
                        <div className="flex items-center justify-center">
                            <h1 className="text-2xl">{item.email}</h1>
                        </div>
                        <div className="flex justify-around items-center w-full">
                            <div className="flex items-center justify-center">
                                <h1 className="text-xl font-bold">{item.created_by_email}</h1>
                            </div>
                            <div className="flex items-center justify-center">
                                <h1 className="text-md font-light">{formatDate(item.created_at)}</h1>
                            </div>
                        </div>
                        {isOnline && User?.email == item.created_by_email && 
                        <div className="flex justify-around items-center w-full font-normal">
                            <div className="flex items-center justify-center">
                                <button className="bg-green-700 py-1 px-4 rounded text-sm hover:bg-green-500" onClick={() => onClickEdit(item)}>Edit</button>
                            </div>
                            <div className="flex items-center justify-center">
                            <button className="bg-red-800 py-1 px-4 rounded text-sm hover:bg-red-600" onClick={() => onClickDelete(item)}>Delete</button>
                            </div>
                        </div>
                        }
                    </div>
                ))
            }
            </div>
            <ToastContainer />
        </div>
        )
    }


export default AllBlogs;


