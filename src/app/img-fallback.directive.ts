import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]'
})
export class ImgFallbackDirective {

  @Input() appImgFallback: string;

  constructor(private eRef: ElementRef) { }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    let cleared : string = element.src.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const defaultPic = '../assets/img/const/defaultUserImage.jpg';
    if (cleared !== element.src) {
      console.log(element.src);
      element.src = cleared;
    } else {
      console.log('not changed')
      // doesn't have a profile pic
      // TODO: c'est vraiment tout cassé
      if (this.appImgFallback.includes('21belkasm')) {
        element.src = defaultPic;
      } else if (element.src.includes('21dureau')) {
        element.src = 'https://www.eleves.mines-paris.eu/static//img/trombi/21dureaude.jpg'
      } else {
        // TODO: this doesn't work because of cors
        // https://stackoverflow.com/questions/54896998/how-to-process-fetch-response-from-an-opaque-type
        // find a better way
        fetch(this.appImgFallback, {mode: "no-cors"})
          .then(res => console.log(res)) //element.src = this.appImgFallback)
          .catch(err => console.log('error')) //element.src = )
      }
    }
  }

}
