import express from 'express';
const router = express.Router();
import es from '../elasticsearch';
import selenium from '../selenium';

router.post('/click', (req, res) => {
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

    const url = `${payload.data.location.origin}${payload.data.location.pathname}`;
    const screen = payload.data.screen;
    es.search({
        index: 'app',
        type: 'screenshot',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: { 'url': url }
                        },
                        {
                            match: { 'screen': screen }
                        }
                    ]
                }
            },
        }
    }).then(result => {
        if (result.hits.total === 0) {
            es.index({
                index: 'app',
                type: 'screenshot',
                body: {
                    url: url,
                    screen: payload.data.screen
                }
            }).then((created) => {
                selenium.enqueueTransaction({
                    actions: [
                        {
                            type: 'navigate',
                            url: url
                        },
                        {
                            type: 'window_handle_size',
                            width: screen.split('*')[0],
                            height: screen.split('*')[1]
                        },
                        {
                            type: 'screenshot',
                            title: created._id
                        }

                    ]
                }, { max_session: 1 }, 'chrome');
            });
        }

    });

});

router.get('/click', (req, res) => {
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

router.get('/click/origin', (req, res) => {
    es.search({
        index: 'analytics',
        body: {
            aggs: {
                group_by_origin: {
                    terms: {
                        field: 'location.origin'
                    }
                }
            }
        }
    }).then((result) => {
        const buckets = result.aggregations.group_by_origin.buckets;
        const origins = [];
        buckets.map(item => { origins.push(item.key) });
        res.json(origins);
    });
});

router.get('/click/pathname', (req, res) => {
    const origin = req.query.origin;
    es.search({
        index: 'analytics',
        body: {
            query: {
                match: {
                    'location.origin': origin
                }
            },
            aggs: {
                group_by_pathname: {
                    terms: {
                        field: 'location.pathname'
                    }
                }
            }
        }
    }).then((result) => {
        const buckets = result.aggregations.group_by_pathname.buckets;
        const pathnames = [];
        buckets.map(item => { pathnames.push(item.key) });
        res.json(pathnames);
    });
});

router.get('/click/screen', (req, res) => {
    const origin = req.query.origin;
    const pathname = req.query.pathname;

    es.search({
        index: 'analytics',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: { 'location.origin': origin },
                        },
                        {
                            match: { 'location.pathname': pathname },
                        }
                    ]
                },
            },
            aggs: {
                group_by_screen: {
                    terms: {
                        field: 'screen',
                    }
                }
            }
        }
    }).then((result) => {
        const buckets = result.aggregations.group_by_screen.buckets;
        const screens = [];
        buckets.map(item => { screens.push(item.key) });
        res.json(screens);
    });
});

router.get('/click/image', (req, res) => {
    const url = req.query.url;
    const screen = req.query.screen;

    es.search({
        index: 'app',
        type: 'screenshot',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: { 'url': url },
                        },
                        {
                            term: { 'screen': screen },
                        }
                    ]
                },
            }
        }
    }).then((result) => {
        if (result.hits.hits.length > 0) {
            const image_file_name = result.hits.hits[0]._id + '.png';
            res.json(image_file_name);
        } else {
            res.json('');
        }
    });
});


router.get('/click/point', (req, res) => {
    const origin = req.query.origin;
    const pathname = req.query.pathname;
    const screen = req.query.screen;

    es.search({
        index: 'analytics',
        from: 0,
        size: 1000,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: { 'location.origin': origin },
                        },
                        {
                            match: { 'location.pathname': pathname },
                        },
                        {
                            match: { 'screen': screen },
                        }
                    ]
                },
            },
        }
    }).then((result) => {
        const lists = result.hits.hits;
        const returnValue = [];
        lists.map(data => {
            returnValue.push({
                x: data._source.pageX,
                y: data._source.pageY
            });
        });
        res.json(returnValue);
    });
});

export default router;