import React, { useState , useEffect } from "react";
import GroceryInput from "./GroceryInput";
import GroceryList from "./GroceryList";

import LoadingBar from 'react-top-loading-bar'
import "../styles/grocery.css"

const Grocery = () => {
  const [item, setItem] = useState([]);
  const [progress, setProgress] = useState(30)
  const [page , setPage] = useState(1);
  const [loading , setLoading] = useState(false)
  const [totalPage , setTotalPage] = useState(1)
  async function getDataFromServer1(){
    
    
    try {
      const res = await fetch(`https://json-server-mocker-masai.herokuapp.com/tasks/`);
      const res_1 = await res.json();
      // console.log(res_1);
      
     setTotalPage(Math.ceil(res_1.length/3))
    //  console.log(totalPage)
    //  console.log(page)
    
    } catch (err) {
      return console.log(err);
    }
  }
  useEffect(()=>{
    getDataFromServer1()
  },[item])




  async function getDataFromServer(){
    setLoading(true)
    setProgress(40)
    try {
      const res = await fetch(`https://json-server-mocker-masai.herokuapp.com/tasks?_page=${page}&_limit=3`);
      // const res = await fetch(`https://json-server-mocker-masai.herokuapp.com/tasks?_start=${page}&_limit=3`);
      const res_1 = await res.json();
      // console.log(res_1);
      
      setItem(res_1);
      setLoading(false);
      setProgress(100);
    } catch (err) {
      return console.log(err);
    }
  }
 

  
  useEffect(()=>{
    getDataFromServer()
  },[page, totalPage])
  
  const handleAdd = async (title) => {
    
    const payLoad = {
      title,
      status: false,
     
    };
   
   
   setLoading(true)
    try {
      const res = await fetch(`https://json-server-mocker-masai.herokuapp.com/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad)
      });
      res.json();
      // const res_1 = undefined;
      return await getDataFromServer();
    } catch (err) {
      console.log(err);
    }
    
    
  };
  function handleBack(){
    setPage(page-1);
    
  }
  function handleNext(){
    setPage(page+1);
    
  }
  return (
    <>
      <LoadingBar
        color='#f11946'
        height={5}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div>

      <h1>Grocery <i className="fa-solid fa-basket-shopping"></i></h1>
      <GroceryInput handleAdd={handleAdd} />
      < GroceryList item = {item} loading = {loading} setLoading ={setLoading}  setItem = {setItem} getDataFromServer = {getDataFromServer}/>   
      

      </div>
      <button disabled={page===1} onClick = {handleBack} >Previous <i className="fa-solid fa-circle-chevron-left"></i></button>
      <button disabled={page>=totalPage} onClick={handleNext} >Next <i className="fa-solid fa-circle-chevron-right"></i></button>
      
    </>
  );
};

export default Grocery;
