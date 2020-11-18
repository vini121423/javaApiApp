import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './../../services/categorias.service';
import { Categoria } from './../../models/Categoria';
import { ToastController } from '@ionic/angular'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})

export class AlterarPage implements OnInit {
   public id:number;
   public nome:string;
   
  constructor(
           private categoriasService:CategoriasService,
           public toast: ToastController,
		   private router: Router,
		   private route:ActivatedRoute ) { 
		   
		   this.id = this.id = Number(this.route.snapshot.paramMap.get('id'));
		   this.categoriasService.findById(this.id).subscribe(dados => {
		      this.id = dados['id'];
			  this.nome = dados['nome'];
		   });
		   
		   }

  ngOnInit() {
  }
  
  public save(){
			   if(this.nome && this.nome != ''){
				   
				  const categoria:Categoria = {
					 id:this.id,
                     nome:this.nome					 
				  };

                   this.categoriasService.put(categoria).subscribe(() =>{
					  this.presentToast('Categoria alterada com sucesso');
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
