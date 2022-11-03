import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'


const Flight = () => {

    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    const [data, setData] = useState({
        Destination: '',
        Airlines: '',
    });


    useEffect(() => {
        axios.get('http://localhost:8000/api/Flights/' + id)
            .then(resp => {
                setData(resp.data.message[0]);
                setIsLoaded(true);
             },
                error => {
                    setError(error);
                    setIsLoaded(true);
                })
    }, [id])



    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        axios.put('http://localhost:8000/api/Flights/' + id, data)
            .then(resp => {
                console.log(resp)
                navigate("/Flights");
            })
            .catch(err => console.log(err))
    }


    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <legend className="text-center me-2">Update flight info:</legend>
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <label className="me-2">Destination:</label>
                            <input
                                type="text"
                                name="Destination"
                                onChange={handleData}
                                value={data.Destination}
                                className="form-control"
                            />
                            <label className="me-2" >Airlines:</label>
                            <input
                                type="text"
                                name="Airlines"
                                onChange={handleData}
                                value={data.Airlines}
                                className="form-control"
                            />
                            <button type="submit" className="upaddbtn btn btn-dark">Update Flight</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Flight;