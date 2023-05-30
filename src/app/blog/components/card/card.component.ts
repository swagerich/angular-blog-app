import { Component, Input, OnInit, inject } from '@angular/core';
import { PublicationDto } from '../../interfaces/proyection/publicationDto.interface';
import { AuthService } from '../../auth/services/auth.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { PublicationService } from '../../services/publication-service/publication.service';
@Component({
  selector: 'blog-card-components',
  templateUrl: './card.component.html',
  animations: [
    trigger('cardHover', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'hovered',
        style({
          transform: 'scale(1.05)',
        })
      ),
      transition('normal => hovered', animate('200ms ease-in')),
      transition('hovered => normal', animate('200ms ease-out')),
    ]),
  ],
})
export class CardComponent implements OnInit {
  cardState: string = 'normal';
  onCardHover(isHovered: boolean) {
    this.cardState = isHovered ? 'hovered' : 'normal';
  }

  private authService:AuthService = inject(AuthService);
  private publicationService:PublicationService = inject(PublicationService);


  @Input()
  public publication!: PublicationDto;

  public maxLikesCount:number = 1;
  public likesCount:number = 0;

  ngOnInit(): void {
    if (!this.publication) throw new Error('Publication is indefinide!');
  }


  isUserAuthenticated() : boolean {
   return this.authService.isLoggedIn();
  }

  like(publId:number):void {
    this.publicationService.increaseLikeInPublication(publId).subscribe({
      next:(like) =>{
        this.likesCount++
      }
    })
   
  }
 

}
