import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, } from 'react-router-dom';

function EmpEdit() {
    const { empid } = useParams();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isactive, setIsActive] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/employee/" + empid).then((resp) => {
            return resp.json();
        }).then((res) => {
            console.log(res)
            setId(res.id)
            setName(res.name)
            setEmail(res.email)
            setPhone(res.phone)
            setIsActive(res.isactive)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const empdata = { id, name, email, phone, isactive };

        fetch("http://localhost:3000/employee/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert("Emplloyee Edit successfully");
            navigate("/");
        }).then((err) => {
            console.log(err)
        })
    }

    return (
        <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
                <form className='container' onSubmit={handleSubmit}>

                    <div className='card' style={{ textAlign: "left" }}>
                        <div className='card-title'>
                            <h2>Employee Edit</h2>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Id</label>
                                        <input disabled="disabled" value={id} className="form-control"></input>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Name</label>
                                        <input required value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Email</label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label>Phone</label>
                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-check'>
                                        <input type="checkbox" checked={isactive} onChange={e => setIsActive(e.target.checked)} className="form-check-input"></input>
                                        <label className='form-check-label'>Is Active</label>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <button className='btn btn-success'>Save</button>
                                        <Link to='/' className="btn btn-danger">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div >
        </div >
    )
}

export default EmpEdit