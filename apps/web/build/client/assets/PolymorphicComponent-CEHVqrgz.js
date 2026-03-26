import{r as g}from"./chunk-D4RADZKF-DR2tpiPZ.js";if(typeof window<"u"){const r={};globalThis.process??(globalThis.process={});const t=globalThis.process.env??{};globalThis.process.env=new Proxy(Object.assign({},r,t),{get(n,s){return s in n?n[s]:void 0},has(){return!0}})}const m="data-render-id";function C(r,t){const n=Math.max(r,t),s=`
    <svg width="${n}" height="${n}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`}function v(r){const t=g.useRef(null);return r&&"instance"in r?t:r??t}const M=g.forwardRef(function({as:t,children:n,renderId:s,onError:k,...y},f){const p=t==="img"?{...y,onError:e=>{typeof k=="function"&&k(e);const o=e.currentTarget,{width:l,height:a}=o.getBoundingClientRect();o.dataset.hasFallback="1",o.onerror=null,o.src=C(Math.round(l)||128,Math.round(a)||128),o.style.objectFit="cover"}}:y,c=v(f);return g.useEffect(()=>{const e=c&&"current"in c?c.current:null;if(!e)return;if(t!=="img"){const l=()=>{const{width:d,height:i}=e.getBoundingClientRect();return C(Math.round(d)||128,Math.round(i)||128)},a=()=>{e.dataset.hasFallback="1",e.style.backgroundImage=`url("${l()}")`,e.style.backgroundSize="cover"},h=()=>{const d=getComputedStyle(e).backgroundImage,i=/url\(["']?(.+?)["']?\)/.exec(d),u=i==null?void 0:i[1];if(!u)return;const b=new Image;b.onerror=a,b.src=u};h();const x=new ResizeObserver(([d])=>{if(!e.dataset.hasFallback)return;const{width:i,height:u}=d.contentRect;e.style.backgroundImage=`url("${C(Math.round(i)||128,Math.round(u)||128)}")`});x.observe(e);const w=new MutationObserver(h);return w.observe(e,{attributes:!0,attributeFilter:["style","class"]}),()=>{x.disconnect(),w.disconnect()}}if(!e.dataset.hasFallback)return;const o=new ResizeObserver(([l])=>{const{width:a,height:h}=l.contentRect;e.src=C(Math.round(a)||128,Math.round(h)||128)});return o.observe(e),()=>o.disconnect()},[t,c]),g.createElement(t,Object.assign({},p,{ref:c,...s?{[m]:s}:void 0}),n)});export{M as C};
