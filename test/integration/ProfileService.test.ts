import { Connection } from 'typeorm';

import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';
import { configureLogger } from '../utils/logger';
import {Profile} from "../../src/api/models/Profile";
import {Container} from "typedi";
import {ProfileService} from "../../src/api/services/ProfileService";

describe('ProfileService', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let connection: Connection;
    beforeAll(async () => {
        configureLogger();
        connection = await createDatabaseConnection();
    });

    beforeEach(() => migrateDatabase(connection));

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(() => closeDatabase(connection));

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('should create a new profile in the database', async (done) => {
        const profile = new Profile();
        profile.id = 'b2fb9154-7897-11eb-9439-0242ac130002';
        profile.name = 'John';
        profile.email = 'john.doe@test.com';
        profile.phone = '07960123456';
        profile.summary = 'this is a profile summary';
        profile.imageUrl = '';
        profile.cvUrl = '';
        profile.createdAt = new Date();
        profile.updatedAt = new Date();
        const service = Container.get<ProfileService>(ProfileService);
        const resultCreate = await service.create(profile);
        expect(resultCreate.name).toBe(profile.name);
        const resultFind = await service.findOne(resultCreate.id);
        if (resultFind) {
            expect(resultFind.name).toBe(profile.name);
        } else {
            fail('Could not find profile');
        }
        done();
    });

});
