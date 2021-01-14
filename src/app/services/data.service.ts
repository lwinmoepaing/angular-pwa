import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from './../logic/coffee';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public endpoint: string = 'http://localhost:5000'
  public coffeeUrl: string =`${this.endpoint}/coffee`
  public coffeeList: Coffee[] = [
    new Coffee('Hello', 'World')
  ]

  /**
   * Get Coffee Detail
   * 
   * @description we fetch coffee by id
   * @return {void}
   */
  getCoffee(coffeeId: string, callback: (param: Coffee ) => void ) {

    callback(this.coffeeList.find(coffee => coffee._id === coffeeId) as any)

    // this.http.get(`${this.coffeeUrl}/${coffeeId}`)
    //   .subscribe((res: any) => {
    //     callback(res)
    //   })
  }

  /**
   * Get Coffee list
   * 
   * @description we get this coffee list page, we goonna show coffee list array
   * @return {void} 
   */
  getList(callback: (param: Coffee[] ) => void ): void {
    
    callback(this.coffeeList)
    // this.http.get(`${this.coffeeUrl}`)
    //   .subscribe((res: any) => {
    //     const data: Coffee[] = res
    //     callback(data)
    //   })
  }

  /**
   * Save Coffee or Edit Coffee
   * 
   * @description if we want to save or edit coffeee, we use thid method
   * @return {void}
   */
  save(coffee: Coffee, callback: (isSave: boolean) => void): void {

    const isExist = this.coffeeList.some(existCoffee => coffee._id === existCoffee._id)

    if (isExist) {
      const findIndex = this.coffeeList.findIndex(data => data._id === coffee._id)
      this.coffeeList[findIndex] = coffee
    } else {
      this.coffeeList.push(coffee)
    }
    
    callback(true)

    // if (coffee._id) {
    //   this.http.put(`${this.coffeeUrl}/${coffee._id}`, coffee)
    //     .subscribe((res: any) => {
    //     })
    // } else {
    //   this.http.post(`${this.coffeeUrl}`, coffee)
    //     .subscribe((res: any) => {
    //       callback(true)
    //     })
    // }

  }
}
