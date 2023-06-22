import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ICliente } from './icliente.interface';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {

    constructor(private readonly clienteService: ClienteService) { }

    @Get()
    findAll(@Res() response): Array<ICliente> {
        let clientes: ICliente[] = [];
        this.clienteService.findAll()
            .subscribe({
                next: (resp) => clientes = resp,
                error: (err) => console.log(JSON.stringify(err, null, 2))
            });
        return response.status(200).json(clientes);
    }

    @Get("/:id")
    findById(@Res() response, @Param("id") id: string){
        let resp = this.clienteService.findById(Number(id));
        if(resp != null){
            return response.status(200).json(resp) 
        }else{
            return response.status(404).json({erro:"cliente não encontrado :("}) 
        }
    }

    @Post()
    save(@Res() response, @Body() cliente:ICliente): ICliente[]{
        let clientes:ICliente[]=[];
        this.clienteService.save(cliente)
        .subscribe({
            next:(resp)=> clientes = resp
        })
        return response.status(201).json(clientes) 
    }

    @Put("/:id")
    update(@Res() response, @Param("id") id:string, @Body() cliente:ICliente): ICliente[]{
        let clientes:ICliente[]=[];
        this.clienteService.update(Number(id), cliente)
        .subscribe({
            next:(resp)=> clientes = resp
        })
        return response.status(201).json(clientes) 
    }

    @Delete("/:id")
    delete(@Res() response, @Param("id") id:number): ICliente[]{
        let clientes:ICliente[]=[];
        this.clienteService.delete(id)        
        .subscribe({
            next:(resp)=> clientes = resp
        })
        return response.status(200).json(clientes);
    }
}
