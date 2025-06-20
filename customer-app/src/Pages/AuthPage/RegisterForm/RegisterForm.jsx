import styles from "./RegisterForm.module.scss";

import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authenticateUser } from "@slices/authSlice";
import axiosInstance from "@services/axiosInstance";
import { userRolesENUM } from "@enums";
import CustomCheckBox from "@components/CustomCheckBox/CustomCheckBox";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUpButtonClick = async (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.auth_type_tabs_container}>
                <div>Sign In</div>
                <div>Sign Up</div>
            </div>
            <div className={styles.register_modal_container}>
                <h1>CREATE YOUR ACCOUNT</h1>
                <form
                    className={styles.form_container}
                    onSubmit={handleSignUpButtonClick}
                >
                    <input type="email" name="email" placeholder="email" />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <button type="submit" className={styles.sign_up_button}>
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
}
