import React from 'react';
import Selectors from '../components/clickAnalyze/Selectors';
import ImageContainer from '../components/clickAnalyze/ImageContainer';
import { connect } from 'react-redux';
import * as clickAnalyze from '../ducks/ClickAnalyze';
import '../style/clickAnalyze.scss';

class ClickAnalyze extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedScreen: null
        };
        this.onSomethingChanged = this.onSomethingChanged.bind(this);
        this._handleOriginChange = this._handleOriginChange.bind(this);
        this._handlePathnameChange = this._handlePathnameChange.bind(this);
        this._handleScreenChange = this._handleScreenChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    onSomethingChanged() {
        const heatmap = document.querySelector('canvas');
        if (heatmap) {
            heatmap.remove ? heatmap.remove() : heatmap.removeNode(true);
        }
    }

    _handleOriginChange(origin) {
        this.props.fetchPathname(origin);
        this.setState({
            selectedScreen: null
        });
        this.onSomethingChanged();
    }

    _handlePathnameChange(origin, pathname) {
        this.props.fetchScreen(origin, pathname);
        this.onSomethingChanged();
        if (this.state.selectedScreen) {
            this.fetchData(origin, pathname, this.state.selectedScreen);
        }
    }

    _handleScreenChange(origin, pathname, screen) {
        this.setState({
            selectedScreen: screen
        });
        this.onSomethingChanged();
        this.fetchData(origin, pathname, screen);
    }

    fetchData(origin, pathname, screen) {
        const spinner = document.querySelector('#spinner');
        spinner.style.visibility = 'visible';
        this.props.fetchImage(origin, pathname, screen);
        this.props.fetchPoint(origin, pathname, screen)
            .then(() => {
                spinner.style.visibility = 'hidden';
            });
    }

    render() {
        return [
            <Selectors
                key="1"
                origins={this.props.origins}
                pathnames={this.props.pathnames}
                screens={this.props.screens}
                onOriginSelect={this._handleOriginChange}
                onPathnameSelect={this._handlePathnameChange}
                onScreenSelect={this._handleScreenChange}
            />,
            <ImageContainer
                key="2"
                image={this.props.image}
                points={this.props.points}
                screen={this.state.selectedScreen}
            />

        ];
    }

    componentDidMount() {
        this.props.fetchOrigin()
    }
}

const mapStateToProps = (state) => {
    return {
        origins: state.clickAnalyze.get('origins'),
        pathnames: state.clickAnalyze.get('pathnames'),
        screens: state.clickAnalyze.get('screens'),
        image: state.clickAnalyze.get('image'),
        points: state.clickAnalyze.get('points'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrigin: () => {
            return dispatch(clickAnalyze.fetchOrigin())
        },
        fetchPathname: origin => {
            return dispatch(clickAnalyze.fetchPathname(origin))
        },
        fetchScreen: (origin, pathname) => {
            return dispatch(clickAnalyze.fetchScreen(origin, pathname))
        },
        fetchImage: (origin, pathname, screen) => {
            return dispatch(clickAnalyze.fetchImage(origin, pathname, screen))
        },
        fetchPoint:  (origin, pathname, screen) => {
            return dispatch(clickAnalyze.fetchPoint(origin, pathname, screen))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClickAnalyze);