import { Link } from 'react-router-dom';

import styles from './UserSection.module.scss';

export default function UserSection() {
    return (
        <div className={styles.user_section_container}>
            <div className={styles.user_sign_up_sign_in_container}>
                <div className={styles.sign_up_button_container}>
                    <Link to="/auth" className={`${styles.sign_buttons} ${styles.sign_up_button}`}>Sign Up</Link>
                </div>
                <div className={styles.sign_in_button_container}>
                    <Link to="/auth" className={`${styles.sign_buttons} ${styles.sign_in_button}`}>Sign In</Link>
                </div>
            </div>
            
        </div>
    );
}