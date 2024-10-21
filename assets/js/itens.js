let itens = [];

function abrirModalItem() {
    const modalContainer = document.getElementById('modalItemContainer');
    modalContainer.innerHTML = `
        <div class="modal-overlay" onclick="fecharModalItem()"></div>
        <div class="modal-content">
            <h2>Adicionar/Editar Item</h2>
            <form id="formItem" onsubmit="salvarItem(event)">
                <label for="titulo">Título:</label>
                <input type="text" id="titulo" name="titulo" required>
                
                <label for="autor">Autor/Diretor:</label>
                <input type="text" id="autor" name="autor" required>
                
                <label for="ano">Ano de Publicação:</label>
                <input type="number" id="ano" name="ano" required>
                
                <label for="quantidade">Quantidade Disponível:</label>
                <input type="number" id="quantidade" name="quantidade" required>
                
                <label for="tipo">Tipo de Item:</label>
                <select id="tipo" name="tipo" required>
                    <option value="livro">Livro</option>
                    <option value="revista">Revista</option>
                    <option value="dvd">DVD</option>
                </select>
                
                <button type="submit">Salvar</button>
                <button type="button" onclick="fecharModalItem()">Cancelar</button>
            </form>
        </div>
    `;
    modalContainer.style.display = 'block';
}

function fecharModalItem() {
    const modalContainer = document.getElementById('modalItemContainer');
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = '';
}

function carregarItens() {
    const itensSalvos = JSON.parse(localStorage.getItem('itens')) || [];
    const tabelaItens = document.getElementById('tabelaItens').querySelector('tbody');
    tabelaItens.innerHTML = '';
    itensSalvos.forEach(item => {
        const novaLinha = document.createElement('tr');
        novaLinha.classList.add(item.tipo);
        novaLinha.innerHTML = `
            <td>${item.titulo}</td>
            <td>${item.autor}</td>
            <td>${item.ano}</td>
            <td>${item.quantidade}</td>
            <td>${item.tipo}</td>
            <td><button onclick="removerItem(this)">Remover</button></td>
        `;
        tabelaItens.appendChild(novaLinha);
    });
}

function salvarItem(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = document.getElementById('ano').value;
    const quantidade = document.getElementById('quantidade').value;
    const tipo = document.getElementById('tipo').value;
    const itensSalvos = JSON.parse(localStorage.getItem('itens')) || [];
    itensSalvos.push({ titulo, autor, ano, quantidade, tipo });
    localStorage.setItem('itens', JSON.stringify(itensSalvos));
    carregarItens();
    fecharModalItem();
}

function removerItem(button) {
    const linha = button.parentNode.parentNode;
    const titulo = linha.children[0].textContent;
    let itensSalvos = JSON.parse(localStorage.getItem('itens')) || [];
    itensSalvos = itensSalvos.filter(item => item.titulo !== titulo);
    localStorage.setItem('itens', JSON.stringify(itensSalvos));
    carregarItens();
}

window.onload = carregarItens;
