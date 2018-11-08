function getInput( input ) {
    if ( input === "inputField" )
        return document.getElementsByName( input )[ 0 ].value;
    document.getElementsByName( "inputField" )[ 0 ].value = input;
    return input;
}

function converter( arg ) {
    let input = getInput( arg );
    let output = "";
    let html = "";

    if ( /^[1-9]([0-9])*?$/g.test( input ) ) {
        /*Convert From Arabic to Roman number*/
        output = `<span> ${ arabicToRoman( input )} </span>`;
    } else if ( /^[a-z]+$/gi.test( input ) ) {
        /*Convert Roman number to Arabic Number */
        let result = romanToDecimal( input, true );
        switch ( result.type ) {
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