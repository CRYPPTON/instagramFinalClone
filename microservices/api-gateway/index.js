const express = require('express');
const cors = require('cors');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Increase limits for JSON and URL-encoded bodies if needed by gateway itself
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

// --- PROXY RULES ---

// Auth & Users
app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '/auth' },
  onProxyReq: fixRequestBody
}));

app.use('/api/users', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/users': '/users' },
  onProxyReq: fixRequestBody
}));
