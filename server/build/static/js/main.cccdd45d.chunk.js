(this.webpackJsonpwordbattle=this.webpackJsonpwordbattle||[]).push([[0],{100:function(e,t,n){},128:function(e,t,n){},145:function(e,t){},147:function(e,t){},175:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(30),a=n.n(r),o=n(5),s=n(20),i=n(85),u=(n(98),n(86)),l=n(3),j="ASSIGN_CREATOR",b="ACCEPT_REQUEST",d="ALL_PLAYERS",m="MUSIC_STATUS",O="LEAVE_ROOM",f="START_GAME",h="END_GAME",p="GET_ROOM",g="CONNECTED_PLAYERS",x="JOIN_ROOM_REQUEST",v="JOIN_ROOM_SUCCESS",y="JOIN_ROOM_FAILURE",S="STOP_GAME_MUSIC",R=(n(50),{room:null,gameStatus:"ended",stopMusic:!1,connectedPlayers:0,players:[]});var w=Object(s.combineReducers)({gameReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return Object(l.a)(Object(l.a)({},e),{},{joinLoading:!0});case v:return Object(l.a)(Object(l.a)({},e),{},{joinLoading:!1,room:t.room});case O:return Object(l.a)(Object(l.a)({},e),{},{room:null});case p:return Object(l.a)(Object(l.a)({},e),{},{room:t.room});case f:return Object(l.a)(Object(l.a)({},e),{},{gameStatus:t.gameStatus});case j:return Object(l.a)(Object(l.a)({},e),{},{creator:t.creator,acceptRequest:t.acceptRequest});case b:return Object(l.a)(Object(l.a)({},e),{},{acceptRequest:t.acceptRequest});case h:return Object(l.a)(Object(l.a)({},e),{},{gameStatus:t.gameStatus});case d:return Object(l.a)(Object(l.a)({},e),{},{players:t.players});case g:return Object(l.a)(Object(l.a)({},e),{},{connectedPlayers:t.connectedPlayers});case m:return Object(l.a)(Object(l.a)({},e),{},{musicStatus:t.musicStatus});case S:return Object(l.a)(Object(l.a)({},e),{},{stopMusic:t.value});default:return e}}}),E=Object(s.createStore)(w,Object(u.composeWithDevTools)(Object(s.applyMiddleware)(i.a))),k=(n(100),n(2)),N={acceptRequest:function(){return function(e){e({type:b,acceptRequest:!0})}},startGame:function(){return function(e){e({type:f,gameStatus:"started"})}},endGame:function(){return function(e){e({type:h,gameStatus:"ended"})}},prepareToStart:function(e,t){return function(n){e.emit("prepareToStart",{room:t}),n({type:j,creator:!0})}},setMusicStatus:function(e){return function(t){t(function(e){return{type:m,musicStatus:e}}(e))}},getRoom:function(){return function(e){localStorage.getItem("room"),e((room,{type:O,room:room}))}},joinRoom:function(e,t,n,c){return function(r){r({type:x}),e.emit("joinRoom",{playername:t,room:n,creator:c},(function(e){"ok"===e.status&&(r(function(e){return{type:v,room:e}}(n)),localStorage.setItem("room",n))}))}},leaveRoom:function(e,t){return function(n){e.emit("leaveRoom",t),localStorage.setItem("room",null),n({type:O,room:null})}},saveConnectedPlayers:function(e){return function(t){var n;localStorage.setItem("connected-players",e),t((n=e.length,{type:g,connectedPlayers:n})),t(function(e){return{type:d,players:e}}(e))}},getConnectedPlayers:function(){return function(e){var t;e((t=localStorage.getItem("connected-players"),{type:g,count:t}))}},stopGameplayMusic:function(e){return function(t){t(function(e){return{type:S,value:e}}(e))}}};var T=n(87),C=n.n(T),I=(n(128),n(39)),A=n.n(I),F=n(0),M=function(e){var t=e.letters,n=e.isLettersEmpty;return Object(F.jsxs)("div",{className:"board-container",children:[Object(F.jsxs)("p",{children:[" ","Type letters on your keyboard and press ",Object(F.jsx)("strong",{children:"ENTER"})," to submit each word you form"]}),Object(F.jsx)("p",{children:"Form as many words as possible from your word deck"}),Object(F.jsx)("div",{className:"letter-container",children:n?Object(F.jsx)(F.Fragment,{children:Object(F.jsx)("h1",{children:"Start Typing"})}):Object(F.jsx)(F.Fragment,{children:t.map((function(e){return Object(F.jsx)("div",{className:"deck-letter board-letter",children:Object(F.jsx)("h1",{children:e.toUpperCase()})},A()())}))})})]})},G=n(17),q=n(88),P=n(6),B=n(89),L=n.n(B),_=n.p+"static/media/logo.d0544f13.png",W=n(22),D=n.n(W),U=function(){var e=Object(c.useState)(!1),t=Object(k.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(1),o=Object(k.a)(a,2),s=o[0],i=o[1];return Object(c.useEffect)((function(){setTimeout((function(){r(!0),setTimeout((function(){r(!1),setTimeout((function(){i(2)}),200)}),1900)}),100)}),[s]),Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)(D.a,{children:[Object(F.jsx)("title",{children:"Cleaning more battle helmets..."}),Object(F.jsx)("meta",{name:"Word Battle",content:"You have 90 seconds to compete in a room."})]}),Object(F.jsx)("div",{className:"splash-bg",children:1==s?Object(F.jsx)("img",{className:n?"fadeIn logo":"fadeOut logo",src:_}):Object(F.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(F.jsx)("p",{className:n?"fadeIn":"fadeOut",style:{color:"white"},children:"by Iyiola Owabumowa"})})})]})},J=function(){return Object(F.jsx)("div",{className:"splash-bg",children:Object(F.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(F.jsx)("p",{style:{color:"white",padding:50,textAlign:"center",lineHeight:2},children:"Sorry, Word Battle doesn't work on mobile phones at the moment."})})})},Y=n(47),H=n.n(Y),Q=function(e){var t=e.socket,n=(e.fade,e.gameplayMusic,Object(o.b)()),r=(Object(P.f)(),Object(c.useState)("")),a=Object(k.a)(r,2),s=a[0],i=a[1],u=Object(c.useState)(""),l=Object(k.a)(u,2),j=l[0],b=l[1],d=Object(c.useState)(null),m=Object(k.a)(d,2),O=m[0],f=m[1],h=Object(c.useState)(!1),p=Object(k.a)(h,2),g=p[0],x=p[1],v=Object(c.useState)(!1),y=Object(k.a)(v,2),S=y[0],R=y[1],w=Object(c.useState)(5),E=Object(k.a)(w,2),T=(E[0],E[1],Object(c.useState)(null)),C=Object(k.a)(T,2),I=C[0],A=C[1],M=Object(c.useState)("warmup"),B=Object(k.a)(M,2),_=B[0],W=B[1],Y=Object(c.useState)(!0),Q=Object(k.a)(Y,2),z=Q[0],V=Q[1],K=Object(c.useState)(!1),X=Object(k.a)(K,2),Z=X[0],$=X[1],ee=Object(c.useState)([]),te=Object(k.a)(ee,2),ne=(te[0],te[1]),ce=Object(c.useState)(!1),re=Object(k.a)(ce,2),ae=re[0],oe=re[1],se=Object(c.useRef)(new Audio),ie=Object(c.useRef)([]).current,ue=Object(o.c)((function(e){return e.gameReducer.connectedPlayers})),le=Object(o.c)((function(e){return e.gameReducer.players})),je=Object(o.c)((function(e){return e.gameReducer.room})),be=Object(o.c)((function(e){return e.gameReducer.gameStatus}));Object(c.useEffect)((function(){le.length>0&&oe(!0)}),[le]),Object(c.useEffect)((function(){setTimeout((function(){V(!1),setTimeout((function(){q.isMobile?R(!0):$(!0)}),200)}),5e3);var e=function(e){n(N.startGame())},c=function(e){A(e),x(!1)},r=function(e){A(e),x(!1)};return t.on("startGame",e),t.on("full-room",c),t.on("creator-not-here",r),function(){t.off("startGame",e),t.off("full-room",c),t.off("creator-not-here",r)}}),[]),Object(c.useEffect)((function(){ae&&navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){se.current.srcObject=e,console.log(e);var n=[];le.forEach((function(c){if(c.id!=t.id){var r=de(c.id,t.id,e);ie.push({peerId:c.id,peer:r}),n.push(r)}})),ne(n),t.on("userJoined",(function(t){var n=me(t.signal,t.callerId,e);ie.push({peerId:t.callerId,peer:n}),ne((function(e){return[].concat(Object(G.a)(e),[n])}))})),t.on("receivingReturnedSignal",(function(e){ie.find((function(t){return t.peerId===e.id})).peer.signal(e.signal)}))}))}),[ae]);var de=function(e,n,c){var r=new H.a({initiator:!0,trickle:!1,stream:c}),a=e;return r.on("signal",(function(e){t.emit("sendingSignal",{id:a,callerId:n,signal:e})})),r},me=function(e,n,c){var r=new H.a({initiator:!1,trickle:!1,stream:c});return r.on("signal",(function(e){t.emit("returningSignal",{signal:e,callerId:n})})),r.signal(e),r};if(Object(c.useEffect)((function(){}),[ue]),z)return Object(F.jsx)(U,{});if(S)return Object(F.jsx)(J,{});var Oe=function(e){var t=e.peer,n=Object(c.useRef)(new Audio).current;return Object(c.useEffect)((function(){t.on("stream",(function(e){console.log(e),n.srcObject=e}))}),[]),Object(F.jsx)("audio",{ref:n,controls:!0,volume:"true",autoPlay:!0})};return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)(D.a,{children:[Object(F.jsx)("title",{children:"started"===be?"Battleground | Word Battle":"Changeroom | Word Battle"}),Object(F.jsx)("meta",{name:"Word Battle",content:"You have 90 seconds to compete in a room."})]}),Object(F.jsx)("div",{className:"warmup-container",children:Object(F.jsxs)("div",{className:Z?"warmup-card-fadeIn":"warmup-card",children:[Object(F.jsx)("div",{className:I?"notifications-fadeIn":"notifications",children:Object(F.jsx)("p",{className:I?"notif-p":"notif-p-fadeOut",style:{color:"white"},children:I})}),Object(F.jsxs)("div",{className:"warmup-padding",children:[Object(F.jsx)("audio",{autoPlay:!0,muted:!0,ref:se,controls:!0,volume:"true"}),ie.map((function(e,t){return Object(F.jsx)(Oe,{peer:e.peer},t)})),Object(F.jsxs)("div",{children:["warmup"===_&&Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)("h1",{children:["Howdy ",s.slice(0,20),"!"]}),Object(F.jsx)("p",{children:"What's the name you're most proud of?"}),Object(F.jsx)("input",{placeholder:"Enter your name",value:s,maxLength:20,onChange:function(e){e.target.value.length>1&&A(null),localStorage.setItem("name",e.target.value),i(e.target.value)}}),Object(F.jsx)("button",{onClick:function(){if(s.length>1){A(null),W("create");f(L.a.generate().substring(0,5)),f((function(e){return n(N.joinRoom(t,s,e,true)),e}))}else A("Enter a player name")},className:"start-btn",children:"Create Game Room"}),Object(F.jsx)("button",{onClick:function(){s.length>1?W("join"):A("Enter a player name")},className:"warmup-btn-inv",children:"Join Room"})]}),"create"===_&&Object(F.jsxs)(F.Fragment,{children:[ue-1==0||ue-1==-1?Object(F.jsx)("p",{children:"Waiting for players to join..."}):Object(F.jsx)(F.Fragment,{children:ue-1==1?Object(F.jsx)("p",{children:Object(F.jsxs)("strong",{children:[ue-1," player has joined this room"]})}):Object(F.jsx)("p",{children:Object(F.jsxs)("strong",{children:[ue-1," players have joined this room"]})})}),Object(F.jsx)("h1",{style:{marginTop:30},children:O}),Object(F.jsx)("p",{style:{textAlign:"center",lineHeight:2},children:"Share your room id with your friends to join this room and compete with you."}),ue-1>=1&&Object(F.jsx)("button",{onClick:function(){x(!0),n(N.prepareToStart(t,je))},className:"start-btn",children:g?Object(F.jsx)("div",{children:Object(F.jsxs)("div",{className:"lds-ring",children:[Object(F.jsx)("div",{}),Object(F.jsx)("div",{}),Object(F.jsx)("div",{}),Object(F.jsx)("div",{})]})}):"Start Game"}),Object(F.jsx)("button",{onClick:function(){A(null),W("warmup"),x(!1),n(N.leaveRoom(t,je))},className:"warmup-btn-inv",children:"Go Back"})]}),"join"===_&&Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)("h1",{children:"Enter with a room id"}),Object(F.jsx)("p",{style:{marginBottom:50,textAlign:"center"},children:ue-1>=1&&Object(F.jsx)("p",{children:"The room owner should start the game soon"})}),Object(F.jsx)("input",{placeholder:"Room ID",value:j,maxLength:5,onChange:function(e){5===e.target.value.length?A(null):A("Enter a valid room id"),b(e.target.value)}}),Object(F.jsx)("button",{onClick:function(){5===j.length?(x(!0),A("Waiting for room owner..."),n(N.joinRoom(t,s,j,!1))):A("Enter a valid room id")},disabled:g,className:"start-btn",children:g?Object(F.jsx)(F.Fragment,{children:Object(F.jsxs)("div",{className:"lds-ring",children:[Object(F.jsx)("div",{}),Object(F.jsx)("div",{}),Object(F.jsx)("div",{}),Object(F.jsx)("div",{})]})}):"Join Game"}),Object(F.jsx)("button",{onClick:function(){W("warmup"),A(null),x(!1),n(N.leaveRoom(t,je))},className:"warmup-btn-inv",children:"Go Back"})]})]})]})]})})]})},z=(n(157),function(e){var t=e.points,n=e.notification,c=e.time,r=e.opponent,a=Object(o.c)((function(e){return e.gameReducer.connectedPlayers}));return Object(F.jsx)("div",{className:"header",children:n?Object(F.jsx)("p",{children:Object(F.jsx)("strong",{children:n})}):Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)("p",{children:[Object(F.jsx)("strong",{children:"Time Left: "}),c," seconds"]}),Object(F.jsxs)("p",{children:[Object(F.jsx)("strong",{children:"Points: "}),t,"pts"]}),Object(F.jsxs)("p",{children:[Object(F.jsxs)("strong",{children:["You're competing with ",a-1," ",a-1==1?"player":"players"]}),r]})]})})}),V=function(e){var t=e.deck,n=e.letters;e.getOccurrence;return Object(F.jsx)("div",{className:"worddeck-container",children:t.map((function(e,t){return Object(F.jsx)("div",{className:" ".concat(n.includes(e.name)&&0===e.count?"deck-letter deck-letter-used":"deck-letter"),children:Object(F.jsx)("h1",{children:e.name.toUpperCase()})},A()())}))})},K=n.p+"static/media/keypress.a5e4fef1.mp3",X=n.p+"static/media/right.297a1043.mp3",Z=n.p+"static/media/wrong.c8c85237.mp3",$=function(e){var t=e.socket,n=e.gameplayMusic,r=Object(P.f)(),a=Object(o.b)(),s=Object(c.useRef)([]),i=Object(c.useState)(!1),u=Object(k.a)(i,2),j=(u[0],u[1],Object(c.useState)([])),b=Object(k.a)(j,2),d=b[0],m=b[1],O=Object(c.useState)([]),f=Object(k.a)(O,2),h=f[0],p=f[1],g=Object(c.useState)(null),x=Object(k.a)(g,2),v=x[0],y=x[1],S=Object(c.useState)(null),R=Object(k.a)(S,2),w=R[0],E=R[1],T=Object(c.useState)(0),C=Object(k.a)(T,2),I=C[0],A=C[1],q=Object(c.useState)(null),B=Object(k.a)(q,2),L=B[0],_=(B[1],Object(c.useState)(!1)),W=Object(k.a)(_,2),D=(W[0],W[1],Object(o.c)((function(e){return e.gameReducer.room}))),U=Object(o.c)((function(e){return e.gameReducer.stopMusic}));Object(o.c)((function(e){return e.gameReducer.gameStatus}));function J(e,t){var n=0;return e.forEach((function(e){return e===t&&n++})),n}return Object(c.useEffect)((function(){n.play()}),[]),Object(c.useEffect)((function(){var e=new Audio(X),n=new Audio(Z);n.volume=.5,e.volume=.05,t.emit("readyToStart",D);var c=function(e){y(e),1==e&&(a(N.endGame()),r.push("/results"))},o=function(e){console.log("generated"),s.current=e};return t.on("game-timer",c),t.on("getRoomDeck",o),t.on("answer",(function(t){var c=t.word,r=t.status;if(console.log(I),200==r){e.play(),m([].concat(Object(G.a)(d),[c])),A(I+5),p([]);for(var a=0;a<s.current.length;a++){var o=s.current;o[a]=Object(l.a)(Object(l.a)({},o[a]),{},{count:1}),s.current=Object(G.a)(o)}}else n.play()})),t.on("playerPoints",(function(e){console.log(e),A(e)})),function(){t.off("game-timer",c),t.on("getRoomDeck",o)}}),[]),Object(c.useEffect)((function(){var e=new Audio(K),n=new Audio(X),c=new Audio(Z);e.volume=.1,n.volume=.05,c.volume=.5;var r=function(n){var c=n.key;if(s.current.some((function(e){return e.name===c}))&&J(h,c)<function(e,t){var n=0;return e.forEach((function(e){return e.name===t&&n++})),n}(s.current,c)){e.play().then((function(){})).catch((function(e){return console.error})),p([].concat(Object(G.a)(h),[c])),s.current.map((function(e){if(e.name===c&&1===e.count){var t=s.current;return t[r]=Object(l.a)(Object(l.a)({},t[r]),{},{count:0}),void(s.current=Object(G.a)(t))}}));for(var r=0;r<s.current.length;r++){var a=s.current[r];if(a.name===c&&1===a.count){var o=s.current;o[r]=Object(l.a)(Object(l.a)({},o[r]),{},{count:0}),s.current=Object(G.a)(o);break}}}if("Enter"===c&&e.play().then((function(){})).catch((function(e){return console.error})),"Backspace"===c){for(var i=h,u=s.current.length-1;u>0;u--){var j=s.current[u];if(j.name===h[h.length-1]&&0===j.count){var b=s.current;b[u]=Object(l.a)(Object(l.a)({},b[u]),{},{count:1}),s.current=Object(G.a)(b);break}}i.pop(),p(Object(G.a)(i))}"Enter"===c&&function(){var e=function(){var e="";return h.forEach((function(t){return e+=t})),e}();d.includes(e)?(E("You've found this word already"),setTimeout((function(){E(null)}),3e3)):t.emit("checkWord",e)}()};return window.addEventListener("keydown",r),function(){window.removeEventListener("keydown",r)}}),[d,h,I,U]),Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(z,{points:I,notification:w,time:v,opponent:L}),Object(F.jsx)(M,{letters:h,isLettersEmpty:0===h.length}),Object(F.jsx)(V,{deck:s.current,letters:h,getOccurrence:J})]})},ee=n(31),te=function(e){var t=e.socket,n=(e.gameplayMusic,Object(P.f)()),r=Object(o.b)(),a=Object(c.useState)([]),s=Object(k.a)(a,2),i=s[0],u=s[1],l=Object(c.useState)(null),j=Object(k.a)(l,2),b=j[0],d=j[1],m=Object(c.useState)(!0),O=Object(k.a)(m,2),f=(O[0],O[1],Object(c.useState)(!1)),h=Object(k.a)(f,2),p=h[0],g=h[1],x=Object(c.useState)(!1),v=Object(k.a)(x,2),y=v[0],S=v[1],R=Object(c.useState)(!1),w=Object(k.a)(R,2),E=w[0],T=w[1],C=Object(c.useState)(!1),I=Object(k.a)(C,2),A=I[0],M=I[1],G=Object(o.c)((function(e){return e.gameReducer.gameStatus})),q=Object(o.c)((function(e){return e.gameReducer.room})),B=Object(o.c)((function(e){return e.gameReducer.creator}));Object(o.c)((function(e){return e.gameReducer.acceptRequest}));return Object(c.useEffect)((function(){t.emit("gameEnd",{room:q});var e=function(e){localStorage.setItem("results",JSON.stringify(e)),u(e),r(N.acceptRequest())},n=function(e){e>1?(S(!0),d("".concat(e," players have requested a rematch"))):null==e||0==e?(d(null),S(!1)):(S(!0),d("".concat(e," player has requested a rematch")))},c=function(e){d(e),g(!1),M(!0)},a=function(e){r(N.startGame()),T(!1),g(!1),d(null)},o=function(e){"rejected"===e&&(g(!1),T(!0),d("Your rematch request was rejected"))},s=function(e){d(e),setLoading(!1)};return t.on("startGame",a),t.on("gameResults",e),t.on("rematchResponse",o),t.on("receiveRematchRequest",n),t.on("creatorDisconnectOnRequest",c),t.on("creator-not-here",s),function(){t.off("gameResults",e),t.off("receiveRematchRequest",n),t.off("creatorDisconnectOnRequest",c),t.off("rematchResponse",o),t.off("startGame",a),t.off("creator-not-here",s)}}),[]),"started"===G?Object(F.jsx)(P.a,{to:"/"}):Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)(D.a,{children:[Object(F.jsx)("title",{children:"Battle Results | Word Battle"}),Object(F.jsx)("meta",{name:"Word Battle",content:"You have 90 seconds to compete in a room."}),Object(F.jsx)("meta",{property:"og:title",content:"Stingy Cards"})]}),Object(F.jsx)("div",{className:"result-container",children:Object(F.jsxs)("div",{className:"result-card",children:[Object(F.jsx)("div",{className:b?"notifications-fadeIn":"notifications",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(F.jsx)("p",{className:b?"notif-p":"notif-p-fadeOut",style:{color:"white"},children:b})}),Object(F.jsxs)("div",{className:"result-padding",children:[Object(F.jsx)("h1",{children:"Top Players for this round"}),null!==i?i.slice(0,8).map((function(e,t){return Object(F.jsxs)("p",{style:{fontSize:18,marginTop:25},children:[t+1,". ",e.playername," ",Object(F.jsxs)("strong",{children:["(",e.points," points)"]})]},e.id)})):Object(F.jsxs)("p",{style:{marginTop:20,marginBottom:40,lineHeight:2,textAlign:"center"},children:["The leaderboard for this round is no longer available. ",Object(F.jsx)("br",{}),"Go home to play again with your friends"]}),Object(F.jsx)("div",{style:{marginBottom:30}}),y?Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)("button",{onClick:function(){r(N.setMusicStatus(null)),r(N.prepareToStart(t,q)),t.emit("acceptRematchRequest",q)},style:{marginTop:50},className:"warmup-btn-inv",disabled:p,children:"Accept Rematch"}),Object(F.jsx)("button",{onClick:function(){t.emit("rejectRematchRequest",q),d(null),S(!1)},style:{marginTop:10},className:"warmup-btn-inv",children:"Reject Rematch"})]}):Object(F.jsxs)(F.Fragment,{children:[A?Object(F.jsx)(F.Fragment,{}):Object(F.jsx)(F.Fragment,{children:B?Object(F.jsx)("div",{style:{marginBottom:30}}):Object(F.jsx)(F.Fragment,{children:i?Object(F.jsx)("button",{onClick:function(){t.emit("sendRematchRequest",q),g(!0),d("Waiting for room owner to accept your rematch")},style:{marginTop:50},className:"warmup-btn-inv",disabled:p,children:p?Object(F.jsx)(F.Fragment,{children:Object(F.jsxs)("div",{className:"lds-ring",children:[Object(F.jsx)("div",{}),Object(F.jsx)("div",{}),Object(F.jsx)("div",{}),Object(F.jsx)("div",{})]})}):Object(F.jsx)(F.Fragment,{children:!0===E?Object(F.jsxs)("p",{children:[" ","Request Rematch Again"]}):Object(F.jsx)(F.Fragment,{children:Object(F.jsx)("p",{children:"Request Rematch"})})})}):Object(F.jsx)(F.Fragment,{})})}),Object(F.jsx)("button",{onClick:function(){r(N.setMusicStatus(null)),t.emit("leaveRoom",q),n.push("/")},style:{marginTop:10},className:"warmup-btn-inv",children:"Go Home"})]})]})]})})]})},ne=n.p+"static/media/gameplay.2e1ddf7f.mp3";var ce=function(){var e=Object(o.b)(),t=Object(c.useState)(null),n=Object(k.a)(t,2),r=(n[0],n[1],Object(c.useState)(5)),a=Object(k.a)(r,2),s=(a[0],a[1],Object(c.useState)(null)),i=Object(k.a)(s,2),u=(i[0],i[1],Object(c.useState)(null)),l=Object(k.a)(u,2),j=(l[0],l[1],Object(c.useState)(null)),b=Object(k.a)(j,2),d=b[0],m=b[1],O=Object(o.c)((function(e){return e.gameReducer.gameStatus})),f=(Object(o.c)((function(e){return e.gameReducer.musicStatus})),Object(c.useRef)());return Object(c.useEffect)((function(){return f.current=new Audio(ne),f.current.volume=.15,function(){f.current.pause()}}),[]),Object(c.useEffect)((function(){var t=C()("https://word-battle.com");m(t);t.on("connected-players",(function(t){e(N.saveConnectedPlayers(t))}))}),[]),d?Object(F.jsxs)(ee.a,{children:["started"===O&&Object(F.jsx)(P.b,{path:"/",exact:!0,component:function(){return Object(F.jsx)($,{socket:d,gameplayMusic:f.current})}}),Object(F.jsx)(P.b,{path:"/",exact:!0,component:function(){return Object(F.jsx)(Q,{socket:d,gameplayMusic:f.current})}}),Object(F.jsx)(P.b,{path:"/results",exact:!0,component:function(){return Object(F.jsx)(te,{socket:d,gameplayMusic:f.current})}})]}):Object(F.jsx)("div",{className:"splash-bg"})},re=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,176)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))};a.a.render(Object(F.jsx)(o.a,{store:E,children:Object(F.jsx)(ce,{})}),document.getElementById("root")),re()}},[[175,1,2]]]);
//# sourceMappingURL=main.cccdd45d.chunk.js.map