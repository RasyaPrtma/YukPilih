/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { usePoll } from "../../Context/PollContext";

/* eslint-disable no-unused-vars */
export default function FetchPoll({id,title,description,creator,deadline,created_at}){
    const date = new Date(created_at).toJSON().split('.').shift();
    const {DeletePoll} = usePoll();
    
    const handleDelete = () => {
        DeletePoll(id);
    }
    return(
        <>
           <div className="flex items-center bg-[#f8f8f8] w-[700px] h-[150px] rounded-md justify-between">
                <div className="mx-5">
                    <p>Poll Id: {id}</p>
                    <p>Title: {title}</p>
                    <p>Description: {description}</p>
                    <p>Deadline: <input type="datetime-local" value={deadline} disabled /></p>
                    <p>Creator: {creator}</p>
                    <p>Created at: <input type="datetime-local" value={date} disabled/></p>
                </div>
                <div className="flex flex-col mx-10 gap-3 text-[#f8f8f8] font-[500]">
                    <Link className="bg-[#32b132] px-3 py-1 rounded-md" to={{pathname: `/vote/result/search`, search:`?idPoll=${id}`}}>View Result</Link>
                    <button className="bg-[#ff2020e7] px-3 py-1 rounded-md" onClick={handleDelete}>Delete</button>
                </div>
           </div>
        </>
    );   
}