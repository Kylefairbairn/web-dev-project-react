import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service"
import * as userService from "../../services/users-services";
import alert from "bootstrap/js/src/alert";
import "./login.css"

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()

    const login = () =>
        service.login(loginUser)
            .then((loginUser) => navigate('/home'))
            .catch(e => alert(e));

    return (
    <div>
            <h1>Login</h1>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                    username: e.target.value})}/>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                    password: e.target.value})}/>
            <br/>
            <button className={"button btn btn-primary"} onClick={login}>
                Login</button>
        </div>

    );
};

