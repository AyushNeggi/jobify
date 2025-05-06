import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Herosection from './Herosection'
import CategoryCarousel from './CategoryCarousel'
import Latestjobs from './Latestjobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate()
 useEffect(()=>{
   if(user?.role== 'recruiter'){
     navigate("/admin/home");
   }
 },[]);

  return (
    <div>
         <Navbar/>
       <Herosection />
        <CategoryCarousel/>
       <Latestjobs/>
         <Footer/>
    </div>
  )
}

export default Home