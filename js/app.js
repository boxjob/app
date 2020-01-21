(function(){

//variaveis    
const btAdd = document.querySelector('#addProduct');
const btList = document.querySelector('#listProduct');
const formUI = document.querySelector('#form');
const tableUI = document.querySelector('#list');

const formUICad = document.querySelector('#cadastro');
const listUI = document.querySelector('#lista');
const modalUI = document.querySelector('#rowUpdate');
const msg = document.querySelector('.alert');
let arrayProdutos = [];



//functions

//tira a msg de envio dos dados
const outMsg = () => {
    msg.style.display = 'none';
}
//temporizador da msg
const msgSend = () =>{
    setTimeout(outMsg, 3000);
}
//cria o registro em localStorage 
const createProduto = (dados) => {
    arrayProdutos.push(dados);
    msg.style.display = 'block';
    msgSend();
} 
//salva os dados em localStorage
const salveDB = () =>{
    localStorage.setItem('produto', JSON.stringify(arrayProdutos));
    printTable();
}
// carrega a lista 
const printTable = () => {
    listUI.innerHTML = ``;

    arrayProdutos = JSON.parse(localStorage.getItem('produto'));

    if( arrayProdutos === null){
        arrayProdutos = [];
    }
    else {
        arrayProdutos.forEach( el => {
            listUI.innerHTML += `
            <tr>
                <th scope="row">${el.cod}</th>
                <td>${el.categoria}</td>
                <td>${el.nome}</td>
                <td>${el.fornecedor}</td>
                <td id="valor">${el.valor}</td>
                <td>
                <i class="material-icons mr-3" >edit</i>
                <i class="material-icons">delete</i></span>
                </td>        
            </tr>
            `;
        });
    }
}

//delete item da lista
const deleteDb = (row) => {
    let indexArray;
    arrayProdutos.forEach((el, i)=>{
        if (el.cod === row){
            indexArray = i;
        }
    });
    arrayProdutos.splice(indexArray,1);
    salveDB();
}

//edita item da lista
const editDB = (row) => {
    let indexArray;
    arrayProdutos.forEach((el, i)=>{
        if (el.cod === row){
            indexArray = i;

            $('#exampleModal').modal('show');
            modalUI.innerHTML =`
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Produto: ${el.nome}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            
                            <div class="form-group">
                            <label class="text-muted" for="cod" >Código do Produto</label>
                            <input type="text" class="form-control" name="cod" id="codUpdate" value="${el.cod}">
                            </div>

                            <div class="form-group">
                            <label class="text-muted" for="categoria">Categoria do Produto</label>
                            <input type="text" class="form-control" name="categoria" id="categoriaUpdate" value="${el.categoria}">
                            </div>

                            <div class="form-group">
                            <label class="text-muted" for="nome">Nome do Produto</label>
                            <input type="text" class="form-control" name="nome" id="nomeUpdate" value="${el.nome}">
                            </div>

                            <div class="form-group">
                            <label class="text-muted" for="produto">Nome do Fornecedor</label>
                            <input type="text" class="form-control" name="fornecedor" id="fornecedorUpdate" value="${el.fornecedor}">
                            </div>

                            <div class="form-group">
                            <label class="text-muted" for="valor">Valor do Produto</label>
                            <input type="text" class="form-control" name="valor" id="valorUpdate" value="${el.valor}">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="update" class="btn btn-primary" data-dismiss="modal">Atualizar</button>
                    </div>
                </div>
            `;

            //envia update
            const updateUI = document.querySelector('#update');
            updateUI.addEventListener('click', (e) => {
                e.preventDefault();
                
                let cod = document.querySelector('#codUpdate').value;
                let categoria = document.querySelector('#categoriaUpdate').value;
                let nome = document.querySelector('#nomeUpdate').value;
                let fornecedor = document.querySelector('#fornecedorUpdate').value;
                let valor = document.querySelector('#valorUpdate').value;

                let dadosUpdate = {
                    cod: cod,
                    categoria: categoria,
                    nome: nome,
                    fornecedor: fornecedor,
                    valor: valor
                }
                arrayProdutos[indexArray] = dadosUpdate;
                salveDB();
                formUICad.reset();
            });
        }
    });    
}

//events
formUICad.addEventListener('submit', (e) => {
    e.preventDefault();

    let cod = document.querySelector('#cod').value;
    let categoria = document.querySelector('#categoria').value;
    let nome = document.querySelector('#nome').value;
    let fornecedor = document.querySelector('#fornecedor').value;
    let valor = document.querySelector('#valor').value;

    let dados = {
        cod: cod,
        categoria: categoria,
        nome: nome,
        fornecedor: fornecedor,
        valor: valor
    } 

    createProduto(dados);
    salveDB();
    formUICad.reset();
});

document.addEventListener('DOMContentLoaded', printTable);

listUI.addEventListener('click', (e) => {
    e.preventDefault();

    let row = e.path[2].cells[0].innerHTML;
    
    if( e.target.innerHTML === 'edit' || e.target.innerHTML === 'delete'){
        if(e.target.innerHTML === 'edit'){
            editDB(row);
        }
        if(e.target.innerHTML === 'delete'){
            deleteDb(row);
        }
    }
});


btAdd.addEventListener('click', e =>{
    e.preventDefault();
    tableUI.style.display = "none";
    formUI.style.display = "block";
});

btList.addEventListener('click', e =>{
    e.preventDefault();
    tableUI.style.display = "block";
    formUI.style.display = "none";
});

})();




