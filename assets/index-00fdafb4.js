import{j as t,P as y,r,d as H,u as P,b as R,a as w,e as L,f as _,h as q,i as o,Q as U,k as W,l as z,m as j,n as G,o as T,C as J,M as v,B as V,F as Q,p as Z}from"./index-4d0cd9b7.js";import{B as D}from"./Button-16c6441b.js";import{b as K}from"./welcomeMsg-56f8168f.js";const X=()=>t.jsxs("svg",{width:"60",height:"59",viewBox:"0 0 60 59",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t.jsx("circle",{cx:"30.0002",cy:"29.5227",r:"29.3743",fill:"#FEF3F2"}),t.jsx("circle",{cx:"30.0005",cy:"29.5225",r:"20.0513",fill:"#FEE4E2"}),t.jsx("path",{d:"M30 26.6782V30.5366M30 34.395H30.0097M28.3506 21.7202L20.1804 35.3596C20.012 35.6513 19.9228 35.9821 19.9219 36.3189C19.9209 36.6558 20.0082 36.987 20.175 37.2797C20.3418 37.5723 20.5824 37.8162 20.8727 37.987C21.163 38.1579 21.493 38.2497 21.8299 38.2534H38.1702C38.507 38.2497 38.837 38.1579 39.1274 37.987C39.4177 37.8162 39.6582 37.5723 39.825 37.2797C39.9919 36.987 40.0791 36.6558 40.0782 36.3189C40.0773 35.9821 39.9881 35.6513 39.8197 35.3596L31.6495 21.7202C31.4775 21.4367 31.2354 21.2023 30.9465 21.0396C30.6576 20.877 30.3316 20.7915 30 20.7915C29.6685 20.7915 29.3425 20.877 29.0536 21.0396C28.7647 21.2023 28.5225 21.4367 28.3506 21.7202Z",stroke:"#F04438",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),Y=i=>{let e=i.length-1;if(e<0||i[e].messageOwner==="user")return null;let d=0;for(;e>=0&&i[e].messageOwner!=="user"&&i[e].messageOwner!=="Бот";)d++,e--;return d||null},ee=document.getElementById("modal-root"),N=({onFinishChat:i,closeModal:e,isTablet:d})=>{r.useEffect(()=>{const l=p=>{p.code==="Escape"&&e()};return window.addEventListener("keydown",l),()=>{window.removeEventListener("keydown",l)}},[e]);const b=l=>{l.target===l.currentTarget&&e()};return H.createPortal(t.jsx("div",{onMouseDown:b,className:"fixed z-40 top-[0] left-[0] w-[100vw] h-[100vh] bg-aditional1",children:t.jsxs("div",{className:`absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   flex flex-col gap-m2 py-m h-auto items-center justify-center
                 bg-bgWhite rounded-medium ${d?"w-[400px] px-s":"w-[350px] px-xs"}`,children:[t.jsxs("div",{className:"flex flex-col gap-xs items-center justify-center",children:[t.jsx(X,{}),t.jsxs("div",{className:"flex flex-col gap-xs2 items-center justify-center",children:[t.jsx("h4",{className:"font-500 text-heading4 text-textPrimary",children:"Завершити чат з оператором?"}),t.jsx("p",{className:"font-400 text-body text-textSecondary text-center",children:"Ви впевнені, що хочете завершити діалог з оператором?"})]})]}),t.jsxs("div",{className:"flex gap-xs justify-between",children:[t.jsx(D,{buttonType:"secondary-gray",className:`font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300 focus:outline-none min-w-[150px] bg-bgWhite text-textPrimary border-solid border-1 border-borderDefault py-xs leading-6 hover:bg-bgHoverGrey focus:shadow-btFocus  active:bg-bgPressedGrey active:border-borderDefault h-[48px] ${d?"px-m":"px-s"}`,text:"Скасувати",onClick:e}),t.jsx(D,{buttonType:"desctructive",className:`font-500 rounded-medium flex justify-center items-center gap-xs2 transition-colors duration-300 focus:outline-none min-w-[150px] text-textContrast bg-bgDefaultDestructive py-xs leading-6 hover:bg-bgHoverDestructive focus:bg-bgDefaultDestructive focus:shadow-btFocus disabled:border-solid  disabled:border-1 disabled:border-borderDisabled active:bg-bgPressedDestructive h-[48px] ${d?"px-m":"px-s"}`,text:"Так, завершити",onClick:()=>i()})]})]})}),ee)};N.propTypes={onFinishChat:y.func.isRequired,closeModal:y.func.isRequired,isTablet:y.bool.isRequired};const te=({isTablet:i})=>{const e=P(),d=R(),[b,l]=r.useState(!1),[p,M]=r.useState(!1),[S,C]=r.useState(!1),[I,k]=r.useState(!0),E=w(L),s=w(_),h=w(q),x=r.useRef(null),m=localStorage.getItem("userId");r.useEffect(()=>{if(s){const{messages:a}=s,n=Y(a);o.emit("countUnreadManagerMessages",{userId:m,countUnreadManagerMessages:n})}},[s,m]),r.useEffect(()=>{o.emit("authentication",{token:E}),l(!0)},[E]),o.on("authenticationError",({message:a})=>{U.error(a),l(!1)}),r.useEffect(()=>(o.on("closeChatByManager",({room:a})=>{e({type:W,payload:{room:a}})}),()=>{o.off("closeChatByManager")}),[e]),r.useEffect(()=>{!s&&h.isOnline===!0&&e(z(m))},[s,e,h.isOnline,m]),r.useEffect(()=>(o.on("managerMessage",({roomId:a,message:n})=>{e({type:j,payload:{roomId:a,message:n}})}),()=>{o.off("managerMessage")}),[e]),r.useEffect(()=>(o.on("managerTyping",({isTyping:a,roomId:n})=>{const{_id:c}=s;M(!!(a&&c&&n===c))}),()=>{o.off("managerTyping")}),[s]),r.useEffect(()=>(o.on("userStatusChanged",({userId:a,isOnline:n})=>{e({type:G,payload:{userId:a,isOnline:n}})}),()=>{o.off("userStatusChanged")}),[e]),r.useEffect(()=>(o.on("managerJoinToChat",a=>{e({type:T,payload:a});const{_id:n,managerName:c,managerSurname:u}=a;if(c){const f={roomId:n,message:{messageOwner:"Бот",messageType:"text",messageText:`До чату приєднався менеджер ${c} ${u}`,createdAt:Date.now()}};e({type:j,payload:f})}}),()=>{o.off("managerJoinToChat")}),[e]),r.useEffect(()=>(o.on("disconnectManager",a=>{const{_id:n,managerName:c,managerSurname:u}=s;if(s){const f=a.findIndex(g=>g._id===n);if(f!==-1){e({type:T,payload:a[f]});const g={roomId:n,message:{messageOwner:"Бот",messageType:"text",messageText:`Менеджер ${c} ${u} від'єднався. Очікуйте підключення менеджера...`,createdAt:Date.now()}};e({type:j,payload:g})}}}),()=>{o.off("disconnectManager")}),[s,e]),r.useEffect(()=>{if(x.current){const a=x.current.scrollHeight,n=x.current.clientHeight;a>n&&(x.current.scrollTop=a-n)}},[s,p]);const O=()=>{s&&(e(Z({chatRoomId:s._id,userId:m,username:h.username,userSurname:h.userSurname})),k(!1),C(!1),d("/"))},F=()=>C(!0);return b?t.jsxs("div",{children:[t.jsxs(J,{children:[t.jsxs("section",{ref:x,className:`flex flex-col gap-sPlus 
          ${i?"max-h-[83vh] py-sPlus":"max-h-[400px] py-s"}
           message-container`,children:[s&&t.jsx(v,{type:"text",text:K,time:s==null?void 0:s.createdAt}),s&&(s==null?void 0:s.messages.map((a,n)=>{const{_id:c=n,messageOwner:u,messageText:f,messageType:g,createdAt:B}=a,{managerName:$,managerSurname:A}=s;return t.jsx(v,{owner:u==="user"?"Ви":u==="Бот"?"Бот":`Менеджер ${$} ${A}`,type:g,text:f,time:B},c)})),p&&t.jsxs("div",{className:"flex gap-xs2",children:[t.jsx("div",{className:"font-400 text-caption text-textTertiary",children:"Менеджер друкує повідомлення"}),t.jsx(V,{height:20,width:48,radius:8})]}),!s&&t.jsx(v,{type:"text",text:"Менеджер завершив чат. Для продовження перейдіть в Головне меню",time:Date.now()})]}),S&&t.jsx(N,{onFinishChat:O,closeModal:()=>C(!1),isTablet:i})]}),t.jsx(Q,{isActiveMenu:I,isOpenModal:F,isTablet:i})]}):null};te.propTypes={isTablet:y.bool.isRequired};export{te as default};
