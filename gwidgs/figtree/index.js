(()=>{var _t=Object.create,S=Object.defineProperty,gt=Object.getPrototypeOf,vt=Object.prototype.hasOwnProperty,xt=Object.getOwnPropertyNames,yt=Object.getOwnPropertyDescriptor,bt=s=>S(s,"__esModule",{value:!0}),I=(s,t)=>()=>(t||(t={exports:{}},s(t.exports,t)),t.exports),wt=(s,t,e)=>{if(bt(s),t&&typeof t=="object"||typeof t=="function")for(let i of xt(t))!vt.call(s,i)&&i!=="default"&&S(s,i,{get:()=>t[i],enumerable:!(e=yt(t,i))||e.enumerable});return s},M=s=>s&&s.__esModule?s:wt(S(s!=null?_t(gt(s)):{},"default",{value:s,enumerable:!0}),s),st=I(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});O.default=Ct;var tt={width:"12.1em",height:"12.1em",overflow:"hidden",top:0,right:0,zIndex:9999,pointerEvents:"none",fontSize:"13px",textDecoration:"none",textIndent:"-999999px"},kt=[["position","absolute"],["display","block"],["width","15.38em"],["height","1.54em"],["top","3.23em"],["right","-3.23em"],["-webkit-box-sizing","content-box"],["-moz-box-sizing","content-box"],["box-sizing","content-box"],["-webkit-transform","rotate(45deg)"],["-moz-transform","rotate(45deg)"],["-ms-Transform","rotate(45deg)"],["-o-transform","rotate(45deg)"],["transform","rotate(45deg)"]],et=[["content",'""'],["padding",".38em 0"],["background-color","#a00"],["background-image","-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.15)))"],["background-image","-webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))"],["background-image","-moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))"],["background-image","-ms-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))"],["background-image","-o-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))"],["background-image","linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))"],["box-shadow","0 .15em .23em 0 rgba(0, 0, 0, 0.5)"],["pointer-events","auto"]],it=[["content","attr(data-ribbon)"],["color","#fff"],["font",'700 1em "Helvetica Neue", Helvetica, Arial, sans-serif'],["line-height","1.54em"],["text-decoration","none"],["text-shadow","0 -.08em rgba(0, 0, 0, 0.5)"],["text-align","center"],["text-indent","0"],["padding",".15em 0"],["margin",".15em 0"],["border-width",".08em 0"],["border-style","dotted"],["border-color","#fff"],["border-color","rgba(255, 255, 255, 0.7)"]];function Ct(s,t){t=t||{};var e=document.createElement("a");if(s)e.href=s;else{var i=window.location.hostname.split(".")[0],n=window.location.pathname.split("/")[1];e.href="https://github.com/"+i+"/"+n}e.title=e.innerText=t.text||"fork me on github",e.setAttribute("data-ribbon",t.text||"fork me on github"),e.className="github-fork-ribbon-"+Math.round(Math.random()*1e5),t.parent?t.parent.appendChild(e):document.body.appendChild(e),e.style.position=t.fixed?"fixed":"absolute",t.background&&(et[2][1]=t.background),t.color&&(it[1][1]=t.color);for(var o in tt)e.style[o]=tt[o];var r="{",l=!0,a=!1,c=void 0;try{for(var m=kt[Symbol.iterator](),h;!(l=(h=m.next()).done);l=!0){var b=h.value;r+=b[0]+":"+b[1]+";"}}catch(v){a=!0,c=v}finally{try{!l&&m.return&&m.return()}finally{if(a)throw c}}var _=r,L=!0,z=!1,H=void 0;try{for(var E=et[Symbol.iterator](),F;!(L=(F=E.next()).done);L=!0){var R=F.value;_+=R[0]+":"+R[1]+";"}}catch(v){z=!0,H=v}finally{try{!L&&E.return&&E.return()}finally{if(z)throw H}}var g=r,N=!0,j=!1,V=void 0;try{for(var T=it[Symbol.iterator](),W;!(N=(W=T.next()).done);N=!0){var U=W.value;g+=U[0]+":"+U[1]+";"}}catch(v){j=!0,V=v}finally{try{!N&&T.return&&T.return()}finally{if(j)throw V}}var w=void 0,C=void 0;t.side&&(w=t.side.toLowerCase().indexOf("bottom")!==-1,C=t.side.toLowerCase().indexOf("left")!==-1),w&&(e.style.top="auto",e.style.bottom=0,_+="top:auto;bottom:3.23em;",g+="top:auto;bottom:3.23em;"),C&&(e.style.right="auto",e.style.left=0,_+="right:auto;left:-3.23em;",g+="right:auto;left:-3.23em;"),(C&&!w||!C&&w)&&(_+="transform:rotate(-45deg);",g+="transform:rotate(-45deg);");var q=document.createElement("style");document.head.appendChild(q);var J=q.sheet;J.insertRule("."+e.className+"::before"+_+"}"),J.insertRule("."+e.className+"::after"+g+"}")}}),ot=I((Dt,$)=>{"use strict";var Lt=Object.prototype.hasOwnProperty,u="~";function x(){}Object.create&&(x.prototype=Object.create(null),new x().__proto__||(u=!1));function Et(s,t,e){this.fn=s,this.context=t,this.once=e||!1}function nt(s,t,e,i,n){if(typeof e!="function")throw new TypeError("The listener must be a function");var o=new Et(e,i||s,n),r=u?u+t:t;return s._events[r]?s._events[r].fn?s._events[r]=[s._events[r],o]:s._events[r].push(o):(s._events[r]=o,s._eventsCount++),s}function k(s,t){--s._eventsCount===0?s._events=new x:delete s._events[t]}function d(){this._events=new x,this._eventsCount=0}d.prototype.eventNames=function(){var t=[],e,i;if(this._eventsCount===0)return t;for(i in e=this._events)Lt.call(e,i)&&t.push(u?i.slice(1):i);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t};d.prototype.listeners=function(t){var e=u?u+t:t,i=this._events[e];if(!i)return[];if(i.fn)return[i.fn];for(var n=0,o=i.length,r=new Array(o);n<o;n++)r[n]=i[n].fn;return r};d.prototype.listenerCount=function(t){var e=u?u+t:t,i=this._events[e];return i?i.fn?1:i.length:0};d.prototype.emit=function(t,e,i,n,o,r){var l=u?u+t:t;if(!this._events[l])return!1;var a=this._events[l],c=arguments.length,m,h;if(a.fn){a.once&&this.removeListener(t,a.fn,void 0,!0);switch(c){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,e),!0;case 3:return a.fn.call(a.context,e,i),!0;case 4:return a.fn.call(a.context,e,i,n),!0;case 5:return a.fn.call(a.context,e,i,n,o),!0;case 6:return a.fn.call(a.context,e,i,n,o,r),!0}for(h=1,m=new Array(c-1);h<c;h++)m[h-1]=arguments[h];a.fn.apply(a.context,m)}else{var b=a.length,_;for(h=0;h<b;h++){a[h].once&&this.removeListener(t,a[h].fn,void 0,!0);switch(c){case 1:a[h].fn.call(a[h].context);break;case 2:a[h].fn.call(a[h].context,e);break;case 3:a[h].fn.call(a[h].context,e,i);break;case 4:a[h].fn.call(a[h].context,e,i,n);break;default:if(!m)for(_=1,m=new Array(c-1);_<c;_++)m[_-1]=arguments[_];a[h].fn.apply(a[h].context,m)}}}return!0};d.prototype.on=function(t,e,i){return nt(this,t,e,i,!1)};d.prototype.once=function(t,e,i){return nt(this,t,e,i,!0)};d.prototype.removeListener=function(t,e,i,n){var o=u?u+t:t;if(!this._events[o])return this;if(!e)return k(this,o),this;var r=this._events[o];if(r.fn)r.fn===e&&(!n||r.once)&&(!i||r.context===i)&&k(this,o);else{for(var l=0,a=[],c=r.length;l<c;l++)(r[l].fn!==e||n&&!r[l].once||i&&r[l].context!==i)&&a.push(r[l]);a.length?this._events[o]=a.length===1?a[0]:a:k(this,o)}return this};d.prototype.removeAllListeners=function(t){var e;return t?(e=u?u+t:t,this._events[e]&&k(this,e)):(this._events=new x,this._eventsCount=0),this};d.prototype.off=d.prototype.removeListener;d.prototype.addListener=d.prototype.on;d.prefixed=u;d.EventEmitter=d;typeof $!="undefined"&&($.exports=d)}),at=I((At,rt)=>{"use strict";var Nt=function(){function s(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&s(t.prototype,e),i&&s(t,i),t}}();function Tt(s,t){if(!(s instanceof t))throw new TypeError("Cannot call a class as a function")}function It(s,t,e){return new St(s,t,e)}var St=function(){function s(t,e,i){var n=this;Tt(this,s),this.options=i||{},this.threshhold=this.options.thresshold||10,this.events={mouseclick:function(r){return n.mouseclick(r)},touchstart:function(r){return n.touchstart(r)},touchmove:function(r){return n.touchmove(r)},touchcancel:function(r){return n.touchcancel(r)},touchend:function(r){return n.touchend(r)}},t.addEventListener("click",this.events.mouseclick),t.addEventListener("touchstart",this.events.touchstart,{passive:!0}),t.addEventListener("touchmove",this.events.touchmove,{passive:!0}),t.addEventListener("touchcancel",this.events.touchcancel),t.addEventListener("touchend",this.events.touchend),this.element=t,this.callback=e}return Nt(s,[{key:"destroy",value:function(){this.element.removeEventListener("click",this.events.mouseclick),this.element.removeEventListener("touchstart",this.events.touchstart,{passive:!0}),this.element.removeEventListener("touchmove",this.events.touchmove,{passive:!0}),this.element.removeEventListener("touchcancel",this.events.touchcancel),this.element.removeEventListener("touchend",this.events.touchend)}},{key:"touchstart",value:function(e){e.touches.length===1&&(this.lastX=e.changedTouches[0].screenX,this.lastY=e.changedTouches[0].screenY,this.down=!0)}},{key:"pastThreshhold",value:function(e,i){return Math.abs(this.lastX-e)>this.threshhold||Math.abs(this.lastY-i)>this.threshhold}},{key:"touchmove",value:function(e){if(!this.down||e.touches.length!==1){this.touchcancel();return}var i=e.changedTouches[0].screenX,n=e.changedTouches[0].screenY;this.pastThreshhold(i,n)&&this.touchcancel()}},{key:"touchcancel",value:function(){this.down=!1}},{key:"touchend",value:function(e){this.down&&(e.preventDefault(),this.callback(e,this.options.args))}},{key:"mouseclick",value:function(e){this.callback(e,this.options.args)}}]),s}();rt.exports=It}),K=1235,Q=!0;function Z(){let s=new WebSocket(`ws://localhost:${K}`);s.addEventListener("message",()=>window.location.reload()),s.addEventListener("close",()=>{setTimeout(Z,0)}),s.addEventListener("open",()=>{Q?Q=!1:window.location.reload()})}window.addEventListener("load",()=>{Z(),console.log(`Live reload initialized on port ${K}...`)});var mt=M(st()),ft=M(ot()),pt=M(at());function B(s){return typeof s=="string"?document.querySelector(s):s}function lt(s,t,e,i){return Math.sqrt(Math.pow(s-e,2)+Math.pow(t-i,2))}function D(s,t,e){let i=f(e),n=e.offsetWidth,o=e.offsetHeight,r=i.x+n/2,l=i.y+o/2,a=Math.max(Math.abs(s-r)-n/2,0),c=Math.max(Math.abs(t-l)-o/2,0);return a*a+c*c}function A(s,t,e){let i=f(e),n=i.x,o=i.y,r=e.offsetWidth,l=e.offsetHeight;return s>=n&&s<=n+r&&t>=o&&t<=o+l}function f(s){let t=s.getBoundingClientRect(),e=document.body,i=document.documentElement,n=window.pageYOffset||i.scrollTop||e.scrollTop,o=window.pageXOffset||i.scrollLeft||e.scrollLeft,r=i.clientTop||e.clientTop||0,l=i.clientLeft||e.clientLeft||0,a=t.top+n-r,c=t.left+o-l;return{y:Math.round(a),x:Math.round(c)}}function G(s,t){s=s||{};for(let e in t)s[e]=typeof s[e]!="undefined"?s[e]:t[e];return s}function ht(s){for(;s.firstChild;)s.firstChild.remove()}function p(s){s=s||{};let t=document.createElement(s.type||"div");return s.parent&&s.parent.appendChild(t),s.className&&t.classList.add(s.className),s.html&&(t.innerHTML=s.html),s.id&&(t.id=s.id),t}function ct(s,t){let e=0;for(let i of s.children){if(i===t)return e;e++}return-1}var P=class{constructor(t){this._indicator=p(),this._indicator.style.marginLeft=t.indentation+"px";let e=p({parent:this._indicator});e.style.display="flex",this._indicator.indentation=p({parent:e}),this._indicator.icon=p({parent:e,className:`${t.prefixClassName}-expand`}),this._indicator.icon.style.height=0,this._indicator.line=p({parent:e,className:`${t.prefixClassName}-indicator`})}get(){return this._indicator}set _marginLeft(t){this._indicator.style.marginLeft=t+"px"}},Y=class{constructor(t){this._tree=t,this._indicator=new P(t),document.body.addEventListener("mousemove",e=>this._move(e)),document.body.addEventListener("touchmove",e=>this._move(e)),document.body.addEventListener("mouseup",e=>this._up(e)),document.body.addEventListener("touchend",e=>this._up(e)),document.body.addEventListener("mouseleave",e=>this._up(e))}_down(t){this._target=t.currentTarget.parentNode.parentNode;let e=!1;this._tree._selection===this._target?e=!0:(this._tree._selection&&this._tree._selection.name.classList.remove(`${this._tree.prefixClassName}-select`),this._tree._selection=this._target,this._tree._selection.name.classList.add(`${this._tree.prefixClassName}-select`)),this._isDown={x:t.pageX,y:t.pageY,alreadySelected:e};let i=f(this._target);this._offset={x:t.pageX-i.x,y:t.pageY-i.y},this._tree.holdTime&&(this._holdTimeout=window.setTimeout(()=>this._hold(),this._tree.holdTime)),t.preventDefault(),t.stopPropagation()}_hold(){this._holdTimeout=null,this._tree.edit(this._target)}_checkThreshold(t){return this._tree.move?this._moving?!0:lt(this._isDown.x,this._isDown.y,t.pageX,t.pageY)?(this._moving=!0,this._pickup(),!0):!1:!1}_pickup(){this._holdTimeout&&(window.clearTimeout(this._holdTimeout),this._holdTimeout=null),this._tree.emit("move-pending",this._target,this._tree);let t=this._target.parentNode;t.insertBefore(this._indicator.get(),this._target);let e=f(this._target);document.body.appendChild(this._target),this._old={opacity:this._target.style.opacity||"unset",position:this._target.style.position||"unset",boxShadow:this._target.name.style.boxShadow||"unset"},this._target.style.position="absolute",this._target.name.style.boxShadow="3px 3px 5px rgba(0,0,0,0.25)",this._target.style.left=e.x+"px",this._target.style.top=e.y+"px",this._target.style.opacity=this._tree.dragOpacity,this._tree._getChildren(t,!0).length===0&&this._tree._hideIcon(t)}_findClosest(t,e){let i=f(e.name);if(i.y+e.name.offsetHeight/2<=t.pageY){if(!this._closest.foundAbove)if(A(t.pageX,t.pageY,e.name))this._closest.foundAbove=!0,this._closest.above=e;else{let n=D(t.pageX,t.pageY,e.name);n<this._closest.distanceAbove&&(this._closest.distanceAbove=n,this._closest.above=e)}}else if(!this._closest.foundBelow)if(A(t.pageX,t.pageY,e.name))this._closest.foundBelow=!0,this._closest.below=e;else{let n=D(t.pageX,t.pageY,e.name);n<this._closest.distanceBelow&&(this._closest.distanceBelow=n,this._closest.below=e)}for(let n of this._tree._getChildren(e))this._findClosest(t,n)}_move(t){if(this._target&&this._checkThreshold(t)){let e=this._tree.element,i=this._indicator.get(),n=this._tree.indentation;i.remove(),this._target.style.left=t.pageX-this._offset.x+"px",this._target.style.top=t.pageY-this._offset.y+"px";let o=f(this._target.name).x;this._closest={distanceAbove:Infinity,distanceBelow:Infinity};for(let r of this._tree._getChildren())this._findClosest(t,r);if(!this._closest.above&&!this._closest.below)e.appendChild(i);else if(!this._closest.above)e.insertBefore(i,this._tree._getFirstChild(e));else if(this._closest.below)if(this._closest.below.parentNode===this._closest.above)this._closest.above.insertBefore(i,this._closest.below);else if(this._closest.below.parentNode===this._closest.above.parentNode){let r=f(this._closest.above.name);o>r.x+n?this._closest.above.insertBefore(i,this._tree._getLastChild(this._closest.above,!0)):this._closest.above.parentNode.insertBefore(i,this._closest.below)}else{let r=f(this._closest.above.name);if(o>r.x+n)this._closest.above.insertBefore(i,this._tree._getLastChild(this._closest.above,!0));else if(o>r.x-n)this._closest.above.parentNode.appendChild(i);else if(o<f(this._closest.below.name).x)this._closest.below.parentNode.insertBefore(i,this._closest.below);else{let l=this._closest.above;for(;l.parentNode!==this._closest.below.parentNode&&o<r.x;)l=this._tree._getParent(l),r=f(l.name);l.appendChild(i)}}else{let r=f(this._closest.above.name);if(o>r.x+n)this._closest.above.insertBefore(i,this._tree._getFirstChild(this._closest.above,!0));else if(o>r.x-n)this._closest.above.parentNode.appendChild(i);else{let l=this._closest.above;for(;l!==e&&o<r.x;)l=this._tree._getParent(l),l!==e&&(r=f(l.name));l.appendChild(i)}}}}_up(t){if(this._target){if(!this._moving)this._tree.expandOnClick&&(!this._tree.select||this._isDown.alreadySelected)&&this._tree.toggleExpand(this._target),this._tree.emit("clicked",this._target,t,this._tree);else{let e=this._indicator.get();e.parentNode.insertBefore(this._target,e),this._tree.expand(e.parentNode),this._tree._showIcon(e.parentNode),this._target.style.position=this._old.position==="unset"?"":this._old.position,this._target.name.style.boxShadow=this._old.boxShadow==="unset"?"":this._old.boxShadow,this._target.style.opacity=this._old.opacity==="unset"?"":this._old.opacity,e.remove(),this._moveData(),this._tree.emit("move",this._target,this._tree),this._tree.emit("update",this._target,this._tree)}this._holdTimeout&&(window.clearTimeout(this._holdTimeout),this._holdTimeout=null),this._target=this._moving=null}}_moveData(){this._target.data.parent.children.splice(this._target.data.parent.children.indexOf(this._target.data),1),this._target.parentNode.data.children.splice(ct(this._target.parentNode,this._target),0,this._target.data),this._target.data.parent=this._target.parentNode.data}_indicatorMarginLeft(t){this._indicator.marginLeft=t}},dt={move:!0,select:!0,indentation:20,threshold:10,holdTime:1e3,expandOnClick:!0,dragOpacity:.75,prefixClassName:"yy-tree",cursorName:"grab -webkit-grab pointer",cursorExpand:"pointer"},ut={nameStyles:{padding:"0.5em 1em",margin:"0.1em",background:"rgb(230,230,230)","user-select":"none",cursor:"pointer",width:"100px"},indicatorStyles:{background:"rgb(150,150,255)",height:"5px",width:"100px",padding:"0 1em"},contentStyles:{display:"flex","align-items":"center"},expandStyles:{width:"15px",height:"15px"},selectStyles:{background:"rgb(200, 200, 200)"}},y={closed:'<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="closed" x="0" y="0" width="100" height="100" style="fill:none;"/><rect x="10" y="10" width="80" height="80" style="fill:none;stroke:#000;stroke-width:2px;"/><path d="M25,50l50,0" style="fill:none;stroke:#000;stroke-width:2px;"/><path d="M50,75l0,-50" style="fill:none;stroke:#000;stroke-width:2px;"/></svg>',open:'<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="open" x="0" y="0" width="100" height="100" style="fill:none;"/><rect x="10" y="10" width="80" height="80" style="fill:none;stroke:#000;stroke-width:2px;"/><path d="M25,50l50,0" style="fill:none;stroke:#000;stroke-width:2px;"/></svg>'},X=class extends ft.default{constructor(t,e,i){super();this._options=G(e,dt),this._input=new Y(this),typeof this._options.element=="undefined"?this.element=document.createElement("div"):this.element=B(this._options.element),this._options.parent&&B(this._options.parent).appendChild(this.element),this.element.classList.add(this.prefixClassName),this.element.data=t,this._options.addStyles!==!1&&this._addStyles(i),this.update()}get selection(){return this._selection.data}set selection(t){}get prefixClassName(){return this._options.prefixClassName}set prefixClassName(t){t!==this._options.prefixClassName&&(this._options.prefixClassName=t,this.update())}get indentation(){return this._options.indentation}set indentation(t){t!==this._options.indentation&&(this._options.indentation=t,this._input._indicatorMarginLeft=t+"px",this.update())}get holdTime(){return this._options.holdTime}set holdTime(t){t!==this._options.holdTime&&(this._options.holdTime=t)}get move(){return this._options.move}set move(t){this._options.move=t}get expandOnClick(){return this._options.expandOnClick}set expandOnClick(t){this._options.expandOnClick=t}get select(){return this._options.select}set select(t){this._options.select=t}get dragOpacity(){return this._options.dragOpacity}set dragOpacity(t){this._options.dragOpacity=t}_leaf(t,e){let i=p({className:`${this.prefixClassName}-leaf`});i.isLeaf=!0,i.data=t,i.content=p({parent:i,className:`${this.prefixClassName}-content`}),i.style.marginLeft=this.indentation+"px",i.icon=p({parent:i.content,html:t.expanded?y.open:y.closed,className:`${this.prefixClassName}-expand`}),i.name=p({parent:i.content,html:t.name,className:`${this.prefixClassName}-name`}),i.name.addEventListener("mousedown",n=>this._input._down(n)),i.name.addEventListener("touchstart",n=>this._input._down(n));for(let n of t.children){let o=this._leaf(n,e+1);o.data.parent=t,i.appendChild(o),t.expanded||(o.style.display="none")}return this._getChildren(i,!0).length===0&&this._hideIcon(i),pt.default(i.icon,()=>this.toggleExpand(i)),this.emit("render",i,this),i}_getChildren(t,e){t=t||this.element;let i=[];for(let n of t.children)n.isLeaf&&(e||n.style.display!=="none")&&i.push(n);return i}_hideIcon(t){t.isLeaf&&(t.icon.style.opacity=0,t.icon.style.cursor="unset")}_showIcon(t){t.isLeaf&&(t.icon.style.opacity=1,t.icon.style.cursor=this._options.cursorExpand)}expandAll(){this._expandChildren(this.element)}_expandChildren(t){for(let e of this._getChildren(t,!0))this.expand(e),this._expandChildren(e)}collapseAll(){this._collapseChildren(this)}_collapseChildren(t){for(let e of this._getChildren(t,!0))this.collapse(e),this._collapseChildren(e)}toggleExpand(t){t.icon.style.opacity!=="0"&&(t.data.expanded?this.collapse(t):this.expand(t))}expand(t){if(t.isLeaf){let e=this._getChildren(t,!0);if(e.length){for(let i of e)i.style.display="block";t.data.expanded=!0,t.icon.innerHTML=y.open,this.emit("expand",t,this),this.emit("update",t,this)}}}collapse(t){if(t.isLeaf){let e=this._getChildren(t,!0);if(e.length){for(let i of e)i.style.display="none";t.data.expanded=!1,t.icon.innerHTML=y.closed,this.emit("collapse",t,this),this.emit("update",t,this)}}}update(){let t=this.element.scrollTop;ht(this.element);for(let e of this.element.data.children){let i=this._leaf(e,0);i.data.parent=this.element.data,this.element.appendChild(i)}this.element.scrollTop=t+"px"}editData(t){let e=this._getChildren(null,!0);for(let i of e)i.data===t&&this.edit(i)}edit(t){this._editing=t,this._editInput=p({parent:this._editing.name.parentNode,type:"input",className:`${this.prefixClassName}-name`});let e=window.getComputedStyle(this._editing.name);this._editInput.style.boxSizing="content-box",this._editInput.style.fontFamily=e.getPropertyValue("font-family"),this._editInput.style.fontSize=e.getPropertyValue("font-size"),this._editInput.value=this._editing.name.innerText,this._editInput.setSelectionRange(0,this._editInput.value.length),this._editInput.focus(),this._editInput.addEventListener("update",()=>{this.nameChange(this._editing,this._editInput.value),this._holdClose()}),this._editInput.addEventListener("keyup",i=>{i.code==="Escape"&&this._holdClose(),i.code==="Enter"&&(this.nameChange(this._editing,this._editInput.value),this._holdClose())}),this._editing.name.style.display="none",this._target=null}_holdClose(){this._editing&&(this._editInput.remove(),this._editing.name.style.display="block",this._editing=this._editInput=null)}nameChange(t,e){t.data.name=this._input.value,t.name.innerHTML=e,this.emit("name-change",t,this._input.value,this),this.emit("update",t,this)}getLeaf(t,e=this.element){this.findInTree(e,i=>i===t)}findInTree(t,e){for(let i of t.children){if(e(i))return i;let n=this.findInTree(i,e);if(n)return n}}_getFirstChild(t,e){let i=this._getChildren(t,e);if(i.length)return i[0]}_getLastChild(t,e){let i=this._getChildren(t,e);if(i.length)return i[i.length-1]}_getParent(t){for(t=t.parentNode;t.style.display==="none";)t=t.parentNode;return t}_addStyles(t){let e=G(t,ut),i=`.${this.prefixClassName}-name{`;for(let o in e.nameStyles)i+=`${o}:${e.nameStyles[o]};`;i+=`}.${this.prefixClassName}-content{`;for(let o in e.contentStyles)i+=`${o}:${e.contentStyles[o]};`;i+=`}.${this.prefixClassName}-indicator{`;for(let o in e.indicatorStyles)i+=`${o}:${e.indicatorStyles[o]};`;i+=`}.${this.prefixClassName}-expand{`;for(let o in e.expandStyles)i+=`${o}:${e.expandStyles[o]};`;i+=`}.${this.prefixClassName}-select{`;for(let o in e.selectStyles)i+=`${o}:${e.selectStyles[o]};`;i+"";let n=document.createElement("style");n.innerHTML=i,document.head.appendChild(n)}},Mt={children:[{name:"fruits",children:[{name:"apples",children:[]},{name:"oranges",children:[{name:"tangerines",children:[]},{name:"mandarins",children:[]},{name:"pomelo",children:[]},{name:"blood orange",children:[]}]}]},{name:"vegetables",children:[{name:"brocolli",children:[]}]}]};function Ot(){let s=new X(Mt,{parent:document.body});s.expandAll()}window.onload=function(){Ot(),mt.default("https://github.com/davidfig/tree")};})();
