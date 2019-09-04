!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.smbPhonePlan=e():t.smbPhonePlan=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";const o=function(t,e){const n=e.exec(t);return!(null==n)};e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e){if(e){const n=Object.keys(e),o=n.length;for(let r=0;r<o;r++)t[n[r]]=e[n[r]]}},e.getValue=function(t){return e.isExist(t)?t:""},e.buildOptions=function(t,e,n){var o={};if(!t)return e;for(let r=0;r<n.length;r++)void 0!==t[n[r]]?o[n[r]]=t[n[r]]:o[n[r]]=e[n[r]];return o},e.doesMatch=o,e.doesNotMatch=function(t,e){return!o(t,e)},e.getAllMatches=function(t,e){const n=[];let o=e.exec(t);for(;o;){const r=[],i=o.length;for(let t=0;t<i;t++)r.push(o[t]);n.push(r),o=e.exec(t)}return n}},function(t,e,n){"use strict";const o=n(0),r=n(0).buildOptions,i=n(7),a={OPENING:1,CLOSING:2,SELF:3,CDATA:4};let s="<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|(([\\w:\\-._]*:)?([\\w:\\-._]+))([^>]*)>|((\\/)(([\\w:\\-._]*:)?([\\w:\\-._]+))\\s*>))([^<]*)";!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const l={attributeNamePrefix:"@_",attrNodeName:!1,textNodeName:"#text",ignoreAttributes:!0,ignoreNameSpace:!1,allowBooleanAttributes:!1,parseNodeValue:!0,parseAttributeValue:!1,arrayMode:!1,trimValues:!0,cdataTagName:!1,cdataPositionChar:"\\c",localeRange:"",tagValueProcessor:function(t){return t},attrValueProcessor:function(t){return t},stopNodes:[]};e.defaultOptions=l;const c=["attributeNamePrefix","attrNodeName","textNodeName","ignoreAttributes","ignoreNameSpace","allowBooleanAttributes","parseNodeValue","parseAttributeValue","arrayMode","trimValues","cdataTagName","cdataPositionChar","localeRange","tagValueProcessor","attrValueProcessor","parseTrueNumberOnly","stopNodes"];e.props=c;function u(t,e){return t&&(e.trimValues&&(t=t.trim()),t=d(t=e.tagValueProcessor(t),e.parseNodeValue,e.parseTrueNumberOnly)),t}function p(t,e){if(e.ignoreNameSpace){const e=t.split(":"),n="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=n+e[1])}return t}function d(t,e,n){if(e&&"string"==typeof t){let e;return""===t.trim()||isNaN(t)?e="true"===t||"false"!==t&&t:(e=-1!==t.indexOf("0x")?Number.parseInt(t,16):-1!==t.indexOf(".")?Number.parseFloat(t):Number.parseInt(t,10),n&&(e=String(e)===t?e:t)),e}return o.isExist(t)?t:""}const m=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])(.*?)\\3)?","g");function f(t,e){if(!e.ignoreAttributes&&"string"==typeof t){t=t.replace(/\r?\n/g," ");const n=o.getAllMatches(t,m),r=n.length,i={};for(let t=0;t<r;t++){const o=p(n[t][1],e);o.length&&(void 0!==n[t][4]?(e.trimValues&&(n[t][4]=n[t][4].trim()),n[t][4]=e.attrValueProcessor(n[t][4]),i[e.attributeNamePrefix+o]=d(n[t][4],e.parseAttributeValue,e.parseTrueNumberOnly)):e.allowBooleanAttributes&&(i[e.attributeNamePrefix+o]=!0))}if(!Object.keys(i).length)return;if(e.attrNodeName){const t={};return t[e.attrNodeName]=i,t}return i}}e.getTraversalObj=function(t,e){e=r(e,l,c),t=t.replace(/<!--[\s\S]*?-->/g,"");const n=new i("!xml");let p=n;s=s.replace(/\[\\w/g,"["+e.localeRange+"\\w");const d=new RegExp(s,"g");let m=d.exec(t),h=d.exec(t);for(;m;){const n="]]>"===(b=m)[4]?a.CDATA:"/"===b[10]?a.CLOSING:void 0!==b[8]&&"/"===b[8].substr(b[8].length-1)?a.SELF:a.OPENING;if(n===a.CLOSING)p.parent&&m[14]&&(p.parent.val=o.getValue(p.parent.val)+""+u(m[14],e)),e.stopNodes.length&&e.stopNodes.includes(p.tagname)&&(p.child=[],null==p.attrsMap&&(p.attrsMap={}),p.val=t.substr(p.startIndex+1,m.index-p.startIndex-1)),p=p.parent;else if(n===a.CDATA)if(e.cdataTagName){const t=new i(e.cdataTagName,p,m[3]);t.attrsMap=f(m[8],e),p.addChild(t),p.val=o.getValue(p.val)+e.cdataPositionChar,m[14]&&(p.val+=u(m[14],e))}else p.val=(p.val||"")+(m[3]||"")+u(m[14],e);else if(n===a.SELF){p&&m[14]&&(p.val=o.getValue(p.val)+""+u(m[14],e));const t=new i(e.ignoreNameSpace?m[7]:m[5],p,"");m[8]&&m[8].length>0&&(m[8]=m[8].substr(0,m[8].length-1)),t.attrsMap=f(m[8],e),p.addChild(t)}else{const t=new i(e.ignoreNameSpace?m[7]:m[5],p,u(m[14],e));e.stopNodes.length&&e.stopNodes.includes(t.tagname)&&(t.startIndex=m.index+m[1].length),t.attrsMap=f(m[8],e),p.addChild(t),p=t}m=h,h=d.exec(t)}var b;return n}},function(t,e,n){"use strict";const o=n(6),r=n(1),i=n(1),a=n(0).buildOptions;e.parse=function(t,e){return e=a(e,i.defaultOptions,i.props),o.convertToJson(r.getTraversalObj(t,e),e)},e.convertTonimn=n(8).convert2nimn,e.getTraversalObj=r.getTraversalObj,e.convertToJson=o.convertToJson,e.convertToJsonString=n(9).convertToJsonString,e.validate=n(10).validate,e.j2xParser=n(11),e.parseToNimn=function(t,n,o){return e.convertTonimn(e.getTraversalObj(t,o),n,o)}},function(t){t.exports={handytarif:{product:[{link:["http://www.communicationads.net/tc.php?t=10506C11907004D&product=3886"],product:["LTE S"],url_moreinfo:["https://www.premiumsim.de/pdf/5762/produktinformationsblatt"],company:["PremiumSIM"],provider:["Telefónica"],cost_pm:["6,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C12907004D&product=3621"],product:["LTE All 2 GB"],url_moreinfo:["https://www.sim.de/pdf/339/produktinformationsblatt"],company:["sim.de"],provider:["Telefónica"],cost_pm:["6,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C11907004D&product=3906"],product:["LTE S (1 Mon.)"],url_moreinfo:["https://www.premiumsim.de/pdf/6517/produktinformationsblatt"],company:["PremiumSIM"],provider:["Telefónica"],cost_pm:["6,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C12907004D&product=2067"],product:["LTE All 2 GB (1 Mon.)"],url_moreinfo:["https://www.sim.de/pdf/338/produktinformationsblatt"],company:["sim.de"],provider:["Telefónica"],cost_pm:["6,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C15207004D&product=1709"],product:["M (24 Mon.)"],url_moreinfo:["https://static2-blau.o9.de/blob/13311846/v=2/Binary/2_po_blau-m_20180612_1-0.pdf"],company:["blau Mobilfunk"],provider:["o2"],cost_pm:["7,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C12007004D&product=2088"],product:["LTE All 3 + 1 GB"],url_moreinfo:["https://www.winsim.de/pdf/3174/produktinformationsblatt"],company:["winSIM"],provider:["Telefónica"],cost_pm:["7,99"],mobileweb_volume:["4 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C10807004D&product=3688"],product:["LTE 3000"],url_moreinfo:["https://www.simplytel.de/pdf/1447/produktinformationsblatt"],company:["simply"],provider:["Telefónica"],cost_pm:["7,99"],mobileweb_volume:["3 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C10207004D&product=3990"],product:["LTE 2000"],url_moreinfo:["https://www.maxxim.de/pdf/1230/produktinformationsblatt"],company:["maXXim"],provider:["Telefónica"],cost_pm:["8,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C12507004D&product=3965"],product:["LTE 2 GB"],url_moreinfo:["https://www.smartmobil.de/pdf/1817/produktinformationsblatt"],company:["smartmobil.de"],provider:["Telefónica"],cost_pm:["7,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C12507004D&product=3966"],product:["LTE 2 GB (1 Mon.)"],url_moreinfo:["https://www.smartmobil.de/pdf/1884/produktinformationsblatt"],company:["smartmobil.de"],provider:["Telefónica"],cost_pm:["7,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C18007004D&product=1701"],product:["freeSMART 2000 (24 Mon.)"],url_moreinfo:["https://www.freenetmobile.de/pdf/smartphone-flat/freenetmobile_freesmart24_2_2000_42-2_1499_799_999_pib.pdf"],company:["freenet mobile"],provider:["D2"],cost_pm:["7,99"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C12007004D&product=2091"],product:["LTE All 3 + 1 GB (1 Mon.)"],url_moreinfo:["https://www.winsim.de/pdf/3173/produktinformationsblatt"],company:["winSIM"],provider:["Telefónica"],cost_pm:["7,99"],mobileweb_volume:["4 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C11407004D&product=2014"],product:["Flat S"],url_moreinfo:["https://www.discotel.de/pdf/672/produktinformationsblatt"],company:["discoTEL"],provider:["Telefónica"],cost_pm:["8,61"],mobileweb_volume:["2 GB"]},{link:["http://www.communicationads.net/tc.php?t=10506C12507004D&product=4151"],product:["Flat S"],url_moreinfo:["https://www.smartmobil.de/pdf/2338/produktinformationsblatt"],company:["smartmobil.de"],provider:["Telefónica"],cost_pm:["8,61"],mobileweb_volume:["2 GB"]}]}}},function(t,e,n){t.exports=n(12)},function(t,e,n){},function(t,e,n){"use strict";const o=n(0),r=function(t,e){const n={};if(!(t.child&&!o.isEmptyObject(t.child)||t.attrsMap&&!o.isEmptyObject(t.attrsMap)))return o.isExist(t.val)?t.val:"";o.isExist(t.val)&&("string"!=typeof t.val||""!==t.val&&t.val!==e.cdataPositionChar)&&(n[e.textNodeName]=t.val),o.merge(n,t.attrsMap);const i=Object.keys(t.child);for(let o=0;o<i.length;o++){var a=i[o];if(t.child[a]&&t.child[a].length>1)for(var s in n[a]=[],t.child[a])n[a].push(r(t.child[a][s],e));else n[a]=r(t.child[a][0],e)}return n};e.convertToJson=r},function(t,e,n){"use strict";t.exports=function(t,e,n){this.tagname=t,this.parent=e,this.child={},this.attrsMap={},this.val=n,this.addChild=function(t){Array.isArray(this.child[t.tagname])?this.child[t.tagname].push(t):this.child[t.tagname]=[t]}}},function(t,e,n){"use strict";const o=function(t){return String.fromCharCode(t)},r={nilChar:o(176),missingChar:o(201),nilPremitive:o(175),missingPremitive:o(200),emptyChar:o(178),emptyValue:o(177),boundryChar:o(179),objStart:o(198),arrStart:o(204),arrayEnd:o(185)},i=[r.nilChar,r.nilPremitive,r.missingChar,r.missingPremitive,r.boundryChar,r.emptyChar,r.emptyValue,r.arrayEnd,r.objStart,r.arrStart],a=function(t,e,n){if("string"==typeof e)return t&&t[0]&&void 0!==t[0].val?s(t[0].val,e):s(t,e);{const i=void 0===(o=t)?r.missingChar:null===o?r.nilChar:!(o.child&&0===Object.keys(o.child).length&&(!o.attrsMap||0===Object.keys(o.attrsMap).length))||r.emptyChar;if(!0===i){let o="";if(Array.isArray(e)){o+=r.arrStart;const i=e[0],c=t.length;if("string"==typeof i)for(let e=0;e<c;e++){const n=s(t[e].val,i);o=l(o,n)}else for(let e=0;e<c;e++){const r=a(t[e],i,n);o=l(o,r)}o+=r.arrayEnd}else{o+=r.objStart;const i=Object.keys(e);Array.isArray(t)&&(t=t[0]);for(let r in i){const s=i[r];let c;c=!n.ignoreAttributes&&t.attrsMap&&t.attrsMap[s]?a(t.attrsMap[s],e[s],n):s===n.textNodeName?a(t.val,e[s],n):a(t.child[s],e[s],n),o=l(o,c)}}return o}return i}var o},s=function(t){switch(t){case void 0:return r.missingPremitive;case null:return r.nilPremitive;case"":return r.emptyValue;default:return t}},l=function(t,e){return c(e[0])||c(t[t.length-1])||(t+=r.boundryChar),t+e},c=function(t){return-1!==i.indexOf(t)};const u=n(1),p=n(0).buildOptions;e.convert2nimn=function(t,e,n){return n=p(n,u.defaultOptions,u.props),a(t,e,n)}},function(t,e,n){"use strict";const o=n(0),r=n(0).buildOptions,i=n(1),a=function(t,e,n){let r="{";const i=Object.keys(t.child);for(let n=0;n<i.length;n++){var s=i[n];if(t.child[s]&&t.child[s].length>1){for(var l in r+='"'+s+'" : [ ',t.child[s])r+=a(t.child[s][l],e)+" , ";r=r.substr(0,r.length-1)+" ] "}else r+='"'+s+'" : '+a(t.child[s][0],e)+" ,"}return o.merge(r,t.attrsMap),o.isEmptyObject(r)?o.isExist(t.val)?t.val:"":(o.isExist(t.val)&&("string"!=typeof t.val||""!==t.val&&t.val!==e.cdataPositionChar)&&(r+='"'+e.textNodeName+'" : '+(!0!==(c=t.val)&&!1!==c&&isNaN(c)?'"'+c+'"':c)),","===r[r.length-1]&&(r=r.substr(0,r.length-2)),r+"}");var c};e.convertToJsonString=function(t,e){return(e=r(e,i.defaultOptions,i.props)).indentBy=e.indentBy||"",a(t,e,0)}},function(t,e,n){"use strict";const o=n(0),r={allowBooleanAttributes:!1,localeRange:"a-zA-Z"},i=["allowBooleanAttributes","localeRange"];function a(t,e){for(var n=e;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{var o=t.substr(n,e-n);if(e>5&&"xml"===o)return{err:{code:"InvalidXml",msg:"XML declaration allowed only at the start of the document."}};if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function s(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let n=1;for(e+=8;e<t.length;e++)if("<"===t[e])n++;else if(">"===t[e]&&0===--n)break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}e.validate=function(t,e){e=o.buildOptions(e,r,i);const n=[];let l=!1;"\ufeff"===t[0]&&(t=t.substr(1));const c=new RegExp("^[_w][\\w\\-.:]*$".replace("_w","_"+e.localeRange)),p=new RegExp("^([w]|_)[\\w.\\-_:]*".replace("([w","(["+e.localeRange));for(let o=0;o<t.length;o++){if("<"!==t[o]){if(" "===t[o]||"\t"===t[o]||"\n"===t[o]||"\r"===t[o])continue;return{err:{code:"InvalidChar",msg:"char "+t[o]+" is not expected ."}}}if("?"===t[++o]){if((o=a(t,++o)).err)return o}else{if("!"===t[o]){o=s(t,o);continue}{let r=!1;"/"===t[o]&&(r=!0,o++);let i="";for(;o<t.length&&">"!==t[o]&&" "!==t[o]&&"\t"!==t[o]&&"\n"!==t[o]&&"\r"!==t[o];o++)i+=t[o];if("/"===(i=i.trim())[i.length-1]){i=i.substring(0,i.length-1);continue}if(!f(i,p))return{err:{code:"InvalidTag",msg:"Tag "+i+" is an invalid name."}};const a=u(t,o);if(!1===a)return{err:{code:"InvalidAttr",msg:"Attributes for "+i+" have open quote"}};let m=a.value;if(o=a.index,"/"===m[m.length-1]){const t=d(m=m.substring(0,m.length-1),e,c);if(!0!==t)return t;l=!0}else if(r){if(m.trim().length>0)return{err:{code:"InvalidTag",msg:"closing tag "+i+" can't have attributes or invalid starting."}};{const t=n.pop();if(i!==t)return{err:{code:"InvalidTag",msg:"closing tag "+t+" is expected inplace of "+i+"."}}}}else{const t=d(m,e,c);if(!0!==t)return t;n.push(i),l=!0}for(o++;o<t.length;o++)if("<"===t[o]){if("!"===t[o+1]){o=s(t,++o);continue}break}"<"===t[o]&&o--}}}return l?!(n.length>0)||{err:{code:"InvalidXml",msg:"Invalid "+JSON.stringify(n,null,4).replace(/\r?\n/g,"")+" found."}}:{err:{code:"InvalidXml",msg:"Start tag expected."}}};var l='"',c="'";function u(t,e){let n="",o="";for(;e<t.length;e++){if(t[e]===l||t[e]===c)if(""===o)o=t[e];else{if(o!==t[e])continue;o=""}else if(">"===t[e]&&""===o)break;n+=t[e]}return""===o&&{value:n,index:e}}const p=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function d(t,e,n){const r=o.getAllMatches(t,p),i={};for(let t=0;t<r.length;t++){if(0===r[t][1].length)return{err:{code:"InvalidAttr",msg:"attribute "+r[t][2]+" has no space in starting."}};if(void 0===r[t][3]&&!e.allowBooleanAttributes)return{err:{code:"InvalidAttr",msg:"boolean attribute "+r[t][2]+" is not allowed."}};const o=r[t][2];if(!m(o,n))return{err:{code:"InvalidAttr",msg:"attribute "+o+" is an invalid name."}};if(i.hasOwnProperty(o))return{err:{code:"InvalidAttr",msg:"attribute "+o+" is repeated."}};i[o]=1}return!0}function m(t,e){return o.doesMatch(t,e)}function f(t,e){return!o.doesNotMatch(t,e)}},function(t,e,n){"use strict";const o=n(0).buildOptions,r={attributeNamePrefix:"@_",attrNodeName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataTagName:!1,cdataPositionChar:"\\c",format:!1,indentBy:"  ",supressEmptyNode:!1,tagValueProcessor:function(t){return t},attrValueProcessor:function(t){return t}},i=["attributeNamePrefix","attrNodeName","textNodeName","ignoreAttributes","cdataTagName","cdataPositionChar","format","indentBy","supressEmptyNode","tagValueProcessor","attrValueProcessor"];function a(t){this.options=o(t,r,i),this.options.ignoreAttributes||this.options.attrNodeName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=f),this.options.cdataTagName?this.isCDATA=h:this.isCDATA=function(){return!1},this.replaceCDATAstr=s,this.replaceCDATAarr=l,this.options.format?(this.indentate=m,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine=""),this.options.supressEmptyNode?(this.buildTextNode=d,this.buildObjNode=u):(this.buildTextNode=p,this.buildObjNode=c),this.buildTextValNode=p,this.buildObjectNode=c}function s(t,e){return t=this.options.tagValueProcessor(""+t),""===this.options.cdataPositionChar||""===t?t+"<![CDATA["+e+"]]"+this.tagEndChar:t.replace(this.options.cdataPositionChar,"<![CDATA["+e+"]]"+this.tagEndChar)}function l(t,e){if(t=this.options.tagValueProcessor(""+t),""===this.options.cdataPositionChar||""===t)return t+"<![CDATA["+e.join("]]><![CDATA[")+"]]"+this.tagEndChar;for(let n in e)t=t.replace(this.options.cdataPositionChar,"<![CDATA["+e[n]+"]]>");return t+this.newLine}function c(t,e,n,o){return n&&!t.includes("<")?this.indentate(o)+"<"+e+n+">"+t+"</"+e+this.tagEndChar:this.indentate(o)+"<"+e+n+this.tagEndChar+t+this.indentate(o)+"</"+e+this.tagEndChar}function u(t,e,n,o){return""!==t?this.buildObjectNode(t,e,n,o):this.indentate(o)+"<"+e+n+"/"+this.tagEndChar}function p(t,e,n,o){return this.indentate(o)+"<"+e+n+">"+this.options.tagValueProcessor(t)+"</"+e+this.tagEndChar}function d(t,e,n,o){return""!==t?this.buildTextValNode(t,e,n,o):this.indentate(o)+"<"+e+n+"/"+this.tagEndChar}function m(t){return this.options.indentBy.repeat(t)}function f(t){return!!t.startsWith(this.options.attributeNamePrefix)&&t.substr(this.attrPrefixLen)}function h(t){return t===this.options.cdataTagName}a.prototype.parse=function(t){return this.j2x(t,0).val},a.prototype.j2x=function(t,e){let n="",o="";const r=Object.keys(t),i=r.length;for(let a=0;a<i;a++){const i=r[a];if(void 0===t[i]);else if(null===t[i])o+=this.indentate(e)+"<"+i+"/"+this.tagEndChar;else if(t[i]instanceof Date)o+=this.buildTextNode(t[i],i,"",e);else if("object"!=typeof t[i]){const r=this.isAttribute(i);r?n+=" "+r+'="'+this.options.attrValueProcessor(""+t[i])+'"':this.isCDATA(i)?t[this.options.textNodeName]?o+=this.replaceCDATAstr(t[this.options.textNodeName],t[i]):o+=this.replaceCDATAstr("",t[i]):i===this.options.textNodeName?t[this.options.cdataTagName]||(o+=this.options.tagValueProcessor(""+t[i])):o+=this.buildTextNode(t[i],i,"",e)}else if(Array.isArray(t[i]))if(this.isCDATA(i))o+=this.indentate(e),t[this.options.textNodeName]?o+=this.replaceCDATAarr(t[this.options.textNodeName],t[i]):o+=this.replaceCDATAarr("",t[i]);else{const n=t[i].length;for(let r=0;r<n;r++){const n=t[i][r];if(void 0===n);else if(null===n)o+=this.indentate(e)+"<"+i+"/"+this.tagEndChar;else if("object"==typeof n){const t=this.j2x(n,e+1);o+=this.buildObjNode(t.val,i,t.attrStr,e)}else o+=this.buildTextNode(n,i,"",e)}}else if(this.options.attrNodeName&&i===this.options.attrNodeName){const e=Object.keys(t[i]),o=e.length;for(let r=0;r<o;r++)n+=" "+e[r]+'="'+this.options.attrValueProcessor(""+t[i][e[r]])+'"'}else{const n=this.j2x(t[i],e+1);o+=this.buildObjNode(n.val,i,n.attrStr,e)}}return{attrStr:n,val:o}},t.exports=a},function(t,e,n){"use strict";n.r(e);n(5);var o,r,i=function(t,e){var n=a(t,e),r=s(t),i={link:e.link,category:t,title:n.title,product:e.product,company:e.company,provider:e.provider,description:n.description,productInfoUrl:e.productInfoUrl,price:parseFloat(e.price).toFixed(2)};r>-1?o[r]=i:o.push(i)},a=function(t,e){var n={title:"Günstigste Alternative",description:"Hier kann Beschreibungstext für die günstigste Alternative stehen, mit link zum Datenblatt für den Tarif ".concat(e.product)};return 1===t&&(n.title="Bester Preis im gleichen Netz",n.description="Hier kann Beschreibungstext für den bester Preis im gleichen Netz stehen, mit link zum Datenblatt für den Tarif ".concat(e.product)),2===t&&(n.title="Bessere Konditionen",n.description="Hier kann Beschreibungstext für die bessere Konditionen stehen, mit link zum Datenblatt für den Tarif ".concat(e.product)),n},s=function(t){for(var e in o)if(o[e].category===t)return e;return-1},l=function(t,e){r=parseFloat(t-e).toFixed(2)},c={},u={container:"#smb-phone-plan",logo:"https://www.giga.de/static-local/dist/assets/images/logos/giga.svg",endpoint:"https://tools.communicationads.net/webservice.php?wf=10506&format=xml&calc=handytarif&country=DE&c=999"},p=function(t){c=Object.assign({},c,t)},d=function(t){return t.length>0?0:1},m=function(t){return 0===t.length?90:1===t.length?80:2===t.length?60:40},f={get:function(){return c},set:p,init:function(t){var e=Object.assign({},u,t);p({deals:[],tariffs:[],calculated:!1,emailSended:!1,resultCategory:0,resultPercent:0,priceDiffence:"0",logo:e.logo,endpoint:e.endpoint,container:document.querySelector(e.container)})},setResult:function(t){o=[];var e=function(t,e){for(var n=parseFloat(e.price),r=parseFloat(e.volume),a=n,s=n,c=n,u=0;u<t.length;u++){var p=t[u],d=parseFloat(p.price),m=parseFloat(p.volume);d<a?(i(0,p),a=d,l(n,d)):p.provider===e.provider&&d<s?(i(1,p),s=d):m>r&&d<c&&(i(2,p),c=d,r=m)}return o}(c.tariffs,t);p({deals:e,calculated:!0,priceDiffence:r,resultCategory:d(e),resultPercent:m(e)})}},h=n(2),b=n.n(h),v=n(3);function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var w=function(t){setTimeout(function(){0===f.get().tariffs.length&&f.set({tariffs:N(v)}),t()},3e3)},y=function(){try{var t=new XMLHttpRequest;t.open("GET",f.get().endpoint,!0),t.timeout=2500,t.onreadystatechange=function(){if(4===t.readyState&&200===t.status&&t.response){var e=b.a.parse(t.response);f.set({tariffs:N(e)})}},t.send()}catch(t){}},N=function(t){var e=[];return t&&t.handytarif&&"object"===g(t.handytarif.product)&&t.handytarif.product.forEach(function(t){e.push({link:t.link.toString(),product:t.product.toString(),productInfoUrl:t.url_moreinfo.toString(),company:t.company.toString().toLowerCase(),provider:t.provider.toString().toLowerCase(),price:t.cost_pm.toString().replace(",","."),volume:t.mobileweb_volume.toString().replace("GB","").trim()})}),e},T=function(){return new Promise(function(t,e){f.get().calculated?t():(y(),w(t))})};var x=function(){return"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype};var C=function(t){let e={top:0,right:0,bottom:0,left:0};return t?("object"==typeof t?(e.top=t.top||0,e.right=t.right||0,e.bottom=t.bottom||0,e.left=t.left||0):e.bottom=t,e):e};var A=function(t,e,n,o,r){if(!n&&!r)return;let i,a,s=!1,l=!1;const c=C(o),u=function(){if(r&&l)try{r()}catch(t){console.error(t)}l=!1},p=function(t){if(n&&!l){try{n()}catch(t){console.error(t)}e&&d(t)}l=!0},d=function(t){x()?i.unobserve(t.target):window.removeEventListener("scroll",f,{capture:!1,passive:!0})},m=function(){var e=(a=t.getBoundingClientRect()).top<=window.innerHeight+c.bottom,n=a.bottom-c.bottom>=0;e&&n?p():u(),s=!1},f=function(){if(s)return!1;window.requestAnimationFrame?(window.requestAnimationFrame(m),s=!0):m()};if(x()){const e={rootMargin:c.top+"px "+c.right+"px "+c.bottom+"px "+c.left+"px"};(i=new IntersectionObserver(function(t){t.forEach(function(t){t.isIntersecting?p(t):u()})},e)).observe(t)}else window.addEventListener("scroll",f,{capture:!1,passive:!0})};var S=function(t,e,n,o){A(t,!0,e,n,o)},k=!1,_=window.location.href,E="Smartphone Rate Calculator",O=function(){if(void 0!==window.smbt)try{window.smbt.emit("custom-event",{hitType:"event",eventCategory:E,eventAction:"Check button clicked",eventLabel:_,metric85:1})}catch(t){}},P=function(t){void 0!==window.smbt&&t.addEventListener("change",function(){D(t),M()})},M=function(){if(!k){try{window.smbt.emit("custom-event",{hitType:"event",eventCategory:E,eventAction:"clicked",eventLabel:_,metric84:1})}catch(t){}k=!0}},D=function t(e){e.removeEventListener("change",function(){t(e),M()})},L=function(){var t=document.querySelector('[data-role="smb-phone-plan-deals"]');null!==t&&(0===f.get().deals.length?t.innerHTML="":(t.innerHTML='\n      <ul class="list-group smb-phone-plan-deals-list">\n        '.concat(f.get().deals.map(function(t,e){return'\n          <li class="list-group-item smb-phone-plan-deal-item clearfix">\n            <div class="col-sm-8">\n              <h4 class="smb-phone-plan-deal-title">'.concat(t.title," ").concat(t.company?" mit ".concat(t.company):"","</h4>\n              ").concat(t.productInfoUrl?"\n                  <p>".concat(t.description.replace(t.product,'<a href="'.concat(t.productInfoUrl,'" target="_blank">').concat(t.product,"</a>")),"</p>\n                "):"\n                  <p>".concat(t.description,"</p>\n                "),'\n            </div>\n            <div class="col-sm-4">\n              <div class="text-center smb-phone-plan-deal-price">').concat(t.price,'€</div>\n              <a class="btn btn-primary btn-block" data-role="smb-phone-plan-affiliate-link" href="').concat(t.link,'" target="_blank">Zum Angebot</a>\n            </div>\n          </li>\n        ').trim()}).join(""),"\n      </ul>\n    "),function(){if(void 0!==window.smbt){var t=document.querySelectorAll('[data-role="smb-phone-plan-affiliate-link"]');0!==t.length&&t.forEach(function(t,e){t.addEventListener("click",function(){try{window.smbt.emit("custom-event",{hitType:"event",eventCategory:E,eventAction:"Offer button ".concat(e+1," clicked"),eventLabel:_,metric86:1})}catch(t){}})})}}()))},j=function(){var t={categoryText:"schlecht",thumbIconClass:"icon-thumbs-down",progressClass:"smb-phone-plan-danger"};return 1===f.get().resultCategory&&(t.categoryText="gut",t.thumbIconClass="icon-thumbs-up",t.progressClass="smb-phone-plan-success"),t},B=function(t){var e=document.querySelector('[data-role="smb-phone-plan-progress-bar"]');null!==e&&setTimeout(function(){e.style.width="".concat(t,"%")},100)},I=function(){var t=document.querySelector('[data-role="smb-phone-plan-thumb-icon"]');null!==t&&setTimeout(function(){t.classList.add("shake")},1e3)},G=function(){var t=document.querySelector('[data-role="smb-phone-plan-send-email"]');null!==t&&t.addEventListener("click",function(){var t=document.querySelector('[data-role="smb-phone-plan-email"]'),e=document.querySelector('[data-role="smb-phone-plan-email-input"]');null!==t&&null!==e&&(!1!==function(t){return/\S+@\S+\.\S+/.test(t)}(e.value)?(t.innerHTML="<p>Vielen Dank.</p>",f.set({emailSended:!0}),function(){if(void 0!==window.smbt)try{window.smbt.emit("custom-event",{hitType:"event",eventCategory:E,eventAction:"Mail address added",eventLabel:_})}catch(t){}}()):e.parentElement.classList.add("has-error"))})},V=function(){var t=j(),e=document.querySelector('[data-role="smb-phone-plan-result"]');e&&(e.innerHTML='\n      <hr />\n      <h3 class="">Dein Ergebnis</h3>\n      <div class="smb-phone-plan-progress">\n        <div class="smb-phone-plan-progress-bar '.concat(t.progressClass,'" data-role="smb-phone-plan-progress-bar"></div>\n        <i class="smb-phone-plan-thumb-icon ').concat(t.thumbIconClass,'" data-role="smb-phone-plan-thumb-icon"></i>\n      </div>\n      ').concat(0===f.get().resultCategory?"\n        <strong>Dein Tarif ist ".concat(t.categoryText,". Du zahlst ").concat(f.get().priceDiffence,"€ zu viel im Monat. Hier gibt es bessere Alternativen:</strong>\n      "):"\n        <strong>Herzlichen Glückwünsch. Du hast einen tollen Tarif.</strong>\n        ".concat(!1===f.get().emailSended?'\n          <hr />\n          <div data-role="smb-phone-plan-email">\n            <p>Schick mir eine E-Mail wenn es ein besseres Angebot gibt.</p>\n            <div class="row">\n              <div class="form-group col-sm-6">\n                <div class="input-group">\n                  <div class="input-group-addon">@</div>\n                  <input type="email" class="form-control" data-role="smb-phone-plan-email-input" placeholder="E-Mail">\n                </div>\n              </div>\n              <div class="form-group col-sm-6">\n                <button class="btn btn-primary btn-block" data-role="smb-phone-plan-send-email">Absenden</button>\n              </div>\n            </div>\n          </div>\n        ':"","\n      "),"\n    "),B(f.get().resultPercent),I(),G(),function(t){if(void 0!==window.smbt)try{window.smbt.emit("custom-event",{hitType:"event",eventCategory:E,eventAction:"Current contract ".concat(t),eventLabel:_})}catch(t){}}(t.categoryText))},q=function(){var t,e=document.querySelector('[data-role="smb-phone-plan-processing"]');e&&(e.innerHTML='\n      <hr />\n      <div class="smb-phone-plan-loading-dot-container text-center">\n        <p>\n          <span class="smb-phone-plan-loading-dot"></span>\n          <span class="smb-phone-plan-loading-dot"></span>\n          <span class="smb-phone-plan-loading-dot"></span>\n        </p>\n      </div>\n      <p class="text-center">'.concat((t=["57 Millionen Deutsche besitzen ein Smartphone. (Quelle: statista)","43% der 20 bis 29-Jährigen in Deutschland nutzen ihr Smartphone mehr als 120 Minuten täglich. (Quelle: statista)","Die Netzabdeckung mit 4G liegt in Deutschland bei 65%, in Norwegen bei 92%. (Quelle: statista)"])[Math.floor(Math.random()*t.length)],"</p>\n    "))};n.d(e,"listenToFormularInteraction",function(){return H});var F=function(){var t,e=function(){for(var t=!1,e={},n=document.querySelectorAll('[data-role="smb-phone-plan-formular-item"]'),o=0;o<n.length;o++){var r=n[o],i=r.dataset.name;r.dataset.required&&""===r.value?(t=!0,r.parentElement.classList.add("has-error")):r.parentElement.classList.remove("has-error"),"checkbox"===r.type?e[i]=r.checked:e[i]=r.value}return t?{}:e}();0!==Object.keys(e).length&&(!1===f.get().calculated&&q(),null!==(t=document.querySelector('[data-role="smb-phone-plan-formular"]'))&&t.classList.add("blur"),T().then(function(){f.setResult(e)}).then(function(){var t;(t=document.querySelector('[data-role="smb-phone-plan-processing"]'))&&t.remove(),V(),L()}))},R=function(){var t=document.querySelector('[data-role="smb-phone-plan-check"]');null!==t&&t.addEventListener("click",function(){F(),O()})},z=function(){document.onkeydown=function(t){13===t.keyCode&&(F(),O())}},H=function(){for(var t=document.querySelectorAll('[data-role="smb-phone-plan-formular-item"]'),e=0;e<t.length;e++){var n=t[e];J(n),P(n)}},J=function(t){t.addEventListener("focus",function(){var t;f.get().calculated&&null!==(t=document.querySelector('[data-role="smb-phone-plan-formular"]'))&&t.classList.remove("blur")})};e.default=function(t){f.init(t),null!==f.get().container&&(f.get().container.innerHTML='\n    <div class="smb-phone-plan-container">\n      <div class="smb-phone-plan-header">\n        <h2 class="smb-phone-plan-title">Teste deinen Handyvertrag!</h2>\n        <img class="smb-phone-plan-logo" src="'.concat(f.get().logo,'" alt="">\n      </div>\n      <div class="smb-phone-plan-body">\n        <div class="smb-phone-plan-formular" data-role="smb-phone-plan-formular">\n          <div class="form-group input-group">\n            <input type="number" class="form-control" placeholder="Wieviel zahlst du pro Monat?" value="" data-role="smb-phone-plan-formular-item" data-name="price" data-required="1">\n            <div class="input-group-addon">€</div>\n          </div>\n          <div class="row">\n            <div class="form-group col-sm-6">\n              <select class="form-control" data-role="smb-phone-plan-formular-item" data-name="provider" data-required="1">\n                <option value="">Netz</option>\n                <option value="d1">D1</option>\n                <option value="d2">D2</option>\n                <option value="o2">O2</option>\n                <option value="telefónica">Telefónica</option>\n              </select>\n            </div>\n            <div class="form-group col-sm-6">\n              <select class="form-control" data-role="smb-phone-plan-formular-item" data-name="volume" data-required="1">\n                <option value="">Datenvolumen</option>\n                <option value="0.5">unter 1GB</option>\n                <option value="1">1GB</option>\n                <option value="2">2GB</option>\n                <option value="3">3GB</option>\n                <option value="4">4GB</option>\n                <option value="5">5GB</option>\n                <option value="6">6GB</option>\n                <option value="8">8GB</option>\n                <option value="10">10GB</option>\n              </select>\n            </div>\n          </div>\n          <div class="row form-group clearfix">\n            <div class="col-sm-6">\n              <label class="custom-control-label">\n                <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-formular-item" data-name="lte">\n                &nbsp;LTE\n              </label>\n            </div>\n            <div class="col-sm-6">\n              <label class="custom-control-label">\n                <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-formular-item" data-name="flatrate">\n                &nbsp;Telefon Flatrate\n              </label>\n            </div>\n          </div>\n          <button class="btn btn-primary btn-block" data-role="smb-phone-plan-check">Jetzt prüfen!</button>\n        </div>\n        <div class="smb-phone-plan-processing" data-role="smb-phone-plan-processing"></div>\n        <div class="smb-phone-plan-result" data-role="smb-phone-plan-result"></div>\n        <div class="smb-phone-plan-deals" data-role="smb-phone-plan-deals"></div>\n      </div>\n    </div>\n  '),R(),z(),H(),function(){if(void 0!==window.smbt)try{window.smbt.emit("custom-event",{hitType:"event",eventCategory:E,eventAction:"embed",eventLabel:_,nonInteraction:!0,metric82:1})}catch(t){}}(),void 0!==window.smbt&&S(f.get().container,function(){try{window.smbt.emit("custom-event",{hitType:"event",eventCategory:E,eventAction:"visible",eventLabel:_,nonInteraction:!0,metric83:1})}catch(t){}}))}}]).default});
//# sourceMappingURL=smb-phone-plan.js.map