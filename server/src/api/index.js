import express from 'express';
import cors from 'cors';
const router = express.Router();

import analytics from './analytics';

router.get('/', (req, res) => {
    res.json('Express');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.json('Express');
});

router.use('/api', cors());
router.use('/api/analytics', analytics);

export default router;