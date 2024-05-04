import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools'; // Import the language_tools extension

// import './CodeEditor.css';

const CodeEditor = (props:any) => {

  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('chrome');
  const [language, setLanguage] = useState('javascript');

  const handleCodeChange = (newCode :string) => {
    setCode(newCode);
  };

  const handleThemeChange = (newTheme : string) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage : string) => {
    setLanguage(newLanguage);
  };

  const handleResetCode = () => {
    setCode('');
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-options">
        <div className="code-editor-option">
          <label htmlFor="themeSelect">Select Theme:</label>
          <select id="themeSelect" value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
            <option value="chrome">Chrome</option>
            <option value="monokai">Monokai</option>
          </select>
        </div>
        <div className="code-editor-option">
          <label htmlFor="languageSelect">Select Language:</label>
          <select id="languageSelect" value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c_cpp">C++</option>
          </select>
        </div>
        <button className="code-editor-option" onClick={handleResetCode}>Reset Code</button>
      </div>
      <AceEditor
        setOptions={{ useWorker: false }}
        mode={language}
        theme={theme}
        value={code}
        onChange={handleCodeChange}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        width={props.width || "500px"}
        height={props.height || "500px"}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
      />
    </div>
  );
};

export default CodeEditor;