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

        public  async  listarLivro(res: Response){
        try{
            const livros = await this.livroDao.listarLivro()
            res.status(200).json({livros: livros}).send()
        }catch(erro){
            console.log("Erro ao gravar livro", erro)
        }
    }
}