import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as userService from "../../services/users-services";
import "./challenge-screen-create-user.css"
import axios from "axios";


const ChallengeScreenCreateUser = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [challenge, setChallenge] = useState({})
    const [challengeName,setChallengeName] = useState("")
    const [challengerOne, setChallengerOne] = useState({})
    const [challengerOneScore, setChallengerOneScore] = useState(0)
    const [challengerOneGems, setChallengerOneGems] = useState(0)
    const [challengerTwo, setChallengerTwo] = useState({})
    const [challengerTwoScore, setChallengerTwoScore] = useState(0)
    const [challengerTwoGems, setChallengerTwoGems] = useState(0)
    const [numberOfQuestions, setNumberOfQuestions] = useState(0)
    const [game, setGame] = useState({})


    const GAME_URL = "https://opentdb.com/api.php?amount"

    const getGame = async () => {
        const response = await axios.get(`${GAME_URL}=${numberOfQuestions}`)
        setGame(response.data.results)
    }

    const getUser = async () => {
        const response = await userService.findUserByUserName(challengerTwo)
        console.log(response.data)
        setChallengerTwo(response.data)
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await service.profile()
                setProfile(profile)

                if(profile.role !== "PREMIUM"){
                    navigate("/home")
                }

            } catch (e) {
                navigate('/login')
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
    }, [challenge]);

    const handleSendChallenge = () => {
        getGame()
        getUser()

        const temp_challenge = {
            "userOne": profile._id,
            "userTwo": challengerTwo._id,
            "userGemsOne": challengerOneGems,
            "game": game,
            "name": challengeName
        }

        setChallenge(temp_challenge)

        console.log(challenge)
        // service create challenge

    }

    return (
        <div className={"challenge-content-container"}>
            <h1>Send your Challenge</h1>
            <label>
                Your Gem Bet:
                <input type="number" name="challengerOneGems" value={challengerOneGems} onChange={(e) => setChallengerOneGems(e.target.value)} />
            </label>
            <label>
                The number of questions:
                <input type="number" name="numberOfQuestions" value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
            </label>
            <label>
                User To Challenge:
                <input type="text" name="challengerTwo" placeholder={"Enter Username"} onChange={(e) => setChallengerTwo(e.target.value)} />
            </label>
            <label>
                Name The Challenge:
                <input type="text" name="challengeName" placeholder={"Enter Name"} onChange={(e) => setChallengeName(e.target.value)} />
            </label>
            <button onClick={handleSendChallenge}>Send Challenge</button>
        </div>

    )

}
export default ChallengeScreenCreateUser;