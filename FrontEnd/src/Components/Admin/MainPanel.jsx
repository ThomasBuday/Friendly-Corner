import React from 'react';

import Maintenance from './Maintenance/Maintenance';
import Prices from './Maintenance/Prices';
import Colleagues from './Maintenance/Colleagues';
import Register from './Maintenance/Register';

function MainPanel({ selectedComponent }) {
    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Maintenance':
                return <Maintenance />;
            case 'Prices':
                return <Prices />;
            case 'Colleagues':
                return <Colleagues />;
            case 'Register':
                return <Register />;
            default:
                return <Maintenance />;
        }
    };

    return (
        <div className="adm-panel">
            {renderComponent()}
        </div>
    );
};

export default MainPanel;