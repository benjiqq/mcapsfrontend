import{d4 as a,dA as A,d7 as N,d5 as k,d9 as o,eX as I,dG as b,es as E,et as C,dw as O,ds as u,bX as z,cb as P,eY as q}from"./app-DJtU2-AF.js";import{p as F}from"./CopyToClipboard-BGTSFnT3-C3Vuw_hW.js";import{a as V}from"./Layouts-BlFm53ED-BKoOdq5c.js";import{a as H,i as J}from"./JsonTree-aPaJmPx7-Csg5iYCu.js";import{n as X}from"./ScreenLayout-kyRBwF5n-DZWj5-_I.js";import{c as G}from"./createLucideIcon-Bz_WhC8S.js";import"@solana/kit";import"@solana-program/token";import"@solana-program/token-2022";import"./copy-Bx2Jwc5_-zveUG3Cv.js";import"./ModalHeader-CvLNEZ0F-Bv1z9JmT.js";import"./Screen-DnEl8dVF-BQ0uAcWJ.js";import"./index-Dq_xe9dz-C8Rz5iaq.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],Q=G("square-pen",K),W=u.img`
  && {
    height: ${e=>e.size==="sm"?"65px":"140px"};
    width: ${e=>e.size==="sm"?"65px":"140px"};
    border-radius: 16px;
    margin-bottom: 12px;
  }
`;let Y=e=>{if(!z(e))return e;try{let s=P(e);return s.includes("�")?e:s}catch{return e}},B=e=>{try{let s=q.decode(e),i=new TextDecoder().decode(s);return i.includes("�")?e:i}catch{return e}},Z=e=>{let{types:s,primaryType:i,...l}=e.typedData;return a.jsxs(a.Fragment,{children:[a.jsx(te,{data:l}),a.jsx(F,{text:(r=e.typedData,JSON.stringify(r,null,2)),itemName:"full payload to clipboard"})," "]});var r};const M=({method:e,messageData:s,copy:i,iconUrl:l,isLoading:r,success:g,walletProxyIsLoading:m,errorMessage:x,isCancellable:d,onSign:c,onCancel:y,onClose:p})=>a.jsx(X,{title:i.title,subtitle:i.description,showClose:!0,onClose:p,icon:Q,iconVariant:"subtle",helpText:x?a.jsx(ee,{children:x}):void 0,primaryCta:{label:i.buttonText,onClick:c,disabled:r||g||m,loading:r},secondaryCta:d?{label:"Not now",onClick:y,disabled:r||g||m}:void 0,watermark:!0,children:a.jsxs(V,{children:[l?a.jsx(W,{style:{alignSelf:"center"},size:"sm",src:l,alt:"app image"}):null,a.jsxs($,{children:[e==="personal_sign"&&a.jsx(w,{children:Y(s)}),e==="eth_signTypedData_v4"&&a.jsx(Z,{typedData:s}),e==="solana_signMessage"&&a.jsx(w,{children:B(s)})]})]})}),xe={component:()=>{let{authenticated:e}=A(),{initializeWalletProxy:s,closePrivyModal:i}=N(),{navigate:l,data:r,onUserCloseViaDialogOrKeybindRef:g}=k(),[m,x]=o.useState(!0),[d,c]=o.useState(""),[y,p]=o.useState(),[f,T]=o.useState(null),[R,S]=o.useState(!1);o.useEffect(()=>{e||l("LandingScreen")},[e]),o.useEffect(()=>{s(I).then(n=>{x(!1),n||(c("An error has occurred, please try again."),p(new b(new E(d,C.E32603_DEFAULT_INTERNAL_ERROR.eipCode))))})},[]);let{method:_,data:v,confirmAndSign:j,onSuccess:D,onFailure:L,uiOptions:t}=r.signMessage,U={title:(t==null?void 0:t.title)||"Sign message",description:(t==null?void 0:t.description)||"Signing this message will not cost you any fees.",buttonText:(t==null?void 0:t.buttonText)||"Sign and continue"},h=n=>{n?D(n):L(y||new b(new E("The user rejected the request.",C.E4001_USER_REJECTED_REQUEST.eipCode))),i({shouldCallAuthOnSuccess:!1}),setTimeout(()=>{T(null),c(""),p(void 0)},200)};return g.current=()=>{h(f)},a.jsx(M,{method:_,messageData:v,copy:U,iconUrl:t!=null&&t.iconUrl&&typeof t.iconUrl=="string"?t.iconUrl:void 0,isLoading:R,success:f!==null,walletProxyIsLoading:m,errorMessage:d,isCancellable:t==null?void 0:t.isCancellable,onSign:async()=>{S(!0),c("");try{let n=await j();T(n),S(!1),setTimeout(()=>{h(n)},O)}catch(n){console.error(n),c("An error has occurred, please try again."),p(new b(new E(d,C.E32603_DEFAULT_INTERNAL_ERROR.eipCode))),S(!1)}},onCancel:()=>h(null),onClose:()=>h(f)})}};let $=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,ee=u.p`
  && {
    margin: 0;
    width: 100%;
    text-align: center;
    color: var(--privy-color-error-dark);
    font-size: 14px;
    line-height: 22px;
  }
`,te=u(H)`
  margin-top: 0;
`,w=u(J)`
  margin-top: 0;
`;export{xe as SignRequestScreen,M as SignRequestView,xe as default};
