let emprestimos = [];
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; let itens = JSON.parse(localStorage.getItem('itens')) || []; 
function abrirModalEmprestimo() {
    const modalContainer = document.getElementById('modalEmprestimoContainer');
    modalContainer.innerHTML = `
        <div class="modal" style="display: flex;">
            <div class="modal-content">
                <span class="close" onclick="fecharModalEmprestimo()">&times;</span>
                <h2>Registrar/Editar Empréstimo</h2>
                <form id="formEmprestimo" onsubmit="salvarEmprestimo(event)">
                    <label for="usuario">Usuário:</label>
                    <select id="usuario" name="usuario" required>
                        ${usuarios.map(usuario => `<option value="${usuario.nome}">${usuario.nome}</option>`).join('')}
                    </select>

                    <label for="item">Item:</label>
                    <select id="item" name="item" required>
                        ${itens.map(item => `<option value="${item.titulo}">${item.titulo}</option>`).join('')}
                    </select>

                    <label for="dataEmprestimo">Data do Empréstimo:</label>
                    <input type="date" id="dataEmprestimo" name="dataEmprestimo" required>

                    <button type="submit">Salvar</button>
                    <button type="button" onclick="fecharModalEmprestimo()">Cancelar</button>
                </form>
            </div>
        </div>
    `;
    modalContainer.style.display = 'block';
}

function fecharModalEmprestimo() {
    const modalContainer = document.getElementById('modalEmprestimoContainer');
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = '';
}

function carregarEmprestimos() {
    const emprestimosSalvos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    const tabelaEmprestimos = document.getElementById('tabelaEmprestimos').querySelector('tbody');
    tabelaEmprestimos.innerHTML = '';
    emprestimosSalvos.forEach(emprestimo => {
        const novaLinha = document.createElement('tr');
        const status = calcularStatus(emprestimo.dataEmprestimo, emprestimo.prazo);
        novaLinha.innerHTML = `
            <td>${emprestimo.usuario}</td>
            <td>${emprestimo.item}</td>
            <td>${new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</td>
            <td>${emprestimo.prazo} dias</td>
            <td>${status}</td>
            <td><button onclick="removerEmprestimo('${emprestimo.usuario}', '${emprestimo.item}')">Remover</button></td>
        `;
        tabelaEmprestimos.appendChild(novaLinha);
    });
}

function salvarEmprestimo(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const item = document.getElementById('item').value;
    const dataEmprestimo = document.getElementById('dataEmprestimo').value;
    const prazo = calcularPrazo(usuario);
    const emprestimosSalvos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    emprestimosSalvos.push({ usuario, item, dataEmprestimo, prazo });
    localStorage.setItem('emprestimos', JSON.stringify(emprestimosSalvos));
    carregarEmprestimos();
    fecharModalEmprestimo();
}

function removerEmprestimo(usuario, item) {
    let emprestimosSalvos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    emprestimosSalvos = emprestimosSalvos.filter(emprestimo => !(emprestimo.usuario === usuario && emprestimo.item === item));
    localStorage.setItem('emprestimos', JSON.stringify(emprestimosSalvos));
    carregarEmprestimos();
}

function calcularPrazo(usuario) {
    return usuario.toLowerCase().includes('professor') ? 30 : 15;
}

function calcularStatus(dataEmprestimo, prazo) {
    const dataAtual = new Date();
    const dataEmprestimoDate = new Date(dataEmprestimo);
    const dataLimite = new Date(dataEmprestimoDate);
    dataLimite.setDate(dataLimite.getDate() + prazo);

    return dataAtual <= dataLimite ? 'Dentro do Prazo' : 'Atrasado';
}

window.onload = () => {
    carregarEmprestimos();
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    itens = JSON.parse(localStorage.getItem('itens')) || [];
};
