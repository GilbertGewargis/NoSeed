import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PRODUCTS } from './products.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

function checkSeedOil(productName) {
  const product = PRODUCTS.find(p => p.name.toLowerCase() === productName.toLowerCase());
  if (!product) {
    return { containsSeedOil: false, alternatives: [] };
  }
  return {
    containsSeedOil: product.containsSeedOil,
    alternatives: product.alternatives
  };
}

// Endpoint to handle image upload
app.post('/api/check', upload.single('image'), (req, res) => {
  // For the sake of this demo we use the original file name as the product name
  const productName = req.file ? req.file.originalname.replace(/\.[^/.]+$/, '') : '';
  const result = checkSeedOil(productName);
  res.json({
    product: productName,
    ...result
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
