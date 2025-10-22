import { useContext } from 'react';
// Import the Trash2 icon
import { LogOut, Save, FilePlus, ChevronDown, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

// Add 'onDelete' to the props
const Header = ({ projectName, setProjectName, onSave, onNew, userProjects, onLoad, onDelete }) => {
    const { user, logout } = useContext(AuthContext);

    // Function to handle the delete button click
    const handleDeleteClick = (e, project) => {
        // Stop the click from also triggering the 'onLoad' function on the parent div
        e.stopPropagation();
        // Call the onDelete function passed from IdePage with the project object
        onDelete(project);
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <h2>CipherStudio</h2>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="project-name-input"
                    title="Project Name"
                />
            </div>
            <div className="header-right">
                <div className="project-dropdown">
                    <button className="dropdown-button">My Projects <ChevronDown size={16}/></button>
                    <div className="dropdown-content">
                        {userProjects && userProjects.length > 0 ? (
                            // Map over projects to create list items with delete buttons
                            userProjects.map(p => (
                                <div key={p._id} className="project-item">
                                    {/* Clickable project name to load it */}
                                    <a className="project-name" onClick={() => onLoad(p._id)}>
                                        {p.name}
                                    </a>
                                    {/* Delete button */}
                                    <button
                                        className="delete-btn"
                                        title={`Delete ${p.name}`}
                                        onClick={(e) => handleDeleteClick(e, p)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <span className="placeholder">No projects saved</span>
                        )}
                    </div>
                </div>

                <button onClick={onNew} className="header-button" title="New Project"><FilePlus size={18} /> New</button>
                <button onClick={onSave} className="header-button primary" title="Save Project"><Save size={18} /> Save</button>
                <div className="user-info">
                    <span>Hello, {user?.firstName}</span>
                    <button onClick={logout} className="header-button" title="Logout"><LogOut size={18} /></button>
                </div>
            </div>
        </header>
    );
};

export default Header;

