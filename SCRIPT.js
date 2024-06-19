let livros = [];
let proximoId = 1;

// Carrega os dados dos livros do armazenamento local
function carregarDados() {
    const livrosJSON = localStorage.getItem('livros');
    if (livrosJSON) {
        livros = JSON.parse(livrosJSON);
        proximoId = livros.length > 0 ? Math.max(...livros.map(livro => livro.id)) + 1 : 1;
        atualizarTabela();
    }
}

// Salva os dados dos livros no armazenamento local
function salvarDados() {
    const livrosJSON = JSON.stringify(livros);
    localStorage.setItem('livros', livrosJSON);
}

document.getElementById('form-cadastrar').addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = parseInt(document.getElementById('ano').value);
    const preco = parseFloat(document.getElementById('preco').value);
    const exemplares = parseInt(document.getElementById('exemplares').value);

    const novoLivro = {
        id: proximoId++,
        titulo: titulo,
        autor: autor,
        ano: ano,
        preco: preco,
        exemplares: exemplares
    };

    livros.push(novoLivro);
    salvarDados();
    atualizarTabela();
    document.getElementById('form-cadastrar').reset();
});

function atualizarTabela() {
    const tbody = document.querySelector('#livros-tabela tbody');
    tbody.innerHTML = '';

    livros.forEach(livro => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${livro.id}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano}</td>
            <td>R$ ${livro.preco.toFixed(2)}</td>
            <td>${livro.exemplares}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="comprarLivro(${livro.id})">Comprar</button>
                <button class="btn btn-warning btn-sm" onclick="editarLivro(${livro.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="removerLivro(${livro.id})">Remover</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function comprarLivro(id) {
    const livro = livros.find(l => l.id === id);
    if (livro && livro.exemplares > 0) {
        livro.exemplares--;
        salvarDados();
        atualizarTabela();
        alert(`Livro '${livro.titulo}' comprado com sucesso!`);
    } else {
        alert('Livro fora de estoque ou não encontrado.');
    }
}

function editarLivro(id) {
    const livro = livros.find(l => l.id === id);
    if (livro) {
        const novoTitulo = prompt('Novo título:', livro.titulo);
        const novoAutor = prompt('Novo autor:', livro.autor);
        const novoAno = parseInt(prompt('Novo ano:', livro.ano));
        const novoPreco = parseFloat(prompt('Novo preço:', livro.preco));
        const novosExemplares = parseInt(prompt('Novos exemplares:', livro.exemplares));

        livro.titulo = novoTitulo;
        livro.autor = novoAutor;
        livro.ano = novoAno;
        livro.preco = novoPreco;
        livro.exemplares = novosExemplares;

        salvarDados();
        atualizarTabela();
        alert('Informações do livro atualizadas com sucesso!');
    } else {
        alert('Livro não encontrado.');
    }
}

function removerLivro(id) {
    livros = livros.filter(l => l.id !== id);
    salvarDados();
    atualizarTabela();
    alert('Livro removido com sucesso!');
}

// Carrega os dados ao inicializar a página
carregarDados();
