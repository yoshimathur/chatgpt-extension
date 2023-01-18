console.log("~Athena: Connection established!"); 

// Enabling user select on all elements in case it's blocked
var elems = document.getElementsByTagName("*");

// Regular elements on page
for (var elem of elems) {
    elem.setAttribute('style', elem.getAttribute('style')+ '; user-select: text !important');
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

// Get highlighted text for regular webpages in order to create popup at location
document.onmouseup = function() {
    var selectedText = window.getSelection(); 
    if (selectedText.toString().length > 0) {
        alert(selectedText)
    }
}

// Get highlighted text for iframes in page in order to create popup at location
var frames2 = document.getElementsByTagName('iframe');
[].forEach.call(frames2, function(frame) {
    frame.contentWindow.document.onmouseup = function() { 
        var selectedText = frame.contentWindow.getSelection(); 
        if (selectedText.toString().length > 0) { 
            alert(selectedText); 
        }
    }
});

// dialog html