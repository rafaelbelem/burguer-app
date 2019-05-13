import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from '../MenuButton/MenuButton';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuButton clicked={props.open} />
        {/*<button onClick={props.open}></button>*/}
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;