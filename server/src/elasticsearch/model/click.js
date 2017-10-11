const mapping = {
    index: 'analytics',
    type: 'click',
    body: {
        click: {
            properties: {
                x: { type: 'long' },
                y: { type: 'long' },
                pageX: { type: 'long' },
                pageY: { type: 'long' },
                date: { type: 'date' },
                location: {
                    properties: {
                        origin: { type: 'keyword' },
                        pathname: { type: 'keyword' }
                    }
                },
                screen: { type: 'keyword' }
            }
        }
    }
};

export default (es) => {
    es.indices.exists({
        index: 'analytics'
    }).then(exist => {
        if (!exist) {
            es.indices.create({
                index: 'analytics'
            }).then(() => {
                es.indices.putMapping(mapping);
            });
        } else {
            // es.indices.delete({
            //     index: 'analytics'
            // }).then(() => {
            //     es.indices.create({
            //         index: 'analytics'
            //     }).then(() => {
            //         es.indices.putMapping(mapping);
            //     });
            // })
        }
    })
};