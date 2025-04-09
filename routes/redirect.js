import express from 'express';
import Link from '../models/Link.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const UAParser = require('ua-parser-js');

const router = express.Router();

router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const link = await Link.findOne({ shortUrl });

    if (!link || (link.expiresAt && link.expiresAt < new Date())) {
      return res.status(404).json({ message: 'Link not found or expired' });
    }

    // Log click asynchronously
    setImmediate(async () => {
      try {
        const parser = new UAParser(req.headers['user-agent']);
        const result = parser.getResult();
        const deviceType = result.device?.type || 'desktop';

        await Link.updateOne(
          { _id: link._id },
          {
            $push: {
              clicks: {
                ip: req.ip,
                device: deviceType,
                timestamp: new Date(),
              },
            },
          }
        );
      } catch (err) {
        console.error('Click tracking error:', err);
      }
    });

    res.redirect(link.originalUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
