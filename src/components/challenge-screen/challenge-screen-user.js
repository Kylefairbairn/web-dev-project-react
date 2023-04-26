import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as challengeService from "../../services/challenge-service"
import "./challenge-screen-user.css"
import {updateChallenge} from "./challenge-reducer";
import {useDispatch, useSelector} from "react-redux";



const ChallengeScreenUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const currentChallenge = useSelector((state) => state.challenge)
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
                    navigate("/home")
                }

                const allChallenges = await challengeService.findAllChallenges()
                setChallenges(allChallenges)
                // console.log(profile)


            } catch (e) {
                navigate('/login')
            }
        }
        fetchData()
    }, [])


    console.log(challenges)

    const handleCreateChallenge = () => {
        navigate("/challenge/create/user")
    }

    const handlePlayChallenge = (challenge) => {

        console.log(challenge)

        dispatch(updateChallenge({ challengeId: challenge._id, userOne: challenge.userOne,userTwo: challenge.userTwo,game: challenge.game,userOneScore: challenge.userOneScore,userTwoScore:challenge.userTwoScore }))
        navigate('/battle')
        // mockgame with input..? and use the game array
    }

    console.log()

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
                            <div className={`challenge-icon challenge-icon-${challenge.isCurrentUserOne ? 'left' : 'right'}`}>
                                <img src={`/images/${challenge.userOnesProfilePhoto}`} alt=""/>
                                {profile.username === challenge.userOneUserName && challenge.userOneScore === null ? (
                                    <button onClick={() => handlePlayChallenge(challenge)} className="challenge-card__play-game-button-small">Play Game</button>
                                ) : null}
                                <div className="challenge-card__gems">{challenge.userOneGems} gems</div>
                                <h5>{challenge.userOneUserName}</h5>
                            </div>
                            <div><h3 className="versus">Versus</h3></div>
                            <div className={`challenge-icon challenge-icon-${challenge.isCurrentUserOne ? 'right' : 'left'}`}>
                                <img src={`/images/${challenge.userTwosProfilePhoto}`} alt=""/>
                                {profile.username === challenge.userTwoUserName && challenge.userTwoScore === null ? (
                                    <button onClick={() => handlePlayChallenge(challenge)} className="challenge-card__play-game-button-small">Play Game</button>
                                ) : null}
                                {challenge.userTwoScore !== null ? (<div>{challenge.userTwoScore}</div>) : null}
                                <div className="challenge-card__gems">{challenge.userTwoGems} gems</div>
                                <h5>{challenge.userTwoUserName}</h5>
                            </div>
                        </div>
                    </div>


                ))}


            </div>





            </div>
    )

}

export default ChallengeScreenUser;