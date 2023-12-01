const UserProfile = ({
                         avatarUrl,
                         firstName,
                         lastName,
                         company,
                         email,
                         addresses,
                         phoneNumber,
                     }) => (
    <article className="user-profile">
        <h2>
            {firstName} {lastName}
        </h2>
        <div className="profile-header">
            <img src={avatarUrl} alt={"Avatar of " + firstName} className="avatar" />
            <div>
                <h3 className="contact-info--title">Contact info</h3>
                <div className="info-grid">
                    <b>Company:</b>
                    <span>{company}</span>
                    <b>Email:</b>
                    <span>{email}</span>
                </div>
            </div>
        </div>
        <h3>Addresses</h3>
        <ul className="addresses-list">
            {!Array.isArray(addresses) ||
                (!addresses.length && <li>No addresses to display</li>)}
            {Array.isArray(addresses) &&
                addresses.map(({ line1, line2, zipCode, city, state }, index) => (
                    <li key={index} className={"address-item"}>
                        <h4>Address {index + 1}</h4>
                        <ul className={"address-info info-grid"}>
                            <b>Line 1:</b> <span>{line1}</span>
                            <b>Line 2:</b> <span>{line2}</span>
                            <b>Zip code:</b> <span>{zipCode}</span>
                            <b>City:</b> <span>{city}</span>
                            <b>State:</b> <span>{state}</span>
                        </ul>
                    </li>
                ))}
        </ul>
    </article>
);

export default UserProfile;
