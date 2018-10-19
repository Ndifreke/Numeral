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


/**************************************************************************************************************/
function romanToDecimal( romanText ) {
    let errorLog = [];
    romanText = romanText.toLowerCase();
    if ( !/^[ivxlcdm]*$/.test( romanText ) ) {
        //A non Roman character was entered;
        return {type : "error", value : "<br/> Invalid character Found", info : "A None Roman Character Encountered!"}
    }
    if ( validate( romanText ) ) {
        //Entered text is a valid roman text
        return {type : "main", value : getNumerical( romanText ), info : "ok"};
    } else {
        try {
            //A possibility that the input was malformed, try to make sense of it
            //this will be an optional result
            const text = "<br/> Invalid Order of Roman Numbers!";
            errorLog.indexOf( text ) === -1 ? errorLog.push( text ) : "";

            if ( /^m{3,}[ivdxlc]*$/.test( romanText ) ) {
                return {type : "option", value : getNumerical( romanText ), info : "Size more than standard Roman"};
            }

            let suggestion = decimalToRoman( getNumerical( romanText ) );
            return {type : "option", value : suggestion, info : errorLog};
        } catch ( e ) {
            //Oh No! you entered a value we dont understand
            return {type : "error", value : e.message, info : errorLog};
        }
    }

    function getNumerical( romanSource ) {
        let value = 0;
        for ( let pos = 0; pos < romanSource.length; pos++ ){
            if ( isSubtrative( romanSource.charAt( pos ), romanSource.charAt( pos + 1 ) ) ) {
                value += getSubtractive( romanSource.charAt( pos ), romanSource.charAt( pos + 1 ), pos, romanSource.length );
                pos++;
                continue;
            }
            value += decimalValue( romanSource.charAt( pos ), romanSource, pos );
        }
        return value;
    }

    /*
    * treat subtractive notation cases where the left operand is less than right hand
    */
    function isSubtrative( leftChar, rightChar ) {

        if ( toArabic( leftChar ) < toArabic( rightChar ) ) {
            if ( (/iv|ix|cm|cd|xc|xl/.test( leftChar + rightChar )) ) {
                //only 4, 9 ,40,90,400,900 can be subtractive & ML, XD etc should fail
                //*enableStrict* throw new Error( "Subtractive does not follow convention" );
                return true;
            }
            /*remove to enable strict*/
            const text = "<br/>Subtractive Notation Does Not Follow Convention";
            errorLog.indexOf( text ) === -1 ? errorLog.push( text ) : "";
            return true;
        }
        /**remove end */
        return false;
    }

    function toArabic( romanNumeral ) {
        switch ( romanNumeral ){
            case "i":
                return 1;
            case "v":
                return 5;
            case "x":
                return 10;
            case "l":
                return 50;
            case "c":
                return 100;
            case "d":
                return 500;
            case "m":
                return 1000;
        }
    }

    function decimalValue( romanChar, romanText, position ) {

        switch ( romanChar ){
            case "i":
                //Ensure that i only appears at last index
                let rhsText = romanText.slice( position );
                if ( romanText || (position !== undefined) ) {
                    if ( !(/^i{1,3}$/.test( rhsText )) ) {
                        const text = "I should be in last position and less than 3";
                        errorLog.indexOf( text ) === -1 ? errorLog.push( text ) : "";
                        //*enableStrict* throw new Error( "I should be in last position and less than 3" );
                    }
                }
                return 1;
            default:
                return toArabic( romanChar );
        }
    }

    function getSubtractive( romanLeft, romanRight, startpos, length ) {
        /*
        *enableStrict*
        if ( /ix|iv/.test( romanLeft + romanRight ) && (startpos + 2 !== length) ) {
            //iv and ix must always appear as the last roman toArabic
            throw new Error( "Not valid roman numerial" );
        }
        */

        if ( /xl|xc|cm|ix|iv|cd/.test( romanLeft + romanRight ) ) {
            return toArabic( romanRight ) - toArabic( romanLeft );
        } else {
            /*remove to enable strict */
            if ( toArabic( romanLeft ) < toArabic( romanRight ) ) {
                const text = `<br/> Subtractive notation does apply to (${romanLeft}${romanRight})`;
                errorLog.indexOf( text ) === -1 ? errorLog.push( text ) : "";
                return toArabic( romanRight ) - toArabic( romanLeft );
            }
            /* remove ends*/
            //*enableStrict*throw new Error( "Not valid roman numerial" );
            const text = " <br/> Not valid roman numerial";
            errorLog.indexOf( text ) === -1 ? errorLog.push( text ) : "";
        }

    }

    function validate( romanText ) {
        //validate that romantext conforms with romanNumber format
        function getString( pattern ) {
            return pattern.source.replace( /[$]/, "" ).replace( /[^]/, "" );
        }

        let pattern1_9 = /^(i{1,3}|vi{0,3}|iv|ix)$/;
        const S1_9 = getString( pattern1_9 );
        let P10_30 = new RegExp( "^x{1,3}" + S1_9 + "?$" );
        const S10_30 = getString( P10_30 );
        let P40 = new RegExp( "^xl" + S1_9 + "?$" );
        const S40 = getString( P40 );
        let P50_89 = new RegExp( "^lx{0,3}(i{1,3}|vi{0,3}|iv|ix)?$" );
        const S50_89 = getString( P50_89 );
        let P89_99 = new RegExp( "^xc" + S1_9 + "?$" );
        const S89_99 = getString( P89_99 );
        let P1_300 = new RegExp( `^c{0,3}(${S1_9}|${S10_30}|${S40}|${S50_89}|${S89_99})?$` );
        const S1_300 = getString( P1_300 );
        let P400 = new RegExp( `^cd(${S1_9}|${S10_30}|${S40}|${S50_89}|${S89_99})?$` );
        const S400 = getString( P400 );
        let P500_899 = new RegExp( "^d" + S1_300 + "?$" );
        const S500_899 = getString( P500_899 );
        let P900 = new RegExp( `^cm(${S1_9}|${S10_30}|${S40}|${S50_89}|${S89_99})?$` );
        const S900 = getString( P900 );
        let P1000plus = new RegExp( `^m{0,8}(${S1_300}|${S400}|${S500_899}|${S900})?$` );

        return P1000plus.test( romanText.toLowerCase() );
    }
}

function decimalToRomanWrap( number, _result = "" ) {
    if ( number >= 1000 ) {
        let div = parseInt( number / 1000 );
        let remains = number % 1000;
        return "[" + decimalToRomanWrap( decimalToRomanWrap( 0, div ) ) + "]" + decimalToRomanWrap( remains );
    }
    if ( number >= 900 ) {
        return decimalToRomanWrap( number - 900, _result += "CM" );
    }
    if ( number >= 500 ) {
        return decimalToRomanWrap( number - 500, _result += "D" );
    }
    if ( number >= 400 ) {
        return decimalToRomanWrap( number - 400, _result += "CD" );
    }
    if ( number >= 300 ) {
        return decimalToRomanWrap( number - 300, _result += "CCC" );
    }
    if ( number >= 200 ) {
        return decimalToRomanWrap( number - 200, _result += "CC" );
    }
    if ( number >= 100 ) {
        return decimalToRomanWrap( number - 100, _result += "C" );
    }
    if ( number >= 90 ) {
        return decimalToRomanWrap( number - 90, _result += "XC" );
    }
    if ( number >= 50 ) {
        return decimalToRomanWrap( number - 50, _result += "L" );
    }
    if ( number >= 40 ) {
        return decimalToRomanWrap( number - 40, _result += "XL" );
    }
    if ( number >= 30 ) {
        return decimalToRomanWrap( number - 30, _result += "XXX" );
    }
    if ( number >= 20 ) {
        return decimalToRomanWrap( number - 20, _result += "XX" );
    }
    if ( number >= 10 ) {
        return decimalToRomanWrap( number - 10, _result += "X" );
    }
    if ( number === 9 ) {
        return decimalToRomanWrap( number - 9, _result += "IX" );
    }
    if ( number >= 5 ) {
        return decimalToRomanWrap( number - 5, _result += "V" );
    }
    if ( number === 4 ) {
        return decimalToRomanWrap( number - 4, _result += "IV" );
    }
    if ( number <= 3 && number > 0 ) {
        return decimalToRomanWrap( number - 1, _result += "I" );
    }
    return _result;
}

function selectArg( arg ) {
    if ( arg === "inputField" )
        return document.getElementsByName( arg )[0].value;
    document.getElementsByName( "inputField" )[0].value = arg;
    return arg;
}

function converter( arg ) {
    let input = selectArg( arg );
    let output = "";
    //${result.value.toString()}
    let html = "";
    if ( /^[1-9]([0-9])*?$/g.test( input )/*Only positive integer greater than 0*/ ) {
        if ( /^[3-9][0-9]{3,}|[12][0-9]{4,}$/g.test( input ) ) {
            /*for numbers greater than 3k*/
            output = `<span> ${decimalToRomanWrap( input )} </span>`;
        } else {
            /*for numbers less than 3k*/
            output = `<span> ${decimalToRoman( input )} </span>`;
        }
    } else if ( /^[a-z]+$/gi.test( input ) ) {
        let result = romanToDecimal( input, true );
        switch ( result.type ){
            case "error":
                html = `<span class="error"> ${result.info} </span> </br> <span class="error">${result.value} </span>`;
                output = html;
                break;
            case "option":
                html = `<span class="error"> ${result.info} </span> 
                  <br/> <span class="warn"> Did you Mean to enter
                 <a href="#" onclick="converter('${result.value}'); return false">
                 <em class="valid"> ${result.value} ? </em>  </a>   </span>`;
                output = html;
                break;
            case "main":
                html = `<span class="valid"> ${result.value} </span>`;
                output = html;
                break;
        }
    } else {
        output = `<span class="error"> Error! Invalid Input </span>`
    }
    let displayElement = document.getElementById( "result" );
    displayElement.innerHTML = "<p>" + output + "</p>";
}
