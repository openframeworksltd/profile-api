import DataLoader from 'dataloader';
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
import { Profile as ProfileModel } from '../models/Profile';
import { User as UserModel } from '../models/User';
import { ProfileService } from '../services/ProfileService';
import { ProfileInput } from '../types/input/ProfileInput';
import { Profile } from '../types/Profile';

@Service()
@Resolver(of => Profile)
export class ProfileResolver {

    constructor(
        private profileService: ProfileService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>
    ) { }

    @Query(returns => [Profile])
    public profiles(@Ctx() { requestId }: Context): Promise<ProfileModel[]> {
        this.log.info(`{${requestId}} Find all users`);
        return this.profileService.find();
    }

    @Mutation(returns => Profile)
    public async addProfile(@Arg('profile') profile: ProfileInput): Promise<ProfileModel> {
        const newProfile = new ProfileModel();
        newProfile.name = profile.name;
        return this.profileService.create(newProfile);
    }

    @FieldResolver()
    public async owner(@Root() profile: ProfileModel): Promise<any> {
        if (profile.userId) {
            return this.userLoader.load(profile.userId);
        }
        return this.profileService.findOne(`${profile.userId}`);
    }

    // user: createDataLoader(UserRepository),

    //     petsByUserIds: createDataLoader(PetRepository, {
    //         method: 'findByUserIds',
    //         key: 'userId',
    //         multiple: true,
    //     }),

}
