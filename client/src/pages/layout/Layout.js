import * as config from './config';
import React, { Component } from 'react';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Sidebar from './Sidebar';
import routes from '../../routes';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this._onResponsive = this._onResponsive.bind(this);
        this._renderSidebar = this._renderSidebar.bind(this);
        this._renderContents = this._renderContents.bind(this);
        this._renderMenuButton = this._renderMenuButton.bind(this);

        this.state = {
            showSidebar: true
        };
    }

    _onResponsive(columns) {
        if (columns === 'multiple') { // full
            this.setState({ showSidebar: true, responsive: columns });
        } else if (columns === 'single') { // responsive
            this.setState({ showSidebar: false, responsive: columns });
        }
    }

    _renderSidebar() {
        return (
            <Box justify='center'
                 align='center'
                 pad='none'>
                <Sidebar
                    responsive={this.state.responsive}
                    visible={this.state.showSidebar}
                    onCloseButtonClick={() => {
                        this.setState({ showSidebar: false });
                    }}/>
            </Box>
        );
    }

    _renderMenuButton() {
        return !this.state.showSidebar ? (
            <MenuIcon style={{ position: 'fixed', top: 30, left: 30, cursor: 'pointer' }}
                      onClick={() => {
                          this.setState({ showSidebar: true });
                      }} />
        ) : '';
    }

    _renderContents() {
        return (
            <Box colorIndex={config.CONTENT_BACKGROUND_COLOR}
                 full={true}
                 align='center'
                 pad='medium'>
                {this._renderMenuButton()}
                <Article>
                    <Section>
                        {routes}
                    </Section>
                </Article>
            </Box>
        );
    }

    render() {
        let priority = this.state.showSidebar ? 'left' : 'right';
        return (
            <App centered={false}>
                <Split flex='right'
                       priority={priority}
                       onResponsive={this._onResponsive}
                       showOnResponsive='priority'>
                    {this._renderSidebar()}
                    {this._renderContents()}
                </Split>
            </App>
        );
    }
}
