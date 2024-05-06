import React, { useEffect, useState } from 'react'
import '../style/Home.css'
import '../style/Util.css'
import AllTask from './AllTask'

export default function Home() {

    const [modalShow, setModalShow] = useState(false)
    const [statusrender, setStatusrender] = useState('Complete')
    const [updateModal, setUpdateModal] = useState({
        isvisible: false,
        data: null
    })
    const [getdata, setGetdata] = useState([])
    const [task, setTask] = useState('')
    const [status, setStatus] = useState('Complete')
    let mydate = new Date()
    let currentDate = mydate.toLocaleString()
    let id

    const addTodos = () => {
        // console.log(task, status)
        id = Date.now()
        const existingData = JSON.parse(localStorage.getItem("todo")) || [];
        const newData = [...existingData, { task, status, id, currentDate}];
        localStorage.setItem("todo", JSON.stringify(newData))
        setGetdata(JSON.parse(localStorage.getItem('todo')))
        setModalShow(false)
        setTask('')
    }

    const deleteTodos = (id) => {
        // console.log(index)
        let todos = getdata.filter((item) => {
            return item.id !== id
        })
        console.log(todos)
        localStorage.setItem("todo", JSON.stringify(todos))
        setGetdata(JSON.parse(localStorage.getItem('todo')))
    }

    const chageStatus = (item) => {
        console.log(item)
        let status = item.status
        let updateItem = { ...item, status: status === 'Complete' ? 'Incomplete' : 'Complete' }
        let updatedTodolist = getdata.map((items) => {
            if (items.id === item.id) {
                return updateItem
            }
            else {
                return items
            }
        })
        setGetdata(updatedTodolist)
        localStorage.setItem("todo", JSON.stringify(updatedTodolist))
    }

    const UpdateTodos = (data) => {
        let updateItem = { id: data.id, task: task, status: status }
        let updatedTodolist = getdata.map((item) => {
            if (item.id === data.id) {
                return updateItem
            }
            else {
                return item
            }
        })
        // console.log(updatedTodolist)
        setGetdata(updatedTodolist)
        localStorage.setItem("todo", JSON.stringify(updatedTodolist))
        setUpdateModal({ isvisible: false, data: null })
        setTask('')
    }

    useEffect(() => {
        setGetdata(JSON.parse(localStorage.getItem('todo')))
        console.log(getdata)
        // console.log(currentDate)
    }, [])

    return (
        <>
            <div className='container-fluid home'>
                <div className="container main-content  border-dark">
                    <h1 className='pt-5 fw-bold text-secondary text-center'>TODO LIST</h1>
                    <div className='mt-5 d-flex justify-content-between'>
                        <button className='text-light fw-bold purple border rounded px-3' onClick={() => { setModalShow(true) }}>Add Task</button>
                        <select className='btn btn-secondary fw-bold' value={statusrender} onChange={(e) => { setStatusrender(e.target.value) }}>
                            <option value="All">All Task</option>
                            <option value="Incomplete">inComplete</option>
                            <option value="Complete">Completed</option>
                        </select>
                    </div>
                    <div className="tasks mt-3 p-4  border-dark rounded" >
                        {/* <AllTask /> */}
                        {
                            getdata?.map((item, index) => {

                                // if (statusrender === 'Complete' || 'Incomplete') {


                                // }
                                if (statusrender === 'All') {
                                    return (
                                        <div className='task bg-light p-2 rounded mb-3' key={index}>
                                            <div className='d-flex align-items-center'>
                                                <input type="checkbox" id='checkbox'
                                                    style={{ height: '20px', width: '20px' }}
                                                    checked={item.status === 'Complete'}
                                                    onChange={() => { chageStatus(item) }}
                                                />
                                                <div className='ms-2'>
                                                    <small className={`fw-bold text-secondary fs-6 ${item.status === 'Complete' && 'text-decoration-line-through'}`}>{item.task}</small><br />
                                                    <small className=''>{item.currentDate}</small>
                                                </div>
                                                <div className='ms-auto'>
                                                    <button className='btn btn-outline-secondary p-1 border me-2 px-2' onClick={() => { deleteTodos(item.id) }}><i className="bi bi-trash-fill "></i></button>
                                                    <button className='btn btn-outline-secondary border p-1 px-2' onClick={() => { setUpdateModal({ isvisible: true, data: item }) }}><i className="bi bi-pen-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                else {
                                    if (item.status === statusrender) {
                                        return (
                                            <div className='task bg-light p-2 rounded mb-3' key={index}>
                                                <div className='d-flex align-items-center'>
                                                    <input type="checkbox" id='checkbox'
                                                        style={{ height: '20px', width: '20px' }}
                                                        checked={item.status === 'Complete'}
                                                        onChange={() => { chageStatus(item) }}
                                                    />
                                                    <div className='ms-2'>
                                                        <small className={`fw-bold text-secondary fs-6 ${item.status === 'Complete' && 'text-decoration-line-through'}`}>{item.task}</small><br />
                                                        <small className=''>{item.currentDate}</small>
                                                    </div>
                                                    <div className='ms-auto'>
                                                        <button className='btn btn-outline-secondary p-1 border me-2 px-2' onClick={() => { deleteTodos(item.id) }}><i className="bi bi-trash-fill "></i></button>
                                                        <button className='btn btn-outline-secondary border p-1 px-2' onClick={() => { setUpdateModal({ isvisible: true, data: item }) }}><i className="bi bi-pen-fill"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                }

                            })
                        }
                    </div>
                </div>

                {/* MODAL */}
                {modalShow &&
                    <div className="whole-modal border border-dark d-flex justify-content-center align-items-center">
                        <div className="modal-contents border rounded rounded-3">
                            <div className="row m-0  d-flex py-3">
                                <div className="col d-flex">
                                    <p className='fs-5 fw-bold text-secondary mb-0'>Add TODO</p>
                                    <button className='ms-auto btn border border-dark' onClick={() => { setModalShow(false) }}><i className="bi bi-x-lg "></i></button>
                                </div>
                            </div>
                            <div className="row m-0">
                                <div className="col">
                                    <p className='fs-5 mb-0 text-secondary'>Title</p>
                                    <input type="text" className='mt-1 w-100 bg-light rounded py-2 px-2 border' placeholder='Enter The Todo!'
                                        value={task}
                                        onChange={(e) => { setTask(e.target.value) }}
                                    />

                                    <p className='fs-5 mb-0 mt-3 text-secondary'>Status</p>
                                    <select className='mt-1 w-100 py-2 px-2 rounded border'
                                        value={status}
                                        onChange={(e) => { setStatus(e.target.value) }}
                                    >
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row m-0 mt-4">
                                <div className="col">
                                    <button className='btn purple fw-bold me-2 border' onClick={addTodos} disabled={task === ''}>Add Task</button>
                                    <button className='btn btn-secondary fw-bold text-light' onClick={() => { setModalShow(false) }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* UPDATE MODAL */}
                {updateModal.isvisible &&
                    <div className="whole-modal border border-dark d-flex justify-content-center align-items-center">
                        <div className="modal-contents border rounded rounded-3">
                            <div className="row m-0  d-flex py-3">
                                <div className="col d-flex">
                                    <p className='fs-5 fw-bold text-secondary mb-0'>Edit TODO</p>
                                    <button className='ms-auto btn border border-dark' onClick={() => { setUpdateModal({ isvisible: false, data: null }) }}><i className="bi bi-x-lg "></i></button>
                                </div>
                            </div>
                            <div className="row m-0">
                                <div className="col">
                                    <p className='fs-5 mb-0 text-secondary'>Title</p>
                                    <input type="text" className='mt-1 w-100 bg-light rounded py-2 px-2 border'
                                        defaultValue={updateModal?.data?.task}
                                        onChange={(e) => { setTask(e.target.value) }}
                                    />

                                    <p className='fs-5 mb-0 mt-3 text-secondary'>Status</p>
                                    <select className='mt-1 w-100 py-2 px-2 rounded border'
                                        defaultValue={updateModal?.data?.status}
                                        onChange={(e) => { setStatus(e.target.value) }}>
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row m-0 mt-4">
                                <div className="col">
                                    <button className='btn btn-outline-success fw-bold me-2' onClick={() => { UpdateTodos(updateModal?.data) }} disabled={task === ''}>Update Task</button>
                                    <button className='btn btn-secondary fw-bold text-light' onClick={() => { setUpdateModal({ isvisible: false, data: null }) }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
