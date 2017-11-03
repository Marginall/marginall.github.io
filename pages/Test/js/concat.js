!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(e){var t,n,r,a,i,o,s="Close",c="BeforeClose",l="AfterClose",u="BeforeAppend",d="MarkupParse",p="Open",m="Change",f="mfp",g="."+f,h="mfp-ready",v="mfp-removing",b="mfp-prevent-close",y=function(){},_=!!window.jQuery,w=e(window),C=function(e,n){t.ev.on(f+e+g,n)},I=function(t,n,r,a){var i=document.createElement("div");return i.className="mfp-"+t,r&&(i.innerHTML=r),a?n&&n.appendChild(i):(i=e(i),n&&i.appendTo(n)),i},x=function(n,r){t.ev.triggerHandler(f+n,r),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(r)?r:[r]))},k=function(n){return n===o&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),o=n),t.currTemplate.closeBtn},T=function(){e.magnificPopup.instance||(t=new y,t.init(),e.magnificPopup.instance=t)},S=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1};y.prototype={constructor:y,init:function(){var n=navigator.appVersion;t.isLowIE=t.isIE8=document.all&&!document.addEventListener,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=S(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),r=e(document),t.popupsCache={}},open:function(n){var a;if(!1===n.isObj){t.items=n.items.toArray(),t.index=0;var o,s=n.items;for(a=0;a<s.length;a++)if(o=s[a],o.parsed&&(o=o.el[0]),o===n.el[0]){t.index=a;break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0;if(t.isOpen)return void t.updateItemHTML();t.types=[],i="",n.mainEl&&n.mainEl.length?t.ev=n.mainEl.eq(0):t.ev=r,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=I("bg").on("click"+g,function(){t.close()}),t.wrap=I("wrap").attr("tabindex",-1).on("click"+g,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=I("container",t.wrap)),t.contentContainer=I("content"),t.st.preloader&&(t.preloader=I("preloader",t.container,t.st.tLoading));var c=e.magnificPopup.modules;for(a=0;a<c.length;a++){var l=c[a];l=l.charAt(0).toUpperCase()+l.slice(1),t["init"+l].call(t)}x("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(C(d,function(e,t,n,r){n.close_replaceWith=k(r.type)}),i+=" mfp-close-btn-in"):t.wrap.append(k())),t.st.alignTop&&(i+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:w.scrollTop(),position:"absolute"}),(!1===t.st.fixedBgPos||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:r.height(),position:"absolute"}),t.st.enableEscapeKey&&r.on("keyup"+g,function(e){27===e.keyCode&&t.close()}),w.on("resize"+g,function(){t.updateSize()}),t.st.closeOnContentClick||(i+=" mfp-auto-cursor"),i&&t.wrap.addClass(i);var u=t.wH=w.height(),m={};if(t.fixedContentPos&&t._hasScrollBar(u)){var f=t._getScrollbarSize();f&&(m.marginRight=f)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):m.overflow="hidden");var v=t.st.mainClass;return t.isIE7&&(v+=" mfp-ie7"),v&&t._addClassToMFP(v),t.updateItemHTML(),x("BuildControls"),e("html").css(m),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||e(document.body)),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(h),t._setFocus()):t.bgOverlay.addClass(h),r.on("focusin"+g,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),x(p),n},close:function(){t.isOpen&&(x(c),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(v),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){x(s);var n=v+" "+h+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var a={marginRight:""};t.isIE7?e("body, html").css("overflow",""):a.overflow="",e("html").css(a)}r.off("keyup"+g+" focusin"+g),t.ev.off(g),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&!0!==t.currTemplate[t.currItem.type]||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t.st.autoFocusLast&&t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,x(l)},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,r=window.innerHeight*n;t.wrap.css("height",r),t.wH=r}else t.wH=e||w.height();t.fixedContentPos||t.wrap.css("height",t.wH),x("Resize")},updateItemHTML:function(){var n=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index));var r=n.type;if(x("BeforeChange",[t.currItem?t.currItem.type:"",r]),t.currItem=n,!t.currTemplate[r]){var i=!!t.st[r]&&t.st[r].markup;x("FirstMarkupParse",i),t.currTemplate[r]=!i||e(i)}a&&a!==n.type&&t.container.removeClass("mfp-"+a+"-holder");var o=t["get"+r.charAt(0).toUpperCase()+r.slice(1)](n,t.currTemplate[r]);t.appendContent(o,r),n.preloaded=!0,x(m,n),a=n.type,t.container.prepend(t.contentContainer),x("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&!0===t.currTemplate[n]?t.content.find(".mfp-close").length||t.content.append(k()):t.content=e:t.content="",x(u),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var r,a=t.items[n];if(a.tagName?a={el:e(a)}:(r=a.type,a={data:a,src:a.src}),a.el){for(var i=t.types,o=0;o<i.length;o++)if(a.el.hasClass("mfp-"+i[o])){r=i[o];break}a.src=a.el.attr("data-mfp-src"),a.src||(a.src=a.el.attr("href"))}return a.type=r||t.st.type||"inline",a.index=n,a.parsed=!0,t.items[n]=a,x("ElementParse",a),t.items[n]},addGroup:function(e,n){var r=function(r){r.mfpEl=this,t._openClick(r,e,n)};n||(n={});var a="click.magnificPopup";n.mainEl=e,n.items?(n.isObj=!0,e.off(a).on(a,r)):(n.isObj=!1,n.delegate?e.off(a).on(a,n.delegate,r):(n.items=e,e.off(a).on(a,r)))},_openClick:function(n,r,a){if((void 0!==a.midClick?a.midClick:e.magnificPopup.defaults.midClick)||!(2===n.which||n.ctrlKey||n.metaKey||n.altKey||n.shiftKey)){var i=void 0!==a.disableOn?a.disableOn:e.magnificPopup.defaults.disableOn;if(i)if(e.isFunction(i)){if(!i.call(t))return!0}else if(w.width()<i)return!0;n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),a.el=e(n.mfpEl),a.delegate&&(a.items=r.find(a.delegate)),t.open(a)}},updateStatus:function(e,r){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),r||"loading"!==e||(r=t.st.tLoading);var a={status:e,text:r};x("UpdateStatus",a),e=a.status,r=a.text,t.preloader.html(r),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(b)){var r=t.st.closeOnContentClick,a=t.st.closeOnBgClick;if(r&&a)return!0;if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0;if(n===t.content[0]||e.contains(t.content[0],n)){if(r)return!0}else if(a&&e.contains(document,n))return!0;return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?r.height():document.body.scrollHeight)>(e||w.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){if(n.target!==t.wrap[0]&&!e.contains(t.wrap[0],n.target))return t._setFocus(),!1},_parseMarkup:function(t,n,r){var a;r.data&&(n=e.extend(r.data,n)),x(d,[t,n,r]),e.each(n,function(n,r){if(void 0===r||!1===r)return!0;if(a=n.split("_"),a.length>1){var i=t.find(g+"-"+a[0]);if(i.length>0){var o=a[1];"replaceWith"===o?i[0]!==r[0]&&i.replaceWith(r):"img"===o?i.is("img")?i.attr("src",r):i.replaceWith(e("<img>").attr("src",r).attr("class",i.attr("class"))):i.attr(a[1],r)}}else t.find(g+"-"+n).html(r)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:y.prototype,modules:[],open:function(t,n){return T(),t=t?e.extend(!0,{},t):{},t.isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},e.fn.magnificPopup=function(n){T();var r=e(this);if("string"==typeof n)if("open"===n){var a,i=_?r.data("magnificPopup"):r[0].magnificPopup,o=parseInt(arguments[1],10)||0;i.items?a=i.items[o]:(a=r,i.delegate&&(a=a.find(i.delegate)),a=a.eq(o)),t._openClick({mfpEl:a},r,i)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1));else n=e.extend(!0,{},n),_?r.data("magnificPopup",n):r[0].magnificPopup=n,t.addGroup(r,n);return r};var P,E,z,O="inline",M=function(){z&&(E.after(z.addClass(P)).detach(),z=null)};e.magnificPopup.registerModule(O,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(O),C(s+"."+O,function(){M()})},getInline:function(n,r){if(M(),n.src){var a=t.st.inline,i=e(n.src);if(i.length){var o=i[0].parentNode;o&&o.tagName&&(E||(P=a.hiddenClass,E=I(P),P="mfp-"+P),z=i.after(E).detach().removeClass(P)),t.updateStatus("ready")}else t.updateStatus("error",a.tNotFound),i=e("<div>");return n.inlineElement=i,i}return t.updateStatus("ready"),t._parseMarkup(r,{},n),r}}});var $,B="ajax",F=function(){$&&e(document.body).removeClass($)},L=function(){F(),t.req&&t.req.abort()};e.magnificPopup.registerModule(B,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(B),$=t.st.ajax.cursor,C(s+"."+B,L),C("BeforeChange."+B,L)},getAjax:function(n){$&&e(document.body).addClass($),t.updateStatus("loading");var r=e.extend({url:n.src,success:function(r,a,i){var o={data:r,xhr:i};x("ParseAjax",o),t.appendContent(e(o.data),B),n.finished=!0,F(),t._setFocus(),setTimeout(function(){t.wrap.addClass(h)},16),t.updateStatus("ready"),x("AjaxContentAdded")},error:function(){F(),n.finished=n.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",n.src))}},t.st.ajax.settings);return t.req=e.ajax(r),""}}});var A,j=function(n){if(n.data&&void 0!==n.data.title)return n.data.title;var r=t.st.image.titleSrc;if(r){if(e.isFunction(r))return r.call(t,n);if(n.el)return n.el.attr(r)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var n=t.st.image,r=".image";t.types.push("image"),C(p+r,function(){"image"===t.currItem.type&&n.cursor&&e(document.body).addClass(n.cursor)}),C(s+r,function(){n.cursor&&e(document.body).removeClass(n.cursor),w.off("resize"+g)}),C("Resize"+r,t.resizeImage),t.isLowIE&&C("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var n=0;t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,A&&clearInterval(A),e.isCheckingImgSize=!1,x("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,r=e.img[0],a=function(i){A&&clearInterval(A),A=setInterval(function(){if(r.naturalWidth>0)return void t._onImageHasSize(e);n>200&&clearInterval(A),n++,3===n?a(10):40===n?a(50):100===n&&a(500)},i)};a(1)},getImage:function(n,r){var a=0,i=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,x("ImageLoadComplete")):(a++,a<200?setTimeout(i,100):o()))},o=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,c=r.find(".mfp-img");if(c.length){var l=document.createElement("img");l.className="mfp-img",n.el&&n.el.find("img").length&&(l.alt=n.el.find("img").attr("alt")),n.img=e(l).on("load.mfploader",i).on("error.mfploader",o),l.src=n.src,c.is("img")&&(n.img=n.img.clone()),l=n.img[0],l.naturalWidth>0?n.hasSize=!0:l.width||(n.hasSize=!1)}return t._parseMarkup(r,{title:j(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(A&&clearInterval(A),n.loadError?(r.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(r.removeClass("mfp-loading"),t.updateStatus("ready")),r):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,r.addClass("mfp-loading"),t.findImageSize(n)),r)}}});var H,D=function(){return void 0===H&&(H=void 0!==document.createElement("p").style.MozTransform),H};e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,r=".zoom";if(n.enabled&&t.supportsTransition){var a,i,o=n.duration,l=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),r="all "+n.duration/1e3+"s "+n.easing,a={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},i="transition";return a["-webkit-"+i]=a["-moz-"+i]=a["-o-"+i]=a[i]=r,t.css(a),t},u=function(){t.content.css("visibility","visible")};C("BuildControls"+r,function(){if(t._allowZoom()){if(clearTimeout(a),t.content.css("visibility","hidden"),!(e=t._getItemToZoom()))return void u();i=l(e),i.css(t._getOffset()),t.wrap.append(i),a=setTimeout(function(){i.css(t._getOffset(!0)),a=setTimeout(function(){u(),setTimeout(function(){i.remove(),e=i=null,x("ZoomAnimationEnded")},16)},o)},16)}}),C(c+r,function(){if(t._allowZoom()){if(clearTimeout(a),t.st.removalDelay=o,!e){if(!(e=t._getItemToZoom()))return;i=l(e)}i.css(t._getOffset(!0)),t.wrap.append(i),t.content.css("visibility","hidden"),setTimeout(function(){i.css(t._getOffset())},16)}}),C(s+r,function(){t._allowZoom()&&(u(),i&&i.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return!!t.currItem.hasSize&&t.currItem.img},_getOffset:function(n){var r;r=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem);var a=r.offset(),i=parseInt(r.css("padding-top"),10),o=parseInt(r.css("padding-bottom"),10);a.top-=e(window).scrollTop()-i;var s={width:r.width(),height:(_?r.innerHeight():r[0].offsetHeight)-o-i};return D()?s["-moz-transform"]=s.transform="translate("+a.left+"px,"+a.top+"px)":(s.left=a.left,s.top=a.top),s}}});var N="iframe",W="//about:blank",q=function(e){if(t.currTemplate[N]){var n=t.currTemplate[N].find("iframe");n.length&&(e||(n[0].src=W),t.isIE8&&n.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(N,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(N),C("BeforeChange",function(e,t,n){t!==n&&(t===N?q():n===N&&q(!0))}),C(s+"."+N,function(){q()})},getIframe:function(n,r){var a=n.src,i=t.st.iframe;e.each(i.patterns,function(){if(a.indexOf(this.index)>-1)return this.id&&(a="string"==typeof this.id?a.substr(a.lastIndexOf(this.id)+this.id.length,a.length):this.id.call(this,a)),a=this.src.replace("%id%",a),!1});var o={};return i.srcAction&&(o[i.srcAction]=a),t._parseMarkup(r,o,n),t.updateStatus("ready"),r}}});var Y=function(e){var n=t.items.length;return e>n-1?e-n:e<0?n+e:e},K=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=t.st.gallery,a=".mfp-gallery";if(t.direction=!0,!n||!n.enabled)return!1;i+=" mfp-gallery",C(p+a,function(){n.navigateByImgClick&&t.wrap.on("click"+a,".mfp-img",function(){if(t.items.length>1)return t.next(),!1}),r.on("keydown"+a,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),C("UpdateStatus"+a,function(e,n){n.text&&(n.text=K(n.text,t.currItem.index,t.items.length))}),C(d+a,function(e,r,a,i){var o=t.items.length;a.counter=o>1?K(n.tCounter,i.index,o):""}),C("BuildControls"+a,function(){if(t.items.length>1&&n.arrows&&!t.arrowLeft){var r=n.arrowMarkup,a=t.arrowLeft=e(r.replace(/%title%/gi,n.tPrev).replace(/%dir%/gi,"left")).addClass(b),i=t.arrowRight=e(r.replace(/%title%/gi,n.tNext).replace(/%dir%/gi,"right")).addClass(b);a.click(function(){t.prev()}),i.click(function(){t.next()}),t.container.append(a.add(i))}}),C(m+a,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),C(s+a,function(){r.off(a),t.wrap.off("click"+a),t.arrowRight=t.arrowLeft=null})},next:function(){t.direction=!0,t.index=Y(t.index+1),t.updateItemHTML()},prev:function(){t.direction=!1,t.index=Y(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,n=t.st.gallery.preload,r=Math.min(n[0],t.items.length),a=Math.min(n[1],t.items.length);for(e=1;e<=(t.direction?a:r);e++)t._preloadItem(t.index+e);for(e=1;e<=(t.direction?r:a);e++)t._preloadItem(t.index-e)},_preloadItem:function(n){if(n=Y(n),!t.items[n].preloaded){var r=t.items[n];r.parsed||(r=t.parseEl(n)),x("LazyLoad",r),"image"===r.type&&(r.img=e('<img class="mfp-img" />').on("load.mfploader",function(){r.hasSize=!0}).on("error.mfploader",function(){r.hasSize=!0,r.loadError=!0,x("LazyLoadError",r)}).attr("src",r.src)),r.preloaded=!0}}}});var Z="retina";e.magnificPopup.registerModule(Z,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio;n=isNaN(n)?n():n,n>1&&(C("ImageHasSize."+Z,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),C("ElementParse."+Z,function(t,r){r.src=e.replaceSrc(r,n)}))}}}}),T()}),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){var t="waitForImages",n=function(e){return e.srcset&&e.sizes}(new Image);e.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"],hasImageAttributes:["srcset"]},e.expr[":"]["has-src"]=function(t){return e(t).is('img[src][src!=""]')},e.expr[":"].uncached=function(t){return!!e(t).is(":has-src")&&!t.complete},e.fn.waitForImages=function(){var r,a,i,o=0,s=0,c=e.Deferred(),l=this,u=[],d=e.waitForImages.hasImageProperties||[],p=e.waitForImages.hasImageAttributes||[],m=/url\(\s*(['"]?)(.*?)\1\s*\)/g;if(e.isPlainObject(arguments[0])?(i=arguments[0].waitForAll,a=arguments[0].each,r=arguments[0].finished):1===arguments.length&&"boolean"===e.type(arguments[0])?i=arguments[0]:(r=arguments[0],a=arguments[1],i=arguments[2]),r=r||e.noop,a=a||e.noop,i=!!i,!e.isFunction(r)||!e.isFunction(a))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var t=e(this);i?t.find("*").addBack().each(function(){var t=e(this);t.is("img:has-src")&&!t.is("[srcset]")&&u.push({src:t.attr("src"),element:t[0]}),e.each(d,function(e,n){var r,a=t.css(n);if(!a)return!0;for(;r=m.exec(a);)u.push({src:r[2],element:t[0]})}),e.each(p,function(e,n){var r=t.attr(n);if(!r)return!0;u.push({src:t.attr("src"),srcset:t.attr("srcset"),element:t[0]})})}):t.find("img:has-src").each(function(){u.push({src:this.src,element:this})})}),o=u.length,s=0,0===o&&(r.call(l),c.resolveWith(l)),e.each(u,function(i,u){var d=new Image,p="load."+t+" error."+t;e(d).one(p,function t(n){var i=[s,o,"load"==n.type];if(s++,a.apply(u.element,i),c.notifyWith(u.element,i),e(this).off(p,t),s==o)return r.call(l[0]),c.resolveWith(l[0]),!1}),n&&u.srcset&&(d.srcset=u.srcset,d.sizes=u.sizes),d.src=u.src}),c.promise()}});