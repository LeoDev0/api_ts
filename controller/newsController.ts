import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';

import Helper from '../infra/helper';

class NewsController {

    get(request, response) {
        NewsService.get()
            .then(news => Helper.sendResponse(response, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    getById(request, response) {
        const _id = request.params.id;

        NewsService.getById(_id)
            .then(news => Helper.sendResponse(response, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    create(request, response) {
        let vm = request.body;

        NewsService.create(vm)
            .then(vm => Helper.sendResponse(response, HttpStatus.CREATED, 'Notícia cadastrada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    update(request, response) {
        const _id = request.params.id;
        let news = request.body;

        NewsService.update(_id, news)
            .then(() => Helper.sendResponse(response, HttpStatus.OK, `Notícia atualizada com sucesso!`))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }

    delete(request, response) {
        const _id = request.params.id;

        NewsService.delete(_id)
            .then(() => Helper.sendResponse(response, HttpStatus.OK, 'Notícia deletada com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}

export default new NewsController;
