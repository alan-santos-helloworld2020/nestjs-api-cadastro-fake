export interface ICliente {
    id:number;
    nome:string;
    cpf:string;
    contatos:[
        {
            email:string;
            telefone:string;
            celular:string;
        }
    ];
    
}
