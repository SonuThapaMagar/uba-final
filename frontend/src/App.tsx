import { useState } from 'react';
import FontPreviewer from './components/FontPreviewer';
import Layout from './components/Layout';
import './index.css';

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  return (
    <Layout fontSize={fontSize} setFontSize={setFontSize} selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages}>
      <FontPreviewer fontSize={fontSize} selectedLanguages={selectedLanguages} />
    </Layout>
  );
}

export default App;