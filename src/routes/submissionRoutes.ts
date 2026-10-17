import { Router } from 'express';
import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
  getSubmissions,
  updateSubmission,
} from '../controllers/submissionController';
import { protectRoute } from '../middleware/auth';

const submissionRouter = Router();

submissionRouter.use(protectRoute);
submissionRouter.get('/', getSubmissions);
submissionRouter.get('/:id', getSubmissionById);
submissionRouter.post('/', createSubmission);
submissionRouter.patch('/:id', updateSubmission);
submissionRouter.delete('/:id', deleteSubmission);

export default submissionRouter;
