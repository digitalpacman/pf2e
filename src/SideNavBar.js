import React  from 'react';
import { Link } from "react-router-dom";
import {ReactComponent as XIcon} from './x-icon.svg';

export const SideNavBar = ({showSideNav, closeSideNav}) => {

    const handleXIconClick = () => {
        closeSideNav()
    }

    if (showSideNav) {
        return (
            <div className="side-nav">
                <header className='side-nav-header-wrapper'>
                    <h4 className='side-nav-header'>Pathfinder 2e Monster Library</h4>
                    <XIcon className="side-nav-x-icon" onClick={handleXIconClick} />
                </header>
                <div className="side-nav-link-list">
                <div>
                    <h4 className="side-nav-link-wrapper">
                        <Link className="nav-link" to="/">Monsters</Link>
                    </h4>
                </div>
                <div>
                    <h3 className="side-nav-link-wrapper">
                        <Link className="nav-link" to="/create">Monster Builder</Link>                    
                    </h3>
                </div>
                <div>
                    <h3 className="side-nav-link-wrapper">
                        <Link className="nav-link" to="/createEncounter">Encounter Builder</Link>        
                    </h3>
                </div> 
                </div>
            </div>
        );
    } else {
        return null;
    }

}