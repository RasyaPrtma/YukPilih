import { useState } from "react";
import { usePoll } from "../../Context/PollContext";

export default function AddPoll(){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [deadline,setDeadline] = useState("");
    const [choice,setChoice] = useState("");

    const {AddPoll} = usePoll();

    const removeVal = () => {
        setTitle("");
        setDescription("");
        setDeadline("");
        setChoice("");
    }

    const handleClick = () => {
        const choices = choice.split('\n');
        AddPoll(title,description,deadline,choices,removeVal);
    }
    return(
    <>
          <h1 className="text-white font-bold text-[2rem]">Create Polling</h1>
           <div className="name">
            <h3>Title</h3>
           <div className="wrap">
                <input className="input pl-0" onChange={(e) => setTitle(e.target.value)} type="text"/>
            </div>
           </div>
            <div className="password">
                <h3>Description</h3>
                <div className="wrap">
                    <textarea className="outline-none font-[500] text-[14px]" cols="40" onChange={(e) => setDescription(e.target.value)} rows="5"></textarea>
            </div>
            </div>
            <div className="password">
                <h3>Deadline</h3>
                <div className="wrap">
                    <input className="input pl-0" onChange={(e) => setDeadline(e.target.value)} type="datetime-local"/>
            </div>
            </div>
            <div className="password">
                <h3>Choices</h3>
                <div className="wrap">
                    <textarea  className="outline-none font-[500] text-[14px]" onChange={(e) => setChoice(e.target.value)}  cols="40" rows="5"></textarea>
            </div>
            </div>
            <button className="btn" onClick={handleClick}>Create</button>
    </>
    );
}
