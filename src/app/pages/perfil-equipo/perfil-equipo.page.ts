import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { Equipos } from 'src/app/models/equipos';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarPerfilEquipoPage } from '../editar-perfil-equipo/editar-perfil-equipo.page';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { SolicitudesEquiposPage } from '../solicitudes-equipos/solicitudes-equipos.page';
import { MisEquiposPage } from '../mis-equipos/mis-equipos.page';

@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.page.html',
  styleUrls: ['./perfil-equipo.page.scss'],
})
export class PerfilEquipoPage implements OnInit {

  club: Equipos;

  add ='../assets/icons/create.svg';
 find ='../assets/icons/join.svg';
 teamPic =  this.equiposService.perfilEquipo ? 'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/'+  this.equiposService.perfilEquipo  +'?'+ this.dateF() : 'assets/team.png';
  constructor( 
    public modalCtrl: ModalController, 
    public user: UsuariosService,  
    public equiposService: EquiposService, 
    public solicitudesService:SolicitudesService,
     public actionSheetCtrl: ActionSheetController,
     private cdr: ChangeDetectorRef,
      public alertasService: AlertasService) { }

  ngOnInit() {


   // this.user.getJugadoresEquipos(this.clubs.switchClub);

  }
  ionViewWillEnter(){
    if( this.equiposService.perfilEquipo){
      this.equiposService.jugadoresPerfilEquipo = []
      this.alertasService.presentaLoading('Cargando lista de jugadores...')
      this.equiposService.SyncJugadoresEquipos( this.equiposService.perfilEquipo.Cod_Equipo).then( jugadores =>{
        this.equiposService.jugadoresPerfilEquipo = jugadores;
    this.alertasService.loadingDissmiss();
    this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
        
      }, error =>{

        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error cargando lista de jugadores...')
      })

    }

  }

     // INICIO MENU DE OPCIONES RELACIONADAS AL PERFIL DE USUARIO
  
  
     async onOpenMenu(jugador){
  console.log(jugador)
  
      const normalBtns : ActionSheetButton[] = [
        {   
           text: 'Detalle Jugador',
           icon:'person-outline',
           handler: () =>{
   this.perfilJugador(jugador);
           }
          
          },
          {   
            text: 'Convertir Administrador',
            icon:'settings-outline',
            handler: () =>{
  
            }
           
           },
           {   
            text: 'Convertir jugador regular',
            icon:'person-outline',
            handler: () =>{
   
            }
           
           },
          {   
            text: 'Remover Jugador',
            icon:'lock-closed-outline',
            handler: () =>{
        // this.gestionarContrasena();
            }
           
           },
          
           {   
            text: 'Cancelar',
            icon:'close-outline',
           role:'cancel',
           
           }
        
          ]
    
    
    
    
      const actionSheet = await this.actionSheetCtrl.create({
        header:'Opciones',
        cssClass: 'left-align-buttons',
        buttons:normalBtns,
        mode:'ios'
      });
    
    
    
    
    
    await actionSheet.present();
    
    
      }
  
      dateF(){
        return new Date().getTime() 
      }

      async presentModal(equipo) {
        const modal = await this.modalCtrl.create({
          component: EstadisticaEquipoPage,
    
          cssClass:'my-custom-css',
          componentProps:{
            equipo:equipo
          }
        });
        return await modal.present();
      }
  async perfilJugador(jugador) {
    const modal = await this.modalCtrl.create({
      component:PerfilJugadorPage,
      cssClass: 'my-custom-class',
      componentProps:{
        perfil: jugador
      }
    });
    return await modal.present();
  }

  
  async  gestionarPerfil(){

    const modal = await this.modalCtrl.create({
      component:EditarPerfilEquipoPage,
      componentProps:{
        equipo:this.equiposService.perfilEquipo
      },
      id:'perfil-equipo',
      cssClass:'my-custom-modal'
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data)
    if(data != undefined){
   /**
    *    this.userService.usuarioActual.Foto = this.userService.usuarioActual.Foto;
    */
    this.cdr.detectChanges();
    this.teamPic = 'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/'+ this.equiposService.perfilEquipo.Foto +'?'+ this.dateF();
 
    }

    }

  async solicitudesEquipos() {
    const modal = await this.modalCtrl.create({
      component:SolicitudesEquiposPage,
      cssClass:'my-custom-modal'
    });
     await modal.present();

     const { data } = await modal.onWillDismiss();
     if(data != undefined){
       
       this.equiposService.SyncJugadoresEquipos( this.equiposService.perfilEquipo.Cod_Equipo).then( jugadores =>{
         this.equiposService.jugadoresPerfilEquipo = []
         this.equiposService.jugadoresPerfilEquipo = jugadores;
     
         
       })
       
     }
  }

  async myClubsMenu(){

    const modal = await this.modalCtrl.create({
      component: MisEquiposPage,
      cssClass:'my-custom-modal'
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data != undefined){


      console.log(data.equipo,'equipoooos')
      this.equiposService.perfilEquipo  = null;
      this.equiposService.perfilEquipo = data.equipo;
      this.equiposService.perfilEquipo.Foto = data.equipo.Foto;
      this.cdr.detectChanges();
      this.teamPic = 'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/'+ this.equiposService.perfilEquipo.Foto +'?'+ this.dateF();
      console.log(this.equiposService.perfilEquipo,'this.equiposService.perfilEquipo')
      this.equiposService.SyncJugadoresEquipos( this.equiposService.perfilEquipo.Cod_Equipo).then( jugadores =>{
        this.equiposService.jugadoresPerfilEquipo = []
        this.equiposService.jugadoresPerfilEquipo = jugadores;
        this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
    
        
      })

 
   
   }

  }



}
