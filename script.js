// Função para mostrar o formulário de adicionar gincana
document.getElementById("mostrarFormulario").addEventListener("click", function() {
    document.getElementById("formularioGincana").style.display = "block";
    document.getElementById("tabelaGincanas").style.display = "none";
  });
  
  // Função para mostrar a tabela de gincanas
  document.getElementById("mostrarTabela").addEventListener("click", function() {
    document.getElementById("formularioGincana").style.display = "none";
    document.getElementById("tabelaGincanas").style.display = "block";
  });
  
  // Função para adicionar gincanas à tabela
  document.getElementById("formGincana").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio tradicional do formulário
  
    // Pega os valores do formulário
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const descricao = document.getElementById("descricao").value;
  
    // Cria uma nova linha na tabela
    const tabela = document.getElementById("corpoTabela");
    const novaLinha = tabela.insertRow();
  
    // Insere as células com os valores
    novaLinha.insertCell(0).innerText = nome;
    novaLinha.insertCell(1).innerText = data;
    novaLinha.insertCell(2).innerText = hora;
    novaLinha.insertCell(3).innerText = descricao;
  
    // Limpa os campos do formulário
    document.getElementById("formGincana").reset();
  });
  