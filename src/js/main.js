import '../css/main.css';

// 1) Avatars list
import WidgetsView from './containers/AvatarsList';

const B = new WidgetsView({
  elementName: 'WidgetsView',
  key: 'B',
}).render(document.querySelector('#sample-1 .widget'));

// 2) Upvote list
import UpvoteWidgets from './containers/VoteList';
const D = new UpvoteWidgets().render(document.querySelector('#sample-2 .widget'));

// 3) Self contained state
import SelfContainedWidgets from './containers/SelfUpdatedState';
const F = new SelfContainedWidgets({
  key: 'FSample',
}).render(document.querySelector('#sample-3 .widget'));
