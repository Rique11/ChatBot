import express from 'express';
import { metaWebhook, escutaMensagem } from '../Webhooks/metaWebhook.js';

const router = express.Router();

router.post('/', metaWebhook);
router.get('/escuta', escutaMensagem);

export default router;
 