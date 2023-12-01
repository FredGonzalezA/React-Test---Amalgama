import { useMemo } from "react";

const index = (array) =>
    array.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {});

const ContactsScreen = ({ contacts = [], cities = [], states = [] }) => {
    // These should be the real props, this could be created when the data is fetched for example
    const citiesById = useMemo(() => index(cities), [cities]);
    const statesById = useMemo(() => index(states), [states]);

    const contactsToDisplay = useMemo(
        () =>
            contacts
                .filter(Boolean)
                .map(
                    ({
                         id,
                         avatar_url: avatarUrl,
                         first_name,
                         last_name,
                         company,
                         email,
                         addresses,
                         phone,
                     }) => {
                        return {
                            id,
                            avatarUrl,
                            fullName: [first_name, last_name].filter(Boolean).join(" "),
                            phoneNumber:
                                phone?.area_code && phone.number
                                    ? `(${phone.area_code}) ${phone.number}`
                                    : "",
                            company,
                            email,
                            addresses: addresses
                                ?.filter(Boolean)
                                .map(
                                    ({
                                         line_1: line1,
                                         line_2: line2,
                                         zip_code: zipCode,
                                         city_id,
                                         state_id,
                                     }) => ({
                                        line1,
                                        line2,
                                        zipCode,
                                        city: citiesById[city_id]?.name,
                                        state: statesById[state_id]?.name,
                                    }),
                                ),
                        };
                    },
                ),
        [contacts, citiesById, statesById],
    );

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/contacts">My Contacts</a>
                    </li>
                </ul>
            </nav>
            <article>
                <h1>Contacts 👥</h1>
                {!contactsToDisplay.length && <p>No contacts to display</p>}
                {contactsToDisplay.map(
                    ({
                         id,
                         avatarUrl,
                         fullName,
                         company,
                         email,
                         phoneNumber,
                         addresses,
                     }) => (
                        <article key={id}>
                            <div>
                                <img src={avatarUrl} alt={"Avatar of " + fullName} />
                                <h2>{fullName}</h2>
                            </div>
                            <ul>
                                <li>
                                    <b>Company:</b> {company}
                                </li>
                                <li>
                                    <b>Email:</b> {email}
                                </li>
                                <li>
                                    <b>Phone:</b> {phoneNumber}
                                </li>
                                <li>
                                    <h3>Addresses:</h3>
                                    <ul>
                                        {!Array.isArray(addresses) ||
                                            (!addresses.length && <li>No addresses to display</li>)}
                                        {Array.isArray(addresses) &&
                                            addresses.map(
                                                ({ line1, line2, zipCode, city, state }, index) => (
                                                    <li key={index}>
                                                        <h4>Address {index + 1}</h4>
                                                        <ul>
                                                            <li>
                                                                <b>Line 1:</b> {line1}
                                                            </li>
                                                            <li>
                                                                <b>Line 2:</b> {line2}
                                                            </li>
                                                            <li>
                                                                <b>Zip code:</b> {zipCode}
                                                            </li>
                                                            <li>
                                                                <b>City:</b> {city}
                                                            </li>
                                                            <li>
                                                                <b>State:</b> {state}
                                                            </li>
                                                        </ul>
                                                    </li>
                                                ),
                                            )}
                                    </ul>
                                </li>
                            </ul>
                        </article>
                    ),
                )}
            </article>
        </div>
    );
};

export default ContactsScreen;
