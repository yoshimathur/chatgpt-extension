console.log("~Athena: Connection established!"); 

const enabled = true; //Should api calls be made
let aiTempValue = 0.5;

// Enabling user select on all elements in case it's blocked
var elems = document.getElementsByTagName("*");

// Regular elements on page
for (var elem of elems) {
    if (!elem.id.includes("athena")) {
        elem.setAttribute('style', elem.getAttribute('style')+ '; user-select: text !important');
    }
}

// Elements in iFrames, if any.
var frames = document.getElementsByTagName("iframe");
if (frames.length != 0) {
    for (var frame of frames) {
        if (frame.contentDocument) {
            var elems = frame.contentDocument.getElementsByTagName("*"); 
            for (var elem of elems) {
                elem.setAttribute('style', elem.getAttribute('style')+ '; user-select: text !important');
            }
        }
    }
}

// var HttpClient = function() {
//     this.get = function(aUrl, aCallback) {
//         var anHttpRequest = new XMLHttpRequest();
//         anHttpRequest.onreadystatechange = function() { 
//             if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
//                 aCallback(anHttpRequest.responseText);
//         }

//         anHttpRequest.open( "GET", aUrl, true );            
//         anHttpRequest.send( null );
//     }
// }

// Get highlighted text for regular webpages in order to create popup at location
document.onmouseup = function() {
    var selectedText = window.getSelection(); 
    if (selectedText.toString().length > 0) {
        // var client = new HttpClient();
        // client.get('https://athena-ox55.onrender.com/api/?questionText=' + selectedText, function(response) {
        //     alert(response);
        // });

        document.getElementById("athena-question-input").innerHTML = selectedText;
        document.getElementById("athena-answer-input").innerHTML = "Generating Response...";
        document.getElementById("athena-answer-input").classList.add("athena-answer-input-flashing");

        if (enabled) {
            document.getElementById("athena-answer-input").classList.remove("athena-answer-input-flashing");
            fetch('https://athena-ox55.onrender.com/api/?questionText=' + selectedText + "&openAITemp=" + aiTempValue).then(r => r.text()).then(result => {

                console.log("Result from Fetch: " + result);

                try {
                    const parsedResult = JSON.parse(result);
                    document.getElementById("athena-answer-input").innerHTML = parsedResult.answer.trim();
                } catch (e) {
                    console.log(e);
                    document.getElementById("athena-answer-input").innerHTML = result.trim();
                }

            })
        }
    }
}

// Get highlighted text for iframes in page in order to create popup at location
var frames2 = document.getElementsByTagName('iframe');
[].forEach.call(frames2, function(frame) {
    frame.contentWindow.document.onmouseup = function() { 
        var selectedText = frame.contentWindow.getSelection(); 
        if (selectedText.toString().length > 0) { 
//            alert(selectedText); 
            // var client = new HttpClient();
            // client.get('https://athena-ox55.onrender.com/api/?questionText=' + selectedText, function(response) {
            //     alert(response);
            // });
            fetch('https://athena-ox55.onrender.com/api/?questionText=' + selectedText).then(r => r.text()).then(result => {
                console.log(result.text);
            })
        }
    }
});

