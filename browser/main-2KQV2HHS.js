import{o as v}from"./chunk-Y3WOYTIU.js";import{a as A}from"./chunk-RVXGOUE5.js";import{$a as d,B as r,E as n,G as m,H as i,_a as c,bb as l,cb as f,eb as h,fb as M,hb as p,jb as g,ka as s,la as a,ma as u}from"./chunk-EDIASGHK.js";import"./chunk-5FZOKLP6.js";var C=(t,b)=>{let e=n(g),o=n(M);return e.isAuthenticated()?!0:(o.navigate(["/auth/login"]),!1)};var _=[{path:"auth",loadChildren:()=>import("./chunk-MEHVDZWF.js").then(t=>t.AuthModule)},{path:"",loadChildren:()=>import("./chunk-K42FSXS6.js").then(t=>t.CoreModule),canActivate:[C]}],N=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t})}static{this.\u0275inj=r({imports:[p.forRoot(_),p]})}}return t})();var w=(()=>{class t{constructor(){this.title="front-end"}static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=m({type:t,selectors:[["app-root"]],decls:2,vars:0,consts:[[1,"container"]],template:function(o,j){o&1&&(s(0,"div",0),u(1,"router-outlet"),a())},dependencies:[h]})}}return t})();var R=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t,bootstrap:[w]})}static{this.\u0275inj=r({providers:[c(d([A]))],imports:[f,N,v]})}}return t})();l().bootstrapModule(R).catch(t=>console.error(t));
