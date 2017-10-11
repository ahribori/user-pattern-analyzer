import * as config from './config';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GrommetSidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import User from 'grommet/components/icons/base/User';
import Logo from 'grommet/components/icons/base/BrandGrommetPath';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this._onMenuClick = this._onMenuClick.bind(this);
        this._renderCloseButton = this._renderCloseButton.bind(this);
        this._renderLogo = this._renderLogo.bind(this);
        this._renderTitle = this._renderTitle.bind(this);
        this._renderMenu = this._renderMenu.bind(this);
        this._renderMenuFooter = this._renderMenuFooter.bind(this);
    }

    _onMenuClick() {
        if (this.props.responsive === 'single') {
            this.props.onCloseButtonClick();
        }
    }

    _renderCloseButton() {
        return this.props.responsive === 'single' ? <Button icon={<CloseIcon />} onClick={this.props.onCloseButtonClick} /> : '';
    }

    _renderLogo() {
        return (
            <Logo colorIndex="light-1" type="logo" size="large" />
        );
    }

    _renderTitle() {
        return (
            <Title responsive={false}>
                Title
            </Title>
        );
    }

    _renderMenu() {
        return (
            <Menu primary={true}>
                <Link to="/home" onClick={this._onMenuClick}>
                    <Anchor className='active' tag="span" onClick={()=>{}}>Home</Anchor>
                </Link>
                <Link to="/about"  onClick={this._onMenuClick}>
                    <Anchor tag="span" onClick={()=>{}}>About</Anchor>
                </Link>
            </Menu>
        );
    }

    _renderMenuFooter() {
        return (
            <Footer pad='medium'>
                <Button icon={<User />} />
            </Footer>
        );
    }

    render() {
        return (
            <GrommetSidebar colorIndex={config.SIDEBAR_BACKGROUND_COLOR}
                            size='medium'
                            fixed={true}>
                <Header pad='medium'
                        justify='between'>
                    {this._renderLogo()}
                    {this.props.visible ? this._renderCloseButton() : ''}
                </Header>
                <Header pad='medium'
                        justify='between'>
                    {this._renderTitle()}
                </Header>
                <Box flex='grow'
                     justify='start'>
                    {this._renderMenu()}
                </Box>
                {this._renderMenuFooter()}
            </GrommetSidebar>
        )
    }
}
