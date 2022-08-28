import React, {useContext} from 'react';
import CustomInput from "../components/UI/input/CustomInput";
import CustomButton from "../components/UI/button/CustomButton";
import {AuthContext} from "../context";

const Login = () => {
    const {setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <CustomInput type="text" placeholder="Enter login"/>
                <CustomInput type="password" placeholder="Enter password"/>
                <CustomButton>Login</CustomButton>
            </form>
        </div>
    );
};

export default Login;