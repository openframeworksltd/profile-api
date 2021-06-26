import {IsEmail, IsNotEmpty, IsUUID, IsPhoneNumber} from 'class-validator';
import {
    Authorized, BadRequestError, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';
import {OpenAPI, ResponseSchema} from 'routing-controllers-openapi';

import {ProfileNotFoundError} from '../errors/ProfileNotFoundError';
import {Profile} from '../models/Profile';
import {ProfileService} from '../services/ProfileService';
import * as uuid from "uuid";

class BaseProfile {
    @IsNotEmpty()
    public name: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsPhoneNumber('UK')
    public phone: string;

    public imageUrl: string;

    public cvUrl: string;
}

export class ProfileResponse extends BaseProfile {
    @IsUUID()
    @IsNotEmpty()
    public id: string;
}

export class CreateProfileBody extends BaseProfile {
    @IsUUID()
    // todo: make test pass with @IsNotEmpty
    @IsNotEmpty()
    public userId: string;
}

@Authorized()
@JsonController('/profiles')
@OpenAPI({security: [{basicAuth: []}]})
export class ProfileController {

    constructor(
        private profileService: ProfileService
    ) {
    }

    @Get()
    @ResponseSchema(ProfileResponse, {isArray: true})
    public find(): Promise<Profile[]> {
        return this.profileService.find();
    }

    @Get('/:id')
    @OnUndefined(ProfileNotFoundError)
    @ResponseSchema(ProfileResponse)
    public one(@Param('id') id: string): Promise<Profile | undefined> {
        return this.profileService.findOne(id);
    }

    @Post()
    @ResponseSchema(ProfileResponse)
    public create(@Body() body: CreateProfileBody): Promise<Profile> {
        if (body.userId === undefined || body.userId === null || body.userId === "") {
            throw new BadRequestError(`user id is either, null or undefined : ${body.userId}`);
        }
        const profile = new Profile();
        profile.createdAt = new Date();
        profile.name = body.name
        profile.email = body.email;
        profile.id = uuid.v4();
        profile.userId = body.userId;
        profile.phone = body.phone;
        profile.imageUrl = body.imageUrl;
        profile.cvUrl = body.cvUrl;

        return this.profileService.create(profile);
    }

    @Put('/:id')
    @ResponseSchema(ProfileResponse)
    public update(@Param('id') id: string, @Body() body: CreateProfileBody): Promise<Profile> {
        const profile = new Profile();
        profile.updatedAt = new Date();
        profile.name = body.name;
        profile.email = body.email;
        profile.phone = body.phone;
        profile.imageUrl = body.imageUrl;
        profile.cvUrl = body.cvUrl;

        return this.profileService.update(id, profile);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.profileService.delete(id);
    }

}
