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
    if (cleared !== element.src) {
      console.log(element.src);
      element.src = cleared;
    } else {
      fetch(this.appImgFallback, {mode: "no-cors"})
        .then(res => element.src = this.appImgFallback)
        .catch(err => element.src = '../assets/img/dev/default_profile_pic.jpg')
    }
  }

}
