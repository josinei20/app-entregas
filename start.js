#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando aplicação...');

const buildPath = path.join(__dirname, 'frontend/build');

// Verificar se build existe
if (!fs.existsSync(buildPath)) {
  console.log('📦 Build não encontrado! Compilando frontend...');
  try {
    console.log('  1. Instalando dependências do frontend...');
    execSync('cd frontend && npm install', { stdio: 'inherit' });
    
    console.log('  2. Compilando React...');
    execSync('cd frontend && npm run build', { stdio: 'inherit' });
    
    console.log('✅ Frontend compilado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao compilar:', error.message);
    console.log('⚠️  Iniciando servidor sem frontend compilado...');
  }
}

// Instalar dependências do backend se não existir
const backendModules = path.join(__dirname, 'backend/node_modules');
if (!fs.existsSync(backendModules)) {
  console.log('📦 Instalando dependências do backend...');
  execSync('cd backend && npm install', { stdio: 'inherit' });
}

// Iniciar servidor
console.log('✅ Iniciando servidor...');
require('./backend/src/server.js');
