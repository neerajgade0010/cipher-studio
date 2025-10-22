const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/authMiddleware');

// --- Route to CREATE a new project (No change) ---
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, files, template } = req.body;
        const newProject = new Project({
            name,
            files,
            template,
            userId: req.user.id,
            userName: req.user.firstName
        });
        const project = await newProject.save();
        res.status(201).json(project);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Server error creating project.", error: error.message });
    }
});

// --- Route to GET all projects (No change) ---
router.get('/', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id }).sort({ updatedAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Server error fetching projects.", error: error.message });
    }
});

// --- Route to GET a single project (No change) ---
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Project not found or not authorized.' });
        }
        res.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Server error fetching project.", error: error.message });
    }
});

// --- Route to UPDATE an existing project (No change) ---
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { name, files } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project || project.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Project not found or not authorized.' });
        }
        project.name = name || project.name;
        project.files = files || project.files;
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error)
        {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Server error updating project.", error: error.message });
    }
});

// --- NEW Route to DELETE a project ---
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        // Security check: Ensure project exists and belongs to the user
        if (!project || project.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Project not found or not authorized.' });
        }

        // Find and delete the project
        await Project.findByIdAndDelete(req.params.id);

        res.json({ message: 'Project deleted successfully.' });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server error deleting project.", error: error.message });
    }
});

module.exports = router;

