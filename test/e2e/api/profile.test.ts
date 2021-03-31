import * as nock from 'nock';
import request from 'supertest';
import {BootstrapSettings} from "../utils/bootstrap";
import {Profile} from "../../../src/api/models/Profile";
import {runSeed} from "typeorm-seeding";
import { prepareServer } from '../utils/server';
import {CreateProfile} from "../../../src/database/seeds/CreateProfile";

describe('/api/users', () => {

    let johnProfile: Profile;
    let settings: BootstrapSettings;
    let userAuthorisation: string;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ migrate: true });
        johnProfile = await runSeed<Profile>(CreateProfile);
        userAuthorisation = Buffer.from(`${johnProfile.user.username}:1234`).toString('base64');
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

    test('GET: / should return a list of profiles', async (done) => {
        const response = await request(settings.app)
            .get('/api/profiles')
            .set('Authorization', `Basic ${userAuthorisation}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toBe(1);
        done();
    });

    test('GET: /:id should return profile', async (done) => {
        const response = await request(settings.app)
            .get(`/api/profiles/${johnProfile.id}`)
            .set('Authorization', `Basic ${userAuthorisation}`)
            .expect('Content-Type', /json/)
            .expect(200);

        console.log(`response: ${JSON.stringify(response.body)}`);

        expect(response.body.id).toBe(johnProfile.id);
        expect(response.body.email).toBe(johnProfile.email);
        expect(response.body.phone).toBe(johnProfile.phone);
        expect(response.body.name).toBe(johnProfile.name);
        done();
    });

});
