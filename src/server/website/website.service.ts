import { Injectable, Inject } from '@nestjs/common';
import { default as Website } from './website.entity';

@Injectable()
export class WebsiteService {
    constructor(
        @Inject('WebsiteRepository')
        private readonly websiteRepository: typeof Website
    ) {}

    async findAll(): Promise<Website[]> {
        const list = await this.websiteRepository.findAll();
        return list;
    }
}
