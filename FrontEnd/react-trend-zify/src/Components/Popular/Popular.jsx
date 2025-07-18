import React from 'react'
import './Popular.css'
import popular from '../Assets/popular'
import Item from '../Item/Item'
import { useEffect ,useState} from 'react'

const Popular = () => {
  const [popularProducts,setPopularProducts]=useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  },[])

  return (
    <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popular.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular