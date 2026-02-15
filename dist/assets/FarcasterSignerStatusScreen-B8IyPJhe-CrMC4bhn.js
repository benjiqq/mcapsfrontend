import{d4 as t,d5 as F,d6 as T,d7 as I,d9 as d,dw as y,dy as w,e6 as O,dt as _,ds as n}from"./app-a--gX2DK.js";import{p as q}from"./CopyToClipboard-BGTSFnT3-BzCo2swm.js";import{n as B}from"./OpenLink-DZHy38vr-CR7lohb0.js";import{C as E}from"./QrCode-AKgpho6r-B1rElKhv.js";import{n as A}from"./ScreenLayout-kyRBwF5n-HwPofqy8.js";import{l as h}from"./farcaster-DPlSjvF5-mrEcgFXl.js";import"./copy-Bx2Jwc5_-C1HP8pAv.js";import"./dijkstra-D_NXgYpA.js";import"./ModalHeader-CvLNEZ0F-CMJbs6MB.js";import"./Screen-DnEl8dVF-_ko7cU4s.js";import"./index-Dq_xe9dz-rjE9Dbo-.js";let k="#8a63d2";const M=({appName:u,loading:m,success:i,errorMessage:e,connectUri:r,onBack:s,onClose:c,onOpenFarcaster:o})=>t.jsx(A,w||m?O?{title:e?e.message:"Add a signer to Farcaster",subtitle:e?e.detail:`This will allow ${u} to add casts, likes, follows, and more on your behalf.`,icon:h,iconVariant:"loading",iconLoadingStatus:{success:i,fail:!!e},primaryCta:r&&o?{label:"Open Farcaster app",onClick:o}:void 0,onBack:s,onClose:c,watermark:!0}:{title:e?e.message:"Requesting signer from Farcaster",subtitle:e?e.detail:"This should only take a moment",icon:h,iconVariant:"loading",iconLoadingStatus:{success:i,fail:!!e},onBack:s,onClose:c,watermark:!0,children:r&&w&&t.jsx(P,{children:t.jsx(B,{text:"Take me to Farcaster",url:r,color:k})})}:{title:"Add a signer to Farcaster",subtitle:`This will allow ${u} to add casts, likes, follows, and more on your behalf.`,onBack:s,onClose:c,watermark:!0,children:t.jsxs(R,{children:[t.jsx(L,{children:r?t.jsx(E,{url:r,size:275,squareLogoElement:h}):t.jsx(z,{children:t.jsx(_,{})})}),t.jsxs(N,{children:[t.jsx(V,{children:"Or copy this link and paste it into a phone browser to open the Farcaster app."}),r&&t.jsx(q,{text:r,itemName:"link",color:k})]})]})});let P=n.div`
  margin-top: 24px;
`,R=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,L=n.div`
  padding: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 275px;
`,N=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,V=n.div`
  font-size: 0.875rem;
  text-align: center;
  color: var(--privy-color-foreground-2);
`,z=n.div`
  position: relative;
  width: 82px;
  height: 82px;
`;const $={component:()=>{let{lastScreen:u,navigateBack:m,data:i}=F(),e=T(),{requestFarcasterSignerStatus:r,closePrivyModal:s}=I(),[c,o]=d.useState(void 0),[S,v]=d.useState(!1),[j,x]=d.useState(!1),g=d.useRef([]),a=i==null?void 0:i.farcasterSigner;d.useEffect(()=>{let C=Date.now(),l=setInterval(async()=>{if(!(a!=null&&a.public_key))return clearInterval(l),void o({retryable:!0,message:"Connect failed",detail:"Something went wrong. Please try again."});a.status==="approved"&&(clearInterval(l),v(!1),x(!0),g.current.push(setTimeout(()=>s({shouldCallAuthOnSuccess:!1,isSuccess:!0}),y)));let p=await r(a==null?void 0:a.public_key),b=Date.now()-C;p.status==="approved"?(clearInterval(l),v(!1),x(!0),g.current.push(setTimeout(()=>s({shouldCallAuthOnSuccess:!1,isSuccess:!0}),y))):b>3e5?(clearInterval(l),o({retryable:!0,message:"Connect failed",detail:"The request timed out. Try again."})):p.status==="revoked"&&(clearInterval(l),o({retryable:!0,message:"Request rejected",detail:"The request was rejected. Please try again."}))},2e3);return()=>{clearInterval(l),g.current.forEach(p=>clearTimeout(p))}},[]);let f=(a==null?void 0:a.status)==="pending_approval"?a.signer_approval_url:void 0;return t.jsx(M,{appName:e.name,loading:S,success:j,errorMessage:c,connectUri:f,onBack:u?m:void 0,onClose:s,onOpenFarcaster:()=>{f&&(window.location.href=f)}})}};export{$ as FarcasterSignerStatusScreen,M as FarcasterSignerStatusView,$ as default};
