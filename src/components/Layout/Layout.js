import React, { Component } from 'react';
import Hoc from '../../hoc/Hoc';
import classes from './Layout.css'
/*import {AppBar, Toolbar} from '@material-ui/core';*/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#e65100',
          },
          secondary: {
            main: '#bf360c',
          },
  }});

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClose = () => {
        this.setState({showSideDrawer : false});
    }

    sideDrawerOpen = () => {
        this.setState({showSideDrawer : true});
    }

    render () {
        return (    
        <Hoc>
            {/*<MuiThemeProvider theme={theme}>
                <AppBar >
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>*/}
            <Toolbar open={this.sideDrawerOpen}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClose}/>
            <div>Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
        </Hoc>);
    }}

export default Layout;