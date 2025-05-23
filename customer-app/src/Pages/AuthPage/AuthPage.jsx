import styles from '@pages/AuthPage/AuthPage.module.scss';  

import { useDispatch } from 'react-redux';
import { authenticateUser } from '@slices/authSlice';
import axiosInstance from '@services/axiosInstance';
import { userRolesENUM } from '@enums';



export default function AuthPage() {
    const dispatch = useDispatch();

    const handleAuthentication = async () => {
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
            const response = await axiosInstance.post("/v1/auth/register", registerCredentials);

            dispatch(authenticateUser({
                email: registerCredentials.email,
                first_name: registerCredentials.first_name,
                last_name: registerCredentials.last_name,
            }));

            localStorage.setItem("Bearer_token", response.data.access_token);
            localStorage.setItem("Bearer_refresh_token", response.data.refresh_token);
        }
        catch (error) {
            console.error("Login failed: ", error);
        }

        // navigate("/")
    };

    return (
        <div className={styles.authpage_container}>
            <div>
                <h1>Log In to ShopBerry</h1>
            </div>
            <button className={styles.auth_button} onClick={handleAuthentication}>Authenticate</button>
        </div>
    );
}