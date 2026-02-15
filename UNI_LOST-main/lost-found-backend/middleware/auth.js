// middleware/auth.js
const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // extract token
  if (!token) return res.status(401).json({ error: 'Auth token missing' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;      // attach payload (e.g. {userId, email, role})
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid/Expired token' });
  }
};
router.post('/items', authMiddleware, async (req, res) => {
  const data = { ...req.body, reportedBy: req.user.userId };
  const item = new Item(data);
  await item.save();
  res.status(201).json(item);
});
router.get('/items', async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.location) filter.location = req.query.location;
  if (req.query.itemType) filter.itemType = req.query.itemType;
  const items = await Item.find(filter).sort({ date: -1 });
  res.json(items);
});
router.post('/claims', authMiddleware, async (req, res) => {
  const { itemId, proof } = req.body;
  const claim = new Claim({ item: itemId, claimant: req.user.userId, proof });
  await claim.save();
  // Optionally, set item status to 'claimed'
  await Item.findByIdAndUpdate(itemId, { status: 'claimed' });
  res.status(201).json(claim);
});
router.post('/admin/claims/:claimId/approve', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
  const claim = await Claim.findById(req.params.claimId);
  claim.status = 'approved';
  claim.resolvedAt = Date.now();
  await claim.save();
  // Update item status
  await Item.findByIdAndUpdate(claim.item, { status: 'returned' });
  // (Optional) send notification
  await sendNotification(claim.claimant, `Your claim on item ${claim.item} was approved.`);
  res.json({ message: 'Claim approved' });
});
const nodemailer = require('nodemailer');
async function sendNotification(userId, text) {
  const user = await User.findById(userId);
  if (!user || !user.email) return;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Claim Status Update',
    text
  });
}
const { body, validationResult } = require('express-validator');
router.post('/items',
  authMiddleware,
  body('title').notEmpty(),
  body('itemType').isIn(['lost','found']),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    // ...create item
  }
);
