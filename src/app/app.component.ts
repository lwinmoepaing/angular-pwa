import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Coffee Shop - for coffee lovers';

  constructor( private snackbar: MatSnackBar ) {}

  ngOnInit(): void {

    const navi = (navigator as any)
    if (navi.standalone == false) {
      this.snackbar.open('You can add this pwa to home screen.', '!!', { duration: 3000 })
    }


    if (navi.standalone == undefined ) {
      // If not IOS
      if (window.matchMedia("(display-mode: browser)").matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();

          const sb = this.snackbar.open('Do you want to install this app.', 'Yes', { duration: 5000 })
          sb.onAction().subscribe( () => {
            (event as any).prompt();
            (event as any).userChoice.then( (result: any) => {
              if (result.outcome === 'dismissed') {
                // Todo: Track no installation
              } else {
                // Todo: It's installed.
              }
            });
            
          })
        })

      }
    }
  }

  
}
