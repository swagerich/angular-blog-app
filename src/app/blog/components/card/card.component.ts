import { Component, Input, OnInit } from '@angular/core';
import { PublicationDto } from '../../interfaces/proyection/publicationDto.interface';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
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

  @Input()
  public publication!: PublicationDto;

  ngOnInit(): void {
    if (!this.publication) throw new Error('Publication is indefinide!');
  }
}
