import { TastingRating } from './tasting-rating';
import { PlaceLocation } from './place-location';

export class Coffee {
    _id?: string;
    type: string = 'Espresso';
    rating!: number;
    notes: string = '';

    constructor (
        public name: string = '', 
        public place: string = '',
        public location: PlaceLocation = new PlaceLocation(),
        public tastingRating: TastingRating = new TastingRating(), 
    ) {
    }
}
 