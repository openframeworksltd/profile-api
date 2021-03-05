import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./User";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Profile {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column()
    public phone: string;

    @IsNotEmpty()
    @Column()
    public email: string;

    @Column({
        name: 'image_url',
        nullable: true
    })
    public imageUrl: string;

    @Column({
        name: 'cv_url',
        nullable: true
    })
    public cvUrl: string;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: string;

    @IsNotEmpty()
    @Column()
    public createdAt: Date;

    @IsNotEmpty()
    @Column()
    public updatedAt: Date;

    @ManyToOne(type => User, user => user.profiles)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }
}
