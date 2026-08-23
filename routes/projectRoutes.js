import express from 'express';
import {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All project routes require the user to be logged in
router.post('/', protect, createProject);
router.get('/', protect, getMyProjects);
router.get('/:id', protect, getProjectById);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;