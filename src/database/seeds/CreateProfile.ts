import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../api/models/User';
import {Profile} from "../../api/models/Profile";

export class CreateProfile implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<Profile> {
        const em = connection.createEntityManager();
        const date = new Date();

        const user = new User();
        user.id = uuid.v4();
        user.firstName = 'John';
        user.lastName = 'Doe';
        user.email = 'john.doe@test.com';
        user.username = 'john.doe';
        user.password = '1234';
        await em.save(user);

        const profile = new Profile();
        profile.id = uuid.v4();
        profile.name = 'John Doe';
        profile.userId = user.id;
        profile.email = 'john.doe@test.com';
        profile.phone = '07960123456';
        profile.createdAt = date;
        profile.updatedAt = date;
        profile.user = user;

        user.profiles = [profile];
        return await em.save(profile);
    }

}
