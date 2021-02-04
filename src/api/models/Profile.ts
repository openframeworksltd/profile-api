import {JoinColumn, ManyToOne} from "typeorm";
import {User} from "./User";

export class Profile {


    @ManyToOne(type => User, user => user.profile)
    @JoinColumn({ name: 'user_id' })
    public user: User;
}
