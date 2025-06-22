import styles from "./YourAccountSection.module.scss";

import axiosInstance from "@services/axiosInstance";
import { useEffect, useState, useId } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import { useSelector } from "react-redux";

export default function YourAccountSection() {
    const uniqueId = useId();
    const [isPageGettingLoaded, setIsPageGettingLoaded] = useState(true);
    const authUserData = useSelector((state) => state.auth.userData);
    const [userData, setUserData] = useState({
        firstName: authUserData.firstName,
        lastName: authUserData.lastName,
        createdAt: "",
        mainAddress: null,
    });

    const handleUserChangeNameFormSubmit = (e) => {
        e.preventDefault();

        console.log(userData);
    };

    const getUserDataFromDatabase = async () => {
        setIsPageGettingLoaded(true);

        try {
            const response = await axiosInstance.get(
                `/v1/customers/${authUserData.uuid}`
            );

            const mappedUserData = response.data.map((data) => ({
                firstName: data.first_name,
                lastName: data.last_name,
                createdAt: data.created_at,
                mainAddress: data.main_address,
            }));

            setUserData(mappedUserData);
        } catch (error) {
            console.error(error);
        }

        setIsPageGettingLoaded(false);
    };

    useEffect(() => {
        getUserDataFromDatabase();
    }, []);

    return (
        <>
            {isPageGettingLoaded && (
                <>
                    <LoadingIndicator
                        message="Page is being loaded..."
                        fontSize="2rem"
                    />
                </>
            )}

            {!isPageGettingLoaded && (
                <div className={styles.main_container}>
                    <div className={styles.your_account_data_container}>
                        <h1>Your Account Data</h1>
                        <div className={styles.general_information_container}>
                            <form
                                className={styles.user_change_name_form}
                                onSubmit={handleUserChangeNameFormSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor={`${uniqueId}-change-name-first-name`}
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id={`${uniqueId}-change-name-first-name`}
                                        placeholder="Your first name"
                                        value={userData.firstName}
                                        onChange={(e) => {
                                            setUserData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor={`${uniqueId}-change-name-last-name`}
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id={`${uniqueId}-change-name-last-name`}
                                        placeholder="Your last name"
                                        value={userData.lastName}
                                        onChange={(e) => {
                                            setUserData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <button type="submit">
                                    Submit name change
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className={styles.addresses_information_container}>
                        <h1>Your addresses</h1>
                    </div>
                </div>
            )}
        </>
    );
}
