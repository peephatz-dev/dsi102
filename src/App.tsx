import { LocaleProvider } from './i18n/LocaleContext';
import { AppProvider } from './context/AppContext';
import { FollowGate } from './components/studio/FollowGate';
import { LearningStudio } from './components/studio/LearningStudio';
import './components/arc/foundation.css';
import './components/studio/studio.css';

export default function App() {
  return <LocaleProvider><AppProvider><FollowGate><LearningStudio /></FollowGate></AppProvider></LocaleProvider>;
}
