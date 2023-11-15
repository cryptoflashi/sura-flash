/** EMPRESAS INTELIGENTES**/
$( document ).ready(function() {
  
    pullTime();
    $('body').on('click', '.inbenta-bot__launcher', pullTime);
  
    function pullTime(){
      setTimeout(function() {
        moveButton();  
      }, 700);
      pollVisibility();
    }

    function moveButton(){
      $('.inbenta-bot__chat').after($("div.openChatButton"));
      $(".openChatButton").removeClass("hide");
    }
  
    function pollVisibility() {
        if ($('#inbenta-bot-sdk').is(":visible") ) {
          moveButton();
        } else {
            setTimeout(pollVisibility, 500);
        }
    }
	
	
	window.dummyocultoafi = function() {
                jQuery('.dummy-chat-content-afi').addClass('dummy-chat-content-oculto');
}
 
window.dummyvisibleafi = function() {
                jQuery('.dummy-chat-content-afi').removeClass('dummy-chat-content-oculto');
}
 
jQuery( '.dummy-afi' ).click(function() {
                jQuery('.dummy-chat-content-afi').addClass('dummy-chat-content-oculto');
});
 
	
  });