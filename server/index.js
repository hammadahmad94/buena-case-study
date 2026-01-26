const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/properties.routes');
const extractionRoutes = require('./routes/extraction.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/extract', extractionRoutes);

app.get('/', (req, res) => {
  res.send('Buena API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
