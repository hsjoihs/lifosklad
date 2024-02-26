//for IE
//Lock Shift or Ctrl+wheel
;(function(){
var wheel=function(e)
{
  var delta=0;
  if (!e)e=window.event;
  if (e.shiftKey || e.ctrlKey){
    if (e.preventDefault){
      e.preventDefault();
    }
    e.returnValue=false;
  }
}

if (window.addEventListener)
{
  window.addEventListener('DOMMouseScroll', wheel, false);
} else{
  window.onmousewheel=document.onmousewheel=wheel;
}

//Lock F1
document.onhelp=function(){
  window.event.keyCode=0;
  window.event.returnValue=false;
}

//Lock contextmenu
document.oncontextmenu=function(e){
  if (!e) e=window.event;
  var target=e.target || e.srcElement;
  var strSelText=''
  if (document.selection){
    strSelText=document.selection.createRange().text;
  } else if (document.getSelection){
    strSelText=document.getSelection();
  }
  var strEventType=target.type;
  if (strEventType){
    strEventType=strEventType.toLowerCase();
  }
  if (strEventType != 'text' &&
    strEventType != 'password' &&
    strEventType != 'file' &&
    strEventType != 'textarea' &&
    strSelText.length == 0
  ){
    if (e.preventDefault){
      e.preventDefault();
    }
    e.returnValue=false;
  }
}

//Block some shortcuts
document.onkeydown=function(e){
  if (!e) e=window.event;
  var target=e.target || e.srcElement;
  var strEventType=target.type;
  var readonly=target.getAttribute('readonly');
  var charCode=e.charCode || e.keyCode;
  if (strEventType){
    strEventType=strEventType.toLowerCase();
  }
  if ((e.altKey && charCode == 37) ||   // Alt + ←
    (e.altKey && charCode == 39)){   // Alt + →
    e.returnValue=false;
  }
  if ((e.altKey && charCode == 13) ||  //Alt + Enter
    (e.altKey && charCode == 115) ||  // Alt + F4
    (e.ctrlKey && charCode == 115)){  // Ctrl + F4
    e.returnValue=false;
    e.cancelBubble=true;
    e.keyCode=37; // or 39
    return false;
  }
  if (charCode == 112 ||         //F1
    charCode == 113 ||         //F2
    charCode == 114 ||         //F3
    charCode == 115 ||         //F4
    charCode == 116 ||         //F5
    charCode == 117 ||         //F6
    charCode == 122 ||         //F11
    (charCode == 65 && e.ctrlKey) ||  //Ctrl + A
    (charCode == 69 && e.ctrlKey) ||  //Ctrl + E
    (charCode == 72 && e.ctrlKey) ||  //Ctrl + H
    (charCode == 73 && e.ctrlKey) ||  //Ctrl + I
    (charCode == 78 && e.ctrlKey) ||  //Ctrl + N
    (charCode == 84 && e.ctrlKey) ||  //Ctrl + T
    (charCode == 79 && e.ctrlKey) ||  //Ctrl + O
    (charCode == 82 && e.ctrlKey) ||  //Ctrl + R
    (e.ctrlKey && charCode == 87) ||  //Ctrl + W
    (charCode == 8 &&          //BS
      ((readonly == true) ||
       (strEventType != 'text' &&
       strEventType != 'textarea' &&
       strEventType != 'password' &&
       strEventType != 'file'))
    )
  ){
    if (e.preventDefault){
      e.preventDefault();
    }
    if(e.charCode == undefined){
      e.keyCode=0;
    } else{
      e.charCode=0;
    }
    e.cancelBubble=false;
    e.returnValue=false;
  }
}
})();
//from tez-yamada.at.webry.info/201104/article_2.html