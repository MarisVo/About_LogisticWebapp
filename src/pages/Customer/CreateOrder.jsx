import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";

export default function CreateOrder() {

  const { setMetadata,accessToken,user } = useContext(MainContext);
  const navigate = useNavigate()
    const [services,setServices]= useState([])
    const [servicename,setServicename]= useState("")
  const [information, setInformation] = useState({
    nameR: "",
    phoneR: "",
    identityR:"",
    phone:"",
    email:"",
    origin:"",
    destination:"",
  });
    useEffect(() => {
       const getService = async()=>{
          const res = await axios.get(`${END_POINT}/service`)
          console.log(res)
          const {data} =res.data
          console.log(data.service)
          setServices(data.service)
        }
      getService()
    
  }, []);
 
   useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Tạo đơn hàng | TKTL",
      };
    });
     }, []);
 
  const handleForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInformation({ ...information, [name]: value });
    console.log(information);
  };
  const handleSubmit = async(e)=>{
      e.preventDefault();
    try {
      console.log(servicename)
      console.log( {
          "serviceName": servicename,
          "receiver": {
            "name": information.nameR,
            "phone": information.phoneR,
            "identity": information.identityR
          },
          "origin": information.origin,
          "destination": information.destination,
          "customerEmail": information.name,
          "customerPhone": information.phone
        })
      const res = await axios.post(
        `${END_POINT}/order/create` ,
        {
          "serviceName": servicename,
          "receiver": {
            "name": information.nameR,
            "phone": information.phoneR,
            "identity": information.identityR
          },
          "origin": information.origin,
          "destination": information.destination,
          "customerEmail": information.email,
          "customerPhone": information.phone
        }
        ,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
        console.log("res",res)
        alert("tạo hàng thành công")
        navigate("/khach-hang/dat-hang",{replace:true})
    } catch (err) {
      console.log(err);
      /* console.log(err.response);
      console.log(err.response.data.message[0]); */
     /*  setFormErrors(validate(err.response.data.message[0])); */
    }
  }
  return (
    <div>
      <div className=" relative">
        <div className=" relative ">
              <div className="flex justify-start flex-col  border-b-2  pl-4 pb-3 pt-3">
                <div className="text-xl font-bold mb-1 lg:text-2xl mt-2">
                  Tạo đơn hàng
                </div>
                <div className="text-base">Vui lòng điền đầy đủ thông tin đơn hàng</div>
              </div>
              <form className=" lg:mx-5 sm:mx-4 md:mx-5 mx-[8px] my-4 " onSubmit={handleSubmit}>
            
                  {/*  */}
                  <div className="flex flex-col mt-2 bg-white rounded-sm shadow-xl border-[1px]">
                <div className="  overflow-auto mb-3 w-[100%]" >
                <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2 bg-[#ffd124]">
                  <div className="flex flex-nowrap items-center mx-2">
                    <div className=" text-lg sm:text-lg font-bold ml-2 text-[#00003B]">
                    Thông tin người nhận
                    </div>
                  </div>
                  <div className=" flex flex-nowrap items-center mx-2 flex-row">
               
                  </div>
                </div>
                <div className="flex flex-1 w-[100%] items-center py-2 border-gray-300 border-b-[1px] ">
                  <div className="mx-3 flex flex-col  flex-1 w-[100%] relative">
                     <div className="flex-1 flex my-3 mx-[20px]">
                      <p className="absolute top-0 left-7 bg-white text-[12px] z-10">Họ và tên</p>
                        <input
                          className="outline-none  border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F] text-base  w-[100%] line-clamp-1"
                          type="text"
                          name="nameR"
                          onChange={handleForm}
                          defaultValue={information.nameR}
                        />
                      </div>
                    <div className=" mx-3 my-3 flex flex-row justify-center">
                        <div className="flex-1 mx-2 relative">
                           <p className="absolute top-[-10px] left-2 bg-white text-[12px] z-10">Số điện thoại</p>
                          <input
                            className="outline-none border-[0.75px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F] text-base  w-[100%] line-clamp-1"
                            type="text"
                            name="phoneR"
                            onChange={handleForm}
                            defaultValue={information.phoneR}
                          />
                        </div>
                        <div className="flex-1 mx-2 relative">
                              <p className="absolute top-[-10px] left-2 bg-white text-[12px] z-10">Chứng minh nhân dân</p>
                          <input
                            className="outline-none border-[0.75px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F] text-base  w-[100%] line-clamp-1"
                            type="text"
                            name="identityR"
                            onChange={handleForm}
                            defaultValue={information.identityR}
                          />
                       </div>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
            {/*  */}
                  {/*  */}
                  <div className="flex flex-col mt-2 bg-white rounded-sm shadow-xl border-[1px]">
                <div className="  overflow-auto mb-3 w-[100%]" >
                <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2 bg-[#ffd124]">
                  <div className="flex flex-nowrap items-center mx-2">
                    <div className=" text-lg sm:text-lg font-bold ml-2 text-[#00003B]">
                    Thông tin người đặt
                    </div>
                  </div>
                  <div className=" flex flex-nowrap items-center mx-2 flex-row">
               
                  </div>
                </div>
                <div className="flex flex-1 w-[100%] items-center py-2 border-gray-300 border-b-[1px] ">
                  <div className="mx-3 flex flex-col  flex-1 w-[100%] relative">
                     <div className="flex-1 flex my-3 mx-[20px]">
                      <p className="absolute top-[2px] left-7 bg-white text-[12px] z-10">Email</p>
                        <input
                          className="outline-none  border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F] text-base  w-[100%] line-clamp-1"
                          type="text"
                          name="email"
                          onChange={handleForm}
                          defaultValue={information.email}
                        />
                      </div>
                    
                     <div className="flex-1 flex my-3 mx-[20px] relative">
                      <p className="absolute top-[-10px] left-2 bg-white text-[12px] z-10">Số điện thoại</p>
                        <input
                          className="outline-none  border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F] text-base  w-[100%] line-clamp-1"
                          type="text"
                          name="phone"
                          onChange={handleForm}
                          defaultValue={information.phone}
                        />
                      </div>
                  </div>
                </div>
              </div>  
            </div>
            {/*  */}
                  {/*  */}
                  <div className="flex flex-col mt-2 bg-white rounded-sm shadow-xl border-[1px]">
                <div className="  overflow-auto mb-3 w-[100%]" >
                <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2 bg-[#ffd124]">
                  <div className="flex flex-nowrap items-center mx-2">
                    <div className=" text-lg sm:text-lg font-bold ml-2 text-[#00003B]">
                    Thông tin đơn hàng
                    </div>
                  </div>
                  <div className=" flex flex-nowrap items-center mx-2 flex-row">
            
                  </div>
                </div>
                <div className="flex flex-1 w-[100%] items-center py-2 border-gray-300 border-b-[1px] ">
                  <div className="mx-3 flex flex-col  flex-1 w-[100%] relative">
                     <div className="flex-1 flex my-3 mx-[20px]  items-center">
                        <div className="text-base mr-3  min-w-[100px]">Loại dịch vụ</div>
                        <select
                         onChange={(e)=>setServicename(e.target.value)}
                          className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F]  text-base  min-w-[180px] md:w-[100%] sm:min-w-[220px] line-clamp-1"
                        >
                        {/* <option value=""  name="service"></option> */}
                         <option value="">Dịch vụ</option>
                        {
                            services.map(service=>(
                               <option key={service._id}   value={service.name}>{service.name}</option>
                            ))
                        }
                        </select>
                  
                      </div>
                    <div className=" mx-3 my-3 flex flex-row justify-center">
                        <div className="flex-1 mx-2 relative">
                           <p className="absolute top-[-10px] left-2 bg-white text-[12px] z-10">Điạ chỉ của bạn</p>
                          <input
                            className="outline-none border-[0.75px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F] text-base  w-[100%] line-clamp-1"
                            type="text"
                            name="origin"
                            onChange={handleForm}
                            defaultValue={information.origin}
                          />
                        </div>
                        <div className="flex-1 mx-2 relative">
                              <p className="absolute top-[-10px] left-2 bg-white text-[12px] z-10">Điạ chỉ của cần đến</p>
                          <input
                            className="outline-none border-[0.75px] sm:px-2 rounded-md py-[6px] px-1 border-[#3A3C3F] text-base  w-[100%] line-clamp-1"
                            type="text"
                            name="destination"
                            onChange={handleForm}
                            defaultValue={information.destination}
                          />
                       </div>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
            <div className="flex justify-center items-center mt-2">
              <button className="py-2 px-5 mt-2 mb-4 rounded-lg font-extrabold bg-[#ffd124]  hover:translate-y-[-1px] transition-all text-[#00003B] ">
                        Tạo đơn
               </button>
            </div>
            {/*  */}
              </form>
            </div>
          </div>
        </div>
 
  );
}
