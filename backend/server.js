require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const resourceController = require('./controllers/resourceController');

const app = express();
const upload = multer({ dest: 'uploads/' });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json()); 

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      //pass the file path to the controller function to handle processing
      await resourceController.insertConsumptionData(req.file.path);
      res.send('File processed and data stored in MongoDB');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing file');
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
