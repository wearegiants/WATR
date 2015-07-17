(function($,History,undefined)
{function SmartAjax(){}
SmartAjax.supported=window.History.enabled;SmartAjax.enabled=true;SmartAjax.html4=true;SmartAjax.isAbsolute=new RegExp('^https?://','i');SmartAjax.hasProtocol=new RegExp('^([a-z\+]+)://','i');SmartAjax.contentTypeMatch=/([a-z0-9\*\.\-]+)\/([a-z0-9\*\.\-]+)/i;SmartAjax.isDebug=false;SmartAjax.linkFilter=['jpe?g','png','gif','bmp','swf','mp3','flv','mp4','wmv','wav','flac','midi','txt','pdf','pptx?','xlsx?','odt','odp','ods','ppsx?','csv','css','js','vbs','djvu','zip','rar','7zip','tar','gz','tgz','bin','avi','mkv','3gp','sub','srt','diff'];SmartAjax.allowedTypes=['','text/html','text/xml','text/plain'];SmartAjax.root=History.getRootUrl();SmartAjax.options={cache:false,timeout:5,reload:false,history:true,analytics:true,containers:[{selector:'#content, article, #article, .article, #post, .post',ifNotFound:'reload'}],before:function(url)
{SmartAjax.proceed();},success:function(url)
{SmartAjax.proceed();},error:function(url)
{window.location=url;},done:function(url,replacedContainers)
{}};SmartAjax.state=History.getState();SmartAjax.currentRequest=false;SmartAjax.instanceOptions=SmartAjax.options;SmartAjax.isManual=false;SmartAjax._binds=[];SmartAjax._formbinds=[];SmartAjax._proceedTemplate={url:'',step:0,data:'',method:'get',vars:{},replace:false};SmartAjax._proceed={};resetProceed();SmartAjax.setOptions=function(options)
{$.extend(SmartAjax.options,options);SmartAjax.instanceOptions=$.extend({},SmartAjax.options,SmartAjax.instanceOptions,options);};SmartAjax.unbind=function()
{SmartAjax._binds=[];};SmartAjax.unbindForms=function()
{SmartAjax._formbinds=[];};SmartAjax.bind=function(selector,options)
{SmartAjax._binds.unshift({selector:selector,options:options});};SmartAjax.bindForms=function(selector,options)
{SmartAjax._formbinds.unshift({selector:selector,options:options});};SmartAjax._init=function()
{$(document).bind('click.smartajax',function(e){if(!e.isDefaultPrevented())
{var $target=$(e.target);if(!$target.is('a'))
{$target=$target.parents("a:first");if($target.length==0)
return true;}
var opt=get_bind_obj($target,SmartAjax._binds);if(opt===false)
return true;var ret=SmartAjax.handle($target,opt.options);if(ret===false)
e.preventDefault();return ret;}});$(document).bind('submit.smartajax',function(e){if(!e.isDefaultPrevented())
{var $target=$(e.target);if(!$target.is('form'))
{$target=$target.filter("input[type=submit]").parents("form:first");if($target.length==0)
return true;}
var opt=get_bind_obj($target,SmartAjax._formbinds);if(opt===false)
return true;var ret=SmartAjax.handleForm($target,opt.options);if(ret===false)
e.preventDefault();return ret;}});}
SmartAjax.handle=function(element,options)
{$element=$(element).filter('a:ajaxlink').filter(':first');if($element.length==0)
return true;if(SmartAjax.isDebug)
console.log('SmartAjax: Handling ',$element);return!SmartAjax.load($element.attr('href'),options);};SmartAjax.handleForm=function(element,options)
{$element=$(element).filter(':ajaxform').filter(':first');if($element.length==0)
return true;if(SmartAjax.isDebug)
console.log('SmartAjax: Handling form ',$element);if($element.find("input[type=file]").length>0)
{if($element.attr("action")==undefined||$element.attr("action").length==0)
$element.attr("action",SmartAjax.state.url);return true;}
var vars=serialize($element);var method='get';if($element.attr('method').length>0&&$element.attr('method').toLowerCase()=='post')
method='post';var url=SmartAjax.state.url;if($element.attr('action')!=null&&$element.attr('action').length>0)
url=$element.attr('action');if(typeof options!=='object')
options={};if(method!='get')
options.history=false;else
{url=getQueryString(url,vars);vars={};}
options.reload=true;return!SmartAjax.load(url,options,method,vars);};SmartAjax.load=function(url,options,method,vars)
{if(method==undefined)
method='get';if(vars==undefined)
vars={};SmartAjax.isManual=true;url=History.getFullUrl(url||'');SmartAjax.instanceOptions=$.extend({},SmartAjax.options,options);if(!SmartAjax.instanceOptions.reload&&url==SmartAjax.state.url)
return true;resetProceed();SmartAjax._proceed.url=url;SmartAjax._proceed.step=1;SmartAjax._proceed.method=method;SmartAjax._proceed.vars=vars;var ret=SmartAjax.instanceOptions.before(url);if(ret===false)
{resetProceed();return false;}
return true;};SmartAjax.proceed=function()
{var self=SmartAjax;var url=self._proceed.url;if(self._proceed.step==0||url.length==0)
return false;if(self._proceed.step==1)
{if((self.instanceOptions.reload&&url==self.state.url)||!self.instanceOptions.history)
History.replaceState({rand:Math.random()},null,self._proceed.url);else
History.pushState({},null,self._proceed.url);}
else if(self._proceed.step==3)
{SmartAjax.load_internal(SmartAjax._proceed.url);}
else if(self._proceed.step==2)
{var data=self._proceed.data.replace(/<\!DOCTYPE[^\>]*>/i,'').replace(/<(html|head|body|title)( ([^\>]*))?\>/gi,'<div id="smartajax-$1" class="smartajax-meta" style="display:none;" $2>').replace(/<(meta|script|link)( ([^\>]*))?\>/gi,'<div class="smartajax-meta smartajax-$1" style="display:none;" $2>').replace(/<\/(html|head|body|title|meta|script|link)\>/gi,'</div>');if(self.isDebug)
console.log('SmartAjax: handling data from ',url);var $data=$(data);var $title=$data.find('#smartajax-title');if($title.length>0)
document.title=$title.text();var replacedContainers=[];for(i=0;i<self.instanceOptions.containers.length;i++)
{var opt=self.instanceOptions.containers[i];var $newcont=$data.find(opt.selector).andSelf().filter(opt.selector).filter(':first');if($newcont.length==0)
{if(opt.ifNotFound==undefined)
opt.ifNotFound='reload';if(typeof opt.ifNotFound==='function')
opt.ifNotFound(opt,$(document).find(opt.selector));else if(opt.ifNotFound=='reload')
{window.location=url;return false;}
else if(opt.ifNotFound=='empty')
$(document).find(opt.selector).empty();else if(opt.ifNotFound=='hide')
$(document).find(opt.selector).hide();else if(opt.ifNotFound=='keep')
continue;}
else
{var $container=$(document).find(opt.selector);$container.html($newcont.html());if((opt.showIfFound||opt.showIfFound==undefined)&&$container.is(':hidden'))
$container.show();SmartAjax.runScripts($container.find('.smartajax-script'));replacedContainers.push(opt);}
$newcont.remove();}
var $scripts=$data.filter('.smartajax-script');$('body').append($scripts);SmartAjax.runScripts($scripts);if(self.instanceOptions.analytics!==false)
{if(typeof self.instanceOptions.analytics==='object')
self.instanceOptions.analytics.push(['_trackPageview',History.getShortUrl(url)]);else if(window._gaq!=undefined)
window._gaq.push(['_trackPageview',History.getShortUrl(url)]);else if(window.pageTracker!=undefined)
window.pageTracker._trackPageview(History.getShortUrl(url));}
if(self.isDebug)
console.log('SmartAjax: done with ',url);resetProceed();self.instanceOptions.done(url,replacedContainers);}};SmartAjax.runScripts=function($scripts)
{$scripts.each(function(){var $this=$(this);var script=$this.html();var node=document.createElement('script');if($this.attr('type')!=null)
node.setAttribute('type',$(this).attr('type'));if($this.attr('src')!=null)
node.setAttribute('src',$(this).attr('src'));if(script.length>0)
{if($.browser.msie)
{if($.browser.version<8)
window.execScript(script);else
{node.text=script;$this.after(node);$this.remove();}}
else
{var txtNode=document.createTextNode(script);node.appendChild(txtNode);$this.after(node);$this.remove();}}});};SmartAjax.handleChangeState=function()
{var state=History.getState();SmartAjax.state=state;if(SmartAjax.isDebug)
console.log('SmartAjax: State changed!',state);if(!SmartAjax.isManual)
{resetProceed();SmartAjax.instanceOptions=SmartAjax.options;SmartAjax._proceed.url=SmartAjax.state.url;SmartAjax._proceed.step=3;var ret=SmartAjax.instanceOptions.before(SmartAjax.state.url);if(!ret)
resetProceed();}
else
SmartAjax.load_internal(SmartAjax.state.url);SmartAjax.isManual=false;return true;};SmartAjax.load_internal=function(url)
{var self=SmartAjax;if(self.currentRequest!==false)
SmartAjax.abort(false);self.currentRequest=$.ajax(url,{cache:self.instanceOptions.cache,timeout:self.instanceOptions.timeout*1000,type:self._proceed.method.toUpperCase(),data:self._proceed.vars,beforeSend:function(xhr,settings)
{xhr.setRequestHeader('Accept','text/html');},error:function(jqXHR,textStatus,errorThrown)
{if(self.currentRequest===false)
return;if(self.isDebug)
console.log('SmartAjax: error loading ',url);resetProceed();self.instanceOptions.error(url);},success:function(data,textStatus,jqXHR)
{self._proceed.step=2;self._proceed.url=url;self._proceed.data=data;self.instanceOptions.success(url);},onreadystatechange:function(xhr,jqXHR)
{if((xhr.readyState==2||xhr.readyState==3)&&xhr.getResponseHeader("Content-Type").length>0)
{var ct=xhr.getResponseHeader("Content-Type").match(SmartAjax.contentTypeMatch);if(!in_array(ct[0],SmartAjax.allowedTypes))
SmartAjax.abort(true);}}});};SmartAjax.abort=function(callErrorHandler)
{if(callErrorHandler==undefined)
callErrorHandler=true;if(SmartAjax.currentRequest!==false)
{var jqXHR=SmartAjax.currentRequest;if(!callErrorHandler)
SmartAjax.currentRequest=false;jqXHR.abort();resetProceed();}};function resetProceed()
{SmartAjax.currentRequest=false;SmartAjax._proceed=$.extend({},SmartAjax._proceedTemplate);}
function implode(array,separator)
{var str='';var first=true;for(var i=0;i<array.length;i++)
{if(!first)
str+=separator;first=false;str+=array[i];}
return str;}
function in_array(value,array)
{for(var i=0;i<array.length;i++)
if(array[i]==value)
return true;return false;}
function get_bind_obj($element,array)
{for(var i=0;i<array.length;i++)
if($element.is(array[i].selector))
return array[i];return false;}
function serialize($form)
{var s=$form.serialize();var btn=$("input[name][type=submit]");if(btn.length==0)
return s;var str=btn.attr('name')+'='+btn.val();if(s.length>0)
s+='&'+str;else
s=str;return s;}
function getQueryString(url,vars)
{if(url.indexOf('?')>0)
url=url.substring(0,url.indexOf('?'));return url+'?'+vars;}
$.expr[':'].ajaxlink=function(obj,index,meta,stack)
{var $this=$(obj);var self=SmartAjax;if(!$this.is('a'))
return false;var href=$this.attr('href')||'';var regex=new RegExp("\\.("+implode(self.linkFilter,'|')+")(\#.*)?$",'i');if(regex.test(href)||href.substr(0,1)=='#')
return false;else if(self.isAbsolute.test(href))
return(href.substr(0,self.root.length)==self.root);else if(self.hasProtocol.test(href))
return false;else
return true;};$.expr[':'].ajaxform=function(obj,index,meta,stack)
{var $this=$(obj);var self=SmartAjax;if(!$this.is('form'))
return false;var url=$this.attr('action')||'';if(self.isAbsolute.test(url))
return(url.substr(0,self.root.length)==self.root);else if(self.hasProtocol.test(url))
return false;else
return true;};$.ajaxPrefilter(function(options,_,jqXHR){if(options.onreadystatechange){var xhrFactory=options.xhr;options.xhr=function(){var xhr=xhrFactory.apply(this,arguments);function handler(){options.onreadystatechange(xhr,jqXHR);}
if(xhr.addEventListener){xhr.addEventListener("readystatechange",handler,false);}else{setTimeout(function(){var internal=xhr.onreadystatechange;if(internal){xhr.onreadystatechange=function(){handler();internal.apply(this,arguments);};}},0);}
return xhr;};}});window.SmartAjax=SmartAjax;SmartAjax._init();History.Adapter.bind(window,'statechange',SmartAjax.handleChangeState);})(window.jQuery,window.History);