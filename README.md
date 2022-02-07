# Turn_JS-ToolbarResponsibility v3
##now its reflect and mousewheel include
<h3>Turn_js extension</h3>
I use the very great turn.js script to show my pdf files.
It look's great! But i'm missing some features.

<ul><b><u>it includes:</u></b>
<li>Toolbar(optional)</li>
<li>Responsibility(optional)</li>
<li>since v2 you can scroll with mousewheel to change sites, when the mouse is over the pdf book(optional)</li>
<li>since v3 you can insert a reflect. It needs to include html2canvas!</li>
</ul>

<b>Please let me know it, if you use it. </b>

So i wrote a script to easily create a toolbar and make the pdf-book responsibility.

<u><b>Toolbar includes:</b></u>
<ul>
<li>Home-Button: go to first page</li>
<li>Download-Button: download the pdf file</li>
<li>Preview: go one site back</li>
<li>Next: go to next site</li>
<li>Zoom in: zoom into site</li>
<li>Zoom out: zoom out of site</li>
<li>Zoom default: set the pdf-book zoom default</li>
<li>Fullscreen: change view to fullscreen</li>
<li>Move: move the pdf. It's a really good possibility to move the site, during zoom-in</li>
<li>Move-default: set the pdf-book to default position, if you loos controll of move.</li>
</ul>
I use the great turn_js function/events/methods. Really greate work!

<u><b>Responsibility:</u></b>
The function change the pdf-book size. 

<ul>How it works:
<li>The parent div can be set with a percentage value, like css. So it's full responibility. You can create it easy via html. see the example on the bottom of the page</li>
<li>The function get the WIDTH of the parent div.</li>
<li>Set the pdf-book width to the parent WIDTH size</li>
<li>Load the first pdf-site (in the background) in a object and get the size(width, height). </li>
<li>Calculate the Site aspect-ratio</li>
<li>Calculate the pdf-book size HEIGHT in ratio to the pdf-book WIDTH(which is the same Width like the parent div)</li> 
<li>Set pdf-book Width and Height.</li>
</ul>

<u><b>Use it:</u></b><br>

use the code from turn.js to basically inject the pdf-function. You can get more infos in the turn.js Documentation
```ruby
jQuery("#yourID").turn({
     width: 400,
height: 300,
autoCenter: true,
});
```
Now it would turn your html dom Element to a pdf-book view.
Now it's time to creeate a toolbar and fit it to the parent div.

You can use two different methods:

###Method 1- To search the full site for all PDF-Books and create the same toolbar and more:
All parameters can be set to true or false. BUT: display can only be set to "single" or "double". To get more infos look at the turn.js documentation "display" 
```
controlls_for_all_books(resposive_ratio, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen, reflection )
```

###Method 2- Set the pdf-book. Use the ID to select the book.
All parameters can be set to true or false. BUT: display can only be set to "single" or "double". To get more infos look at the turn.js documentation "display" 

```
controlls_for_book(ID, responsive_ratio, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen, reflection, transform_book)
```

###Example
```ruby

<div style="width:90%; //Your responsive width of the parent"><div id="yourID" class="turn_js ui-flipbook" data-pdf-src="path_to_the_pdf_file">
   <div class="pdf_site" span style="background-image:url(path_to_site_1_jpg);"></div>
   <div class="pdf_site" span style="background-image:url(path_to_site_2_jpg);"></div>
   <div class="pdf_site" span style="background-image:url(path_to_site_3_jpg);"></div>
   <div class="pdf_site" span style="background-image:url(path_to_site_1_jpg);"></div>
</div> 



jQuery(document).ready(function() {
//controlls_for_book(ID, responsive_ratio, mousewheel_scroll, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen, reflection, transform_book){    
ID = "your id" 
display = "singel" or "double"
all other parameters can be: true ord false
``` 

Style it easy with css, for example:
```
.bt-options {
	width: 90% !important;
	border-radius: 20px;
	background-color:#f4f4f4;
	padding-bottom:1%;
	box-shadow: 0px 0px 8px 0px #414141;
} 
   
.bt-options i{
	color:#80ba33;
	font-size: 2em;
	margin:1%;
	text-shadow: 1px 1px 1px black;
}

.bt-options i:hover{
	color:black;
}
.bt-options a:hover {
	text-decoration:none;
}
```

I use some js libraries/scripts: <br>
jquery.min.js <br/>
jquery.ui.touch-punch.js <br/>
jquery-ui.min.js <br/>
html2canvas.js <br/>


TURN_JS FILES: <br>
hash.js <br>
scissor.js <br>
turn.html4.js <br>
turn.js <br>
zoom.js <br>
<br>
MY script:<br>
my_turn_js.js <br>
<br>
and the following script from another github user, to make draggable on smartphones
jquery.ui.touch-punch.js  

A big thank to the developer from turn.js and to all Github users who made their script available 

Demo:
<a href="https://rottmanninfo.at/turn_js.html" target="_blank" >Demo</a>
