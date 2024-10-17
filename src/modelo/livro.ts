export type livroProps = {
    id: string,
    titulo: string,
    autor: string,
    quantidade: number
}

export class Livro{
    private constructor(readonly props: livroProps){}

    public static build(titulo: string, autor: string){
        const props: livroProps = {
            id: crypto.randomUUID().toString(),
            titulo,
            autor,
            quantidade: 0
        }

        return new Livro(props)
    }


    public static Assemble(id: string, titulo: string, autor: string, quantidade: number){
        const props: livroProps = {
            id,
            titulo,
            autor,
            quantidade: 0
        }

        return new Livro(props)
    }
}