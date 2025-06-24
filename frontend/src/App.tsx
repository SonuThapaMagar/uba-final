import FontPreviewer from "./components/FontPreviewer";
import Layout from "./components/Layout";
import './index.css';
import { useState } from 'react';

function App() {
  const [fontSize, setFontSize] = useState(16);
  return (
    <Layout fontSize={fontSize} setFontSize={setFontSize}>
      <FontPreviewer fontSize={fontSize} />
    </Layout>
  );
}

export default App;
