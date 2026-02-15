import{d4 as e,ds as a,dA as C,d7 as E,d9 as h,da as v,db as f,e1 as b,eS as P}from"./app-DJtU2-AF.js";import{a as I,c as x}from"./TodoList-CgrU7uwu-CXzkwH-D.js";import{n as L}from"./ScreenLayout-kyRBwF5n-DZWj5-_I.js";import{C as S}from"./circle-check-big-oNZxC6lu.js";import{F as w}from"./fingerprint-pattern-ByKm3jl9.js";import{c as A}from"./createLucideIcon-Bz_WhC8S.js";import"@solana/kit";import"@solana-program/token";import"@solana-program/token-2022";import"./check-D_GGLu1V.js";import"./ModalHeader-CvLNEZ0F-Bv1z9JmT.js";import"./Screen-DnEl8dVF-BQ0uAcWJ.js";import"./index-Dq_xe9dz-C8Rz5iaq.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],W=A("trash-2",N),M=({passkeys:n,isLoading:d,errorReason:u,success:y,expanded:i,onLinkPasskey:l,onUnlinkPasskey:o,onExpand:t,onBack:r,onClose:s})=>e.jsx(L,y?{title:"Passkeys updated",icon:S,iconVariant:"success",primaryCta:{label:"Done",onClick:s},onClose:s,watermark:!0}:i?{icon:w,title:"Your passkeys",onBack:r,onClose:s,watermark:!0,children:e.jsx(j,{passkeys:n,expanded:i,onUnlink:o,onExpand:t})}:{icon:w,title:"Set up passkey verification",subtitle:"Verify with passkey",primaryCta:{label:"Add new passkey",onClick:l,loading:d},onClose:s,watermark:!0,helpText:u||void 0,children:n.length===0?e.jsx(U,{}):e.jsx(B,{children:e.jsx(j,{passkeys:n,expanded:i,onUnlink:o,onExpand:t})})});let B=a.div`
  margin-bottom: 12px;
`,j=({passkeys:n,expanded:d,onUnlink:u,onExpand:y})=>{let[i,l]=h.useState([]),o=d?n.length:2;return e.jsxs("div",{children:[e.jsx(V,{children:"Your passkeys"}),e.jsxs(T,{children:[n.slice(0,o).map(t=>{var s;return e.jsxs(D,{children:[e.jsxs("div",{children:[e.jsx(z,{children:(r=t,r.authenticatorName?r.createdWithBrowser?`${r.authenticatorName} on ${r.createdWithBrowser}`:r.authenticatorName:r.createdWithBrowser?r.createdWithOs?`${r.createdWithBrowser} on ${r.createdWithOs}`:`${r.createdWithBrowser}`:"Unknown device")}),e.jsxs(O,{children:["Last used:"," ",((s=t.latestVerifiedAt??t.firstVerifiedAt)==null?void 0:s.toLocaleString())??"N/A"]})]}),e.jsx(R,{disabled:i.includes(t.credentialId),onClick:()=>(async p=>{l(m=>m.concat([p])),await u(p),l(m=>m.filter(k=>k!==p))})(t.credentialId),children:i.includes(t.credentialId)?e.jsx(P,{}):e.jsx(W,{size:16})})]},t.credentialId);var r}),n.length>2&&!d&&e.jsx($,{onClick:y,children:"View all"})]})]})},U=()=>e.jsxs(I,{style:{color:"var(--privy-color-foreground)"},children:[e.jsx(x,{children:"Verify with Touch ID, Face ID, PIN, or hardware key"}),e.jsx(x,{children:"Takes seconds to set up and use"}),e.jsx(x,{children:"Use your passkey to verify transactions and login to your account"})]});const ie={component:()=>{let{user:n,unlinkPasskey:d}=C(),{linkWithPasskey:u,closePrivyModal:y}=E(),i=n==null?void 0:n.linkedAccounts.filter(c=>c.type==="passkey"),[l,o]=h.useState(!1),[t,r]=h.useState(""),[s,p]=h.useState(!1),[m,k]=h.useState(!1);return h.useEffect(()=>{i.length===0&&k(!1)},[i.length]),e.jsx(M,{passkeys:i,isLoading:l,errorReason:t,success:s,expanded:m,onLinkPasskey:()=>{o(!0),u().then(()=>p(!0)).catch(c=>{if(c instanceof v){if(c.privyErrorCode===f.CANNOT_LINK_MORE_OF_TYPE)return void r("Cannot link more passkeys to account.");if(c.privyErrorCode===f.PASSKEY_NOT_ALLOWED)return void r("Passkey request timed out or rejected by user.")}r("Unknown error occurred.")}).finally(()=>{o(!1)})},onUnlinkPasskey:async c=>(o(!0),await d(c).then(()=>p(!0)).catch(g=>{g instanceof v&&g.privyErrorCode===f.MISSING_MFA_CREDENTIALS?r("Cannot unlink a passkey enrolled in MFA"):r("Unknown error occurred.")}).finally(()=>{o(!1)})),onExpand:()=>k(!0),onBack:()=>k(!1),onClose:()=>y()})}},oe=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 90px;
  border-radius: 50%;
  svg + svg {
    margin-left: 12px;
  }
  > svg {
    z-index: 2;
    color: var(--privy-color-accent) !important;
    stroke: var(--privy-color-accent) !important;
    fill: var(--privy-color-accent) !important;
  }
`;let _=b`
  && {
    width: 100%;
    font-size: 0.875rem;
    line-height: 1rem;

    /* Tablet and Up */
    @media (min-width: 440px) {
      font-size: 14px;
    }

    display: flex;
    gap: 12px;
    justify-content: center;

    padding: 6px 8px;
    background-color: var(--privy-color-background);
    transition: background-color 200ms ease;
    color: var(--privy-color-accent) !important;

    :focus {
      outline: none;
      box-shadow: none;
    }
  }
`;const $=a.button`
  ${_}
`;let T=a.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  padding: 0.5rem 0rem 0rem;
  flex-grow: 1;
  width: 100%;
`,V=a.div`
  line-height: 20px;
  height: 20px;
  font-size: 1em;
  font-weight: 450;
  display: flex;
  justify-content: flex-beginning;
  width: 100%;
`,z=a.div`
  font-size: 1em;
  line-height: 1.3em;
  font-weight: 500;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,O=a.div`
  font-size: 0.875rem;
  line-height: 1rem;
  color: #64668b;
  padding: 0.2em 0;
`,D=a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  gap: 10px;
  font-size: 0.875rem;
  line-height: 1rem;
  text-align: left;
  border-radius: 8px;
  border: 1px solid #e2e3f0 !important;
  width: 100%;
  height: 5em;
`,F=b`
  :focus,
  :hover,
  :active {
    outline: none;
  }
  display: flex;
  width: 2em;
  height: 2em;
  justify-content: center;
  align-items: center;
  svg {
    color: var(--privy-color-error);
  }
  svg:hover {
    color: var(--privy-color-foreground-3);
  }
`,R=a.button`
  ${F}
`;export{oe as DoubleIconWrapper,$ as LinkButton,ie as LinkPasskeyScreen,M as LinkPasskeyView,ie as default};
