# Turn_JS-ToolbarResponsibility
<h3>Turn_js extension</h3>
I use the very great turn.js script to show my pdf files.
It look's great! But i'm missing some features.

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

 

