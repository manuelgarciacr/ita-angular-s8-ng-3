# ItaAngularS8

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.





# Development

I have implemented the entire project using standalone components.
Bootstraping into the AppComponent.
Controls by ng-bootstrap.
Design with bootstrap too.

## Level 1 Exercise 1

Access to the REST API is performed by SwapiService.
When the connection error status is zero, the process retries twice (one test only).

## Level 1 Exercise 2

The REST API service is the same in the previous exercise.
The window is a fullscreen ng-bootstrap modal.

## Level 1 Exercise 3

Pagination is done by infinite scrolling.
Infinite scrolling is implemented with the ngx-infinite-scroll library.

## Level 1 Exercise 4

Layout

## Level 1 Exercise 5

Angular route animations with 3D css3 transformations.
The page has an HTML5 audio component synchronized with one of the animations.

## Level 1 Exercise 6

The User Service is responsible for logins, registrations, local storage, hashes, etc.
Passwords are saved in hashed format with the bcryptjs library.
Reactive forms with validations.
Small template modals for commits and errors.
If the user is not registered, the application calls the registration form with a confirmation message.
The registration form is another full screen modal component.
The registration form has a link to the login form above.

## Level 1 Exercise 7

Spaceships route protected by a canActivate function.
When you log out from within the Starships page, the app returns to the home page.

## Level 2 Exercises 8 and 9

Pilots and movies are bootstrap cards.

## Level 3 Exercise 10

Unit tests of SwapiService, StarshipsComponent and StarshipComponent.
HttpClient mocked with HttpClientTestingModule.
TestBed API.
Synchronous and asynchronous tests. (falseAsync)
ComponentFixture for testing native elements.
SpyOn on SwapiService.
Scrolling tests.

To run the tests you can write: 'npm test' on the terminal. The script and angular.json file have been modified.
