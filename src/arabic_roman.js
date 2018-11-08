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