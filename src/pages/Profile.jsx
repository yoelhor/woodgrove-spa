import { useEffect, useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { ProfileData } from '../components/ProfileData.jsx';
import { loginRequest, protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';


const ProfileContent = () => {
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.microsoftGraph.scopes.read,
    });

    const [profileData, setProfileData] = useState(null);

    // Avoid infinite loops that can occur when the effect runs on every render of the component
    useEffect(() => {
        if (!profileData) {

            execute("GET", protectedResources.microsoftGraph.endpoint).then((response) => {
                setProfileData(response);
            });
        }
    }, [execute, profileData])

    if (error) {
        console.log("Profile error 1")
        console.log(error)
        return <div>Error: {error.message}</div>;
    }    

    return <>{profileData ? <ProfileData data={profileData} /> : null}</>;
};

const Profile = () => {
    const authRequest = {
        ...loginRequest,
    };

    return (
        <>
            <div id="profile-div">
                <h1>Profile</h1>
            </div>

            <AuthenticatedTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={authRequest}>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                To view and edit your profile, please sign-in.
            </UnauthenticatedTemplate>
        </>
    );

};

export default Profile;