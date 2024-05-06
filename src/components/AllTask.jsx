import React, { useEffect, useState } from 'react'
import '../style/AllTask.css'

export default function AllTask() {

    const [getdata, setGetdata] = useState([])
    let data

    const chageStatus =(index)=>{
        // setGetdata(...[],)
        // console.log(getdata[index])
        setGetdata(...[],getdata[index].status='Complete')
    }
    const deleteItem=(index)=>{
        let data = getdata
        // data.filter((item)=>{
        //     return item
        // })
        // console.log(data[index])
    }

    useEffect(() => {
        data = JSON.parse(localStorage.getItem('todo'))
        setGetdata(data)
        console.log(data)   
    }, [])

    return (
        <>
            {
                getdata?.map((item, index) => {
                    return (
                        <div className='task bg-light p-2 rounded mb-3' key={index}>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id='checkbox'
                                    style={{ height: '20px', width: '20px' }}
                                    checked={item.status === 'Complete'}
                                    onChange={() => {chageStatus(index)}}
                                />
                                <div className='ms-2'>
                                    <small className='fw-bold text-secondary fs-6'>{item.task}</small><br />
                                    <small className=''>10.30pm,04/4/2024</small>
                                </div>
                                <div className='ms-auto'>
                                    <button className='btn btn-outline-secondary p-1 border me-2 px-2' onClick={()=>{deleteItem(index)}}><i className="bi bi-trash-fill "></i></button>
                                    <button className='btn btn-outline-secondary border p-1 px-2'><i className="bi bi-pen-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
}
