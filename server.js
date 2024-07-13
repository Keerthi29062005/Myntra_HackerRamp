// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { readFile, writeFile } = require('fs/promises');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

app.post('/submit', upload.single('imageUpload'), async (req, res) => {
  console.log('Received POST request to /submit');
  console.log('Submitted data:', req.body); 

  try {
    const { outfitName, description } = req.body;
    const image = req.file.filename; // filename saved by multer

    const newSubmission = {
      outfitName,
      description,
      image: 'uploads/' + image,
      votes: 0
    };

    let submissions = [];
    try {
      submissions = JSON.parse(await readFile('submissions.json', 'utf8'));
    } catch (err) {
      console.error('Error reading submissions:', err);
    }

    submissions.push(newSubmission);

    try {
      await writeFile('submissions.json', JSON.stringify(submissions, null, 2));
      console.log('Response sent:', { message: 'Submission successful' }); 
      res.status(201).json({ message: 'Submission successful' });
    } catch (err) {
      console.error('Error writing submissions:', err);
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    console.error('Error submitting:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
 
app.get('/submissions', async (req, res) => {
  try {
    const submissions = JSON.parse(await readFile('submissions.json', 'utf8'));
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
