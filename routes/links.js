import express from 'express';
import Link from '../models/Link.js';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/shorten', auth, async (req, res) => {
  const { originalUrl, alias, expiresAt } = req.body;
  if (!validUrl.isWebUri(originalUrl)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  try {
    let shortUrl = alias || nanoid(6);
    const existing = await Link.findOne({ shortUrl });
    if (existing) return res.status(400).json({ message: 'Alias already exists' });

    const link = await Link.create({
      originalUrl,
      shortUrl,
      alias,
      userId: req.user.userId,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/analytics', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

 
    const filter = { userId: req.user.userId };
    
    if (search) {
      filter.$or = [
        { originalUrl: { $regex: search, $options: 'i' } },
        { shortUrl: { $regex: search, $options: 'i' } }
      ];
    }


    const links = await Link.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


    const total = await Link.countDocuments(filter);

    res.json(links);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;