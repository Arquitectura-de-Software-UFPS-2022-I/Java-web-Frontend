import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { CargarScriptsService } from "../cargar-scripts.service";

declare var $: any;
export interface Emails{
  name: string;
}
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
}) 

export class TypographyComponent implements OnInit, AfterViewInit{


@ViewChild('firmaDigital', {static: true}) signaturePadElement: any;
signaturePad: any;
firma: any;

cambiarColor(){
  const rojo = Math.round(Math.random() * 255);
  const verde = Math.round(Math.random() * 255);
  const azul = Math.round(Math.random() * 255);
  const color = 'rgb('+rojo+','+verde+','+azul+')';
  this.signaturePad.color = color;
}

limpiarFirma(){
  this.signaturePad.clear();
}


descargar(dataURL: any, nombre: any){
  if(navigator.userAgent.indexOf('Chrome')=== -1){
    window.open(dataURL);
  }else{
    const blob =this.URLtoBlob(dataURL);
    const url =window.URL.createObjectURL(blob)
    const a =document.createElement('a');
    a.href=url;
    a.download=nombre;
    this.firma=blob;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
URLtoBlob(dataURL: any){
  const partes =dataURL.split(';base64,');
  const contentType = partes[0].split(':')[1];
  const raw = window.atob(partes[1]);
  const rawL =raw.length;
  const array = new Uint8Array(rawL);
  for(let i = 0; i<rawL; i++){
    array[i] = raw.charCodeAt(i);
  }
  return new Blob([array],{type: contentType});
}

guardarPNG(){
  if(this.signaturePad.isEmpty()){
    alert('Debe firmar el documento');
  }else{
    const u = this.signaturePad.toDataURL();
    this.descargar(u,'firma.png');

  }
}








constructor(private router: Router, private _CargaScripts: CargarScriptsService) {
  _CargaScripts.Carga(["main"]);
}

ngAfterViewInit():void {
  this.signaturePad= new SignaturePad(this.signaturePadElement.nativeElement);
}

ngOnInit(){
  
}
  title = 'firmaDigital';




  mostrar(){
    alert("mostrar");
  }

   
  




// cerrarFirma() {
//   $("#box-firm").removeAttr("class");
// }
//  mostrarFirmaCertificadoInPa() {
//   $(".firmaInPa").css("display", "revert")
//   this.estadoFirma = "CERTIFICADO";
// }

// mostrarFirmaConsentimientoInPa() { 
//   $(".firmaInPa").css("display", "revert")
//   this.estadoFirma = "CONSENTIMIENTO";
// }


showNotification(from, align){
  const type = ['','info','success','warning','danger'];

  const color = Math.floor((Math.random() * 4) + 1);

  $.notify({
      icon: "notifications",
      message: "Petición enviada exitosamente"

  },{
      type: type[color],
      timer: 4000,
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}


}
