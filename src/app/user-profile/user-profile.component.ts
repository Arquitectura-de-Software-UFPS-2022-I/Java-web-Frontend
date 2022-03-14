import { Firma } from "./../Modelos/Firma";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "app/Modelos/User";
import { File } from "app/Modelos/File";
import SignaturePad from "signature_pad";
import { CargarScriptsService } from "../cargar-scripts.service";
import { UsuarioService } from "app/Services/usuario.service";
import { UserAuthService } from "app/Services/user-auth.service";
import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  user: User = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : new User();
  user2: User = new User();

  obtenerImg() {
   
  }

  @ViewChild("firmaDigital", { static: true }) signaturePadElement: any;
  signaturePad: any;
  firma: any;

  cambiarColor() {
    const rojo = Math.round(Math.random() * 255);
    const verde = Math.round(Math.random() * 255);
    const azul = Math.round(Math.random() * 255);
    const color = "rgb(" + rojo + "," + verde + "," + azul + ")";
    this.signaturePad.color = color;
  }

  limpiarFirma() {
    this.signaturePad.clear();
  }

  descargar(dataURL: any, nombre: any) {
    if (navigator.userAgent.indexOf("Chrome") === -1) {
      window.open(dataURL);
    } else {
      const blob = this.URLtoBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nombre;
      this.firma = blob;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
  URLtoBlob(dataURL: any) {
    const partes = dataURL.split(";base64,");
    const contentType = partes[0].split(":")[1];
    const raw = window.atob(partes[1]);
    const rawL = raw.length;
    const array = new Uint8Array(rawL);
    for (let i = 0; i < rawL; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return new Blob([array], { type: contentType });
  }

  guardarPNG() {
    if (this.signaturePad.isEmpty()) {
      alert("Debe firmar el documento");
    } else {
      const u = this.signaturePad.toDataURL();
      this.descargar(u, "firma.png");
    }
  }

  updatefirma() {
    this.authService.update(this.user).subscribe((res) => {
      this.showNotification('bottom','right');
    });
  }

  constructor(private router: Router,private _CargaScripts: CargarScriptsService,private file: UsuarioService,private authService: UserAuthService ){
    _CargaScripts.Carga(["main2"]);
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement
    );
  }

  ngOnInit(){
    this.file.getSignatureUser(this.user.signature).subscribe((res) => {
      localStorage.setItem("img", JSON.stringify(res.file));
      this.user2.signature = res.file;
    });
  }
  title = "firmaDigital";


  showNotification(from, align) {
    const type = ["", "info", "success", "warning", "danger"];

    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "notifications",
        message: "Su información a sido actualizada exitosamente.",
      },
      {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }



}
