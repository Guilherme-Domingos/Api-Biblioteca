import {Request, Response} from "express"
import { Livro, livroProps } from "../modelo/livro"
import { LivroDao } from "../dao/livro.dao"
import  Logger  from "../util/logger"

export class LivroControle{

    private logger = Logger.getInstance();
    private logger2 = Logger.getInstance();

    public constructor (readonly livroDao: LivroDao){}

    public async salvarLivro(req: Request, res: Response){
        const { titulo, autor } = req.body
        const livro : Livro = Livro.build(titulo, autor)
        try{
            this.logger.info("Livro salvo no banco")
            this.livroDao.salvarLivro(livro)
            res.status(201).json({message: "Livro cadastrado com sucesso."}).send()
        }catch(erro){
            console.log("Erro ao gravar livro", erro)
            this.logger.error("erro ao salvar livro no banco")

        }
    }

        public async listarLivro(res: Response){
        try{
            const livros = await this.livroDao.listarLivro()
            res.status(200).json({livros: livros}).send()
            this.logger2.info("Listagem feita do banco")
        }catch(erro){
            console.log("Erro ao listar livro", erro)
            this.logger2.error("Erro ao listar livro")
        }
    }

    public async deletar(req: Request, res: Response){
        try {
            this.logger.info("Livro excluido do banco")
            const id = req.params.id
            await this.livroDao.deletarLivro(id)
            res.status(204).json({ message: "Livro deletado"}).send();
        } catch (error) {
            this.logger.error("erro ao excluir livro")
            console.log("Erro ao excluir livro", error)
        }
    }

    // public async atualizar(req: Request, res: Response){
    //     try {
    //         const id = req.params.id
    //         const {titulo, autor, quantidade} = req.body
    //         const livro: livroProps = {id, titulo, autor, quantidade}
    //         await this.livroDao.atualizarLivro(livro)
    //         res.status(200).send(`Livro atualizado com sucesso!`);
    //     } catch (error) {
    //         console.log("Erro ao gravar livro", error)
    //     }
    // }

    public async buscarLivro(req: Request, res:Response){
        const id  = req.params.id
        try {
            const livro = await this.livroDao.buscarLivro(id)
            res.status(200).json({livro: livro?.props}).send()
        } catch (error) {
            
        }
    }
}