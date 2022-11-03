import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'


function EditCustomer() {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null);
    const [flight, setFlight] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    const [data, setData] = useState({
        name: '',
        surname: '',
        flight_id: '',
    });
 

    useEffect(() => {
        axios.get('http://localhost:8000/api/Passenger/' + id)
              .then(resp => {
                setData(resp.data.message[0] );
                setIsLoaded(true);
            },
                error => {
                    setError(error);
                    setIsLoaded(true);
                })
    }, [id])

    useEffect(() => {
        setRefresh(true)
        axios.get("http://localhost:8000/api/Flights")
            .then(result => {
                setFlight(result.data);
                setIsLoaded(true);
            },
                error => {
                    setError(error);
                    setIsLoaded(true);

                })
    }, [refresh])


    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        axios.put('http://localhost:8000/api/Passenger/' + id, data , {
            headers: {
              Accept: "application/json",
              
            }
        })
            .then(resp => {
                console.log(resp)
                navigate("/Passenger");
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
                    <legend className="text-center">Update Passenger</legend>
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleData}
                             value={data.name}
                            className="form-control"
                        />
                        <label>Surname:</label>
                        <input
                            type="text"
                            name="surname"
                            onChange={handleData}
                             value={data.surname}
                            className="form-control"
                        />
                        <label>Destination</label>
                        <select name="flight_id" value={data.flight_id} onChange={handleData}>
                            {flight.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.Destination}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="upaddbtn btn btn-dark">Update Passenger</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
}
export default EditCustomer;