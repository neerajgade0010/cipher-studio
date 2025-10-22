import { FilePlus, FileText, FileJson, FileCode } from 'lucide-react';

const getFileIcon = (fileName) => {
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
        return <FileCode size={16} className="file-icon" />;
    }
    if (fileName.endsWith('.css')) {
        return <FileText size={16} className="file-icon" />;
    }
    if (fileName.endsWith('.json')) {
        return <FileJson size={16} className="file-icon" />;
    }
    return <FileText size={16} className="file-icon" />;
};

const FileExplorer = ({ files, activeFile, setActiveFile, onNewFileClick }) => {
    return (
        <aside className="file-explorer">
            <div className="file-explorer-header">
                <h3>Explorer</h3>
                <button onClick={onNewFileClick} title="Create New File">
                    <FilePlus size={16} />
                </button>
            </div>
            <ul>
                {Object.keys(files).sort().map(fileName => (
                    <li
                        key={fileName}
                        className={`file-item ${fileName === activeFile ? 'active' : ''}`}
                        onClick={() => setActiveFile(fileName)}
                    >
                        {getFileIcon(fileName)}
                        <span className="file-name">{fileName.substring(1)}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default FileExplorer;