import React from 'react';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <ul className={classes.NavigationItem}>
        <a
            href={props.link}
            className={props.active ? classes.NavigationItem : null}>{props.children}</a>
    </ul>

);

export default navigationItem;