import NewsRepository from '../repository/newsRepository';

class NewsService {

    async search(term, page, perPage) {
        return await NewsRepository.find({'title': new RegExp('.*' + term + '*.', 'i')})
            .skip((page - 1) * perPage)
            .limit(perPage);
    }

    async get() {
        return await NewsRepository.find({'active': true}, 'title hat img').sort({publishDate: -1}).limit(2);
    }

    async getById(_id) {
        return await NewsRepository.find({ _id });
    }

    async create(news) {
        return await NewsRepository.create(news);
    }

    async update(_id, news) {
        return await NewsRepository.findByIdAndUpdate(_id, news);
    }

    async delete(_id) {
        return await NewsRepository.findByIdAndRemove(_id);
    }
}

export default new NewsService;