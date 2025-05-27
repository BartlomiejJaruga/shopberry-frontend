import styles from '@pages/AuthPage/AuthPage.module.scss';  

import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authenticateUser } from '@slices/authSlice';
import axiosInstance from '@services/axiosInstance';
import { userRolesENUM } from '@enums';
import CustomCheckBox from '@components/CustomCheckBox/CustomCheckBox';


export default function AuthPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleAuthentication = async (e) => {
        e.preventDefault();

        const registerCredentials = {
            email: "ArturMorgan@gmail.com",
            password: "1234",
            role: userRolesENUM.USER,
            first_name: "Artur",
            last_name: "Morgan",
        };

        const loginCredentials = {
            email: "ArturMorgan@gmail.com",
            password: "1234",
        }

        try {
            const response = await axiosInstance.post("/v1/auth/authenticate", registerCredentials);

            dispatch(authenticateUser({
                email: registerCredentials.email,
                first_name: registerCredentials.first_name,
                last_name: registerCredentials.last_name,
            }));

            localStorage.setItem("bearer_token", response.data.access_token);
            localStorage.setItem("bearer_refresh_token", response.data.refresh_token);
        }
        catch (error) {
            console.error("Login failed: ", error);
        }

        // navigate("/")
    };

    const handleForgotPassword = () => {
        navigate('/auth?authType=forgotPassword');
    }

    return (
        <div className={styles.authpage_container}>
            <div>
                <h1>Log In to ShopBerry</h1>
            </div>
            <CustomCheckBox inputName="remember_me" labelText="Remember me"/>
            <div className={styles.auth_container}>
                <div className={styles.auth_type_tabs_container}>
                    <div className={styles.sign_in_tab}>Sign In</div>
                    <div className={styles.sign_up_tab}>Sign Up</div>
                </div>
                <div className={styles.auth_modal_container}>
                    {searchParams.get("authType") === "sign_in" && <h1>WELCOME BACK! 😊</h1>}
                    {searchParams.get("authType") === "sign_up" && <h1>CREATE YOUR ACCOUNT</h1>}
                    <form onSubmit={handleAuthentication} className={styles.form_container}>
                        <input type="email" name="email" placeholder="email" className={styles.form_text_inputs}/>
                        <input type="password" name="password" placeholder="password" className={styles.form_text_inputs}/>
                        <div className={styles.remember_me_and_forgot_password_container}>
                            <div className={styles.remember_me_container}>
                                <input type="checkbox" name="remember_me" id="remember_me" className={styles.form_checkbox}/>
                                <label htmlFor="remember_me">Remember me</label>
                            </div>
                            <button className={styles.forgot_password_button} onClick={handleForgotPassword}>forgot password?</button>
                        </div>
                        <button type="submit" className={styles.auth_button}>SIGN IN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}