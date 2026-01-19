const Delivery = require('../models/Delivery');
const Driver = require('../models/Driver');

// Create a new delivery
exports.createDelivery = async (req, res) => {
  try {
    const { deliveryNumber, vehiclePlate, observations } = req.body;
    const driverId = req.user.id;

    // Check if delivery number already exists for this driver
    const existingDelivery = await Delivery.findOne({ 
      deliveryNumber, 
      driverId,
      status: { $in: ['draft', 'submitted'] }
    });

    if (existingDelivery) {
      return res.status(400).json({ 
        success: false, 
        message: 'Número de entrega já existe'
      });
    }

    const driver = await Driver.findById(driverId);

    const delivery = new Delivery({
      deliveryNumber,
      driverId,
      driverName: driver.name,
      vehiclePlate,
      observations,
      status: 'draft'
    });

    await delivery.save();

    res.status(201).json({
      success: true,
      message: 'Entrega criada com sucesso',
      delivery
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Get deliveries for current driver
exports.getMyDeliveries = async (req, res) => {
  try {
    const driverId = req.user.id;
    const { status, searchTerm } = req.query;

    let query = { driverId };
    
    if (status) {
      query.status = status;
    }

    if (searchTerm) {
      query.deliveryNumber = { $regex: searchTerm, $options: 'i' };
    }

    const deliveries = await Delivery.find(query).sort({ createdAt: -1 });

    res.json({ success: true, deliveries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Get delivery by ID
exports.getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar se é um ID MongoDB válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Entrega não encontrada' });
    }

    // Check if driver owns this delivery
    if (delivery.driverId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    res.json({ success: true, delivery });
  } catch (error) {
    console.error('Erro ao buscar entrega:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Update delivery document
exports.updateDeliveryDocument = async (req, res) => {
  try {
    const { id, documentType } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Arquivo não enviado' });
    }

    // Validar se é um ID MongoDB válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Entrega não encontrada' });
    }

    // Check if driver owns this delivery
    if (delivery.driverId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    // Check if delivery is submitted
    if (delivery.status === 'submitted') {
      return res.status(400).json({ success: false, message: 'Entrega já foi enviada' });
    }

    const validDocuments = ['canhotNF', 'canhotCTE', 'diarioBordo', 'devolucaoVazio', 'retiradaCheio'];
    if (!validDocuments.includes(documentType)) {
      return res.status(400).json({ success: false, message: 'Tipo de documento inválido' });
    }

    // Inicializar documents se não existir
    if (!delivery.documents) {
      delivery.documents = {};
    }

    delivery.documents[documentType] = {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      uploadedAt: new Date()
    };

    delivery.updatedAt = new Date();
    await delivery.save();

    res.json({
      success: true,
      message: 'Documento anexado com sucesso',
      delivery
    });
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Submit delivery (check all documents are attached)
exports.submitDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Entrega não encontrada' });
    }

    // Check if driver owns this delivery
    if (delivery.driverId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    // Check if already submitted
    if (delivery.status === 'submitted') {
      return res.status(400).json({ success: false, message: 'Entrega já foi enviada' });
    }

    // Check all documents are attached
    const requiredDocs = ['canhotNF', 'canhotCTE', 'diarioBordo', 'devolucaoVazio', 'retiradaCheio'];
    const missingDocs = requiredDocs.filter(doc => !delivery.documents[doc]);

    if (missingDocs.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Documentos obrigatórios faltando: ' + missingDocs.join(', ')
      });
    }

    delivery.status = 'submitted';
    delivery.submittedAt = new Date();
    delivery.updatedAt = new Date();

    await delivery.save();

    res.json({
      success: true,
      message: 'Entrega enviada com sucesso',
      delivery
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Delete delivery (only if draft)
exports.deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Entrega não encontrada' });
    }

    // Check if driver owns this delivery
    if (delivery.driverId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Acesso negado' });
    }

    // Only allow deletion of draft deliveries
    if (delivery.status !== 'draft') {
      return res.status(400).json({ success: false, message: 'Apenas entregas em rascunho podem ser deletadas' });
    }

    await Delivery.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Entrega deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};
