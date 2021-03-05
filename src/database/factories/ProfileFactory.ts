import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Profile } from '../../api/models/Profile';

define(Profile, (faker: typeof Faker, settings: { role: string }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const name = faker.name.findName(firstName, lastName);
    const email = faker.internet.email(firstName, lastName);
    const imageUrl = faker.random.image();
    const phone = faker.phone.phoneFormats();
    const createdAtDate = faker.date.past(1);
    const updatedAtDate = faker.date.recent(3);


    const profile = new Profile();
    profile.id = uuid.v1();
    profile.name = name;
    profile.email = email;
    profile.imageUrl = imageUrl;
    profile.phone = phone;
    profile.createdAt = createdAtDate;
    profile.updatedAt = updatedAtDate;
    return profile;
});
