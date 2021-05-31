import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';

import Database from './infra/db';
import NewsController from './controller/newsController';
import Auth from './infra/auth';
import uploads from './infra/uploads';

class StartUp {
    public app: express.Application;
    private _db: Database;

    constructor() {
        this.app = express();
        this._db = new Database();
        this._db.createConnection();
        this.middler()
        this.routes();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: 'GET, OPTIONS, PUT, POST, DELETE',
            allowedHeaders: '*'
        }

        this.app.use(cors(options));
    }

    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use (bodyParser.urlencoded({ extended: false }));
        this.app.use(compression());
    }

    routes() {
        this.app.route('/').get((request, response) => {
            response.send({ versao: '0.0.1' });
        });

        this.app.route('/uploads').post(uploads.single('file'), (request, response) => {
            try {
                response.send('arquivo enviado com sucesso');
            } catch (error) {
                console.log(error);
            }
        });
        
        // this.app.use(Auth.validate);

        // news
        this.app.route('/api/v1/news').get(NewsController.get);
        this.app.route('/api/v1/news/:id').get(NewsController.getById);
        this.app.route('/api/v1/news/search/:term').get(NewsController.search);
        this.app.route('/api/v1/news').post(NewsController.create);
        this.app.route('/api/v1/news/:id').put(NewsController.update);
        this.app.route('/api/v1/news/:id').delete(NewsController.delete);
    }
}

export default new StartUp;
