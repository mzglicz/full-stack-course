var Prototype={Version:"1.6.0.2",Browser:{IE:!!(window.attachEvent&&!window.opera),Opera:!!window.opera,WebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1,MobileSafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/)},BrowserFeatures:{XPath:!!document.evaluate,ElementExtensions:!!window.HTMLElement,SpecificElementExtensions:document.createElement("div").__proto__&&document.createElement("div").__proto__!==document.createElement("form").__proto__},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(A){return A
}};
if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false
}var Class={create:function(){var E=null,D=$A(arguments);
if(Object.isFunction(D[0])){E=D.shift()
}function A(){this.initialize.apply(this,arguments)
}Object.extend(A,Class.Methods);
A.superclass=E;
A.subclasses=[];
if(E){var B=function(){};
B.prototype=E.prototype;
A.prototype=new B;
E.subclasses.push(A)
}for(var C=0;
C<D.length;
C++){A.addMethods(D[C])
}if(!A.prototype.initialize){A.prototype.initialize=Prototype.emptyFunction
}A.prototype.constructor=A;
return A
}};
Class.Methods={addMethods:function(G){var C=this.superclass&&this.superclass.prototype;
var B=Object.keys(G);
if(!Object.keys({toString:true}).length){B.push("toString","valueOf")
}for(var A=0,D=B.length;
A<D;
A++){var F=B[A],E=G[F];
if(C&&Object.isFunction(E)&&E.argumentNames().first()=="$super"){var H=E,E=Object.extend((function(I){return function(){return C[I].apply(this,arguments)
}
})(F).wrap(H),{valueOf:function(){return H
},toString:function(){return H.toString()
}})
}this.prototype[F]=E
}return this
}};
var Abstract={};
Object.extend=function(A,C){for(var B in C){A[B]=C[B]
}return A
};
Object.extend(Object,{inspect:function(A){try{if(Object.isUndefined(A)){return"undefined"
}if(A===null){return"null"
}return A.inspect?A.inspect():String(A)
}catch(B){if(B instanceof RangeError){return"..."
}throw B
}},toJSON:function(A){var C=typeof A;
switch(C){case"undefined":case"function":case"unknown":return ;
case"boolean":return A.toString()
}if(A===null){return"null"
}if(A.toJSON){return A.toJSON()
}if(Object.isElement(A)){return 
}var B=[];
for(var E in A){var D=Object.toJSON(A[E]);
if(!Object.isUndefined(D)){B.push(E.toJSON()+": "+D)
}}return"{"+B.join(", ")+"}"
},toQueryString:function(A){return $H(A).toQueryString()
},toHTML:function(A){return A&&A.toHTML?A.toHTML():String.interpret(A)
},keys:function(A){var B=[];
for(var C in A){B.push(C)
}return B
},values:function(B){var A=[];
for(var C in B){A.push(B[C])
}return A
},clone:function(A){return Object.extend({},A)
},isElement:function(A){return A&&A.nodeType==1
},isArray:function(A){return A!=null&&typeof A=="object"&&"splice" in A&&"join" in A
},isHash:function(A){return A instanceof Hash
},isFunction:function(A){return typeof A=="function"
},isString:function(A){return typeof A=="string"
},isNumber:function(A){return typeof A=="number"
},isUndefined:function(A){return typeof A=="undefined"
}});
Object.extend(Function.prototype,{argumentNames:function(){var A=this.toString().match(/^[\s\(]*function[^(]*\((.*?)\)/)[1].split(",").invoke("strip");
return A.length==1&&!A[0]?[]:A
},bind:function(){if(arguments.length<2&&Object.isUndefined(arguments[0])){return this
}var A=this,C=$A(arguments),B=C.shift();
return function(){return A.apply(B,C.concat($A(arguments)))
}
},bindAsEventListener:function(){var A=this,C=$A(arguments),B=C.shift();
return function(D){return A.apply(B,[D||window.event].concat(C))
}
},curry:function(){if(!arguments.length){return this
}var A=this,B=$A(arguments);
return function(){return A.apply(this,B.concat($A(arguments)))
}
},delay:function(){var A=this,B=$A(arguments),C=B.shift()*1000;
return window.setTimeout(function(){return A.apply(A,B)
},C)
},wrap:function(B){var A=this;
return function(){return B.apply(this,[A.bind(this)].concat($A(arguments)))
}
},methodize:function(){if(this._methodized){return this._methodized
}var A=this;
return this._methodized=function(){return A.apply(null,[this].concat($A(arguments)))
}
}});
Function.prototype.defer=Function.prototype.delay.curry(0.01);
Date.prototype.toJSON=function(){return'"'+this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+'Z"'
};
var Try={these:function(){var C;
for(var B=0,D=arguments.length;
B<D;
B++){var A=arguments[B];
try{C=A();
break
}catch(E){}}return C
}};
RegExp.prototype.match=RegExp.prototype.test;
RegExp.escape=function(A){return String(A).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")
};
var PeriodicalExecuter=Class.create({initialize:function(B,A){this.callback=B;
this.frequency=A;
this.currentlyExecuting=false;
this.registerCallback()
},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000)
},execute:function(){this.callback(this)
},stop:function(){if(!this.timer){return 
}clearInterval(this.timer);
this.timer=null
},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;
this.execute()
}finally{this.currentlyExecuting=false
}}}});
Object.extend(String,{interpret:function(A){return A==null?"":String(A)
},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});
Object.extend(String.prototype,{gsub:function(E,C){var A="",D=this,B;
C=arguments.callee.prepareReplacement(C);
while(D.length>0){if(B=D.match(E)){A+=D.slice(0,B.index);
A+=String.interpret(C(B));
D=D.slice(B.index+B[0].length)
}else{A+=D,D=""
}}return A
},sub:function(C,A,B){A=this.gsub.prepareReplacement(A);
B=Object.isUndefined(B)?1:B;
return this.gsub(C,function(D){if(--B<0){return D[0]
}return A(D)
})
},scan:function(B,A){this.gsub(B,A);
return String(this)
},truncate:function(B,A){B=B||30;
A=Object.isUndefined(A)?"...":A;
return this.length>B?this.slice(0,B-A.length)+A:String(this)
},strip:function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")
},stripTags:function(){return this.replace(/<\/?[^>]+>/gi,"")
},stripScripts:function(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"")
},extractScripts:function(){var B=new RegExp(Prototype.ScriptFragment,"img");
var A=new RegExp(Prototype.ScriptFragment,"im");
return(this.match(B)||[]).map(function(C){return(C.match(A)||["",""])[1]
})
},evalScripts:function(){return this.extractScripts().map(function(script){return eval(script)
})
},escapeHTML:function(){var A=arguments.callee;
A.text.data=this;
return A.div.innerHTML
},unescapeHTML:function(){var A=new Element("div");
A.innerHTML=this.stripTags();
return A.childNodes[0]?(A.childNodes.length>1?$A(A.childNodes).inject("",function(B,C){return B+C.nodeValue
}):A.childNodes[0].nodeValue):""
},toQueryParams:function(B){var A=this.strip().match(/([^?#]*)(#.*)?$/);
if(!A){return{}
}return A[1].split(B||"&").inject({},function(E,F){if((F=F.split("="))[0]){var C=decodeURIComponent(F.shift());
var D=F.length>1?F.join("="):F[0];
if(D!=undefined){D=decodeURIComponent(D)
}if(C in E){if(!Object.isArray(E[C])){E[C]=[E[C]]
}E[C].push(D)
}else{E[C]=D
}}return E
})
},toArray:function(){return this.split("")
},succ:function(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1)
},times:function(A){return A<1?"":new Array(A+1).join(this)
},camelize:function(){var D=this.split("-"),A=D.length;
if(A==1){return D[0]
}var C=this.charAt(0)=="-"?D[0].charAt(0).toUpperCase()+D[0].substring(1):D[0];
for(var B=1;
B<A;
B++){C+=D[B].charAt(0).toUpperCase()+D[B].substring(1)
}return C
},capitalize:function(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase()
},underscore:function(){return this.gsub(/::/,"/").gsub(/([A-Z]+)([A-Z][a-z])/,"#{1}_#{2}").gsub(/([a-z\d])([A-Z])/,"#{1}_#{2}").gsub(/-/,"_").toLowerCase()
},dasherize:function(){return this.gsub(/_/,"-")
},inspect:function(B){var A=this.gsub(/[\x00-\x1f\\]/,function(C){var D=String.specialChar[C[0]];
return D?D:"\\u00"+C[0].charCodeAt().toPaddedString(2,16)
});
if(B){return'"'+A.replace(/"/g,'\\"')+'"'
}return"'"+A.replace(/'/g,"\\'")+"'"
},toJSON:function(){return this.inspect(true)
},unfilterJSON:function(A){return this.sub(A||Prototype.JSONFilter,"#{1}")
},isJSON:function(){var A=this;
if(A.blank()){return false
}A=this.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");
return(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(A)
},evalJSON:function(sanitize){var json=this.unfilterJSON();
try{if(!sanitize||json.isJSON()){return eval("("+json+")")
}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect())
},include:function(A){return this.indexOf(A)>-1
},startsWith:function(A){return this.indexOf(A)===0
},endsWith:function(A){var B=this.length-A.length;
return B>=0&&this.lastIndexOf(A)===B
},empty:function(){return this==""
},blank:function(){return/^\s*$/.test(this)
},interpolate:function(A,B){return new Template(this,B).evaluate(A)
}});
if(Prototype.Browser.WebKit||Prototype.Browser.IE){Object.extend(String.prototype,{escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
},unescapeHTML:function(){return this.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")
}})
}String.prototype.gsub.prepareReplacement=function(B){if(Object.isFunction(B)){return B
}var A=new Template(B);
return function(C){return A.evaluate(C)
}
};
String.prototype.parseQuery=String.prototype.toQueryParams;
Object.extend(String.prototype.escapeHTML,{div:document.createElement("div"),text:document.createTextNode("")});
with(String.prototype.escapeHTML){div.appendChild(text)
}var Template=Class.create({initialize:function(A,B){this.template=A.toString();
this.pattern=B||Template.Pattern
},evaluate:function(A){if(Object.isFunction(A.toTemplateReplacements)){A=A.toTemplateReplacements()
}return this.template.gsub(this.pattern,function(D){if(A==null){return""
}var F=D[1]||"";
if(F=="\\"){return D[2]
}var B=A,G=D[3];
var E=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
D=E.exec(G);
if(D==null){return F
}while(D!=null){var C=D[1].startsWith("[")?D[2].gsub("\\\\]","]"):D[1];
B=B[C];
if(null==B||""==D[3]){break
}G=G.substring("["==D[3]?D[1].length:D[0].length);
D=E.exec(G)
}return F+String.interpret(B)
})
}});
Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;
var $break={};
var Enumerable={each:function(C,B){var A=0;
C=C.bind(B);
try{this._each(function(E){C(E,A++)
})
}catch(D){if(D!=$break){throw D
}}return this
},eachSlice:function(D,C,B){C=C?C.bind(B):Prototype.K;
var A=-D,E=[],F=this.toArray();
while((A+=D)<F.length){E.push(F.slice(A,A+D))
}return E.collect(C,B)
},all:function(C,B){C=C?C.bind(B):Prototype.K;
var A=true;
this.each(function(E,D){A=A&&!!C(E,D);
if(!A){throw $break
}});
return A
},any:function(C,B){C=C?C.bind(B):Prototype.K;
var A=false;
this.each(function(E,D){if(A=!!C(E,D)){throw $break
}});
return A
},collect:function(C,B){C=C?C.bind(B):Prototype.K;
var A=[];
this.each(function(E,D){A.push(C(E,D))
});
return A
},detect:function(C,B){C=C.bind(B);
var A;
this.each(function(E,D){if(C(E,D)){A=E;
throw $break
}});
return A
},findAll:function(C,B){C=C.bind(B);
var A=[];
this.each(function(E,D){if(C(E,D)){A.push(E)
}});
return A
},grep:function(D,C,B){C=C?C.bind(B):Prototype.K;
var A=[];
if(Object.isString(D)){D=new RegExp(D)
}this.each(function(F,E){if(D.match(F)){A.push(C(F,E))
}});
return A
},include:function(A){if(Object.isFunction(this.indexOf)){if(this.indexOf(A)!=-1){return true
}}var B=false;
this.each(function(C){if(C==A){B=true;
throw $break
}});
return B
},inGroupsOf:function(B,A){A=Object.isUndefined(A)?null:A;
return this.eachSlice(B,function(C){while(C.length<B){C.push(A)
}return C
})
},inject:function(A,C,B){C=C.bind(B);
this.each(function(E,D){A=C(A,E,D)
});
return A
},invoke:function(B){var A=$A(arguments).slice(1);
return this.map(function(C){return C[B].apply(C,A)
})
},max:function(C,B){C=C?C.bind(B):Prototype.K;
var A;
this.each(function(E,D){E=C(E,D);
if(A==null||E>=A){A=E
}});
return A
},min:function(C,B){C=C?C.bind(B):Prototype.K;
var A;
this.each(function(E,D){E=C(E,D);
if(A==null||E<A){A=E
}});
return A
},partition:function(D,B){D=D?D.bind(B):Prototype.K;
var C=[],A=[];
this.each(function(F,E){(D(F,E)?C:A).push(F)
});
return[C,A]
},pluck:function(B){var A=[];
this.each(function(C){A.push(C[B])
});
return A
},reject:function(C,B){C=C.bind(B);
var A=[];
this.each(function(E,D){if(!C(E,D)){A.push(E)
}});
return A
},sortBy:function(B,A){B=B.bind(A);
return this.map(function(D,C){return{value:D,criteria:B(D,C)}
}).sort(function(F,E){var D=F.criteria,C=E.criteria;
return D<C?-1:D>C?1:0
}).pluck("value")
},toArray:function(){return this.map()
},zip:function(){var B=Prototype.K,A=$A(arguments);
if(Object.isFunction(A.last())){B=A.pop()
}var C=[this].concat(A).map($A);
return this.map(function(E,D){return B(C.pluck(D))
})
},size:function(){return this.toArray().length
},inspect:function(){return"#<Enumerable:"+this.toArray().inspect()+">"
}};
Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,filter:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray,every:Enumerable.all,some:Enumerable.any});
function $A(C){if(!C){return[]
}if(C.toArray){return C.toArray()
}var B=C.length||0,A=new Array(B);
while(B--){A[B]=C[B]
}return A
}if(Prototype.Browser.WebKit){$A=function(C){if(!C){return[]
}if(!(Object.isFunction(C)&&C=="[object NodeList]")&&C.toArray){return C.toArray()
}var B=C.length||0,A=new Array(B);
while(B--){A[B]=C[B]
}return A
}
}Array.from=$A;
Object.extend(Array.prototype,Enumerable);
if(!Array.prototype._reverse){Array.prototype._reverse=Array.prototype.reverse
}Object.extend(Array.prototype,{_each:function(B){for(var A=0,C=this.length;
A<C;
A++){B(this[A])
}},clear:function(){this.length=0;
return this
},first:function(){return this[0]
},last:function(){return this[this.length-1]
},compact:function(){return this.select(function(A){return A!=null
})
},flatten:function(){return this.inject([],function(B,A){return B.concat(Object.isArray(A)?A.flatten():[A])
})
},without:function(){var A=$A(arguments);
return this.select(function(B){return !A.include(B)
})
},reverse:function(A){return(A!==false?this:this.toArray())._reverse()
},reduce:function(){return this.length>1?this:this[0]
},uniq:function(A){return this.inject([],function(D,C,B){if(0==B||(A?D.last()!=C:!D.include(C))){D.push(C)
}return D
})
},intersect:function(A){return this.uniq().findAll(function(B){return A.detect(function(C){return B===C
})
})
},clone:function(){return[].concat(this)
},size:function(){return this.length
},inspect:function(){return"["+this.map(Object.inspect).join(", ")+"]"
},toJSON:function(){var A=[];
this.each(function(B){var C=Object.toJSON(B);
if(!Object.isUndefined(C)){A.push(C)
}});
return"["+A.join(", ")+"]"
}});
if(Object.isFunction(Array.prototype.forEach)){Array.prototype._each=Array.prototype.forEach
}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(C,A){A||(A=0);
var B=this.length;
if(A<0){A=B+A
}for(;
A<B;
A++){if(this[A]===C){return A
}}return -1
}
}if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(B,A){A=isNaN(A)?this.length:(A<0?this.length+A:A)+1;
var C=this.slice(0,A).reverse().indexOf(B);
return(C<0)?C:A-C-1
}
}Array.prototype.toArray=Array.prototype.clone;
function $w(A){if(!Object.isString(A)){return[]
}A=A.strip();
return A?A.split(/\s+/):[]
}if(Prototype.Browser.Opera){Array.prototype.concat=function(){var E=[];
for(var B=0,C=this.length;
B<C;
B++){E.push(this[B])
}for(var B=0,C=arguments.length;
B<C;
B++){if(Object.isArray(arguments[B])){for(var A=0,D=arguments[B].length;
A<D;
A++){E.push(arguments[B][A])
}}else{E.push(arguments[B])
}}return E
}
}Object.extend(Number.prototype,{toColorPart:function(){return this.toPaddedString(2,16)
},succ:function(){return this+1
},times:function(A){$R(0,this,true).each(A);
return this
},toPaddedString:function(C,B){var A=this.toString(B||10);
return"0".times(C-A.length)+A
},toJSON:function(){return isFinite(this)?this.toString():"null"
}});
$w("abs round ceil floor").each(function(A){Number.prototype[A]=Math[A].methodize()
});
function $H(A){return new Hash(A)
}var Hash=Class.create(Enumerable,(function(){function A(B,C){if(Object.isUndefined(C)){return B
}return B+"="+encodeURIComponent(String.interpret(C))
}return{initialize:function(B){this._object=Object.isHash(B)?B.toObject():Object.clone(B)
},_each:function(C){for(var B in this._object){var D=this._object[B],E=[B,D];
E.key=B;
E.value=D;
C(E)
}},set:function(B,C){return this._object[B]=C
},get:function(B){return this._object[B]
},unset:function(B){var C=this._object[B];
delete this._object[B];
return C
},toObject:function(){return Object.clone(this._object)
},keys:function(){return this.pluck("key")
},values:function(){return this.pluck("value")
},index:function(C){var B=this.detect(function(D){return D.value===C
});
return B&&B.key
},merge:function(B){return this.clone().update(B)
},update:function(B){return new Hash(B).inject(this,function(C,D){C.set(D.key,D.value);
return C
})
},toQueryString:function(){return this.map(function(D){var C=encodeURIComponent(D.key),B=D.value;
if(B&&typeof B=="object"){if(Object.isArray(B)){return B.map(A.curry(C)).join("&")
}}return A(C,B)
}).join("&")
},inspect:function(){return"#<Hash:{"+this.map(function(B){return B.map(Object.inspect).join(": ")
}).join(", ")+"}>"
},toJSON:function(){return Object.toJSON(this.toObject())
},clone:function(){return new Hash(this)
}}
})());
Hash.prototype.toTemplateReplacements=Hash.prototype.toObject;
Hash.from=$H;
var ObjectRange=Class.create(Enumerable,{initialize:function(C,A,B){this.start=C;
this.end=A;
this.exclusive=B
},_each:function(A){var B=this.start;
while(this.include(B)){A(B);
B=B.succ()
}},include:function(A){if(A<this.start){return false
}if(this.exclusive){return A<this.end
}return A<=this.end
}});
var $R=function(C,A,B){return new ObjectRange(C,A,B)
};
var Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
})||false
},activeRequestCount:0};
Ajax.Responders={responders:[],_each:function(A){this.responders._each(A)
},register:function(A){if(!this.include(A)){this.responders.push(A)
}},unregister:function(A){this.responders=this.responders.without(A)
},dispatch:function(D,B,C,A){this.each(function(E){if(Object.isFunction(E[D])){try{E[D].apply(E,[B,C,A])
}catch(F){}}})
}};
Object.extend(Ajax.Responders,Enumerable);
Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++
},onComplete:function(){Ajax.activeRequestCount--
}});
Ajax.Base=Class.create({initialize:function(A){this.options={method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:"",evalJSON:true,evalJS:true};
Object.extend(this.options,A||{});
this.options.method=this.options.method.toLowerCase();
if(Object.isString(this.options.parameters)){this.options.parameters=this.options.parameters.toQueryParams()
}else{if(Object.isHash(this.options.parameters)){this.options.parameters=this.options.parameters.toObject()
}}}});
Ajax.Request=Class.create(Ajax.Base,{_complete:false,initialize:function($super,B,A){$super(A);
this.transport=Ajax.getTransport();
this.request(B)
},request:function(B){this.url=B;
this.method=this.options.method;
var D=Object.clone(this.options.parameters);
if(!["get","post"].include(this.method)){D._method=this.method;
this.method="post"
}this.parameters=D;
if(D=Object.toQueryString(D)){if(this.method=="get"){this.url+=(this.url.include("?")?"&":"?")+D
}else{if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){D+="&_="
}}}try{var A=new Ajax.Response(this);
if(this.options.onCreate){this.options.onCreate(A)
}Ajax.Responders.dispatch("onCreate",this,A);
this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);
if(this.options.asynchronous){this.respondToReadyState.bind(this).defer(1)
}this.transport.onreadystatechange=this.onStateChange.bind(this);
this.setRequestHeaders();
this.body=this.method=="post"?(this.options.postBody||D):null;
this.transport.send(this.body);
if(!this.options.asynchronous&&this.transport.overrideMimeType){this.onStateChange()
}}catch(C){this.dispatchException(C)
}},onStateChange:function(){var A=this.transport.readyState;
if(A>1&&!((A==4)&&this._complete)){this.respondToReadyState(this.transport.readyState)
}},setRequestHeaders:function(){var E={"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,Accept:"text/javascript, text/html, application/xml, text/xml, */*"};
if(this.method=="post"){E["Content-type"]=this.options.contentType+(this.options.encoding?"; charset="+this.options.encoding:"");
if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005){E.Connection="close"
}}if(typeof this.options.requestHeaders=="object"){var C=this.options.requestHeaders;
if(Object.isFunction(C.push)){for(var B=0,D=C.length;
B<D;
B+=2){E[C[B]]=C[B+1]
}}else{$H(C).each(function(F){E[F.key]=F.value
})
}}for(var A in E){this.transport.setRequestHeader(A,E[A])
}},success:function(){var A=this.getStatus();
return !A||(A>=200&&A<300)
},getStatus:function(){try{return this.transport.status||0
}catch(A){return 0
}},respondToReadyState:function(A){var C=Ajax.Request.Events[A],B=new Ajax.Response(this);
if(C=="Complete"){try{this._complete=true;
(this.options["on"+B.status]||this.options["on"+(this.success()?"Success":"Failure")]||Prototype.emptyFunction)(B,B.headerJSON)
}catch(D){this.dispatchException(D)
}var E=B.getHeader("Content-type");
if(this.options.evalJS=="force"||(this.options.evalJS&&this.isSameOrigin()&&E&&E.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))){this.evalResponse()
}}try{(this.options["on"+C]||Prototype.emptyFunction)(B,B.headerJSON);
Ajax.Responders.dispatch("on"+C,this,B,B.headerJSON)
}catch(D){this.dispatchException(D)
}if(C=="Complete"){this.transport.onreadystatechange=Prototype.emptyFunction
}},isSameOrigin:function(){var A=this.url.match(/^\s*https?:\/\/[^\/]*/);
return !A||(A[0]=="#{protocol}//#{domain}#{port}".interpolate({protocol:location.protocol,domain:document.domain,port:location.port?":"+location.port:""}))
},getHeader:function(A){try{return this.transport.getResponseHeader(A)||null
}catch(B){return null
}},evalResponse:function(){try{return eval((this.transport.responseText||"").unfilterJSON())
}catch(e){this.dispatchException(e)
}},dispatchException:function(A){(this.options.onException||Prototype.emptyFunction)(this,A);
Ajax.Responders.dispatch("onException",this,A)
}});
Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];
Ajax.Response=Class.create({initialize:function(C){this.request=C;
var D=this.transport=C.transport,A=this.readyState=D.readyState;
if((A>2&&!Prototype.Browser.IE)||A==4){this.status=this.getStatus();
this.statusText=this.getStatusText();
this.responseText=String.interpret(D.responseText);
this.headerJSON=this._getHeaderJSON()
}if(A==4){var B=D.responseXML;
this.responseXML=Object.isUndefined(B)?null:B;
this.responseJSON=this._getResponseJSON()
}},status:0,statusText:"",getStatus:Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText||""
}catch(A){return""
}},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function(){try{return this.getAllResponseHeaders()
}catch(A){return null
}},getResponseHeader:function(A){return this.transport.getResponseHeader(A)
},getAllResponseHeaders:function(){return this.transport.getAllResponseHeaders()
},_getHeaderJSON:function(){var A=this.getHeader("X-JSON");
if(!A){return null
}A=decodeURIComponent(escape(A));
try{return A.evalJSON(this.request.options.sanitizeJSON||!this.request.isSameOrigin())
}catch(B){this.request.dispatchException(B)
}},_getResponseJSON:function(){var A=this.request.options;
if(!A.evalJSON||(A.evalJSON!="force"&&!(this.getHeader("Content-type")||"").include("application/json"))||this.responseText.blank()){return null
}try{return this.responseText.evalJSON(A.sanitizeJSON||!this.request.isSameOrigin())
}catch(B){this.request.dispatchException(B)
}}});
Ajax.Updater=Class.create(Ajax.Request,{initialize:function($super,A,C,B){this.container={success:(A.success||A),failure:(A.failure||(A.success?null:A))};
B=Object.clone(B);
var D=B.onComplete;
B.onComplete=(function(E,F){this.updateContent(E.responseText);
if(Object.isFunction(D)){D(E,F)
}}).bind(this);
$super(C,B)
},updateContent:function(D){var C=this.container[this.success()?"success":"failure"],A=this.options;
if(!A.evalScripts){D=D.stripScripts()
}if(C=$(C)){if(A.insertion){if(Object.isString(A.insertion)){var B={};
B[A.insertion]=D;
C.insert(B)
}else{A.insertion(C,D)
}}else{C.update(D)
}}}});
Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{initialize:function($super,A,C,B){$super(B);
this.onComplete=this.options.onComplete;
this.frequency=(this.options.frequency||2);
this.decay=(this.options.decay||1);
this.updater={};
this.container=A;
this.url=C;
this.start()
},start:function(){this.options.onComplete=this.updateComplete.bind(this);
this.onTimerEvent()
},stop:function(){this.updater.options.onComplete=undefined;
clearTimeout(this.timer);
(this.onComplete||Prototype.emptyFunction).apply(this,arguments)
},updateComplete:function(A){if(this.options.decay){this.decay=(A.responseText==this.lastText?this.decay*this.options.decay:1);
this.lastText=A.responseText
}this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency)
},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options)
}});
function $(B){if(arguments.length>1){for(var A=0,D=[],C=arguments.length;
A<C;
A++){D.push($(arguments[A]))
}return D
}if(Object.isString(B)){B=document.getElementById(B)
}return Element.extend(B)
}if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(F,A){var C=[];
var E=document.evaluate(F,$(A)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(var B=0,D=E.snapshotLength;
B<D;
B++){C.push(Element.extend(E.snapshotItem(B)))
}return C
}
}if(!window.Node){var Node={}
}if(!Node.ELEMENT_NODE){Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12})
}(function(){var A=this.Element;
this.Element=function(D,C){C=C||{};
D=D.toLowerCase();
var B=Element.cache;
if(Prototype.Browser.IE&&C.name){D="<"+D+' name="'+C.name+'">';
delete C.name;
return Element.writeAttribute(document.createElement(D),C)
}if(!B[D]){B[D]=Element.extend(document.createElement(D))
}return Element.writeAttribute(B[D].cloneNode(false),C)
};
Object.extend(this.Element,A||{})
}).call(window);
Element.cache={};
Element.Methods={visible:function(A){return $(A).style.display!="none"
},toggle:function(A){A=$(A);
Element[Element.visible(A)?"hide":"show"](A);
return A
},hide:function(A){$(A).style.display="none";
return A
},show:function(A){$(A).style.display="";
return A
},remove:function(A){A=$(A);
A.parentNode.removeChild(A);
return A
},update:function(A,B){A=$(A);
if(B&&B.toElement){B=B.toElement()
}if(Object.isElement(B)){return A.update().insert(B)
}B=Object.toHTML(B);
A.innerHTML=B.stripScripts();
B.evalScripts.bind(B).defer();
return A
},replace:function(B,C){B=$(B);
if(C&&C.toElement){C=C.toElement()
}else{if(!Object.isElement(C)){C=Object.toHTML(C);
var A=B.ownerDocument.createRange();
A.selectNode(B);
C.evalScripts.bind(C).defer();
C=A.createContextualFragment(C.stripScripts())
}}B.parentNode.replaceChild(C,B);
return B
},insert:function(C,E){C=$(C);
if(Object.isString(E)||Object.isNumber(E)||Object.isElement(E)||(E&&(E.toElement||E.toHTML))){E={bottom:E}
}var D,F,B,G;
for(var A in E){D=E[A];
A=A.toLowerCase();
F=Element._insertionTranslations[A];
if(D&&D.toElement){D=D.toElement()
}if(Object.isElement(D)){F(C,D);
continue
}D=Object.toHTML(D);
B=((A=="before"||A=="after")?C.parentNode:C).tagName.toUpperCase();
G=Element._getContentFromAnonymousElement(B,D.stripScripts());
if(A=="top"||A=="after"){G.reverse()
}G.each(F.curry(C));
D.evalScripts.bind(D).defer()
}return C
},wrap:function(B,C,A){B=$(B);
if(Object.isElement(C)){$(C).writeAttribute(A||{})
}else{if(Object.isString(C)){C=new Element(C,A)
}else{C=new Element("div",C)
}}if(B.parentNode){B.parentNode.replaceChild(C,B)
}C.appendChild(B);
return C
},inspect:function(B){B=$(B);
var A="<"+B.tagName.toLowerCase();
$H({id:"id",className:"class"}).each(function(F){var E=F.first(),C=F.last();
var D=(B[E]||"").toString();
if(D){A+=" "+C+"="+D.inspect(true)
}});
return A+">"
},recursivelyCollect:function(A,C){A=$(A);
var B=[];
while(A=A[C]){if(A.nodeType==1){B.push(Element.extend(A))
}}return B
},ancestors:function(A){return $(A).recursivelyCollect("parentNode")
},descendants:function(A){return $(A).select("*")
},firstDescendant:function(A){A=$(A).firstChild;
while(A&&A.nodeType!=1){A=A.nextSibling
}return $(A)
},immediateDescendants:function(A){if(!(A=$(A).firstChild)){return[]
}while(A&&A.nodeType!=1){A=A.nextSibling
}if(A){return[A].concat($(A).nextSiblings())
}return[]
},previousSiblings:function(A){return $(A).recursivelyCollect("previousSibling")
},nextSiblings:function(A){return $(A).recursivelyCollect("nextSibling")
},siblings:function(A){A=$(A);
return A.previousSiblings().reverse().concat(A.nextSiblings())
},match:function(B,A){if(Object.isString(A)){A=new Selector(A)
}return A.match($(B))
},up:function(B,D,A){B=$(B);
if(arguments.length==1){return $(B.parentNode)
}var C=B.ancestors();
return Object.isNumber(D)?C[D]:Selector.findElement(C,D,A)
},down:function(B,C,A){B=$(B);
if(arguments.length==1){return B.firstDescendant()
}return Object.isNumber(C)?B.descendants()[C]:B.select(C)[A||0]
},previous:function(B,D,A){B=$(B);
if(arguments.length==1){return $(Selector.handlers.previousElementSibling(B))
}var C=B.previousSiblings();
return Object.isNumber(D)?C[D]:Selector.findElement(C,D,A)
},next:function(C,D,B){C=$(C);
if(arguments.length==1){return $(Selector.handlers.nextElementSibling(C))
}var A=C.nextSiblings();
return Object.isNumber(D)?A[D]:Selector.findElement(A,D,B)
},select:function(){var A=$A(arguments),B=$(A.shift());
return Selector.findChildElements(B,A)
},adjacent:function(){var A=$A(arguments),B=$(A.shift());
return Selector.findChildElements(B.parentNode,A).without(B)
},identify:function(B){B=$(B);
var C=B.readAttribute("id"),A=arguments.callee;
if(C){return C
}do{C="anonymous_element_"+A.counter++
}while($(C));
B.writeAttribute("id",C);
return C
},readAttribute:function(C,A){C=$(C);
if(Prototype.Browser.IE){var B=Element._attributeTranslations.read;
if(B.values[A]){return B.values[A](C,A)
}if(B.names[A]){A=B.names[A]
}if(A.include(":")){return(!C.attributes||!C.attributes[A])?null:C.attributes[A].value
}}return C.getAttribute(A)
},writeAttribute:function(E,C,F){E=$(E);
var B={},D=Element._attributeTranslations.write;
if(typeof C=="object"){B=C
}else{B[C]=Object.isUndefined(F)?true:F
}for(var A in B){C=D.names[A]||A;
F=B[A];
if(D.values[A]){C=D.values[A](E,F)
}if(F===false||F===null){E.removeAttribute(C)
}else{if(F===true){E.setAttribute(C,C)
}else{if (C == "className") { E.className = F } else { E.setAttribute(C,F) }
}}}return E
},getHeight:function(A){return $(A).getDimensions().height
},getWidth:function(A){return $(A).getDimensions().width
},classNames:function(A){return new Element.ClassNames(A)
},hasClassName:function(A,B){if(!(A=$(A))){return 
}var C=A.className;
return(C.length>0&&(C==B||new RegExp("(^|\\s)"+B+"(\\s|$)").test(C)))
},addClassName:function(A,B){if(!(A=$(A))){return 
}if(!A.hasClassName(B)){A.className+=(A.className?" ":"")+B
}return A
},removeClassName:function(A,B){if(!(A=$(A))){return 
}A.className=A.className.replace(new RegExp("(^|\\s+)"+B+"(\\s+|$)")," ").strip();
return A
},toggleClassName:function(A,B){if(!(A=$(A))){return 
}return A[A.hasClassName(B)?"removeClassName":"addClassName"](B)
},cleanWhitespace:function(B){B=$(B);
var C=B.firstChild;
while(C){var A=C.nextSibling;
if(C.nodeType==3&&!/\S/.test(C.nodeValue)){B.removeChild(C)
}C=A
}return B
},empty:function(A){return $(A).innerHTML.blank()
},descendantOf:function(D,C){D=$(D),C=$(C);
var F=C;
if(D.compareDocumentPosition){return(D.compareDocumentPosition(C)&8)===8
}if(D.sourceIndex&&!Prototype.Browser.Opera){var E=D.sourceIndex,B=C.sourceIndex,A=C.nextSibling;
if(!A){do{C=C.parentNode
}while(!(A=C.nextSibling)&&C.parentNode)
}if(A&&A.sourceIndex){return(E>B&&E<A.sourceIndex)
}}while(D=D.parentNode){if(D==F){return true
}}return false
},scrollTo:function(A){A=$(A);
var B=A.cumulativeOffset();
window.scrollTo(B[0],B[1]);
return A
},getStyle:function(B,C){B=$(B);
C=C=="float"?"cssFloat":C.camelize();
var D=B.style[C];
if(!D){var A=document.defaultView.getComputedStyle(B,null);
D=A?A[C]:null
}if(C=="opacity"){return D?parseFloat(D):1
}return D=="auto"?null:D
},getOpacity:function(A){return $(A).getStyle("opacity")
},setStyle:function(B,C){B=$(B);
var E=B.style,A;
if(Object.isString(C)){B.style.cssText+=";"+C;
return C.include("opacity")?B.setOpacity(C.match(/opacity:\s*(\d?\.?\d*)/)[1]):B
}for(var D in C){if(D=="opacity"){B.setOpacity(C[D])
}else{E[(D=="float"||D=="cssFloat")?(Object.isUndefined(E.styleFloat)?"cssFloat":"styleFloat"):D]=C[D]
}}return B
},setOpacity:function(A,B){A=$(A);
A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;
return A
},getDimensions:function(C){C=$(C);
var G=$(C).getStyle("display");
if(G!="none"&&G!=null){return{width:C.offsetWidth,height:C.offsetHeight}
}var B=C.style;
var F=B.visibility;
var D=B.position;
var A=B.display;
B.visibility="hidden";
B.position="absolute";
B.display="block";
var H=C.clientWidth;
var E=C.clientHeight;
B.display=A;
B.position=D;
B.visibility=F;
return{width:H,height:E}
},makePositioned:function(A){A=$(A);
var B=Element.getStyle(A,"position");
if(B=="static"||!B){A._madePositioned=true;
A.style.position="relative";
if(window.opera){A.style.top=0;
A.style.left=0
}}return A
},undoPositioned:function(A){A=$(A);
if(A._madePositioned){A._madePositioned=undefined;
A.style.position=A.style.top=A.style.left=A.style.bottom=A.style.right=""
}return A
},makeClipping:function(A){A=$(A);
if(A._overflow){return A
}A._overflow=Element.getStyle(A,"overflow")||"auto";
if(A._overflow!=="hidden"){A.style.overflow="hidden"
}return A
},undoClipping:function(A){A=$(A);
if(!A._overflow){return A
}A.style.overflow=A._overflow=="auto"?"":A._overflow;
A._overflow=null;
return A
},cumulativeOffset:function(B){var A=0,C=0;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
B=B.offsetParent
}while(B);
return Element._returnOffset(C,A)
},positionedOffset:function(B){var A=0,D=0;
do{A+=B.offsetTop||0;
D+=B.offsetLeft||0;
B=B.offsetParent;
if(B){if(B.tagName=="BODY"){break
}var C=Element.getStyle(B,"position");
if(C!=="static"){break
}}}while(B);
return Element._returnOffset(D,A)
},absolutize:function(B){B=$(B);
if(B.getStyle("position")=="absolute"){return 
}var D=B.positionedOffset();
var F=D[1];
var E=D[0];
var C=B.clientWidth;
var A=B.clientHeight;
B._originalLeft=E-parseFloat(B.style.left||0);
B._originalTop=F-parseFloat(B.style.top||0);
B._originalWidth=B.style.width;
B._originalHeight=B.style.height;
B.style.position="absolute";
B.style.top=F+"px";
B.style.left=E+"px";
B.style.width=C+"px";
B.style.height=A+"px";
return B
},relativize:function(A){A=$(A);
if(A.getStyle("position")=="relative"){return 
}A.style.position="relative";
var C=parseFloat(A.style.top||0)-(A._originalTop||0);
var B=parseFloat(A.style.left||0)-(A._originalLeft||0);
A.style.top=C+"px";
A.style.left=B+"px";
A.style.height=A._originalHeight;
A.style.width=A._originalWidth;
return A
},cumulativeScrollOffset:function(B){var A=0,C=0;
do{A+=B.scrollTop||0;
C+=B.scrollLeft||0;
B=B.parentNode
}while(B);
return Element._returnOffset(C,A)
},getOffsetParent:function(A){if(A.offsetParent){return $(A.offsetParent)
}if(A==document.body){return $(A)
}while((A=A.parentNode)&&A!=document.body){if(Element.getStyle(A,"position")!="static"){return $(A)
}}return $(document.body)
},viewportOffset:function(D){var A=0,C=0;
var B=D;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
if(B.offsetParent==document.body&&Element.getStyle(B,"position")=="absolute"){break
}}while(B=B.offsetParent);
B=D;
do{if(!Prototype.Browser.Opera||B.tagName=="BODY"){A-=B.scrollTop||0;
C-=B.scrollLeft||0
}}while(B=B.parentNode);
return Element._returnOffset(C,A)
},clonePosition:function(B,D){var A=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});
D=$(D);
var E=D.viewportOffset();
B=$(B);
var F=[0,0];
var C=null;
if(Element.getStyle(B,"position")=="absolute"){C=B.getOffsetParent();
F=C.viewportOffset()
}if(C==document.body){F[0]-=document.body.offsetLeft;
F[1]-=document.body.offsetTop
}if(A.setLeft){B.style.left=(E[0]-F[0]+A.offsetLeft)+"px"
}if(A.setTop){B.style.top=(E[1]-F[1]+A.offsetTop)+"px"
}if(A.setWidth){B.style.width=D.offsetWidth+"px"
}if(A.setHeight){B.style.height=D.offsetHeight+"px"
}return B
}};
Element.Methods.identify.counter=1;
Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});
Element._attributeTranslations={write:{names:{className:"class",htmlFor:"for"},values:{}}};
if(Prototype.Browser.Opera){Element.Methods.getStyle=Element.Methods.getStyle.wrap(function(D,B,C){switch(C){case"left":case"top":case"right":case"bottom":if(D(B,"position")==="static"){return null
}case"height":case"width":if(!Element.visible(B)){return null
}var E=parseInt(D(B,C),10);
if(E!==B["offset"+C.capitalize()]){return E+"px"
}var A;
if(C==="height"){A=["border-top-width","padding-top","padding-bottom","border-bottom-width"]
}else{A=["border-left-width","padding-left","padding-right","border-right-width"]
}return A.inject(E,function(F,G){var H=D(B,G);
return H===null?F:F-parseInt(H,10)
})+"px";
default:return D(B,C)
}});
Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(function(C,A,B){if(B==="title"){return A.title
}return C(A,B)
})
}else{if(Prototype.Browser.IE){Element.Methods.getOffsetParent=Element.Methods.getOffsetParent.wrap(function(C,B){B=$(B);
var A=B.getStyle("position");
if(A!=="static"){return C(B)
}B.setStyle({position:"relative"});
var D=C(B);
B.setStyle({position:A});
return D
});
$w("positionedOffset viewportOffset").each(function(A){Element.Methods[A]=Element.Methods[A].wrap(function(E,C){C=$(C);
var B=C.getStyle("position");
if(B!=="static"){return E(C)
}var D=C.getOffsetParent();
if(D&&D.getStyle("position")==="fixed"){D.setStyle({zoom:1})
}C.setStyle({position:"relative"});
var F=E(C);
C.setStyle({position:B});
return F
})
});
Element.Methods.getStyle=function(A,B){A=$(A);
B=(B=="float"||B=="cssFloat")?"styleFloat":B.camelize();
var C=A.style[B];
if(!C&&A.currentStyle){C=A.currentStyle[B]
}if(B=="opacity"){if(C=(A.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){if(C[1]){return parseFloat(C[1])/100
}}return 1
}if(C=="auto"){if((B=="width"||B=="height")&&(A.getStyle("display")!="none")){return A["offset"+B.capitalize()]+"px"
}return null
}return C
};
Element.Methods.setOpacity=function(B,E){function F(G){return G.replace(/alpha\([^\)]*\)/gi,"")
}B=$(B);
var A=B.currentStyle;
if((A&&!A.hasLayout)||(!A&&B.style.zoom=="normal")){B.style.zoom=1
}var D=B.getStyle("filter"),C=B.style;
if(E==1||E===""){(D=F(D))?C.filter=D:C.removeAttribute("filter");
return B
}else{if(E<0.00001){E=0
}}C.filter=F(D)+"alpha(opacity="+(E*100)+")";
return B
};
Element._attributeTranslations={read:{names:{"class":"className","for":"htmlFor"},values:{_getAttr:function(A,B){return A.getAttribute(B,2)
},_getAttrNode:function(A,C){var B=A.getAttributeNode(C);
return B?B.value:""
},_getEv:function(A,B){B=A.getAttribute(B);
return B?B.toString().slice(23,-2):null
},_flag:function(A,B){return $(A).hasAttribute(B)?B:null
},style:function(A){return A.style.cssText.toLowerCase()
},title:function(A){return A.title
}}}};
Element._attributeTranslations.write={names:Object.extend({cellpadding:"cellPadding",cellspacing:"cellSpacing"},Element._attributeTranslations.read.names),values:{checked:function(A,B){A.checked=!!B
},style:function(A,B){A.style.cssText=B?B:""
}}};
Element._attributeTranslations.has={};
$w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc").each(function(A){Element._attributeTranslations.write.names[A.toLowerCase()]=A;
Element._attributeTranslations.has[A.toLowerCase()]=A
});
(function(A){Object.extend(A,{href:A._getAttr,src:A._getAttr,type:A._getAttr,action:A._getAttrNode,disabled:A._flag,checked:A._flag,readonly:A._flag,multiple:A._flag,onload:A._getEv,onunload:A._getEv,onclick:A._getEv,ondblclick:A._getEv,onmousedown:A._getEv,onmouseup:A._getEv,onmouseover:A._getEv,onmousemove:A._getEv,onmouseout:A._getEv,onfocus:A._getEv,onblur:A._getEv,onkeypress:A._getEv,onkeydown:A._getEv,onkeyup:A._getEv,onsubmit:A._getEv,onreset:A._getEv,onselect:A._getEv,onchange:A._getEv})
})(Element._attributeTranslations.read.values)
}else{if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){Element.Methods.setOpacity=function(A,B){A=$(A);
A.style.opacity=(B==1)?0.999999:(B==="")?"":(B<0.00001)?0:B;
return A
}
}else{if(Prototype.Browser.WebKit){Element.Methods.setOpacity=function(A,B){A=$(A);
A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;
if(B==1){if(A.tagName=="IMG"&&A.width){A.width++;
A.width--
}else{try{var D=document.createTextNode(" ");
A.appendChild(D);
A.removeChild(D)
}catch(C){}}}return A
};
Element.Methods.cumulativeOffset=function(B){var A=0,C=0;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
if(B.offsetParent==document.body){if(Element.getStyle(B,"position")=="absolute"){break
}}B=B.offsetParent
}while(B);
return Element._returnOffset(C,A)
}
}}}}if(Prototype.Browser.IE||Prototype.Browser.Opera){Element.Methods.update=function(B,C){B=$(B);
if(C&&C.toElement){C=C.toElement()
}if(Object.isElement(C)){return B.update().insert(C)
}C=Object.toHTML(C);
var A=B.tagName.toUpperCase();
if(A in Element._insertionTranslations.tags){$A(B.childNodes).each(function(D){B.removeChild(D)
});
Element._getContentFromAnonymousElement(A,C.stripScripts()).each(function(D){B.appendChild(D)
})
}else{B.innerHTML=C.stripScripts()
}C.evalScripts.bind(C).defer();
return B
}
}if("outerHTML" in document.createElement("div")){Element.Methods.replace=function(C,E){C=$(C);
if(E&&E.toElement){E=E.toElement()
}if(Object.isElement(E)){C.parentNode.replaceChild(E,C);
return C
}E=Object.toHTML(E);
var D=C.parentNode,B=D.tagName.toUpperCase();
if(Element._insertionTranslations.tags[B]){var F=C.next();
var A=Element._getContentFromAnonymousElement(B,E.stripScripts());
D.removeChild(C);
if(F){A.each(function(G){D.insertBefore(G,F)
})
}else{A.each(function(G){D.appendChild(G)
})
}}else{C.outerHTML=E.stripScripts()
}E.evalScripts.bind(E).defer();
return C
}
}Element._returnOffset=function(B,C){var A=[B,C];
A.left=B;
A.top=C;
return A
};
Element._getContentFromAnonymousElement=function(C,B){var D=new Element("div"),A=Element._insertionTranslations.tags[C];
if(A){D.innerHTML=A[0]+B+A[1];
A[2].times(function(){D=D.firstChild
})
}else{D.innerHTML=B
}return $A(D.childNodes)
};
Element._insertionTranslations={before:function(A,B){A.parentNode.insertBefore(B,A)
},top:function(A,B){A.insertBefore(B,A.firstChild)
},bottom:function(A,B){A.appendChild(B)
},after:function(A,B){A.parentNode.insertBefore(B,A.nextSibling)
},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}};
(function(){Object.extend(this.tags,{THEAD:this.tags.TBODY,TFOOT:this.tags.TBODY,TH:this.tags.TD})
}).call(Element._insertionTranslations);
Element.Methods.Simulated={hasAttribute:function(A,C){C=Element._attributeTranslations.has[C]||C;
var B=$(A).getAttributeNode(C);
return B&&B.specified
}};
Element.Methods.ByTag={};
Object.extend(Element,Element.Methods);
if(!Prototype.BrowserFeatures.ElementExtensions&&document.createElement("div").__proto__){window.HTMLElement={};
window.HTMLElement.prototype=document.createElement("div").__proto__;
Prototype.BrowserFeatures.ElementExtensions=true
}Element.extend=(function(){if(Prototype.BrowserFeatures.SpecificElementExtensions){return Prototype.K
}var A={},B=Element.Methods.ByTag;
var C=Object.extend(function(F){if(!F||F._extendedByPrototype||F.nodeType!=1||F==window){return F
}var D=Object.clone(A),E=F.tagName,H,G;
if(B[E]){Object.extend(D,B[E])
}for(H in D){G=D[H];
if(Object.isFunction(G)&&!(H in F)){F[H]=G.methodize()
}}F._extendedByPrototype=Prototype.emptyFunction;
return F
},{refresh:function(){if(!Prototype.BrowserFeatures.ElementExtensions){Object.extend(A,Element.Methods);
Object.extend(A,Element.Methods.Simulated)
}}});
C.refresh();
return C
})();
Element.hasAttribute=function(A,B){if(A.hasAttribute){return A.hasAttribute(B)
}return Element.Methods.Simulated.hasAttribute(A,B)
};
Element.addMethods=function(C){var I=Prototype.BrowserFeatures,D=Element.Methods.ByTag;
if(!C){Object.extend(Form,Form.Methods);
Object.extend(Form.Element,Form.Element.Methods);
Object.extend(Element.Methods.ByTag,{FORM:Object.clone(Form.Methods),INPUT:Object.clone(Form.Element.Methods),SELECT:Object.clone(Form.Element.Methods),TEXTAREA:Object.clone(Form.Element.Methods)})
}if(arguments.length==2){var B=C;
C=arguments[1]
}if(!B){Object.extend(Element.Methods,C||{})
}else{if(Object.isArray(B)){B.each(H)
}else{H(B)
}}function H(F){F=F.toUpperCase();
if(!Element.Methods.ByTag[F]){Element.Methods.ByTag[F]={}
}Object.extend(Element.Methods.ByTag[F],C)
}function A(L,K,F){F=F||false;
for(var N in L){var M=L[N];
if(!Object.isFunction(M)){continue
}if(!F||!(N in K)){K[N]=M.methodize()
}}}function E(L){var F;
var K={OPTGROUP:"OptGroup",TEXTAREA:"TextArea",P:"Paragraph",FIELDSET:"FieldSet",UL:"UList",OL:"OList",DL:"DList",DIR:"Directory",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading",Q:"Quote",INS:"Mod",DEL:"Mod",A:"Anchor",IMG:"Image",CAPTION:"TableCaption",COL:"TableCol",COLGROUP:"TableCol",THEAD:"TableSection",TFOOT:"TableSection",TBODY:"TableSection",TR:"TableRow",TH:"TableCell",TD:"TableCell",FRAMESET:"FrameSet",IFRAME:"IFrame"};
if(K[L]){F="HTML"+K[L]+"Element"
}if(window[F]){return window[F]
}F="HTML"+L+"Element";
if(window[F]){return window[F]
}F="HTML"+L.capitalize()+"Element";
if(window[F]){return window[F]
}window[F]={};
window[F].prototype=document.createElement(L).__proto__;
return window[F]
}if(I.ElementExtensions){A(Element.Methods,HTMLElement.prototype);
A(Element.Methods.Simulated,HTMLElement.prototype,true)
}if(I.SpecificElementExtensions){for(var J in Element.Methods.ByTag){var G=E(J);
if(Object.isUndefined(G)){continue
}A(D[J],G.prototype)
}}Object.extend(Element,Element.Methods);
delete Element.ByTag;
if(Element.extend.refresh){Element.extend.refresh()
}Element.cache={}
};
document.viewport={getDimensions:function(){var A={};
var C=Prototype.Browser;
$w("width height").each(function(E){var B=E.capitalize();
A[E]=(C.WebKit&&!document.evaluate)?self["inner"+B]:(C.Opera)?document.body["client"+B]:document.documentElement["client"+B]
});
return A
},getWidth:function(){return this.getDimensions().width
},getHeight:function(){return this.getDimensions().height
},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)
}};
var Selector=Class.create({initialize:function(A){this.expression=A.strip();
this.compileMatcher()
},shouldUseXPath:function(){if(!Prototype.BrowserFeatures.XPath){return false
}var A=this.expression;
if(Prototype.Browser.WebKit&&(A.include("-of-type")||A.include(":empty"))){return false
}if((/(\[[\w-]*?:|:checked)/).test(this.expression)){return false
}return true
},compileMatcher:function(){if(this.shouldUseXPath()){return this.compileXPathMatcher()
}var e=this.expression,ps=Selector.patterns,h=Selector.handlers,c=Selector.criteria,le,p,m;
if(Selector._cache[e]){this.matcher=Selector._cache[e];
return 
}this.matcher=["this.matcher = function(root) {","var r = root, h = Selector.handlers, c = false, n;"];
while(e&&le!=e&&(/\S/).test(e)){le=e;
for(var i in ps){p=ps[i];
if(m=e.match(p)){this.matcher.push(Object.isFunction(c[i])?c[i](m):new Template(c[i]).evaluate(m));
e=e.replace(m[0],"");
break
}}}this.matcher.push("return h.unique(n);\n}");
eval(this.matcher.join("\n"));
Selector._cache[this.expression]=this.matcher
},compileXPathMatcher:function(){var E=this.expression,F=Selector.patterns,B=Selector.xpath,D,A;
if(Selector._cache[E]){this.xpath=Selector._cache[E];
return 
}this.matcher=[".//*"];
while(E&&D!=E&&(/\S/).test(E)){D=E;
for(var C in F){if(A=E.match(F[C])){this.matcher.push(Object.isFunction(B[C])?B[C](A):new Template(B[C]).evaluate(A));
E=E.replace(A[0],"");
break
}}}this.xpath=this.matcher.join("");
Selector._cache[this.expression]=this.xpath
},findElements:function(A){A=A||document;
if(this.xpath){return document._getElementsByXPath(this.xpath,A)
}return this.matcher(A)
},match:function(H){this.tokens=[];
var L=this.expression,A=Selector.patterns,E=Selector.assertions;
var B,D,F;
while(L&&B!==L&&(/\S/).test(L)){B=L;
for(var I in A){D=A[I];
if(F=L.match(D)){if(E[I]){this.tokens.push([I,Object.clone(F)]);
L=L.replace(F[0],"")
}else{return this.findElements(document).include(H)
}}}}var K=true,C,J;
for(var I=0,G;
G=this.tokens[I];
I++){C=G[0],J=G[1];
if(!Selector.assertions[C](H,J)){K=false;
break
}}return K
},toString:function(){return this.expression
},inspect:function(){return"#<Selector:"+this.expression.inspect()+">"
}});
Object.extend(Selector,{_cache:{},xpath:{descendant:"//*",child:"/*",adjacent:"/following-sibling::*[1]",laterSibling:"/following-sibling::*",tagName:function(A){if(A[1]=="*"){return""
}return"[local-name()='"+A[1].toLowerCase()+"' or local-name()='"+A[1].toUpperCase()+"']"
},className:"[contains(concat(' ', @class, ' '), ' #{1} ')]",id:"[@id='#{1}']",attrPresence:function(A){A[1]=A[1].toLowerCase();
return new Template("[@#{1}]").evaluate(A)
},attr:function(A){A[1]=A[1].toLowerCase();
A[3]=A[5]||A[6];
return new Template(Selector.xpath.operators[A[2]]).evaluate(A)
},pseudo:function(A){var B=Selector.xpath.pseudos[A[1]];
if(!B){return""
}if(Object.isFunction(B)){return B(A)
}return new Template(Selector.xpath.pseudos[A[1]]).evaluate(A)
},operators:{"=":"[@#{1}='#{3}']","!=":"[@#{1}!='#{3}']","^=":"[starts-with(@#{1}, '#{3}')]","$=":"[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']","*=":"[contains(@#{1}, '#{3}')]","~=":"[contains(concat(' ', @#{1}, ' '), ' #{3} ')]","|=":"[contains(concat('-', @#{1}, '-'), '-#{3}-')]"},pseudos:{"first-child":"[not(preceding-sibling::*)]","last-child":"[not(following-sibling::*)]","only-child":"[not(preceding-sibling::* or following-sibling::*)]",empty:"[count(*) = 0 and (count(text()) = 0 or translate(text(), ' \t\r\n', '') = '')]",checked:"[@checked]",disabled:"[@disabled]",enabled:"[not(@disabled)]",not:function(B){var H=B[6],G=Selector.patterns,A=Selector.xpath,E,C;
var F=[];
while(H&&E!=H&&(/\S/).test(H)){E=H;
for(var D in G){if(B=H.match(G[D])){C=Object.isFunction(A[D])?A[D](B):new Template(A[D]).evaluate(B);
F.push("("+C.substring(1,C.length-1)+")");
H=H.replace(B[0],"");
break
}}}return"[not("+F.join(" and ")+")]"
},"nth-child":function(A){return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ",A)
},"nth-last-child":function(A){return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ",A)
},"nth-of-type":function(A){return Selector.xpath.pseudos.nth("position() ",A)
},"nth-last-of-type":function(A){return Selector.xpath.pseudos.nth("(last() + 1 - position()) ",A)
},"first-of-type":function(A){A[6]="1";
return Selector.xpath.pseudos["nth-of-type"](A)
},"last-of-type":function(A){A[6]="1";
return Selector.xpath.pseudos["nth-last-of-type"](A)
},"only-of-type":function(A){var B=Selector.xpath.pseudos;
return B["first-of-type"](A)+B["last-of-type"](A)
},nth:function(E,C){var F,G=C[6],B;
if(G=="even"){G="2n+0"
}if(G=="odd"){G="2n+1"
}if(F=G.match(/^(\d+)$/)){return"["+E+"= "+F[1]+"]"
}if(F=G.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(F[1]=="-"){F[1]=-1
}var D=F[1]?Number(F[1]):1;
var A=F[2]?Number(F[2]):0;
B="[((#{fragment} - #{b}) mod #{a} = 0) and ((#{fragment} - #{b}) div #{a} >= 0)]";
return new Template(B).evaluate({fragment:E,a:D,b:A})
}}}},criteria:{tagName:'n = h.tagName(n, r, "#{1}", c);      c = false;',className:'n = h.className(n, r, "#{1}", c);    c = false;',id:'n = h.id(n, r, "#{1}", c);           c = false;',attrPresence:'n = h.attrPresence(n, r, "#{1}", c); c = false;',attr:function(A){A[3]=(A[5]||A[6]);
return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(A)
},pseudo:function(A){if(A[6]){A[6]=A[6].replace(/"/g,'\\"')
}return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(A)
},descendant:'c = "descendant";',child:'c = "child";',adjacent:'c = "adjacent";',laterSibling:'c = "laterSibling";'},patterns:{laterSibling:/^\s*~\s*/,child:/^\s*>\s*/,adjacent:/^\s*\+\s*/,descendant:/^\s/,tagName:/^\s*(\*|[\w\-]+)(\b|$)?/,id:/^#([\w\-\*]+)(\b|$)/,className:/^\.([\w\-\*]+)(\b|$)/,pseudo:/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/,attrPresence:/^\[([\w]+)\]/,attr:/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/},assertions:{tagName:function(A,B){return B[1].toUpperCase()==A.tagName.toUpperCase()
},className:function(A,B){return Element.hasClassName(A,B[1])
},id:function(A,B){return A.id===B[1]
},attrPresence:function(A,B){return Element.hasAttribute(A,B[1])
},attr:function(B,C){var A=Element.readAttribute(B,C[1]);
return A&&Selector.operators[C[2]](A,C[5]||C[6])
}},handlers:{concat:function(B,A){for(var C=0,D;
D=A[C];
C++){B.push(D)
}return B
},mark:function(A){var D=Prototype.emptyFunction;
for(var B=0,C;
C=A[B];
B++){C._countedByPrototype=D
}return A
},unmark:function(A){for(var B=0,C;
C=A[B];
B++){C._countedByPrototype=undefined
}return A
},index:function(A,D,G){A._countedByPrototype=Prototype.emptyFunction;
if(D){for(var B=A.childNodes,E=B.length-1,C=1;
E>=0;
E--){var F=B[E];
if(F.nodeType==1&&(!G||F._countedByPrototype)){F.nodeIndex=C++
}}}else{for(var E=0,C=1,B=A.childNodes;
F=B[E];
E++){if(F.nodeType==1&&(!G||F._countedByPrototype)){F.nodeIndex=C++
}}}},unique:function(B){if(B.length==0){return B
}var D=[],E;
for(var C=0,A=B.length;
C<A;
C++){if(!(E=B[C])._countedByPrototype){E._countedByPrototype=Prototype.emptyFunction;
D.push(Element.extend(E))
}}return Selector.handlers.unmark(D)
},descendant:function(A){var D=Selector.handlers;
for(var C=0,B=[],E;
E=A[C];
C++){D.concat(B,E.getElementsByTagName("*"))
}return B
},child:function(A){var E=Selector.handlers;
for(var D=0,C=[],F;
F=A[D];
D++){for(var B=0,G;
G=F.childNodes[B];
B++){if(G.nodeType==1&&G.tagName!="!"){C.push(G)
}}}return C
},adjacent:function(A){for(var C=0,B=[],E;
E=A[C];
C++){var D=this.nextElementSibling(E);
if(D){B.push(D)
}}return B
},laterSibling:function(A){var D=Selector.handlers;
for(var C=0,B=[],E;
E=A[C];
C++){D.concat(B,Element.nextSiblings(E))
}return B
},nextElementSibling:function(A){while(A=A.nextSibling){if(A.nodeType==1){return A
}}return null
},previousElementSibling:function(A){while(A=A.previousSibling){if(A.nodeType==1){return A
}}return null
},tagName:function(A,H,C,B){var I=C.toUpperCase();
var E=[],G=Selector.handlers;
if(A){if(B){if(B=="descendant"){for(var F=0,D;
D=A[F];
F++){G.concat(E,D.getElementsByTagName(C))
}return E
}else{A=this[B](A)
}if(C=="*"){return A
}}for(var F=0,D;
D=A[F];
F++){if(D.tagName.toUpperCase()===I){E.push(D)
}}return E
}else{return H.getElementsByTagName(C)
}},id:function(B,A,H,F){var G=$(H),D=Selector.handlers;
if(!G){return[]
}if(!B&&A==document){return[G]
}if(B){if(F){if(F=="child"){for(var C=0,E;
E=B[C];
C++){if(G.parentNode==E){return[G]
}}}else{if(F=="descendant"){for(var C=0,E;
E=B[C];
C++){if(Element.descendantOf(G,E)){return[G]
}}}else{if(F=="adjacent"){for(var C=0,E;
E=B[C];
C++){if(Selector.handlers.previousElementSibling(G)==E){return[G]
}}}else{B=D[F](B)
}}}}for(var C=0,E;
E=B[C];
C++){if(E==G){return[G]
}}return[]
}return(G&&Element.descendantOf(G,A))?[G]:[]
},className:function(B,A,C,D){if(B&&D){B=this[D](B)
}return Selector.handlers.byClassName(B,A,C)
},byClassName:function(C,B,F){if(!C){C=Selector.handlers.descendant([B])
}var H=" "+F+" ";
for(var E=0,D=[],G,A;
G=C[E];
E++){A=G.className;
if(A.length==0){continue
}if(A==F||(" "+A+" ").include(H)){D.push(G)
}}return D
},attrPresence:function(C,B,A,G){if(!C){C=B.getElementsByTagName("*")
}if(C&&G){C=this[G](C)
}var E=[];
for(var D=0,F;
F=C[D];
D++){if(Element.hasAttribute(F,A)){E.push(F)
}}return E
},attr:function(A,I,H,J,C,B){if(!A){A=I.getElementsByTagName("*")
}if(A&&B){A=this[B](A)
}var K=Selector.operators[C],F=[];
for(var E=0,D;
D=A[E];
E++){var G=Element.readAttribute(D,H);
if(G===null){continue
}if(K(G,J)){F.push(D)
}}return F
},pseudo:function(B,C,E,A,D){if(B&&D){B=this[D](B)
}if(!B){B=A.getElementsByTagName("*")
}return Selector.pseudos[C](B,E,A)
}},pseudos:{"first-child":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(Selector.handlers.previousElementSibling(E)){continue
}C.push(E)
}return C
},"last-child":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(Selector.handlers.nextElementSibling(E)){continue
}C.push(E)
}return C
},"only-child":function(B,G,A){var E=Selector.handlers;
for(var D=0,C=[],F;
F=B[D];
D++){if(!E.previousElementSibling(F)&&!E.nextElementSibling(F)){C.push(F)
}}return C
},"nth-child":function(B,C,A){return Selector.pseudos.nth(B,C,A)
},"nth-last-child":function(B,C,A){return Selector.pseudos.nth(B,C,A,true)
},"nth-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,false,true)
},"nth-last-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,true,true)
},"first-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,false,true)
},"last-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,true,true)
},"only-of-type":function(B,D,A){var C=Selector.pseudos;
return C["last-of-type"](C["first-of-type"](B,D,A),D,A)
},getIndices:function(B,A,C){if(B==0){return A>0?[A]:[]
}return $R(1,C).inject([],function(D,E){if(0==(E-A)%B&&(E-A)/B>=0){D.push(E)
}return D
})
},nth:function(A,L,N,K,C){if(A.length==0){return[]
}if(L=="even"){L="2n+0"
}if(L=="odd"){L="2n+1"
}var J=Selector.handlers,I=[],B=[],E;
J.mark(A);
for(var H=0,D;
D=A[H];
H++){if(!D.parentNode._countedByPrototype){J.index(D.parentNode,K,C);
B.push(D.parentNode)
}}if(L.match(/^\d+$/)){L=Number(L);
for(var H=0,D;
D=A[H];
H++){if(D.nodeIndex==L){I.push(D)
}}}else{if(E=L.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(E[1]=="-"){E[1]=-1
}var O=E[1]?Number(E[1]):1;
var M=E[2]?Number(E[2]):0;
var P=Selector.pseudos.getIndices(O,M,A.length);
for(var H=0,D,F=P.length;
D=A[H];
H++){for(var G=0;
G<F;
G++){if(D.nodeIndex==P[G]){I.push(D)
}}}}}J.unmark(A);
J.unmark(B);
return I
},empty:function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.tagName=="!"||(E.firstChild&&!E.innerHTML.match(/^\s*$/))){continue
}C.push(E)
}return C
},not:function(A,D,I){var G=Selector.handlers,J,C;
var H=new Selector(D).findElements(I);
G.mark(H);
for(var F=0,E=[],B;
B=A[F];
F++){if(!B._countedByPrototype){E.push(B)
}}G.unmark(H);
return E
},enabled:function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(!E.disabled){C.push(E)
}}return C
},disabled:function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.disabled){C.push(E)
}}return C
},checked:function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.checked){C.push(E)
}}return C
}},operators:{"=":function(B,A){return B==A
},"!=":function(B,A){return B!=A
},"^=":function(B,A){return B.startsWith(A)
},"$=":function(B,A){return B.endsWith(A)
},"*=":function(B,A){return B.include(A)
},"~=":function(B,A){return(" "+B+" ").include(" "+A+" ")
},"|=":function(B,A){return("-"+B.toUpperCase()+"-").include("-"+A.toUpperCase()+"-")
}},split:function(B){var A=[];
B.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/,function(C){A.push(C[1].strip())
});
return A
},matchElements:function(F,G){var E=$$(G),D=Selector.handlers;
D.mark(E);
for(var C=0,B=[],A;
A=F[C];
C++){if(A._countedByPrototype){B.push(A)
}}D.unmark(E);
return B
},findElement:function(B,C,A){if(Object.isNumber(C)){A=C;
C=false
}return Selector.matchElements(B,C||"*")[A||0]
},findChildElements:function(E,G){G=Selector.split(G.join(","));
var D=[],F=Selector.handlers;
for(var C=0,B=G.length,A;
C<B;
C++){A=new Selector(G[C].strip());
F.concat(D,A.findElements(E))
}return(B>1)?F.unique(D):D
}});
if(Prototype.Browser.IE){Object.extend(Selector.handlers,{concat:function(B,A){for(var C=0,D;
D=A[C];
C++){if(D.tagName!=="!"){B.push(D)
}}return B
},unmark:function(A){for(var B=0,C;
C=A[B];
B++){C.removeAttribute("_countedByPrototype")
}return A
}})
}function $$(){return Selector.findChildElements(document,$A(arguments))
}var Form={reset:function(A){$(A).reset();
return A
},serializeElements:function(G,B){if(typeof B!="object"){B={hash:!!B}
}else{if(Object.isUndefined(B.hash)){B.hash=true
}}var C,F,A=false,E=B.submit;
var D=G.inject({},function(H,I){if(!I.disabled&&I.name){C=I.name;
F=$(I).getValue();
if(F!=null&&(I.type!="submit"||(!A&&E!==false&&(!E||C==E)&&(A=true)))){if(C in H){if(!Object.isArray(H[C])){H[C]=[H[C]]
}H[C].push(F)
}else{H[C]=F
}}}return H
});
return B.hash?D:Object.toQueryString(D)
}};
Form.Methods={serialize:function(B,A){return Form.serializeElements(Form.getElements(B),A)
},getElements:function(A){return $A($(A).getElementsByTagName("*")).inject([],function(B,C){if(Form.Element.Serializers[C.tagName.toLowerCase()]){B.push(Element.extend(C))
}return B
})
},getInputs:function(G,C,D){G=$(G);
var A=G.getElementsByTagName("input");
if(!C&&!D){return $A(A).map(Element.extend)
}for(var E=0,H=[],F=A.length;
E<F;
E++){var B=A[E];
if((C&&B.type!=C)||(D&&B.name!=D)){continue
}H.push(Element.extend(B))
}return H
},disable:function(A){A=$(A);
Form.getElements(A).invoke("disable");
return A
},enable:function(A){A=$(A);
Form.getElements(A).invoke("enable");
return A
},findFirstElement:function(B){var C=$(B).getElements().findAll(function(D){return"hidden"!=D.type&&!D.disabled
});
var A=C.findAll(function(D){return D.hasAttribute("tabIndex")&&D.tabIndex>=0
}).sortBy(function(D){return D.tabIndex
}).first();
return A?A:C.find(function(D){return["input","select","textarea"].include(D.tagName.toLowerCase())
})
},focusFirstElement:function(A){A=$(A);
A.findFirstElement().activate();
return A
},request:function(B,A){B=$(B),A=Object.clone(A||{});
var D=A.parameters,C=B.readAttribute("action")||"";
if(C.blank()){C=window.location.href
}A.parameters=B.serialize(true);
if(D){if(Object.isString(D)){D=D.toQueryParams()
}Object.extend(A.parameters,D)
}if(B.hasAttribute("method")&&!A.method){A.method=B.method
}return new Ajax.Request(C,A)
}};
Form.Element={focus:function(A){$(A).focus();
return A
},select:function(A){$(A).select();
return A
}};
Form.Element.Methods={serialize:function(A){A=$(A);
if(!A.disabled&&A.name){var B=A.getValue();
if(B!=undefined){var C={};
C[A.name]=B;
return Object.toQueryString(C)
}}return""
},getValue:function(A){A=$(A);
var B=A.tagName.toLowerCase();
return Form.Element.Serializers[B](A)
},setValue:function(A,B){A=$(A);
var C=A.tagName.toLowerCase();
Form.Element.Serializers[C](A,B);
return A
},clear:function(A){$(A).value="";
return A
},present:function(A){return $(A).value!=""
},activate:function(A){A=$(A);
try{A.focus();
if(A.select&&(A.tagName.toLowerCase()!="input"||!["button","reset","submit"].include(A.type))){A.select()
}}catch(B){}return A
},disable:function(A){A=$(A);
A.blur();
A.disabled=true;
return A
},enable:function(A){A=$(A);
A.disabled=false;
return A
}};
var Field=Form.Element;
var $F=Form.Element.Methods.getValue;
Form.Element.Serializers={input:function(A,B){switch(A.type.toLowerCase()){case"checkbox":case"radio":return Form.Element.Serializers.inputSelector(A,B);
default:return Form.Element.Serializers.textarea(A,B)
}},inputSelector:function(A,B){if(Object.isUndefined(B)){return A.checked?A.value:null
}else{A.checked=!!B
}},textarea:function(A,B){if(Object.isUndefined(B)){return A.value
}else{A.value=B
}},select:function(D,A){if(Object.isUndefined(A)){return this[D.type=="select-one"?"selectOne":"selectMany"](D)
}else{var C,F,G=!Object.isArray(A);
for(var B=0,E=D.length;
B<E;
B++){C=D.options[B];
F=this.optionValue(C);
if(G){if(F==A){C.selected=true;
return 
}}else{C.selected=A.include(F)
}}}},selectOne:function(B){var A=B.selectedIndex;
return A>=0?this.optionValue(B.options[A]):null
},selectMany:function(D){var A,E=D.length;
if(!E){return null
}for(var C=0,A=[];
C<E;
C++){var B=D.options[C];
if(B.selected){A.push(this.optionValue(B))
}}return A
},optionValue:function(A){return Element.extend(A).hasAttribute("value")?A.value:A.text
}};
Abstract.TimedObserver=Class.create(PeriodicalExecuter,{initialize:function($super,A,B,C){$super(C,B);
this.element=$(A);
this.lastValue=this.getValue()
},execute:function(){var A=this.getValue();
if(Object.isString(this.lastValue)&&Object.isString(A)?this.lastValue!=A:String(this.lastValue)!=String(A)){this.callback(this.element,A);
this.lastValue=A
}}});
Form.Element.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element)
}});
Form.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element)
}});
Abstract.EventObserver=Class.create({initialize:function(A,B){this.element=$(A);
this.callback=B;
this.lastValue=this.getValue();
if(this.element.tagName.toLowerCase()=="form"){this.registerFormCallbacks()
}else{this.registerCallback(this.element)
}},onElementEvent:function(){var A=this.getValue();
if(this.lastValue!=A){this.callback(this.element,A);
this.lastValue=A
}},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback,this)
},registerCallback:function(A){if(A.type){switch(A.type.toLowerCase()){case"checkbox":case"radio":Event.observe(A,"click",this.onElementEvent.bind(this));
break;
default:Event.observe(A,"change",this.onElementEvent.bind(this));
break
}}}});
Form.Element.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element)
}});
Form.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element)
}});
if(!window.Event){var Event={}
}Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{},relatedTarget:function(B){var A;
switch(B.type){case"mouseover":A=B.fromElement;
break;
case"mouseout":A=B.toElement;
break;
default:return null
}return Element.extend(A)
}});
Event.Methods=(function(){var A;
if(Prototype.Browser.IE){var B={0:1,1:4,2:2};
A=function(D,C){return D.button==B[C]
}
}else{if(Prototype.Browser.WebKit){A=function(D,C){switch(C){case 0:return D.which==1&&!D.metaKey;
case 1:return D.which==1&&D.metaKey;
default:return false
}}
}else{A=function(D,C){return D.which?(D.which===C+1):(D.button===C)
}
}}return{isLeftClick:function(C){return A(C,0)
},isMiddleClick:function(C){return A(C,1)
},isRightClick:function(C){return A(C,2)
},element:function(D){var C=Event.extend(D).target;
if(!C){C=document.body
}return Element.extend(C.nodeType==Node.TEXT_NODE?C.parentNode:C)
},findElement:function(D,F){var C=Event.element(D);
if(!F){return C
}var E=[C].concat(C.ancestors());
return Selector.findElement(E,F,0)
},pointer:function(D){try{return{x:D.pageX||(D.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)),y:D.pageY||(D.clientY+(document.documentElement.scrollTop||document.body.scrollTop))}
}catch(C){return{x:0,y:0}
}},pointerX:function(C){return Event.pointer(C).x
},pointerY:function(C){return Event.pointer(C).y
},stop:function(C){Event.extend(C);
C.preventDefault();
C.stopPropagation();
C.stopped=true
}}
})();
Event.extend=(function(){var A=Object.keys(Event.Methods).inject({},function(B,C){B[C]=Event.Methods[C].methodize();
return B
});
if(Prototype.Browser.IE){Object.extend(A,{stopPropagation:function(){this.cancelBubble=true
},preventDefault:function(){this.returnValue=false
},inspect:function(){return"[object Event]"
}});
return function(B){if(!B){return false
}if(B._extendedByPrototype){return B
}B._extendedByPrototype=Prototype.emptyFunction;
var C=Event.pointer(B);
Object.extend(B,{target:B.srcElement,relatedTarget:Event.relatedTarget(B),pageX:C.x,pageY:C.y});
return Object.extend(B,A)
}
}else{Event.prototype=Event.prototype||document.createEvent("HTMLEvents").__proto__;
Object.extend(Event.prototype,A);
return Prototype.K
}})();
Object.extend(Event,(function(){var B=Event.cache;
function C(J){if(J._prototypeEventID){return J._prototypeEventID[0]
}arguments.callee.id=arguments.callee.id||1;
return J._prototypeEventID=[++arguments.callee.id]
}function G(J){if(J&&J.include(":")){return"dataavailable"
}if(!Prototype.Browser.IE){J={mouseenter:"mouseover",mouseleave:"mouseout"}[J]||J
}return J
}function A(J){return B[J]=B[J]||{}
}function F(L,J){var K=A(L);
return K[J]=K[J]||[]
}function H(K,J,L){var O=C(K);
var N=F(O,J);
if(N.pluck("handler").include(L)){return false
}var M=function(P){if(!Event||!Event.extend||(P.eventName&&P.eventName!=J)){return false
}Event.extend(P);
L.call(K,P)
};
if(!(Prototype.Browser.IE)&&["mouseenter","mouseleave"].include(J)){M=M.wrap(function(R,Q){var P=Q.relatedTarget,S=Q.currentTarget;
if(P&&P.nodeType==Node.TEXT_NODE){P=P.parentNode
}if(P&&P!=S&&!P.descendantOf(S)){return R(Q)
}})
}M.handler=L;
N.push(M);
return M
}function I(M,J,K){var L=F(M,J);
return L.find(function(N){return N.handler==K
})
}function D(M,J,K){var L=A(M);
if(!L[J]){return false
}L[J]=L[J].without(I(M,J,K))
}function E(){for(var K in B){for(var J in B[K]){B[K][J]=null
}}}if(window.attachEvent){window.attachEvent("onunload",E)
}return{observe:function(L,J,M){L=$(L);
var K=G(J);
var N=H(L,J,M);
if(!N){return L
}if(L.addEventListener){L.addEventListener(K,N,false)
}else{L.attachEvent("on"+K,N)
}return L
},stopObserving:function(L,J,M){L=$(L);
var O=C(L),K=G(J);
if(!M&&J){F(O,J).each(function(P){L.stopObserving(J,P.handler)
});
return L
}else{if(!J){Object.keys(A(O)).each(function(P){L.stopObserving(P)
});
return L
}}var N=I(O,J,M);
if(!N){return L
}if(L.removeEventListener){L.removeEventListener(K,N,false)
}else{L.detachEvent("on"+K,N)
}D(O,J,M);
return L
},fire:function(L,K,J){L=$(L);
if(L==document&&document.createEvent&&!L.dispatchEvent){L=document.documentElement
}var M;
if(document.createEvent){M=document.createEvent("HTMLEvents");
M.initEvent("dataavailable",true,true)
}else{M=document.createEventObject();
M.eventType="ondataavailable"
}M.eventName=K;
M.memo=J||{};
if(document.createEvent){L.dispatchEvent(M)
}else{L.fireEvent(M.eventType,M)
}return Event.extend(M)
}}
})());
Object.extend(Event,Event.Methods);
Element.addMethods({fire:Event.fire,observe:Event.observe,stopObserving:Event.stopObserving});
Object.extend(document,{fire:Element.Methods.fire.methodize(),observe:Element.Methods.observe.methodize(),stopObserving:Element.Methods.stopObserving.methodize(),loaded:false});
(function(){var C;
function A(){if(document.loaded){return 
}if(C){window.clearInterval(C)
}document.fire("dom:loaded");
document.loaded=true
}if(document.addEventListener){if(Prototype.Browser.WebKit){C=window.setInterval(function(){if(/loaded|complete/.test(document.readyState)){A()
}},0);
Event.observe(window,"load",A)
}else{document.addEventListener("DOMContentLoaded",A,false)
}}else{var B=window.document;
(function(){try{B.documentElement.doScroll("left");
A()
}catch(D){setTimeout(arguments.callee,50);
return 
}})()
}})();
Hash.toQueryString=Object.toQueryString;
var Toggle={display:Element.toggle};
Element.Methods.childOf=Element.Methods.descendantOf;
var Insertion={Before:function(A,B){return Element.insert(A,{before:B})
},Top:function(A,B){return Element.insert(A,{top:B})
},Bottom:function(A,B){return Element.insert(A,{bottom:B})
},After:function(A,B){return Element.insert(A,{after:B})
}};
var $continue=new Error('"throw $continue" is deprecated, use "return" instead');
var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
},within:function(B,A,C){if(this.includeScrollOffsets){return this.withinIncludingScrolloffsets(B,A,C)
}this.xcomp=A;
this.ycomp=C;
this.offset=Element.cumulativeOffset(B);
return(C>=this.offset[1]&&C<this.offset[1]+B.offsetHeight&&A>=this.offset[0]&&A<this.offset[0]+B.offsetWidth)
},withinIncludingScrolloffsets:function(B,A,D){var C=Element.cumulativeScrollOffset(B);
this.xcomp=A+C[0]-this.deltaX;
this.ycomp=D+C[1]-this.deltaY;
this.offset=Element.cumulativeOffset(B);
return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+B.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+B.offsetWidth)
},overlap:function(B,A){if(!B){return 0
}if(B=="vertical"){return((this.offset[1]+A.offsetHeight)-this.ycomp)/A.offsetHeight
}if(B=="horizontal"){return((this.offset[0]+A.offsetWidth)-this.xcomp)/A.offsetWidth
}},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(A){Position.prepare();
return Element.absolutize(A)
},relativize:function(A){Position.prepare();
return Element.relativize(A)
},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(B,C,A){A=A||{};
return Element.clonePosition(C,B,A)
}};
if(!document.getElementsByClassName){document.getElementsByClassName=function(B){function A(C){return C.blank()?null:"[contains(concat(' ', @class, ' '), ' "+C+" ')]"
}B.getElementsByClassName=Prototype.BrowserFeatures.XPath?function(C,E){E=E.toString().strip();
var D=/\s/.test(E)?$w(E).map(A).join(""):A(E);
return D?document._getElementsByXPath(".//*"+D,C):[]
}:function(E,F){F=F.toString().strip();
var G=[],H=(/\s/.test(F)?$w(F):null);
if(!H&&!F){return G
}var C=$(E).getElementsByTagName("*");
F=" "+F+" ";
for(var D=0,J,I;
J=C[D];
D++){if(J.className&&(I=" "+J.className+" ")&&(I.include(F)||(H&&H.all(function(K){return !K.toString().blank()&&I.include(" "+K+" ")
})))){G.push(Element.extend(J))
}}return G
};
return function(D,C){return $(C||document.body).getElementsByClassName(D)
}
}(Element.Methods)
}Element.ClassNames=Class.create();
Element.ClassNames.prototype={initialize:function(A){this.element=$(A)
},_each:function(A){this.element.className.split(/\s+/).select(function(B){return B.length>0
})._each(A)
},set:function(A){this.element.className=A
},add:function(A){if(this.include(A)){return 
}this.set($A(this).concat(A).join(" "))
},remove:function(A){if(!this.include(A)){return 
}this.set($A(this).without(A).join(" "))
},toString:function(){return $A(this).join(" ")
}};
Object.extend(Element.ClassNames.prototype,Enumerable);
Element.addMethods();
Protoload={timeUntilShow:250,opacity:0.8,startWaiting:function(A,B,D){if(typeof A=="string"){A=document.getElementById(A)
}if(B==undefined){B="waiting"
}if(D==undefined){D=Protoload.timeUntilShow
}A._waiting=true;
if(!A._loading){var C=document.createElement("div");
(A.offsetParent||document.body).appendChild(A._loading=C);
C.style.position="absolute";
try{C.style.opacity=Protoload.opacity
}catch(C){}try{C.style.MozOpacity=Protoload.opacity
}catch(C){}try{C.style.filter="alpha(opacity="+Math.round(Protoload.opacity*100)+")"
}catch(C){}try{C.style.KhtmlOpacity=Protoload.opacity
}catch(C){}}A._loading.className=B;
window.setTimeout((function(){if(this._waiting){var I=this.offsetLeft,H=this.offsetTop,G=this.offsetWidth,E=this.offsetHeight,F=this._loading;
F.style.left=I+"px";
F.style.top=H+"px";
F.style.width=G+"px";
F.style.height=E+"px";
F.style.display="inline"
}}).bind(A),D)
},stopWaiting:function(A){if(A._waiting){A._waiting=false;
A._loading.parentNode.removeChild(A._loading);
A._loading=null
}}};
if(Prototype){Element.addMethods(Protoload);
Object.extend(Element,Protoload)
}String.prototype.parseColor=function(){var A="#";
if(this.slice(0,4)=="rgb("){var C=this.slice(4,this.length-1).split(",");
var B=0;
do{A+=parseInt(C[B]).toColorPart()
}while(++B<3)
}else{if(this.slice(0,1)=="#"){if(this.length==4){for(var B=1;
B<4;
B++){A+=(this.charAt(B)+this.charAt(B)).toLowerCase()
}}if(this.length==7){A=this.toLowerCase()
}}}return(A.length==7?A:(arguments[0]||this))
};
Element.collectTextNodes=function(A){return $A($(A).childNodes).collect(function(B){return(B.nodeType==3?B.nodeValue:(B.hasChildNodes()?Element.collectTextNodes(B):""))
}).flatten().join("")
};
Element.collectTextNodesIgnoreClass=function(A,B){return $A($(A).childNodes).collect(function(C){return(C.nodeType==3?C.nodeValue:((C.hasChildNodes()&&!Element.hasClassName(C,B))?Element.collectTextNodesIgnoreClass(C,B):""))
}).flatten().join("")
};
Element.setContentZoom=function(A,B){A=$(A);
A.setStyle({fontSize:(B/100)+"em"});
if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}return A
};
Element.getInlineOpacity=function(A){return $(A).style.opacity||""
};
Element.forceRerendering=function(A){try{A=$(A);
var C=document.createTextNode(" ");
A.appendChild(C);
A.removeChild(C)
}catch(B){}};
Array.prototype.call=function(){var A=arguments;
this.each(function(B){B.apply(this,A)
})
};
var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},tagifyText:function(A){if(typeof Builder=="undefined"){throw ("Effect.tagifyText requires including script.aculo.us' builder.js library")
}var B="position:relative";
if(Prototype.Browser.IE){B+=";zoom:1"
}A=$(A);
$A(A.childNodes).each(function(C){if(C.nodeType==3){C.nodeValue.toArray().each(function(D){A.insertBefore(Builder.node("span",{style:B},D==" "?String.fromCharCode(160):D),C)
});
Element.remove(C)
}})
},multiple:function(B,C){var E;
if(((typeof B=="object")||(typeof B=="function"))&&(B.length)){E=B
}else{E=$(B).childNodes
}var A=Object.extend({speed:0.1,delay:0},arguments[2]||{});
var D=A.delay;
$A(E).each(function(G,F){new C(G,Object.extend(A,{delay:F*A.speed+D}))
})
},PAIRS:{slide:["SlideDown","SlideUp"],blind:["BlindDown","BlindUp"],appear:["Appear","Fade"]},toggle:function(B,C){B=$(B);
C=(C||"appear").toLowerCase();
var A=Object.extend({queue:{position:"end",scope:(B.id||"global"),limit:1}},arguments[2]||{});
Effect[B.visible()?Effect.PAIRS[C][1]:Effect.PAIRS[C][0]](B,A)
}};
var Effect2=Effect;
Effect.Transitions={linear:Prototype.K,sinoidal:function(A){return(-Math.cos(A*Math.PI)/2)+0.5
},reverse:function(A){return 1-A
},flicker:function(A){var A=((-Math.cos(A*Math.PI)/4)+0.75)+Math.random()/4;
return(A>1?1:A)
},wobble:function(A){return(-Math.cos(A*Math.PI*(9*A))/2)+0.5
},pulse:function(B,A){A=A||5;
return(Math.round((B%(1/A))*A)==0?((B*A*2)-Math.floor(B*A*2)):1-((B*A*2)-Math.floor(B*A*2)))
},none:function(A){return 0
},full:function(A){return 1
}};
Effect.ScopedQueue=Class.create();
Object.extend(Object.extend(Effect.ScopedQueue.prototype,Enumerable),{initialize:function(){this.effects=[];
this.interval=null
},_each:function(A){this.effects._each(A)
},add:function(B){var C=new Date().getTime();
var A=(typeof B.options.queue=="string")?B.options.queue:B.options.queue.position;
switch(A){case"front":this.effects.findAll(function(D){return D.state=="idle"
}).each(function(D){D.startOn+=B.finishOn;
D.finishOn+=B.finishOn
});
break;
case"with-last":C=this.effects.pluck("startOn").max()||C;
break;
case"end":C=this.effects.pluck("finishOn").max()||C;
break
}B.startOn+=C;
B.finishOn+=C;
if(!B.options.queue.limit||(this.effects.length<B.options.queue.limit)){this.effects.push(B)
}if(!this.interval){this.interval=setInterval(this.loop.bind(this),15)
}},remove:function(A){this.effects=this.effects.reject(function(B){return B==A
});
if(this.effects.length==0){clearInterval(this.interval);
this.interval=null
}},loop:function(){var C=new Date().getTime();
for(var B=0,A=this.effects.length;
B<A;
B++){this.effects[B]&&this.effects[B].loop(C)
}}});
Effect.Queues={instances:$H(),get:function(A){if(typeof A!="string"){return A
}if(!this.instances[A]){this.instances[A]=new Effect.ScopedQueue()
}return this.instances[A]
}};
Effect.Queue=Effect.Queues.get("global");
Effect.DefaultOptions={transition:Effect.Transitions.sinoidal,duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"};
Effect.Base=function(){};
Effect.Base.prototype={position:null,start:function(options){function codeForEvent(options,eventName){return((options[eventName+"Internal"]?"this.options."+eventName+"Internal(this);":"")+(options[eventName]?"this.options."+eventName+"(this);":""))
}if(options.transition===false){options.transition=Effect.Transitions.linear
}this.options=Object.extend(Object.extend({},Effect.DefaultOptions),options||{});
this.currentFrame=0;
this.state="idle";
this.startOn=this.options.delay*1000;
this.finishOn=this.startOn+(this.options.duration*1000);
this.fromToDelta=this.options.to-this.options.from;
this.totalTime=this.finishOn-this.startOn;
this.totalFrames=this.options.fps*this.options.duration;
eval('this.render = function(pos){ if(this.state=="idle"){this.state="running";'+codeForEvent(options,"beforeSetup")+(this.setup?"this.setup();":"")+codeForEvent(options,"afterSetup")+'};if(this.state=="running"){pos=this.options.transition(pos)*'+this.fromToDelta+"+"+this.options.from+";this.position=pos;"+codeForEvent(options,"beforeUpdate")+(this.update?"this.update(pos);":"")+codeForEvent(options,"afterUpdate")+"}}");
this.event("beforeStart");
if(!this.options.sync){Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).add(this)
}},loop:function(C){if(C>=this.startOn){if(C>=this.finishOn){this.render(1);
this.cancel();
this.event("beforeFinish");
if(this.finish){this.finish()
}this.event("afterFinish");
return 
}var B=(C-this.startOn)/this.totalTime,A=Math.round(B*this.totalFrames);
if(A>this.currentFrame){this.render(B);
this.currentFrame=A
}}},cancel:function(){if(!this.options.sync){Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).remove(this)
}this.state="finished"
},event:function(A){if(this.options[A+"Internal"]){this.options[A+"Internal"](this)
}if(this.options[A]){this.options[A](this)
}},inspect:function(){var A=$H();
for(property in this){if(typeof this[property]!="function"){A[property]=this[property]
}}return"#<Effect:"+A.inspect()+",options:"+$H(this.options).inspect()+">"
}};
Effect.Parallel=Class.create();
Object.extend(Object.extend(Effect.Parallel.prototype,Effect.Base.prototype),{initialize:function(A){this.effects=A||[];
this.start(arguments[1])
},update:function(A){this.effects.invoke("render",A)
},finish:function(A){this.effects.each(function(B){B.render(1);
B.cancel();
B.event("beforeFinish");
if(B.finish){B.finish(A)
}B.event("afterFinish")
})
}});
Effect.Event=Class.create();
Object.extend(Object.extend(Effect.Event.prototype,Effect.Base.prototype),{initialize:function(){var A=Object.extend({duration:0},arguments[0]||{});
this.start(A)
},update:Prototype.emptyFunction});
Effect.Opacity=Class.create();
Object.extend(Object.extend(Effect.Opacity.prototype,Effect.Base.prototype),{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})
}var A=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});
this.start(A)
},update:function(A){this.element.setOpacity(A)
}});
Effect.Move=Class.create();
Object.extend(Object.extend(Effect.Move.prototype,Effect.Base.prototype),{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});
this.start(A)
},setup:function(){this.element.makePositioned();
this.originalLeft=parseFloat(this.element.getStyle("left")||"0");
this.originalTop=parseFloat(this.element.getStyle("top")||"0");
if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;
this.options.y=this.options.y-this.originalTop
}},update:function(A){this.element.setStyle({left:Math.round(this.options.x*A+this.originalLeft)+"px",top:Math.round(this.options.y*A+this.originalTop)+"px"})
}});
Effect.MoveBy=function(B,A,C){return new Effect.Move(B,Object.extend({x:C,y:A},arguments[3]||{}))
};
Effect.Scale=Class.create();
Object.extend(Object.extend(Effect.Scale.prototype,Effect.Base.prototype),{initialize:function(B,C){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:C},arguments[2]||{});
this.start(A)
},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;
this.elementPositioning=this.element.getStyle("position");
this.originalStyle={};
["top","left","width","height","fontSize"].each(function(B){this.originalStyle[B]=this.element.style[B]
}.bind(this));
this.originalTop=this.element.offsetTop;
this.originalLeft=this.element.offsetLeft;
var A=this.element.getStyle("font-size")||"100%";
["em","px","%","pt"].each(function(B){if(A.indexOf(B)>0){this.fontSize=parseFloat(A);
this.fontSizeType=B
}}.bind(this));
this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;
this.dims=null;
if(this.options.scaleMode=="box"){this.dims=[this.element.offsetHeight,this.element.offsetWidth]
}if(/^content/.test(this.options.scaleMode)){this.dims=[this.element.scrollHeight,this.element.scrollWidth]
}if(!this.dims){this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]
}},update:function(A){var B=(this.options.scaleFrom/100)+(this.factor*A);
if(this.options.scaleContent&&this.fontSize){this.element.setStyle({fontSize:this.fontSize*B+this.fontSizeType})
}this.setDimensions(this.dims[0]*B,this.dims[1]*B)
},finish:function(A){if(this.restoreAfterFinish){this.element.setStyle(this.originalStyle)
}},setDimensions:function(A,D){var E={};
if(this.options.scaleX){E.width=Math.round(D)+"px"
}if(this.options.scaleY){E.height=Math.round(A)+"px"
}if(this.options.scaleFromCenter){var C=(A-this.dims[0])/2;
var B=(D-this.dims[1])/2;
if(this.elementPositioning=="absolute"){if(this.options.scaleY){E.top=this.originalTop-C+"px"
}if(this.options.scaleX){E.left=this.originalLeft-B+"px"
}}else{if(this.options.scaleY){E.top=-C+"px"
}if(this.options.scaleX){E.left=-B+"px"
}}}this.element.setStyle(E)
}});
Effect.Highlight=Class.create();
Object.extend(Object.extend(Effect.Highlight.prototype,Effect.Base.prototype),{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({startcolor:"#ffff99"},arguments[1]||{});
this.start(A)
},setup:function(){if(this.element.getStyle("display")=="none"){this.cancel();
return 
}this.oldStyle={};
if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=this.element.getStyle("background-image");
this.element.setStyle({backgroundImage:"none"})
}if(!this.options.endcolor){this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff")
}if(!this.options.restorecolor){this.options.restorecolor=this.element.getStyle("background-color")
}this._base=$R(0,2).map(function(A){return parseInt(this.options.startcolor.slice(A*2+1,A*2+3),16)
}.bind(this));
this._delta=$R(0,2).map(function(A){return parseInt(this.options.endcolor.slice(A*2+1,A*2+3),16)-this._base[A]
}.bind(this))
},update:function(A){this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(B,C,D){return B+(Math.round(this._base[D]+(this._delta[D]*A)).toColorPart())
}.bind(this))})
},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))
}});
Effect.ScrollTo=Class.create();
Object.extend(Object.extend(Effect.ScrollTo.prototype,Effect.Base.prototype),{initialize:function(A){this.element=$(A);
this.start(arguments[1]||{})
},setup:function(){Position.prepare();
var B=Position.cumulativeOffset(this.element);
if(this.options.offset){B[1]+=this.options.offset
}var A=window.innerHeight?window.height-window.innerHeight:document.body.scrollHeight-(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight);
this.scrollStart=Position.deltaY;
this.delta=(B[1]>A?A:B[1])-this.scrollStart
},update:function(A){Position.prepare();
window.scrollTo(Position.deltaX,this.scrollStart+(A*this.delta))
}});
Effect.Fade=function(C){C=$(C);
var A=C.getInlineOpacity();
var B=Object.extend({from:C.getOpacity()||1,to:0,afterFinishInternal:function(D){if(D.options.to!=0){return 
}D.element.hide().setStyle({opacity:A})
}},arguments[1]||{});
return new Effect.Opacity(C,B)
};
Effect.Appear=function(B){B=$(B);
var A=Object.extend({from:(B.getStyle("display")=="none"?0:B.getOpacity()||0),to:1,afterFinishInternal:function(C){C.element.forceRerendering()
},beforeSetup:function(C){C.element.setOpacity(C.options.from).show()
}},arguments[1]||{});
return new Effect.Opacity(B,A)
};
Effect.Puff=function(B){B=$(B);
var A={opacity:B.getInlineOpacity(),position:B.getStyle("position"),top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};
return new Effect.Parallel([new Effect.Scale(B,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(C){Position.absolutize(C.effects[0].element)
},afterFinishInternal:function(C){C.effects[0].element.hide().setStyle(A)
}},arguments[1]||{}))
};
Effect.BlindUp=function(A){A=$(A);
A.makeClipping();
return new Effect.Scale(A,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(B){B.element.hide().undoClipping()
}},arguments[1]||{}))
};
Effect.BlindDown=function(B){B=$(B);
var A=B.getDimensions();
return new Effect.Scale(B,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:A.height,originalWidth:A.width},restoreAfterFinish:true,afterSetup:function(C){C.element.makeClipping().setStyle({height:"0px"}).show()
},afterFinishInternal:function(C){C.element.undoClipping()
}},arguments[1]||{}))
};
Effect.SwitchOff=function(B){B=$(B);
var A=B.getInlineOpacity();
return new Effect.Appear(B,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(C){new Effect.Scale(C.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(D){D.element.makePositioned().makeClipping()
},afterFinishInternal:function(D){D.element.hide().undoClipping().undoPositioned().setStyle({opacity:A})
}})
}},arguments[1]||{}))
};
Effect.DropOut=function(B){B=$(B);
var A={top:B.getStyle("top"),left:B.getStyle("left"),opacity:B.getInlineOpacity()};
return new Effect.Parallel([new Effect.Move(B,{x:0,y:100,sync:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(C){C.effects[0].element.makePositioned()
},afterFinishInternal:function(C){C.effects[0].element.hide().undoPositioned().setStyle(A)
}},arguments[1]||{}))
};
Effect.Shake=function(B){B=$(B);
var A={top:B.getStyle("top"),left:B.getStyle("left")};
return new Effect.Move(B,{x:20,y:0,duration:0.05,afterFinishInternal:function(C){new Effect.Move(C.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(D){new Effect.Move(D.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(E){new Effect.Move(E.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(F){new Effect.Move(F.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(G){new Effect.Move(G.element,{x:-20,y:0,duration:0.05,afterFinishInternal:function(H){H.element.undoPositioned().setStyle(A)
}})
}})
}})
}})
}})
}})
};
Effect.SlideDown=function(C){C=$(C).cleanWhitespace();
var A=C.down().getStyle("bottom");
var B=C.getDimensions();
return new Effect.Scale(C,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:B.height,originalWidth:B.width},restoreAfterFinish:true,afterSetup:function(D){D.element.makePositioned();
D.element.down().makePositioned();
if(window.opera){D.element.setStyle({top:""})
}D.element.makeClipping().setStyle({height:"0px"}).show()
},afterUpdateInternal:function(D){D.element.down().setStyle({bottom:(D.dims[0]-D.element.clientHeight)+"px"})
},afterFinishInternal:function(D){D.element.undoClipping().undoPositioned();
D.element.down().undoPositioned().setStyle({bottom:A})
}},arguments[1]||{}))
};
Effect.SlideUp=function(B){B=$(B).cleanWhitespace();
var A=B.down().getStyle("bottom");
return new Effect.Scale(B,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,restoreAfterFinish:true,beforeStartInternal:function(C){C.element.makePositioned();
C.element.down().makePositioned();
if(window.opera){C.element.setStyle({top:""})
}C.element.makeClipping().show()
},afterUpdateInternal:function(C){C.element.down().setStyle({bottom:(C.dims[0]-C.element.clientHeight)+"px"})
},afterFinishInternal:function(C){C.element.hide().undoClipping().undoPositioned().setStyle({bottom:A});
C.element.down().undoPositioned()
}},arguments[1]||{}))
};
Effect.Squish=function(A){return new Effect.Scale(A,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(B){B.element.makeClipping()
},afterFinishInternal:function(B){B.element.hide().undoClipping()
}})
};
Effect.Grow=function(C){C=$(C);
var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});
var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};
var G=C.getDimensions();
var H,F;
var E,D;
switch(B.direction){case"top-left":H=F=E=D=0;
break;
case"top-right":H=G.width;
F=D=0;
E=-G.width;
break;
case"bottom-left":H=E=0;
F=G.height;
D=-G.height;
break;
case"bottom-right":H=G.width;
F=G.height;
E=-G.width;
D=-G.height;
break;
case"center":H=G.width/2;
F=G.height/2;
E=-G.width/2;
D=-G.height/2;
break
}return new Effect.Move(C,{x:H,y:F,duration:0.01,beforeSetup:function(I){I.element.hide().makeClipping().makePositioned()
},afterFinishInternal:function(I){new Effect.Parallel([new Effect.Opacity(I.element,{sync:true,to:1,from:0,transition:B.opacityTransition}),new Effect.Move(I.element,{x:E,y:D,sync:true,transition:B.moveTransition}),new Effect.Scale(I.element,100,{scaleMode:{originalHeight:G.height,originalWidth:G.width},sync:true,scaleFrom:window.opera?1:0,transition:B.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(J){J.effects[0].element.setStyle({height:"0px"}).show()
},afterFinishInternal:function(J){J.effects[0].element.undoClipping().undoPositioned().setStyle(A)
}},B))
}})
};
Effect.Shrink=function(C){C=$(C);
var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});
var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};
var F=C.getDimensions();
var E,D;
switch(B.direction){case"top-left":E=D=0;
break;
case"top-right":E=F.width;
D=0;
break;
case"bottom-left":E=0;
D=F.height;
break;
case"bottom-right":E=F.width;
D=F.height;
break;
case"center":E=F.width/2;
D=F.height/2;
break
}return new Effect.Parallel([new Effect.Opacity(C,{sync:true,to:0,from:1,transition:B.opacityTransition}),new Effect.Scale(C,window.opera?1:0,{sync:true,transition:B.scaleTransition,restoreAfterFinish:true}),new Effect.Move(C,{x:E,y:D,sync:true,transition:B.moveTransition})],Object.extend({beforeStartInternal:function(G){G.effects[0].element.makePositioned().makeClipping()
},afterFinishInternal:function(G){G.effects[0].element.hide().undoClipping().undoPositioned().setStyle(A)
}},B))
};
Effect.Pulsate=function(C){C=$(C);
var B=arguments[1]||{};
var A=C.getInlineOpacity();
var E=B.transition||Effect.Transitions.sinoidal;
var D=function(F){return E(1-Effect.Transitions.pulse(F,B.pulses))
};
D.bind(E);
return new Effect.Opacity(C,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(F){F.element.setStyle({opacity:A})
}},B),{transition:D}))
};
Effect.Fold=function(B){B=$(B);
var A={top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};
B.makeClipping();
return new Effect.Scale(B,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(C){new Effect.Scale(B,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(D){D.element.hide().undoClipping().setStyle(A)
}})
}},arguments[1]||{}))
};
Effect.Morph=Class.create();
Object.extend(Object.extend(Effect.Morph.prototype,Effect.Base.prototype),{initialize:function(C){this.element=$(C);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var B=Object.extend({style:{}},arguments[1]||{});
if(typeof B.style=="string"){if(B.style.indexOf(":")==-1){var D="",A="."+B.style;
$A(document.styleSheets).reverse().each(function(E){if(E.cssRules){cssRules=E.cssRules
}else{if(E.rules){cssRules=E.rules
}}$A(cssRules).reverse().each(function(F){if(A==F.selectorText){D=F.style.cssText;
throw $break
}});
if(D){throw $break
}});
this.style=D.parseStyle();
B.afterFinishInternal=function(E){E.element.addClassName(E.options.style);
E.transforms.each(function(F){if(F.style!="opacity"){E.element.style[F.style]=""
}})
}
}else{this.style=B.style.parseStyle()
}}else{this.style=$H(B.style)
}this.start(B)
},setup:function(){function A(B){if(!B||["rgba(0, 0, 0, 0)","transparent"].include(B)){B="#ffffff"
}B=B.parseColor();
return $R(0,2).map(function(C){return parseInt(B.slice(C*2+1,C*2+3),16)
})
}this.transforms=this.style.map(function(G){var F=G[0],E=G[1],D=null;
if(E.parseColor("#zzzzzz")!="#zzzzzz"){E=E.parseColor();
D="color"
}else{if(F=="opacity"){E=parseFloat(E);
if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})
}}else{if(Element.CSS_LENGTH.test(E)){var C=E.match(/^([\+\-]?[0-9\.]+)(.*)$/);
E=parseFloat(C[1]);
D=(C.length==3)?C[2]:null
}}}var B=this.element.getStyle(F);
return{style:F.camelize(),originalValue:D=="color"?A(B):parseFloat(B||0),targetValue:D=="color"?A(E):E,unit:D}
}.bind(this)).reject(function(B){return((B.originalValue==B.targetValue)||(B.unit!="color"&&(isNaN(B.originalValue)||isNaN(B.targetValue))))
})
},update:function(A){var D={},B,C=this.transforms.length;
while(C--){D[(B=this.transforms[C]).style]=B.unit=="color"?"#"+(Math.round(B.originalValue[0]+(B.targetValue[0]-B.originalValue[0])*A)).toColorPart()+(Math.round(B.originalValue[1]+(B.targetValue[1]-B.originalValue[1])*A)).toColorPart()+(Math.round(B.originalValue[2]+(B.targetValue[2]-B.originalValue[2])*A)).toColorPart():B.originalValue+Math.round(((B.targetValue-B.originalValue)*A)*1000)/1000+B.unit
}this.element.setStyle(D,true)
}});
Effect.Transform=Class.create();
Object.extend(Effect.Transform.prototype,{initialize:function(A){this.tracks=[];
this.options=arguments[1]||{};
this.addTracks(A)
},addTracks:function(A){A.each(function(B){var C=$H(B).values().first();
this.tracks.push($H({ids:$H(B).keys().first(),effect:Effect.Morph,options:{style:C}}))
}.bind(this));
return this
},play:function(){return new Effect.Parallel(this.tracks.map(function(A){var B=[$(A.ids)||$$(A.ids)].flatten();
return B.map(function(C){return new A.effect(C,Object.extend({sync:true},A.options))
})
}).flatten(),this.options)
}});
Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex");
Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;
String.prototype.parseStyle=function(){var B=document.createElement("div");
B.innerHTML='<div style="'+this+'"></div>';
var C=B.childNodes[0].style,A=$H();
Element.CSS_PROPERTIES.each(function(D){if(C[D]){A[D]=C[D]
}});
if(Prototype.Browser.IE&&this.indexOf("opacity")>-1){A.opacity=this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]
}return A
};
Element.morph=function(A,B){new Effect.Morph(A,Object.extend({style:B},arguments[2]||{}));
return A
};
["getInlineOpacity","forceRerendering","setContentZoom","collectTextNodes","collectTextNodesIgnoreClass","morph"].each(function(A){Element.Methods[A]=Element[A]
});
Element.Methods.visualEffect=function(B,C,A){s=C.dasherize().camelize();
effect_class=s.charAt(0).toUpperCase()+s.substring(1);
new Effect[effect_class](B,A);
return $(B)
};
Element.addMethods();
(function(){if(!window.console||!console.firebug){var B=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];
window.console={};
for(var A=0;
A<B.length;
++A){window.console[B[A]]=function(){}
}}})();
if(!window.Presto){var Presto={}
}Presto.Util={};
Presto.namespace=function(){var a=arguments,o=null,d,rt;
for(var i=0;
i<a.length;
++i){d=a[i].split(".");
rt=d[0];
eval("if (typeof "+rt+' == "undefined"){'+rt+" = {};} o = "+rt+";");
for(var j=1;
j<d.length;
++j){o[d[j]]=o[d[j]]||{};
o=o[d[j]]
}}};
String.prototype.ellipse=function(A){if(this.length>A){return this.substr(0,A-3)+"..."
}return this
};
Presto.Util.Observable=Class.create({initialize:function(A){this.events=A||{}
},addEvents:function(A){this.events=this.events||{};
Object.extend(this.events,A)
},addListener:function(A,D,C){var B=this.events[A];
if(!B){this.events[A]=[];
B=this.events[A]
}else{if(typeof B=="boolean"){B=[]
}}B.push({fn:D,scope:C});
this.events[A]=B
},removeListener:function(A,B){},fireEvent:function(A){var D=this.events[A];
if(D&&D.length&&D.length>0){var B=Array.prototype.slice.call(arguments,1);
for(var C=0;
C<D.length;
C++){D[C].fn.apply(D[C].scope,B)
}}}});
Presto.COOKIE_AUTHTOKEN="presto-auth-token";
Presto.Util.CookieProvider=function(A){A=A||{};
this.path=A.path||"/";
if(A.expiry){this.expires=new Date(new Date().getTime()+A.expiry)
}else{this.expires=null
}this.domain=A.domain||null;
this.secure=A.secure||false;
Object.extend(this,A);
this.state=this.readCookies()
};
Presto.Util.CookieProvider.prototype={decodeValue:function(A){var J=/^(a|n|d|b|s|o)\:(.*)$/;
var C=J.exec(unescape(A));
if(!C||!C[1]){return 
}var F=C[1];
var H=C[2];
var G;
var I;
switch(F){case"n":return parseFloat(H);
case"d":return new Date(Date.parse(H));
case"b":return(H=="1");
case"a":G=[];
I=H.split("^");
for(var B=0,D=I.length;
B<D;
B++){G.push(this.decodeValue(I[B]))
}return G;
case"o":G={};
I=H.split("^");
for(var B=0,D=I.length;
B<D;
B++){var E=I[B].split("=");
G[E[0]]=this.decodeValue(E[1])
}return G;
default:return H
}},encodeValue:function(C){var B;
if(typeof C=="number"){B="n:"+C
}else{if(typeof C=="boolean"){B="b:"+(C?"1":"0")
}else{if(C instanceof Date){B="d:"+C.toGMTString()
}else{if(C instanceof Array){var F="";
for(var E=0,A=C.length;
E<A;
E++){F+=this.encodeValue(C[E]);
if(E!=A-1){F+="^"
}}B="a:"+F
}else{if(typeof C=="object"){var F="";
for(var D in C){if(typeof C[D]!="function"&&C[D]!==undefined){F+=D+"="+this.encodeValue(C[D])+"^"
}}B="o:"+F.substring(0,F.length-1)
}else{B="s:"+C
}}}}}return escape(B)
},get:function(B,A){return typeof this.state[B]=="undefined"?A:this.state[B]
},set:function(A,B){if(typeof B=="undefined"||B===null){this.clear(A);
return 
}this.setCookie(A,B);
this.state[A]=B
},clear:function(A){this.clearCookie(A);
delete this.state[A]
},readCookies:function(){var C={};
var F=document.cookie+";";
var B=/\s?(.*?)=(.*?);/g;
var E;
while((E=B.exec(F))!=null){var A=E[1];
var D=E[2];
if(A&&A.substring(0,3)=="ys-"){C[A.substr(3)]=this.decodeValue(D)
}}return C
},setCookie:function(A,B){document.cookie="ys-"+A+"="+this.encodeValue(B)+((this.expires==null)?"":("; expires="+this.expires.toGMTString()))+((this.path==null)?"":("; path="+this.path))+((this.domain==null)?"":("; domain="+this.domain))+((this.secure==true)?"; secure":"")
},clearCookie:function(A){document.cookie="ys-"+A+"=null; expires=Thu, 01-Jan-70 00:00:01 GMT"+((this.path==null)?"":("; path="+this.path))+((this.domain==null)?"":("; domain="+this.domain))+((this.secure==true)?"; secure":"")
}};
Presto.Util=Object.extend(Presto.Util,{colorCoder:function(C,B){if(!C){return C
}C=C.replace(/\<([^!])/g,"&LT;$1");
C=C.replace(/([^-])\>/g,"$1&GT;");
C=C.replace(/([a-zA-Z0-9:]+)\=\"([^"]*)"/g,'<span style="color:red">$1</span><span style="color:blue">="$2"</span>');
C=C.replace(/\&LT\;([a-zA-Z0-9:]+)/g,'&LT;<span style="color:brown">$1</span>');
C=C.replace(/\&LT\;\/([a-zA-Z0-9:]+)/g,'&LT;/<span style="color:brown">$1</span>');
C=C.replace(/\<\!--/g,'<span style="color:green">&lt;!--');
C=C.replace(/--\>/g,"--&gt;</span>");
C=C.replace(/\&LT\;/g,'<span style="color:blue">&lt;</span>');
C=C.replace(/\/\&GT\;/g,'<span style="color:blue">/&gt;</span>');
C=C.replace(/\&GT\;/g,'<span style="color:blue">&gt;</span>');
C=C.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
if(B){var A=C.split("\n");
return A
}C=C.replace(/\n/g,"<br/>");
return C
},parseXml:function(B){var A=null;
if(window.ActiveXObject){A=new ActiveXObject("Microsoft.XMLDOM");
A.async="false";
A.loadXML(B)
}else{if(document.implementation&&document.implementation.createDocument){var C=new DOMParser();
A=C.parseFromString(B,"text/xml")
}}return A
},stripNamespaceFromXMLPath:function(C){var A=function(F){if(F){var E=F.indexOf(":");
if(E>-1){return F.substring(E+1)
}}return F
};
var D=C.split("/");
var B=[];
D.each(function(E){B.push(A(E))
});
return B.join("/")
},xml2json:function(A,C){if(!C){C=""
}var D={toObj:function(F){var J={};
if(F.nodeType==1){if(F.attributes.length){for(var I=0;
I<F.attributes.length;
I++){J["@"+F.attributes[I].nodeName]=(F.attributes[I].nodeValue||"").toString()
}}if(F.firstChild){var E=0,H=0,G=false;
for(var K=F.firstChild;
K;
K=K.nextSibling){if(K.nodeType==1){G=true
}else{if(K.nodeType==3&&K.nodeValue.match(/[^ \f\n\r\t\v]/)){E++
}else{if(K.nodeType==4){H++
}}}}if(G){if(E<2&&H<2){D.removeWhite(F);
for(var K=F.firstChild;
K;
K=K.nextSibling){if(K.nodeType==3){J["#text"]=D.escape(K.nodeValue)
}else{if(K.nodeType==4){J["#cdata"]=D.escape(K.nodeValue)
}else{if(J[K.nodeName]){if(J[K.nodeName] instanceof Array){J[K.nodeName][J[K.nodeName].length]=D.toObj(K)
}else{J[K.nodeName]=[J[K.nodeName],D.toObj(K)]
}}else{J[K.nodeName]=D.toObj(K)
}}}}}else{if(!F.attributes.length){J=D.escape(D.innerXml(F))
}else{J["#text"]=D.escape(D.innerXml(F))
}}}else{if(E){if(!F.attributes.length){J=D.escape(D.innerXml(F))
}else{J["#text"]=D.escape(D.innerXml(F))
}}else{if(H){if(H>1){J=D.escape(D.innerXml(F))
}else{for(var K=F.firstChild;
K;
K=K.nextSibling){J["#cdata"]=D.escape(K.nodeValue)
}}}}}}if(!F.attributes.length&&!F.firstChild){J=null
}}else{if(F.nodeType==9){J=D.toObj(F.documentElement)
}else{console.log("unhandled node type: "+F.nodeType,F)
}}return J
},toJson:function(K,G,J){var I=G?('"'+G+'"'):"";
if(K instanceof Array){for(var H=0,L=K.length;
H<L;
H++){K[H]=D.toJson(K[H],"",J+"\t")
}I+=(G?":[":"[")+(K.length>1?("\n"+J+"\t"+K.join(",\n"+J+"\t")+"\n"+J):K.join(""))+"]"
}else{if(K==null){I+=(G&&":")+"null"
}else{if(typeof (K)=="object"){var F=[];
for(var E in K){F[F.length]=D.toJson(K[E],E,J+"\t")
}I+=(G?":{":"{")+(F.length>1?("\n"+J+"\t"+F.join(",\n"+J+"\t")+"\n"+J):F.join(""))+"}"
}else{if(typeof (K)=="string"){I+=(G&&":")+'"'+K.toString()+'"'
}else{I+=(G&&":")+K.toString()
}}}}return I
},innerXml:function(G){var F="";
if("innerHTML" in G){F=G.innerHTML
}else{var E=function(L){var J="";
if(L.nodeType==1){J+="<"+L.nodeName;
for(var I=0;
I<L.attributes.length;
I++){J+=" "+L.attributes[I].nodeName+'="'+(L.attributes[I].nodeValue||"").toString()+'"'
}if(L.firstChild){J+=">";
for(var K=L.firstChild;
K;
K=K.nextSibling){J+=E(K)
}J+="</"+L.nodeName+">"
}else{J+="/>"
}}else{if(L.nodeType==3){J+=L.nodeValue
}else{if(L.nodeType==4){J+="<![CDATA["+L.nodeValue+"]]>"
}}}return J
};
for(var H=G.firstChild;
H;
H=H.nextSibling){F+=E(H)
}}return F
},escape:function(E){return E.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")
},removeWhite:function(F){F.normalize();
for(var G=F.firstChild;
G;
){if(G.nodeType==3){if(!G.nodeValue.match(/[^ \f\n\r\t\v]/)){var E=G.nextSibling;
F.removeChild(G);
G=E
}else{G=G.nextSibling
}}else{if(G.nodeType==1){D.removeWhite(G);
G=G.nextSibling
}else{G=G.nextSibling
}}}return F
}};
if(A.nodeType==9){A=A.documentElement
}var B=D.toJson(D.toObj(D.removeWhite(A)),A.nodeName,"\t");
return"{\n"+C+(C?B.replace(/\t/g,C):B.replace(/\t|\n/g,""))+"\n}"
},getOutputDataTypeTreeFromNSD:function(A){console.log(A);
console.log(A)
},getOutputDataTypeTreeFromXML:function(A){var D,K={};
var B=[];
function I(S,R,P,L){var O={nodeName:S,currentPath:P,nodeType:L,children:null};
var N=[];
if(typeof (R)=="string"){return(O)
}if(R&&(R["#text"]||R["#cdata"])){N.push({currentPath:P,nodeType:(L=="array"?"arrayEle":"simple"),nodeName:S})
}for(var M in R){if(typeof (R[M])=="function"){continue
}if(M.indexOf("@xmlns:")===0){var Q=M.substring(M.indexOf(":")+1,M.length)
}if((M.charAt(0)!="#")&&(typeof (R[M])=="string")){N.push({currentPath:P+"/"+M,nodeType:(L=="array"?"arrayEle":"simple"),nodeName:M});
continue
}if(R[M] instanceof Array){N.push(I(M,R[M][0],P+"/"+M,"array"));
if(N.last().children){B.push(N.last())
}}else{if(R[M] instanceof Object){N.push(I(M,R[M],P+"/"+M,(L=="array"?"complexArrayEle":"complex")))
}}}O.children=N;
return O
}function E(N,M){var O=[];
for(var L=0;
L<N.children.length;
L++){if(N.children[L].nodeType=="array"){}else{if((N.children[L].nodeType=="simple")||(N.children[L].nodeType=="arrayEle")){O.push({name:N.children[L].nodeName,path:N.children[L].currentPath.substring((M.length+1),N.children[L].currentPath.length)})
}else{if((N.children[L].nodeType=="complexArrayEle")||(N.children[L].nodeType=="complex")){O=O.concat(E(N.children[L],M))
}}}}return(O)
}if(A&&A.nodeType==9){D=Presto.Util.xml2json(Element.cleanWhitespace(A),"").evalJSON(true)
}else{D=A
}for(var F in D){K=I(F,D[F],"/"+F,false);
break
}for(var C=0;
C<B.length;
C++){B[C].leaves=E(B[C],B[C].currentPath)
}console.log("records");
console.log(B);
var J=[];
var G=[];
for(var F=0;
F<B.length;
F++){for(var C=0;
C<B.length;
C++){if(F!=C&&B[C].currentPath.length>B[F].currentPath.length&&B[C].currentPath.substring(0,B[F].currentPath.length)==B[F].currentPath){J.push(C)
}}}for(var F=0;
F<B.length;
F++){var H=false;
J.each(function(L){if(F==L){H=true
}});
if(!H){G.push(B[F])
}}K.records=G;
return K
},makeEle:function(B,D){var C=document.createElement(B);
if(document.all){Element.extend(C)
}if(D){for(var A in D){C.setAttribute(A,D[A])
}}return C
},requireScript:function(A,H){var C=document.getElementsByTagName("script");
var I=false;
if(C){for(var D=0;
D<C.length;
D++){if(/(http|https):\/\//.test(A)){var B=A.substring(A.indexOf("//")+2);
B=B.substring(B.indexOf("/"));
if(C[D].src.endsWith(B)){I=true;
break
}}if(C[D].src.endsWith(A)){I=true;
break
}}}if(!I){var F=document.createElement("script");
F.setAttribute("type","text/javascript");
if(H){F.onreadystatechange=function(J){if(this.readyState=="loaded"){H.onSuccess()
}};
F.onload=function(J){H.onSuccess()
}
}var E=document.getElementsByTagName("head")[0];
var G=E.appendChild(F);
F.src=A
}else{if(H){H.onSuccess()
}}},requireCSS:function(B,H){var A=document.getElementsByTagName("link");
var G=false;
if(A){for(var D=0;
D<A.length;
D++){if(A[D].href===B){G=true
}}}if(!G){var E=document.createElement("link");
E.setAttribute("type","text/css");
E.setAttribute("rel","stylesheet");
var C=document.getElementsByTagName("head")[0];
var F=C.appendChild(E);
E.href=B;
if(H){H.onSuccess()
}}else{if(H){H.onSuccess()
}}},getScopedName:function(A,B){return B+"_"+A
},decodeScopedName:function(B){if(B&&B.length>0){var A=B.lastIndexOf("_");
return B.slice(0,A)
}return B
},getWidth:function(C,A){if(C){C=$(C);
var B=C.offsetWidth;
if(B<=0&&A){B=C.getWidth();
if(B<=0){if(C.style&&C.style.width){B=parseInt(C.style.width)
}}}return B
}return 0
},getHeight:function(B,C){if(B){B=$(B);
var A=B.offsetHeight;
if(A<=0&&C){A=B.getHeight();
if(A<=0){if(B.style&&B.style.height){A=parseInt(B.style.height)
}}}return A
}return 0
},reviveSession:function(A){var B={onSuccess:function(){console.log("server ping successful");
console.log(arguments)
},onFailure:function(){console.log("server ping unsuccessful");
console.error(arguments)
}};
Presto.GetRDSServiceProxy(A).pingServer(B)
},copyToClipBoard:function(A){if(window.clipboardData){window.clipboardData.setData("Text",A)
}else{var C="flashcopier";
if(!document.getElementById(C)){var D=document.createElement("div");
D.id=C;
document.body.appendChild(D)
}document.getElementById(C).innerHTML="";
var B='<embed src="/static/common/js/_clipboard.swf" FlashVars="clipboard='+escape(A)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
document.getElementById(C).innerHTML=B
}}});
Presto.FusionChartView=Class.create({initialize:function(A){Object.extend(this,A||{});
this.resourcesBase=this.resourcesBase+"/common/js/FusionCharts";
this.el=$(this.el);
this.chartHt=this.el.getHeight();
this.chartWd=this.el.getWidth();
if(this.chartHt<=0){this.chartHt=300
}if(this.chartWd<=0){this.chartWd=300
}if(this.dataUrl){this.loadScript({onSuccess:function(){var B=new infosoftglobal.FusionCharts(this.getChartUrl(this.chartType),this.id||"chartId",Presto.Util.getWidth(el,true),Presto.Util.getHeight(el,true),"0","0");
B.setDataURL(this.dataUrl);
B.render(this.el)
},onFailure:function(B){},scope:this})
}else{this.yfields=A.y;
if(this.y){this.yfields=this.y.split(",")
}this.yfields=this.yfields||[];
if(this.dataset){this.dataset.addListener("load",function(B){this.render(this.dataset.getRecords(),this.x,this.y)
},this)
}if(this.records){}}},getChartUrl:function(C){var B=this.resourcesBase+"/Charts/";
var A="";
switch(C){case"Area":A="Area2D";
break;
case"Bubble":A="Bubble";
break;
case"Bar":A="MSBar2D";
break;
case"Column":A="MSColumn2D";
break;
case"Pie":A="Pie2D";
break;
case"Line":A="MSLine";
break;
default:A="MSColumn2D";
break
}return B+A+".swf"
},loadScript:function(A){var B=function(){if(window.FusionCharts){return true
}else{return false
}};
if(B()){A.onSuccess.call(A.scope||this);
return 
}Presto.OnDemand.requireScript(this.resourcesBase+"/JSClass/FusionCharts.js",{onSuccess:function(){A.onSuccess.call(A.scope||this)
},onFailure:function(C){A.onFailure.call(A.scope||this,C)
},scope:this},B)
},renderChart:function(A){var C=function(F){if(F){F=F.escapeHTML();
F=F.gsub('"',"'");
F=F.gsub("'","&apos;");
F=F.gsub("%","%25");
F=F.gsub("&","%26")
}return F
};
var E=function(J,N,F,O,K,L,M){F=F||N;
K=K||O;
var I="<chart caption='"+(L||"")+"' subcaption='"+(M||"")+"' xAxisName='"+F+"' yAxisName='"+K+"' numVDivLines='"+J.length+"' showLegend='"+((O.length>1)?1:0)+"' showAlternateVGridColor='1' chartLeftMargin='10' chartRightMargin='10' chartTopMargin='10' chartBottomMargin='10' useRoundEdges='1' palette='2' labelDisplay='ROTATE' slantLabels='1' rotateLabels='1' rotateValues='1'>";
I+="<categories>";
for(var G=0;
G<J.length;
G++){I+="<category name='"+C(J[G][N])+"'/>"
}I+="</categories>";
for(var G=0;
G<O.length;
G++){I+="<dataset seriesName='"+O[G]+"'>";
for(var H=0;
H<J.length;
H++){I+="<set value='"+C(J[H][O[G]])+"'/>"
}I+="</dataset>"
}I+="</chart>";
return I
};
var D=function(I,N,F,K,J,L,M){F=F||N;
J=J||K;
var H="<chart caption='"+(L||"")+"' subcaption='"+(M||"")+"' xAxisName='"+F+"' yAxisName='"+J+"' labelDisplay='ROTATE' rotateLabels='1'>";
for(var G=0;
G<I.length;
G++){H+="<set label='"+C(I[G][N])+"' value='"+C(I[G][K])+"'/>"
}H+="</chart>";
return H
};
var B=[];
A=A||[];
switch(this.chartType){case"Bar":case"Column":case"Line":B.push(E(A,this.x,this.titleX,this.yfields,this.titleY));
break;
case"Pie":B.push(D(A,this.x,this.titleX,this.yfields,this.titleY));
break;
default:B.push(E(A,this.x,this.titleX,this.yfields,this.titleY));
break
}this.loadScript({onSuccess:function(){var F=new infosoftglobal.FusionCharts(this.getChartUrl(this.chartType),this.id||"chartId",this.chartWd,this.chartHt,"0","0");
F.setDataXML(B.join(""));
F.render(this.el)
},onFailure:function(F){},scope:this})
}});
Presto.YahooMapsView=Class.create({initialize:function(A){Object.extend(this,(A||{}));
this.center=this.center||"San Francisco, ";
this.defaultZoom=this.defaultZoom||3;
this.defaultPoint=this.defaultPoint||(new YGeoPoint(37.4041960114344,-122.008194923401));
this.markerTemplate=this.markerTemplate||"";
this.mapType=this.mapType||YAHOO_MAP_REG;
this.el=$(this.el);
this.map=new YMap(this.el,this.mapType);
var B=this.map;
B.addTypeControl();
B.drawZoomAndCenter(this.center,this.defaultZoom);
B.addZoomLong()
},addMarkers:function(G,D){if(D){Object.extend(this,D)
}if(this.markerTemplate!==""){this.tpl=new Template(this.markerTemplate,Presto.YahooMapsView.tokenPattern)
}if(G&&G.length>0){this.map.removeMarkersAll();
var C,B=[],A;
for(var E=0;
E<G.length;
E++){C=(this.tpl?this.tpl.evaluate(G[E]):"<i>No Marker label defined</i>");
A=new YGeoPoint(G[E][this.lat],G[E][this.lon]);
B.push(A);
this.placeMarker(A,C)
}var F=this.map.getBestZoomAndCenter(B);
if(F){this.map.drawZoomAndCenter(F.YGeoPoint,(F.zoomLevel<=0?1:F.zoomLevel))
}}},placeMarker:function(A,C,D){if(A){C=C||"";
var B=new YMarker(A);
B.addAutoExpand(C);
if(D){YEvent.Capture(B,EventsList.MouseClick,function(){B.openSmartWindow(D)
})
}this.map.addOverlay(B)
}}});
Presto.YahooMapsView.tokenPattern=/(^|.|\r|\n)(\$\s*([0-9a-zA-Z\:\-\_]+)\s*)/;
Presto.debug={maxSize:-1,timestamp:true,enabled:false,logArray:[],init:function(){window.console=window.console||{};
window.console.log=Presto.debug.log;
window.console.debug=Presto.debug.log;
window.console.info=Presto.debug.log;
window.console.trace=Presto.debug.log;
window.console.dir=Presto.debug.log;
window.console.warn=Presto.debug.warn;
window.console.error=Presto.debug.error
},reset:function(){delete Presto.debug.logArray;
Presto.debug.logArray=[]
},enable:function(A){Presto.debug.init();
A=A||{};
Presto.debug.reset();
Presto.debug.enabled=true;
if(A.timestamp===false){Presto.debug.timestamp=false
}if(A.maxSize){Presto.debug.maxSize=parseInt(A.maxSize)
}},disable:function(){Presto.debug.enabled=false;
Presto.debug.reset()
},log:function(){Presto.debug.msg(null,arguments)
},error:function(){Presto.debug.msg("error",arguments)
},warn:function(){Presto.debug.msg("warn",arguments)
},msg:function(D,A){function E(J){switch(typeof J){case"object":try{if(J instanceof Array){var F="[";
for(var G=0;
G<J.length;
G++){if(G>0){F+=", "
}F+=E(J[G])
}F+="]";
return F
}else{var H="[object:";
for(var K in J){if(typeof J[K]=="string"||typeof J[K]=="number"||typeof J[K]=="boolean"){H+=" "+K+"="+J[K]
}}H+="]";
return H
}}catch(I){return"[e!]"+I
}break;
case"function":H=J.toString();
if(H.length>20){H=H.substring(0,20)+"..."
}return"[function: "+H+"]";
break;
default:return""+J
}}if(Presto.debug.enabled){if(A.length>0){var C=Presto.debug.timestamp?"["+new Date().toLocaleTimeString()+"]":"";
C+=D?"["+D+"]   ":"   ";
for(var B=0;
B<A.length;
B++){if(B>0){C+=", "
}C+=E(A[B])
}if(Presto.debug.maxSize>0){while(Presto.debug.logArray.length>Presto.debug.maxSize){Presto.debug.logArray.shift()
}}Presto.debug.logArray.push(C)
}}},getContent:function(){return Presto.debug.logArray.join("\n")
},console:function(){if(window.Ext){var C=new Ext.form.TextArea({anchor:"100%",style:"border-width:0;",value:Presto.debug.getContent()});
var B=new Ext.Window({title:"Presto debug log",width:800,height:500,minWidth:500,minHeight:500,layout:"fit",plain:true,bodyStyle:"padding:5px;",buttonAlign:"center",items:C,buttons:[{text:"Refresh",handler:function(){C.setValue(Presto.debug.getContent())
},scope:this},{text:"Reset",handler:function(){Presto.debug.reset();
C.setValue(Presto.debug.getContent())
},scope:this},{text:"Close",handler:function(){B.hide()
},scope:this}]});
B.show()
}else{var D='<html><body><textarea style="width:100%;height:100%" >'+Presto.debug.getContent()+"</textarea></body></html>";
var A=window.open("","Presto_debug_log","width=800,height=500,menubar=no,toolbar=no,resizable");
var E=A.document;
E.open();
E.write(D);
E.close();
A.focus()
}}};
if(window.location.href.indexOf("debug")!=-1){Presto.debug.enable()
}Presto.Gfx={PNGfixImg:function(M,L){var B=M?[M]:document.images;
var G=navigator.appVersion.split("MSIE");
var H=parseFloat(G[1]);
if((H>=5.5)&&(document.body.filters)){for(var D=0;
D<B.length;
D++){var E=B[D];
var J=E.src.toUpperCase();
if(J.substring(J.length-3,J.length)=="PNG"){var F=(E.id)?"id='"+E.id+"' ":"";
var K=(E.className)?"class='"+E.className+"' ":"";
var C=(E.title)?"title='"+E.title+"' ":"title='"+E.alt+"' ";
var I="display:inline-block;"+E.style.cssText;
if(E.align=="left"){I="float:left;"+I
}if(E.align=="right"){I="float:right;"+I
}if(E.parentElement.href){I="cursor:hand;"+I
}var A="<span "+F+K+C+' style="width:'+E.width+"px; height:"+E.height+"px;"+I+";filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+E.src+"', sizingMethod='scale');\"></span>";
E.outerHTML=A;
D=D-1
}}}},alphaBackgrounds:function(F,A){var B=F?(A?Element.getElementsByClassName(F,A):[F]):(A?Element.getElementsByClassName(document.body,A):document.all);
for(var E=0;
E<B.length;
E++){var D=B[E].currentStyle.backgroundImage;
if(D){if(D.match(/\.png/i)!=null){var C=D.substring(5,D.length-2);
B[E].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src= '"+C+"', sizingMethod='crop')";
B[E].style.backgroundImage="URL('../images/ie/x.gif')"
}}}}};
if(!window.Presto){var Presto={}
}Presto.ScriptTagProxy=function(A){Object.extend(this,A);
if(!A.url){throw new Error("The parameter - url - is required")
}this.head=document.getElementsByTagName("head")[0]
};
Presto.ScriptTagProxy.TRANS_ID=1000;
Presto.ScriptTagProxy.prototype={TRANS_ID:1000,request:function(C,F){var B=this.url;
B+=(B.indexOf("?")!=-1?"&":"?")+C;
B+="&_dc="+(new Date().getTime());
var H=false;
var A=++Presto.ScriptTagProxy.TRANS_ID;
var I={id:A,cb:"stcCallback"+A,scriptId:"stcScript"+A,params:C,url:B,callback:F};
B+="&callback="+I.cb;
var G=this;
window[I.cb]=function(J){G.handleResponse(J,I)
};
var D=document.createElement("script");
D.setAttribute("type","text/javascript");
D.setAttribute("id",I.scriptId);
D.setAttribute("src",B);
var E=this.head.appendChild(D)
},destroyTrans:function(B,A){this.head.removeChild(document.getElementById(B.scriptId));
if(A){window[B.cb]=undefined;
try{delete window[B.cb]
}catch(C){}}else{window[B.cb]=function(){window[B.cb]=undefined;
try{delete window[B.cb]
}catch(D){}}
}},handleResponse:function(D,C){this.trans=false;
this.destroyTrans(C,true);
var A=C.callback;
if(D){A.onSuccess.apply((A.scope||window),[D])
}else{var B={message:"The request to Edge Server failed"};
A.onFailure.apply((A.scope||window),[B])
}}};
Presto.Connection=function(A){A=A||{};
Object.extend(this,A);
if(this.prestoUrl&&this.prestoUrl.indexOf("://")!=-1){this.useScriptTag=true
}else{this.useScriptTag=false;
this.prestoUrl=this.prestoUrl||"/presto"
}this.apiUrl=this.prestoUrl+"/edge/api";
if(this.useScriptTag){this.scriptProxy=new Presto.ScriptTagProxy({url:this.apiUrl})
}if(!this.authToken){if(this.username){this.login(this.username,this.password)
}}};
Presto.Connection.prototype={version:"2.0",getJUMPRequest:function(C){var A={version:"1.1",svcVersion:""};
C.params=C.params||[];
Object.extend(A,C);
if(!A.header){A.header={}
}Object.extend(A.header,{invId:""});
var B=C.authToken||this.authToken;
if(B){Object.extend(A.header,{authToken:B})
}return A
},sendHeartBeat:function(){var A={sid:"RDSService",oid:"ping"};
if(this.authToken){A.header={authToken:this.authToken}
}this.request(A,{onSuccess:function(){console.log("prestoconnect heartbeat successful")
},onFailure:function(B){console.log("prestoconnect heartbeat failed")
},scope:this},{noAuth:true})
},login:function(C,A,B){this.loginError=null;
this.request({sid:"UserManagerService",oid:"login",params:[C,A]},{onSuccess:function(D){if(D&&D.error!==null){this.loginError=D.error;
if(B){B.onFailure.apply((B.scope?B.scope:self),[D.error])
}}else{this.authToken=D.response.authToken;
if(B){B.onSuccess.call(this,this.authToken)
}}},onFailure:function(D){this.loginError=D;
if(B){B.onFailure.call(this,D)
}},scope:this},{noAuth:true})
},logout:function(){},request:function(A,H,E){if(this.loginError){H.onFailure.call(H.scope||{},this.loginError);
return 
}E=E||{};
var G=this.getJUMPRequest(A);
var F=function(M){var I=function(Q){var P=null;
if(window.ActiveXObject){P=new ActiveXObject("Microsoft.XMLDOM");
P.async="false";
P.loadXML(Q)
}else{if(document.implementation&&document.implementation.createDocument){var R=new DOMParser();
P=R.parseFromString(Q,"text/xml")
}}return P
};
var L;
if(typeof M==="string"){L=M.evalJSON()
}else{L=M
}if(typeof L==="string"){L=L.evalJSON()
}if(L&&L.response){var K,O;
if(G.header){K=G.header.resultFormat;
O=G.header.paginateRecord
}if(K&&K==="xml"){if(E.parseXmlResponse){L.response=I(L.response)
}}else{if(typeof L.response==="string"){var J=L.response;
var N=J?J.substr(0,1):"";
if((N==="{")||(N==="[")){L.response=J.evalJSON()
}}}if(O&&O!==""){L.header=L.header||{};
L.header.pagination={paginateRecord:G.header.paginateRecord,paginateStart:G.header.paginateStart,paginateCount:G.header.paginateCount};
if(L.header.map.serviceHeader){L.header.pagination.totalRecords=L.header.map.serviceHeader.map["x-totalCount"];
L.header.pagination.paginateToken=L.header.map.serviceHeader.map["x-paginateToken"]
}}}if(L&&L.error!==null&&L.error.message){H.onFailure.apply((H.scope?H.scope:C),[L.error])
}else{H.onSuccess.apply((H.scope?H.scope:C),[L])
}};
var D=function(){if(this.authToken){G.header.authToken=this.authToken
}var I="inputStream="+encodeURIComponent(Object.toJSON(G));
if(this.useScriptTag){this.scriptProxy.request(I,{onSuccess:function(K){F(K)
},onFailure:function(K){if(!K){K="The request to Presto failed"
}H.onFailure.apply((H.scope?H.scope:C),[K])
},scope:this})
}else{Object.extend(E,{parameters:I,onSuccess:function(K){F(K.responseText)
},onFailure:function(){var K={message:"The request to Edge Server failed with the HTTP error code - "+J.status};
H.onFailure.apply((H.scope?H.scope:C),[K])
},onException:function(L,K){H.onFailure.apply((H.scope?H.scope:C),[K])
}});
var J=new Ajax.Request(this.apiUrl,E)
}}.bind(this);
var C=this;
if(E.noAuth||this.authToken||(!this.username)){D()
}else{if(this.username&&!this.authToken){if(this.loginError){H.onFailure.apply(H.scope||C,[this.loginError])
}else{var B=setInterval(function(){if(C.loginError){clearInterval(B);
H.onFailure.apply(H.scope||C,[C.loginError])
}else{if(C.authToken){clearInterval(B);
D()
}}},100)
}}}}};
Presto.Connection.isAuthTokenValid=function(A,D,C){var B;
if(C){B=new Presto.Connection({prestoUrl:C})
}else{B=new Presto.Connection()
}if(A){B.request({sid:"RDSService",oid:"ping",header:{authToken:A}},{onSuccess:function(){D.onSuccess.call(D.scope||window)
},onFailure:function(E){D.onFailure.call(D.scope||window,E)
},scope:D.scope||window},{noAuth:true})
}};
Presto.DataProxy=Class.create({initialize:function(){},load:function(A,B){}});
Presto.ServiceDataProxy=Class.create(Presto.DataProxy,{initialize:function($super,A,B){$super();
this.connection=A;
this.serviceRequest=B||{};
this.loadError=null;
this.data=null;
this.xmlResult=this.isXml()
},isXml:function(){return this.serviceRequest&&this.serviceRequest.header&&this.serviceRequest.header.resultFormat&&this.serviceRequest.header.resultFormat=="xml"
},load:function(C,D,A){if(C){this.serviceRequest=Object.extend(this.serviceRequest,C)
}A=A||{};
var B=this.serviceRequest;
this.xmlResult=this.isXml();
if(this.xmlResult){A.parseXmlResponse=true
}this.connection.request(this.serviceRequest,{onSuccess:function(E){this.data=E;
if(D){D.onSuccess.call(D.scope||this,this.data)
}},onFailure:function(E){this.loadError=E;
if(D&&D.onFailure){D.onFailure.call(D.scope||this,E)
}},scope:this},A)
}});
Presto.Dataset=Class.create(Presto.Util.Observable,{initialize:function($super,A){$super();
Object.extend(this,A);
this.data=null;
this.addEvents({load:true})
},load:function(B,C,A){A=A||{};
B=B||{};
this.dataProxy.load(B,{onSuccess:function(D){this.data=D;
this.fireEvent("load",this);
if(C&&C.onSuccess){C.onSuccess.call(C.scope||this,this)
}},onFailure:function(D){this.loadError=D;
if(C&&C.onFailure){C.onFailure.call(C.scope||this,D)
}},scope:this},A)
},getData:function(){return this.data
},getRequest:function(){return this.dataProxy.serviceRequest
}});
if(typeof Presto=="undefined"||!Presto){var Presto={}
}Presto.GetRDSServiceProxy=function(A){var B=null;
if(A instanceof Presto.Connection){B=A
}else{B=new Presto.Connection(A)
}return{_invoke:function(C,D,E){B.request({sid:"RDSService",oid:C,params:D},E)
},getListOfAllServices:function(D,C){this._invoke("getListOfAllServices",[],D)
},getAllMashupServices:function(C){this._invoke("getListOfServicesForType",["MASHUP"],C)
},getAllRSSServices:function(C){this._invoke("getListOfServicesForType",["RSS"],C)
},getAllRESTServices:function(C){this._invoke("getListOfServicesForType",["REST"],C)
},getServiceDescription:function(C,D){this._invoke("getServiceDescription",[C],D)
},getServiceNSD:function(C,D){this._invoke("getServiceNSD",[C],D)
},getServiceOperationMetadata:function(E,D,F){var C={onSuccess:function(H){var I=H.response;
var G=new Presto.OperationMetadata(D,E,I);
F.onSuccess.apply(F.scope,[G])
},onFailure:function(G){console.log("getServiceNSD failed");
F.onFailure.apply(F.scope,[G])
},scope:this};
this.getServiceNSD(E,C)
},getTagCloud:function(C){this._invoke("getTagCloud",[],C)
},getListOfAllApplications:function(C){this._invoke("findAllApplications",[],C)
},activateService:function(C,D){this._invoke("activateService",[C],D)
},deactivateService:function(C,D){this._invoke("deactivateService",[C],D)
},unregisterService:function(C,D){this._invoke("unregisterService",[C],D)
},pingServer:function(C){this._invoke("ping",[],C)
}}
};
Presto.isComplexType=function(A){var C=["string","decimal","integer","boolean","date","time","timestamp","Document","document","enum"];
for(var B=0;
B<C.length;
B++){if(C[B]===A){return false
}}return true
};
Presto.NSDType=function(E,C,G,F,D,B,A){this.name=E;
this.type=C;
this.childElements=G;
this.minOccurs=F;
this.maxOccurs=D;
this.values=B;
this.flag=A
};
Presto.createNSDType=function(B,A){switch(B.type){case"WSDL":case"DAO":case"POJO":return Presto.createNSDType_WSDL(B,A);
default:return Presto.createNSDType_RSS(B,A)
}};
Presto.createNSDType_RSS=function(G,D){if(D){var F,E,C,B;
if(D.indexOf(":")>0){var A=D.split(":");
F=A[0];
E=A[1];
C=G.schemas.map[F].elements.map[D]
}else{E=D;
C=G.schemas.map.global?G.schemas.map.global.elements.map[D]:G.schemas.map.ns.elements.map[D]
}return Presto.createNSDTypeForElement_RSS(C)
}};
Presto.createNSDTypeForElement_RSS=function(C){if(C){var A=new Presto.NSDType(C.name,C.type,[],C.minOccurs,C.maxOccurs,C.values,C.flag);
var E=new Array();
var D=C.attributes;
if(D){for(var B=0;
B<D.length;
B++){if(Presto.isComplexType(D[B])){E.push(Presto.createNSDTypeForElement_RSS(D[B]))
}else{E.push(new Presto.NSDType(D[B].name,D[B].type,[],D[B].minOccurs,D[B].maxOccurs,D[B].values,D[B].flag))
}}}D=C.elements;
if(D){for(var B=0;
B<D.length;
B++){if(Presto.isComplexType(D[B].type)){E.push(Presto.createNSDTypeForElement_RSS(D[B]))
}else{E.push(new Presto.NSDType(D[B].name,D[B].type,[],D[B].minOccurs,D[B].maxOccurs,D[B].values,D[B].flag))
}}}A.childElements=E;
return A
}return null
};
Presto.createNSDType_WSDL=function(F,H){if(H){var G,B,D,J;
if(H.indexOf(":")>0){var E=H.split(":");
G=E[0];
B=E[1];
D=F.schemas.map[G].elements.map[H]
}else{B=H;
D=F.schemas.map.global.elements.map[H]
}if(D){var J=new Presto.NSDType(D.name,D.type,[],D.minOccurs,D.maxOccurs,D.values,D.flag);
var I=new Array();
var A=D.attributes;
if(A){for(var C=0;
C<A.length;
C++){if(Presto.isComplexType(A[C].type)){I.push(Presto.createNSDType_WSDL(F,A[C].type))
}else{I.push(new Presto.NSDType(A[C].name,A[C].type,[],A[C].minOccurs,A[C].maxOccurs,A[C].values,A[C].flag))
}}}J.childElements=I;
return J
}return null
}};
Presto.OperationMetadata=function(J,L,H){this.operationId=J;
this.serviceId=L;
this.operation;
this.inputTypes=[];
this.outputTypes=[];
this.headerTypes=[];
this.nsArray=[];
if(!H){}else{var B={name:H.id,id:H.id,status:H.status,type:H.type,endpointURL:(H.endpointURL?H.endpointURL:""),description:H.description,tags:H.tags,provider:H.provider,applications:H.applications};
this.serviceInfo=B;
var C=H.schemas.map;
var K,I;
for(var F in C){K=C[F];
if(K&&K.namespaces){I=K.namespaces.map;
if(I){for(var E in I){this.nsArray.push({prefix:E,uri:I[E]})
}}}}for(var F=0;
F<H.operations.length;
F++){if(H.operations[F].id==this.operationId){this.operation=H.operations[F];
break
}}if(this.operation){var G=this.operation.inputMessage.inputs;
for(var E=0;
E<G.length;
E++){this.inputTypes[E]={name:G[E].name,typeName:G[E].type,type:!Presto.isComplexType(G[E].type)?new Presto.NSDType(G[E].name,G[E].type,[],1,1,[],null):Presto.createNSDType(H,G[E].type),serviceInfo:B,defaultValue:G[E].defaultValue}
}var M=this.operation.outputMessage.outputs;
var N=new Array();
for(var D=0;
D<M.length;
D++){this.outputTypes[D]={name:M[D].name,typeName:M[D].type,type:!Presto.isComplexType(M[D].type)?new Presto.NSDType(M[D].name,M[D].type,[],1,1,[],null):Presto.createNSDType(H,M[D].type),serviceInfo:B}
}var A=this.operation.inputMessage.headers;
var N=new Array();
for(var D=0;
D<A.length;
D++){this.headerTypes[D]={name:A[D].name,typeName:A[D].type,type:!Presto.isComplexType(A[D].type)?new Presto.NSDType(A[D].name,A[D].type,[],1,1,[],null):Presto.createNSDType(H,A[D].type),serviceInfo:B}
}}else{}}};
Presto.OperationMetadata.prototype={describeInputs:function(){return this.inputTypes
},describeOutputs:function(){return this.outputTypes
},describeHeaders:function(){return this.headerTypes
},describeOutput:function(){if(this.outputTypes&&this.outputTypes.length>0){return this.outputTypes[0]
}return null
},getServiceInfo:function(){return this.serviceInfo
},getTypeForName:function(){var D=this.inputTypes,C=D?D.length:0;
for(var A=0;
A<C;
A++){var B=D[A];
if(B&&B.name==name){return B.type.type
}}return null
},getNamespaces:function(){return this.nsArray
},supportsRemotePaging:function(){return(this.serviceInfo.type==="MASHUP")
}};
if(typeof Presto=="undefined"||!Presto){var Presto={}
}Presto.GetMashletHubProxy=function(A){var B=null;
if(A instanceof Presto.Connection){B=A
}else{B=new Presto.Connection(A)
}return{_invoke:function(C,D,E){B.request({sid:"MashletHub",oid:C,params:D},E)
},getAllMashlets:function(C){this._invoke("getMashlets",[],C)
},getMashletNames:function(C){this._invoke("getMashletNames",[],C)
},getMashlets:function(C){this._invoke("getMashlets",[],C)
},getMashlet:function(C,D){this._invoke("getMashlet",[C],D)
},getMashletType:function(C,D){this._invoke("getMashletType",[C],D)
},isMashlet:function(C,D){this._invoke("isMashlet",[C],D)
},copyMashlet:function(D,C,E){this._invoke("copyMashlet",[D,C],E)
},removeMashlet:function(C,D){this._invoke("removeMashlet",[C],D)
},getMashletTypes:function(C){this._invoke("getMashletTypes",[],C)
},createMashletType:function(C,D){this._invoke("createMashletType",[C],D)
},isMashletType:function(C,D){this._invoke("isMashletType",[C],D)
},removeMashletType:function(C,D){this._invoke("removeMashletType",[C],D)
},createMashlet:function(D,C,E){this._invoke("createMashlet",[D,C],E)
},getMashletTypeConfig:function(C,D){this._invoke("getMashletTypeConfig",[C],D)
},setMashlet:function(D,C,E){this._invoke("setMashlet",[D,C],E)
},getMashletsConfig:function(C){this._invoke("getMashletsConfig",[],C)
},updateMashlet:function(D,C,E){this._invoke("updateMashlet",[D,C],E)
}}
};
Presto.namespace("Ema");
if(!Ema.Containers){Ema.Containers={index:0,createIndex:function(){return Ema.Containers.index++
}}
}if(!Ema.Container){Ema.Container=Class.create(Presto.Util.Observable,{initialize:function($super,A,C,B){$super();
this.serverUrl=A;
this.prestoUrl=A+"/presto";
this.mashletsUrl=A+"/mashlets";
this.resourcesBase=C;
this.mashletsConfig=B;
this.connection=null;
this.mashlets={};
this.containerIndex=Ema.Containers.createIndex();
this.idCtr=0
},generateID:function(){this.idCtr++;
var A=this.containerIndex>0?this.containerIndex:"";
return("m"+A+"-"+(this.idCtr-1))
},load:function(config){var self=this;
var conn=this.getConnection();
var instanceId=config.name;
var callback=config.callback||{onSuccess:function(){},onFailure:function(error){console.error(error)
},scope:this};
var mashletHubProxy=Presto.GetMashletHubProxy(conn);
var cb={onSuccess:function(response){try{var preferences=response.response;
if(preferences){var mashletType=preferences.type;
var typeConfig=this.mashletsConfig[mashletType];
this.loadLibs(typeConfig.resources.libs,{onSuccess:function(){if(window.Ext){Ext.BLANK_IMAGE_URL=this.resourcesBase+"/common/js/ext/resources/images/aero/s.gif"
}this.loadScripts(mashletType,typeConfig.resources.js,{onSuccess:function(){var mtype;
try{mtype=eval(mashletType)
}catch(e){}if(mtype){console.log("mashlet available..");
this.loadMashlet(mashletType,typeConfig,preferences,config,{onSuccess:function(mashlet){callback.onSuccess.apply(callback.scope,[mashlet])
},onFailure:function(error){callback.onFailure.apply(callback.scope,["Failed to load mashlet : "+error])
},scope:this})
}else{callback.onFailure.apply(callback.scope,["Failed to instantiate mashlet type "+mashletType])
}},onFailure:function(error){callback.onFailure.apply(callback.scope,["Failed to load scripts : "+error])
},scope:this});
this.loadStyles(mashletType,typeConfig.resources.css)
},onFailure:function(error){callback.onFailure.apply(callback.scope,["Failed to load libraries : "+error])
},scope:this})
}else{callback.onFailure.apply(callback.scope,["Could not locate mashlet with Id = "+instanceId])
}}catch(e){callback.onFailure.apply(callback.scope||window,[e])
}}.bind(this),onFailure:function(_error){_error=_error||{message:"Mashlet with Id = "+instanceId+" is not registered with the Server"};
console.log(_error);
callback.onFailure.call(callback.scope,_error)
}.bind(this),scope:this};
if(config.preferences){cb.onSuccess.bind(this,{response:config.preferences})()
}else{mashletHubProxy.getMashlet(instanceId,cb)
}},loadStyles:function(E,A){if(A){var C;
for(var D=0;
D<A.length;
D++){if(A[D].indexOf("#{")!==-1){var B=new Template(A[D]);
C=B.evaluate({prestoResources:this.resourcesBase,mashletDir:this.mashletsUrl+"/"+E})
}else{C=this.mashletsUrl+"/"+E+"/"+A[D]
}Presto.OnDemand.requireCSS(C)
}}},createConditionCheck:function(property){var condition=function(){try{var propArr=property.split(".");
var propPath=propArr[0];
for(var j=0;
j<propArr.length;
j++){if(!eval("typeof "+propPath+' != "undefined"')){return false
}propPath=propPath+"."+propArr[j+1]
}return true
}catch(e){return false
}};
return condition
},loadScripts:function(I,F,H){var J=function(K){return/(http|https):\/\//.test(K)
};
if(F){for(var D=0;
D<F.length;
D++){var B=F[D];
var C=null;
if(typeof F[D]==="object"){B=F[D].script;
var G=F[D].property;
if(G){C=this.createConditionCheck(G)
}}var A=B;
if(!J(B)){if(B.indexOf("#{prestoResources}")!=-1){var E=new Template(B);
A=E.evaluate({prestoResources:this.resourcesBase,mashletDir:this.mashletsUrl+"/"+I})
}else{A=this.mashletsUrl+"/"+I+"/"+B
}}Presto.OnDemand.requireScript(A,{onSuccess:function(K,L){if(L==F.length-1){H.onSuccess.apply(H.scope)
}},onFailure:function(K){H.onFailure.apply(H.scope,["Failed to load mashlet script : "+K])
},scope:this},C,D)
}}},overrideIfExists:function(B,A){if(!!A.args[B]){A[B]=A.args[B]
}},loadMashlet:function(mashletType,typeConfig,instanceConfig,config,callback){var mtype=eval(mashletType);
if(!mtype||typeof mtype!="function"){callback.onFailure.apply(callback.scope,["Mashlet type identity not unique "+mashletType])
}var _loadMashlet=function(connection){if(!this.heartBeatIntervalId){this.heartBeatIntervalId=setInterval(connection.sendHeartBeat.bind(connection),1000*60*5)
}var mid=this.generateID();
var mashletInstance=new mtype({instanceId:config.name,container:this,connection:connection,typeConfig:typeConfig,instanceConfig:instanceConfig,uniqueId:mid,el:config.el,args:config.args,previewMode:config.previewMode});
this.mashlets[mid]=mashletInstance;
mashletInstance._render();
if(callback){callback.onSuccess.apply(callback.scope||window,[mashletInstance])
}}.bind(this);
var connection;
var cp=new Presto.Util.CookieProvider();
var authToken=cp.get(Presto.COOKIE_AUTHTOKEN);
if(authToken&&authToken.length>0){Presto.Connection.isAuthTokenValid(authToken,{onSuccess:function(){connection=new Presto.Connection({prestoUrl:this.prestoUrl,authToken:authToken});
_loadMashlet(connection)
},onFailure:function(e){cp.clear(Presto.COOKIE_AUTHTOKEN);
connection=new Presto.Connection({prestoUrl:this.prestoUrl});
_loadMashlet(connection)
},scope:this},this.prestoUrl)
}else{connection=new Presto.Connection({prestoUrl:this.prestoUrl});
_loadMashlet(connection)
}},getConnection:function(){if(!this.connection){this.connection=new Presto.Connection({prestoUrl:this.prestoUrl})
}return this.connection
},loadLibs:function(A,B){if(A&&A.presto_ext){this.loadPrestoExt(B)
}else{B.onSuccess.apply(B.scope)
}},loadPrestoExt:function(B){var A=function(){return(window.Ext&&window.Presto&&Presto.extjs)
};
Presto.OnDemand.requireCSS(this.resourcesBase+"/common/js/ext/2.1/resources/css/ext-all.css");
Presto.OnDemand.requireCSS(this.resourcesBase+"/common/js/ext/2.1/resources/css/xtheme-gray.css");
Presto.OnDemand.requireScript(this.resourcesBase+"/common/js/ext/2.1/ext-all-prototype-presto.js",B,A)
},subscribe:function(C,B,A){this.addListener(C,B.bind(A))
},publish:function(C){var A=[];
for(var B=1;
B<arguments.length;
B++){A.push(arguments[B])
}this.fireEvent(C,A)
},userAuthenticated:function(C){for(var B in this.mashlets){var A=this.mashlets[B];
A.getConnection(C,true);
A._render(C)
}},findMashletByName:function(A){}})
}if(!Ema.Mashlet){Ema.Mashlet=Class.create({DEFAULT_HEIGHT:300,DEFAULT_WIDTH:300,USER_LOGIN:"USER_LOGIN",ANONYMOUS_LOGIN:"ANONYMOUS-LOGIN",DEFAULT_AUTHTOKEN_EXPIRY:1000*60*60,initialize:function(A){this.instanceId=A.instanceId;
this.uniqueId=A.uniqueId;
this.connection=A.connection;
this.container=A.container;
this.el=A.el;
this.args=A.args;
this.previewMode=A.previewMode;
this.instanceConfig=A.instanceConfig;
this.typeConfig=A.typeConfig;
if(Object.isString(this.el)){this.el=$(this.el)
}if(!this.el){}Element.extend(this.el);
if(!this.properties){this.properties={}
}this.hideTitlebar=false;
this.hideEmbedCode=false;
this.hideRefresh=false;
this.hideEdit=false;
this.authTokenExpiry=null;
this.eventSubscriptions=null;
console.log(this.typeConfig);
if(this.typeConfig.properties){Object.extend(this.properties,this.typeConfig.properties)
}console.log(this.properties);
if(A.typeConfig){for(var E in A.typeConfig){if(!this[E]){this[E]=A.typeConfig[E]
}}}this.applyInstanceConfig();
var C=this.eventSubscriptions;
if(C&&C.length&&C.length>0){for(var B=0;
B<C.length;
B++){var D=this["on"+C[B]];
if(D){this.container.subscribe(C[B],D,this)
}}}},applyInstanceConfig:function(){for(var A in this.instanceConfig){if(A==="properties"){continue
}this[A]=this.instanceConfig[A]
}if(this.instanceConfig.properties){Object.extend(this.properties,this.instanceConfig.properties)
}if(this.args){Object.extend(this.properties,this.args)
}console.log(this.properties)
},getConnection:function(A,B){if(!this.connection||B){var C=new Presto.Util.CookieProvider();
A=A||C.get(Presto.COOKIE_AUTHTOKEN);
if(A&&A.length>0){this.connection=new Presto.Connection({prestoUrl:this.container.prestoUrl,authToken:A})
}else{this.connection=new Presto.Connection({prestoUrl:this.container.prestoUrl})
}}return this.connection
},isAuthenticated:function(){if(this.getConnection().authToken){return true
}return false
},_render:function(D){D=D||this.authToken;
var A=this.getConnection(D);
try{this.renderMashletBody();
var C=this.authPolicy;
if(!C){C=Ema.Mashlet.ANONYMOUS_LOGIN
}if(C==="USER_LOGIN"&&!A.authToken){this.renderLoginScreen();
return 
}var B=Presto.GetMashletHubProxy(A);
var E=function(){if(this.previewMode||(this.authPolicy!=="USER_LOGIN")){this.beforeRender();
this.render();
this.afterRender();
this.addToolbarActions()
}else{this.connection.request({sid:"MashletHub",oid:"hasAuthz",params:[this.name]},{onSuccess:function(G){if(G.response===true){this.beforeRender();
this.render();
this.afterRender();
this.addToolbarActions()
}else{this._renderNoAuthz();
return 
}},onFailure:function(G){this.handleException(G)
},scope:this})
}}.bind(this);
if(this.instanceId){B.getMashlet(this.instanceId,{onSuccess:function(G){this.instanceConfig=G.response;
this.applyInstanceConfig();
E()
},onFailure:function(G){this.handleException(G)
},scope:this})
}else{E()
}}catch(F){this.handleException(F)
}},_renderNoAuthz:function(B){if(!B||B===""){B="You do not have the permission to view this Mashlet"
}var A=this.getScopedName("login-link");
this.bodyEl.update('<div style="margin:20px;>"><span class="infoMsg">'+B+' </span> <br /><br/> <span id="'+A+'" class="login-link">Click here to login as a different user</span></div>');
Event.observe($(A),"click",function(){this.renderLoginScreen()
}.bind(this))
},addToolbarActions:function(){},renderMashletBody:function(){},renderLoginScreen:function(){},beforeRender:function(){},afterRender:function(){},render:function(){},getPreference:function(B){var A=this.properties;
if(A&&A[B]){return A[B]
}return this[B]
},getPreferenceAsInt:function(C,A){var B=this.getPreference(C);
return this.convertToInt(B,A)
},convertToInt:function(C,A){A=A||0;
if(C){var B=parseInt(C);
if(isNaN(B)){return A
}else{return B
}}return A
},getPreferenceAsBool:function(B){var A=this.getPreference(B);
if(A&&(A==="true"||A==="1"||typeof A=="boolean")){return true
}return false
},setPreference:function(B,A){this.properties=this.properties||{};
this.properties[B]=A
},savePreferences:function(B,C){if(!C){C={onSuccess:function(){},onFailure:function(){}}
}var A=Presto.GetMashletHubProxy(this.container.getConnection());
A.updateMashlet(this.name,B,C)
},setTitle:function(A){this.title=A;
this.setTitleUI(A)
},setTitleUI:function(A){},getTitle:function(){return this.title
},updateStatusMessage:function(A){this.status=A;
this.updateStatusMessageUI(A)
},updateStatusMessageUI:function(A){},clearStatusMessage:function(){this.status="";
this.clearStatusMessageUI()
},clearStatusMessageUI:function(){},getScopedName:function(A){return A+"_"+this.uniqueId
},decodeScopedName:function(B){if(B&&B.length>0){var A=B.lastIndexOf("_");
return B.slice(0,A)
}return B
},handleException:function(B){console.log(B);
var A="Error: ";
if(B&&B.message){A+=B.message
}else{A="The Mashlet cannot be displayed due to errors"
}Ext.Msg.alert("Error processing your request",A)
},resolveUrl:function(B){if(B&&B.indexOf("#{")!=-1){var A=new Template(B);
B=A.evaluate({prestoResources:this.container.resourcesBase,mashletDir:this.container.mashletsUrl+"/"+this.type})
}return B
},canEdit:function(){return !this.readOnly
},destroy:function(){},onMessageReceived:function(A,B){}});
Ema.BoxMashlet=Class.create(Ema.Mashlet,{getMainTemplate:function(){return new Template(['<div class="mashlet-container ','" style="#{mStyle}" id="#{containerId}"','">','<div class="mashlet-title" style="display: #{titleDisplay}; height: 25px;>;" id="#{titleId}">','<span class="mashlet-title-txt" id="#{titleTextId}">#{mashletTitle}</span>','<div id="#{titleToolsCtId}" style="display:inline;">','<span class="mashlet-title-tools" id="#{titleToolsId}"></span>','<span class="mashlet-title-tools" id="#{titleToolsReturnId}" style="display:none;"><img src="',this.container.resourcesBase,'/mashlet/images/back.png" id="#{returnImgId}" class="tool" /></span>',"</div>","</div>",'<div class="mashlet-status" style="display: none;height:auto;" id="#{statusId}"></div>','<div class="mashlet-body" style="display:block;height:#{bodyHt}px;" id="#{bodyId}"></div>','<div class="mashlet-body mashlet-ed-body" style="display:block;height:#{bodyHt}px;" id="#{editBodyId}"></div>','<div class="mashlet-body" style="display:block;height:#{bodyHt}px;" id="#{embedBodyId}" ></div>',"</div>"].join(""))
},getLoginTemplate:function(){return new Template(['<div class="login-form">','<div class="login-info" id="#{loginInfoId}">Please login to use this Mashlet</div>','<form id="#{loginFormId}">','<div class="mshletLoginFormInp"><label for="#{usernameId}">Username</label><input type="text" id="#{usernameId}" value="admin" /></div>','<div class="mshletLoginFormInp"><label for="#{passwordId}">Password</label><input type="password" id="#{passwordId}" value="" /></div>','<table><tr><td><input style="margin-left:65px;margin-top:5px;width:70px;" type="button" value="Login" id="#{loginBtnId}"/></td></tr></table>','<div class="spacer">&nbsp;</div>',"</form>","</div>"].join(""))
},beforeRender:function(){if(!this.getPreference("toggleBody")){var B=this.addToolbarAction({id:"minimize",modeChange:false,hideOnload:false,imageSrc:this.container.resourcesBase+"/mashlet/images/down.png",hoverImageSrc:this.container.resourcesBase+"/mashlet/images/down-hover.png",tooltip:"Minimize Mashlet",handler:function(){new Effect.Scale(this.containerEl,Element.getHeight($(this.titleEl))*100/Element.getHeight(this.containerEl),{duration:0.5,scaleX:false,scaleContent:false,afterFinish:function(){Element.hide(this.bodyEl);
Element.hide(this.editEl)
}.bind(this)});
$(this.getScopedName("minimize")).hide();
$(this.getScopedName("restore")).show()
}.bind(this),scope:this});
var A=this.addToolbarAction({id:"restore",modeChange:false,hideOnload:true,imageSrc:this.container.resourcesBase+"/mashlet/images/right.png",hoverImageSrc:this.container.resourcesBase+"/mashlet/images/right-hover.png",tooltip:"Restore Mashlet",handler:function(){var C=parseInt(this.getPreference("height"));
if(isNaN(C)){C=this.el.getHeight();
if(C<=0){C=300
}}Element.show(this.bodyEl);
Element.hide(this.editEl);
Element.hide(this.embedEl);
new Effect.Scale(this.containerEl,(C-Element.getHeight($(this.titleEl)))*100/Element.getHeight($(this.titleEl)),{duration:0.5,scaleX:false,scaleContent:false,afterFinish:function(){Element.show(this.editEl);
Element.show(this.embedEl)
}.bind(this)});
$(this.getScopedName("restore")).hide();
$(this.getScopedName("minimize")).show()
}.bind(this),scope:this})
}},afterRender:function(){},renderLoginScreen:function(){if(!this.loginTemplate){this.loginTemplate=this.getLoginTemplate()
}this.viewState="login";
var A=this;
var B={loginInfoId:this.getScopedName("login-info"),loginFormId:this.getScopedName("login-form-id"),usernameId:this.getScopedName("username"),passwordId:this.getScopedName("password"),saveAuthId:this.getScopedName("saveAuth"),loginBtnId:this.getScopedName("loginBtnId")};
this.bodyEl.innerHTML=this.loginTemplate.evaluate(B);
Event.observe($(B.loginBtnId),"click",function(){var D=new Presto.Util.CookieProvider();
var C=this.getConnection();
C.login($(B.usernameId).value,$(B.passwordId).value,{onSuccess:function(E){D.set(Presto.COOKIE_AUTHTOKEN,E);
A.container.userAuthenticated(C.authToken)
},onFailure:function(E){$(B.loginInfoId).update('<font color="red">Login failed - '+E.message+"</font>")
},scope:A})
}.bind(this))
},addToolbarActions:function(){if(!this.getPreference("hideEmbedCode")){this.addToolbarAction({id:"embedCode",modeChange:true,imageSrc:this.container.resourcesBase+"/mashlet/images/code.png",hoverImageSrc:this.container.resourcesBase+"/mashlet/images/code-hover.png",tooltip:"Get Embed Code",handler:function(){var A=this;
var C={mashletName:A.name||"",mashletDescription:A.description||"",mashletTags:A.tags||"",htmlEmbedCode:Presto.Util.colorCoder('<script src="'+this.container.serverUrl+"/mashlets?mashlet="+A.name+'"><\/script>'),mediaWikiEmbed:Presto.Util.colorCoder("<mashlet>"+this.container.serverUrl+"/mashlets?mashlet="+A.name+"</mashlet>"),standalonePage:this.container.serverUrl+"/mashlets/standalone.jsp?mashlet="+A.name};
var D=this.embedCodeTemplate.evaluate(C);
this.embedEl.innerHTML=D;
var B=Presto.Util.getHeight(this.el);
this.hideAll();
this.embedEl.style.display="block";
this.embedEl.show()
}.bind(this),scope:this})
}if(this.canEdit()&&!this.getPreference("hideEdit")){this.addToolbarAction({id:"edit",modeChange:true,imageSrc:this.container.resourcesBase+"/mashlet/images/config.png",hoverImageSrc:this.container.resourcesBase+"/mashlet/images/config-hover.png",tooltip:"Edit Settings",handler:function(){this.hideAll();
this.editEl.show();
this.onEdit()
},scope:this})
}if(!this.getPreference("hideRefresh")){this.addToolbarAction({id:"refresh",imageSrc:this.container.resourcesBase+"/mashlet/images/refresh.png",hoverImageSrc:this.container.resourcesBase+"/mashlet/images/refresh-hover.png",tooltip:"Refresh",modeChange:false,handler:function(){if(this.onRefresh){this.onRefresh()
}}.bind(this),scope:this})
}if(this.isAuthenticated()&&!this.getPreference("hideLogout")){this.addToolbarAction({id:"logout",modeChange:true,imageSrc:this.container.resourcesBase+"/mashlet/images/logout.png",hoverImageSrc:this.container.resourcesBase+"/mashlet/images/logout-hover.png",tooltip:"Logout",confirmMsg:"Are you sure you want to logout?",handler:function(){this.logout();
this.renderLoginScreen()
},scope:this})
}},renderMashletBody:function(){if(!this.mainTemplate){this.mainTemplate=this.getMainTemplate()
}if(!this.embedCodeTemplate){this.embedCodeTemplate=new Template([' <div class="embed-ctr">','<div class="embed-options">','<span class="embed-title">Standalone Page</span>','<div class="embed-code"><a target="_blank" href="#{standalonePage}" class="embed-url">#{standalonePage}</a></div>','<span class="embed-title">HTML Embed</span>','<div class="embed-code"><div class="embed-text" rows="3" cols="40">#{htmlEmbedCode}</div></div>','<span class="embed-title">MediaWiki Embed</span>','<div class="embed-code"><div class="embed-text" rows="3" cols="40">#{mediaWikiEmbed}</div></div>','<div class="embed-actions"></div>',"</div>","</div>"].join(""))
}var A=this;
var C="display:block;";
var B=parseInt(this.getPreference("height"));
if(isNaN(B)){B=this.el.getHeight();
if(B<=0){B=300
}}C+="height: "+B+"px;";
var E=parseInt(this.getPreference("width"));
C+=(isNaN(E)||(E<=0)?"width:auto;":"width:"+E+"px;");
var F={mStyle:C,ht:B,wd:E,containerId:A.getScopedName("m_container"),titleId:A.getScopedName("m_title"),titleTextId:A.getScopedName("m_titletext"),titleToolsCtId:A.getScopedName("m_titletoolsCt"),titleToolsId:A.getScopedName("m_titletools"),titleToolsReturnId:A.getScopedName("m_titletoolsreturn"),returnImgId:A.getScopedName("m_returnImgId"),statusId:A.getScopedName("m_status"),bodyId:A.getScopedName("m_body"),editBodyId:A.getScopedName("m_edit"),embedBodyId:A.getScopedName("m_embed"),mashletTitle:A.getTitle(),bodyHt:B-(this.getPreferenceAsBool("hideTitlebar")?0:25),titleDisplay:this.getPreferenceAsBool("hideTitlebar")?"none":"",titlecollapseCt:A.getScopedName("m_expcoll_body"),collapseImg:A.container.resourcesBase+"/mashlet/images/down.png",expandImg:A.container.resourcesBase+"/mashlet/images/right.png",collapseImgId:A.getScopedName("collapseImg"),expandImgId:A.getScopedName("expandImg")};
var D=this.mainTemplate.evaluate(F);
this.el.innerHTML=D;
this.containerEl=$(F.containerId);
this.bodyEl=$(F.bodyId);
this.titleEl=$(F.titleId);
this.titleTextEl=$(F.titleTextId);
this.toolsEl=$(F.titleToolsId);
this.statusEl=$(F.statusId);
this.editEl=$(F.editBodyId);
this.embedEl=$(F.embedBodyId);
this.toolsReturnEl=$(F.titleToolsReturnId);
var G=$(F.titleToolsCtId);
G.hide();
Event.observe(this.containerEl,"mouseover",function(){G.show()
}.bind(this));
Event.observe(this.containerEl,"mouseout",function(){G.hide()
}.bind(this))
},showViewMode:function(){this.hideAll();
this.bodyEl.show();
this.toolsReturnEl.hide();
this.toolsEl.show()
},addToolbarAction:function(A){var E=this.resolveUrl(A.imageSrc);
var B=new Element("img",{id:this.getScopedName(A.id),"class":"tool",src:E,title:A.tooltip||""});
Element.insert(this.toolsEl,{top:B});
if(A.hoverImageSrc){var D=this.resolveUrl(A.hoverImageSrc);
Event.observe(B,"mouseover",function(){B.src=D
}.bind(this));
Event.observe(B,"mouseout",function(){B.src=E
}.bind(this))
}if(A.hideOnload){B.hide()
}var C=function(){A.handler.call(A.scope||this);
if(A.modeChange){this.toolsEl.hide();
this.toolsReturnEl.show();
var I=$(this.getScopedName("m_returnImgId"));
var G=this.container.resourcesBase+"/mashlet/images/back-hover.png";
var F=I.src;
var H=A.returnHandler;
Event.observe(I,"click",function(){if(H){H.call(this)
}this.showViewMode()
}.bind(this));
Event.observe(I,"mouseover",function(){I.src=G
}.bind(this));
Event.observe(I,"mouseout",function(){I.src=F
}.bind(this))
}}.bind(this);
Element.observe(B,"click",function(){if(A.handler){if(A.confirmMsg){if(confirm(A.confirmMsg)){C()
}}else{C()
}}}.bind(this));
return B
},hideAll:function(){this.bodyEl.hide();
this.editEl.hide();
this.embedEl.hide()
},setTitleUI:function(A){this.titleTextEl.innerHTML=A
},updateStatusMessageUI:function(A){this.statusEl.style.display="block";
this.statusEl.innerHTML=A
},clearStatusMessageUI:function(){this.statusEl.innerHTML="";
this.statusEl.style.display="none"
},showInPreviewMode:function(){this.previewMode=true;
this.toolsEl.hide()
},onRefresh:function(){},logout:function(){this.getConnection().request({sid:"UserManagerService",oid:"logout"},{onSuccess:function(A){if(A.response){cp=new Presto.Util.CookieProvider();
cp.clear(Presto.COOKIE_AUTHTOKEN)
}},scope:this})
},onEdit:function(){var A={onSuccess:function(){function I(S,T){var P=[];
if(T&&T instanceof Array){for(var R=0;
R<T.length;
R++){var Q=T[R].name;
if(S[Q]){P.push(Q)
}}}loop:for(var U in S){for(var R=0;
R<P.length;
R++){if(U==P[R]){continue loop
}}P.push(U)
}return P
}function G(P,R){if(R){if(R instanceof Array){for(var Q=0;
Q<R.length;
Q++){if(R[Q].name==P){return R[Q]
}}}else{if(R[P]){return R[P]
}}}return{}
}if(!this.editPanel){var M=this.properties;
var F=this["properties-meta"];
var E=I(M,F);
var J=null;
if(M){J=[]
}var L=[];
var D,O=this;
for(var H=0;
H<E.length;
H++){var C=E[H];
var N=G(C,F);
if(C=="width"||C=="height"){continue
}if(typeof M[C]==="function"){continue
}if(typeof M[C]==="object"){continue
}if(N.system||C==="roles"){continue
}D={xtype:"textfield",name:C,id:this.getScopedName(C),fieldLabel:C,value:this.getPreference(C),disabled:N.readOnly};
J.push(D)
}var B=[{xtype:"fieldset",title:"General Preferences",autoHeight:true,defaults:{width:210},defaultType:"textfield",collapsed:false,collapsible:true,id:this.getScopedName("editForm-general"),items:[{fieldLabel:"Name",id:this.getScopedName("name"),allowBlank:false,disabled:true,name:"name",value:this.name},{fieldLabel:"Mashlet Title",name:"title",id:this.getScopedName("title"),value:this.title},{fieldLabel:"Description",name:"description",id:this.getScopedName("description"),xtype:"textarea",value:this.description},{fieldLabel:"Width",name:"width",regex:/^auto{0,1}$|^[0-9]*$/,regexText:"Valid entries: 'positive number' or the word 'auto'",id:this.getScopedName("width"),value:this.getPreference("width")},{fieldLabel:"Height",name:"height",regex:/^auto{0,1}$|^[0-9]*$/,regexText:"Valid entries: 'positive number' or the word 'auto'",id:this.getScopedName("height"),value:this.getPreference("height")}]}];
if(J&&J.length>0){B.push({xtype:"fieldset",title:"Custom Preferences",collapsible:true,autoHeight:true,collapsed:true,defaults:{width:210},defaultType:"textfield",id:this.getScopedName("editForm-properties"),items:J})
}var K={labelWidth:150,labelAlign:"top",frame:false,renderTo:this.editEl,bodyStyle:"padding:5px 5px 0",autoScroll:true,id:this.getScopedName("editForm"),items:B,buttons:[{text:"Save",handler:function(){var T=this.editPanel.getForm(),U,S={};
var Q=T.getValues()||{};
console.log("form values =");
console.log(Q);
if(T.isDirty()&&T.isValid()){for(var R in Q){U=T.findField(R);
if(U&&!U.disabled&&U.isDirty()){console.log("Dirty Field = "+U.getId());
switch(U.name){case"title":case"description":S[U.name]=Q[R];
break;
case"width":case"height":if(Q[R]==="auto"){S[U.name]=Q[R]
}else{var V=this.convertToInt(Q[R],0);
if(V!==0){S[U.name]=V
}}break;
case"authPolicy":if(Q[R]==="on"){S.authPolicy="USER_LOGIN"
}else{S.authPolicy="ANONYMOUS-LOGIN"
}break;
case"roles":var P=Q[R];
if(P){if(P===""){S.roles=[]
}else{S.roles=P.split(",")
}}break;
default:S.properties={};
S.properties[U.name]=Q[R];
break
}}}U=T.findField("authPolicy");
if(U&&U.getValue()){S.authPolicy="USER_LOGIN"
}else{S.authPolicy="ANONYMOUS-LOGIN";
S.roles=[]
}if(S){console.log("newconfig = ");
console.log(S);
this.editEl.startWaiting("bigBlackWaiting");
this.savePreferences(S,{onSuccess:function(){this.editEl.stopWaiting();
Ema.load({name:this.name,el:this.el,serverUrl:this.container.serverUrl,args:this.args})
},onFailure:function(W){this.handleException(W)
},scope:this})
}}}.bind(this)},{text:"Cancel",handler:function(){this.showViewMode()
},scope:this}]};
this.editPanel=new Ext.form.FormPanel(K);
this.getConnection().request({sid:"UserManagerService",oid:"listAllRoles"},{onSuccess:function(Q){var U=Q.response;
var P=[];
if(U&&U.length>0){for(var S=0;
S<U.length;
S++){P.push([U[S]])
}}var W=new Ext.ux.Multiselect({xtype:"multiselect",fieldLabel:"Allowed Roles",name:"roles",dataFields:["roleName"],data:P,valueField:"roleName",displayField:"roleName",width:180,height:120,allowBlank:true,legend:"Roles"});
var R=this.getPreference("roles");
W.on("render",function(){if(R&&R!==""){W.setValue(R)
}});
var V=new Ext.form.Checkbox({boxLabel:"Login Required",labelSeparator:"",checked:(this.authPolicy==="USER_LOGIN"),id:this.getScopedName("authPolicy"),name:"authPolicy"});
var T=new Ext.form.FieldSet({xtype:"fieldset",title:"Security",collapsible:true,collapsed:true,height:250,autoScroll:true,autoWidth:true,defaults:{width:200},defaultType:"textfield",id:this.getScopedName("editForm-security"),labelAlign:"top",labelWidth:120,items:[V,W]});
this.editPanel.getForm().add(V,W);
this.editPanel.add(T);
this.editPanel.doLayout();
this.editPanel.getForm().findField(this.getScopedName("authPolicy")).on("check",function(Y,X){W.reset();
W.setDisabled(!X)
})
},onFailure:function(P){this.handleServerException(P);
cb.onFailure.call(this,P)
},scope:this})
}this.editPanel.doLayout()
},onFailure:function(B){},scope:this};
Presto.OnDemand.requireCSS(this.container.resourcesBase+"/common/js/ext/2.1/resources/css/ext-all.css");
Presto.OnDemand.requireCSS(this.container.resourcesBase+"/common/js/ext/2.1/resources/css/xtheme-gray.css");
Presto.OnDemand.requireScript(this.container.resourcesBase+"/common/js/ext/2.1/ext-all-prototype-presto.js",{onSuccess:function(){Presto.OnDemand.requireCSS(this.container.resourcesBase+"/common/js/MultiselectItemSelector/Multiselect.css");
Presto.OnDemand.requireScript(this.container.resourcesBase+"/common/js/MultiselectItemSelector/Multiselect-all.js",A,function(){return(window.Ext&&Ext.ux&&Ext.ux.Multiselect)
})
},onFailure:function(B){},scope:this},function(){return(window.Ext&&window.Presto&&Presto.extjs)
})
}});
Ema.BadgeMashlet=Class.create(Ema.Mashlet,{})
};