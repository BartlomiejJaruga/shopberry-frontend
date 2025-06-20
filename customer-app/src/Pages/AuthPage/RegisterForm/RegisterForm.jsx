import styles from "./RegisterForm.module.scss";

import { useNavigate } from "react-router-dom";
import axiosInstance from "@services/axiosInstance";
import { userRolesENUM } from "@enums";
import { useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        repeatEmail: "",
        password: "",
        repeatPassword: "",
    });
    const [formError, setFormError] = useState(null);
    const [isRegisteringInProgress, setIsRegisteringInProgress] =
        useState(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const emailMatchStatus = () => {
        const { email, repeatEmail } = formData;

        if (email === "" || repeatEmail === "") return "";

        if (email !== repeatEmail)
            return styles["credential_restriction--error"];

        return styles["credential_restriction--good"];
    };

    const passwordMatchStatus = () => {
        const { password, repeatPassword } = formData;

        if (password === "" || repeatPassword === "") return "";

        if (password !== repeatPassword)
            return styles["credential_restriction--error"];

        return styles["credential_restriction--good"];
    };

    const getPasswordValidationStatus = () => {
        const { password } = formData;

        return {
            length: password.length >= 8 && password.length <= 20,
            hasUpper: /[A-Z]/.test(password),
            hasLower: /[a-z]/.test(password),
            hasDigit: /\d/.test(password),
            hasSpecial: /[!@#$%^&*(),.:{}\]\[\\/]/.test(password),
        };
    };

    const passwordRestrictionsStatus = getPasswordValidationStatus();
    const isPasswordValid = Object.values(passwordRestrictionsStatus).every(
        Boolean
    );

    const isFormDataValid = () => {
        setFormError(null);

        if (!isPasswordValid) {
            setFormError("Password is invalid!");
            return false;
        }

        if (formData.email !== formData.repeatEmail) {
            setFormError("E-mails are different!");
            return false;
        }

        if (formData.password !== formData.repeatPassword) {
            setFormError("Passwords are different!");
            return false;
        }

        return true;
    };

    const handleSignUpButtonClick = async (e) => {
        e.preventDefault();
        if (!isFormDataValid()) return;

        setIsRegisteringInProgress(true);

        const requestBody = {
            email: formData.email,
            password: formData.password,
            role: userRolesENUM.CUSTOMER,
            first_name: formData.firstName,
            last_name: formData.lastName,
        };

        try {
            const response = await axiosInstance.post(
                "/v1/auth/register",
                requestBody
            );

            setIsRegisteringInProgress(false);
            navigate("/auth?authType=user_created");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setFormError("User already exists");
            }
            //TODO add server error
            else {
                console.error("Register user failed: ", error);
            }

            setIsRegisteringInProgress(false);
        }
    };

    const handleTabChange = () => {
        navigate("/auth?authType=sign_in");
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.auth_type_tabs_container}>
                <div onClick={handleTabChange}>Sign In</div>
                <div>Sign Up</div>
            </div>
            <div className={styles.register_modal_container}>
                <h1>CREATE YOUR ACCOUNT</h1>
                <form
                    className={styles.form_container}
                    onSubmit={handleSignUpButtonClick}
                    autoComplete="off"
                >
                    <h3>How would you like to be called?</h3>

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        required
                    />

                    <h3>Your Credentials</h3>

                    <input
                        type="email"
                        name="email"
                        placeholder="e-mail"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                    />

                    <input
                        type="email"
                        name="repeatEmail"
                        placeholder="repeat e-mail"
                        value={formData.repeatEmail}
                        onChange={handleFormChange}
                        required
                    />
                    <div className={styles.credentials_restrictions_container}>
                        <p
                            className={`${
                                styles.credential_restriction
                            } ${emailMatchStatus()}`}
                        >
                            E-mails must match
                        </p>
                    </div>

                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        required
                    />
                    <div className={styles.credentials_restrictions_container}>
                        <p
                            className={`${styles.credential_restriction} ${
                                formData.password === ""
                                    ? ""
                                    : isPasswordValid
                                    ? styles["credential_restriction--good"]
                                    : styles["credential_restriction--error"]
                            }`}
                        >
                            Password must contain:
                        </p>
                        <p
                            className={`${styles.credential_restriction} ${
                                formData.password === ""
                                    ? ""
                                    : passwordRestrictionsStatus.length
                                    ? styles["credential_restriction--good"]
                                    : styles["credential_restriction--error"]
                            }`}
                        >
                            - between 8 to 20 characters
                        </p>
                        <p
                            className={`${styles.credential_restriction} ${
                                formData.password === ""
                                    ? ""
                                    : passwordRestrictionsStatus.hasUpper
                                    ? styles["credential_restriction--good"]
                                    : styles["credential_restriction--error"]
                            }`}
                        >
                            - 1 uppercase letter
                        </p>
                        <p
                            className={`${styles.credential_restriction} ${
                                formData.password === ""
                                    ? ""
                                    : passwordRestrictionsStatus.hasLower
                                    ? styles["credential_restriction--good"]
                                    : styles["credential_restriction--error"]
                            }`}
                        >
                            - 1 lowercase letter
                        </p>
                        <p
                            className={`${styles.credential_restriction} ${
                                formData.password === ""
                                    ? ""
                                    : passwordRestrictionsStatus.hasDigit
                                    ? styles["credential_restriction--good"]
                                    : styles["credential_restriction--error"]
                            }`}
                        >
                            - 1 digit
                        </p>
                        <p
                            className={`${styles.credential_restriction} ${
                                formData.password === ""
                                    ? ""
                                    : passwordRestrictionsStatus.hasSpecial
                                    ? styles["credential_restriction--good"]
                                    : styles["credential_restriction--error"]
                            }`}
                        >
                            - 1 special character
                        </p>
                    </div>

                    <input
                        type="password"
                        name="repeatPassword"
                        placeholder="repeat password"
                        value={formData.repeatPassword}
                        onChange={handleFormChange}
                        required
                    />
                    <div className={styles.credentials_restrictions_container}>
                        <p
                            className={`${
                                styles.credential_restriction
                            } ${passwordMatchStatus()}`}
                        >
                            Passwords must match
                        </p>
                    </div>

                    {isRegisteringInProgress && (
                        <LoadingIndicator
                            message="Registering new user..."
                            fontSize="1rem"
                            className={styles.loading_indicator}
                        />
                    )}

                    {!isRegisteringInProgress && (
                        <>
                            <button
                                type="submit"
                                className={styles.sign_up_button}
                            >
                                SIGN UP
                            </button>
                            {formError && (
                                <p className={styles.form_error_message}>
                                    {formError}
                                </p>
                            )}
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
