Phone2Carrier.
================
Phone2Carrier allows you to find out the carrier of a phone number.
------------

Installation
------------
Install the package with:

```npm i phone2carrier
----------------
### Library
To use it as a library, you can do the following:
```javascript
const phone2carrier = require('phone2carrier');
const result = phone2carrier.getPhoneFullDetails('447366105215');
console.log(result);
// {
//   isValid: true,
//   ISO3: 'GBR',
//   countryCode: 44,
//   carrier: 'Three',
//   phoneType: 'MOBILE'
// }
```


How do I contribute?
--------------------
If you want to contribute, you can do so by doing the following:
1. Fork the repository
2. Make your changes
3. Submit a pull request
4. Wait for it to be merged

How do I get help?
------------------
If you need help, you can do so by doing the following:
1. Create an issue
2. Wait for it to be resolved

License
-------
This project is licensed under the MIT license.



