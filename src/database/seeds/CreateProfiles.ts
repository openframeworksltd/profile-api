import {Factory, Seed, times} from "typeorm-seeding";
import {Connection} from "typeorm";
import {Profile} from "../../api/models/Profile";
import {User} from "../../api/models/User";

export class CreateProfiles implements Seed {
    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const profile = await factory(Profile)().seed();
            const user = await factory(User)().make();
            user.profiles = [profile];
            return await em.save(user);
        });
    }

}
