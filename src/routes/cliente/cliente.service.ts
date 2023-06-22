import { Injectable } from '@nestjs/common';
import { Observable, filter, map, of } from 'rxjs';
import { ICliente } from './icliente.interface';

@Injectable()
export class ClienteService {

    cliente:ICliente[]=[
        {
            id:1,
            nome:"alan",
            cpf:"00000000000",
            contatos:[
                {
                    email:"alan@gmail.com",
                    celular:"(21)00000-0000",
                    telefone:"(21)0000-0000"
                }
            ]

        },
        {
            id:2,
            nome:"jose",
            cpf:"00000000000",
            contatos:[
                {
                    email:"jose@gmail.com",
                    celular:"(21)00000-0000",
                    telefone:"(21)0000-0000"
                }
            ]

        },
        {
            id:3,
            nome:"silvio",
            cpf:"00000000000",
            contatos:[
                {
                    email:"silvio@gmail.com",
                    celular:"(21)00000-0000",
                    telefone:"(21)0000-0000"
                }
            ]

        }
    ];
    clientes = of(this.cliente);

    findAll(): Observable<ICliente[]>{
        return this.clientes;
    }

    findById(id:number): ICliente{
        let cliente:ICliente | null;
        this.clientes.pipe(map((c) => c.find((cl)=> cl.id == id)))
        .subscribe(resp => resp ? cliente=resp:cliente=null );
        return cliente;        
    }
    
    save(cliente:ICliente): Observable<ICliente[]>{
       this.cliente.push(cliente);
       return this.clientes;
    }

    update(id:number,cl:ICliente): Observable<ICliente[]>{
        let idx = this.cliente.findIndex((cl)=> cl.id == id);
        this.cliente[idx].nome = cl.nome;
        this.cliente[idx].cpf = cl.cpf;
        this.cliente[idx].contatos = cl.contatos;
        return this.clientes;
     }

    delete(id:number): Observable<ICliente[]>{
        let idx = this.cliente.findIndex((cl)=> cl.id == id);
        this.cliente.splice(idx, 1);
        return this.clientes;

     }
}
