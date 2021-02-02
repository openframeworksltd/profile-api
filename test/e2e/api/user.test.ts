import * as nock from 'nock';
import request from 'supertest';
import {BootstrapSettings} from "../utils/bootstrap";
import {User} from "../../../src/api/models/User";
import {runSeed} from "typeorm-seeding";
import { prepareServer } from '../utils/server';
import { CreateBruce } from '../../../src/database/seeds/CreateBruce';

describe('/api/users', () => {

    // @ts-ignore
    let bruce: User;
    let settings: BootstrapSettings;
    let bruceAuthorization: string;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ migrate: true });
        bruce = await runSeed<User>(CreateBruce);
        bruceAuthorization = Buffer.from(`${bruce.username}:1234`).toString('base64');
    });

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        nock.cleanAll();
    });

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return a list of users', async (done) => {
        const response = await request(settings.app)
            .get('/api/users')
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toBe(1);
        done();
    });

});
