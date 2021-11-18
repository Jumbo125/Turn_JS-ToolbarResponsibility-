# Turn_JS-ToolbarResponsibility
<h3>Turn_js extension</h3>
I use the very great turn.js script to show my pdf files.
It look's great! But i'm missing some features.

<ul><b><u>it includes:</u></b>
<li>Toolbar</li>
<li>Responsibility</li>
</ul>

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
<h4>Bei Problemen, <b>zum Drucken oder Speichern</b> klicken sie bitte hier: <a href="images/flyer/aktuell/Flyer.pdf" target="_blank" rel="noopener noreferrer">Flyer</a></h4>
<p>Alle Infos können Sie aus unserem Flyer entnehmen. Dieser ist online verfügbar: <a href="images/flyer/aktuell/Flyer.pdf" target="_blank" rel="noopener noreferrer">Flyer</a></p></div>

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
controlls_for_all_books(resposive_ratio, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen )
```

###Method 2- Set the pdf-book. Use the ID to select the book.
All parameters can be set to true or false. BUT: display can only be set to "single" or "double". To get more infos look at the turn.js documentation "display" 

```
controlls_for_book(ID, responsive_ratio, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen)
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
//controlls_for_book(ID, responsive_ratio, display, slider, bt_options, home, download, prev, next, zoom_in, zoom_out, zoom_default, fullscreen){    
 controlls_for_book("yourID", true, "single", true, true, false, true, true, true, false, false, false, true);
});
``` 

