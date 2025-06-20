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

export default function AuthPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={styles.authpage_container}>
            <div>
                <h1>Log In to ShopBerry</h1>
            </div>

            {searchParams.get("authType") === "sign_up" && <RegisterForm />}

            {searchParams.get("authType") === "sign_in" && <LoginForm />}

            {searchParams.get("authType") === "user_created" && (
                <UserCreatedSuccessfullyModal />
            )}
        </div>
    );
}
