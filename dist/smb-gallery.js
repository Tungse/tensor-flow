!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.smbGallery=e():t.smbGallery=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){t.exports=function(){"use strict";var t=function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];if("function"==typeof Object.assign)return Object.assign.apply(Object,[t].concat(e));if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(t),r=0;r<e.length;r++){var o=e[r];if(null!=o)for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(i[a]=o[a])}return i},e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function n(t){this.message=t}n.prototype=new Error,n.prototype.name="InvalidCharacterError";var i={b2a:function(t){for(var i=String(t),r="",o=void 0,a=void 0,l=0,u=e;i.charAt(0|l)||(u="=",l%1);r+=u.charAt(63&o>>8-l%1*8)){if((a=i.charCodeAt(l+=.75))>255)throw new n("'b2a' failed: The string to be encoded contains characters outside of the Latin1 range.");o=o<<8|a}return r},a2b:function(t){var i=String(t).replace(/=+$/,""),r="";if(i.length%4==1)throw new n("'a2b' failed: The string to be decoded is not correctly encoded.");for(var o,a,l=0,u=0;a=i.charAt(u++);~a&&(o=l%4?64*o+a:a,l++%4)?r+=String.fromCharCode(255&o>>(-2*l&6)):0)a=e.indexOf(a);return r}},r=function(t){return(t||"").match(/[^\/]*$/)[0]},o=function(t){return t.substring(0,t.length-r(t).length).replace(/\/$/,"")},a=function(t){var e=t.match(/\.\w+$/),n=e&&e[0]||"";return[t.substr(0,t.length-n.length),n]},l=/^(.*:?\/\/[^\/]+)?(\/?[^?#]+)?(\?[^#]+)?(#.*)?/,u=function(t){var e=t.match(l);if(!e)throw new Error("Failed to parse URL '"+t+"'");if(""===(e[2]||""))throw new Error("Invalid URL '"+t+"'");return{base:e[1]||"",path:e[2]||"",search:e[3]||"",hash:e[4]||""}},s=function(t){return""+t.base+t.path+t.search+t.hash},c=function(t,e,n,i,r){return void 0===r&&(r=""),{path:t,type:e,id:n,params:i,name:r,ext:a(t)[1]}},d=function(t,e){return n=e.map(function(t){return t.join(" ")}).join("")+""+t.split("").reduce(function(t,e,n){return n%3==0&&t.push(e),t},[]).join(""),i.b2a(n).replace(/[\/+]/g,function(t){return{"/":"_","+":"-"}[t]});var n},h=function(t){return t.length&&function(t){return t.length&&t.split("").map(function(t){return t.split(" ")})||[]}(function(t){return i.a2b(t.replace(/[-_]/g,function(t){return{"-":"+",_:"/"}[t]}))}(t).split("",1)[0])||[]},f=/^\/?(\w+\/)?(?:[a-z0-9]{3}\/){4}(?:[a-z0-9_]{2,}\/)?([a-z0-9]+)_?([a-z0-9]+=?=?)?\..*$/i,m=/^\/?(?:\w+\/)?(?:[0-9a-f]{2}\/){3}([0-9a-f]{6}_[0-9a-f]{13})_?([a-z0-9]+=?=?)?\..*$/i,p=/^\/?(?:[0-9a-f]{2}\/){3}[0-9a-f]{26}_/,g=/(^.*\/)([^\/]+)\.(gif|png|jpg|jpeg|mp3)$/,w=/^(.*)-(r[lcr][tmb])(\d+)x(\d+)(u?)$/,v=[function(t){var e=null,n=t.match(f),i=[];return n&&(i=h(n[3]||""),e=c(t,"sti-v1",(n[1]||"")+n[2],i)),e},function(t){var e=null,n=t.match(m),i=[];return n&&(i=h(n[2]||""),e=c(t,"sti-v2",n[1],i)),e},function(t){var e,n=null,i=t.match(p),r=[];return i&&(e=a(t)[0].split("_"),r=h(e[1]),n=c(t,"sti-v3",e[0].replace(/\//g,""),r,e.slice(2).join("_"))),n},function(t){var e=null,n=t.match(g),i=null,r="",o=[];return n&&((i=n[2].match(w))?(r=i[1]+"."+n[3],o=[[i[2],i[3],i[4],i[5]||""]]):r=n[2]+"."+n[3],e=c(t,"shuttle-v2","",o,r)),e}],b=function(t){for(var e=0,n=v.length,i=void 0;e<n;e+=1)if(null!==(i=v[e](t)))return i;throw new Error("Unknown path format: '"+t+"'")},y=function(t){return t.params.length>0},E=function(t,e,n){void 0===n&&(n="");var i=a(r(t.path))[0];return y(t)&&(i=i.substr(0,i.lastIndexOf("_"))),n=n||t.ext,e.length&&(i+="_"+d(t.id,e)),o(t.path)+"/"+i+n},S={"sti-v1":E,"sti-v2":E,"sti-v3":function(t,e,n){void 0===n&&(n="");var i=a(r(t.path))[0],l=i.split("_");return n=n||t.ext,i=l[0]+"_"+d(t.id,e),l.length>2&&(i+="_"+l.slice(2).join("_")),o(t.path)+"/"+i+n},"shuttle-v2":function(t,e,n){void 0===n&&(n="");var i,r,l,u=a(t.name)[0];return n=n||t.ext,l="",(i=e).length&&(r=i[0],l="-"+r[0]+r[1]+"x"+r[2]+r[3]),e=l,o(t.path)+"/"+u+e+n}},x=function(t){if(!(t in S))throw new Error("No path builder found for type '"+t+"'");return S[t]},R=function(t){return void 0===t?[]:(t||[]).filter(function(t){return t.length>0}).map(function(t){return[].concat(t)})},O=function(t){return null!==t.type.match(/^sti-v\d+$/)},P=function(e,n,i){var r=u(e),o=b(r.path),a=R(n);if(!a.length)throw new Error("Require valid set of path parameters");return s(t({},r,{path:x(o.type)(o,a,i)}))},j=function(t){return(t||"").replace(/^\.*/,"")},C=function(t,e){for(var n in e)if(e[n][0]===t)return parseInt(n);return-1};return{createShuttlePath:function(t,e,n){void 0===e&&(e=""),void 0===n&&(n="");var i=function(t){for(var e="";e.length<t;)e+=Math.random().toString(32).slice(2);return e.slice(0,t)}(32);return e||(e=i.substr(0,2)+"/"+i.substr(2,2)),n&&(n="-"+n),t=j(t),e.replace(/^\/*|\/*$/g,"")+"/"+i.substr(4)+n+"."+t},createSTIPath:function(t,e){void 0===e&&(e="");var n=function(t){for(var e="";e.length<t;)e+=Math.random().toString(16).slice(2);return e.slice(0,t)}(32),i=d(n,[]);return e&&(e="_"+e),t=j(t),n.substr(0,2)+"/"+n.substr(2,2)+"/"+n.substr(4,2)+"/"+n.substr(6)+"_"+i+e+"."+t},createVariantUrl:P,extendPathParams:function(e,n){var i=u(e),r=b(i.path),o=R(n);if(!o.length)throw new Error("Require valid set of path parameters");if(!O(r))throw new Error("Parameter extension of type '"+r.type+"' paths not implemented");return s(t({},i,{path:x(r.type)(r,r.params.concat(o))}))},getPathParams:function(t){return b(t).params},getSourceUrl:function(e,n){var i=u(e),r=b(i.path),o=function(t,e){return x(t.type)(t,[],e)}(r,n);return s(t({},i,{path:o}))},isShuttlePath:function(t){return null!==t.type.match(/^shuttle-v\d+$/)},isShuttleUrl:function(t){return g.test(t.split("/").slice(3).join("/"))},isSTIPath:O,isSTIUrl:function(t){var e=t.split("/").slice(3).join("/");return!![p,m,f].find(function(t){return t.test(e)})},isSTIv1Url:function(t){return f.test(t.split("/").slice(3).join("/"))},isSTIv2Url:function(t){return m.test(t.split("/").slice(3).join("/"))},isSTIv3Url:function(t){return p.test(t.split("/").slice(3).join("/"))},parsePath:b,parseUrl:u,indexOfActionInParams:C,updateVariantUrl:function(t,e,n){var i=u(t),r=b(i.path),o=R(r.params);if(!y(r)||i.type&&null===i.type.match(/^sti-/))return P(t,e,n);var a=C("c",o)>-1||C("c",e)>-1||C("re",e)>-1;for(var l in o)o[l][0]=a&&"r"===o[l][0]?"re":o[l][0];var s=o.reduce(function(t,e,n){return t[e[0]]=n,t},{});for(var c in e){var d=e[c];d[0]=a&&"r"===d[0]?"re":d[0],s.hasOwnProperty(d[0])?o.splice(s[d[0]],1,d):o.push(d)}return P(t,o,n)}}}()},function(t,e,n){var i,r;void 0===(r="function"==typeof(i=function(){var t=function(t,n,i,r,o){var a,l=!1,u=!1,s=e();if(r||(r=0),i||o){var c=function(){if(o&&u)try{o()}catch(t){console.error(t)}u=!1},d=function(t){if(i&&!u){try{i()}catch(t){console.error(t)}n&&(s?m.unobserve(t.target):window.removeEventListener("scroll",f,{capture:!1,passive:!0}))}u=!0},h=function(){var e=(a=t.getBoundingClientRect()).top<=window.innerHeight+r,n=0<=a.bottom+r;e&&n?d():c(),l=!1},f=function(){if(l)return!1;window.requestAnimationFrame?(window.requestAnimationFrame(h),l=!0):h()};if(s){var m=new IntersectionObserver(function(t){t.forEach(function(t){0<t.intersectionRatio?d(t):c()})},{rootMargin:"0px 0px "+r+"px"});m.observe(t)}else window.addEventListener("scroll",f,{capture:!1,passive:!0})}},e=function(){return"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype};return{once:function(e,n,i,r){t(e,!0,n,i,r)},repeat:function(e,n,i,r){t(e,!1,n,i,r)}}})?i.call(e,n,e,t):i)||(t.exports=r)},function(t,e,n){"use strict";var i,r;
/**
 * @file embedo.js
 *
 * Embedo is third party content embed plugin with features having events and resizing.
 * It provides a layer above popular social media sites native embed snippets
 * making it easier to hook content without modifying much code.
 *
 * @author Shobhit Sharma <hi@shobh.it>
 * @license MIT
 */void 0===(r="function"==typeof(i=function(){function t(e){return this.options=e||t.defaults.OPTIONS,this.requests=[],this.events=[],this.init(this.options),this}function e(e,n,i,r){if(t.log("info","automagic",e,n,i),i=i||{},r=r||function(){},!t.utils.validateElement(e)||!t.utils.validateElement(n))return r(new Error("HTMLElement does not exist in DOM."));t.utils.watcher(i.id||t.utils.uuid(),function(){var o={width:i.width||t.utils.compute(e,"width"),height:i.height||t.utils.compute(e,"height")},a={width:t.utils.compute(n,"width"),height:t.utils.compute(n,"height")};if(i.strict)return r(null,{width:o.width,height:o.height});if(i.width&&i.height){var l=a.width>o.width||a.height>o.height;if(i.width&&(n.style.width=i.width+"px"),i.height&&(n.style.height=i.height+"px"),l){var u=Math.min(o.width/a.width,o.height/a.height);t.utils.transform(n,"scale("+u+")")}}r(null,{width:o.width,height:o.height})},500)}return Object.defineProperty(t,"defaults",{value:{OPTIONS:{facebook:null,twitter:!1,instagram:!1,pinterest:!1},SOURCES:{facebook:{GLOBAL:"FB",SDK:"//connect.facebook.net/${locale}/all.js",oEmbed:"//www.facebook.com/plugins/${type}/oembed.json",REGEX:/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w\-]*)?/g,PARAMS:{version:"v3.2",cookie:!0,appId:null,xfbml:!0}},twitter:{GLOBAL:"twttr",SDK:"//platform.twitter.com/widgets.js",oEmbed:"//publish.twitter.com/oembed",REGEX:/^http[s]*:\/\/[www.]*twitter(\.[a-z]+).*/i,PARAMS:{}},instagram:{GLOBAL:"instgrm",SDK:"//www.instagram.com/embed.js",oEmbed:"//api.instagram.com/oembed",REGEX:/(http|https)?:\/\/(www\.)?instagram.com\/p\/[a-zA-Z0-9_\/\?\-\=]+/gi,PARAMS:{}},youtube:{GLOBAL:null,SDK:null,oEmbed:"//www.youtube.com/embed/",REGEX:/^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/,PARAMS:null},pinterest:{GLOBAL:"PinUtils",SDK:"//assets.pinterest.com/js/pinit.js",oEmbed:null,REGEX:/(https?:\/\/(ww.)?)?pinterest(\.[a-z]+).*/i,PARAMS:{}},vimeo:{GLOBAL:null,SDK:null,oEmbed:"//vimeo.com/api/oembed.json",REGEX:/(http|https)?:\/\/(www\.)?vimeo(\.[a-z]+)\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/,PARAMS:{}},github:{GLOBAL:null,SDK:null,oEmbed:null,REGEX:/(http|https):\/\/gist\.github\.com\/(\w+)\/(\w+)/,PARAMS:{}},soundcloud:{GLOBAL:null,SDK:null,oEmbed:"//soundcloud.com/oembed",REGEX:/^(http|https):\/\/soundcloud\.com\/(\w+)\/.*$/,PARAMS:{}}},RESTRICTED:["url","strict","height","width","centerize","jsonp"]},writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(t,"log",{value:function(e){t.debug&&"undefined"!=typeof console&&void 0!==console[e]&&console[e].apply(console,Array.prototype.slice.call(arguments,1))},writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(t,"plugins",{value:function(e){e&&(e instanceof Array?e.forEach(function(e){"function"==typeof e&&e(t)}):"fuction"===e&&e(t))},writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(t,"utils",{value:Object.create({uuid:function(){var t=65536*Math.random()|0,e=65536*Math.random()|0;return"embedo_"+(t=("000"+t.toString(36)).slice(-3))+(e=("000"+e.toString(36)).slice(-3))},extend:function(t){t=t||{};for(var e=1;e<arguments.length;e++)if(arguments[e])for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(t[n]=arguments[e][n]);return t},merge:function(t,e,n){for(var i in n=n||[],e)-1===n.indexOf(i)&&(t[i]=e[i]);return t},sequencer:function(){var t=arguments;return{then:function(e){for(var n=0,i=0;i<t.length;i++)t[i](r);function r(){++n===t.length&&e()}}}},replacer:function(t,e){if(t&&e){if(e)for(var n in e)t&&(t=t.split("${"+n+"}").join(e[n]));return t}},observer:function(){function t(){this.resolved=[],this.rejected=[]}return t.prototype={execute:function(t,e){var n=t.length;for(e=Array.prototype.slice.call(e);n--;)t[n].apply(null,e)},resolve:function(){this.execute(this.resolved,arguments)},reject:function(){this.execute(this.rejected,arguments)},done:function(t){return this.resolved.push(t),this},fail:function(t){return this.rejected.push(t),this}},t}(),camelToSnake:function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},validateURL:function(t){return/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(t)},generateElement:function(t,e,n){var i=document.createElement(t);return Object.keys(e||{}).forEach(function(t){i.setAttribute(t,e[t])}),n&&(i.innerHTML=n),i},generateEmbed:function(e,n,i){e=e||t.utils.uuid();var r=document.createElement("div");return r.setAttribute("id",e),r.setAttribute("data-embedo-id",e),r.setAttribute("data-embedo-source",n),t.utils.validateElement(i)?r.appendChild(i):r.innerHTML=i||"",r},generateScript:function(t){var e=document.createElement("script");return e.type="text/javascript",e.src=encodeURI(t),e.setAttribute("async",""),e.setAttribute("charset","utf-8"),e},validateElement:function(t){return"object"==typeof HTMLElement?t instanceof window.HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName},sdkReady:function(e,n){if(n=n||function(){},!t.defaults.SOURCES[e])return n(new Error("unsupported_sdk_type"));var i=0;!function r(){return++i>15?n(new Error(e+":sdk_not_available")):window[t.defaults.SOURCES[e].GLOBAL]?n(null,window[t.defaults.SOURCES[e].GLOBAL]):void setTimeout(r,10*i)}()},querystring:function(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")},fetch:function(e,n,i){"function"==typeof n&&(i=n,n={}),(n=n||{}).callback=n.callback||"callback";var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("script"),a="jsonp_"+t.utils.uuid();function l(t,e){try{delete window[t]}catch(e){window[t]=void 0}e&&(r.removeChild(e),e=void 0)}e=(e+=(~e.indexOf("?")?"&":"?")+n.callback+"="+encodeURIComponent(a)).replace("?&","?"),window[a]=function(t){l(a,o),i(null,t)},o.type="text/javascript",o.defer=!0,o.charset="UTF-8",o.onerror=function(t){return l(a,o),i(t)},r.appendChild(o),o.src=e},ajax:function(t,e,n){"function"==typeof e&&(n=e,e={}),n=n||function(){};var i=new XMLHttpRequest;i.onload=function(){if(i.status>=400)return n(new Error(i.responseText||i.statusText));try{return n(null,JSON.parse(i.responseText))}catch(t){return n(new Error("invalid_response"))}},i.onerror=function(t){return n(t)},i.open("GET",t),i.send()},transform:function(e,n){t.utils.validateElement(e)&&(e.style.webkitTransform=n,e.style.MozTransform=n,e.style.msTransform=n,e.style.OTransform=n,e.style.transform=n)},compute:function(e,n,i){if(t.utils.validateElement(e)&&n){var r=e.getBoundingClientRect()[n];return!i&&r||(document.defaultView&&document.defaultView.getComputedStyle?r=document.defaultView.getComputedStyle(e,"").getPropertyValue(n):e.currentStyle&&(n=n.replace(/\-(\w)/g,function(t,e){return e.toUpperCase()}),r=e.currentStyle[n])),"string"!=typeof r||/^\d+(\.\d+)?%$/.test(r)||(r=r.replace(/[^\d.-]/g,"")),isNaN(Number(r))?r:Number(r)}},convertToPx:function(e,n,i){return isNaN(Number(i))?/^\d+(\.\d+)?%$/.test(i)?function(e,n,i){var r=t.utils.compute(e.parentNode,n,!0);return i=parseFloat(i),r*(i/100)}(e,n,i):i.match(/(vh|vw)/)?function(t,e){var n=window,i=document,r=i.documentElement,o=i.body,a=n.innerWidth||r.clientWidth||o.clientWidth,l=n.innerHeight||r.clientHeight||o.clientHeight;return"vw"===t?a*parseFloat(e)/100:"vh"===t?l*parseFloat(e)/100:void 0}(i.replace(/[0-9]/g,""),i):void 0:Number(i)},watcher:function(t,e,n){return window.EMBEDO_WATCHER=window.EMBEDO_WATCHER||{},window.EMBEDO_WATCHER[t]=window.EMBEDO_WATCHER[t]||{id:t,count:0,request:null},window.EMBEDO_WATCHER[t].count>0&&window.EMBEDO_WATCHER[t].request&&(window.EMBEDO_WATCHER[t].count-=1,clearTimeout(window.EMBEDO_WATCHER[t].request)),window.EMBEDO_WATCHER[t].count+=1,window.EMBEDO_WATCHER[t].request=setTimeout(function(){window.EMBEDO_WATCHER[t].count-=1,0===window.EMBEDO_WATCHER[t].count&&e.call()},n),null},dimensions:function(e,n,i){var r=t.utils.compute(e,"width");return{width:n=n||(r>0?r:t.utils.compute(e.parentNode,"width")),height:i=i||(r>0?r/1.5:t.utils.compute(e.parentNode,"height"))}},centerize:function(e,n,i){t.log("info","centerize",e,n,i),t.utils.validateElement(e)&&t.utils.validateElement(n)&&((i=i||{}).width&&(e.style.width=i.width,e.style.maxWidth=i.width,e.style.marginLeft="auto",e.style.marginRight="auto"),i.height&&(e.style.height=i.height,e.style.maxHeight=i.height),n.style.display="-moz-box",n.style.display="-ms-flexbox",n.style.display="-webkit-flex",n.style.display="-webkit-box",n.style.display="flex",n.style.textAlign="center",n.style["justify-content"]="center",n.style["align-items"]="center",n.style.margin="0 auto")},handleScriptValidation:function(t){if(t){t=t.split("#")[0];for(var e=document.getElementsByTagName("script"),n=e.length;n--;)if(e[n].src===t)return!0;return!1}}}),writable:!1,enumerable:!0,configurable:!1}),Object.defineProperties(t.prototype,{on:{value:function(t,e){"object"!=typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e)},writable:!1,configurable:!1},off:{value:function(t,e){var n;"object"==typeof this.events[t]&&(n=this.events[t].indexOf(e))>-1&&this.events[t].splice(n,1)},writable:!1,configurable:!1},emit:{value:function(t){var e,n,i,r=[].slice.call(arguments,1);if("object"==typeof this.events[t])for(i=(n=this.events[t].slice()).length,e=0;e<i;e++)n[e].apply(this,r)},writable:!1,configurable:!1},once:{value:function(t,e){this.on(t,function n(){this.off(t,n),e.apply(this,arguments)})},writable:!1,configurable:!1}}),t.prototype.init=function(e){t.log("info","init",this.requests,e),Object.keys(t.defaults.SOURCES).forEach(function(n){t.defaults.SOURCES[n].SDK&&function(e,n){if(e&&n){var i=t.utils.replacer(t.defaults.SOURCES[e.toLowerCase()].SDK,{locale:n.locale||window.navigator.language||"en_US"});t.utils.handleScriptValidation(i)||(n&&"object"==typeof n&&(i+=("facebook"===e?"#":"?")+t.utils.querystring(n)),document.body.appendChild(t.utils.generateScript(i)))}}(n,e[n])}),this.domify()},t.prototype.domify=function(){var e=document.querySelectorAll("[data-embedo-url]");[].forEach.call(e,function(e){var n=Object.keys(e.dataset||{}).reduce(function(n,i){return-1!==i.indexOf("embedo")&&(n[t.utils.camelToSnake(i).replace("embedo-","")]=e.dataset[i]),n},{});this.render(e,n.url,n)}.bind(this))},t.prototype.facebook=function(n,i,r,o,a){var l,u;if(/^([^\/?].+\/)?post|photo(s|\.php)[\/?].*$/gm.test(r)?l=r.match(/comment_id|reply_comment_id/)?"comment":"post":/^([^\/?].+\/)?video(s|\.php)[\/?].*$/gm.test(r)&&(l="video"),l&&l.match(/post|video/)){var s=t.utils.replacer(t.defaults.SOURCES.facebook.oEmbed,{type:l}),c=t.utils.merge({url:encodeURI(r),omitscript:!0},o,t.defaults.RESTRICTED);("width"in o||"maxwidth"in o)&&(c.maxwidth=o.maxwidth||o.width),s+="?"+t.utils.querystring(c),t.utils.fetch(s,function(e,n){if(e)return t.log("error","facebook",e),a(e);h(n.html)})}else{"comment"===l||r.match(/comment_id|reply_comment_id/)?(u="fb-comment-embed",o["data-numposts"]=o["data-numposts"]||5):r.match(/plugins\/comments/)?u="fb-comments":(u="fb-page",o["data-height"]=o["data-height"]||o.maxheight||o.height||500);var d=t.utils.generateElement("div",t.utils.merge({class:u,"data-href":r,"data-width":o["data-width"]||o.maxwidth||o.width||350},o));d.removeAttribute("width"),d.removeAttribute("height"),h(d)}function h(l){var u=t.utils.generateEmbed(n,"facebook",l);i.appendChild(u),function(n,i,r,o){t.utils.sdkReady("facebook",function(a){if(a)return o(a);window.FB.XFBML.parse(n),window.FB.Event.subscribe("xfbml.render",function(){i.firstChild&&(!1!==r.centerize&&t.utils.centerize(n,i,r),"rendered"===i.firstChild.getAttribute("fb-xfbml-state")&&e(n,i,r,o))})})}(i,u,{id:n,url:r,strict:o.strict,width:o.width,height:o.height,centerize:o.centerize},function(t,e){if(t)return a(t);a(null,{id:n,el:i,width:e.width,height:e.height})})}},t.prototype.twitter=function(n,i,r,o,a){var l=t.defaults.SOURCES.twitter.oEmbed,u=t.utils.merge({url:encodeURI(r),omit_script:1},o,t.defaults.RESTRICTED);("width"in o||"maxwidth"in o)&&(u.maxwidth=o.maxwidth||o.width),("height"in o||"maxheight"in o)&&(u.maxheight=o.maxheight||o.height),l+="?"+t.utils.querystring(u),t.utils.fetch(l,function(l,u){if(l)return t.log("error","twitter",l),a(l);var s=t.utils.generateEmbed(n,"twitter",u.html);i.appendChild(s),function(n,i,r,o){t.utils.sdkReady("twitter",function(a){if(a)return o(a);window.twttr.widgets.load(i),window.twttr.events.bind("rendered",function(a){i.firstChild&&i.firstChild.getAttribute("id")===a.target.getAttribute("id")&&(!1!==r.centerize&&t.utils.centerize(n,i,r),e(n,i,r,o))})})}(i,s,{id:n,url:r,strict:o.strict,width:o.width,height:o.height,centerize:o.centerize},function(t,e){if(t)return a(t);a(null,{id:n,el:i,width:e.width,height:e.height})})})},t.prototype.instagram=function(n,i,r,o,a){var l=t.defaults.SOURCES.instagram.oEmbed,u=t.utils.merge({url:encodeURI(r),omitscript:!0,hidecaption:!0},o,t.defaults.RESTRICTED);("width"in o||"maxwidth"in o)&&(o.width=o.maxwidth?o.maxwidth:o.width,o.width>320&&(u.maxwidth=o.width)),l+="?"+t.utils.querystring(u);var s=o.jsonp?"jsonp":"ajax";t.utils[s](l,function(l,u){if(l){if(t.log("error","instagram",l),void 0===o.jsonp||null===o.jsonp){var s=r.match(t.defaults.SOURCES.instagram.REGEX);return r=s&&s.length>0?s[0].replace(/\/$/,""):r,this.iframe(n,i,r+"/embed/",o,a)}return a(l)}var c=t.utils.generateEmbed(n,"instagram",u.html);i.appendChild(c),function(n,i,r,o){t.utils.sdkReady("instagram",function(a){if(a)return o(a);if(!window.instgrm.Embeds||!window.instgrm.Embeds)return o(new Error("instagram_sdk_missing"));window.instgrm.Embeds.process(i);var l=setInterval(function(){if(i.firstChild&&i.firstChild.className.match(/instagram-media-rendered/))return clearInterval(l),!1!==r.centerize&&t.utils.centerize(n,i,r),e(n,i,r,o)},250)})}(i,c,{id:n,url:r,strict:o.strict,width:o.width,height:o.height,centerize:o.centerize},function(t,e){if(t)return a(t);a(null,{id:n,el:i,width:e.width,height:e.height})})}.bind(this))},t.prototype.youtube=function(e,n,i,r,o){if(!l(i))return t.log("error","youtube","Unable to detect Youtube video id."),o("Unable to detect Youtube video id.");var a=t.defaults.SOURCES.youtube.oEmbed+l(i);function l(t){var e=t.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);return!(!e||2!==e.length)&&e[1]}a+="?"+t.utils.querystring(t.utils.merge({modestbranding:1,autohide:1,showinfo:0},r,t.defaults.RESTRICTED)),this.iframe(e,n,a,r,o)},t.prototype.vimeo=function(e,n,i,r,o){var a=t.utils.dimensions(n,r.width,r.height),l=t.utils.merge({url:i,width:a.width,height:a.height,autohide:1},r,t.defaults.RESTRICTED),u=t.defaults.SOURCES.vimeo.oEmbed+"?"+t.utils.querystring(l);t.utils.fetch(u,function(i,r){if(i)return t.log("error","vimeo",i),o(i);var l=t.utils.generateEmbed(e,"vimeo",r.html);n.appendChild(l),o(null,{id:e,el:n,width:a.width,height:a.height})})},t.prototype.pinterest=function(n,i,r,o,a){var l=t.utils.dimensions(i,o.width,o.height),u=l.width>600?"large":l.width<345?"small":"medium",s=t.utils.generateElement("a",t.utils.merge({href:r,"data-pin-do":o["data-pin-do"]||"embedPin","data-pin-lang":o["data-pin-lang"]||"en","data-pin-width":u},o)),c=t.utils.generateEmbed(n,"pinterest",s);i.appendChild(c),function(n,i,r,o){t.utils.sdkReady("pinterest",function(a){return a?o(a):window.PinUtils&&window.PinUtils&&i&&i.firstChild?void setTimeout(function(){i.querySelector("[data-pin-href]")||window.PinUtils.build(i);var a=0,l=setInterval(function(){return a+=1,i.querySelector("[data-pin-href]")?(clearInterval(l),!1!==r.centerize&&t.utils.centerize(n,i,r),e(n,i,r,o)):a>=20?(clearInterval(l),o(new Error("pinterest_embed_failed"))):void 0},250)},750):o(new Error("pinterest_sdk_missing"))})}(i,c,{id:n,url:r,strict:o.strict,width:o.width,height:o.height,centerize:o.centerize},function(e,r){if(e)return t.log("error","pinterest",e),a(e);a(null,{id:n,el:i,width:r.width,height:r.height})})},t.prototype.github=function(e,n,i,r,o){var a=t.utils.dimensions(n,r.width,r.height),l=t.utils.generateElement("iframe",t.utils.merge({width:a.width,height:a.height},r,t.defaults.RESTRICTED)),u=t.utils.generateEmbed(e,"github",l);n.appendChild(u),l.contentWindow.document.open(),l.contentWindow.document.write('<body><style type="text/css">body,html{margin:0;padding:0;border-radius:3px;}.gist .gist-file{margin:0 !important;padding:0;}</style><script src="'+i+'"><\/script></body>'),l.contentWindow.document.close(),l.onerror=function(t){o(t)},l.addEventListener("load",function(i){o(null,{id:e,el:n,event:i,width:t.utils.compute(u,"width"),height:t.utils.compute(u,"height")})})},t.prototype.soundcloud=function(e,n,i,r,o){r.hasOwnProperty("width")&&r.width&&(r.maxwidth=r.maxwidth||r.width||"100%"),r.hasOwnProperty("height")&&r.height&&(r.maxheight=r.maxheight||r.height);var a=t.utils.dimensions(n,r.maxwidth,r.maxheight),l=t.utils.merge({url:encodeURI(i),format:"js"},r,t.defaults.RESTRICTED),u=t.defaults.SOURCES.soundcloud.oEmbed+"?"+t.utils.querystring(l);t.utils.fetch(u,function(i,r){if(i)return t.log("error","soundcloud",i),o(i);var l=t.utils.generateEmbed(e,"soundcloud",r.html);n.appendChild(l),o(null,{id:e,el:n,width:a.width,height:a.height})})},t.prototype.iframe=function(e,n,i,r,o){var a=document.createDocumentFragment(),l=t.utils.dimensions(n,r.width,r.height),u=(i.substr(i.lastIndexOf("."))||"").replace(".","").toLowerCase(),s={csv:"text/csv",pdf:"application/pdf",gif:"image/gif",js:"application/javascript",json:"application/json",xhtml:"application/xhtml+xml",pps:"application/vnd.ms-powerpoint",ppsx:"application/vnd.openxmlformats-officedocument.presentationml.slideshow",xml:"application/xml",ogg:"video/ogg",mp4:"video/mp4",webm:"video/webm",html:"text/html"},c=s[u]||s.html,d=u.match(/(mp4|ogg|webm|ogv|ogm)/)?"video":r.tagName||"embed",h=t.utils.merge({},r,t.defaults.RESTRICTED),f=t.utils.generateElement(d,t.utils.merge({type:c,src:i,width:l.width,height:l.height},h));a.appendChild(t.utils.generateEmbed(e,"iframe",f)),n.appendChild(a),"video"===d?setTimeout(function(){o(null,{id:e,el:n,width:t.utils.compute(f,"width"),height:t.utils.compute(f,"height")})},250):(f.onerror=function(t){o(t)},f.addEventListener("load",function(i){o(null,{id:e,el:n,event:i,width:t.utils.compute(f,"width"),height:t.utils.compute(f,"height")})}))},t.prototype.render=function(e,n,i,r){if(t.log("info","render",e,n,i),i=i||{},r=r||function(){},!e||!t.utils.validateElement(e))return t.log("info","render","`element` is either missing or invalid"),this.emit("error",new Error("element_is_missing"));if("string"!=typeof n)return this.emit("error",new Error("invalid_url_string"));if(!n||!t.utils.validateURL(n))return t.log("info","render","`url` is either missing or invalid"),this.emit("error",new Error("invalid_or_missing_url"));var o=function(e){var n=Object.keys(t.defaults.SOURCES)||[];if(!/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(e))return null;var i=n.filter(function(n){if(t.defaults.SOURCES[n]&&e.match(t.defaults.SOURCES[n].REGEX))return n}).filter(Boolean);return i&&i.length?i[0]:"iframe"}(n);if(!o)return t.log("info","render",new Error("Invalid or Unsupported URL")),this.emit("error",new Error("url_not_supported"));if(!this[o])return t.log("info","render",new Error("Requested source is not implemented or missing.")),this.emit("error",new Error("unrecognised_url"));"width"in i&&i.width&&(i.width=t.utils.convertToPx(e,"width",i.width)),"height"in i&&i.height&&(i.height=t.utils.convertToPx(e,"height",i.height));var a=t.utils.uuid(),l={id:a,el:e,source:o,url:n,attributes:i};this.requests.push(l),this.emit("watch","load",l),this[o](a,e,n,i,function(t,e){if(t)return this.emit("error",t),r(t);e.url=l.url,e.source=l.source,e.options=l.attributes,this.emit("watch","loaded",e),r(null,e)}.bind(this))},t.prototype.load=function(e,n,i){t.log("info","load",e,n,i),i=i||{};var r=new t.utils.observer;if(e&&t.utils.validateElement(e))if(n instanceof Array){var o={failed:[],finished:[]},a=n.map(function(t){return function(n){this.render(e,t,i,function(t,e){if(t)return o.failed.push(t),n(t);o.finished.push(e),n(null,e)})}.bind(this)}.bind(this));t.utils.sequencer.apply(this,a).then(function(){if(o.failed.length>0)return r.reject(o.failed);r.resolve(o.finished)})}else"string"==typeof n?this.render(e,n,i,function(t,e){if(t)return r.reject(t);r.resolve(e)}):this.emit("error",new Error("invalid_url_string"));else t.log("info","load","`element` is either missing or invalid"),this.emit("error",new Error("element_is_missing"));return r},t.prototype.refresh=function(n){if(t.log("info","refresh",this.requests,n),0!==this.requests.length)return this.requests.forEach(function(i){if(i.el){if("iframe"===i.source)return this.emit("refresh",i,{width:t.utils.compute(i.el,"width"),height:t.utils.compute(i.el,"height")});if(n){if(!t.utils.validateElement(n))return;n===i.el&&e(i.el,document.getElementById(i.id),i.attributes,function(t,e){e&&this.emit("refresh",i,e)}.bind(this))}else e(i.el,document.getElementById(i.id),i.attributes,function(t,e){e&&this.emit("refresh",i,e)}.bind(this))}}.bind(this)),this},t.prototype.destroy=function(e){if(t.log("warn","destroy",this.requests,e),0!==this.requests.length){var n=[];return this.requests.forEach(function(i){if(i.el&&t.utils.validateElement(i.el))if(e){if(!t.utils.validateElement(e))return;e===i.el&&(document.getElementById(i.id)&&document.getElementById(i.id).remove(),n.push(i.id),this.emit("destroy",i))}else document.getElementById(i.id)&&document.getElementById(i.id).remove(),n.push(i.id),this.emit("destroy",i)}.bind(this)),this.requests=this.requests.filter(function(t){return n.indexOf(t.id)<0}),this}},t})?i.call(e,n,e,t):i)||(t.exports=r)},function(t,e,n){t.exports=n(5)},function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(4);var i=function(t){var e=document.querySelector(t).innerHTML;return JSON.parse(e)},r=function(){return document.referrer.includes(location.protocol+"//"+location.host)?document.referrer:null},o=function(t){var e,n="number"==typeof(e=parseInt(location.hash.replace(/^\D+/g,"")))&&e>0?e:null;return"number"==typeof n&&n<=t?n:1},a=n(2),l=n.n(a),u=null,s=function(){u=new l.a({twitter:!0,instagram:!0,pinterest:!0})},c=n(0),d=n.n(c),h={dataSelector:"#galleryData",stageSelector:"#galleryStage",contentSelector:"#galleryContent",nextIcon:'<i class="fas fa-angle-right"></i>',prevIcon:'<i class="fas fa-angle-left"></i>'},f={},m={},p=function(t){f=Object.assign({},h,t),m.data=i(f.dataSelector),m.length=m.data.itemListElement.length,m.referrer=r(),m.currentPage=o(m.length)},g=function(){document.querySelector(f.stageSelector).innerHTML=S(),document.querySelector(f.contentSelector).innerHTML=R(),w(),"function"==typeof f.afterPageRender&&f.afterPageRender(m)},w=function(){document.querySelectorAll("[role=smb-gallery-prev]").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),v()})}),document.querySelectorAll("[role=smb-gallery-next]").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),b()})}),document.onkeydown=function(t){switch(t.keyCode){case 37:v();break;case 39:b()}},window.onpopstate=function(t){t.state&&t.state.page?m.currentPage=t.state.page:m.currentPage=1,y()}},v=function(){m.currentPage>1&&(m.currentPage=m.currentPage-1,window.history.pushState({page:m.currentPage},"","#page-".concat(m.currentPage)),y())},b=function(){m.currentPage<m.length&&(m.currentPage=m.currentPage+1,window.history.pushState({page:m.currentPage},"","#page-".concat(m.currentPage)),y())},y=function(){if(g(),u.domify(),void 0!==window.smbt&&window.smbt.emit("pageview"),"undefined"!=typeof iom&&"function"==typeof window.iom.c&&void 0!==window.iam_data&&window.iom.c(window.iam_data,2),void 0!==window.adLoader)try{E(),window.adLoader("_reloadAds")}catch(t){}"function"==typeof f.onItemChange&&f.onItemChange(m)},E=function(){document.body.style="",window.bb&&window.bb.unload()},S=function(){var t=m.data.itemListElement[m.currentPage-2],e=m.data.itemListElement[m.currentPage-1],n=m.data.itemListElement[m.currentPage];return'\n    <div class="smb-gallery-stage smb-gallery-desktop">\n      <h2>'.concat(e.item.headline,'</h2>\n      <div class="smb-gallery-header">\n        ').concat(m.currentPage>1?'\n          <a role="smb-gallery-prev" class="smb-gallery-nav smb-gallery-nav-left" href="'.concat(t.item.url,'">\n            <div class="smb-gallery-button">\n              ').concat(f.prevIcon,"\n            </div>\n          </a>\n        "):"",'\n        <div class="smb-gallery-media ').concat(e.item["@type"],'">\n          ').concat(x(e.item),"\n        </div>\n        ").concat(m.currentPage<m.length?'\n          <a role="smb-gallery-next" class="smb-gallery-nav smb-gallery-nav-right" href="'.concat(n.item.url,'">\n            <div class="smb-gallery-button">\n              ').concat(f.nextIcon,"\n            </div>\n          </a>\n        "):"",'\n        <div class="smb-gallery-info">\n          ').concat(e.item.copyrightHolder?"\n          <small>Bildquelle: ".concat(e.item.copyrightHolder,"</small>\n          "):"<small></small>","\n          <small>").concat(m.currentPage," / ").concat(m.length,"</small>\n        </div>\n      </div>\n\n    </div>\n  ")},x=function(t){switch(t["@type"]){case"ImageObject":return"\n        ".concat(t.width>0&&t.height>0?'\n          <div class="embed-responsive" style="padding-bottom: '.concat(t.height/t.width*100,'%">\n            <img class="embed-responsive-item" src="').concat(d.a.createVariantUrl(t.contentUrl,[["rcm",0,450,"u"]]),'" alt="">\n          </div>\n        '):'\n          <img class="" src="'.concat(d.a.createVariantUrl(t.contentUrl,[["rcm",0,450,"u"]]),'" alt="">\n        '),"\n      ");case"VideoObject":return'\n        <iframe class="" src="'.concat(t.embedUrl,'"></iframe>\n      ');case"SocialMediaPosting":return'<div data-embedo-url="'.concat(t.sharedContent.url,'" data-embedo-height="450"></div>');default:return""}},R=function(){var t=m.data.itemListElement[m.currentPage-1];return'\n    <div class="smg-gallery-body smb-gallery-desktop">\n      '.concat(t.item.description,'\n\n      <div class="smb-gallery-btn-nav">\n        <div>\n        ').concat(m.referrer?'\n          <a role="smb-gallery-back" class="btn btn-link" href="'.concat(m.referrer,'"><i class="fas fa-angle-left"></i> zurück zum Artikel</a>\n        '):"",'\n        </div>\n        <div>\n          <a role="smb-gallery-prev" class="btn btn-primary ').concat(1===m.currentPage?"disabled":"",'" href="#"><i class="fas fa-angle-left"></i> zurück</a>\n          <a role="smb-gallery-next" class="btn btn-primary ').concat(m.currentPage===m.length?"disabled":"",'" href="#">weiter <i class="fas fa-angle-right"></i></a>\n        </div>\n      </div>\n    </div>\n  ')},O=function(t,e){p(t),g(),s()},P=function(t){switch(t["@type"]){case"ImageObject":return"\n        ".concat(t.width>0&&t.height>0?'\n          <div class="embed-responsive" style="padding-bottom: '.concat(t.height/t.width*100,'%">\n            <img class="embed-responsive-item lazyload" data-src="').concat(d.a.createVariantUrl(t.contentUrl,[["rcm",480,0,"u"]]),'" alt="">\n          </div>\n        '):'\n          <img class="lazyload" data-src="'.concat(d.a.createVariantUrl(t.contentUrl,[["rcm",480,0,"u"]]),'" alt="">\n        '),"\n      ");case"VideoObject":return'<iframe class="lazyload" data-src="'.concat(t.embedUrl,'"></iframe>');case"SocialMediaPosting":return'<div data-role="embedo" data-url="'.concat(t.sharedContent.url,'"></div>')}},j=function(t){switch(t%4){case 0:return"galleryad";case 1:return"galleryad2";case 2:return"galleryad3";case 3:return"galleryad4"}},C=function(t){return'\n      <div class="smb-gallery-mobile">\n      '.concat(t.data.itemListElement.map(function(e,n){return'\n        <div class="smb-gallery-item">\n          <h2>'.concat(e.item.headline,'</h2>\n          <div class="smb-gallery-media ').concat(e.item["@type"],'">\n            ').concat(P(e.item),'\n              <div class="smb-gallery-info">\n              ').concat(e.item.copyrightHolder?"\n                <small>Bildquelle: ".concat(e.item.copyrightHolder,"</small>\n              "):"<small></small>","\n                <small>").concat(n+1," / ").concat(t.length,'</small>\n              </div>\n          </div>\n          <div class="smb-gallery-content">\n            ').concat(e.item.description,'\n          </div>\n          <div class="smb-gallery-ed-container">\n            <div data-slotname="').concat(j(n),'"></div>\n          </div>\n        </div>\n    ').trim()}).join(""),"\n    </div>\n  ")},A=function(t){var e=[];return t.galleryItems[t.currentPage-2]&&e.push(t.galleryItems[t.currentPage-2]),t.galleryItems[t.currentPage-1]&&e.push(t.galleryItems[t.currentPage-1]),t.galleryItems[t.currentPage]&&e.push(t.galleryItems[t.currentPage]),t.galleryItems[t.currentPage+1]&&e.push(t.galleryItems[t.currentPage+1]),e},_=function(t,e){t.galleryItems.forEach(function(t,n){if(!e.includes(t)){var i=t.querySelector("[data-slotname]");i.getAttribute("data-sdg-ad")&&(U(i),i.removeAttribute("data-sdg-ad"))}})},T=function(t,e){e.forEach(function(t,e){var n=t.querySelector("[data-slotname]");if(!n.hasAttribute("data-sdg-ad")){var i=n.getAttribute("data-slotname");n.setAttribute("data-sdg-ad",i),I(n)}})},I=function(t){try{window.adLoader("_loadAds",[t])}catch(t){}},U=function(t){try{window.adLoader("_removeAds",[t],!0)}catch(t){}},L=function(t){var e=A(t);_(t,e),T(t,e)},q=n(1),k=n.n(q),M={dataSelector:"#galleryData",contentSelector:"#galleryContent"},B={},z={},D=function(t){B=Object.assign({},M,t),z.data=i(B.dataSelector),z.length=z.data.itemListElement.length,z.referrer=r(),z.currentPage=o(z.length)},H=function(){G(),$(),N(),"function"==typeof B.afterPageRender&&B.afterPageRender(z)},G=function(){document.querySelector(B.contentSelector).innerHTML=C(z),z.galleryItems=document.querySelectorAll(".smb-gallery-item")},$=function(){z.currentPage>1&&z.galleryItems[z.currentPage].scrollIntoView()},N=function(){z.galleryItems.forEach(function(t,e){if(k.a.repeat(t.querySelector(".smb-gallery-content"),function(){z.currentPage!==e+1&&(z.currentPage=e+1,window.history.pushState({page:z.currentPage},"","#page-"+z.currentPage)),L(z)}),t.querySelector('[data-role="embedo"]')){var n=t.querySelector('[data-role="embedo"]'),i=n.getAttribute("data-url");k.a.once(t,function(){u.load(n,i,{centerize:!0})},200)}})},W=function(t,e){D(t),H(),s()};e.default=function(t){t&&"smartphone"===t.device?W(t):O(t)}}]).default});
//# sourceMappingURL=smb-gallery.js.map