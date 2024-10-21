let usuarios = [];

function abrirModalUsuario() {
    const modalContainer = document.getElementById('modalUsuarioContainer');
    modalContainer.innerHTML = `
        <div class="modal-overlay" onclick="fecharModalUsuario()"></div>
        <div class="modal-content">
            <h2>Adicionar/Editar Usuário</h2>
            <form id="formUsuario" onsubmit="salvarUsuario(event)">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>
                
                <label for="tipo">Tipo de Usuário:</label>
                <select id="tipo" name="tipo" required>
                    <option value="aluno">Aluno</option>
                    <option value="professor">Professor</option>
                    <option value="visitante">Visitante</option>
                </select>
                
                <button type="submit">Salvar</button>
                <button type="button" onclick="fecharModalUsuario()">Cancelar</button>
            </form>
        </div>
    `;
    modalContainer.style.display = 'block';
}

function fecharModalUsuario() {
    const modalContainer = document.getElementById('modalUsuarioContainer');
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = '';
}

function carregarUsuarios() {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tabelaUsuarios = document.getElementById('tabelaUsuarios').querySelector('tbody');
    tabelaUsuarios.innerHTML = '';
    usuariosSalvos.forEach(usuario => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.tipo}</td>
            <td><button onclick="removerUsuario(this)">Remover</button></td>
        `;
        tabelaUsuarios.appendChild(novaLinha);
    });
}

function salvarUsuario(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosSalvos.push({ nome, tipo });
    localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
    carregarUsuarios();
    fecharModalUsuario();
}

function removerUsuario(button) {
    const linha = button.parentNode.parentNode;
    const nome = linha.children[0].textContent;
    let usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosSalvos = usuariosSalvos.filter(usuario => usuario.nome !== nome);
    localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
    carregarUsuarios();
}

window.onload = carregarUsuarios;

function editarUsuario(nome) {
    alert(`Simulação de edição para o usuário: ${nome}`);
}

function removerUsuario(button) {
    const linha = button.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}