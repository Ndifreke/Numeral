/*
Recuresely Computes the Roman Alphabet derived from the input Arabic number
*/

function arabicToRoman( number, _result = "" ) {
    if ( number >= 1000 ) {
        let div = parseInt( number / 1000 );
        let remains = number % 1000;
        return "[" + arabicToRoman( arabicToRoman( 0, div ) ) + "]" + arabicToRoman( remains );
    }
    if ( number >= 900 ) {
        return arabicToRoman( number - 900, _result += "CM" );
    }
    if ( number >= 500 ) {
        return arabicToRoman( number - 500, _result += "D" );
    }
    if ( number >= 400 ) {
        return arabicToRoman( number - 400, _result += "CD" );
    }
    if ( number >= 300 ) {
        return arabicToRoman( number - 300, _result += "CCC" );
    }
    if ( number >= 200 ) {
        return arabicToRoman( number - 200, _result += "CC" );
    }
    if ( number >= 100 ) {
        return arabicToRoman( number - 100, _result += "C" );
    }
    if ( number >= 90 ) {
        return arabicToRoman( number - 90, _result += "XC" );
    }
    if ( number >= 50 ) {
        return arabicToRoman( number - 50, _result += "L" );
    }
    if ( number >= 40 ) {
        return arabicToRoman( number - 40, _result += "XL" );
    }
    if ( number >= 30 ) {
        return arabicToRoman( number - 30, _result += "XXX" );
    }
    if ( number >= 20 ) {
        return arabicToRoman( number - 20, _result += "XX" );
    }
    if ( number >= 10 ) {
        return arabicToRoman( number - 10, _result += "X" );
    }
    if ( number === 9 ) {
        return arabicToRoman( number - 9, _result += "IX" );
    }
    if ( number >= 5 ) {
        return arabicToRoman( number - 5, _result += "V" );
    }
    if ( number === 4 ) {
        return arabicToRoman( number - 4, _result += "IV" );
    }
    if ( number <= 3 && number > 0 ) {
        return arabicToRoman( number - 1, _result += "I" );
    }
    return _result;
}





let log = console.log;

function decimalToRoman( num ) {
    if ( num >= 1000 ) {
        return "M".repeat( parseInt( num / 1000 ) ) + computeRoman( num % 1000 ).toUpperCase();
    }
    return computeRoman( num ).toUpperCase();
}

function computeRoman( _num ) {
    switch ( String( _num ).length ){
        case 1:
            return unit( _num );
        case 2:
            return tens( _num );
        case 3:
            return hundreds( _num );
    }
}

/*
 * @param {integer} num
 * @returns {String} a unit toArabic of roman numberal*/
function unit( num ) {
    switch ( Number( num ) ){
        case 1:
            return "i";
        case 2:
            return "ii";
        case 3:
            return "iii";
        case 4:
            return "iv";
        case 5:
            return "v";
        case 6:
            return "vi";
        case 7:
            return "vii";
        case 8:
            return "viii";
        case 9:
            return "ix";
        default :
            return "";
    }
}

function tens( num ) {
    let numtoString = String( num );
    let unitSlice = numtoString.slice( 1 );

    switch ( Number( numtoString.charAt( 0 ) ) ){
     //Unit slice is assumed to be a number with length = 1
        case 1:
            return "x" + unit( unitSlice );
        case 2:
            return "xx" + unit( unitSlice );
        case 3:
            return "xxx" + unit( unitSlice );
        case 4:
            return "xl" + unit( String( num ).slice( 1 ) );
        case 5:
            return "l" + unit( unitSlice );
        case 6:
            return "lx" + unit( unitSlice );
        case 7:
            return "lxx" + unit( unitSlice );
        case 8:
            return "lxxx" + unit( unitSlice );
        case 9:
            return "xc" + unit( String( num ).slice( 1 ) );
        default :
            //passed in  by hundreds can begin with zero e.g 101 => translated to 01
            return unit( num );
    }
}

function hundreds( num ) {
    let numtoString = String( num );
    let tenSlice = numtoString.slice( 1 );

    switch ( Number( numtoString.charAt( 0 ) ) ){
     //ten slice is assumed to be a number with length = 2
        case 1:
            return "C" + tens( tenSlice.slice( 1 ) );
        case 2:
            return "CC" + tens( tenSlice.slice( 1 ) );
        case 3:
            return "CCC" + tens( tenSlice.slice( 1 ) );
        case 4:
            return "CD" + tens( String( num ).slice( 1 ) );
        case 5:
            return "D" + tens( tenSlice.slice( 1 ) );
        case 6:
            return "DC" + tens( tenSlice.slice( 1 ) );
        case 7:
            return "DCC" + tens( tenSlice.slice( 1 ) );
        case 8:
            return "DCCC" + tens( tenSlice.slice( 1 ) );
        case 9:
            return "cm" + tens( String( num ).slice( 1 ) );
        default:
            return "M";
    }
}
