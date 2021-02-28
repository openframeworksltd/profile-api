import { Field, ID, ObjectType } from 'type-graphql';

import { Profile } from './Profile';

@ObjectType({
    description: 'User object.',
})
export class User {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The first name of the user.',
    })
    public firstName: string;

    @Field({
        description: 'The last name of the user.',
    })
    public lastName: string;

    @Field({
        description: 'The email of the user.',
    })
    public email: string;

    @Field(type => [Profile], {
        description: 'A list of profiles which belong to the user.',
    })
    public profiles: Profile[];

}
