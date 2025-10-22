import {
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
} from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';

const Editor = () => {
    return (
        <div className="editor-container">
            <SandpackLayout>
                <SandpackCodeEditor
                    showTabs={false}
                    showLineNumbers={true}
                    showInlineErrors={true}
                    wrapContent={true}
                />
                <SandpackPreview
                    showNavigator={true}
                />
            </SandpackLayout>
        </div>
    );
};

export default Editor;