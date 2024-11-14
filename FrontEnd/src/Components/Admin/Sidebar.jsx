import React from 'react';

function Sidebar({ setSelectedComponent }) {
    
    return (
        <div className="adm-sidebar"> 
            <button onClick={() => setSelectedComponent('Maintenance')} className="adm-link">Maintenance</button> 
            <button onClick={() => setSelectedComponent('Prices')} className="adm-link">Prices</button> 
            <button onClick={() => setSelectedComponent('Colleagues')} className="adm-link">Colleagues</button> 
            <button onClick={() => setSelectedComponent('Register')} className="adm-link">Register</button> 
        </div> 
    ); 
};

export default Sidebar;