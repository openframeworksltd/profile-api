import {Field, InputType} from 'type-graphql';

import {Profile} from "../Profile";

@InputType()
export class ProfileInput implements Partial<Profile> {

    @Field(type => String, {
        description: 'The name of the profile owner.'
    })
    public name: string;

    @Field(type => String, {
        description: 'The email of the profile.',
    })
    public email: string;

    @Field(type => String, {
        description: 'The phone number of the profile.',
        nullable: true
    })
    public phone: string;

    @Field(type => String, {
        description: 'The url of where profile image is stored on the cloud.',
        nullable: true
    })
    public imageUrl: string;

    @Field(type => String, {
        description: 'The url of where CV is stored on the cloud.',
        nullable: true
    })
    public cvUrl: string;
}
