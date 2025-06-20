import styles from "./LoginForm.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "@slices/authSlice";
import axiosInstance from "@services/axiosInstance";
import { userRolesENUM } from "@enums";
import CustomCheckBox from "@components/CustomCheckBox/CustomCheckBox";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuthentication = async (e) => {
        e.preventDefault();

        const registerCredentials = {
            email: "ArturMorgan@gmail.com",
            password: "1234",
            role: userRolesENUM.CUSTOMER,
            first_name: "Artur",
            last_name: "Morgan",
        };

        const loginCredentials = {
            email: "ArturMorgan@gmail.com",
            password: "1234",
        };

        try {
            const response = await axiosInstance.post(
                "/v1/auth/authenticate",
                registerCredentials
            );

            dispatch(
                authenticateUser({
                    email: registerCredentials.email,
                    first_name: registerCredentials.first_name,
                    last_name: registerCredentials.last_name,
                })
            );

            localStorage.setItem("bearer_token", response.data.access_token);
            localStorage.setItem(
                "bearer_refresh_token",
                response.data.refresh_token
            );
        } catch (error) {
            console.error("Login failed: ", error);
        }

        // navigate("/")
    };

    const handleForgotPassword = () => {
        navigate("/auth?authType=forgotPassword");
    };

    const handleTabChange = () => {
        navigate("/auth?authType=sign_up");
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.auth_type_tabs_container}>
                <div>Sign In</div>
                <div onClick={handleTabChange}>Sign Up</div>
            </div>

            <div className={styles.login_modal_container}>
                <h1>WELCOME BACK! 😊</h1>
                <form
                    onSubmit={handleAuthentication}
                    className={styles.form_container}
                >
                    <input type="email" name="email" placeholder="email" />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <div
                        className={
                            styles.remember_me_and_forgot_password_container
                        }
                    >
                        <CustomCheckBox
                            inputName="remember_me"
                            labelText="Remember me"
                            fontSize="1.1rem"
                        />
                        <button
                            className={styles.forgot_password_button}
                            onClick={handleForgotPassword}
                        >
                            forgot password?
                        </button>
                    </div>
                    <button type="submit" className={styles.sign_in_button}>
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
}
