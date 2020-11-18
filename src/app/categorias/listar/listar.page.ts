import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './../../services/categorias.service';
import { Categoria } from './../../models/Categoria';
import { AlertController, ToastController} from '@ionic/angular'; 

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})

export class ListarPage implements OnInit {
  public listaCategorias = [];
  
  constructor(
    private categoriasService:CategoriasService,
	public toast :ToastController,
	public alert: AlertController
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
	this.loadList();  
  }
  
  public loadList(){
	this.categoriasService.list().subscribe(dados =>{
	  this.listaCategorias = dados['content'];
	  this.presentToast('Categorias listadas com sucesso!');
	});  
  }
  
  public deletar(id:number){
	this.categoriasService.deleteItem(id).subscribe(dados=>{
	 this.presentToast('Categoria deletada com sucesso!');
     this.loadList(); 	 
	});  
  }
  
  async presentAlertConfirm(id) {
    const alert = await this.alert.create({
      header: 'Atenção',
      message: 'Deseja realmente excluir essa categoria? <strong>ID: ${id} </strong>!',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sim',
          handler: () => {
            this.deletar(id);
          }
        }
      ]
    });

    await alert.present();
  }
  
    async presentToast(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}