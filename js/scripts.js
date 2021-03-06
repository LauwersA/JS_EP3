;
(function ($){
    var CLIENT_ID = '798174822331-k3gtkdnfraru2rf5ifhq7vjtal9jud8o.apps.googleusercontent.com';
    const CLIENT_SECRET = 'SOQOhbj3U5ZbUTMiZBqMh27x';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
    var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

    window.handleClientLoad = function() {
        gapi.load('client:auth2', initClient);
    }
    function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(function() {
            console.info(gapi.auth2.getAuthInstance().isSignedIn.get());
          });

          // Handle the initial sign-in state.
          //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          gapi.auth2.getAuthInstance().signIn();
          console.info(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      }

    function setHeight() {
        return $("#ytvideo").width()/16 * 9;
    };
    function createCard(i,rowindex, id, link, begintime, endtime ) {
        $(".videos .container.columns." + rowindex ).append("<div class=\"card column is-one-third-desktop is-one-third-fullhd is-half-tablet is-full-mobile " + id + "\">"+
            "<div class=\"card-image\">" +
                "<div class=\"image\">" +
                    "<iframe id=\"ytvideo\" width=\"100%\" src=https://www.youtube.com/embed/" + link + "?controls=1&amp;rel=0&amp;showinfo=0&amp;start=" + begintime + "&amp;end=" + endtime + "&amp;loop=1\" frameborder=\"1\" allow=\"autoplay; encrypted-media\">" +
                    "</iframe>" +
                "</div>" +                            
            "</div>"+
            "<div class=\"card-content\">" +
                "<h1 class=\"title is-4\">" + link + "</h1>" +
                
            "</div>" +
            "<footer class=\"card-footer\">" +
                "<a href=\"#\" class=\"card-footer-item " + id + "\">Vind ik leuk</a>" +
                "<a href=\"#\" class=\"card-footer-item " + id + "\">Verwijder video</a>" +
            "</footer>" +
        "</div>");
    }
    $(document).ready(function(e) {

        $("#add_video").on("click", function() {
            console.log("clicked");
        });

        $.ajax({
            url: 'api.php',
			type: 'GET',
			data: {
                action: 'getvideos',
                begintime: $('#form_begintime').val(),
                endtime: $('#form_endtime').val()
            },            
            dataType: 'json',
			success: function(data) {
                console.log('daar');
				var $videos = data.videos;
                console.log($videos);
                var $countvideos = $videos.length;
                var $rowindex = 1;
				for(var $i = 0; $i< $countvideos; $i++){
					if ($i % 3 == 0 && $i > 2){
                        $rowindex ++;
                        $(".videos").append("<div class=\"container columns " + $rowindex + "\"></div>")
                    }
                    var $id = $videos[$i].Id;
					var $link = $videos[$i].Link;
                    var $begintime = $videos[$i].Begintime;
                    var $endtime = $videos[$i].Endtime;
                    var $favorite = $videos[$i].Favorite;
                    //creates div that contains a profile image and a comment
                    console.log($link);
                    createCard($i, $rowindex, $id, $link, $begintime, $endtime);
                    /*$(".videos .container.columns." + rowindex ).append("<div class=\"card column is-one-third-desktop is-one-third-fullhd is-half-tablet is-full-mobile " + $id + "\">"+
                        "<div class=\"card-image\">" +
                            "<div class=\"image\">" +
                                "<iframe id=\"ytvideo\" width=\"100%\" src=https://www.youtube.com/embed/" + $link + "?controls=0&amp;rel=0&amp;showinfo=0&amp;start=" + $begintime + "&amp;end=" + $endtime + "&amp;loop=1\" frameborder=\"1\" allow=\"autoplay; encrypted-media\">" +
                                "</iframe>" +
                            "</div>" +                            
                        "</div>"+
                        "<div class=\"card-content\">" +
                            "<h1 class=\"title is-4\">" + $link + "</h1>" +
                            
                        "</div>" +
                        "<footer class=\"card-footer\">" +
                            "<a href=\"#\" class=\"card-footer-item " + $id + "\">Vind ik leuk</a>" +
                            "<a href=\"#\" class=\"card-footer-item " + $id + "\">Verwijder video</a>" +
                        "</footer>" +
                    "</div>");*/
                }
                $("[id='ytvideo']").height(setHeight());
			},
			error: function(jqXHR, exception) {
                console.log(jqXHR);
                console.log(exception);
			}
        });
        $('#add_video').on('click', function(e) {
            console.log('triggered');
            $link = $('#form_link').val();
            $begintime = $('#form_link').val();
            $endtime = $('#form_link').val();
            
            $.ajax({
                url: 'api.php',
                type: 'GET',
                data: {
                    link: $link,
                    begintime: $begintime,
                    endtime: $endtime,
                    action: 'addvideo'
                },
                
                dataType: 'json',
                success: function(data) {
                    $('#form_link').val('');
                    $('#form_begintime').val('');
                    $('#form_endtime').val('');
                    location.reload();
                },
                error: function(err) {
                }
            });
		});
        
    });
    $(window).resize(function(){
        $("[id='ytvideo']").height(setHeight());
    });

})(jQuery);