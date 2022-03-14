import { Component, OnInit } from "@angular/core";
import { CargarScriptsService } from "app/cargar-scripts.service";
import { File } from "app/Modelos/File";
import { FileService } from "app/Services/file.service";
@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  file = new File();
  listarFile: File[] = [];

  constructor(private fileService: FileService, private _CargaScripts: CargarScriptsService) {}


  listarPDF(){
    this.fileService.getFile().subscribe((data: any) => {
      this.listarFile = data;
      console.log(this.listarFile);
    });
  }

  ngOnInit(){
    this.listarPDF();
  }
}
