# pjToast [![Build Status](https://travis-ci.org/peterjurkovic/pjToast.svg)](https://travis-ci.org/peterjurkovic/pjToast)


pjToast is a simple Angular module for toast notifications. This Toast notification is inspired by [ngToast](http://tamerayd.in/ngToast/) with following significant differences:

* The notification message is positioned absolute (to the center of screen)
* Only one message is shown in given time (other additional messages are in the queue)
* Bootstrap icons integrated

**[See Demos](http://pjtoast.peterjurkovic.sk/)**

![Toast example](http://pjtoast.peterjurkovic.sk/toast-example.png)

## Usage

1. Install via [Bower](http://bower.io/):
  ```javascript
  bower install pjToast --save
  ```
  
2. Integration
  Include pjToast source files and dependencies ([Bootstrap CSS](http://getbootstrap.com/)):
  ```html
  <link rel="stylesheet" href="bower/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="bower/pjToast/pjToast.min.css">
  
  <script src="bower/pjToast/pjToast.min.js"></script>
  ```
3. Place toast element into your HTML:

  ```html
  <body>
    <toast></toast>
    ...
  </body>
  ```

4. Inject `Toast` factory in your controller:
  ```javascript
  app.controller('myCtrl', ['Toast', function(Toast) {
    Toast.success('This is your toast message!');
  }]);
  ```

### Toast methods


![Toast example](http://pjtoast.peterjurkovic.sk/toast-info.png)
![Toast example](http://pjtoast.peterjurkovic.sk/toast-warning.png)
![Toast example](http://pjtoast.peterjurkovic.sk/toast-danger.png)

## Settings

| Property       |  Default | Description                                                                |
|----------------|:--------:|----------------------------------------------------------------------------|
| wrappClassName | pj-toast | CSS class which wrapp Toast message                                        |
|  msgClassName  |    ''    | The message class name. (String)                                           |
|     timeout    |   4000   | Wait time for removal of created toast message. (number)                   |
|  dismissButton |   true   | Appends specified close button on toast message. (boolean)                 |
| dismissOnClick |   true   | Allows toasts messages to be removed on mouse click. (boolean)             |
| centerOnScroll |   true   | Sets toast message position fixed (still visible) on the screen. (boolean) |
|    withIcon    |   true   | Show bootstrap icon. (boolean)                                             |
 
