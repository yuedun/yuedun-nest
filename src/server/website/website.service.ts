import { Injectable, Inject } from '@nestjs/common';
import { default as Website } from './website.entity';
import { WebsiteDto } from './website.dto';

@Injectable()
export class WebsiteService {
    constructor(
        @Inject('WebsiteRepository')
        private readonly websiteRepository: typeof Website,
    ) { }

    // 获取单条数据
    async findOne(url: string): Promise<Website> {
        const website = await this.websiteRepository.findOne({ where: { url, status: 1 } });
        return website;
    }

    // 获取列表
    async findAll(offset: number, limit: number): Promise<Website[]> {
        const list = await this.websiteRepository.findAll({ limit, offset });
        return list;
    }

    // 新增
    async create(ws: WebsiteDto): Promise<Website> {
        const website = await this.websiteRepository.create({
            name: ws.name,
            category: ws.category,
            content: ws.content.toString(),
            url: ws.url,
            status: 0,
        });
        return website;
    }
    // 修改
    async update(ws: WebsiteDto): Promise<[number, Website[]]> {
        const website = await this.websiteRepository.update({
            name: ws.name,
            category: ws.category,
            content: ws.content.toString(),
            url: ws.url,
            status: ws.status,
        }, {
            where: {
                id: ws.id
            }
        });
        return website;
    }
}
