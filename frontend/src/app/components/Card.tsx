'use client'
import React, {useRef, useState} from "react";
import sendRepoUrl from "@/app/components/serverAction";
import checkStatus from "@/app/components/fetchStatus";

export default function Card(){
    const [status,setStatus] = useState('');
    const [result,setResult] = useState(null);
    const urlRef = useRef<HTMLParagraphElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('pending')
        const formData = new FormData(e?.currentTarget);
        console.log(formData.get('url'))
        const hash = await sendRepoUrl(formData.get('url'));
        console.log('HASH',hash);
        const status  = await checkStatus(
            {hash,cb:receiveUrl})
        console.log('status',status);
    }

    const receiveUrl = (res:any)=>{
        setResult(res.url);
        setStatus('');
    }
    const handleCopy = async (e:any) => {
        e.preventDefault();
        const value = urlRef?.current?.innerText;
        const url = value?.split(':').slice(1).join(':');
        console.log(value)
        if (url) navigator.clipboard.writeText(url).then(()=>alert('Copied'))
    }
    return (
        <form className="w-96 h-96 mx-auto bg-white shadow-lg rounded-lg  text-black" onSubmit={async (e)=>onSubmit(e)}>
            <div className="px-4 py-2 h-full flex flex-col justify-center">
                <h2 className="text-center font-extrabold text-xl mb-3.5">Vercel Clone</h2>
                <h2 className="text-center font-semibold text-xl mb-10">Enter Your URL</h2>
                <input type="text"
                       name='url'
                       className="block w-full px-4 py-2
                       rounded-md focus:outline-none
                       focus:border-blue-500 border-2 border-black mb-5"
                />
                <button
                    className={`w-full bg-black text-white font-semibold
                     py-2 mt-4 rounded-md hover:bg-gray-700
                     focus:outline-none focus:bg-gray-500 
                     ${status === 'pending' ? 'cursor-not-allowed bg-gray-500 ' : ''}
                     `}
                     type='submit'
                    disabled={status === 'pending'}
                >
                    Submit {status === 'pending' ?
                    <span className='font-extralight text-xs'>...</span> : null}
                </button>
                {result &&
                    <div className='mt-4 justify-center text-green-900 flex flex-row items-center align-middle'>
                        <p  ref={urlRef}>
                            URL : http://{result}
                        </p>
                        <button className='ml-4 bg-black text-white p-1 rounded' onClick={handleCopy}>copy</button>

                    </div>


                }

            </div>
        </form>
    );
}