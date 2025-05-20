import { describe, expect } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import AuthService from '../../services/authService';
import Usuario from '../../models/usuario';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuário deve possui um nome, email e senha', async () => {
    // arrage
    const usuarioMock = {
      nome: 'Eduardo',
      email: 'eduardo@email.com',
    };

    // act
    const usuarioCadastrado = authService.cadastrarUsuario(usuarioMock);

    // assert
    await expect(usuarioCadastrado).rejects.toThrowError('A senha é um campo obrigatório!');
  });

  it('A senha do usuário precisa ser criptografada quando for salva no banco de dados', async () => {
    const usuarioMock = {
      nome: 'Eduardo',
      email: 'eduardo@email.com',
      senha: 'Senha@123',
    };

    const usuarioCadastrado = await authService.cadastrarUsuario(usuarioMock);

    const asSenhasSaoIguais = await bcryptjs.compare('Senha@123', usuarioCadastrado.content.senha);

    expect(asSenhasSaoIguais).toStrictEqual(true);

    await Usuario.excluir(usuarioCadastrado.content.id);
  });

  it('Ao cadastrar um usuário deve ser retornada uma mensagem informando que o cadastro foi realizado', async () => {
    const usuarioMock = {
      nome: 'Eduardo',
      email: 'eduardo@email.com',
      senha: 'Senha@123',
    };

    const usuarioCadastrado = await authService.cadastrarUsuario(usuarioMock);

    expect(usuarioCadastrado.message).toEqual('usuario criado');

    await Usuario.excluir(usuarioCadastrado.content.id);
  });

  it('Ao cadastrar um usuário, validar o retorno das informações do usuário.', async () => {
    const usuarioMock = {
      nome: 'Eduardo',
      email: 'eduardo@email.com',
      senha: 'Senha@123',
    };

    const usuarioCadastrado = await authService.cadastrarUsuario(usuarioMock);

    expect(usuarioCadastrado.content).toMatchObject(usuarioMock);

    await Usuario.excluir(usuarioCadastrado.content.id);
  });
});
