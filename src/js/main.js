/**
---
_bundle: true
---
*/

//import '../css/main.css';

// 1) Avatars list
import AvatarsList from './containers/AvatarsList';
import VoteList from './containers/VoteList';
import SelfUpdatedState from './containers/SelfUpdatedState';
import OverlayTest from './containers/OverlayTest';

import components from './components';
import NeoWidget from './lib/neo-widget';
NeoWidget.setComponents(components);

const A = new AvatarsList({
  elementName: 'AvatarsList',
  key: 'Akey',
}).render(document.querySelector('#sample-1 .widget'));

// 2) Upvote list
const B = new VoteList({
  key: 'Bkey',
}).render(document.querySelector('#sample-2 .widget'));

// 3) Self contained state
const C = new SelfUpdatedState({
  key: 'Ckey',
}).render(document.querySelector('#sample-3 .widget'));

// 4) Overlay Test
const D = new OverlayTest({
  key: 'Dkey',
}).render(document.querySelector('#sample-4 .widget'));
