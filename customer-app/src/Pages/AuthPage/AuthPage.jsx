import styles from '@pages/AuthPage/AuthPage.module.scss';  

export default function AuthPage() {
    return (
        <div className={styles.authpage_container}>
            <div>
                <h1>Log In to ShopBerry</h1>
            </div>
            <button className={styles.auth_button}>Authenticate</button>
        </div>
    );
}