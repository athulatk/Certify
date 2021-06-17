import React,{useState} from 'react'
import Navbar from '../../components/Navbar'
import FormModal from './FormModal'
import Team from '../../assets/addteam.svg'
import AdvisorCard from '../../components/AdvisorCard'

//Advisor List
// const AdvisorDetails=({name,email,semester,index})=>{
//     return(<div className="bg-white py-4 mx-3 rounded px-2 flex flex-row ring-2 shadow-xl ring-blue-500 items-center justify-between w-full my-2">

//         <section className="w-2/12 flex justify-center">
//            <div className="h-7 w-7 rounded-full flex items-center font-bold justify-center text-sm text-blue-500 bg-indigo-100">
//                <div>{index+1}</div>
//            </div>
//         </section>
            
//         <section className="w-2/12 flex justify-center">
//             <div className="text-sm flex items-center justify-center ">
//                 <div>{name}</div>
//             </div>
//         </section>

//         <section className="w-2/12 flex justify-center">
//             <div className="text-sm flex items-center justify-center ">
//                 <div>{email}</div>
//             </div>
//         </section>


//         <section className="w-2/12 flex justify-center">
//             <div className="text-sm flex items-center justify-center text-blue-500 cursor-pointer">
//                 <div>{semester}</div>
//             </div>
//         </section>

//         <section className="w-2/12 flex justify-center">
//             <div className="text-sm flex items-center justify-center text-blue-500 cursor-pointer">
//             <Button type="submit" style={{
//                 textTransform:'capitalize',
//                 outline:'none',
//                 backgroundColor:'#528CF8',
//                 color:'white'}}><DeleteIcon style={{fontSize:18,marginRight:'0.25em'}}/> Remove</Button>
//             </div>
//         </section>

//     </div>)
// }





function AdvisorPage() {
    const[advisors,setAdvisors]=useState([]);
    const[details,setDetails]=useState({
        name:"",
        semester:"S1",
        email:"",
        password:""
    })
    return (
        <div className="flex flex-col text-black w-full items-center space-y-8">
            <Navbar/>
            {advisors.length?
            <div className="w-11/12">
            <div className="flex items-center justify-between mb-7 ml-2 mr-2">
            <h2 className="text-xl font-semibold">Staff Advisors - CSE</h2>
            <FormModal details={details} setDetails={setDetails} setAdvisors={setAdvisors}/>
            </div>
            <div className="grid gap-4 grid-cols-3">
            {
                advisors.map(
                    (advisor,index) => (
                        <AdvisorCard index={index} name={advisor.name} email={advisor.email} semester={advisor.semester}/>
                    )
                )
                
            }
            </div>
            </div>:
            <div className="flex flex-col items-center justify-center">
                <img src={Team} alt="" style={{width:'350px',marginRight:'0.5em'}}/>
                <p className="mt-10 mb-8">No staff advisors are added.</p>
                <FormModal details={details} setDetails={setDetails} setAdvisors={setAdvisors}/>
                </div>}
                
                
            
            
        </div>
    )
}

export default AdvisorPage
