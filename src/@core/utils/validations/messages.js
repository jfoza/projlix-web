export const messages = {
  requiredField: 'Campo obrigatório.',
  invalidEmail: 'E-mail inválido.',
  invalidCPF: 'CPF inválido.',
  invalidCNPJ: 'CNPJ inválido.',
  CNPJAlreadyExists: 'Este CNPJ já está cadastrado em nosso sistema.',
  invalidPhone: 'Telefone inválido.',
  invalidPassword: 'A senha digitada não está de acordo com as regras acima.',
  invalidPasswordConfirmation: 'O campo confirmação de senha deve ser igual ao campo senha.',
  invalidUrl: 'URL inválida.',
  hasSpecialChars: field => `O campo ${field} não pode conter caracteres especiais.`,

  successSave: 'Dados salvos com sucesso',
  errorUploadImage: 'Não foi possível realizar o upload da imagem para este registro, caso o erro persista, entre em contato com o suporte.',
  successDelete: 'Registro excluído com sucesso.',
  impossible: 'Não foi possível realizar a sua solicitação no momento.</br> Caso o erro persista, contate o suporte.',
  error: 'Não foi possível realizar a sua solicitação, contate o suporte',
  invalidTokenForgotPassword: 'Token de verificação inválido, por favor solicite uma nova troca de senha!',
  tokenForgotPasswordNotFound: 'Token de verificação não encontrado!',

  confirmDelete: 'Deseja excluir este registro ?',
  confirmMyStatusUpdate: 'Deseja inativar a si mesmo ?<br>Caso deseje prosseguir, seu perfil será inativado '
      + 'e você não conseguirá mais acessar o sistema até que um perfil superior modifique seu status novamente.',
  confirmDeleteUserChurch: 'Deseja remover o vínculo deste usuário com esta igreja ?',
  confirmGenerateNewPassword: 'Tem certeza que deseja gerar uma nova senha para este usuário ?',

  confirmRemoveUserAvatar: 'Deseja remover a imagem de perfil deste usuário ?',

  confirmUpdateMemberStatus: {
    title1: 'Tem certeza que deseja inativar ?',
    title2: 'Tem certeza que deseja ativar ?',
    value: 'Essa ação irá afetar o acesso deste usuário à plataforma.',
  },

  confirmUpdateManyDepartmentsStatus: {
    title: 'Tem certeza que deseja alterar estes registros ?',
    value: 'Essa ação irá afetar a visualização das categorias e produtos vinculados. <br>Departamentos ativos serão inativados.<br>Departamentos inativos serão ativados novamente.',
  },

  confirmUpdateUniqueDepartmentStatus: {
    title1: 'Tem certeza que deseja inativar ?',
    title2: 'Tem certeza que deseja ativar ?',
    value: 'Essa ação irá afetar a visualização de produtos e categorias vinculadas a este departamento.',
  },

  confirmUpdateManyCategoriesStatus: {
    title: 'Tem certeza que deseja alterar estes registros ?',
    value: 'Essa ação irá afetar a visualização dos produtos vinculados a esta(s) categoria(s). <br>Categorias ativas serão inativadas.<br>Categorias inativas serão ativadas novamente.',
  },

  confirmUpdateUniqueCategoryStatus: {
    title1: 'Tem certeza que deseja inativar ?',
    title2: 'Tem certeza que deseja ativar ?',
    value: 'Essa ação irá afetar a visualização de produtos vinculados a esta categoria.',
  },

  confirmUpdateManyProductsStatus: {
    title: 'Tem certeza que deseja alterar estes registros ?',
    value: 'Essa ação irá afetar a visualização deste(s) produto(s) na área pública. <br>Produtos ativos serão inativados.<br>Produtos inativos serão ativados novamente.',
  },

  confirmUpdateUniqueProductStatus: {
    title1: 'Tem certeza que deseja inativar ?',
    title2: 'Tem certeza que deseja ativar ?',
    value: 'Essa ação irá afetar a visualização deste produto na área pública.',
  },

  countField: value => `Este campo deve conter no mínimo ${value} caracteres.`,
}
