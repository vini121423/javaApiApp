import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './../../services/categorias.service';
import { ToastController} from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})

export class CadastrarPage implements OnInit {
   public nome;
   
  constructor(private categoriasService:CategoriasService,
           public toast: ToastController,
		   private router: Router) { }

  ngOnInit() {}
		   
		   
		   public save(){
			   if(this.nome && this.nome != ''){
				  const categoria = { nome:this.nome};

                   this.categoriasService.post(categoria).subscribe(() =>{
					  this.presentToast('Categoria cadastrada com sucesso');
                      this.router.navigateByUrl('/categorias/listar');					  
				   });				  
			   }
		   }
		   
		   
    async presentToast(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }


}
