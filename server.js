const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// "Banco de dados" fictício
const users = [
  { username: "aluno", password: "tecnologiaevida", role: "aluno" },
  { username: "ADM", password: "ADMSOUEU", role: "admin" }
];

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Autenticado com sucesso
  return res.json({ message: 'Login realizado com sucesso', role: user.role });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
