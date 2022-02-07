//Es handelt sich um ein plugin, welches das bereits bekannte turn.js erweitert, 
//sodass man eine Controll zeile inkl. Funktionen unterhalb der PDF datei erhält
//Es wird einfach eingebunden und die funktionen bspw. unterhalb der PDFs eingetragen

//                 benötigt wird:
//jquery.ui.touch-punch.js von GITHUB ######################################
//jquery-ui.min.js
//andi_turn_js.js
//TURN_JS FILES:
//hash.js
//scissor.js
//turn.html4.js
//turn.js
//zoom.js
//
//

//Funktionen - Möglichkeiten

//1. wenn alle bücher auf der geladenen Seite eine Controll-leiste erhalten sollen:
//controlls_for_all_books(slider, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen )
// mittels "false" können einzelne Punkte unterdrückt werden, bspw. controlls_for_all_books(false, true, true, false..)

//2. Controllleiste nur für bestimmte Bücher auf der Seite, anhand der ID
//controlls_for_book(ID, slider, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen)



//######################################################################################################################################
//######################################################################################################################################
//######################################################################################################################################

//Liabries etc. eiinfügenbootstrape icons einfügen
	jQuery(document).ready(function(){
jQuery("head").append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css">');


jQuery("head").append(`
<style type="text/css">  
.pdf_book_scroll{
	position:relative;
	height:100%;
	max-height: 100%;
	overflow:hidden;
	}
.turn_js .pdf_site{ 
background-position:50% 50%;  
background-position: 50% 50%; 
background-size: auto 100%; 
background-repeat: no-repeat; 
background-color: white;
} 

.controls_fullscreen{ 
position: absolute; 
bottom: 5px; width: 90%; left: 5%;
} 

.pdf_control_none{
	display:none;
	} 

.bt-options a{
	cursor:pointer;
	} 
	
.move_bt_active{
	color:red !important;
}

.bi-fullscreen-exit{
	color:red !important;
}

.move_over{
	cursor:move;
	border: 2px dotted black;
}

	
.slider{
	background-color:white; 
	border-radius: 20px; width: 50%;
} 

.pdf_book_container {
	position: relative; 
	overflow: hidden; 
	width: 100%; 
	display: block;
	} 
	
.pdf_book_wrapper{
	width: fit-content;margin: 0 auto;
	} 
	
.slider, .bt-options{
	margin: 10px auto 10px auto; 
	display: block; 
	text-align: center; 
	padding-top: 5px; 
	padding-bottom: 5px;
	} 
	

.reflection{
position: relative;
    top: 100%;
    width: 100%;
    height: 8vh;
    opacity: 0.45;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: inset 0 -10px 10px 0px white;
    margin: 0px;
    padding: 0px;
    -webkit-box-shadow: inset 0 -10px 10px 0px white;
    -moz-box-shadow: inset 0 -10px 10px 0px white;
    -ms-box-shadow: inset 0 -10px 10px 0px white;
    -o-box-shadow: inset 0 -10px 10px 0px white;
    background-size: cover;
    box-shadow: inset 0 -10px 10px 0px white;
}

.flip_parent{
	perspective: 50em;
}
.flip_child{
transform: rotateX(45deg);	
}
.prev_inside {
	width: 10%;
    height: 50px;
    position: absolute;
    top: 45%;
    left: 0%;
	float:left;
	opacity: 0.1;
	z-index: 101;
}
.prev_inside:hover{
	opacity:0.8;
	cursor:pointer;
}
	
.next_inside {
	width: 10%;
    height: 50px;
    position: absolute;
    top: 45%;
    right: 0;
	float:left;
	opacity: 0.1;
	z-index: 101;
	text-align: right;
	}
.next_inside:hover{
	opacity:0.8;
	cursor:pointer;
}
.clear_float{
	clear:both;
}

</style>
`
);

	});


//#####################################################################################################################################


// Arrays und variablen deklarieren###############################################
// controlls Text bzw. wie und welche Symbole angezeigt werden ###############
		var control_text = `
						<!-- controls -->
					<div class="controls" data-mousewheel-scroll="false">
        				<div class="slider">
								<p>Seite <span class="current_page"></span> von <span class="all_sites"></span><br />Umblättern:<br />
								<input type="range" class="pdf-book-slider" data-pdf-book="pdf_id"   min="1" max_seitanzahl="" step="1" value="1">
      					</p>
						</div>

						<div class="bt-options">
        						<a class="bt-icon-home" title="Zur ersten Seite">
									<i class="bi bi-house home" data-pdf-book="pdf_id"></i>
        						</a>
        						<a class="bt-icon-download" title="PDF speichern" download_src >
									<i class="bi bi-download pdf-download" data-pdf-book="pdf_id"></i>
        						</a>
        						<a class="bt-icon-prev" title="zurück">
          							<i class="bi bi-arrow-left-circle prev" data-pdf-book="pdf_id"></i>
        						</a>
        						<a class="bt-icon-next" title="weiter">
          							<i class="bi bi-arrow-right-circle next" data-pdf-book="pdf_id"></i>
        						</a>
        						<a class="bt-icon-zoom-in" title="zoom-plus">
          							<i class="bi bi-zoom-in zoom-in" data-pdf-book="pdf_id"></i>
        						</a>
        						<a class="bt-icon-zoom-out" title="zoom-minus">
          							<i class="bi bi-zoom-out zoom-out" data-pdf-book="pdf_id"></i>
        						</a>
								<a class="bt-icon-zoom-standard" title="zoom-normal">
          							<i class="bi bi-eyeglasses zoom-default" data-pdf-book="pdf_id"></i>
        						</a>
								<a class="bt-icon-bi-book" title="transform">
									<i class="bi bi-book transform-book" data-pdf-book="pdf_id" data-transform="disabled"></i>
								</a>	
								<a class="bt-icon-fullscreen" title="Vollbild">
          							<i class="bi bi-fullscreen fullscreen" data-pdf-book="pdf_id"></i>
        						</a>
								<a class="bt-icon-move" title="Verschieben">
          							<i class="bi bi-arrows-move move" data-pdf-book="pdf_id"></i>
        						</a>
								<a class="bt-icon-back" title="Reset">
          							<i class="bi bi-back back" data-pdf-book="pdf_id"></i>
        						</a>


      					</div>
					</div>
      


  						<!-- / controls -->

  						<!-- miniatures -->	
  						<div id="miniatures" class="ui-miniatures-slider" data-pdf-book="pdf_id">
  						</div>
  						<!-- / miniatures -->
						`
		;
		
		//Controlls ENDE #########################################################################################################
		
//nun werden unnötige leerezeichen aufgrund der mehrzeiligen string deklarierung entfernt
control_text = control_text.replace(/\s\s+/g, ' ');

//flipbook_ids ist ein array, in dem alle pdf-buch ids liegen
var flipbook_ids = new Array ();





//###############Functionen############################
//#####################################################

function controlls_for_all_books(resposive_ratio, mousewheel_scroll, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen, transform, inside_button ){	
	// suchen nach pdf-Flipbooks und lade die ids in das array flipbook_ids###########################################################
	jQuery("body").find(".ui-flipbook").each(function(){
		flipbook_ids.push("#" + jQuery(this).attr("id"));	
	});	
	// Suche Ende#####################################################################################################################
	
	for ( var i=0; i<=flipbook_ids.length; i++ ) {
		
		if (flipbook_ids[i] === undefined){
		break;
		}
	controlls_for_book(flipbook_ids[i], responsive_ratio, mousewheel_scroll, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen, reflection, transform, inside_button);
	}
	
}



function controlls_for_book(ID, responsive_ratio, mousewheel_scroll, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen, reflection, transform, inside_button){	
	var buch_id = ID;
	var download_pdf_link = jQuery(buch_id).attr("data-pdf-src");
	
	jQuery(buch_id).attr("data-original-left", jQuery(buch_id).css('left'));
    jQuery(buch_id).attr("data-original-top", jQuery(buch_id).css('top'));
		
		//Anzahl der Seiten im Buch ausgeben
		var seitenanzahl = jQuery(buch_id).turn("pages");	
		
		//nun wird die maximale seitenanzahl für den slider ausgegeben
		control_text = control_text.replace('max_seitanzahl=""', 'max="' + seitenanzahl + '"' );
		
		//nun werden die attribute data-id mit den dazugehörigen pdf-buch ids gefüllft
		control_text = control_text.replace('data-pdf-book="pdf_id"', 'data-pdf-book="' + buch_id + '"' );
		
		//nun wird zur Controllliste bei class class="bt-options" das data-book-id hinzugefügt mit der buch id
		control_text = control_text.replace('class="bt-options"', 'class="bt-options" data-book-id="' + buch_id + '"');
		
		//nun wird zur Controllliste bei class class="slider" das data-book-id hinzugefügt mit der buch id
		control_text = control_text.replace('class="slider"', 'class="slider" data-book-id="' + buch_id + '"');
		
		//nun wird der PDF download-link ergänzt
		control_text = control_text.replace("download_src", 'href="' + download_pdf_link + '" download');
		
		//nun werden nicht erwünschte controlls entfernt
		if (slider == false){
			control_text = control_text.replace('class="slider"', 'class="slider pdf_control_none"' );	
		}
		
		if (bt_options == false){
			control_text = control_text.replace('class="bt-options"', 'class="bt_options pdf_control_none"' );	
		}
		
		if (home == false){
			control_text = control_text.replace('class="bt-icon-home"', 'class="bt-icon-home pdf_control_none"' );	
		}
		
		if (download == false){
			control_text = control_text.replace('class="bt-icon-download"', 'class="bt-icon-download pdf_control_none"' );	
		}
		
		if (prev == false){
			control_text = control_text.replace('class="bt-icon-prev"', 'class="bt-icon-prev pdf_control_none"' );	
		}
		
		if (next == false){
			control_text = control_text.replace('class="bt-icon-next"', 'class="bt-icon-next pdf_control_none"' );	
		}
		
		if (zoom_in == false){
			control_text = control_text.replace('class="bt-icon-zoom-in"', 'class="bt-icon-zoom-in pdf_control_none"' );	
		}
		
		if (zoom_out == false){
			control_text = control_text.replace('class="bt-icon-zoom-out"', 'class="bt-icon-zoom-out pdf_control_none"' );	
		}
		
		if (zoom_default == false){
			control_text = control_text.replace('class="bt-icon-zoom-standard"', 'class="bt-icon-zoom-standard pdf_control_none"' );	
		}
		
		if (fullscreen == false){
			control_text = control_text.replace('class="bt-icon-fullscreen"', 'class="bt-icon-fullscreen pdf_control_none"' );	
		}	
		
		if (responsive_ratio == true){
			
			jQuery(document).ready(function(){
				var container_width = jQuery(buch_id).parent().parent().width();
				var book_height;
				var book_width;
				var img = new Image();
				
				img.onload = function() {
					img_width= this.width; 
					img_height = this.height;
					img_ratio = img_height / img_width;
					book_width = container_width;
					
						if (jQuery(buch_id).turn("display") == "single"){
							book_height = book_width * img_ratio;
						}
						else if (jQuery(buch_id).turn("display") == "double"){
							book_height = (book_width * img_ratio)/2;
						}
					jQuery(buch_id).turn("size", book_width, book_height);
				}
				
				img.src = jQuery(buch_id).find(".pdf_site").css('background-image').replace(/url\(|\)$/ig, "").replace(/["']/g, "");
				
				
			});
		}
		
		if (mousewheel_scroll == true){
			control_text = control_text.replace('data-mousewheel-scroll="false"', 'data-mousewheel-scroll="true"') ;	
		
		}
		
		//Buch umschlißene#############################
		jQuery("body").find(buch_id).wrap('<div class="pdf_book_fullscreen"></div>').wrap('<div class="pdf_book_container"></div>').wrap('<div class="pdf_book_wrapper"></div>');
		
		//controlls einfügen unterhalb
		jQuery("body").find(buch_id).parent().parent().after(control_text);
		
		var current_page = jQuery(buch_id).turn("page");
		var all_sites = jQuery(buch_id).turn("pages");
		jQuery(buch_id).parent().parent().parent().find(".current_page").html(current_page); 
		jQuery(buch_id).parent().parent().parent().find(".all_sites").html(all_sites);
		jQuery(buch_id).turn("display", display);
		
		//reflection
		if (reflection == true){
			jQuery(buch_id).parent().parent().append('<div class="reflection"></div>');
			//jQuery(buch_id).parent().parent().find(".reflection").css("background-image", jQuery(buch_id).find("[page='" + current_page + "']").find(".pdf_site").css("background-image"));
		}
		reflect_img(buch_id);
		
		//transform
		if (transform == false){
			control_text = control_text.replace('class="bt-icon-book"', 'class="bt-icon-book pdf_control_none"' );	
		}
		
		
	alert(inside_button);
		if (inside_button == true){ 
		//next prev_button
		jQuery(buch_id).parent(".pdf_book_wrapper").prepend("<div class='clear_float'></div>");
		jQuery(buch_id).parent(".pdf_book_wrapper").prepend("<div class='next_inside' data-next='" + buch_id + "'><i class='bi bi-arrow-right-square-fill'></i></div>");
		jQuery(buch_id).parent(".pdf_book_wrapper").prepend("<div class='prev_inside' data-prev='" + buch_id + "'><i class='bi bi-arrow-left-square-fill'></i></div>");
		}
		
}



//functionen für die controll_buttons#########################################################################################################
//############################################################################################################################################
function go_to_page(id, site){
	jQuery(id).turn("page", site);
}
function home_pdf(id){
	jQuery(id).turn("page", 1);
}

function download_pdf (id){
var pfad = jQuery(id).attr("data-pdf-src");
window.location.href = pfad;	
}

function prev_pdf (id){
	jQuery(id).turn("previous");
}

function next_pdf (id){
	jQuery(id).turn("next");
}

function zoom_in_pdf (id){
	var current_zoom = jQuery(id).turn("zoom");
	var new_zoom = current_zoom + 0.2;
	jQuery(id).turn("zoom", new_zoom);
}

function zoom_out_pdf (id){
	var current_zoom = jQuery(id).turn("zoom");
	var new_zoom = current_zoom - 0.2;
	jQuery(id).turn("zoom", new_zoom);
}

function zoom_default_pdf (id){
	jQuery(id).turn("zoom", 1);
}

function fullscreen_pdf (id){
	// if already full screen; exit
  // else go fullscreen
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
	  
  } else {
    element = jQuery(id).closest(".pdf_book_fullscreen").get(0);
	jQuery(id).turn("zoom", 2);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}

//detect ESC für Exit fullscreen
jQuery(document).bind('fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange', function (e) {
	var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement;
	if (!fullscreenElement) 
		
		//Wenn fullscreen geschlossen wird, warum auch immer ESC, taste, etc
		//Alle Books verkleinern
		jQuery("body").find(".ui-flipbook").each(function(){
			
			jQuery(this).turn("zoom", 1);
							
			jQuery(this).parent().parent().parent().find(".fullscreen").each(function(){
				jQuery(this).removeClass();
				jQuery(this).addClass("bi bi-fullscreen fullscreen");
			});
			jQuery(this).parent().parent().parent().find(".controls_fullscreen").each(function(){
				jQuery(this).removeClass();
				jQuery(this).addClass(".controls");
			});
		});
	 
});

function move_pdf(id){
	if (jQuery(id).hasClass("move_over") == true){
		reflect_display_block(id);
		jQuery(id).draggable({disabled: true});
		jQuery(id).removeClass("move_over");
		jQuery(id).parent().parent().parent().find(".move").removeClass("move_bt_active");
	}
	else{
		jQuery(id).draggable({disabled: false});
		reflect_display_none(id);
		jQuery(id).addClass("move_over");
		jQuery(id).parent().parent().parent().find(".move").addClass("move_bt_active");
	}
}

function move_back(id){
		// Reset position
		var pdf_left = jQuery(id).attr("data-original-left");
		var pdf_top = jQuery(id).attr("data-original-top");
		
		jQuery(id).css("left", pdf_left);
		jQuery(id).css("top", pdf_top);

}	

function slider_pdf(id, current_page){
	jQuery(id).parent().parent().parent().find(".pdf-book-slider").val(current_page); 
}	


function getScrollBarWidth () {
    var outer = jQuery('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = jQuery('<div>').css({width: '100%'}).appendTo(outer).outerWidth();
    outer.remove();
    return 100 - widthWithScroll;
}


//reflection
var site_first_load = true;
var img_base64 = "";

function reflect_img(id){

//prüfen ob reflect erwünscht ist, da es sehr viele ressourecen benötigt
if (jQuery(id).parent().parent().find(".reflection").length <= 0 ){
	return;
}
jQuery(id).parent().parent().find(".reflection").css("visibility", "hidden");
	
	if (site_first_load == true){
		jQuery(window).on("load", function(){
		setTimeout(function(){
			html2canvas(document.querySelector(id)).then(canvas => {			
			img_base64 = canvas.toDataURL();
					rotate(img_base64, 180, function(rotateBase64) {
						set_reflection_img(id, rotateBase64);
						console.log(rotateBase64);
						jQuery(id).parent().parent().find(".reflection").css("visibility", "visible");
						site_first_load = false;
					});
			
			});
		}, 500);
		});
	}
	else if (site_first_load == false){
		html2canvas(document.querySelector(id)).then(canvas => {
		img_base64 = canvas.toDataURL();
					rotate(img_base64, 180, function(rotateBase64) {
						set_reflection_img(id, rotateBase64);
						console.log(rotateBase64);
						jQuery(id).parent().parent().find(".reflection").css("visibility", "visible");
					});
		});	
	}
	img_base64 = "";
	
	
	
}

function set_reflection_img(id, img){
var display = "single";
var first_or_last_side = false;
var reflection_width= jQuery(id).width();
var pdf_wrapper_left_position = jQuery(id).parent().parent().offset().left;
var pdf_left_position = jQuery(id).offset().left;
var pfd_site_position = pdf_left_position - pdf_wrapper_left_position;
var current_page = jQuery(id).turn("pages");
var page_view = jQuery(id).turn("view"); //gibt 2 seiten aus wenn doppelt view
var page_view_split = page_view.toString().split(",");

	/* Prüfung ob einseitig oder zweiseitig ist nicht nötig....
	
	//wenn ansicht doppelt ist und nicht single seite
	if (page_view_split.length > 0){
		display = "double";
	}
	//wenn erste oder letzte seite enthalten sind
	if (page_view_split.includes("0")){
		first_or_last_side = true;
	}	
	
	//wenn doppelte seite aber nicht die erste oder letzte seite enthalten ist
	if (display == "double" && first_or_last_side == false){
		// Breite ist immer Book_id width //reflection_width = jQuery(id).find("[page='" + page_view_split[0] + "']").width() + jQuery(id).find("[page='" + page_view_split[1] + "']").width();
		//pdf_left_position = jQuery(id).find("[page='" + page_view_split[0] + "']").offset().left;
	}
	
		//wenn doppelte Ansicht, aber eine davon nicht vorhanden ist, da erste oder letzte seite 	
	if (display == "double" && first_or_last_side == true){
			var not_last_or_first_site = "";
			if (page_view_split[0].includes("0")){
				not_last_or_first_site = page_view_split[1];
			}
			else if (page_view_split[1].includes("0")){
				not_last_or_first_site = page_view_split[0];
			}
		//Breite und position von der EINEN vorhanden seite 	
		//pdf_left_position = jQuery(id).find("[page='" + not_last_or_first_site + "']").offset().left;
		// Breite ist immer Book_id width //reflection_width = jQuery(id).find("[page='" + not_last_or_first_site + "']").width();
	}
	
	//wenn display single ist
	if (display == "single"){
		// Breite ist immer Book_id width //reflection_width = jQuery(id).find("[page='" + current_page + "']").width();
		//pdf_left_position = jQuery(id).find("[page='" + current_page + "']").offset().left;
	}
	*/
	 	
jQuery(id).parent().parent().find(".reflection").css("left", pfd_site_position);
jQuery(id).parent().parent().find(".reflection").css("width", reflection_width);
jQuery(id).parent().parent().find(".reflection").css("background-image", "url(" + img + ")");

}


function rotate(srcBase64, degrees, callback) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  var image = new Image();

  image.onload = function () {
    canvas.width = degrees % 180 === 0 ? image.width : image.height;
    canvas.height = degrees % 180 === 0 ? image.height : image.width;
	
	ctx.setTransform(1, 0, 0, 1, image.width / 2, image.height / 2);
	ctx.scale(1, -1); // horizontal spiegeln
	
	//ctx.translate(canvas.width / 2, canvas.height / 2);
    //ctx.rotate(degrees * Math.PI / 180);
	
    ctx.drawImage(image, image.width / -2, image.height / -2);

    callback(canvas.toDataURL());
  };

  image.src = srcBase64;
}

function reflect_display_none(id){
	jQuery(id).parent().parent().find(".reflection").addClass("pdf_control_none");
}
function reflect_display_block(id){
	jQuery(id).parent().parent().find(".reflection").removeClass("pdf_control_none");
}
function transform_book(id, visibility){
	if (visibility == "disabled"){
	jQuery(id).closest(".pdf_book_container").addClass("flip_parent");
	jQuery(id).closest(".pdf_book_wrapper").addClass("flip_child");
	}
	if (visibility == "enable"){
	jQuery(id).closest(".pdf_book_container").removeClass("flip_parent");
	jQuery(id).closest(".pdf_book_wrapper").removeClass("flip_child");
	}
}


//AUSFÜHREN der Controll-Buttons#############################
//###########################################################

jQuery(document).ready(function(){
	
	
	
	jQuery(".ui-flipbook").bind("turned", function(){
	var id = "#" + jQuery(this).attr("id");
	var current_page = jQuery(id).turn("page");
	var all_sites = jQuery(id).turn("pages");
	jQuery(id).parent().parent().parent().find(".current_page").html(current_page); 
	jQuery(id).parent().parent().parent().find(".all_sites").html(all_sites);
	slider_pdf(id, current_page);
	jQuery(id).parent().parent().find(".reflection").css("visibility", "hidden");
	//reflect img
	reflect_img(id);
	});
	
	jQuery(".ui-flipbook").bind("turning", function(){
	var id = "#" + jQuery(this).attr("id");
	jQuery(id).parent().parent().find(".reflection").css("visibility", "hidden");
	});
	
	
	
//tunring site
	
	jQuery(".ui-flipbook").bind("start", function(){
			
		jQuery(this).mousedown(function() {
			var id = "#" + jQuery(this).attr("id");
			jQuery(id).parent().parent().find(".reflection").css("visibility", "hidden");
		})
		.mouseup(function() {
			var id = "#" + jQuery(this).attr("id");
			jQuery(id).parent().parent().find(".reflection").css("visibility", "visible");
		});
		
	});
	
	
	
// Slider 
jQuery(document).on('input', '.pdf-book-slider', function() {
    var set_page = jQuery(this).val();
	var id = jQuery(this).closest(".slider").attr("data-book-id");
	go_to_page(id, set_page);
	var current_page = jQuery(id).turn("page");
	var all_sites = jQuery(id).turn("pages");
	jQuery(id).parent().parent().parent().find(".current_page").html(current_page); 
	jQuery(id).parent().parent().parent().find(".all_sites").html(all_sites);
});


//Home Button
jQuery(document).on( "click", ".bt-options .home", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	home_pdf(id);
});
	

//Prev Button
jQuery(document).on( "click", ".bt-options .prev", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	prev_pdf(id);
	var current_page = jQuery(id).turn("page");
	var all_sites = jQuery(id).turn("pages");
	jQuery(id).parent().parent().parent().find(".current_page").html(current_page); 
	jQuery(id).parent().parent().parent().find(".all_sites").html(all_sites);
	jQuery(id).parent().parent().parent().find(".pdf-book-slider").val(current_page); 
});

//Next Button
jQuery(document).on( "click", ".bt-options .next", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	next_pdf(id);
	
	var current_page = jQuery(id).turn("page");
	var all_sites = jQuery(id).turn("pages");
	jQuery(id).parent().parent().parent().find(".current_page").html(current_page); 
	jQuery(id).parent().parent().parent().find(".all_sites").html(all_sites);
	jQuery(id).parent().parent().parent().find(".pdf-book-slider").val(current_page);  
});


//Prev inside book
jQuery(document).on( "click", ".prev_inside", function() {
	var id = jQuery(this).attr("data-prev");
	prev_pdf(id);
	var current_page = jQuery(id).turn("page");
	var all_sites = jQuery(id).turn("pages");
	jQuery(id).parent().parent().parent().find(".current_page").html(current_page); 
	jQuery(id).parent().parent().parent().find(".all_sites").html(all_sites);
	jQuery(id).parent().parent().parent().find(".pdf-book-slider").val(current_page); 
});

//next inside book
jQuery(document).on( "click", ".next_inside", function() {
	var id = jQuery(this).attr("data-next");
	next_pdf(id);
	
	var current_page = jQuery(id).turn("page");
	var all_sites = jQuery(id).turn("pages");
	jQuery(id).parent().parent().parent().find(".current_page").html(current_page); 
	jQuery(id).parent().parent().parent().find(".all_sites").html(all_sites);
	jQuery(id).parent().parent().parent().find(".pdf-book-slider").val(current_page);  
});


//Zoom-in Button
jQuery(document).on( "click", ".bt-options .zoom-in", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	reflect_display_none(id);
	zoom_in_pdf(id);
});

//Zoom-out Button
jQuery(document).on( "click", ".bt-options .zoom-out", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	reflect_display_none(id);
	zoom_out_pdf(id);
});
	
//Zoom-default Button
jQuery(document).on( "click", ".bt-options .zoom-default", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	reflect_display_block(id);
	zoom_default_pdf(id);
});

//Fullscreen Button
jQuery(document).on( "click", ".bt-options .fullscreen", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	fullscreen_pdf(id);
	if (jQuery(this).hasClass("bi-fullscreen")){
		jQuery(this).removeClass("bi-fullscreen");
		jQuery(this).addClass("bi-fullscreen-exit");
		jQuery(this).closest(".controls").addClass("controls_fullscreen");
		reflect_display_none(id);
	}
	else if (jQuery(this).hasClass("bi-fullscreen-exit")){
	jQuery(this).removeClass("bi-fullscreen-exit");
		jQuery(this).addClass("bi-fullscreen");
		jQuery(this).closest(".controls").removeClass("controls_fullscreen");
		reflect_display_block(id);
	}
});

//Draggable
jQuery(document).on( "click", ".bt-options .move", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	move_pdf(id);
});

//Draggable reset
jQuery(document).on( "click", ".bt-options .back", function() {
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	move_back(id);
	reflect_display_block(id);
});


//Transform_Book
jQuery(document).on( "click", ".bt-options .transform-book", function() {
	
	var id = jQuery(this).closest(".bt-options").attr("data-book-id");
	var transform_status = jQuery(this).attr("data-transform");
	var visibility = transform_status;
	
	if (transform_status == "disabled"){
		transform_book(id, visibility);
	jQuery(this).attr("data-transform", "enable");	
	}
	if (transform_status == "enable"){
		transform_book(id, visibility);
		jQuery(this).attr("data-transform", "disabled");	
	}
	
});


//scroll



var mouse_over = false;
var mouse_over_id = "";
var scroll_counter = 1;


jQuery(document).on('mouseenter mouseleave', '.ui-flipbook', function (e) {
		
 //wenn maus über pdf-book ist UND das attribute data-mousewheel-scroll auf true gesett ist(wird bei funktionsaufruf abgefragt, ob gescrollt werden soll), wird  die variable mouse_over auf true gesetzt und das scrollen aktiviert
	if (e.type === 'mouseenter' && jQuery(this).parent().parent().parent().children(".controls").attr("data-mousewheel-scroll") == "true"){
		jQuery("body").addClass("pdf_book_scroll");
		//jQuery("body").css("marginRight", getScrollBarWidth());
		mouse_over = true;
		mouse_over_id = jQuery(this).attr("id");
	}
	else {
		jQuery("body").removeClass("pdf_book_scroll");	
		jQuery("body").css("marginRight", "0px");
		mouse_over = false;
	}
   
});

jQuery("html").on('DOMMouseScroll mousewheel', function (e) {

  if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
    //scroll down
	
	if (mouse_over === true){
		var id = "#"+ mouse_over_id;
		var max_site = jQuery(id).turn("pages");
		var min_site = 1;
	
		if (scroll_counter > min_site){
			scroll_counter -= 1;
			prev_pdf(id);
			var current_page = jQuery(id).turn("page");
			slider_pdf(id, current_page);
		}
		
	}
	
  } else {
    //scroll up
    if (mouse_over === true){
		var id = "#"+ mouse_over_id;
		var max_site = jQuery(id).turn("pages");
		var min_site = 1;
	
		if (scroll_counter < max_site){
			scroll_counter += 1;
			var current_page = jQuery(id).turn("page");
			next_pdf(id);
			slider_pdf(id, current_page);
		}
	}
  }
});
	

 
}); //document.ready(function) ende
	
jQuery(window).on("load", function(){
	
	//falls mehr Buttons als wrap breite, umbrechen
	jQuery("body").find(".bt-options").each(function(){
		var button_anzahl = jQuery(this).find("a").length;
		var button_width = jQuery(this).find("a").length * jQuery(this).children("a").width();
		var bt_options_width = jQuery(this).width();
		var button_anzahl = jQuery(this).find("a").length;
		var max_button_pro_zeile = Math.round(button_anzahl / 2);
		
		if (button_width > bt_options_width){
			jQuery(this).find("a").eq(max_button_pro_zeile).after("<br />");
			
		}
		
		
		
	});
});
	
