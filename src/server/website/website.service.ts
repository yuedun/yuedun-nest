import { Injectable, Inject } from '@nestjs/common';
import { default as Website } from './website.entity';
import { CreateWebsiteDto } from './website.dto';

@Injectable()
export class WebsiteService {
    constructor(
        @Inject('WebsiteRepository')
        private readonly websiteRepository: typeof Website,
    ) { }

    // 获取单条数据
    async findOne(url: string): Promise<Website> {
        const website = await this.websiteRepository.findOne({ where: { url } });
        return website;
    }

    // 获取列表
    async findAll(offset: number, limit: number): Promise<Website[]> {
        const list = await this.websiteRepository.findAll({ limit, offset });
        return list;
    }

    // 新增
    async create(ws: CreateWebsiteDto): Promise<Website> {
        const website = await this.websiteRepository.create({
            name: ws.name,
            category: ws.category,
            content: ws.content.toString(),
            url: ws.url,
            status: 0,
        });
        return website;
    }
}
