var btns = document.querySelectorAll('button');
var clipboard = new Clipboard(btns);

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});

function showTT(elem) {
	elem.classList.add('tooltipped', 'tooltipped-s');
}
function hideTT(elem) {
	elem.classList.remove('tooltipped', 'tooltipped-s');
}