import {Service} from "typedi";
import {OrmRepository} from "typeorm-typedi-extensions";
import {ProfileRepository} from "../repositories/ProfileRepository";
import {EventDispatcher, EventDispatcherInterface} from "../../decorators/EventDispatcher";
import {Logger, LoggerInterface} from "../../decorators/Logger";
import {Profile} from "../models/Profile";
import {v4 as uuid} from 'uuid';
import {events} from "../subscribers/events";
import {User} from "../models/User";

@Service()
export class ProfileService {

    constructor(
        @OrmRepository() private profileRepository: ProfileRepository,
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
        const newProfile = await this.profileRepository.save(profile);
        this.eventDispatcher.dispatch(events.profile.created, newProfile);
        return newProfile;
    }

    public findOne(id: string): Promise<Profile | undefined> {
        this.log.info('Find profile by id');
        return this.profileRepository.findOne({ id });
    }

    public findByUser(user: User): Promise<Profile[]> {
        this.log.info('Find all profiles of the user', user.toString());
        return this.profileRepository.find({
            where: {
                userId: user.id,
            },
        });
    }
}
