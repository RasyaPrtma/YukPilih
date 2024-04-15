/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { ApiAddPoll, ApiDeletePoll, ApiFetchPoll, ApiFetchPollById, getToken } from "../Config/Api";
import Swal from 'sweetalert2';


const InitContext = createContext({
    FetchPoll: () => {},
    AddPoll: () => {},
    FetchPollById: () => {},
    DeletePoll: () => {},
    Poll: [],
    Choices:[],
    Result:[],
    PollById: [],
    ResultById:[],
    ChoicesById:[]
});

const usePoll = () => {
    return useContext(InitContext);
};

const PollProvider = ({children}) => {
    const [Poll,setPoll] = useState([]);
    const [Choices,setChoices] = useState([]);
    const [Result,setResult] = useState([]);
    const [PollById,setPollById] = useState([]);
    const [ChoicesById,setChoicesById] = useState([]);
    const [ResultById,setResultById] = useState([]);
    const [token,setToken] = useState(getToken());
    
    const FetchPoll = async () => {
        const data = await ApiFetchPoll(token);
        if(data.status === 200){
            setPoll(data.data.data_poll);
            setChoices(data.data.data_choices);
            setResult(data.data.data_result);
        }
    };

    const AddPoll = async (titl,desc,date,choic,removeVal) => {
        const data = await ApiAddPoll(titl,desc,date,choic,token);
        if(data.status === 201){
            Swal.fire({
                title:"Berhasil Membuat Polling",
                icon:'success',
                showConfirmButton:false,
                timer:1000
            });
            FetchPoll()
            return removeVal("");
        }
    };

    const FetchPollById = async (id) => {
        const data = await ApiFetchPollById(id,token);
        if(data.status === 200){
            setPollById([data.data.message.data_poll]);
            setResultById(data.data.message.data_result);
            setChoicesById(data.data.message.data_choices);
        }
    };

    const DeletePoll = async(id) => {
        const data = await ApiDeletePoll(id,token);
        console.log(data);
        Swal.fire({
            title:"Apakah Anda Yakin Ingin Menghapus Nya?",
            icon:'question',
            showCancelButton:true,
            cancelButtonColor:'red',
            confirmButtonColor:'green',
            confirmButtonText:"Deleted!"
        }).then((result) => {
            if(result.isConfirmed){
                if(data.status === 200){
                    Swal.fire({
                        title:data.data.message,
                        icon:'success',
                        timer:2000,
                        showConfirmButton:false
                    })
                   return FetchPoll()
                }
                
            }
        })
        
    };

    useEffect(() => {
        FetchPoll()
        setToken(getToken());
    },[PollById]);

    return(
        <InitContext.Provider value={{FetchPoll,AddPoll,FetchPollById,DeletePoll,Poll,Choices,Result,PollById,ResultById,ChoicesById}}>
            {children}
        </InitContext.Provider>
    );
};

export {usePoll,PollProvider};