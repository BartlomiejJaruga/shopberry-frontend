import styles from "./LoginForm.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "@slices/authSlice";
import axiosInstance from "@services/axiosInstance";
import { tokenNamesENUM, userRolesENUM } from "@enums";
import CustomCheckBox from "@components/CustomCheckBox/CustomCheckBox";
import { useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggingInProcess, setIsLoggingInProcess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [formErrors, setFormErrors] = useState({
        emailError: null,
        passwordError: null,
        responseError: null,
    });

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const isEmailInputDataValid = () => {
        let isValid = true;

        if (formData.email === "") {
            setFormErrors((prev) => ({
                ...prev,
                emailError: "This field is required",
            }));
            isValid = false;
        } else {
            setFormErrors((prev) => ({
                ...prev,
                emailError: null,
            }));
        }

        return isValid;
    };

    const isPasswordInputDataValid = () => {
        let isValid = true;

        if (formData.password === "") {
            setFormErrors((prev) => ({
                ...prev,
                passwordError: "This field is required",
            }));
            isValid = false;
        } else if (formData.password.length < 8) {
            setFormErrors((prev) => ({
                ...prev,
                passwordError: "Password is too short",
            }));
            isValid = false;
        } else if (formData.password.length > 20) {
            setFormErrors((prev) => ({
                ...prev,
                passwordError: "Password is too long",
            }));
            isValid = false;
        } else {
            setFormErrors((prev) => ({
                ...prev,
                passwordError: null,
            }));
        }

        return isValid;
    };

    const isFormDataValid = () => {
        let isValid = true;

        if (!isEmailInputDataValid()) isValid = false;
        if (!isPasswordInputDataValid()) isValid = false;

        return isValid;
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!isFormDataValid()) return;

        setIsLoggingInProcess(true);
        const { rememberMe, ...requestBody } = formData;

        try {
            const response = await axiosInstance.post(
                "/v1/auth/authenticate",
                requestBody
            );

            dispatch(
                authenticateUser({
                    email: requestBody.email,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    uuid: response.data.user_id,
                })
            );

            localStorage.setItem(
                tokenNamesENUM.ACCESS_TOKEN_NAME,
                response.data.access_token
            );
            localStorage.setItem(
                tokenNamesENUM.REFRESH_TOKEN_NAME,
                response.data.refresh_token
            );

            setIsLoggingInProcess(false);

            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setFormErrors((prev) => ({
                    ...prev,
                    responseError: "Incorrect e-mail or password",
                }));
            } else if (error.response && error.response.status === 500) {
                setFormErrors((prev) => ({
                    ...prev,
                    responseError: "Server Error",
                }));
            } else {
                console.error("Login failed: ", error);
            }

            setIsLoggingInProcess(false);
        }
    };

    const handleForgotPassword = () => {
        // navigate("/auth?authType=forgotPassword");
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
                <form onSubmit={handleSignIn} className={styles.form_container}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        onBlur={isEmailInputDataValid}
                    />
                    {formErrors.emailError && (
                        <p className={styles.input_error_message}>
                            {formErrors.emailError}
                        </p>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        onBlur={isPasswordInputDataValid}
                    />
                    {formErrors.passwordError && (
                        <p className={styles.input_error_message}>
                            {formErrors.passwordError}
                        </p>
                    )}

                    <div
                        className={
                            styles.remember_me_and_forgot_password_container
                        }
                    >
                        <CustomCheckBox
                            inputName="rememberMe"
                            labelText="Remember me"
                            fontSize="1.1rem"
                            value={formData.rememberMe}
                            onChangeAction={handleFormChange}
                        />
                        <button
                            type="button"
                            className={styles.forgot_password_button}
                            onClick={handleForgotPassword}
                        >
                            forgot password?
                        </button>
                    </div>

                    {isLoggingInProcess && (
                        <LoadingIndicator
                            message="Checking credentials..."
                            fontSize="1rem"
                            className={styles.loading_indicator}
                        />
                    )}

                    {!isLoggingInProcess && (
                        <>
                            <button
                                type="submit"
                                className={styles.sign_in_button}
                            >
                                SIGN IN
                            </button>
                            {formErrors.responseError && (
                                <p className={styles.form_error_message}>
                                    {formErrors.responseError}
                                </p>
                            )}
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
