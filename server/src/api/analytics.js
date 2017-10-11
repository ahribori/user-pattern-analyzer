import express from 'express';
const router = express.Router();
import es from '../elasticsearch';

router.post('/', (req, res) => {
    const payload = JSON.parse(req.body.data);
    payload.date = new Date();
    es.index({
        index: 'analytics',
        type: 'click',
        body: payload.data
    }, (error, response) => {
        console.log(error, response)
        res.json('success!');
    });
});

router.get('/', (req, res) => {
    es.search({
        index: 'analytics',
        body: {
            aggs: {
                count: {
                    terms: {
                        field: 'location.pathname'
                    }
                }
            }
        }
    }, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});

export default router;