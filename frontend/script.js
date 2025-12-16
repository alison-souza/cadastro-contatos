const API_URL = "http://localhost:3000/contatos";

const tableBody = document.querySelector("#contactTable tbody");
const form = document.getElementById("addContactForm");
const exportBtn = document.getElementById("exportBtn");
const contatosCount = document.getElementById("contatosCount");

let contatoEditando = null;

// Função para validar conexão com backend
async function validarBackend() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("API não respondeu corretamente");
    console.log("✅ Conexão com backend estabelecida com sucesso!");
    return true; // backend ok
  } catch (error) {
    console.error("❌ Não foi possível conectar ao backend:", error);
    return false;
  }
}

// Função para buscar e renderizar contatos
async function fetchContatos() {
  const backendOK = await validarBackend();
  if (!backendOK) return; // parar execução se backend offline

  try {
    const response = await fetch(API_URL);
    const contatos = await response.json();
    renderTable(contatos);
  } catch (error) {
    console.error("Erro ao acessar a API:", error);
  }
}

// Renderiza a tabela
function renderTable(contatos) {
  tableBody.innerHTML = "";

  contatos.forEach((contato) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${contato.nome}</td>
      <td>${contato.email}</td>
      <td>${contato.telefone}</td>
      <td>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
      </td>
    `;

    tr.querySelector(".delete-btn").addEventListener("click", () =>
      deleteContato(contato.id)
    );

    tr.querySelector(".edit-btn").addEventListener("click", () =>
      editContato(contato)
    );

    tableBody.appendChild(tr);
  });

  contatosCount.textContent = `Número de contatos: ${contatos.length}`;
}

// Adicionar ou editar contato
async function salvarContato(e) {
  e.preventDefault();

  const backendOK = await validarBackend();
  if (!backendOK) return;

  const contatoData = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
  };

  try {
    if (contatoEditando) {
      await fetch(`${API_URL}/${contatoEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contatoData),
      });
      contatoEditando = null;
      form.querySelector("button").textContent = "Adicionar";
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contatoData),
      });
    }

    form.reset();
    fetchContatos();
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
  }
}

// Funções de excluir e editar
async function deleteContato(id) {
  const backendOK = await validarBackend();
  if (!backendOK) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchContatos();
  } catch (error) {
    console.error("Erro ao excluir contato:", error);
  }
}

function editContato(contato) {
  document.getElementById("nome").value = contato.nome;
  document.getElementById("email").value = contato.email;
  document.getElementById("telefone").value = contato.telefone;

  contatoEditando = contato;
  form.querySelector("button").textContent = "Salvar Alterações";
}

// Exportar tabela
exportBtn.addEventListener("click", () => {
  const table = document.getElementById("contactTable");
  const html = table.outerHTML.replace(/<button.*?button>/g, "");
  const url = "data:application/vnd.ms-excel," + encodeURIComponent(html);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contatos.xls";
  a.click();
});

// Eventos
form.addEventListener("submit", salvarContato);

// Inicializar tabela
fetchContatos();
