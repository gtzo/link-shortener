import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Links } from '../api/links'; 

import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default () => {
    return (
        <div>
            <PrivateHeader title="Welcome to Link Shortener"/>
            <LinksListFilters/>
            <LinksList/>
            <AddLink/>
        </div>
    );
};
