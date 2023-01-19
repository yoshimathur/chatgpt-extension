if (window != window.top) {
    console.log("~athena: GET ME THE FUCK OUT OF THIS IFRAME");
} else {
    // Dialog creation//superwonder1227!

    // Holder
    const dialogHolder = document.createElement("div");
    dialogHolder.setAttribute('id', 'athena-dialog-holder');

    // Header -- 58px
    const dialogHeader = document.createElement("div");
    dialogHeader.setAttribute('id', 'athena-dialog-header');

    const headerTitle = document.createElement("h2");
    headerTitle.innerHTML = "athena";
    headerTitle.setAttribute('id', 'athena-dialog-header-title');

    const headerButton = document.createElement("button");
    headerButton.setAttribute('id', 'athena-dialog-header-button');

    const headerButtonImage = document.createElement("img");
    const minimizeImg = chrome.runtime.getURL("assets/minimize.png");
    headerButtonImage.setAttribute('src', minimizeImg);
    headerButtonImage.setAttribute('id', 'athena-header-button-img');
    headerButton.appendChild(headerButtonImage);

    dialogHeader.appendChild(headerTitle);
    dialogHeader.appendChild(headerButton);
    dialogHolder.appendChild(dialogHeader);

    // Content 
    const dialogContent = document.createElement("div");
    dialogContent.setAttribute('id', 'athena-dialog-content');

    const dialogForm = document.createElement("form");
    dialogForm.setAttribute("action", "/");
    dialogForm.setAttribute("method", "get");
    dialogForm.setAttribute("id","athena-dialog-form");

    const questionTitle = document.createElement("label");
    questionTitle.setAttribute("for", "athena-question-input");
    questionTitle.setAttribute("id", "athena-question-title");
    questionTitle.innerHTML = "Question";

    const questionInput = document.createElement("textarea");
    questionInput.setAttribute("type","text");
    questionInput.setAttribute("id","athena-question-input");
    questionInput.setAttribute("name", "athena-question-input");
    //questionInput.setAttribute("rows", "4");

    const answerTitle = document.createElement("label");
    answerTitle.setAttribute("for", "athena-answer-input");
    answerTitle.setAttribute("id", "athena-answer-title");
    answerTitle.innerHTML = "Answer";

    const answerInput = document.createElement("textarea");
    answerInput.setAttribute("type","text");
    answerInput.setAttribute("id","athena-answer-input");
    answerInput.setAttribute("name", "athena-answer-input");
    answerInput.setAttribute("readonly", "true");
    //answerInput.setAttribute("rows", "7");

    dialogForm.appendChild(questionTitle);
    dialogForm.appendChild(questionInput);
    dialogForm.appendChild(answerTitle);
    dialogForm.appendChild(answerInput);
    dialogContent.appendChild(dialogForm);
    dialogHolder.appendChild(dialogContent);

    // Footer -- 67.36 px
    const dialogFooter = document.createElement("div");
    dialogFooter.setAttribute("id", "athena-footer-holder");

    const dialogFooterLeft = document.createElement("div");
    dialogFooterLeft.setAttribute("id", "athena-footer-holder-left");

    const footerButton1 = document.createElement("button");
    footerButton1.setAttribute("id", "athena-footer-button-copy");
    footerButton1.setAttribute("class", "athena-footer-button");
    const button1Image = document.createElement("img");
    button1Image.setAttribute("class", "athena-footer-button-img");
    button1Image.setAttribute("src", chrome.runtime.getURL("assets/copy.png"));
    footerButton1.appendChild(button1Image);

    const footerButton2 = document.createElement("button");
    footerButton2.setAttribute("id", "athena-footer-button-refresh");
    footerButton2.setAttribute("class", "athena-footer-button");
    const button2Image = document.createElement("img");
    button2Image.setAttribute("class", "athena-footer-button-img");
    button2Image.setAttribute("src", chrome.runtime.getURL("assets/refresh.png"));
    footerButton2.appendChild(button2Image);

    const footerButton3 = document.createElement("button");
    footerButton3.setAttribute("id", "athena-footer-button-settings");
    footerButton3.setAttribute("class", "athena-footer-button");
    const button3Image = document.createElement("img");
    button3Image.setAttribute("class", "athena-footer-button-img");
    button3Image.setAttribute("src", chrome.runtime.getURL("assets/setting.png"));
    footerButton3.appendChild(button3Image);

    dialogFooterLeft.appendChild(footerButton1);
    dialogFooterLeft.appendChild(footerButton2);
    dialogFooterLeft.appendChild(footerButton3);

    const dialogFooterRight = document.createElement("div");
    dialogFooterRight.setAttribute("id", "athena-footer-holder-right")
    const dialogFooterRightParagraph = document.createElement("p");
    dialogFooterRightParagraph.setAttribute("id", "athena-member-status");
    dialogFooterRightParagraph.innerHTML = "BETA";

    dialogFooterRight.appendChild(dialogFooterRightParagraph);

    dialogFooter.appendChild(dialogFooterLeft);
    dialogFooter.appendChild(dialogFooterRight);

    dialogHolder.appendChild(dialogFooter);

    document.body.prepend(dialogHolder);

    // Make the DIV element draggable:
    dragElement(document.getElementById("athena-dialog-holder"));

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById("athena-dialog-header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById("athena-dialog-header").onmousedown = dragMouseDown;
      } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
      }
    }
}
