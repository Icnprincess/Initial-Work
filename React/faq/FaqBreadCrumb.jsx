import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const Location = () => {
    return (
        <div className="page-title-box">
            <div className="page-title-right">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

                    <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
    );
};

export default Location;
