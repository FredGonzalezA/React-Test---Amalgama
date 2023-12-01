import { useMemo } from "react";
import { UserProfile } from "../components";

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
                     }) => {
                        return {
                            id,
                            avatarUrl,
                            firstName: first_name,
                            lastName: last_name,
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
                         firstName,
                         lastName,
                         company,
                         email,
                         phoneNumber,
                         addresses,
                     }) => (
                        <UserProfile
                            key={id}
                            avatarUrl={avatarUrl}
                            firstName={firstName}
                            lastName={lastName}
                            company={company}
                            email={email}
                            addresses={addresses}
                            phoneNumber={phoneNumber}
                        />
                    ),
                )}
            </article>
        </div>
    );
};

export default ContactsScreen;
