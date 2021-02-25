import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';

const sideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];

    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"];
    }

    return (
        <Auxilliary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className="SideDrawerLogo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxilliary>
    );
}

export default sideDrawer;