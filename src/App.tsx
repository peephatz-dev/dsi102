import { AppProvider } from './context/AppContext';
import { LearningStudio } from './components/studio/LearningStudio';
import './components/arc/foundation.css';
import './components/studio/studio.css';

export default function App() {
  return <AppProvider><LearningStudio /></AppProvider>;
}
