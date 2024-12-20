const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Chave secreta para assinatura do token
const secretKey = '356w8#';

//rota 1
app.get('/token', (req, res) => {
  const randomMessage = `Mensagem aleatória ${Math.floor(Math.random() * 1000)}`;
  const token = jwt.sign({ message: randomMessage }, secretKey, { expiresIn: '20 min' });
  res.json({ token });
});

//rota 2
app.post('/decode-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ message: decoded.message });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido/expirado' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor funcionando em http://localhost:${PORT}`);
});
