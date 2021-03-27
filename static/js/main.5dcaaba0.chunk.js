(this.webpackJsonphangtimer=this.webpackJsonphangtimer||[]).push([[0],{11:function(t,e,n){},13:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var i=n(1),a=n.n(i),s=n(6),c=n.n(s),r=(n(11),n(12),n(13),n(2)),u={label:"Hang Time",initialValue:7},l={label:"Pause Time",initialValue:3},o={label:"Reps",initialValue:5},h={label:"Rest Time",initialValue:180},b={label:"Sets",initialValue:6},m=n(0),j=function(t){var e=t.id,n=t.label,i=t.value,a=t.onChange,s="".concat("hangtimer","_").concat(e);return Object(m.jsxs)("div",{className:"col-lg-12",children:[Object(m.jsx)("label",{className:"form-label",htmlFor:s,children:n}),Object(m.jsx)("input",{className:"form-control",type:"text",id:s,value:i,onChange:function(t){return a(t.target.value)}})]})},d=function(t){var e=t.onStart,n=Object(i.useState)(u.initialValue),a=Object(r.a)(n,2),s=a[0],c=a[1],d=Object(i.useState)(l.initialValue),f=Object(r.a)(d,2),v=f[0],O=f[1],S=Object(i.useState)(o.initialValue),g=Object(r.a)(S,2),p=g[0],x=g[1],E=Object(i.useState)(h.initialValue),T=Object(r.a)(E,2),y=T[0],R=T[1],N=Object(i.useState)(b.initialValue),k=Object(r.a)(N,2),_=k[0],C=k[1];return Object(m.jsxs)("form",{id:"timerform",className:"row g-3",onSubmit:function(t){t.preventDefault(),e({hangTime:s,pauseTime:v,reps:p,restTime:y,sets:_})},onReset:function(){c(u.initialValue),O(l.initialValue),x(o.initialValue),R(h.initialValue),C(b.initialValue)},children:[Object(m.jsx)(j,{id:"hang_time",label:u.label,value:s,onChange:function(t){return c(t)}}),Object(m.jsx)(j,{id:"pause_time",label:l.label,value:v,onChange:function(t){return O(t)}}),Object(m.jsx)(j,{id:"reps",label:o.label,value:p,onChange:function(t){return x(t)}}),Object(m.jsx)(j,{id:"restTime",label:h.label,value:y,onChange:function(t){return R(t)}}),Object(m.jsx)(j,{id:"reps",label:b.label,value:_,onChange:function(t){return C(t)}}),Object(m.jsxs)("div",{className:"col-md-12",children:[Object(m.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Start"}),Object(m.jsx)("button",{type:"reset",className:"btn btn-outline-secondary ms-3",children:"Reset"})]})]})},f=n(3),v=n(4),O=function(){function t(){Object(f.a)(this,t),this.handlers={}}return Object(v.a)(t,[{key:"on",value:function(t,e){return t in this.handlers?this.handlers[t].push(e):this.handlers[t]=[e],this}},{key:"off",value:function(t,e){if(t in this.handlers){var n=this.handlers[t].indexOf(e);n>=0&&this.handlers[t].splice(n,1)}return this}},{key:"emit",value:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];return t in this.handlers&&this.handlers[t].forEach((function(t){t.apply(void 0,n)})),this}},{key:"clear",value:function(t){return t?delete this.handlers[t]:this.handlers={},this}}]),t}(),S="start",g="tick",p=function(){function t(e){Object(f.a)(this,t),this.startTime=e,this.remaining=e,this._running=!1,this.eventEmitter=new O}return Object(v.a)(t,[{key:"start",value:function(){var t=this;this.tid=setInterval((function(){t.remaining=Math.max(0,t.remaining-.1),t.eventEmitter.emit(g),0===t.remaining&&(t.eventEmitter.emit("end"),t.stop())}),100),this.eventEmitter.emit(S),this._running=!0}},{key:"stop",value:function(){clearInterval(this.tid),this._running=!1}},{key:"reset",value:function(){this.remaining=this.startTime}},{key:"restart",value:function(){this.reset(),this.start()}},{key:"isRunning",value:function(){return this._running}}]),t}();p.Events={START:S,END:"end",TICK:g};var x="READY",E="state",T=function(){function t(e){var n=this;Object(f.a)(this,t),this.events=new O,this.tStart=new p(2),this.tHang=new p(e.hangTime),this.tPause=new p(e.pauseTime),this.tRest=new p(e.restTime),this.maxReps=e.reps,this.maxSets=e.sets,this.state={action:"-",time:e.hangTime,nRep:1,nSet:1},this._didStart=!1,this._didFinish=!1,this.events.on("action",(function(t){n._action=t})).on("time",(function(t){n._time=t})),this.tStart.eventEmitter.on(p.Events.START,(function(){n.setState((function(t){t.action=x}))})).on(p.Events.END,(function(){n.tHang.restart()})).on(p.Events.TICK,(function(){n.setState((function(t){t.time=n.tStart.remaining}))})),this.tHang.eventEmitter.on(p.Events.START,(function(){n.setState((function(t){t.action="HANG"}))})).on(p.Events.END,(function(){n.state.nRep<n.maxReps?n.tPause.restart():n.state.nSet<n.maxSets?n.tRest.restart():(n._didFinish=!0,n.setState((function(t){t.action="DONE"})))})).on(p.Events.TICK,(function(){n.setState((function(t){t.time=n.tHang.remaining}))})),this.tPause.eventEmitter.on(p.Events.START,(function(){n.setState((function(t){t.action="PAUSE"}))})).on(p.Events.END,(function(){n.state.nRep<n.maxReps&&(n.setState((function(t){t.nRep++})),n.tHang.restart())})).on(p.Events.TICK,(function(){n.setState((function(t){t.time=n.tPause.remaining}))})),this.tRest.eventEmitter.on(p.Events.START,(function(){n.setState((function(t){t.action="REST"}))})).on(p.Events.END,(function(){n.state.nSet<n.maxSets&&(n.setState((function(t){t.nSet++,t.nRep=1})),n.tHang.restart())})).on(p.Events.TICK,(function(){n.setState((function(t){t.time=n.tRest.remaining}))}))}return Object(v.a)(t,[{key:"_emitState",value:function(){this.events.emit(E,this.state)}},{key:"setState",value:function(t){t(this.state),this._emitState(this.state)}},{key:"isRunning",value:function(){return this._didStart&&!this._didFinish}},{key:"didFinish",value:function(){return this._didFinish}},{key:"getState",value:function(){return this.state}},{key:"start",value:function(){this.action=x,this._didStart=!0,this.tStart.start()}},{key:"stop",value:function(){this.tStart.stop(),this.tHang.stop(),this.tPause.stop(),this.tRest.stop()}},{key:"reset",value:function(){this.stop()}}]),t}();T.Events={STATE_UPDATE:E};n(15);var y=function(t){var e=t.setup,n=t.onBack,a=Object(i.useState)("-"),s=Object(r.a)(a,2),c=s[0],u=s[1],l=Object(i.useState)(e.hangTime),o=Object(r.a)(l,2),h=o[0],b=o[1],j=Object(i.useState)(1),d=Object(r.a)(j,2),f=d[0],v=d[1],O=Object(i.useState)(1),S=Object(r.a)(O,2),g=S[0],p=S[1],x=Object(i.useState)(null),E=Object(r.a)(x,2),y=E[0],R=E[1];Object(i.useEffect)((function(){var t=new T(e);return t.events.on(T.Events.STATE_UPDATE,(function(t){u(t.action),b(t.time),v(t.nRep),p(t.nSet)})),R(t),function(){t.reset()}}),[e]);var N;return Object(m.jsxs)("div",{className:"row text-center timer_view",children:[Object(m.jsx)("div",{className:"col-12 display-1 action_text action_".concat(c.toLowerCase()),children:c}),Object(m.jsx)("div",{className:"col-12 display-1 my-3 action_time",children:(N=h,(+N).toFixed(1))}),Object(m.jsxs)("div",{className:"col-6",children:[Object(m.jsx)("div",{children:"REPS"}),Object(m.jsxs)("div",{children:[f," / ",e.reps]})]}),Object(m.jsxs)("div",{className:"col-6",children:[Object(m.jsx)("div",{children:"SETS"}),Object(m.jsxs)("div",{children:[g," / ",e.sets]})]}),y&&!y.isRunning()&&Object(m.jsx)("div",{className:"col-6 offset-3 mt-4",children:Object(m.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){y&&y.start()},children:"START"})}),Object(m.jsx)("div",{className:"col-6 offset-3 ".concat(y&&!y.isRunning()?"mt-3":"mt-4"),children:Object(m.jsx)("button",{type:"button",className:"btn btn-danger",onClick:n,children:"BACK"})})]})},R=function(){var t=Object(i.useState)(null),e=Object(r.a)(t,2),n=e[0],a=e[1];return n?Object(m.jsx)(y,{setup:n,onBack:function(){return a(null)}}):Object(m.jsx)(d,{onStart:function(t){return a(t)}})};var N=function(){return Object(m.jsxs)("div",{className:"App",children:[Object(m.jsx)("nav",{className:"navbar navbar-expand-sm navbar-dark bg-dark",children:Object(m.jsx)("div",{className:"container-fluid px-3",children:Object(m.jsx)("a",{href:"/",className:"navbar-brand my-2 h1",children:"Hangtimer"})})}),Object(m.jsx)("main",{className:"container mt-5",children:Object(m.jsx)(R,{})})]})},k=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(e){var n=e.getCLS,i=e.getFID,a=e.getFCP,s=e.getLCP,c=e.getTTFB;n(t),i(t),a(t),s(t),c(t)}))};c.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(N,{})}),document.getElementById("root")),k()}},[[16,1,2]]]);
//# sourceMappingURL=main.5dcaaba0.chunk.js.map