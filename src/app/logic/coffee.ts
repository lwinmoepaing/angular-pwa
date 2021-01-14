import { TastingRating } from './tasting-rating';
import { PlaceLocation } from './place-location';
import { generate } from 'short-uuid';


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
        this._id = this._id ? this._id : generate()
    }
}
 