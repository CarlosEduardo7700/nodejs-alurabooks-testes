import { describe, expect } from '@jest/globals';
import AuthService from '../../services/authService';

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
});
