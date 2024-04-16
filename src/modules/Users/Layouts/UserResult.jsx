/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { usePoll } from "../../Context/PollContext";

export default function UserResult(){
    const { FetchPoll, Poll, Result} = usePoll();

    useEffect(() => {
        FetchPoll();
    }, [Poll]);


    return (
        <>
            <div className='h-[100%] flex flex-col gap-10 justify-center items-center'>
               <div className='flex gap-10'>
               {
                    Poll.length > 0 ? Poll.map((data) => (
                        < div key={data.id} className='grid place-items-center'>
                            <div className='bg-[#353535] rounded-md px-5 w-auto h-[200px] flex items-center justify-center flex-col'>
                                <h1 className='text-[1.5rem] text-[#f8f8f8] font-[500]'>Polling</h1>
                                <div className="wrap">
                                    <ul className='text-[#f8f8f8] font-[500]'>
                                        <li>IdPool : {data.id}</li>
                                        <li>Title : {data.title}</li>
                                        <li>Description : {data.description}</li>
                                        <li>Creator : {data.created_by}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )) : <h1 className='grid place-items-center text-[#f8f8f8] text-[2rem]'>DATA KOSONG</h1>
                };
               </div>
                <div className=' justify-center w-[100%] flex gap-5 flex-wrap items-center'>
                    {
                    Result.length > 0 ?
                        Result.map((data) => (
                             <div key={data.choice} className='flex-none bg-[#525252] text-[#f8f8f8] w-[250px] h-auto px-5 py-5'>
                                <h1 className='text-[1rem]'>Data Point</h1>
                                <div className="wrap text-[14px]">
                                    <p>IdPoll: {data.poll_id}</p>
                                    <p>Choice: {data.choice}</p>
                                    <p className=' mb-2'>Point</p>
                                    <div className='bg-[white] text-[#242424] font-[400]' style={{ width: data.points+"%" }}>{data.points}%</div>
                                </div>
                            </div>
                        ))
                        : null
                }
                </div>
            </div>
        </>
    );
}