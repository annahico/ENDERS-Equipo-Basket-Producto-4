import { Component, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-media-component',
  imports: [],
  templateUrl: './media-component.html',
  styleUrl: './media-component.css',
})
export class MediaComponent implements OnChanges {
  @Input()
  video?: string;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnChanges(){
    if (this.videoPlayer){
      this.videoPlayer.nativeElement.load();
    }
  }
  
  // restart(video: HTMLVideoElement){
  //   video.currentTime = 0;
  //   video.play();
  // }
}
