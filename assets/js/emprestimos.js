let emprestimos = [];

function abrirModalEmprestimo() {
    const modalContainer = document.getElementById('modalEmprestimoContainer');
    modalContainer.innerHTML = `
        <div class="modal-overlay" onclick="fecharModalEmprestimo()"></div>
        <div class="modal-content">
            <h2>Registrar/Editar Empréstimo</h2>
            <form id="formEmprestimo" onsubmit="salvarEmprestimo(event)">
                <label for="usuario">Usuário:</label>
                <input type="text" id="usuario" name="usuario" required>
                
                <label for="item">Item:</label>
                <input type="text" id="item" name="item" required>
                
                <label for="dataEmprestimo">Data do Empréstimo:</label>
                <input type="date" id="dataEmprestimo" name="dataEmprestimo" required>
                
                <button type="submit">Salvar</button>
                <button type="button" onclick="fecharModalEmprestimo()">Cancelar</button>
            </form>
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
        novaLinha.innerHTML = `
            <td>${emprestimo.usuario}</td>
            <td>${emprestimo.item}</td>
            <td>${new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</td>
            <td>${emprestimo.prazo} dias</td>
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
    const prazo = calcularPrazo(usuario); // Use a função correta aqui
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
    return usuario.toLowerCase().includes('professor') ? 30 : 15; // Exemplo de cálculo
}

window.onload = carregarEmprestimos;
