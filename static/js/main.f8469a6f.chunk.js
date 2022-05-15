(this["webpackJsonpdsr-editor"]=this["webpackJsonpdsr-editor"]||[]).push([[0],{198:function(e,t){},298:function(e,t,n){},325:function(e,t){},331:function(e,t){},333:function(e,t){},343:function(e,t){},345:function(e,t){},355:function(e,t){},356:function(e,t){},399:function(e,t){},401:function(e,t){},408:function(e,t){},409:function(e,t){},489:function(e,t,n){"use strict";n.r(t);var o=n(3),r=n.n(o),a=n(262),i=n.n(a),c=(n(298),n(14)),s=n(521),l=n(28),d=n(531),u=n(532),h=n(534),b=n(527),j=n(66),g=Object(o.createContext)({authState:{isLoggedIn:!1,walletAddr:""},authDispatcher:function(){}}),f=n(124),x=n.n(f),m="atk",p="addr",O={};Object.defineProperty(O,"authToken",{get:function(){return localStorage.getItem(m)},set:function(e){localStorage.setItem(m,e)}}),Object.defineProperty(O,"walletAddr",{get:function(){return x.a.load(p)},set:function(e){x.a.save(p,e,{path:"/"})}}),O.clearAccountData=function(){localStorage.removeItem(m),x.a.remove(p)};var v=O,w=function(e,t){var n,o=t.type,r=t.payload;console.log("dispatcher got state: ",o);var a=null!==(n=null===r||void 0===r?void 0:r.walletAddr)&&void 0!==n?n:"",i=null===r||void 0===r?void 0:r.token;switch(o){case y.AUTO_SYNC:return i?(v.authToken=i,{isLoggedIn:!0,walletAddr:a}):e;case y.LOGIN:return v.authToken=i,v.walletAddr=a,{isLoggedIn:!0,walletAddr:a};case y.LOGOUT:return v.clearAccountData(),{isLoggedIn:!1,walletAddr:""};default:return e}},y={AUTO_SYNC:0,LOGIN:1,LOGOUT:2},k=n(100),A=n(0),S=n.n(A),T=n(85),D=n(271),C=n(281),I=n(274),L=n.n(I),R=(n(461),L.a.create({baseURL:"https://stormy-temple-44410.herokuapp.com/"}));R.interceptors.request.use((function(e){var t=v.authToken;return e.headers["auth-token"]=t?"Bearer ".concat(t):"",e}));var E=function(){var e=Object(k.a)(S.a.mark((function e(t,n){var o,r;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(o=new FormData).append("address",t),o.append("signature",n),e.next=5,R.post("/login",o).then((function(e){return e.data.access_token}));case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),G={stringToHex:function(e){for(var t=[],n=0;n<e.length;n++)t[n]=e.charCodeAt(n).toString(16);return t.join("")},intToHex:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return("0".repeat(t)+e.toString(16)).slice(-t)}},W=G,H=new T.a("https://mainnet-tezos.giganode.io"),P=new D.a({name:"D Showroom"});H.setWalletProvider(P);var F=function(){var e=Object(o.useContext)(g),t=(e.authState,e.authDispatcher),n=Object(o.useState)(""),r=Object(c.a)(n,2),a=r[0],i=r[1],s=function(){var e=Object(k.a)(S.a.mark((function e(){var t,n;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.client.getActiveAccount();case 2:(t=e.sent)?(n=t.address,a===n?console.log("Already connected: ",n):console.log("Another wallet connected: ",n)):console.log("No wallet connnection!");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(k.a)(S.a.mark((function e(){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{console.log("Requesting permissions..."),P.client.requestPermissions().then((function(e){var n=e.address;i(n),P.client.requestSignPayload({signingType:C.a.MICHELINE,payload:"0501".concat(W.intToHex(n.length,8)).concat(W.stringToHex(n))}).then((function(e){console.log("Get signature. Try login..."),E(n,e.signature).then((function(e){console.log("Login suceed!"),t({type:y.LOGIN,payload:{walletAddr:n,token:e}})}))}))}))}catch(n){i(""),console.log("Got error:",n)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{walletAddr:a,connectWallet:l,checkWalletConnection:s}},N=n(11),U=function(e){var t=e.children,n=e.to,o=Object(l.g)().pathname===n;return Object(N.jsx)(j.b,{to:n,children:Object(N.jsx)(d.a,{color:o?"text.primary":"text.secondary",sx:function(e){return{mr:4,fontWeight:"bold",position:"relative","&::after":o?{position:"absolute",content:"''",height:4,bottom:-6,margin:"0 auto",left:0,right:0,width:"80%",background:e.palette.info.main}:{}}},children:t})})},z=function(){var e,t,n=Object(o.useContext)(g),r=n.authState,a=n.authDispatcher,i=F().connectWallet;return Object(N.jsx)(u.a,{color:"default",enableColorOnDark:!0,children:Object(N.jsxs)(h.a,{children:[Object(N.jsx)(j.b,{to:"/",children:Object(N.jsx)(d.a,{variant:"h5",color:"text.primary",sx:{fontWeight:"bold",userSelect:"none"},children:"D SHOWROOM"})}),Object(N.jsx)(d.a,{sx:{flexGrow:1}}),null!==r&&void 0!==r&&r.isLoggedIn?Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(U,{to:"/rooms",children:"Rooms"}),Object(N.jsx)(U,{to:"/collections",children:"Collections"}),Object(N.jsx)(b.a,{variant:"outlined",sx:{textTransform:"none"},onDoubleClick:function(){a({type:y.LOGOUT})},children:(null===r||void 0===r||null===(e=r.walletAddr)||void 0===e?void 0:e.slice(0,5))+"..."+(null===r||void 0===r||null===(t=r.walletAddr)||void 0===t?void 0:t.slice(-5))})]}):Object(N.jsx)(b.a,{variant:"outlined",onClick:function(){i()},children:"Connect"})]})})},B=function(){var e=Object(l.h)();return Object(N.jsxs)(s.a,{sx:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[Object(N.jsx)(d.a,{variant:"h1",color:"primary",sx:{textAlign:"center"},children:"Welcome to DSR."}),Object(N.jsx)(b.a,{sx:{textAlign:"center",padding:2,mt:5},size:"large",onClick:function(t){e("/rooms"),t.preventDefault()},href:"/rooms",children:Object(N.jsx)(d.a,{variant:"h5",children:"Get Started"})})]})},M=function(){return Object(N.jsxs)(s.a,{sx:{width:"100%",height:"100%"},children:[Object(N.jsx)(s.a,{component:"img",src:"/DSR-Editor/images/test.jpg",sx:{width:"100%",height:"100%",objectFit:"cover",position:"absolute",zIndex:-1}}),Object(N.jsx)(d.a,{variant:"h2",color:"text.primary",sx:{textAlign:"center",mt:"5%",fontWeight:"bold"},children:"Nothing here!!!"})]})},q=n(102),_=n(528),Y=n(522),J=n(535),V=n(536),K=n(537),Q=n(523),X=n(538),Z=n(525),$=n(278),ee=n.n($),te=n(279),ne=n.n(te),oe=function(e){var t=e.room,n=null!==t&&void 0!==t?t:{},r=n.img,a=n.name,i=n.id,s=Object(o.useState)(!1),l=Object(c.a)(s,2),u=l[0],h=l[1];return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(J.a,{sx:{width:360,margin:2},raised:!0,children:[Object(N.jsx)(V.a,{component:"img",image:r,sx:{height:210,objectFit:"cover"}}),Object(N.jsxs)(K.a,{sx:{pt:1,"&:last-child":{paddingBottom:1.5},position:"relative"},children:[Object(N.jsx)(d.a,{variant:"h6",sx:{mb:.5},children:a}),Object(N.jsx)(Q.a,{title:"Click to copy",arrow:!0,followCursor:!0,children:Object(N.jsxs)(d.a,{variant:"body2",color:"text.secondary",sx:{width:"fit-content",display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer","&:hover":{color:"text.primary",textDecoration:"underline dotted 2px"}},onClick:function(){navigator.clipboard.writeText(i).then((function(){h(!0)}))},children:[Object(N.jsx)(ee.a,{fontSize:"small",sx:{mr:.5}}),i]})}),Object(N.jsx)(Q.a,{title:"Edit",placement:"top",arrow:!0,componentsProps:{tooltip:{style:{marginBottom:8}}},children:Object(N.jsx)(X.a,{sx:{position:"absolute",right:8,bottom:8},children:Object(N.jsx)(ne.a,{})})})]})]}),Object(N.jsx)(Z.a,{open:u,autoHideDuration:1e3,anchorOrigin:{vertical:"bottom",horizontal:"center"},onClose:Object(o.useCallback)((function(){h(!1)}),[]),message:"Room ID copied",sx:{"& .MuiPaper-root":{minWidth:"min-content",pl:3,pr:3}}})]})},re=n(280),ae=n.n(re),ie=[{img:"/DSR-Editor/images/test.jpg",name:"Room 1",id:"HomHom"},{img:"/DSR-Editor/images/test.jpg",name:"Room 2",id:"HomMim"},{img:"/DSR-Editor/images/test.jpg",name:"Room 3",id:"RedRed"},{img:"/DSR-Editor/images/test.jpg",name:"Room 4",id:"Doctor"},{img:"/DSR-Editor/images/test.jpg",name:"Room 5",id:"SongBo"}],ce=function(){var e=Object(o.useState)(ie),t=Object(c.a)(e,2),n=t[0],r=(t[1],{item:!0,container:!0,direction:"row",justifyContent:"center",xs:12,md:6,lg:4,xl:3});return Object(N.jsx)(Y.a,{sx:{padding:"36px 24px",boxSizing:"border-box",width:"100%"},children:Object(N.jsxs)(_.a,{container:!0,direction:"row",sx:{margin:"auto"},children:[null===n||void 0===n?void 0:n.map((function(e){return Object(N.jsx)(_.a,Object(q.a)(Object(q.a)({},r),{},{children:Object(N.jsx)(oe,{room:e})}),e.id)})),Object(N.jsx)(_.a,Object(q.a)(Object(q.a)({},r),{},{color:"divider",children:Object(N.jsx)(b.a,{variant:"outlined",color:"inherit",sx:{width:360,height:286,margin:2,borderWidth:3},children:Object(N.jsx)(ae.a,{sx:{fontSize:80}})})}))]})})},se=n(164),le=n.n(se),de=function(){var e=Object(o.useContext)(g).authState;return null!==e&&void 0!==e&&e.isLoggedIn?Object(N.jsx)(l.b,{}):Object(N.jsx)(l.a,{to:"/",replace:!0})},ue=function(){var e=Object(l.g)(),t=Object(o.useReducer)(w,{},(function(){var e=v.authToken;if(e&&v.walletAddr){var t,n=(null!==(t=le.a.decode(e))&&void 0!==t?t:{}).addr;if(n===v.walletAddr)return{isLoggedIn:!0,walletAddr:n}}return v.clearAccountData(),{isLoggedIn:!1,walletAddr:""}})),n=Object(c.a)(t,2),r=n[0],a=n[1];return Object(o.useEffect)((function(){console.log("Check local account at:",e.pathname),v.authToken&&v.walletAddr||a({type:y.LOGOUT}),window.scrollTo({top:0,behavior:"smooth"})}),[e]),Object(o.useEffect)((function(){function e(e){if(e.key===m)t(e.newValue)}var t=function(e){if(e&&v.walletAddr){var t=le.a.decode(e).addr;if(t===v.walletAddr)return void a({type:y.AUTO_SYNC,payload:{walletAddr:t,token:e}})}a({type:y.LOGOUT})};return window.addEventListener("storage",e),function(){window.removeEventListener("storage",e)}}),[]),Object(N.jsxs)(g.Provider,{value:{authState:r,authDispatcher:a},children:[Object(N.jsx)(z,{}),Object(N.jsx)(s.a,{sx:{width:"100%",height:"calc(100% - 56px)",mt:"56px",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",overflow:"auto",scrollBehavior:"smooth"},children:Object(N.jsxs)(l.e,{children:[Object(N.jsx)(l.c,{path:"/",element:Object(N.jsx)(B,{})}),Object(N.jsx)(l.c,{path:"/rooms",element:Object(N.jsx)(de,{}),children:Object(N.jsx)(l.c,{path:"/rooms",element:Object(N.jsx)(ce,{})})}),Object(N.jsx)(l.c,{path:"*",element:Object(N.jsx)(M,{})})]})})]})},he=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,539)).then((function(t){var n=t.getCLS,o=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),o(e),r(e),a(e),i(e)}))},be=n(529),je=n(530),ge=n(165),fe=Object(je.a)(Object(ge.a)({palette:{mode:"dark",common:{black:"#000",white:"rgba(255, 255, 255, 0.8)"},primary:{main:"#fff"},secondary:{main:"rgba(255, 255, 255, 0.7)"},error:{main:"#f44336",light:"#e57373",dark:"#d32f2f",contrastText:"rgba(255, 255, 255, 0.8)"},warning:{main:"#ffa726",light:"#ffb74d",dark:"#f57c00",contrastText:"rgba(0, 0, 0, 0.87)"},info:{main:"#29b6f6",light:"#4fc3f7",dark:"#0288d1",contrastText:"rgba(0, 0, 0, 0.87)"},success:{main:"#66bb6a",light:"#81c784",dark:"#388e3c",contrastText:"rgba(0, 0, 0, 0.87)"},grey:{50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},contrastThreshold:3,tonalOffset:.2,text:{primary:"rgba(255, 255, 255, 1)",secondary:"rgba(255, 255, 255, 0.6)",disabled:"rgba(255, 255, 255, 0.4)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{popup:"#242424",paper:"#161616",default:"#121212"},action:{active:"rgba(255, 255, 255, 0.8)",hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}},overrides:{}}));i.a.createRoot(document.getElementById("root")).render(Object(N.jsx)(j.a,{children:Object(N.jsx)(be.a,{theme:fe,children:Object(N.jsx)(r.a.StrictMode,{children:Object(N.jsx)(ue,{})})})})),he()}},[[489,1,2]]]);
//# sourceMappingURL=main.f8469a6f.chunk.js.map