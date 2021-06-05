import {Service} from "typedi";
import {OrmRepository} from "typeorm-typedi-extensions";
import {ProfileRepository} from "../repositories/ProfileRepository";
import {EventDispatcher, EventDispatcherInterface} from "../../decorators/EventDispatcher";
import {Logger, LoggerInterface} from "../../decorators/Logger";
import {Profile} from "../models/Profile";
import {v4 as uuid} from 'uuid';
import {events} from "../subscribers/events";
import {User} from "../models/User";
import {UserRepository} from "../repositories/UserRepository";
import {NotFoundError} from "routing-controllers";

@Service()
export class ProfileService {

    constructor(
        @OrmRepository() private profileRepository: ProfileRepository,
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Profile[]> {
        this.log.info('Find all profiles');
        return this.profileRepository.find();
    }

    public async create(profile: Profile): Promise<Profile> {
        this.log.info('Create a new profile => ', profile.toString());
        profile.id = uuid();
        const userId = await this.userRepository.findOne(profile.userId);
        if(!userId){
            throw new NotFoundError('user not found');
        }
        const newProfile = await this.profileRepository.save(profile);
        this.eventDispatcher.dispatch(events.profile.created, newProfile);
        return newProfile;
    }

    public findOne(id: string): Promise<Profile | undefined> {
        this.log.info('Find profile by id');
        return this.profileRepository.findOne({ id });
    }

    public update(id: string, profile: Profile): Promise<Profile> {
        this.log.info('Update a profile');
        profile.id = id;
        return this.profileRepository.save(profile);
    }

    public findByUser(user: User): Promise<Profile[]> {
        this.log.info('Find all profiles of the user', user.toString());
        return this.profileRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a profile');
        await this.profileRepository.delete(id);
        return;
    }
}
