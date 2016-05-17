/**
---
_bundle: true
---
*/

//import '../css/main.css';

// 1) Avatars list
import WidgetsView from './containers/AvatarsList';
import UpvoteWidgets from './containers/VoteList';
import SelfContainedWidgets from './containers/SelfUpdatedState';

import components from './components';
import NeoWidget from './lib/neo-widget';

NeoWidget.setComponents(components);

const B = new WidgetsView({
  elementName: 'WidgetsView',
  key: 'B',
}).render(document.querySelector('#sample-1 .widget'));

// 2) Upvote list

const D = new UpvoteWidgets().render(document.querySelector('#sample-2 .widget'));

// 3) Self contained state

const F = new SelfContainedWidgets({
  key: 'FSample',
}).render(document.querySelector('#sample-3 .widget'));

