import { Router } from 'express';
import { getEvents } from '../controller/api';

const router = Router();

router.get('/get-events', getEvents);

export default router;
