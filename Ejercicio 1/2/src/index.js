import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { faker } from "@faker-js/faker";

import { ContactsScreen } from "./screens";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function createRandomContact() {
    const addressesCount = faker.number.int(5);
    const _cities = faker.helpers.arrayElements(cities, addressesCount);
    const _states = faker.helpers.arrayElements(states, addressesCount);
    return {
        id: faker.string.uuid(),
        avatar_url: faker.image.avatar(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        company: faker.company.name(),
        details: faker.lorem.lines(2),
        email: faker.internet.email(),
        phone: {
            area_code: faker.string.numeric(2),
            number: faker.string.numeric(9),
        },
        addresses: Array(addressesCount)
            .fill(null)
            .map((_, i) => {
                return {
                    line_1: faker.location.street(),
                    line_2: faker.location.secondaryAddress(),
                    zip_code: faker.location.zipCode(),
                    city_id: _cities[i].id,
                    state_id: _states[i].id,
                };
            }),
    };
}

const cities = faker.helpers
    .uniqueArray(faker.location.city, 10)
    .map((name) => ({ id: faker.string.uuid(), name }));
const states = faker.helpers
    .uniqueArray(faker.location.state, 10)
    .map((name) => ({ id: faker.string.uuid(), name }));

export const contacts = faker.helpers.multiple(createRandomContact, {
    count: 50,
});

root.render(
    <StrictMode>
        <ContactsScreen contacts={contacts} cities={cities} states={states} />
    </StrictMode>,
);
