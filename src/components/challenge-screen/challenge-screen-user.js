import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as challengeService from "../../services/challenge-service"
import "./challenge-screen-user.css"
import {findAllChallenges} from "../../services/challenge-service";

const ChallengeScreenUser = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [challenges, setChallenges] = useState([])
    const [userOne, setUserOne] = useState({})
    const [userTwo, setUserTwo] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await service.profile()
                setProfile(profile)

                if(profile.role !== "PREMIUM"){
                    navigate("/trivia/home")
                }

                const allChallenges = await challengeService.findAllChallenges()
                setChallenges(allChallenges)
                console.log(profile)


            } catch (e) {
                navigate('/login')
            }
        }
        fetchData()
    }, [])


    const handleCreateChallenge = () => {
        navigate("/challenge/create/user")
    }

    return (
        <div className="challenge-screen">
            <div className= "challenge-screen__new-box">
                <div className="challenge-icon">
                    <img className="challenge-icon" src={`/images/${profile.profilePhoto}`} alt="" />
                </div>
                <h2 className="challenge-welcome-message" >Welcome @{profile.username}</h2>
                <div className={"challenge-current-gems"}>
                    <i className="bi bi-suit-diamond-fill"></i>
                    {profile.gems}
                </div>
            </div>
            <div className="challenge-upgrade__new-box">
                <div className="challenge-upgrade__new-box__icon">
                    <i className="bi bi-suit-diamond-fill"></i>
                </div>
                <div className="challenge-upgrade__new-box__text">
                    <h2>Challenge your friend</h2>
                    <p>What better way to settle tensions with a friend then playing trivia for some gems.</p>
                </div>
                <button onClick={handleCreateChallenge} className="challenge-upgrade__new-box__button">Challenge</button>
            </div>

            <div className="challenge-content-container">
                <h2>Check Out All Challenges</h2>
                {challenges && challenges.map((challenge, index) => (
                    <div key={index} className="challenge-card">
                        <div className="challenge-card-container">
                            <div className="challenge-icon">
                                <img src={`/images/${challenge.userOnesProfilePhoto}`} alt=""/>
                                {profile.username === challenge.userOneUserName ? (<button className="challenge-card__play-game-button-small">Play Game</button>)
                                : null }
                                <br />
                                <h3 className={""} >{challenge.userOneUserName}</h3>
                                <div className="challenge-card__gems">{challenge.userOneGems} gems</div>
                            </div>
                            <div><h3 className={"versus"}>Versus</h3></div>
                            <div className="challenge-icon">
                                <img src={`/images/${challenge.userTwosProfilePhoto}`} alt=""/>
                                <br />
                                {profile.username === challenge.userTwoUserName ? (
                                    <button className="challenge-card__play-game-button-small">Play Game</button>
                                ) : null}
                                <h3 className={""}>{challenge.userTwoUserName}</h3>
                                <div className="challenge-card__gems">{challenge.userTwoGems} gems</div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>





            </div>
    )

}

export default ChallengeScreenUser;