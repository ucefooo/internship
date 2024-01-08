'use client';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user,setUser] = useState(null as User | null);
  const [loading,setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(()=>{
    async function getUser(){
      const {data:{user}} = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  },[]);

  const handleSignUp = async () => {
    const {data:users,error:err} = await supabase.from('users').select('*').eq('email',email)
    if (users?.length !== 0 || err){
      console.log(users,err);
      console.log('cant sign up');
      toast.error('Failed to sign up');
      return ;
    }
    const {data:cre,error:er} = await supabase.auth.signUp({ email, password });
    if (er){
      console.log('err',er);
      console.log('cant sign up');
      toast.error('Failed to sign up');
      return ;
    }

    const {data,error} = await supabase.from('users').insert([{
      email:email,
    }]).select();

    if (error)
    {
      console.log('err',error);
      console.log('cant sign up');
      toast.error('Failed to sign up');
      return ;
    }
    toast.success('Signed up successfully YOU NEED TO CONFIRM YOUR EMAIL AND RE-SIGN IN');
    router.push('/');
    setTimeout(() => {
      router.refresh();
    }, 15000)
    setEmail('');
    setPassword('');
  }

  const handleSignIn = async () => {
    const {data:user,error:err} = await supabase.auth.signInWithPassword({ email, password });
    if (err)
    {
      console.log('err',err);
      console.log('cant sign in');
      toast.error('Failed to sign in');
      setPassword('');
      return ;
    }
    toast.success('Signed up successfully');
    router.push('/');
    setTimeout(() => {
      router.refresh();
    }, 5000)
    setEmail('');
    setPassword('');
  }
  

  if (loading) 
  {
    return (
      <div className='h-[100vh] w-[100vw] flex items-center justify-center bg-black flex-col gap-y-6' role="status">
        <svg aria-hidden="true" className="w-44 h-48 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <div className="text-4xl w-50 text-gray-600">Loading...</div>
      </div>
    );
  }

  if (user)
  {
    return (
      <div  className='h-screen flex items-center justify-center bg-gray-800 p-6'>
        <div className='bg-gray-700 p-8 gap-y-4 rounded-lg shadow-md w-[] flex justify-center items-center flex-col'>
          <h1 className='text-2xl text-white'>You are signed in as : {user.email}</h1>
          <button className='w-full mb-2 p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transform active:scale-90' onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
            router.refresh();
          }}>Sign Out</button>
          <button className='w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transform active:scale-90' onClick={() => {
            router.push('/');
            router.refresh();
          }}>Return to Home Page</button>
        </div>
      </div>
    )
  }

  return (
    <main className='h-screen flex items-center justify-center bg-gray-800 p-6'>
        <ToastContainer />
      <div className='bg-gray-900 p-8 rounded-lg shadow-md w-96'>
        <input placeholder='Email' type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} 
        className='mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500' />
        <input placeholder='Password' type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}
        className='mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500' />
        <button className='transform active:scale-90 w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focuse:outline-none' onClick={handleSignUp}>Sign UP</button>
        <button className='transform active:scale-90 w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focuse:outline-none' onClick={handleSignIn}>Sign IN</button>
      </div>
    </main>
  );
}
