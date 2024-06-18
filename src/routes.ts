import { Express, Request, Response } from 'express';
import { listarAcoes, criarOrdem, cancelarOrdem, obterCarteira } from './database';

export function routes(app: Express) {
  app.get('/acoes', async (req: Request, res: Response) => {
    try {
      const acoes = await listarAcoes();
      res.json(acoes);
    } catch (error) {
      res.status(500).send('Erro ao listar ações');
    }
  });

  app.post('/ordens', async (req: Request, res: Response) => {
    const { tipo, quantidade, usuario, acao } = req.body;
    try {
      const resultado = await criarOrdem(tipo, quantidade, usuario, acao);
      res.json(resultado);
    } catch (error) {
      res.status(500).send('Erro ao criar ordem');
    }
  });

  app.delete('/ordens/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const resultado = await cancelarOrdem(id);
      res.json(resultado);
    } catch (error) {
      res.status(500).send('Erro ao cancelar ordem');
    }
  });

  app.get('/carteira/:usuario', async (req: Request, res: Response) => {
    const usuario = req.params.usuario;
    try {
      const carteira = await obterCarteira(usuario);
      res.json(carteira);
    } catch (error) {
      res.status(500).send('Erro ao obter carteira');
    }
  });
}
