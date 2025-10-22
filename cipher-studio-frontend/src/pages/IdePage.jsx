import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SandpackProvider, useSandpack } from '@codesandbox/sandpack-react';
// TRYING A DIFFERENT THEME: Import 'sandpackDark' instead of 'nightOwlTheme'
import { sandpackDark } from '@codesandbox/sandpack-themes';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '../component/Editor';
import FileExplorer from '../component/FileExplorer';
import Header from '../component/Header';
import Modal from '../component/Modal';
import Toast from '../component/Toast';

const defaultFiles = {
    '/App.js': `export default function App() {\n  return <h1>Welcome to CipherStudio!</h1>\n}`,
    '/index.js': `import React, { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\nimport "./styles.css";\n\nimport App from "./App";\n\nconst root = createRoot(document.getElementById("root"));\nroot.render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);`,
    '/styles.css': `body { font-family: sans-serif; }`,
    '/package.json': `{\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-dom": "^18.0.0",\n    "react-scripts": "^5.0.0"\n  },\n  "main": "/index.js"\n}`
};

// Inner component to access Sandpack context
const IdeLayout = ({ onSave, onNew, userProjects, onLoad, onDelete, projectName, setProjectName, showToast }) => {
    const { sandpack } = useSandpack();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFileName, setNewFileName] = useState('');

    const handleCreateFile = (e) => {
        e.preventDefault();
        if (!newFileName) return;
        const formattedName = newFileName.startsWith('/') ? newFileName : `/${newFileName}`;
        if (sandpack.files[formattedName]) {
            showToast('File with this name already exists.', 'error');
        } else {
            sandpack.addFile(formattedName, `// New file: ${formattedName}`);
            sandpack.setActiveFile(formattedName);
            showToast(`File '${formattedName}' created.`, 'success');
        }
        closeModal();
    };

    const openModal = () => {
        setNewFileName('');
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSaveClick = () => {
        onSave(sandpack.files);
    };

    return (
         <div className="app-container">
            <Header
                projectName={projectName}
                setProjectName={setProjectName}
                onSave={handleSaveClick}
                onNew={onNew}
                userProjects={userProjects}
                onLoad={onLoad}
                onDelete={onDelete}
            />
            <main className="main-layout">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={20} minSize={15} maxSize={30}>
                        <FileExplorer
                            files={sandpack.files}
                            activeFile={sandpack.activeFile}
                            setActiveFile={sandpack.setActiveFile}
                            onNewFileClick={openModal}
                        />
                    </Panel>
                    <PanelResizeHandle className="resize-handle" />
                    <Panel>
                        <Editor />
                    </Panel>
                </PanelGroup>
            </main>
            <Modal show={isModalOpen} onClose={closeModal} title="Create New File">
                <form onSubmit={handleCreateFile} className="new-file-modal">
                    <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        placeholder="/path/to/your/file.js"
                        autoFocus
                    />
                    <button type="submit">Create File</button>
                </form>
            </Modal>
        </div>
    )
}

// Main Page Component
const IdePage = () => {
    const { token } = useContext(AuthContext);
    const [files, setFiles] = useState(defaultFiles);
    const [projectName, setProjectName] = useState('Untitled Project');
    const [projectId, setProjectId] = useState(null);
    const [projects, setProjects] = useState([]);
    const [toast, setToast] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const API_URL = 'http://localhost:8080/api';

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/projects`, { headers: { 'x-auth-token': token } });
                if (response.ok) setProjects(await response.json());
            } catch (error) { console.error("Failed to fetch projects:", error); }
        };
        fetchProjects();
    }, [token]);

    const showToast = (message, type) => {
        setToast({ id: Date.now(), message, type });
    };

    const handleSaveProject = async (currentFiles) => {
        const url = projectId ? `${API_URL}/projects/${projectId}` : `${API_URL}/projects`;
        const method = projectId ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ name: projectName, files: currentFiles })
            });
            const data = await response.json();
            if (response.ok) {
                showToast(`Project '${data.name}' saved!`, 'success');
                if (!projectId) setProjectId(data._id);
                setProjects(prev => prev.find(p => p._id === data._id) ? prev.map(p => p._id === data._id ? data : p) : [...prev, data]);
            } else { showToast(`Error: ${data.message}`, 'error'); }
        } catch (error) { showToast('An error occurred while saving.', 'error'); console.error("Failed to save project:", error); }
    };

    const handleLoadProject = async (id) => {
        try {
            const response = await fetch(`${API_URL}/projects/${id}`, { headers: { 'x-auth-token': token } });
            const data = await response.json();
            if (response.ok) {
                setProjectName(data.name);
                setFiles(data.files);
                setProjectId(data._id);
                showToast(`Project '${data.name}' loaded.`, 'success');
            } else { showToast(`Error: ${data.message}`, 'error'); }
        } catch(error) { showToast('An error occurred while loading.', 'error'); console.error("Failed to load project:", error); }
    };

    const handleNewProject = () => {
        setFiles(defaultFiles);
        setProjectName('Untitled Project');
        setProjectId(null);
        showToast('Started a new blank project.', 'success');
    };

    const handleDeleteProject = async () => {
        if (!projectToDelete) return;
        const idToDelete = projectToDelete._id;

        try {
            const response = await fetch(`${API_URL}/projects/${idToDelete}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });

            if (response.ok) {
                showToast(`Project '${projectToDelete.name}' deleted.`, 'success');
                setProjects(prev => prev.filter(p => p._id !== idToDelete));
                if (projectId === idToDelete) {
                    handleNewProject();
                }
            } else {
                const data = await response.json();
                showToast(`Error deleting: ${data.message}`, 'error');
            }
        } catch (error) {
            showToast('An error occurred while deleting the project.', 'error');
            console.error("Failed to delete project:", error);
        }
        setProjectToDelete(null);
    };

    return (
        <>
            <SandpackProvider
                template="react"
                files={files}
                // TRYING A DIFFERENT THEME: Use 'sandpackDark' here
                theme={sandpackDark}
                key={projectId || 'new-project'}
            >
                <IdeLayout
                    onSave={handleSaveProject}
                    onNew={handleNewProject}
                    onLoad={handleLoadProject}
                    onDelete={setProjectToDelete}
                    userProjects={projects}
                    projectName={projectName}
                    setProjectName={setProjectName}
                    showToast={showToast}
                />
            </SandpackProvider>

            <Modal
                show={!!projectToDelete}
                onClose={() => setProjectToDelete(null)}
                title="Delete Project Confirmation"
            >
                <div className="delete-confirm-modal">
                    <p>Are you sure you want to permanently delete the project:</p>
                    <p><strong>"{projectToDelete?.name}"</strong>?</p>
                    <p>This action cannot be undone.</p>
                    <div className="delete-confirm-buttons">
                        <button onClick={() => setProjectToDelete(null)} className="btn-secondary">
                            Cancel
                        </button>
                        <button onClick={handleDeleteProject} className="btn-danger">
                            Delete Project
                        </button>
                    </div>
                </div>
            </Modal>

            {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
        </>
    );
};

export default IdePage;