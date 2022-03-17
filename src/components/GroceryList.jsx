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


      {loading ? <Loader/> : <ul style={{listStyle:"none"}}> 
      
      {item.map((li , index)=>{
       return  <div key={li.id}> 
        <div> {li.title} <button key={index} onClick={(event)=>handleDelete(event , index, li)}>DELETE</button></div>      
         </div> 
          
         
          
      })}
      </ul> }
      </>
  )
}

export default GroceryList