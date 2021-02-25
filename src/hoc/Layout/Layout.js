import React from 'react';

import Auxilliary from '../Auxilliary/Auxilliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { bool } from 'prop-types';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {

        return (
            <Auxilliary>
                <Toolbar show={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className="Layout-Content">
                    {this.props.children}
                </main>
            </Auxilliary >
        );
    }

};

export default Layout;