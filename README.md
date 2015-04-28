# pjToast [![Build Status](https://travis-ci.org/peterjurkovic/pjToast.svg)](https://travis-ci.org/peterjurkovic/pjToast)


pjToast is a simple Angular module for toast notifications. This Toast notification is inspired by [ngToast](http://tamerayd.in/ngToast/) with following significant differences:

* The notification message is positioned absolute (to the center of screen)
* Only one message is shown in given time (other additional messages are in the queue)
* Bootstrap icons integrated

**[See Demos](http://pjtoast.peterjurkovic.sk/)**

![Toast example](http://pjtoast.peterjurkovic.sk/toast-example.png)

## Usage

1. Install via [Bower](http://bower.io/):
  ```
  bower install pjToast --save
  ```
  
2. Integration
  Include pjToast source files and dependencies ([Bootstrap CSS](http://getbootstrap.com/)):
```
<link rel="stylesheet" href="bower/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="bower/pjToast/pjToast.min.css">

<script src="bower/pjToast/pjToast.min.js"></script>
```
3. Place toast element into your HTML:
```
<body>
  <toast></toast>
  ...
</body>
```
4. Inject `Toast` factory in your controller:
```
app.controller('myCtrl', ['Toast', function(Toast) {
  Toast.success('This is your toast message!');
}]);
```



 
