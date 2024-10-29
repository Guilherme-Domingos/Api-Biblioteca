import {Request, Response} from "express"
import { Livro } from "../modelo/livro"
import { LivroDao } from "../dao/livro.dao"
 
export class LivroControle{

    public constructor (readonly livroDao: LivroDao){}

    public async salvarLivro(req: Request, res: Response){
        const { titulo, autor } = req.body
        const livro : Livro = Livro.build(titulo, autor)
        try{
           this.livroDao.salvarLivro(livro)
            res.status(201).json({message: "Livro cadastrado com sucesso."}).send()
        }catch(erro){
            console.log("Erro ao gravar livro", erro)
        }
    }

        public async listarLivro(res: Response){
        try{
            const livros = await this.livroDao.listarLivro()
            res.status(200).json({livros: livros}).send()
        }catch(erro){
            console.log("Erro ao listar livro", erro)
        }
    }

    public async deletarLivro(req: Request, res: Response){
        const {id} = req.params
        try {
            
            await this.livroDao.deletarlivro({id})
            res.status(204).json({ message: "Livro deletado"}).send();
        } catch (error) {
            console.log("Erro ao gravar livro", error)
        }
    }

    public async atualizarLivro(req: Request, res: Response){
        const { titulo, autor } = req.body
        const livro : Livro = Livro.build(titulo, autor)
        try {
            await this.livroDao.atualizarLivro(livro)
            res.status(200).send(`Livro atualizado com sucesso!`);
        } catch (error) {
            console.log("Erro ao gravar livro", error)
        }
    }

    public async buscarLivro(req: Request, res:Response){
        const id  = req.params.id
        try {
            const livro = await this.livroDao.buscarLivro(id)
            res.status(200).json({livro: livro?.props}).send()
        } catch (error) {
            
        }
    }
}