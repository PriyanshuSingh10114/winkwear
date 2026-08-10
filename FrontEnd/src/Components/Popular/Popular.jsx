import React from 'react'
import './Popular.css'
import popular from '../Assets/popular'
import Item from '../Item/Item'
import { useEffect ,useState} from 'react'

const Popular = () => {
  const [popularProducts,setPopularProducts]=useState([]);
  
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_BACKEND_URL}/popularinwomen`)
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  },[])

  return (
    <div className="popular">
        <h2>POPULAR IN WOMEN</h2>
        <hr />
        <div className="popular-item">
            {popular.map((item,i)=>{
                return <Item key={item.id || i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} priority={i < 4} />
            })}
        </div>
    </div>
  )
}

export default Popular
