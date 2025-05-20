import { describe, expect } from '@jest/globals';
import AluguelLivroService from '../../services/aluguelLivroService';

const aluguelLivroService = new AluguelLivroService();

describe('Testanto AluguelLivroService', () => {
  it('Retornar a data de devolução do livro validando a quantidade de dias alugados', async () => {
    const dataAlugado = new Date('2023-01-01');
    const numeroDeDiasAlugado = 5;
    const dataDeDevolucaoMock = new Date('2023-01-06');

    const dataDeDevolucao = await aluguelLivroService
      .calcularDataDeDevolucao(dataAlugado, numeroDeDiasAlugado);

    expect(dataDeDevolucao).toStrictEqual(dataDeDevolucaoMock);
  });
});
