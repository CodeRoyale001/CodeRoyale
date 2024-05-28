import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools'; // Import the language_tools extension
import DarkLightButton from '../buttons';
import { Button } from '../ui/button';

interface CodeEditorProps {
  width?: string;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('chrome');
  const [language, setLanguage] = useState('javascript');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleResetCode = () => {
    setCode('');
  };

  return (
    <div className="h-screen min-h-[300px] min-w-[300px] max-h-screen max-w-full mx-auto p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div className="code-editor-option">
            <label htmlFor="themeSelect" className="mr-2">Select Theme:</label>
            <select
              id="themeSelect"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="chrome">Chrome</option>
              <option value="monokai">Monokai</option>
            </select>
          </div>
          <div className="code-editor-option">
            <label htmlFor="languageSelect" className="mr-2">Select Language:</label>
            <select
              id="languageSelect"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c_cpp">C++</option>
            </select>
          </div>
        </div>
        <Button onClick={handleResetCode}>
          Reset Code
        </Button>
      </div>
      <div className="h-[calc(100vh-200px)] ">
        <AceEditor
          setOptions={{ useWorker: false }}
          mode={language}
          theme={theme}
          value={code}
          onChange={handleCodeChange}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          width={"100%"}
          height={"100%"}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
        />
      </div>
    </div>
  );
};

export default CodeEditor;