(this.webpackJsonpwordbattle=this.webpackJsonpwordbattle||[]).push([[0],{115:function(e,t,n){},147:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(24),r=n.n(a),o=n(5),s=n(17),i=n(70),u=(n(83),n(71)),j=n(3),l="ASSIGN_CREATOR",b="ACCEPT_REQUEST",m="MUSIC_STATUS",d="LEAVE_ROOM",O="START_GAME",f="END_GAME",h="GET_ROOM",p="CONNECTED_PLAYERS",g="JOIN_ROOM_REQUEST",x="JOIN_ROOM_SUCCESS",v="JOIN_ROOM_FAILURE",y="STOP_GAME_MUSIC",S=(n(43),{room:null,gameStatus:"ended",stopMusic:!1});var R=Object(s.combineReducers)({gameReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:return Object(j.a)(Object(j.a)({},e),{},{joinLoading:!0});case x:return Object(j.a)(Object(j.a)({},e),{},{joinLoading:!1,room:t.room});case d:return Object(j.a)(Object(j.a)({},e),{},{room:null});case h:return Object(j.a)(Object(j.a)({},e),{},{room:t.room});case O:return Object(j.a)(Object(j.a)({},e),{},{gameStatus:t.gameStatus});case l:return Object(j.a)(Object(j.a)({},e),{},{creator:t.creator,acceptRequest:t.acceptRequest});case b:return Object(j.a)(Object(j.a)({},e),{},{acceptRequest:t.acceptRequest});case f:return Object(j.a)(Object(j.a)({},e),{},{gameStatus:t.gameStatus});case p:return Object(j.a)(Object(j.a)({},e),{},{connectedPlayers:t.count});case m:return Object(j.a)(Object(j.a)({},e),{},{musicStatus:t.musicStatus});case y:return Object(j.a)(Object(j.a)({},e),{},{stopMusic:t.value});default:return e}}}),w=Object(s.createStore)(R,Object(u.composeWithDevTools)(Object(s.applyMiddleware)(i.a))),E=(n(85),n(2)),N={acceptRequest:function(){return function(e){e({type:b,acceptRequest:!0})}},startGame:function(){return function(e){e({type:O,gameStatus:"started"})}},endGame:function(){return function(e){e({type:f,gameStatus:"ended"})}},prepareToStart:function(e,t){return function(n){e.emit("prepareToStart",{room:t}),n({type:l,creator:!0})}},setMusicStatus:function(e){return function(t){t(function(e){return{type:m,musicStatus:e}}(e))}},getRoom:function(){return function(e){localStorage.getItem("room"),e((room,{type:d,room:room}))}},joinRoom:function(e,t,n,c){return function(a){a({type:g}),e.emit("joinRoom",{playername:t,room:n,creator:c},(function(e){"ok"===e.status&&(a(function(e){return{type:x,room:e}}(n)),localStorage.setItem("room",n))}))}},leaveRoom:function(e,t){return function(n){e.emit("leaveRoom",t),localStorage.setItem("room",null),n({type:d,room:null})}},saveConnectedPlayers:function(e){return function(t){localStorage.setItem("connected-players",e),t(function(e){return{type:p,count:e}}(e))}},getConnectedPlayers:function(){return function(e){var t;e((t=localStorage.getItem("connected-players"),{type:p,count:t}))}},stopGameplayMusic:function(e){return function(t){t(function(e){return{type:y,value:e}}(e))}}};var k=n(72),T=n.n(k),C=(n(115),n(34)),F=n.n(C),I=n(0),M=function(e){var t=e.letters,n=e.isLettersEmpty;return Object(I.jsxs)("div",{className:"board-container",children:[Object(I.jsxs)("p",{children:[" ","Type letters on your keyboard and press ",Object(I.jsx)("strong",{children:"ENTER"})," to submit each word you form"]}),Object(I.jsx)("p",{children:"Form as many words as possible from your word deck"}),Object(I.jsx)("div",{className:"letter-container",children:n?Object(I.jsx)(I.Fragment,{children:Object(I.jsx)("h1",{children:"Start Typing"})}):Object(I.jsx)(I.Fragment,{children:t.map((function(e){return Object(I.jsx)("div",{className:"deck-letter board-letter",children:Object(I.jsx)("h1",{children:e.toUpperCase()})},F()())}))})})]})},A=n(73),G=n(6),q=n(74),B=n.n(q),_=n.p+"static/media/logo.d0544f13.png",L=n(18),P=n.n(L),W=function(){var e=Object(c.useState)(!1),t=Object(E.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(1),o=Object(E.a)(r,2),s=o[0],i=o[1];return Object(c.useEffect)((function(){setTimeout((function(){a(!0),setTimeout((function(){a(!1),setTimeout((function(){i(2)}),200)}),1900)}),100)}),[s]),Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)(P.a,{children:[Object(I.jsx)("title",{children:"Cleaning more battle helmets..."}),Object(I.jsx)("meta",{name:"Word Battle",content:"You have 90 seconds to compete in a room."})]}),Object(I.jsx)("div",{className:"splash-bg",children:1==s?Object(I.jsx)("img",{className:n?"fadeIn logo":"fadeOut logo",src:_}):Object(I.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(I.jsx)("p",{className:n?"fadeIn":"fadeOut",style:{color:"white"},children:"by Iyiola Owabumowa"})})})]})},D=function(){return Object(I.jsx)("div",{className:"splash-bg",children:Object(I.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(I.jsx)("p",{style:{color:"white",padding:50,textAlign:"center",lineHeight:2},children:"Sorry, Word Battle doesn't work on mobile phones at the moment."})})})},U=function(e){var t=e.socket,n=(e.fade,e.gameplayMusic,Object(o.b)()),a=(Object(G.f)(),Object(c.useState)("")),r=Object(E.a)(a,2),s=r[0],i=r[1],u=Object(c.useState)(""),j=Object(E.a)(u,2),l=j[0],b=j[1],m=Object(c.useState)(null),d=Object(E.a)(m,2),O=d[0],f=d[1],h=Object(c.useState)(!1),p=Object(E.a)(h,2),g=p[0],x=p[1],v=Object(c.useState)(!1),y=Object(E.a)(v,2),S=y[0],R=y[1],w=Object(c.useState)(5),k=Object(E.a)(w,2),T=(k[0],k[1],Object(c.useState)(null)),C=Object(E.a)(T,2),F=C[0],M=C[1],q=Object(c.useState)("warmup"),_=Object(E.a)(q,2),L=_[0],U=_[1],J=Object(c.useState)(!0),Y=Object(E.a)(J,2),H=Y[0],Q=Y[1],z=Object(c.useState)(!1),V=Object(E.a)(z,2),K=V[0],X=V[1],Z=Object(o.c)((function(e){return e.gameReducer.connectedPlayers})),$=Object(o.c)((function(e){return e.gameReducer.room})),ee=Object(o.c)((function(e){return e.gameReducer.gameStatus}));return Object(c.useEffect)((function(){setTimeout((function(){Q(!1),setTimeout((function(){A.isMobile?R(!0):X(!0)}),200)}),5e3);var e=function(e){n(N.startGame())},c=function(e){M(e),x(!1)},a=function(e){M(e),x(!1)};return t.on("startGame",e),t.on("full-room",c),t.on("creator-not-here",a),function(){t.off("startGame",e),t.off("full-room",c),t.off("creator-not-here",a)}}),[]),Object(c.useEffect)((function(){console.log(Z)}),[Z]),H?Object(I.jsx)(W,{}):S?Object(I.jsx)(D,{}):Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)(P.a,{children:[Object(I.jsx)("title",{children:"started"===ee?"Battleground | Word Battle":"Changeroom | Word Battle"}),Object(I.jsx)("meta",{name:"Word Battle",content:"You have 90 seconds to compete in a room."})]}),Object(I.jsx)("div",{className:"warmup-container",children:Object(I.jsxs)("div",{className:K?"warmup-card-fadeIn":"warmup-card",children:[Object(I.jsx)("div",{className:F?"notifications-fadeIn":"notifications",children:Object(I.jsx)("p",{className:F?"notif-p":"notif-p-fadeOut",style:{color:"white"},children:F})}),Object(I.jsx)("div",{className:"warmup-padding",children:Object(I.jsxs)("div",{children:["warmup"===L&&Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)("h1",{children:["Howdy ",s.slice(0,20),"!"]}),Object(I.jsx)("p",{children:"What's the name you're most proud of?"}),Object(I.jsx)("input",{placeholder:"Enter your name",value:s,maxLength:20,onChange:function(e){e.target.value.length>1&&M(null),localStorage.setItem("name",e.target.value),i(e.target.value)}}),Object(I.jsx)("button",{onClick:function(){if(s.length>1){M(null),U("create");f(B.a.generate().substring(0,5)),f((function(e){return n(N.joinRoom(t,s,e,true)),e}))}else M("Enter a player name")},className:"start-btn",children:"Create Game Room"}),Object(I.jsx)("button",{onClick:function(){s.length>1?U("join"):M("Enter a player name")},className:"warmup-btn-inv",children:"Join Room"})]}),"create"===L&&Object(I.jsxs)(I.Fragment,{children:[Z-1==0||Z-1==-1?Object(I.jsx)("p",{children:"Waiting for players to join..."}):Object(I.jsx)(I.Fragment,{children:Z-1==1?Object(I.jsx)("p",{children:Object(I.jsxs)("strong",{children:[Z-1," player has joined this room"]})}):Object(I.jsx)("p",{children:Object(I.jsxs)("strong",{children:[Z-1," players have joined this room"]})})}),Object(I.jsx)("h1",{style:{marginTop:30},children:O}),Object(I.jsx)("p",{style:{textAlign:"center",lineHeight:2},children:"Share your room id with your friends to join this room and compete with you."}),Z-1>=1&&Object(I.jsx)("button",{onClick:function(){x(!0),n(N.prepareToStart(t,$))},className:"start-btn",children:g?Object(I.jsx)("div",{children:Object(I.jsxs)("div",{className:"lds-ring",children:[Object(I.jsx)("div",{}),Object(I.jsx)("div",{}),Object(I.jsx)("div",{}),Object(I.jsx)("div",{})]})}):"Start Game"}),Object(I.jsx)("button",{onClick:function(){M(null),U("warmup"),x(!1),n(N.leaveRoom(t,$))},className:"warmup-btn-inv",children:"Go Back"})]}),"join"===L&&Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)("h1",{children:"Enter with a room id"}),Object(I.jsx)("p",{style:{marginBottom:50,textAlign:"center"},children:Z-1>=1&&Object(I.jsx)("p",{children:"The room owner should start the game soon"})}),Object(I.jsx)("input",{placeholder:"Room ID",value:l,maxLength:5,onChange:function(e){5===e.target.value.length?M(null):M("Enter a valid room id"),b(e.target.value)}}),Object(I.jsx)("button",{onClick:function(){5===l.length?(x(!0),M("Waiting for room owner..."),n(N.joinRoom(t,s,l,!1))):M("Enter a valid room id")},disabled:g,className:"start-btn",children:g?Object(I.jsx)(I.Fragment,{children:Object(I.jsxs)("div",{className:"lds-ring",children:[Object(I.jsx)("div",{}),Object(I.jsx)("div",{}),Object(I.jsx)("div",{}),Object(I.jsx)("div",{})]})}):"Join Game"}),Object(I.jsx)("button",{onClick:function(){U("warmup"),M(null),x(!1),n(N.leaveRoom(t,$))},className:"warmup-btn-inv",children:"Go Back"})]})]})})]})})]})},J=n(19),Y=(n(129),function(e){var t=e.points,n=e.notification,c=e.time,a=e.opponent,r=Object(o.c)((function(e){return e.gameReducer.connectedPlayers}));return Object(I.jsx)("div",{className:"header",children:n?Object(I.jsx)("p",{children:Object(I.jsx)("strong",{children:n})}):Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)("p",{children:[Object(I.jsx)("strong",{children:"Time Left: "}),c," seconds"]}),Object(I.jsxs)("p",{children:[Object(I.jsx)("strong",{children:"Points: "}),t,"pts"]}),Object(I.jsxs)("p",{children:[Object(I.jsxs)("strong",{children:["You're competing with ",r-1," ",r-1==1?"player":"players"]}),a]})]})})}),H=function(e){var t=e.deck,n=e.letters;e.getOccurrence;return Object(I.jsx)("div",{className:"worddeck-container",children:null===t||void 0===t?void 0:t.map((function(e,t){return Object(I.jsx)("div",{className:" ".concat(n.includes(e.name)&&0===e.count?"deck-letter deck-letter-used":"deck-letter"),children:Object(I.jsx)("h1",{children:e.name.toUpperCase()})},F()())}))})},Q=n.p+"static/media/keypress.a5e4fef1.mp3",z=n.p+"static/media/right.297a1043.mp3",V=n.p+"static/media/wrong.c8c85237.mp3",K=function(e){var t=e.socket,n=e.gameplayMusic,a=Object(G.f)(),r=Object(o.b)(),s=Object(c.useState)([]),i=Object(E.a)(s,2),u=i[0],l=i[1],b=Object(c.useState)(!1),m=Object(E.a)(b,2),d=(m[0],m[1],Object(c.useState)([])),O=Object(E.a)(d,2),f=O[0],h=O[1],p=Object(c.useState)([]),g=Object(E.a)(p,2),x=g[0],v=g[1],y=Object(c.useState)(null),S=Object(E.a)(y,2),R=S[0],w=S[1],k=Object(c.useState)(null),T=Object(E.a)(k,2),C=T[0],F=T[1],A=Object(c.useState)(0),q=Object(E.a)(A,2),B=q[0],_=q[1],L=Object(c.useState)(null),P=Object(E.a)(L,2),W=P[0],D=(P[1],Object(c.useState)(!1)),U=Object(E.a)(D,2),K=(U[0],U[1],Object(o.c)((function(e){return e.gameReducer.room}))),X=Object(o.c)((function(e){return e.gameReducer.stopMusic}));Object(o.c)((function(e){return e.gameReducer.gameStatus}));function Z(e,t){var n=0;return e.forEach((function(e){return e===t&&n++})),n}return Object(c.useEffect)((function(){n.play()}),[]),Object(c.useEffect)((function(){var e=new Audio(z),n=new Audio(V);n.volume=.1,e.volume=.05,t.emit("readyToStart",K);var c=function(e){w(e),1==e&&(r(N.endGame()),a.push("/results"))},o=function(e){console.log("generated"),l(e)};return t.on("game-timer",c),t.on("getRoomDeck",o),t.on("answer",(function(t){var c=t.word,a=t.status;if(console.log(B),200==a){e.play(),h([].concat(Object(J.a)(f),[c])),_(B+5),v([]);for(var r=0;r<u.length;r++){var o=u;o[r]=Object(j.a)(Object(j.a)({},o[r]),{},{count:1}),l(Object(J.a)(o))}}else n.play()})),t.on("playerPoints",(function(e){console.log(e),_(e)})),function(){t.off("game-timer",c),t.on("getRoomDeck",o)}}),[]),Object(c.useEffect)((function(){var e=new Audio(Q),n=new Audio(z),c=new Audio(V);e.volume=.1,n.volume=.05,c.volume=.1;var a=function(n){var c=n.key;if(u.some((function(e){return e.name===c}))&&Z(x,c)<function(e,t){var n=0;return e.forEach((function(e){return e.name===t&&n++})),n}(u,c)){e.play().then((function(){})).catch((function(e){return console.error})),v([].concat(Object(J.a)(x),[c]));for(var a=0;a<u.length;a++){var r=u[a];if(r.name===c&&1===r.count){var o=u;o[a]=Object(j.a)(Object(j.a)({},o[a]),{},{count:0}),l(Object(J.a)(o));break}}}if("Enter"===c&&e.play().then((function(){})).catch((function(e){return console.error})),"Backspace"===c){for(var s=x,i=u.length-1;i>0;i--){var b=u[i];if(b.name===x[x.length-1]&&0===b.count){var m=u;m[i]=Object(j.a)(Object(j.a)({},m[i]),{},{count:1}),l(Object(J.a)(m));break}}s.pop(),v(Object(J.a)(s))}"Enter"===c&&function(){var e=function(){var e="";return x.forEach((function(t){return e+=t})),e}();f.includes(e)?(F("You've found this word already"),setTimeout((function(){F(null)}),3e3)):t.emit("checkWord",e)}()};return window.addEventListener("keydown",a),function(){window.removeEventListener("keydown",a)}}),[u,f,x,B,X]),Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(Y,{points:B,notification:C,time:R,opponent:W}),Object(I.jsx)(M,{letters:x,isLettersEmpty:0===x.length}),Object(I.jsx)(H,{deck:u,letters:x,getOccurrence:Z})]})},X=n(25),Z=function(e){var t=e.socket,n=(e.gameplayMusic,Object(G.f)()),a=Object(o.b)(),r=Object(c.useState)([]),s=Object(E.a)(r,2),i=s[0],u=s[1],j=Object(c.useState)(null),l=Object(E.a)(j,2),b=l[0],m=l[1],d=Object(c.useState)(!0),O=Object(E.a)(d,2),f=(O[0],O[1],Object(c.useState)(!1)),h=Object(E.a)(f,2),p=h[0],g=h[1],x=Object(c.useState)(!1),v=Object(E.a)(x,2),y=v[0],S=v[1],R=Object(c.useState)(!1),w=Object(E.a)(R,2),k=w[0],T=w[1],C=Object(c.useState)(!1),F=Object(E.a)(C,2),M=F[0],A=F[1],q=Object(o.c)((function(e){return e.gameReducer.gameStatus})),B=Object(o.c)((function(e){return e.gameReducer.room})),_=Object(o.c)((function(e){return e.gameReducer.creator}));Object(o.c)((function(e){return e.gameReducer.acceptRequest}));return Object(c.useEffect)((function(){t.emit("gameEnd",{room:B});var e=function(e){localStorage.setItem("results",JSON.stringify(e)),u(e),a(N.acceptRequest())},n=function(e){e>1?(S(!0),m("".concat(e," players have requested a rematch"))):null==e||0==e?(m(null),S(!1)):(S(!0),m("".concat(e," player has requested a rematch")))},c=function(e){m(e),g(!1),A(!0)},r=function(e){a(N.startGame()),T(!1),g(!1),m(null)},o=function(e){"rejected"===e&&(g(!1),T(!0),m("Your rematch request was rejected"))},s=function(e){m(e),setLoading(!1)};return t.on("startGame",r),t.on("gameResults",e),t.on("rematchResponse",o),t.on("receiveRematchRequest",n),t.on("creatorDisconnectOnRequest",c),t.on("creator-not-here",s),function(){t.off("gameResults",e),t.off("receiveRematchRequest",n),t.off("creatorDisconnectOnRequest",c),t.off("rematchResponse",o),t.off("startGame",r),t.off("creator-not-here",s)}}),[]),"started"===q?Object(I.jsx)(G.a,{to:"/"}):Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)(P.a,{children:[Object(I.jsx)("title",{children:"Battle Results | Word Battle"}),Object(I.jsx)("meta",{name:"Word Battle",content:"You have 90 seconds to compete in a room."}),Object(I.jsx)("meta",{property:"og:title",content:"Stingy Cards"})]}),Object(I.jsx)("div",{className:"result-container",children:Object(I.jsxs)("div",{className:"result-card",children:[Object(I.jsx)("div",{className:b?"notifications-fadeIn":"notifications",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(I.jsx)("p",{className:b?"notif-p":"notif-p-fadeOut",style:{color:"white"},children:b})}),Object(I.jsxs)("div",{className:"result-padding",children:[Object(I.jsx)("h1",{children:"Top Players for this round"}),null!==i?i.slice(0,8).map((function(e,t){return Object(I.jsxs)("p",{style:{fontSize:18,marginTop:25},children:[t+1,". ",e.playername," ",Object(I.jsxs)("strong",{children:["(",e.points," points)"]})]},e.id)})):Object(I.jsxs)("p",{style:{marginTop:20,marginBottom:40,lineHeight:2,textAlign:"center"},children:["The leaderboard for this round is no longer available. ",Object(I.jsx)("br",{}),"Go home to play again with your friends"]}),Object(I.jsx)("div",{style:{marginBottom:30}}),y?Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)("button",{onClick:function(){a(N.setMusicStatus(null)),a(N.prepareToStart(t,B)),t.emit("acceptRematchRequest",B)},style:{marginTop:50},className:"warmup-btn-inv",disabled:p,children:"Accept Rematch"}),Object(I.jsx)("button",{onClick:function(){t.emit("rejectRematchRequest",B),m(null),S(!1)},style:{marginTop:10},className:"warmup-btn-inv",children:"Reject Rematch"})]}):Object(I.jsxs)(I.Fragment,{children:[M?Object(I.jsx)(I.Fragment,{}):Object(I.jsx)(I.Fragment,{children:_?Object(I.jsx)("div",{style:{marginBottom:30}}):Object(I.jsx)(I.Fragment,{children:i?Object(I.jsx)("button",{onClick:function(){t.emit("sendRematchRequest",B),g(!0),m("Waiting for room owner to accept your rematch")},style:{marginTop:50},className:"warmup-btn-inv",disabled:p,children:p?Object(I.jsx)(I.Fragment,{children:Object(I.jsxs)("div",{className:"lds-ring",children:[Object(I.jsx)("div",{}),Object(I.jsx)("div",{}),Object(I.jsx)("div",{}),Object(I.jsx)("div",{})]})}):Object(I.jsx)(I.Fragment,{children:!0===k?Object(I.jsxs)("p",{children:[" ","Request Rematch Again"]}):Object(I.jsx)(I.Fragment,{children:Object(I.jsx)("p",{children:"Request Rematch"})})})}):Object(I.jsx)(I.Fragment,{})})}),Object(I.jsx)("button",{onClick:function(){a(N.setMusicStatus(null)),t.emit("leaveRoom",B),n.push("/")},style:{marginTop:10},className:"warmup-btn-inv",children:"Go Home"})]})]})]})})]})},$=n.p+"static/media/gameplay.2e1ddf7f.mp3";var ee=function(){var e=Object(o.b)(),t=Object(c.useState)(null),n=Object(E.a)(t,2),a=(n[0],n[1],Object(c.useState)(5)),r=Object(E.a)(a,2),s=(r[0],r[1],Object(c.useState)(null)),i=Object(E.a)(s,2),u=(i[0],i[1],Object(c.useState)(null)),j=Object(E.a)(u,2),l=(j[0],j[1],Object(c.useState)(null)),b=Object(E.a)(l,2),m=b[0],d=b[1],O=Object(o.c)((function(e){return e.gameReducer.gameStatus})),f=(Object(o.c)((function(e){return e.gameReducer.musicStatus})),Object(c.useRef)());return Object(c.useEffect)((function(){return f.current=new Audio($),f.current.volume=.15,function(){f.current.pause()}}),[]),Object(c.useEffect)((function(){var t=T()("http://localhost:4000");d(t);t.on("connected-players",(function(t){e(N.saveConnectedPlayers(t))}))}),[]),m?Object(I.jsxs)(X.a,{children:["started"===O&&Object(I.jsx)(G.b,{path:"/",exact:!0,component:function(){return Object(I.jsx)(K,{socket:m,gameplayMusic:f.current})}}),Object(I.jsx)(G.b,{path:"/",exact:!0,component:function(){return Object(I.jsx)(U,{socket:m,gameplayMusic:f.current})}}),Object(I.jsx)(G.b,{path:"/results",exact:!0,component:function(){return Object(I.jsx)(Z,{socket:m,gameplayMusic:f.current})}})]}):Object(I.jsx)("div",{className:"splash-bg"})},te=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,148)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};r.a.render(Object(I.jsx)(o.a,{store:w,children:Object(I.jsx)(ee,{})}),document.getElementById("root")),te()},85:function(e,t,n){}},[[147,1,2]]]);
//# sourceMappingURL=main.79db763d.chunk.js.map