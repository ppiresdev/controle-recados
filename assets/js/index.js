"use strict";
const inputUsuario = document.getElementById("inputUsuario");
const inputSenha = document.getElementById("inputSenha");
const btnEntrarEl = document.getElementById("btnEntrar");
const visibilidadeBtnEl = document.querySelector("#visibilidadeBtn");
const login = (evento) => {
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
        const usuarioExistente = listaUsuarios.find((us) => us.email === usuario && us.senha === senha);
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
