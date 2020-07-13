import React from 'react';
import LoginForm from "../components/user/LoginForm";
import "../css/login.css"

class LoginView extends React.Component{

    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Log in</h1>
                        <div className="login-content">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;
