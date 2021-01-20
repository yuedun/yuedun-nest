import { Injectable, Inject, HttpService } from '@nestjs/common';
import { default as Website } from './website.entity';
import { WebsiteDto, PageDto } from './website.dto';
import { map } from 'rxjs/operators';
import { MyLogger } from '../../libs/mylog.service';

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
    findOneData(name: string, url: string): Promise<{ website: WebsiteDto; page: PageDto }> {
        return this.httpService.get(`http://localhost:8900/api/website/get-website?name=${name}&url=${url}`)
            .pipe(map(res => res.data)).toPromise<{ website: WebsiteDto; page: PageDto }>()
    }

    // 获取列表
    async findAll(offset: number, limit: number): Promise<Website[]> {
        const list = await this.websiteRepository.findAll({ limit, offset });
        return list;
    }

    // 新增
    async create(ws: WebsiteDto): Promise<Website> {
        const website = await this.websiteRepository.create({
            name: ws.title,
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
            name: ws.title,
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
