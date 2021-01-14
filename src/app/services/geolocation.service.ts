import { PlaceLocation } from './../logic/place-location';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  /**
   * Get Location Of Device
   * 
   * @description we request client to allow this geolocation api
   * @return {void}
   */
  requestLocation(callback: (param: any) => void): void {
    navigator.geolocation.getCurrentPosition(
      position => {  
        callback(position.coords)
      },
      err => {
        console.log('Inside: requeset location geoService => ', err)
        callback(null)
      }
    )
  }

  /**
   * Get map url (google | apple)
   * 
   * @param {PlaceLocation} location - PlaceLocation CLass
   * @return {string} - map url link
   */
  getMapLink( location: PlaceLocation ): string {
    // Universal Link
    // <a href='https://maps.google.com/?q=Eiffel+Tower'>
    // <a href='https://maps.apple.com/?q=34.44,56.44'>
    let query = ''
    if (location.latitude) {
      query = location.latitude + ',' + location.longitude
    }  else {
      query = `${location.address}, ${location.city}`
    }

    
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`
    } else {
      return `https://maps.google.com/?q=${query}`
    }

  }
}
