import styles from "./UserCreatedSuccessfullyModal.module.scss";

import { useNavigate } from "react-router-dom";
import CheckMark from "@icons/check-mark.svg?react";

export default function UserCreatedSuccessfullyModal() {
    const navigate = useNavigate();

    const handleProceedToSignIn = () => {
        navigate("/auth?authType=sign_in");
    };

    return (
        <div className={styles.main_container}>
            <CheckMark className={styles.checkmark_icon} />
            <p>User has been created successfully!</p>
            <button onClick={handleProceedToSignIn}>Proceed to Sign In</button>
        </div>
    );
}
