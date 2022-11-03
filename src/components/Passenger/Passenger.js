import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate  } from "react-router-dom";


const Passenger = () => {
	const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [flight, setFlight] = useState([]);


    useEffect(() => {
    fetch("http://localhost:8000/api/Passenger")
      .then(res => res.json())
      .then(result => {
        setData(result);
        setIsLoaded(true);
      },
        error => {
          setError(error);
          setIsLoaded(true);
        })
  }, [refresh])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/Flights")
      .then(res => res.json())
      .then(result => {
        setFlight(result);
        setIsLoaded(true);
      },
        error => {
          setError(error);
          setIsLoaded(true);
        })
  }, [refresh])


  const passengerDelete = (id) => {

    fetch("http://localhost:8000/api/Passenger/" + id, { method: 'DELETE' })
      .then((response) => {
        // console.log(response);
        setRefresh(!refresh)

        if (response.status === 200) {
          setRefresh(!refresh)
          const remaining = data.filter(p => id !== p.id)
          setData(remaining)
        }
      });
  }



  const handleSubmit = (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)
    axios.post('http://127.0.0.1:8000/api/Passenger', formData)
      .then(resp => {
        setRefresh(!refresh)
        console.log(resp)
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
        <table className="table mt-5 ">
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>surname</th>
              <th>Destination</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {data.map((passenger) => (
              <tr key={passenger.id}>
                <td>{passenger.id}</td>
                <td>{passenger.name}</td>
                <td>{passenger.surname}</td>
                <td>{passenger.flight_id}</td>
                <td>
                  <button onClick={() => passengerDelete(passenger.id)}
                    className="btn btn-dark">
                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                    Delete
                  </button>
                  <button onClick={() => navigate(`/EditPassenger/${passenger.id}`)}
                    className="btn btn-success mx-2">
                    <FontAwesomeIcon icon="fa-solid fa-user-pen" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name:</label>
                <input type="text" name="name" className="form-control" />
              </div>

              <div className="mb-3">
                <label>Surname:</label>
                <input type="text" name="surname" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="me-2">Destination:</label>
                <select name="id" value={data.flight_id}
                  onSubmit={handleSubmit}>
                  {flight.map((flight) => (
                    <option key={flight.id} value={flight.id}>
                      {flight.Destination}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button className="btn btn-primary">Enter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
   );
}
}


export default Passenger;
