function SmartAjax_load(jsdir,callback,html4)
{var $=window.jQuery;if(jsdir.substr(jsdir.length-1,1)!='/')
jsdir+='/';if(typeof $.browser.msie!=='undefined'&&$.browser.msie==true&&$.browser.version<7)
return false;if(typeof html4==='undefined')
html4=true;if(html4&&typeof window.JSON==='undefined')
document.write('<script src="'+jsdir+'libs/history.js/json2.js"><\/script>');document.write('<script src="'+jsdir+'libs/history.js/amplify.store.js"><\/script>');document.write('<script src="'+jsdir+'libs/history.js/history.adapter.jquery.js"><\/script>');document.write('<script src="'+jsdir+'libs/history.js/history.js"><\/script>');if(html4)
document.write('<script src="'+jsdir+'libs/history.js/history.html4.js"><\/script>');document.write('<script src="'+jsdir+'smartajax.js"><\/script>');if(typeof callback==='function')
$(function(){callback();});}