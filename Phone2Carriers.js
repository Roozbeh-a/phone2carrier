const phoneHelper =
  require("./helpers/phonenumber").PhoneNumberUtil.getInstance();
const CountryHelper = require("./helpers/countryHelper");
const Operators = require("./helpers/operator");
const Phone2Carriers = {};
Phone2Carriers.checkNumberIsNumeric = async function (number) {
  var re = new RegExp("^[1-9][0-9]{2,14}$");
  if (re.test(number)) {
    return true;
  } else {
    return false;
  }
};
Phone2Carriers.isValidNumber = function (number) {
  try {
    let rcheck = this.checkNumberIsNumeric(number);
    if (!rcheck) return false;
    let pnumber = phoneHelper.parseAndKeepRawInput("+" + number);
    let checkBasicValidate = phoneHelper.isValidNumber(pnumber);
    if (!checkBasicValidate) return false;

    return true;
  } catch (error) {
    return null;
  }
};

Phone2Carriers.getRegion = function (number) {
  try {
    let pnumber = phoneHelper.parseAndKeepRawInput("+" + number);
    return phoneHelper.getRegionCodeForNumber(pnumber);
  } catch (error) {
    return null;
  }
};
Phone2Carriers.countryCode = function (number) {
  try {
    let pnumber = phoneHelper.parseAndKeepRawInput("+" + number);
    return pnumber.getCountryCode();
  } catch (error) {
    return null;
  }
};
Phone2Carriers.getOperator = function (number, countryCode) {
  try {
    let country_operator = Operators.getOperators().get(countryCode.toString());

    for (var i = 0; i < country_operator.length; i++) {
      if (number.startsWith(country_operator[i].c)) {
        return country_operator[i].o;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
Phone2Carriers.getPhoneType = function (number) {
  try {
    let pnumber = phoneHelper.parseAndKeepRawInput("+" + number);
    let phoneType = phoneHelper.getNumberType(pnumber);
    let mapObject = {
      FIXED_LINE: 0,
      MOBILE: 1,
      FIXED_LINE_OR_MOBILE: 2,
      TOLL_FREE: 3,
      PREMIUM_RATE: 4,
      SHARED_COST: 5,
      VOIP: 6,
      PERSONAL_NUMBER: 7,
      PAGER: 8,
      UAN: 9,
      VOICEMAIL: 10,
      UNKNOWN: -1,
    };
    let phoneTypeString = Object.keys(mapObject).find(
      (key) => mapObject[key] === phoneType
    );
    return phoneTypeString;
  } catch (error) {
    return null;
  }
};

Phone2Carriers.getPhoneFullDetails = function (number) {
  _isValid = this.isValidNumber(number);
  _isoCountry = CountryHelper.getISO3(this.getRegion(number));
  _country = this.countryCode(number);
  return {
    isValid: _isValid,
    ISO3: _isoCountry,
    countryCode: _country,
    carrier: this.getOperator(number, _country),
    phoneType: this.getPhoneType(number),
  };
};

module.exports = Phone2Carriers;
