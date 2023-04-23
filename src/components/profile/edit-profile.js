import React, {useEffect, useState} from 'react';
import './edit-profile.css';
import * as userService from "../../services/users-services"
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [role, setRole] = useState('PERSONAL');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await service.profile()
                setProfile(profile)
            } catch (e) {
                //navigate('/login')
            }
        }
        fetchData()

    }, [])

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = () => {

        const updatedUser = {
            username: username !== "" ? username : profile.username,
            password: password !== "" ? password : profile.password,
            firstname: firstname !== "" ? firstname : profile.firstname,
            lastname: lastname !== "" ? lastname : profile.lastname,
            email: email !== "" ? email : profile.email,
            profilePhoto: profilePhoto !== "" ? profilePhoto : profile.profilePhoto,
            dateOfBirth: dateOfBirth !== "" ? dateOfBirth : profile.dateOfBirth,
            role: role !== "" ? role : profile.role
        }
        //console.log(profile._id)
        userService.updateUser(profile._id,updatedUser)
        navigate("/trivia/home")
    }

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <div className="edit-profile-form">
                <div className="edit-profile-column">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="edit-profile-input"
                    />
                </div>
                <div className="edit-profile-column">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="edit-profile-input"
                    />
                </div>
                <div className="edit-profile-column">
                    <label>Firstname:</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                        className="edit-profile-input"
                    />
                </div>
                <div className="edit-profile-column">
                    <label>Lastname:</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        className="edit-profile-input"
                    />
                </div>
                <div className="edit-profile-column">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="edit-profile-input"
                    />
                </div>
                <div className="edit-profile-column">
                    <label>Profile photo:</label>
                    <input
                        type="text"
                        value={profilePhoto}
                        onChange={(event) => setProfilePhoto(event.target.value)}
                        className="edit-profile-input"
                    />
                </div>
                <div className="edit-profile-column">
                    <label>Date of birth:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(event) => setDateOfBirth(event.target.value)}
                        className="edit-profile-input"
                    />
                </div>
                <div className="edit-profile-column">
                    <label>Role:</label>
                    <select
                        value={role}
                        onChange={handleRoleChange}
                        className="edit-profile-select"
                    >
                        <option value="PERSONAL">Personal</option>
                        <option value="PREMIUM">Premium</option>
                        <option value="GROUPMEMBER">Group Member</option>
                    </select>
                </div>
            </div>
            <div className="edit-profile-button-container">
                <button onClick={handleSubmit} className="edit-profile-submit-button">
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
