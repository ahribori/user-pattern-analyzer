const screenshot_mapping = {
    index: 'app',
    type: 'screenshot',
    body: {
        screenshot: {
            properties: {
                url: { type: 'keyword', index: 'not_analyzed' },
                screen: { type: 'keyword', index: 'not_analyzed' },
            }
        }
    }
};

export default (es) => {
    es.indices.exists({
        index: 'app'
    }).then(exist => {
        if (!exist) {
            es.indices.create({
                index: 'app'
            }).then(() => {
                es.indices.putMapping(screenshot_mapping);
            });
        }
    })
};