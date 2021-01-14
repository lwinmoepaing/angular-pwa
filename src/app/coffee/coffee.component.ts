import { Coffee } from './../logic/coffee';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeolocationService } from '../services/geolocation.service';
import { TastingRating } from '../logic/tasting-rating';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit, OnDestroy{


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _geolocationService: GeolocationService,
    private _coffeeDataService: DataService
  ) { }

  routeSubscription: any;
  coffee: Coffee = new Coffee();
  types: String[] = ['Espresso', 'Ristretto', 'Americano', 'Cappuccino']
  tastingEnabled: boolean = false;

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(param => {
      if (param?.id) {
        this._coffeeDataService.getCoffee(param.id, (coffee: Coffee) => {
          this.coffee = coffee
          this.tastingEnabled = this.checkTastingRating(this.coffee.tastingRating)
        })
      }
    })

    this._geolocationService.requestLocation((position) => {
      if (position.latitude) {
        this.coffee.location.latitude = position.latitude
        this.coffee.location.longitude = position.longitude
      }
    })
  }

  /**
   * On change taste rating
   * 
   * @description when tasting rating swtich toggle, we gonna set default value to each rating of taste
   * @return { void }
   */
  tastRatingChange (changes: boolean): void {
    if (!changes) this.coffee.tastingRating = new TastingRating()
  }

  /**
   * We Check There is Tasting Rating
   * 
   * @description return boolean to check there is one value
   * @return {boolean}
   */
  checkTastingRating (obj: TastingRating ): boolean {
    const keys: (keyof TastingRating)[] = Object.keys(obj) as Array<keyof TastingRating>

    return keys.some((key, index) =>  obj[key] > 0)
     
  }

  /**
   * When Save new coffee to coffee list
   * 
   * @description when user click save button to create new list of coffee
   * @return { void }
   */
  save (): void {
    this._coffeeDataService.save(this.coffee, (result) => {
      if (result) {
        this.router.navigate(['/'])
      }
    })
  }

  
  /**
   * When cancel to create new coffee
   * 
   * @description this is happen when user's canceling creating new coffee form!
   * @return { void }
   */
  cancel (): void {
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) { this.routeSubscription.unsubscribe() }
  }

}
