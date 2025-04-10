"use strict";const t=Object.prototype.toString;function e(e){return"Undefined"==function(e){return t.call(e).slice(8,-1)}(e)}function r(t,e=2){let r=Number(t);return isNaN(r)?NaN:((0===(e=parseInt(String(e)))||e)&&(r=+r.toFixed(e)),r)}function n(t,e="{y}-{m}-{d} {h}:{i}:{s}"){if(0===arguments.length||!t)return null;let r;"object"==typeof t?r=t:("string"==typeof t&&(t=/^[0-9]+$/.test(t)?parseInt(t):t.replace(new RegExp(/-/gm),"/")),"number"==typeof t&&10===t.toString().length&&(t*=1e3),r=new Date(t));const n={y:r.getFullYear(),m:r.getMonth()+1,d:r.getDate(),h:r.getHours(),i:r.getMinutes(),s:r.getSeconds(),a:r.getDay()};return e.replace(/{([ymdhisa])+}/g,((t,e)=>{const r=n[e];return"a"===e?["日","一","二","三","四","五","六"][r]:r.toString().padStart(2,"0")}))}class o{constructor({prefix:t="",storageType:e="local"}){this.prefix=t,this.storage="local"==e?localStorage:sessionStorage}getKey(t){return`${this.prefix}-${t}`}setItem(t,e,r){const n=this.getKey(t),o={value:e,expired:r?Date.now()+r:void 0};this.storage.setItem(n,JSON.stringify(o))}getItem(t,e){const r=this.getKey(t),n=this.storage.getItem(r);if(!n)return e;try{const t=JSON.parse(n);return t.expired&&Date.now()>t.expired?(this.storage.removeItem(r),e):t.value}catch(t){return console.error(t),this.storage.removeItem(r),e}}removeItem(t){const e=this.getKey(t);this.storage.removeItem(e)}clear(){const t=[];for(let e=0;e<this.storage.length;e++){const r=this.storage.key(e);r&&r.startsWith(this.prefix)&&t.push(r)}t.forEach((t=>this.storage.removeItem(t)))}}exports.StorageClient=o,exports.createLocalStorage=function(t){return new o({prefix:t,storageType:"local"})},exports.createSessionStorage=function(t){return new o({prefix:t,storageType:"session"})},exports.formatNumberThousands=function(t,n=void 0){let o=t;if(function(t){return!e(t)}(n)&&(o=r(t,n),isNaN(o)))return NaN;let s=o.toString().split(".");return s[0]=s[0].replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),s.join(".")},exports.formatNumberToPrecise=r,exports.generateDatefrom=function(t,e=90){const r=t?new Date(t).getTime():(new Date).getTime();return new Date(r-864e5*e)},exports.getPercentWithPrecision=function(t,e=2){if(Array.isArray(t)){for(var r=[],n=Math.pow(10,e),o=100*n,s=0,i=0;i<t.length;i++)s+=isNaN(t[i])?0:t[i];var a=[];for(i=0;i<t.length;i++)a.push(t[i]/s*n*100);var c=[],u=[],g=0;for(i=0;i<a.length;i++){var p=Math.floor(a[i]);c.push(p),u.push(a[i]-p),g+=p}for(;g<o;){var l=Number.MIN_SAFE_INTEGER,f=null;for(i=0;i<u.length;i++)u[i]>l&&(l=u[i],f=i);u[f]=0,++g,++c[f]}for(i=0;i<c.length;i++)r.push(c[i]/n);return r}},exports.listMonths=function(t,e){const r=n(t,"{y}-{m}"),o=n(e,"{y}-{m}");if(!r||!o)return[];const s=t=>{const[e,r]=t.split("-").map(Number);return new Date(e,r-1,1)};let i=s(r),a=s(o);i>a&&([i,a]=[a,i]);const c=[],u=new Date(i);for(;u<=a;){const t=u.getFullYear(),e=(u.getMonth()+1).toString().padStart(2,"0");c.push(`${t}-${e}`),u.setMonth(u.getMonth()+1)}return c},exports.obj2UrlParam=function(t,e=[],r=!1){const n=[];Object.keys(t).forEach((r=>{-1==e.indexOf(r)&&n.push(`${r}=${t[r]}`)}));const o=n.join("&");return r?decodeURIComponent(o):o},exports.param2Obj=function(t){const e=decodeURIComponent(t.split("?")[1]);if(!e)return{};const r={};return e.split("&").forEach((function(t){const e=t.indexOf("=");if(-1!==e){const n=t.substring(0,e),o=t.substring(e+1,t.length);r[n]=o}})),r},exports.parseTime=n;
//# sourceMappingURL=index.js.map
