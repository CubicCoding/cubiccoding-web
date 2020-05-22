import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[cc-avatar-preloader]',
  host: {
    '[attr.src]': 'finalImage'
  }
})
export class ImagePreloaderDirective implements OnInit {
  @Input('cc-avatar-preloader') targetSource: string;

  downloadingImage : any;
  finalImage: any;

  //default avatar if no cloudinary url is set..
  @Input() preloadGif: string = 'assets/images/preloader.gif';

  constructor() { }

  ngOnInit() {
    //display loading gif while avatar is loading..
    this.finalImage = this.preloadGif;

    this.downloadingImage = new Image();
    this.downloadingImage.onload = () => {
      this.finalImage = this.targetSource;//switch the host attribute once the avatar is downloaded..
    }

    //assign the src to cloudinary url (or default avatar). This will trigger the onload() in the background..
    this.downloadingImage.src = this.targetSource;
  }
}
