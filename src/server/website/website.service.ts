import { Injectable, Inject, HttpService } from '@nestjs/common';
import { default as Website } from './website.entity';
import { WebsiteDto } from './website.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
import { map } from 'rxjs/operators';
import { MyLogger } from 'libs/mylog.service';

@Injectable()
export class WebsiteService {
    constructor(
        @Inject('WebsiteRepository')
        private readonly websiteRepository: typeof Website,
        private readonly httpService: HttpService,
        private readonly logger: MyLogger,
    ) {
        logger.setContext('website.service.ts');
    }

    // 获取单条数据
    async findOne(url: string): Promise<Website> {
        const website = await this.websiteRepository.findOne({ where: { url, status: 1 } });
        return website;
    }
    // 获取单条数据
    findOneData(url: string): Promise<WebsiteDto> {
        return this.httpService.get('http://localhost:8900/api/website/get-website').pipe(map(res => res.data.data)).toPromise<WebsiteDto>()
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
            components: ws.components.toString(),
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
            components: ws.components.toString(),
            url: ws.url,
            status: ws.status,
        }, {
            where: {
                id: ws.id
            }
        });
        return website;
    }
    // 修改
    async delete(id: number): Promise<number> {
        const affect = await this.websiteRepository.destroy({ where: { id } });
        return affect;
    }
}
