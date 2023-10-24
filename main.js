// Criar uma função para gerar um número aleatório entre 1 e n
function rolarDado(n) {
  return Math.floor(Math.random() * n) + 1;
}

// Criar uma função para enviar uma mensagem no WhatsApp
function enviarMensagem(texto) {
  // Obter o elemento da caixa de texto
  var input = document.querySelector("#main > footer > div._2BU3P.tm2tP.copyable-area > div._1SEwr > div > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text");
  // Colocar o texto na caixa de texto
  input.textContent = texto;
  // Simular um evento de entrada
  var event = new Event("input", { bubbles: true });
  input.dispatchEvent(event);
  // Obter o elemento do botão de enviar
  var button = document.querySelector("#main > footer > div._2BU3P.tm2tP.copyable-area > div:nth-child(3) > button");
  // Clicar no botão de enviar
  button.click();
}

// Criar uma função para responder a uma mensagem recebida
function responderMensagem(mensagem) {
  // Verificar se a mensagem contém o comando "/rolar"
  if (mensagem.includes("/rolar")) {
    // Extrair os números dos dados da mensagem
    var dados = mensagem.split("/rolar")[1].trim().split(" ");
    // Verificar se os números são válidos
    if (dados.length == 2 && dados[0] == "20" && dados[1] == "6") {
      // Rolar os dados e somar os resultados
      var resultado = rolarDado(20) + rolarDado(6);
      // Enviar uma mensagem com o resultado
      enviarMensagem("Você rolou um dado de 20 e um dado de 6. O resultado é " + resultado + ".");
    } else {
      // Enviar uma mensagem de erro
      enviarMensagem("Comando inválido. Por favor, use o formato /rolar 20 6.");
    }
  }
}

// Criar um observador para detectar novas mensagens recebidas
var observador = new MutationObserver(function(mutacoes) {
  // Para cada mutação
  for (var i = 0; i < mutacoes.length; i++) {
    // Obter os nós adicionados
    var nos = mutacoes[i].addedNodes;
    // Para cada nó adicionado
    for (var j = 0; j < nos.length; j++) {
      // Verificar se o nó é uma mensagem recebida
      if (nos[j].classList.contains("message-in")) {
        // Obter o texto da mensagem
        var texto = nos[j].querySelector("div.copyable-text > div._3ExzF").textContent;
        // Responder à mensagem
        responderMensagem(texto);
      }
    }
  }
});

// Obter o elemento da lista de mensagens
var lista = document.querySelector("#main > div._2wjK5 > div._1_q7u > div > div");

// Configurar o observador para observar as mudanças na lista de mensagens
observador.observe(lista, { childList: true });
