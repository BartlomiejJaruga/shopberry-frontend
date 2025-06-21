import styles from "@pages/AuthPage/AuthPage.module.scss";

import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authenticateUser } from "@slices/authSlice";
import axiosInstance from "@services/axiosInstance";
import { userRolesENUM } from "@enums";
import CustomCheckBox from "@components/CustomCheckBox/CustomCheckBox";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";
import UserCreatedSuccessfullyModal from "./UserCreatedSuccessfullyModal/UserCreatedSuccessfullyModal";
import LeftArrow from "@icons/arrow-left.svg?react";
import logo from "@images/logo_upscaled.png";

export default function AuthPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleReturnToMainPage = () => {
        navigate("/");
    };

    return (
        <div className={styles.authpage_container}>
            <div
                className={styles.return_to_main_page_container}
                onClick={handleReturnToMainPage}
            >
                <LeftArrow className={styles.left_arrow_icon} />
                <span>RETURN TO MAIN PAGE</span>
            </div>

            <div className={styles.logo_container}>
                <img src={logo} alt="Shopberry logo image" />
            </div>

            {searchParams.get("authType") === "sign_up" && <RegisterForm />}

            {searchParams.get("authType") === "sign_in" && <LoginForm />}

            {searchParams.get("authType") === "user_created" && (
                <UserCreatedSuccessfullyModal />
            )}
        </div>
    );
}
