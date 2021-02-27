import * as nock from 'nock';
import request from 'supertest';
import {BootstrapSettings} from "./utils/bootstrap";
import {User} from "../../src/api/models/User";

describe('/api/users', () => {

    // @ts-ignore
    let user: User;
    let settings: BootstrapSettings;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {

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
            // .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBe(1);
        done();
    });

});
