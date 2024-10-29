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

    public async deletarlivro(livro: { id: string}): Promise<void>{
        const { id } = livro;
        try {
            await con.query("DELETE FROM LIVRO WHERE id = ?", [id])
        } catch (error) {
            console.log("Erro ao deletar livro", error)
            throw error
        }
    }

    public async atualizarLivro(livro: Livro): Promise<void>{
        try {
            await con.query("UPDATE LIVRO SET titulo = ?, autor = ?, WHERE id = ?",
                [livro.props.titulo, livro.props.autor, livro.props.id])

            console.log(`Livro com id ${livro.props.id} foi atualizado com sucesso.`);
        } catch (error) {
            console.log("Erro ao deletar livro", error)
            throw error
        }
    }

    public async buscarLivro(id: string): Promise<Livro | null> {
        try {
            const [result] = await con.query<livroProps[] & RowDataPacket[]>('SELECT * FROM livro WHERE id=?', [id])

            const { titulo, autor, quantidade } = result[0]
            const livro: Livro = Livro.Assemble(id, titulo, autor, quantidade)
            return livro
        } catch (error) {
            console.log("erro ao buscar livro", error)
            throw error
        }
    }
}

