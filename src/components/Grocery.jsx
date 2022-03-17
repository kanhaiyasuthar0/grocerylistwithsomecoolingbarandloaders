import React, { useEffect, useState } from "react";
import GroceryInput from "./GroceryInput";
import GroceryList from "./GroceryList";
import Loader from "./Loader";
import LoadingBar from 'react-top-loading-bar'

const Grocery = () => {
  const [item, setItem] = useState([]);
  const [progress, setProgress] = useState(30)
  const [loading , setLoading] = useState(false)
  useEffect(()=>{
    getDataFromServer()
  },[])

  function getDataFromServer(){
    setLoading(true)
    setProgress(40)
    return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks`)
    .then((res)=>res.json())
    .then(res=>{
      console.log(res);
      setItem(res)
      setLoading(false)
      setProgress(100)
    }).catch(err=>console.log(err))
  }
  // useEffect(()=>{
  //   let count=0
  // },[])
  
  const handleAdd = (title) => {
    
    const payLoad = {
      title,
      status: false,
     
    };
   
   console.log(payLoad);
   setLoading(true)
    return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks` , {
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
       
      } , 
      body: JSON.stringify(payLoad)
    }).then(res=>{
     res.json()
    }).then(res=>{
      return getDataFromServer();
    }).catch(err=>{
      console.log(err)
    })
    
    
  };

  return (
    <>
      <LoadingBar
        color='#f11946'
        height={5}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1>Grocery</h1>
      <GroceryInput handleAdd={handleAdd} />
      < GroceryList item = {item} loading = {loading} setLoading ={setLoading}  setItem = {setItem} getDataFromServer = {getDataFromServer}/>   
    </>
  );
};

export default Grocery;
