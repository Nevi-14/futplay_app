import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController, ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

let IMAGE_DIR = null;
 
interface LocalFile {
  fileName: string;
  path: string;
  data: string;
}
@Injectable({
  providedIn: 'root'
})
export class GestorImagenesService {

  images: LocalFile[] = [];
imageURL =  "https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/Nelson-33.png";
  constructor(
    public http: HttpClient,
    private plt: Platform,
    public alertasService: AlertasService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  
  getURL( api: string, location:string ){
    let test: string = ''
    if ( !environment.prdMode ) {
   test = environment.TestURL;
    }
  const URL = environment.preURL  + test +  environment.postURL + api +  environment.locationParam + location 
 
    return URL;
  }

  private imagePost(data, location){


    const URL = this.getURL(environment.gestorImagenesURL, location);
  
    const options   = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        
      }
    };
  
    console.log(data, 'data cofere', JSON.stringify(data))
  
    return this.http.post(URL,data, options);
  
  
  }


  syncimagePost(data, location){
  
   return this.imagePost(data, location).toPromise();
    
  }

  cerrarModal(valor){
    this.modalCtrl.dismiss({
      'data':valor
    });
  }
  async loadFiles() {
    this.images = [];
 
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Datos',
    });
    await loading.present();
 
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
      this.loadFileData(result.files);
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });


  }
 
  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
 
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
 
      this.images.push({
        fileName: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
  //   this.startUpload(file)
    }
  }
 
  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
 

  async selectImage(source:string, customFileName:string, location:string) {
    IMAGE_DIR = location;
    
    let cameraSource  = null;
// Camera, Photos or Prompt!;
      switch(source){
       case 'camera':
cameraSource = CameraSource.Camera 
      break;

   case 'photos':
       cameraSource = CameraSource.Photos 
       break;

   case 'prompt':
       cameraSource = CameraSource.Prompt 
       break;

       default : 
       cameraSource = CameraSource.Photos 
       break;
       
      }

    this.reset();
    this.loadFiles()

    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: cameraSource
    });
 
    if (image) {
    return    this.saveImage(image, customFileName)
    }
}
// Create a new file from a capture image
async saveImage(photo: Photo, customFileName:string) {
  const base64Data = await this.readAsBase64(photo);

  const fileName = customFileName+ '.'+ photo.format;
  const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
  });

  // Reload the file list
  // Improve by only loading for the new image and unshifting array!
   
   return this.loadFiles();
}
 // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
 private async readAsBase64(photo: Photo) {
  if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
          path: photo.path
      });

      return file.data;
  }
  else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
  }
}
async reset(){
    
  let fileEntries = await Filesystem.readdir({
    directory: Directory.Data,
    path: `${IMAGE_DIR}`

  })

  fileEntries.files.map(async f => {

    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}`
  });
  })
}
// Helper function
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

// Convert the base64 to blob data
// and create  formData with it
async startUpload(file: LocalFile) {

  console.log(file,'filee')

  const response = await fetch(file.data);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob,file.fileName);

  this.syncimagePost(formData,IMAGE_DIR).then(resp=>{
    console.log(resp,'resp post')
    this.cerrarModal(true);
    this.deleteImage(file)

  })
/**
 *  

  this.syncimagePost(formData,file.path).then(resp=>{
    this.cerrarModal(true);
    this.deleteImage(file)

  })
 */

 // this.uploadData(formData);
}



async deleteImage(file: LocalFile) {
  await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
  });
  this.loadFiles();
 // this.presentToast('Archivo Removido');
}



}
