import React from 'react';
import {
    Route
} from 'react-router-dom';

import {
    ClickAnalyze,
    Management
} from './pages';

export default (
    <div>
        <Route exact path="/" component={ClickAnalyze} />
        <Route exact path="/clickAnalyze" component={ClickAnalyze} />
        <Route exact path="/management" component={Management} />
    </div>
);
