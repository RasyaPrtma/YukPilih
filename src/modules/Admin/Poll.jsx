import { usePoll } from "../Context/PollContext";
import AddPoll from "./Layouts/AddPoll";
import FetchPoll from "./Layouts/FetchPoll";

export default function Poll(){

    const {Poll} = usePoll();

    return(
        <>
            <div className="h-[100vh] flex justify-center items-center gap-[5rem]">
                <div className="bg-[#a09d9d] flex flex-col items-center px-5 py-5 rounded-lg text-[#242424] font-[500] text-[14px]">
                <AddPoll/>
                </div>
                <div className="bg-[#a09d9d] data-poll flex flex-col gap-10 h-[65%] mt-[1rem] overflow-y-scroll px-5 py-5 rounded-md    ">
                    {
                        Poll.map((data) => (
                            <FetchPoll key={data.id} id={data.id} title={data.title} description={data.description} creator={data.created_by} deadline={data.deadline} created_at={data.created_at}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
}