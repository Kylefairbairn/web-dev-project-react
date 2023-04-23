import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";
import "./challenge-screen-nav.css"
import {Gi3DHammer, GiCrossedAxes} from "react-icons/gi"

const ChallengeScreenNavigation = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await service.profile()
                setProfile(profile)
            } catch (e) {
                navigate('/login')
            }
        }
        fetchData()
    }, [])

    const handleUser = () => {
        navigate("/challenge/user")
    }

    const handleMember = () => {
        navigate("challenge/member")
    }


        return (

        <div className="challenge-nav-screen">
            <div className="challenge-content-container">
                <h1>Please Choose Your Battle Ground</h1>
                <div>
                   <GiCrossedAxes className="challenge-content-container-GiCrossedAxes" /> <button  onClick={handleUser} >User</button>
                    <span style={{width: '10px', display: 'inline-block'}}></span>
                   <Gi3DHammer className="challenge-content-container-Gi3DHammer" /> <button onClick={handleMember} >Member</button>
                </div>
            </div>
        </div>

    )
}

export default ChallengeScreenNavigation;