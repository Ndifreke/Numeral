/** Intellligently Converts A Roman numeral number to Arabic number
 *  If there is an error, it returns with appropriate Error message
 *  That indicate the problem and a solution if it can be salvaged
 */

function romanToDecimal( userInput ) {
    let errorLog = [];

    userInput = userInput.toLowerCase();
    // Check if Input has an invalid roman numeral;
    if ( !/^[ivxlcdm]*$/.test( userInput ) ) {
        return {
            type: "error",
            value: "<br/> Invalid character Found",
            info: "A None Roman Character Encountered!"
        }
    }

    if ( validate( userInput ) ) {
        //Entered text is a valid roman text
        return {
            type: "main",
            value: getNumerical( userInput ),
            info: "ok"
        };
    } else {
        try {

            // A possibility that the input was malformed, try to make sense of it
            // this will be an optional result
            const text = "<br/> Invalid Order of Roman Numbers!";
            errorLog.indexOf( text ) === -1 ? errorLog.push( text ) : "";
            if ( /^m{3,}[ivdxlc]*$/.test( userInput ) ) {
                return {
                    type: "option",
                    value: getNumerical( userInput ),
                    info: "Size more than standard Roman"
                };
            }

            let suggestion = decimalToRoman( getNumerical( userInput ) );
            return {
                type: "option",
                value: suggestion,
                info: errorLog
            };
        } catch ( e ) {
            //Oh No! you entered a value we dont understand
            return {
                type: "error",
                value: e.message,
                info: errorLog
            };
        }
    }

    function getNumerical( romanSource ) {
        let value = 0;
        for ( let pos = 0; pos < romanSource.length; pos++ ) {
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
     * treat subtractive notation cases where the left operand is less than right operand
     */
    function isSubtrative( leftChar, rightChar ) {

        if ( toArabic( leftChar ) < toArabic( rightChar ) ) {
            if ( ( /iv|ix|cm|cd|xc|xl/.test( leftChar + rightChar ) ) ) {
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
        switch ( romanNumeral ) {
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

        switch ( romanChar ) {
            case "i":
                //Ensure that 'i' appears at last index
                let rhsText = romanText.slice( position );
                if ( romanText || ( position !== undefined ) ) {
                    if ( !( /^i{1,3}$/.test( rhsText ) ) ) {
                        const text = "I should be in last position and less than 3";
                        errorLog.indexOf( text ) === -1 ? errorLog.push( text ) : "";
                    }
                }
                return 1;
            default:
                return toArabic( romanChar );
        }
    }

    function getSubtractive( romanLeft, romanRight, startpos, length ) {
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

    /** The heart of the module validates that romantext conforms with Roman Number system format */
    function validate( romanText ) {

        function getString( pattern ) {
            return pattern.source.replace( /[$]/, "" ).replace( /[^]/, "" );
        }
        /**P(n) (where n is a number range) === Pattern that can match number n, 
         * S(n) (where n is a number range) === matched string derived from P(n)
        */
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