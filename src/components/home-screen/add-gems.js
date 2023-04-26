import {useEffect, useState} from "react";
import * as LoggedInService from "../../services/auth-service";
import {useNavigate} from "react-router-dom";
import * as usersServices from "../../services/users-services";

const AddGems = () => {
    const navigate = useNavigate()
   const [gem, setGems] = useState(0)
    const [profile, setProfile] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await LoggedInService.profile();
                setProfile(profile);

            } catch (e) {
                navigate('/login');
            }
        }
        fetchData();
    }, [navigate]);

    useEffect(() => {

    }, [gem])


    const handleAddGems = () => {


        const addGems = Number(profile.gems) + Number(gem)

        console.log(addGems)

        setGems(addGems)

        const updatedGems = {
            gems: addGems
        }


        usersServices.updateUser(profile._id, updatedGems)

        navigate("/home")

    }

    return (
        <div className={"challenge-content-container"}>
            <h1>Send your Challenge</h1>
            <label>
                Enter gems:
                <input type="number" name="challengerOneGems"  onChange={(e) => setGems(e.target.value)} />
            </label>
            <button onClick={handleAddGems}>Save</button>
        </div>
    )


}

export default AddGems;