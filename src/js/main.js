/**
---
_bundle: true
---
*/

import components from './components';
import NeoWidget from './lib/neo-widget';
NeoWidget.setComponents(components);

// 1) Avatars list
const A = NeoWidget.render(
  <AvatarsList key='Akey'/>,
  document.querySelector('#sample-1 .widget')
);

// 2) Upvote list
const B = NeoWidget.render(
  <VoteList key='Bkey'/>,
  document.querySelector('#sample-2 .widget')
);

// 3) Self contained state
const C = NeoWidget.render(
  <SelfUpdatedState key='Ckey'/>,
  document.querySelector('#sample-3 .widget')
);

// 4) Overlay Test
const D = NeoWidget.render(
  <OverlayTest key='Dkey'/>,
  document.querySelector('#sample-4 .widget')
);
