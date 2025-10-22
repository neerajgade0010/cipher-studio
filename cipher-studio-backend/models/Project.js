const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true, default: 'Untitled Project' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // This line adds the field to store the creator's name
    userName: { type: String, required: true },
    files: { type: Object, required: true },
    template: { type: String, default: 'react' }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Project', ProjectSchema);