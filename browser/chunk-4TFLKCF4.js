import{A as h,D as a,Za as p,c as n,g as r,ib as c,o as s,x as o}from"./chunk-EDIASGHK.js";var f=(()=>{class e{constructor(t){this._http=t,this._env=c,this._quizzes=new n([]),this._quiz=new n(null)}get quizzes$(){return this._quizzes.asObservable()}get quiz$(){return this._quiz.asObservable()}set quiz(t){this._quiz.next(t)}index(){return this._http.get(`${this._env.url}/api/activities`).pipe(o(t=>this._quizzes.next(t)),s(t=>(console.error(t),r(t))))}show(t){return this._http.get(`${this._env.url}/api/activities/${t}`).pipe(o(i=>this._quiz.next(i)),s(i=>(console.error(i),r(i))))}submit(t,i,l){return this._http.post(`${this._env.url}/api/activities/submit/${t}`,{answers:i,duration:l}).pipe(s(u=>(console.error(u),r(u))))}static{this.\u0275fac=function(i){return new(i||e)(a(p))}}static{this.\u0275prov=h({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{f as a};
