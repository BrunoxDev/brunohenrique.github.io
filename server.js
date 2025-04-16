const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/projetos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Banco de dados conectado'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Modelo de dados do projeto
const projetoSchema = new mongoose.Schema({
  conteudo: String,
});

const Projeto = mongoose.model('Projeto', projetoSchema);

// Rota para obter o conteúdo do projeto
app.get('/projeto', async (req, res) => {
  const projeto = await Projeto.findOne();
  if (projeto) {
    res.json(projeto);
  } else {
    res.status(404).json({ message: 'Projeto não encontrado' });
  }
});

// Rota para salvar o conteúdo editado
app.post('/projeto', async (req, res) => {
  const { conteudo } = req.body;
  let projeto = await Projeto.findOne();

  if (projeto) {
    // Se o projeto já existir, atualiza o conteúdo
    projeto.conteudo = conteudo;
  } else {
    // Caso contrário, cria um novo projeto
    projeto = new Projeto({ conteudo });
  }

  await projeto.save();
  res.json(projeto);
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
