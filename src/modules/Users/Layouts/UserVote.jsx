import { usePoll } from "../../Context/PollContext"
import Swal from 'sweetalert2';

export default function UserVote(){
    const {Choices,Voting} = usePoll();

    const Votehandle = (poll_id,choice_id) =>{
        Swal.fire({
            title:"Kamu Yakin?",
            icon:'question',
            showCancelButton:true,
        }).then((confirm) => {
            if(confirm.isConfirmed){
                Voting(poll_id,choice_id);
            }
        })
    }

    return(
        <>
             <div className="flex justify-center items-center h-[100vh]">
             <div className='flex gap-10'>
               {
                    Choices.length > 0 ? Choices.map((data) => (
                        < div key={data.id} className='grid place-items-center'>
                            <div className='bg-[#353535] rounded-md px-5 w-auto h-[200px] flex items-center justify-center flex-col'>
                                <h1 className='text-[1.5rem] text-[#f8f8f8] font-[500]'>Polling</h1>
                                <div className="wrap">
                                    <ul className='text-[#f8f8f8] font-[500]'>
                                        <li>IdPool : {data.poll_id}</li>
                                        <li>Choice: {data.choice}</li>
                                        <div className="wrap text-center mt-2">
                                            <button onClick={() => Votehandle(data.poll_id,data.id)} className="bg-[#4d4d4d] px-5 py-1 rounded-lg">Pilih</button>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )) : <h1 className='grid place-items-center text-[#f8f8f8] text-[2rem]'>DATA KOSONG</h1>
                };
               </div>
             </div>
        </>
    );
}