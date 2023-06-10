import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function EmpDetail() {
    const { empid } = useParams();
    const [empdata, empDataChange] = useState();

    useEffect(() => {
        fetch("http://localhost:3000/employee/" + empid).then((resp) => {
            return resp.json();
        }).then((resp) => {
            empDataChange(resp);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div>{empdata &&
            <div>
                <h1>The Employee name is :{empdata.name} ({empdata.id})</h1>
                <h3>Contact Details</h3>
                <h5>Email is: {empdata.email}</h5>
                <h5>phone is: {empdata.phone}</h5>
            </div>}
            <Link to="/" className='btn btn-danger'>Back to Listing</Link>
        </div>
    )
}

export default EmpDetail