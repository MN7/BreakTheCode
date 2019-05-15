var target = 0;
var tgtStr="";
var numLen=4;
var testing=true;
var guess={};

function start(confirmed){
 if (!confirmed && !testing) {
    app.popups.ConfirmationDialog.visible=true;
  } else {
    tgtStr="";
    target=0;
    var ddwLen=app.pages.mainPage.descendants.ddwLength.value;
    if (typeof ddwLen == "object") { numLen=4; } else { numLen=ddwLen; }
    for(var i=0;i<numLen;i++){
      var uniq=false;
      while(!uniq){ 
        target=Math.floor((Math.random() * 10));
        if (tgtStr.search(target)==-1) { uniq=true; }
        // alert("new digit: " + target + " tgtStr: " + tgtStr + "search: " + tgtStr.search(target) + " uniq: " + uniq);
      }
      tgtStr+=target;
    }
    app.pages.mainPage.descendants.txaResultsVal.value="";
    app.pages.mainPage.descendants.txaResultsCow.value="";
    app.pages.mainPage.descendants.txaResultsBull.value="";
    if (testing) alert("final tgtStr: " + tgtStr);
  }
}

function evaluateGuess() {
  var inpVal=app.pages.mainPage.descendants.txtGuess.value;
  if ((typeof inpVal) != "string") { alert("Enter a valid numeric value of length  " + numLen + " !"); return; }
  if (inpVal.trim().length != numLen) { alert("Length needs to be  " + numLen + " !"); return; }
  // further validations
  
  if (inpVal in guess) { 
    alert("You already tried that guess '" + inpVal + "' ! \n\n And, it had " + guess[inpVal][0] + " common and " + guess[inpVal][1] + " bulls-eye. \n\n Hope this helps !"); return;
  } else { 
    guess[inpVal]=[0,0];
  }
  
  // check bulls and cows 
  var cow=0, bull=0;
  for (var i=0; i<numLen; i++) {
    //alert(inpVal[i] + " in tgtStr: " + tgtStr + " : " + tgtStr.search(inpVal[i]));
    if (inpVal[i]==tgtStr[i]) { bull++; } else {
      if (tgtStr.search(inpVal[i])!=-1) { cow++; }
    }
  }
  
  // update the info to the tx-areas on the main page (use new-line)
  if (!app.pages.mainPage.descendants.txaResultsVal.value) {
    app.pages.mainPage.descendants.txaResultsVal.value=inpVal+"\n";
  } else {
    app.pages.mainPage.descendants.txaResultsVal.value+=inpVal+"\n";
  }
  
  if (!app.pages.mainPage.descendants.txaResultsCow.value) { 
    app.pages.mainPage.descendants.txaResultsCow.value=cow+"\n";
  } else {
    app.pages.mainPage.descendants.txaResultsCow.value+=cow+"\n";
  }
  
  if (!app.pages.mainPage.descendants.txaResultsBull.value) {
    app.pages.mainPage.descendants.txaResultsBull.value=bull+"\n";
  } else { 
    app.pages.mainPage.descendants.txaResultsBull.value+=bull+"\n";
  }
  
  guess[inpVal]=[cow,bull];
  
  if (bull==numLen){
    alert("Congratulations! You win !! \n\n The value '" + inpVal + "' is correct. \n\n Go for another round?");
    start();
  }
  
}
