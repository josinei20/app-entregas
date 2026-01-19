const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const auth = require('../middleware/auth');
const upload = require('../utils/upload');
const { compressImage } = require('../utils/imageCompression');

// Create a new delivery
router.post('/', auth, deliveryController.createDelivery);

// Get my deliveries
router.get('/', auth, deliveryController.getMyDeliveries);

// Get delivery by ID
router.get('/:id', auth, deliveryController.getDeliveryById);

// Update delivery document (with file upload)
router.post('/:id/documents/:documentType', auth, async (req, res) => {
  try {
    // Buscar delivery para pegar o número do container
    const Delivery = require('../models/Delivery');
    const delivery = await Delivery.findById(req.params.id);
    
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Entrega não encontrada' });
    }

    // Passar número do container e tipo de documento para o multer via req
    req.containerNumber = delivery.deliveryNumber;
    req.documentType = req.params.documentType;
    
    // Executar multer
    const upload = require('../utils/upload');
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      try {
        // Comprimir imagem se arquivo foi enviado
        if (req.file) {
          try {
            const { compressImage } = require('../utils/imageCompression');
            await compressImage(req.file.path);
          } catch (compressError) {
            console.warn('Compressão falhou, continuando com original:', compressError.message);
          }
        }
        
        // Chamar o controlador para atualizar o documento
        await deliveryController.updateDeliveryDocument(req, res);
      } catch (error) {
        console.error('Erro ao processar documento:', error);
        res.status(500).json({ success: false, message: 'Erro ao processar arquivo', error: error.message });
      }
    });
  } catch (error) {
    console.error('Erro na rota de upload:', error);
    res.status(500).json({ success: false, message: 'Erro ao processar documento', error: error.message });
  }
});

// Submit delivery
router.post('/:id/submit', auth, deliveryController.submitDelivery);

// Delete delivery
router.delete('/:id', auth, deliveryController.deleteDelivery);

module.exports = router;
