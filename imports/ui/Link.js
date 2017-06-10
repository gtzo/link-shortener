import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default () => {
    return (
        <div>
            <PrivateHeader title="Welcome to Link Shortener"/>
            <div className="page-content">
                <AddLink/>
                <LinksListFilters/>
                <LinksList/>
            </div>
        </div>
    );
};
