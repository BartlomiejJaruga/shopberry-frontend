import styles from "./RegisterForm.module.scss";

import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authenticateUser } from "@slices/authSlice";
import axiosInstance from "@services/axiosInstance";
import { userRolesENUM } from "@enums";
import CustomCheckBox from "@components/CustomCheckBox/CustomCheckBox";
import { useState } from "react";

export default function RegisterForm() {
    const dispatch = useDispatch();
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

        console.log(formData);
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

                    <button type="submit" className={styles.sign_up_button}>
                        SIGN UP
                    </button>
                    {formError && (
                        <p className={styles.form_error_message}>{formError}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
