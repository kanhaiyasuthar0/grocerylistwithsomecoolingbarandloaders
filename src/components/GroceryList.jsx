import React from 'react'
import Loader from './Loader'



const GroceryList = ({item , loading , getDataFromServer  }) => {
    
   const handleDelete = (e , index, li)=>{
       
        // let arr = item.filter((item , index)=> !(index===e));     
         console.log(e, index) 

        fetch(`https://json-server-mocker-masai.herokuapp.com/tasks/${li.id}` , {
      method:"DELETE"
     
    }).then(res=>{
     res.json()
    }).then(res=>{
      return getDataFromServer();
    }).catch(err=>{
      console.log(err)
    })

    //   setItem(arr)
   }
  return (
      <>
      <h2>GroceryList</h2>


      {loading ? <Loader/> : <ul style={{listStyle:"none" }}> 
      
      {item.map((li , index)=>{
       return  <div style={{display:"flex" , justifyContent:"space-around" , maxWidth:"30vw", margin:"auto"}} key={li.id}> 
        <div> {li.title} </div>  <button key={index} onClick={(event)=>handleDelete(event , index, li)}><i style={{color:"red"}} className="fa-solid fa-trash-can"></i></button>    
         </div> 
          
          
          
      })}
      </ul> }
      </>
  )
}

export default GroceryList