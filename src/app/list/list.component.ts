import { Router } from '@angular/router';
import { Coffee } from './../logic/coffee';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private _dataService: DataService, 
    private router: Router,
    private _geolocationService: GeolocationService  
  ) { }

  list: Coffee[] = []

  ngOnInit(): void {
    this._dataService.getList((_coffee) => {
      this.list = _coffee
    })
  }

  /**
   * Go Map (Show Map)
   * 
   * @description when click map action, we route to map page
   * @return {void}
   */
  goMap(coffee: Coffee): void {
    const mapUrl = this._geolocationService.getMapLink(coffee.location)
    location.href = mapUrl
  }

  /**
   * Share this coffee
   * 
   * @description when click share action, we share this data for social
   * @return {void}
   */
  share(coffee: Coffee): void {
    const shareText = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee.`
    if ('share' in navigator) {
        (navigator as any).share({
          title: coffee.name,
          text: shareText,
          url: window.location.href
        })
          .then(() => console.log('Successfully share'))
          .catch((e :any) => console.log('Error Sharing: ', e))
    } else {
      const shareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`
      location.href = shareUrl
    }
  }

  /**
   * Go Detail Page
   * 
   * @description when click more detail actions, we route to detail page
   * @return {void}
   */
  goDetail(coffee: Coffee): void {
    this.router.navigate(['/coffee',  coffee._id])
  }

}
