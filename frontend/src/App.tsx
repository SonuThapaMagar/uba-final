import { useState } from 'react';
import FontPreviewer from './components/FontPreviewer';
import Layout from './components/Layout';
import './index.css';

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [color, setColor] = useState('#FF7F50');
  const [colorPickerEnabled, setColorPickerEnabled] = useState(true); 

  return (
    <Layout
      fontSize={fontSize}
      setFontSize={setFontSize}
      selectedLanguages={selectedLanguages}
      setSelectedLanguages={setSelectedLanguages}
      color={color}
      setColor={setColor}
      colorPickerEnabled={colorPickerEnabled}
      setColorPickerEnabled={setColorPickerEnabled}
    >
      <FontPreviewer fontSize={fontSize} selectedLanguages={selectedLanguages} color={colorPickerEnabled ? color : undefined} />
    </Layout>
  );
}

export default App;