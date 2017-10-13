import React from 'react';
import Select from 'grommet/components/Select';

class Selectors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            originSelected: false,
            pathnameSelected: false,
            screenSelected: false,
            selectedOrigin: null,
            selectedPathname: null,
            selectedScreen: null,
        };
        this._renderOriginSelector = this._renderOriginSelector.bind(this);
        this._renderPathnameSelector = this._renderPathnameSelector.bind(this);
        this._renderScreenSelector = this._renderScreenSelector.bind(this);
        this._style = this._style.bind(this);
    }

    _renderOriginSelector() {
        const handleChange = (e) => {
            if (e.value === this.state.selectedOrigin) return;
            if (this.state.pathnameSelected) {
                this.setState({
                    originSelected: true,
                    pathnameSelected: false,
                    screenSelected: false,
                    selectedOrigin: null,
                    selectedPathname: null,
                    selectedScreen: null
                });
            } else {
                this.setState({
                    originSelected: true,
                });
            }
            this.setState({
               selectedOrigin: e.value
            });
            this.props.onOriginSelect(e.value);
        };

        return (
            <Select placeHolder='어플리케이션을 선택하세요'
                    options={this.props.origins ? this.props.origins : []}
                    value={this.state.selectedOrigin}
                    onChange={handleChange}
                    style={this._style()}
            />
        );
    }

    _renderPathnameSelector() {
        const handleChange = (e) => {
            if (e.value === this.state.selectedPathname) return;
            if (this.state.screenSelected) {
                this.setState({
                    pathnameSelected: true,
                    screenSelected: false
                });
            } else {
                this.setState({
                    pathnameSelected: true,
                });
            }
            this.setState({
                selectedPathname: e.value
            });
            this.props.onPathnameSelect(this.state.selectedOrigin, e.value);
        };

        return (
            <Select placeHolder='페이지를 선택하세요'
                    options={this.props.pathnames ? this.props.pathnames : []}
                    value={this.state.selectedPathname}
                    onChange={handleChange}
                    style={this._style()}
            />
        );
    }

    _renderScreenSelector() {
        const handleChange = (e) => {
            if (e.value === this.state.selectedScreen) return;
            this.setState({
                selectedScreen: e.value
            });
            this.props.onScreenSelect(this.state.selectedOrigin, this.state.selectedPathname, e.value);
        };

        return (
            <Select placeHolder='화면 사이즈를 선택하세요'
                    options={this.props.screens ? this.props.screens : []}
                    value={this.state.selectedScreen}
                    onChange={handleChange}
                    style={this._style()}
            />
        );
    }

    _style () {
        return {
            marginBottom: '5px'
        }
    }

    render() {
        return (
            <div>
                {this._renderOriginSelector()}
                {this.state.originSelected ? this._renderPathnameSelector() : null }
                {this.state.pathnameSelected ? this._renderScreenSelector() : null }
            </div>
        );
    }
}


export default Selectors;