import { Meteor } from 'meteor/meteor';

import '../imports/api/users';
import '../imports/api/links';

Meteor.startup(() => {
    Meteor.call('addNumbers', 1, 2, (err, res) => {
        console.log('numbersargs', err, res);
    })

});
