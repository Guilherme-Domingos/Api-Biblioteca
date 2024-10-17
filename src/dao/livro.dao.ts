import { RowDataPacket } from "mysql2"
import { Livro, livroProps } from "../modelo/livro"
import con from "../util/conexao" 

export class LivroDao{

    public async salvarLivro(livro: Livro){
        try{
    
            await con.query("INSERT INTO LIVRO (id, titulo, autor, quantidade) VALUES(?,?,?,?)", [livro.props.id, livro.props.titulo, livro.props.autor, livro.props.quantidade])
        }catch(erro){
            console.log("Erro ao gravar livro", erro)
            throw erro
        }
    }
    
    public async listarLivro(): Promise<Livro[]>{
        try{
            const [ result ] = await con.query<livroProps[] & RowDataPacket[]>("SELECT * FROM LIVRO")
            const livros: Livro[] = result.map((livro) =>{
                const { id, titulo, autor, quantidade } = livro
                return Livro.Assemble(id, titulo, autor, quantidade)
            })
            return livros
        }catch(erro){
            console.log("Erro ao gravar livro", erro)
            throw erro
        }
    }


}

