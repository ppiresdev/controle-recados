const inputUsuario = document.getElementById(
  "inputUsuario"
) as HTMLInputElement;
const inputSenha = document.getElementById("inputSenha") as HTMLInputElement;
const btnEntrarEl = document.getElementById("btnEntrar") as HTMLInputElement;
const visibilidadeBtnEl = document.querySelector(
  "#visibilidadeBtn"
) as HTMLDivElement;

const login = (evento: Event) => {
  evento.preventDefault();

  const emailValido = validaInput(inputUsuario, padraoEmail);
  const senhaValida = validaInput(inputSenha, padraoSenha);
  const usuarioESenhaAtendemPadroes = emailValido && senhaValida;

  const usuario = inputUsuario.value;
  const senha = inputSenha.value;

  exibeMsgsPreenchimentoEmail(inputUsuario);
  exibeMsgsPreenchimentoSenha(inputSenha);
  ocultaMsgErroUsuarioInexistente();

  if (usuarioESenhaAtendemPadroes) {
    const listaUsuarios = recuperaDaLocalStorage("usuarios");
    const usuarioExistente = listaUsuarios.find(
      (us) => us.email === usuario && us.senha === senha
    );

    if (usuarioExistente) {
      gravaNaSessionStorage("usuarioCorrente", usuario);
      document.location.href = "./assets/pages/recados.html";
      return;
    }
    exibeMsgErroUsuarioInexistente();
    limparInput(inputUsuario);
    limparInput(inputSenha);
  }
};

btnEntrarEl.addEventListener("click", login);

visibilidadeBtnEl.addEventListener("click", () => {
  toggleVisibilidade(inputSenha, "icon");
});
