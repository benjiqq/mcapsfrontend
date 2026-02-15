import{d9 as a,dA as I,d7 as T,d5 as _,d4 as e,eh as E,ei as U,dU as F,ds as p,e1 as W}from"./app-DJtU2-AF.js";import{F as N}from"./ShieldCheckIcon-B0pKjJkt.js";import{m as O}from"./ModalHeader-CvLNEZ0F-Bv1z9JmT.js";import{l as V}from"./Layouts-BlFm53ED-BKoOdq5c.js";import{g as H,h as M,u as D,b as B,k as K}from"./shared-CSN6-8CF-07gpqsTV.js";import{w as s}from"./Screen-DnEl8dVF-BQ0uAcWJ.js";import"@solana/kit";import"@solana-program/token-2022";import"@solana-program/token";import"./index-Dq_xe9dz-C8Rz5iaq.js";const ae={component:()=>{let[o,m]=a.useState(!0),{authenticated:y,user:g}=I(),{walletProxy:i,closePrivyModal:v,createAnalyticsEvent:x,client:j}=T(),{navigate:k,data:C,onUserCloseViaDialogOrKeybindRef:A}=_(),[l,P]=a.useState(void 0),[f,d]=a.useState(""),[c,w]=a.useState(!1),{entropyId:h,entropyIdVerifier:S,onCompleteNavigateTo:b,onSuccess:u,onFailure:$}=C.recoverWallet,n=(r="User exited before their wallet could be recovered")=>{v({shouldCallAuthOnSuccess:!1}),$(typeof r=="string"?new F(r):r)};return A.current=n,a.useEffect(()=>{if(!y)return n("User must be authenticated and have a Privy wallet before it can be recovered")},[y]),e.jsxs(s,{children:[e.jsx(s.Header,{icon:N,title:"Enter your password",subtitle:"Please provision your account on this new device. To continue, enter your recovery password.",showClose:!0,onClose:n}),e.jsx(s.Body,{children:e.jsx(Y,{children:e.jsxs("div",{children:[e.jsxs(H,{children:[e.jsx(M,{type:o?"password":"text",onChange:r=>(t=>{t&&P(t)})(r.target.value),disabled:c,style:{paddingRight:"2.3rem"}}),e.jsx(D,{style:{right:"0.75rem"},children:o?e.jsx(B,{onClick:()=>m(!1)}):e.jsx(K,{onClick:()=>m(!0)})})]}),!!f&&e.jsx(q,{children:f})]})})}),e.jsxs(s.Footer,{children:[e.jsx(s.HelpText,{children:e.jsxs(V,{children:[e.jsx("h4",{children:"Why is this necessary?"}),e.jsx("p",{children:"You previously set a password for this wallet. This helps ensure only you can access it"})]})}),e.jsx(s.Actions,{children:e.jsx(z,{loading:c||!i,disabled:!l,onClick:async()=>{w(!0);let r=await j.getAccessToken(),t=E(g,h);if(!r||!t||l===null)return n("User must be authenticated and have a Privy wallet before it can be recovered");try{x({eventName:"embedded_wallet_recovery_started",payload:{walletAddress:t.address}}),await(i==null?void 0:i.recover({accessToken:r,entropyId:h,entropyIdVerifier:S,recoveryPassword:l})),d(""),b?k(b):v({shouldCallAuthOnSuccess:!1}),u==null||u(t),x({eventName:"embedded_wallet_recovery_completed",payload:{walletAddress:t.address}})}catch(R){U(R)?d("Invalid recovery password, please try again."):d("An error has occurred, please try again.")}finally{w(!1)}},$hideAnimations:!h&&c,children:"Recover your account"})}),e.jsx(s.Watermark,{})]})]})}};let Y=p.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,q=p.div`
  line-height: 20px;
  height: 20px;
  font-size: 13px;
  color: var(--privy-color-error);
  text-align: left;
  margin-top: 0.5rem;
`,z=p(O)`
  ${({$hideAnimations:o})=>o&&W`
      && {
        // Remove animations because the recoverWallet task on the iframe partially
        // blocks the renderer, so the animation stutters and doesn't look good
        transition: none;
      }
    `}
`;export{ae as PasswordRecoveryScreen,ae as default};
