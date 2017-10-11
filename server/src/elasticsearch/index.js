import elasticsearch from 'elasticsearch';
import Click from './model/click';

const es = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

Click(es);

export default es;