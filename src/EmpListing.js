import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function EmpListing() {
    const [empdata, empDataChange] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/employee").then((resp) => {
            return resp.json();
        }).then((resp) => {
            empDataChange(resp);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const EditDetail = (id) => {
        navigate("/employee/edit/" + id)
    }

    const RemoveDetail = (id) => {
        if (window.confirm("Do you want to remove?")) {
            fetch("http://localhost:3000/employee/" + id, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(empdata)
            }).then((res) => {
                alert("Removed successfully");
                navigate("/");
            }).then((err) => {
                console.log(err)
            })
        }
    }

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id)
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='card-title'>
                    <h2>Emp Listing</h2>
                </div>
                <div className='card-body'>
                    <div className='add-employee'>
                        <Link to='employee/create' className="btn btn-success">Add New (+)</Link></div>
                    <table className='table table-bordered'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map(item =>
                                (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><a className='btn btn-success' onClick={() => { EditDetail(item.id) }}>Edit</a>
                                            <a className='btn btn-danger' onClick={() => { RemoveDetail(item.id) }}>Remove</a>
                                            <a className='btn btn-primary' onClick={() => { LoadDetail(item.id) }}>Details</a></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmpListing