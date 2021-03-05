import {Field, ID, ObjectType} from "type-graphql";
import {User} from "./User";

@ObjectType({
    description: 'Profile object.',
})

export class Profile {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The name of the profile owner.',
    })
    public name: string;

    @Field({
        description: 'The email address of the profile owner.'
    })
    public email: string;

    @Field({
        description: 'The phone number of the profile owner.',
    })
    public phone: string;

    @Field({
        description: 'The url of where the profile image is stored on the cloud',
    })
    public imageUrl: string;

    @Field({
        description: 'The url of where the CV is stored on the cloud.',
    })
    public cvUrl: string;

    @Field(type => Date, {
        description: "The date the profile was created"
    })
    public createdAt: Date;

    @Field(type => Date, {
        description: "The date the profile was last updated"
    })
    public updatedAt: Date;

    @Field(type => User, {
        nullable: true,
    })
    public owner: User;

}
