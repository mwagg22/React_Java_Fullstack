import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import Errors from './Errors';
import './Styles/Form.css';
import { store } from 'react-notifications-component';

export default function Create() {

    const [activityName, setActivityName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [userId, setUserId] = useState(-1);
    const [maxParticipant, setMaxParticipant] = useState(0);
    const [minParticipant, setMinParticipant] = useState(0);
    const [createBy, setCreateBy] = useState('');
    const [userStatus, setUserStatus] = useContext(AuthContext);

    const [errors, setErrors] = useState([]);

    const history = useNavigate();

    const activityNameOnChangeHandler = (event) => {
        setActivityName(event.target.value);
    };
    const descriptionOnChangeHandler = (event) => {
        setDescription(event.target.value);
    };

    const locationOnChangeHandler = (event) => {
        setLocation(event.target.value);
    };
    const dateOnChangeHandler = (event) => {
        setDate(event.target.value);
    };
    const timeOnChangeHandler = (event) => {
        setTime(event.target.value);
    };
    const userIdHandler = (event) => {
        setUserId(event.target.value);
    };

    const maxParticipantOnChangeHandler = (event) => {
        setMaxParticipant(parseInt(event.target.value));
    };
    const minParticipantOnChangeHandler = (event) => {
        setMinParticipant(parseInt(event.target.value));
    };
    const createByOnChangeHandler = (event) => {
        setCreateBy(event.target.value);
    };

    const handleAddSubmit = (event) => {
        event.preventDefault();
        //setUserId(userStatus.user.userId);
        var id = userStatus.user.userId;
        console.log(id);
        const newActivity = {
            activityName,
            description,
            location,
            date,
            time,
            "max": maxParticipant,
            "min": minParticipant,
            createBy,
            "userId": id
        };
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            },

            body: JSON.stringify(newActivity)
        };

        fetch('http://groopbackend.us-east-1.elasticbeanstalk.com/api/activity', init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                }
                return Promise.reject('Something unexpected went wrong :)');
            })
            .then(data => {
                // we either created the recorded...
                if (data.activityId) {
                    // redirect the user back to the home page
                    store.addNotification({
                        title: activityName +" created!",
                        message: "Returning to Dashboard",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 2500,
                            onScreen: true
                        }
                    });
                    history('/');
                } else {
                    // we have error messages
                    data = Array.from(data);
                    setErrors(data);
                    history('/');
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="container">

            <Errors errors={errors} />
            <h2 className="my-4">Create Activity</h2>
            <form className="" onSubmit={handleAddSubmit}>

                <div className="form-group">
                    <label htmlFor="activityName">Activity Name</label>
                    <input type="text" className="form-control" id="activityName" name="activityName"
                        value={activityName} onChange={activityNameOnChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="description" className="form-control" id="description" name="description"
                        value={description} onChange={descriptionOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location of Activity</label>
                    <input type="text"  className="form-control" id="location" name="location"
                        value={location} onChange={locationOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" id="date" name="date"
                        value={date} onChange={dateOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="time" className="form-control" id="time" name="time"
                        value={time} onChange={timeOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="maxParticipant">Max # of Participants</label>
                    <input type="number" className="form-control" pattern="[0-9]*" id="maxParticipant"
                        name="maxParticipant" min="2" max="50"
                        value={maxParticipant} onChange={maxParticipantOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="minParticipant">Min # of Participants</label>
                    <input type="number" className="form-control" pattern="[0-9]*" id="minParticipant"
                        name="minParticipant" min="2" max="50"
                        value={minParticipant} onChange={minParticipantOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="createBy">Created By</label>
                    <input type="text"  className="form-control" id="createBy" name="createBy"
                        value={createBy} onChange={createByOnChangeHandler} />
                </div>

                <div className="mt-5">
                    <button className="btn btn-info" type="submit">
                        <i className="bi bi-save"></i> Create Activity</button>

                    <Link to="/activity" className="btn btn-warning ml-2">
                        <i className="bi bi-x"></i> Cancel
                    </Link>

                </div>
            </form>
        </div>
    )
};