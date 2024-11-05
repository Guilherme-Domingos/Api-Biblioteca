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

    public emprestar(): boolean{
        if(this.props.quantidade>0){
            this.props.quantidade--
            return true
        }
        return false
    }

    public get id(){
        return this.props.id
    }

    public get titulo(){
        return this.props.titulo
    }

    public get autor(){
        return this.props.autor
    }

    public get quantidade(){
        return this.props.quantidade
    }
}