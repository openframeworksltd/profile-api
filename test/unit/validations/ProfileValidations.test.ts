import { validate } from 'class-validator';

import { Profile } from '../../../src/api/models/Profile';

describe('ProfileValidations', () => {

    test('Profile should always have name', async (done) => {
        const profile = new Profile();
        const errorsOne = await validate(profile);
        profile.name = 'TestName';
        const errorsTwo = await validate(profile);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('Profile should always have email', async (done) => {
        const profile = new Profile();
        const errorsOne = await validate(profile);
        profile.email = 'test@test.com';
        const errorsTwo = await validate(profile);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('Profile validation should succeed with all required fields', async (done) => {
        const profile = new Profile();
        profile.name = 'TestName';
        profile.email = 'test@test.com';
        profile.createdAt = new Date();
        profile.updatedAt = new Date();
        const errors = await validate(profile);
        expect(errors.length).toEqual(0);
        done();
    });

});
