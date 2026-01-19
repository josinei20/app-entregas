const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/deliveries', require('./routes/delivery'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Erro no servidor', error: err.message });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/delivery-docs';
    
    // Use in-memory MongoDB for development if local MongoDB is not available
    if (process.env.NODE_ENV === 'development') {
      try {
        const mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
        console.log('✓ MongoDB em memória iniciado');
      } catch (memoryError) {
        console.log('⚠ MongoDB em memória não disponível, tentando conexão local...');
      }
    }
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log('✓ MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('✗ Erro ao conectar MongoDB:', error.message);
    console.log('\n📌 SOLUÇÃO: Você precisa de MongoDB rodando localmente');
    console.log('   Download: https://www.mongodb.com/try/download/community');
    console.log('   Ou use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas');
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✓ Servidor rodando na porta ${PORT}`);
      console.log(`✓ API disponível em http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('✗ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
