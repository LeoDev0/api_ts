import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import * as redis from 'redis';

import Helper from '../infra/helper';

class NewsController {

    async get(request, response) {
        try {
            let client = redis.createClient();

            await client.get('news', async function(err, reply) {
                if (reply) {
                    console.log('redis');
                    Helper.sendResponse(response, HttpStatus.OK, JSON.parse(reply));
                } else {
                    console.log('db');
                    let result = await NewsService.get();
                    client.set('news', JSON.stringify(result));
                    client.expire('news', 20);
                    Helper.sendResponse(response, HttpStatus.OK, result);
                }
            });
        } catch (error) {
            console.error(error);
        }
        
    }

    async getById(request, response) {
        try {
            const _id = request.params.id;
            const result = await NewsService.getById(_id);
            Helper.sendResponse(response, HttpStatus.OK, result);
        } catch (error) {
            console.error(error);
        }
    }

    async create(request, response) {
        try {
            let vm = request.body;
            await NewsService.create(vm);
            Helper.sendResponse(response, HttpStatus.CREATED, 'Notícia cadastrada com sucesso!');
        } catch (error) {
            console.error(error);
        }
    }

    async update(request, response) {
        
        try {
            const _id = request.params.id;
            let news = request.body;
            await NewsService.update(_id, news);
            Helper.sendResponse(response, HttpStatus.OK, `Notícia atualizada com sucesso!`);
        } catch (error) {
            console.error(error);
        }
    }

    async delete(request, response) {
        try {
            const _id = request.params.id;
            await NewsService.delete(_id);
            Helper.sendResponse(response, HttpStatus.OK, 'Notícia deletada com sucesso!');
        } catch (error) {
            console.error(error);
        }
    }
}

export default new NewsController;
