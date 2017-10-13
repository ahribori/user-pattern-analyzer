import elasticsearch from 'elasticsearch';
import Click from './model/click';
import App from './model/app';

const es = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

App(es);
Click(es);

export default es;