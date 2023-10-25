import { Component, ViewChild, AfterViewInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";

@Component({
  selector: "library-app",
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements AfterViewInit {
  
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue: string;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
  }
}