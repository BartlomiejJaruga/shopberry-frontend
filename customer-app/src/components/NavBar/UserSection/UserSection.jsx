import { useNavigate } from 'react-router-dom';

import styles from './UserSection.module.scss';

export default function UserSection() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/auth?authType=sign_in");
    };
    
    const handleSignUp = () => {
        navigate("/auth?authType=sign_up");
    };
      


    return (
        <div className={styles.user_section_container}>
            <div className={styles.user_sign_up_sign_in_container}>
                <div className={styles.sign_up_button_container}>
                    <button className={`${styles.sign_buttons} ${styles.sign_up_button}`} onClick={handleSignUp}>Sign Up</button>
                </div>
                <div className={styles.sign_in_button_container}>
                    <button className={`${styles.sign_buttons} ${styles.sign_in_button}`} onClick={handleSignIn}>Sign In</button>
                </div>
            </div>
            
        </div>
    );
}