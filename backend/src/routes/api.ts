import { Router } from 'express';
import { getEvents, getEventDetail } from '../controller/api';

const router = Router();

router.get('/get-events', getEvents);

router.get('/get-event-details', getEventDetail);

export default router;
