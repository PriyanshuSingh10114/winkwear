import './NewsLetter.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios'; // ✅ Add this

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (email.trim() === '') {
      toast.error('Please enter a valid email!');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/subscribe`, { email });
      toast.success('Subscribed to Wink&Wear newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again later.');
      console.error(error);
    }
  };

  return (
    <>
      <div className='newsletter'>
        <h1>Get Exclusive Offers on your Email</h1>
        <p>Subscribe to our Newsletter and Stay Updated</p>
        <div>
          <input 
            type="email" 
            placeholder='Your Email Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default NewsLetter;