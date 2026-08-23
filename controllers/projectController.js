import Project from '../models/Project.schema.js';
import User from '../models/User.schema.js';

// @desc    Create a new project for the logged-in user
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      status,
      repoUrl,
      liveUrl,
      writeUpUrl,
      commitHash,
      year,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Project title is required' });
    }

    const project = await Project.create({
      owner: req.user.id,
      title,
      description,
      techStack,
      status,
      repoUrl,
      liveUrl,
      writeUpUrl,
      commitHash,
      year,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: { projects: project._id },
    });

    res.status(201).json({ project });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Could not create project' });
  }
};

// @desc    Get all projects belonging to the logged-in user
// @route   GET /api/projects
// @access  Private
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch projects' });
  }
};

// @desc    Get a single project by id (only if it belongs to the requester)
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this project' });
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch project' });
  }
};

// @desc    Update a project (only the owner can update)
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this project' });
    }

    const allowedFields = [
      'title',
      'description',
      'techStack',
      'status',
      'repoUrl',
      'liveUrl',
      'writeUpUrl',
      'commitHash',
      'year',
      'isVisible',
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    }

    await project.save();

    res.status(200).json({ project });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Could not update project' });
  }
};

// @desc    Delete a project (only the owner can delete)
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await project.deleteOne();

    await User.findByIdAndUpdate(project.owner, {
      $pull: { projects: project._id },
    });

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete project' });
  }
};