import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
// Usa a porta do .env ou a 3000 como padrão
const port = process.env.PORT || 3000; 

app.use(express.json());

app.use('/auth', authRoutes);

// Liga o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});