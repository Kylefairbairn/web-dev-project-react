import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as userService from "../../services/users-services";
import "./signup.css"
import {findUserByUserName} from "../../services/users-services";
import {wait} from "@testing-library/user-event/dist/utils";

const Signup = () => {
    const [newUser, setNewUser] = useState("");
    const [newUsername, SetUsername] = useState("")
    const [newPassword, SetPassword] = useState("")
    const [newEmail, SetEmail] = useState("")
    const [existingUsers, setExistingUsers] = useState([]);
    const navigate = useNavigate();

    // add type at the least and maybe everything

    const findAllUsers = () =>
        userService.findAllUsers()
            .then(users => {
                setExistingUsers(users)
            })

    const register = async () => {
        const user = {
            username: newUsername,
            password: newPassword,
            email: newEmail,
            role: "PERSONAL"
        };

        if (newUsername !== "") {
            const checkUser = await userService.findUserByUserName(newUsername);

            if (checkUser.data === null) {
                await userService.createUser(user);
                setTimeout(async () => {

                    navigate("/login");
                }, 1000); // wait for 1 second before searching for the user
            } else {
                console.log("already exists");
            }
        }
    };


    // const register = async () => {
    //
    //     const user = {
    //         username: newUsername,
    //         password: newPassword,
    //         email: newEmail,
    //         role: "PERSONAL"
    //     }
    //
    //     if (newUsername !== "") {
    //
    //         const checkUser = await userService.findUserByUserName(newUsername)
    //
    //         // await userService.createUser(user)
    //         // navigate("/login")
    //
    //         if (checkUser.data === null) {
    //             await userService.createUser(user)
    //             await wait(5)
    //             const findUser = await userService.findUserByUserName(user.newUsername)
    //             const uid = findUser._id
    //             console.log(uid)
    //
    //             //navigate("/login")
    //         } else {
    //             // maybe a boolean here
    //             console.log("already exists")
    //         }
    //
    //     }
    // }

    return (
        <div>
            <h1>Register</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       SetUsername(e.target.value)}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       SetPassword(e.target.value)}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       SetEmail(e.target.value)}
                   placeholder="email" type="email"/>
            <button onClick={register} className="btn btn-primary mb-5">Register
            </button>
        </div>
    );
}
export default Signup;