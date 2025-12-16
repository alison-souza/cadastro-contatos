const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve arquivos HTML/CSS/JS da pasta 'public'

// Caminho do JSON
const CONTATOS_FILE = path.join(__dirname, "contatos.json");

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Listar contatos
app.get("/contatos", (req, res) => {
  const data = fs.existsSync(CONTATOS_FILE)
    ? fs.readFileSync(CONTATOS_FILE)
    : "[]";
  const contatos = JSON.parse(data);
  res.json(contatos);
});

// Adicionar contato
app.post("/contatos", (req, res) => {
  const data = fs.existsSync(CONTATOS_FILE)
    ? fs.readFileSync(CONTATOS_FILE)
    : "[]";
  const contatos = JSON.parse(data);

  const novoContato = {
    id: Date.now(),
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
  };

  contatos.push(novoContato);
  fs.writeFileSync(CONTATOS_FILE, JSON.stringify(contatos, null, 2));
  res.status(201).json(novoContato);
});

// Atualizar contato
app.put("/contatos/:id", (req, res) => {
  const data = fs.existsSync(CONTATOS_FILE)
    ? fs.readFileSync(CONTATOS_FILE)
    : "[]";
  let contatos = JSON.parse(data);

  const index = contatos.findIndex((c) => c.id == req.params.id);

  if (index !== -1) {
    contatos[index] = { ...contatos[index], ...req.body };
    fs.writeFileSync(CONTATOS_FILE, JSON.stringify(contatos, null, 2));
    res.json(contatos[index]);
  } else {
    res.status(404).json({ error: "Contato não encontrado" });
  }
});

// Excluir contato
app.delete("/contatos/:id", (req, res) => {
  const data = fs.existsSync(CONTATOS_FILE)
    ? fs.readFileSync(CONTATOS_FILE)
    : "[]";
  let contatos = JSON.parse(data);

  contatos = contatos.filter((c) => c.id != req.params.id);

  fs.writeFileSync(CONTATOS_FILE, JSON.stringify(contatos, null, 2));
  res.sendStatus(204);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
