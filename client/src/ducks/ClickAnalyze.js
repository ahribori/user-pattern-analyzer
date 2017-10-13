import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import helper from './helpers/thunkHelper';

// Action types
const FETCH_ORIGIN = helper.createThunkTypes('clickAnalyze/FETCH_ORIGIN');
const FETCH_PATHNAME = helper.createThunkTypes('clickAnalyze/FETCH_PATHNAME');
const FETCH_SCREEN = helper.createThunkTypes('clickAnalyze/FETCH_SCREEN');
const FETCH_IMAGE = helper.createThunkTypes('clickAnalyze/FETCH_IMAGE');
const FETCH_POINT = helper.createThunkTypes('clickAnalyze/FETCH_POINT');

// Action creators
export const fetchOrigin = () => {
    return helper.createThunk(FETCH_ORIGIN.DEFAULT, {
        url: `${process.env.REACT_APP_SERVER_URL}/api/analytics/click/origin`,
        method: 'get',
    })();
};

export const fetchPathname = (origin) => {
    return helper.createThunk(FETCH_PATHNAME.DEFAULT, {
        url: `${process.env.REACT_APP_SERVER_URL}/api/analytics/click/pathname`,
        method: 'get',
        params: {
            origin
        }
    })();
};

export const fetchScreen = (origin, pathname) => {
    return helper.createThunk(FETCH_SCREEN.DEFAULT, {
        url: `${process.env.REACT_APP_SERVER_URL}/api/analytics/click/screen`,
        method: 'get',
        params: {
            origin,
            pathname
        }
    })();
};

export const fetchImage = (origin, pathname, screen) => {
    return helper.createThunk(FETCH_IMAGE.DEFAULT, {
        url: `${process.env.REACT_APP_SERVER_URL}/api/analytics/click/image`,
        method: 'get',
        params: {
            url: origin + pathname,
            screen: screen
        }
    })();
};

export const fetchPoint = (origin, pathname, screen) => {
    return helper.createThunk(FETCH_POINT.DEFAULT, {
        url: `${process.env.REACT_APP_SERVER_URL}/api/analytics/click/point`,
        method: 'get',
        params: {
            origin,
            pathname,
            screen
        }
    })();
};

// Initial state
const initialState = fromJS({
    origins: null,
    pathnames: null,
    screens: null,
    image: null,
    points: null,
});

// Reducer
export default handleActions({

    [FETCH_ORIGIN.REQUEST]: (state, action) => {
        return state;
    },
    [FETCH_ORIGIN.SUCCESS]: (state, action) => {
        return state.set('origins', action.payload.data);
    },
    [FETCH_ORIGIN.FAILURE] : (state, action) => {
        console.log(action)
        return state;
    },

    [FETCH_PATHNAME.REQUEST]: (state, action) => {
        return state;
    },
    [FETCH_PATHNAME.SUCCESS]: (state, action) => {
        return state.set('pathnames', action.payload.data);
    },
    [FETCH_PATHNAME.FAILURE] : (state, action) => {
        return state;
    },

    [FETCH_SCREEN.REQUEST]: (state, action) => {
        return state;
    },
    [FETCH_SCREEN.SUCCESS]: (state, action) => {
        return state.set('screens', action.payload.data);
    },
    [FETCH_SCREEN.FAILURE] : (state, action) => {
        return state;
    },

    [FETCH_IMAGE.REQUEST]: (state, action) => {
        return state;
    },
    [FETCH_IMAGE.SUCCESS]: (state, action) => {
        return state.set('image', action.payload.data);
    },
    [FETCH_IMAGE.FAILURE] : (state, action) => {
        return state;
    },

    [FETCH_POINT.REQUEST]: (state, action) => {
        return state;
    },
    [FETCH_POINT.SUCCESS]: (state, action) => {
        return state.set('points', action.payload.data);
    },
    [FETCH_POINT.FAILURE] : (state, action) => {
        return state;
    },

}, initialState);