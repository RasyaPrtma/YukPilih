/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { ApiFetchPoll } from "../Config/Api";


const InitContext = createContext({
    FetchPoll: () => {},
    AddPoll: () => {},
    UpdatePoll: () => {},
    DeletePoll: () => {},
    Poll: [],
    Choices:[],
    Result:[],
});

const usePoll = () => {
    return useContext(InitContext);
};

const PollProvider = ({children}) => {
    const [Poll,setPoll] = useState([]);
    const [Choices,setChoices] = useState([]);
    const [Result,setResult] = useState([]);
    
    const FetchPoll = async (token) => {
        const data = await ApiFetchPoll(token);
        setPoll(data.data.data_poll);
        setChoices(data.data.data_choices);
        setResult(data.data.data_result);
    };

    const AddPoll = async () => {

    };

    const UpdatePoll = async () => {

    };

    const DeletePoll = async() => {

    };

    useEffect(() => {
        FetchPoll();
    },[Poll]);

    return(
        <InitContext.Provider value={{FetchPoll,AddPoll,UpdatePoll,DeletePoll,Poll,Choices,Result}}>
            {children}
        </InitContext.Provider>
    );
};

export {usePoll,PollProvider};