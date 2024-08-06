import { useMsal } from "@azure/msal-react";

const Token = (props) => {


    const { instance } = useMsal();
    let activeAccount, claims, tableRows = <tr><th>Please sign-out and sign-in again</th><th></th></tr>;

    if (instance) {
        activeAccount = instance.getActiveAccount();

        if (activeAccount)
            claims = activeAccount.idTokenClaims;
    }

    if (claims) {
        tableRows = Object.entries(claims).map((entry, index) => {
            return (<tr key={index}>
                <td><b>{entry[0]}: </b></td>
                <td>{entry[1]}</td>
            </tr>)
        });
    }


    return (
        <>
            <div className="data-area-div">
                <h1>Token</h1>
                <p>
                    See below the claims in your <strong> ID token </strong>. For more information, visit:{' '}
                    <span>
                        <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token">
                            docs.microsoft.com
                        </a>
                    </span>
                </p>
                <div className="data-area-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Claim</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Token;