import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rank-avatar',
  templateUrl: './rank-avatar.component.html',
  styleUrls: ['./rank-avatar.component.css']
})
export class RankAvatarComponent implements OnInit {

  @Input() rank: number;
  @Input() avatarUrl: string;
  defaultUrl = 'assets/images/default-avatar.JPG';
  ringColorClass: string = "default-border";
  rankBagdeUrl: string;
  isAmongFirstThree: boolean;
  badgeHeightClass: string;

  constructor() { }

  ngOnInit(): void {
    this.setupRankColorsAndBagdes();
  }

  setupRankColorsAndBagdes() {
    if(this.rank != null) {
      switch (this.rank) {
        case 1: {
          this.ringColorClass = "first-place-border";
          this.rankBagdeUrl = "assets/icons/cc-badge-gold.png";
          this.isAmongFirstThree = true;
          this.badgeHeightClass = "f-height";
          break;        
        }
        case 2: {
          this.ringColorClass = "second-place-border";
          this.rankBagdeUrl = "assets/icons/cc-badge-silver.png";
          this.isAmongFirstThree = true;
          this.badgeHeightClass = "nf-height";
          break;           
        } 
        case 3: {
          this.ringColorClass = "third-place-border";
          this.rankBagdeUrl = "assets/icons/cc-badge-bronze.png";
          this.isAmongFirstThree = true;
          this.badgeHeightClass = "nf-height";
          break;  
        }
      }      
    }
  }

}
