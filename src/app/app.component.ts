import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EstadoCivil } from './model/estadoCivil.model';
import { Estado } from './model/estado.model';
import { ClienteConsultaService } from './services/cliente-consulta.service';
import { Cliente } from './model/cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: "Consulta Clientes";
  clientes : Cliente[] = [];
  cliente: any;
  cpfBusca: String;

  // carrega estado civil
  estadosCivil: EstadoCivil[] = [
    { name: 'Solteiro' },
    { name: 'Casado' },
    { name: 'Divorciado' },
    { name: 'Viuvo' }
  ];

  // Carrega os estados
  estadosLista: Estado[] = [
    { name: 'AC', label: 'Acre' },
    { name: 'AL', label: 'Alagoas' },
    { name: 'AP', label: 'Amapá' },
    { name: 'AM', label: 'Amazonas' },
    { name: 'BA', label: 'Bahia' },
    { name: 'CE', label: 'Ceará' },
    { name: 'DF', label: 'Distrito Federal' },
    { name: 'ES', label: 'Espírito Santo' },
    { name: 'GO', label: 'Goiás' },
    { name: 'MA', label: 'Maranhão' },
    { name: 'MT', label: 'Mato Grosso' },
    { name: 'MS', label: 'Mato Grosso do Sul' },
    { name: 'MG', label: 'Minas Gerais' },
    { name: 'PA', label: 'Pará' },
    { name: 'PB', label: 'Paraíba' },
    { name: 'PR', label: 'Paraná' },
    { name: 'PE', label: 'Pernambuco' },
    { name: 'PI', label: 'Piauí' },
    { name: 'RJ', label: 'Rio de Janeiro' },
    { name: 'RN', label: 'Rio Grande do Norte' },
    { name: 'RS', label: 'Rio Grande do Sul' },
    { name: 'RO', label: 'Rondônia' },
    { name: 'RR', label: 'Roraima' },
    { name: 'SC', label: 'Santa Catarina' },
    { name: 'SP', label: 'São Paulo' },
    { name: 'SE', label: 'Sergipe' },
    { name: 'TO', label: 'Tocantins' }
  ];

  constructor(private service: ClienteConsultaService) {  }

  ngOnInit() {
    this.cliente = {};

    // Carrega lista dos clientes cadastrados
    this.service.listar()
      .subscribe(resposta => this.clientes = resposta);
  }

  // Cadastrar novo cliente
  novo(frm: FormGroup) {
    this.service.novo(this.cliente).subscribe(resposta => {
      this.clientes.push(resposta);

      frm.reset();
    });
  }

  // Busca cliente cadastrado pelo cpf
  busca() {  
    if (this.cpfBusca) {
      this.clientes = this.clientes.filter(res=>{
        return res.cpf.match(this.cpfBusca.toString()); 
      });
    } else {
      this.ngOnInit();
    }    
  }
}
