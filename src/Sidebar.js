import React, { useState } from 'react';
import './sidebar.css';
import Category from './Category'

function Sidebar() {
    const [sidebar, showSidebar] = useState(false)
    const showCat = () => {
        showSidebar(true);
    }
    return (
        <nav className="sidebar">
            <button onClick={showCat}>Add a category</button><br />
            {sidebar === true && <Category />}
        </nav>
    );
}

export default Sidebar;
