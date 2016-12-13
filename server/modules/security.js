/**
 * Created by mathieu on 13/12/16.
 */
"use strict";

//check if an input is a integer and if in between 1 and 99999 or not
exports.index = (input) => {

    let reg = new RegExp("^([0-9]{1,5})$");

    if (reg.test(input)){
        return false
    }
    else{
        return true
    }
};

//check if an input is a date or not
exports.date = (input) => {

    let reg = new RegExp("^((^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$))$");

    if (reg.test(input)){
        return true
    }
    else{
        return false
    }
};

//check if attributes of an object is empty or not
exports.empty = (obj) => {
    let result = 0;

    Object.getOwnPropertyNames(obj).forEach((val) => {

        if (obj[val] === undefined || obj[val] === ''){
            result ++;
        }
    });

    if(result == 0){
        return false
    }
    else{
        return true
    }
};

//check if attributes of an object is a float and if in between 1 and 999 or not
exports.price   = (obj) => {

    let result  = 0;
    let reg     = new RegExp("^[+]?[0-9]{1,3}([.][0-9]{1,5})?$");

    Object.getOwnPropertyNames(obj).forEach((val) => {

        if (!reg.test(obj[val])){
            result ++;
        }
    });

    if(result == 0){
        return false
    }
    else{
        return true
    }
};