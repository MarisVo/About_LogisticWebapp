import React, { useState } from 'react'
import { Tabs } from 'antd';
import { END_POINT, MIEN_NAM } from '../../utils/constant';
import { MIEN_NAM_NHANH } from '../../utils/constant';
import { MIEN_NAM_SUPER } from '../../utils/constant';
import { useContext, useEffect } from 'react';
import { MainContext } from '../../context/MainContext';
import axios from 'axios';
import Location from './Area/TieuChuan/Location';

const { TabPane } = Tabs;
export default function BangGia() {
    const {setMetadata} = useContext(MainContext);
     const [services,setServices]= useState([])
    const [key,setKey] = useState('');
    const [search,setSearch]=useState("")
    const [submit,setSubmit]=useState(false)
    const [location,setLocation]=useState([])
      useEffect(() => {
        setMetadata((prev) => {
          return {
            ...prev,
            title: "Bảng giá | TKTL",
          };
        });
    },[])
    useEffect(() => {
       const getService = async()=>{
          const res = await axios.get(`${END_POINT}/service`)
         
          const {data} =res.data
         /*  console.log(data.service) */
          setServices(data.service)
        }
      getService()
        console.log(services)
  }, []);
    const findKey = (data)=>{
        return data.filter(e=>{
            return e.name.toLowerCase().includes(key.toLowerCase())
        })
    }
    console.log(search)
    const handleSearch = ()=>{
        /* setSubmit(true)
        console.log("g1",services?.map(service=>service.price_files.filter((g)=>g.province.includes(search))))
        console.log(services)
        setLocation(services?.map(service=>service.price_files.filter((g)=>g.province.includes(search))))
        const newarr=[]
        for(let i =0 ; i <= services.length; i++){
            for(let j =0 ; j <= location.length; i++){
              newarr=  services[i].prices_files.push(location[j])
             }
        }
        console.log(location)
        console.log(services)
        if(services && search && submit){ 
            
             console.log(search)
            } 
            setSubmit(false) */
    }

    return (
        <div className='price_list ' style={{ 
			maxWidth: "1200px",
			margin:"auto"
		 }}>
            <div className='p-7'>
                {/* <div className="flex rounded-[2px] h-[43px] items-center w-full my-[20px] mb-[40px]">
                    <div className="w-full mb-[10px] lg:mb-0" data-request="onSearchPriceList" id="form-price-list">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-[20px]">
                            <div className="flex items-center border border-[#b2b2b2] w-full input_block_tab">
                                <input className="bg-transparent focus:outline-none ml-2 w-full h-[43px]" id="price-from" placeholder="Gửi từ Tỉnh/Thành phố" type="text" onChange={(e)=>setSearch(e.target.value)} />
                            </div>
                            <div className="flex flex-row items-center w-full lg:w-[180px]">
                                <button className="w-full lg:w-[180px] mr-0 lg:mr-2 bg-[#e5a663] h-[45px] rounded-[2px] text-white" onClick={handleSearch}>
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {
                    services?.map((service)=>(
                        <div className='mb-3'>
                        <h5 className="uppercase  text-center mb-4 text-[20px] text-[#F0B90B]" name={1}>
                            {service.sub_detail}
                        </h5>
                        <div className='border border-[#ffbb0f] rounded-[5px] area'>
                            <div className='rounded-[5px] bg-[#f2f2f2]'>
                                <h2 className='text-center text-xl p-5 border-b-2 border-[#F0B90B] text-[#ffbb0f]'>KHU VỰC MIỀN NAM</h2>
                            </div>
                            <Location data={service.price_files} search={search} />
                        </div>
                        </div>
                    ))
                }

               


            </div>
        </div>

    )
}
