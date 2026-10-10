(()=>{
const S={on:1,d:2,j:1.6,t:1,p:'r',m:1,r:3,sym:'f',g:0,sh:0,loc:'c',cat:'b',ln:2,ds:0.7,cu:'u',fa:0,sw:1};
const bg=document.getElementById('bg'),cv=document.getElementById('cv'),cx=cv.getContext('2d');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches, touch=matchMedia('(hover: none)').matches;
let SL=[],LCV=document.createElement('canvas'),LCX=LCV.getContext('2d'),CF=[],W=0,H=0,DPR=1,N=0,SH=[],X,Y,Z,C,OX,OY,PH,DL,mx=-1e4,my=-1e4;
const rnd=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647})();
function polyArea(p){let a=0;for(let i=0;i<p.length;i++){const[q,w]=p[i],[e,r]=p[(i+1)%p.length];a+=q*r-e*w}return Math.abs(a)/2}
function polyPer(p){let l=0;for(let i=0;i<p.length;i++){const[q,w]=p[i],[e,r]=p[(i+1)%p.length];l+=Math.hypot(e-q,r-w)}return l}
function inPoly(x,y,p){let c=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const[xi,yi]=p[i],[xj,yj]=p[j];if((yi>y)!=(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c}
function onPer(p){const L=polyPer(p);let t=rnd()*L;for(let i=0;i<p.length;i++){const[q,w]=p[i],[e,r]=p[(i+1)%p.length],l=Math.hypot(e-q,r-w);if(t<=l){const f=t/l;return[q+(e-q)*f,w+(r-w)*f]}t-=l}return p[0]}
function circle(cx0,cy0,r,n=28){const o=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2;o.push([cx0+r*Math.cos(a),cy0+r*Math.sin(a)])}return o}
function prism(sec,L,map,ef=.4){const per=[sec.outer,...sec.holes].reduce((a,p)=>a+polyPer(p),0);
  const cap=polyArea(sec.outer)-sec.holes.reduce((a,p)=>a+polyArea(p),0);
  let bb=sec.outer.reduce((b,[u,v])=>[Math.min(b[0],u),Math.min(b[1],v),Math.max(b[2],u),Math.max(b[3],v)],[1e9,1e9,-1e9,-1e9]);
  const rings=[sec.outer,...sec.holes],vr=ef>=1?rings.map(r=>r.length<=16?r:[1,3].map(k=>r[Math.floor(k*r.length/4)])):rings.filter(r=>r.length<=16);
  const edges=[];for(const r of rings)for(let i=0;i<r.length;i++){const[a,b]=r[i],[c,d]=r[(i+1)%r.length];for(const w of[-.5*L,.5*L])edges.push([map(a,b,w),map(c,d,w)])}
  for(const r of vr)for(const[u,v]of r)edges.push([map(u,v,-.5*L),map(u,v,.5*L)]);
  return{edges,area:per*L+2*cap*.6,sample(){
    if(rnd()<ef){if(rnd()<(ef>.85?.35:.55)||!vr.length){const r=rings[Math.floor(rnd()*rings.length)];const[u,v]=onPer(r);return map(u,v,(rnd()<.5?-.5:.5)*L)}
      const r=ef>=1&&vr.length>1&&rnd()<.6?vr[0]:vr[Math.floor(rnd()*vr.length)],[u,v]=r[Math.floor(rnd()*r.length)];return map(u,v,(rnd()-.5)*L)}
    if(rnd()<per*L/(per*L+2*cap*.6)){let t=rnd()*per,ring=sec.outer;for(const p of[sec.outer,...sec.holes]){const l=polyPer(p);if(t<=l){ring=p;break}t-=l}
      const[u,v]=onPer(ring);return map(u,v,(rnd()-.5)*L)}
    for(;;){const u=bb[0]+rnd()*(bb[2]-bb[0]),v=bb[1]+rnd()*(bb[3]-bb[1]);if(inPoly(u,v,sec.outer)&&!sec.holes.some(h=>inPoly(u,v,h)))return map(u,v,(rnd()<.5?-.5:.5)*L)}}}}
function cloud(parts,n){parts=cloudW(parts);const A=parts.reduce((a,p)=>a+p.area,0),o=[];o.ls=[];for(const p of parts){if(p.edges)for(const[a,b]of p.edges)o.ls.push([a,b,0]);if(p.segs)for(const[a,b]of p.segs)o.ls.push([a,b,p.f||0])}
  for(let i=0;i<n;i++){let t=rnd()*A,pp=parts[0];for(const p of parts){if(t<=p.area){pp=p;break}t-=p.area}const v=pp.sample();o.push([v[0],v[1],v[2],pp.f||0])}return o}
function cloudW(parts){for(const p of parts)if(p.f===1&&!p._s){p.area*=S.r;p._s=1}return parts}
function W8(part,a){part.area=a;return part}
function bars(segs){const ln=([p,q])=>Math.hypot(q[0]-p[0],q[1]-p[1],q[2]-p[2]);const L=segs.reduce((a,sg)=>a+ln(sg),0);
  return{segs,area:L,f:1,sample(){let t=rnd()*L;for(const sg of segs){const l=ln(sg);if(t<=l){const f=t/l,[a,b]=sg;return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f]}t-=l}return segs[0][0]}}}
function loop(P){const o=[];for(let i=0;i<P.length;i++)o.push([P[i],P[(i+1)%P.length]]);return o}
function globe(n){const o=[],g=Math.PI*(3-Math.sqrt(5)),r=.82;for(let i=0;i<n;i++){
  if(i%3===0){const k=i%36;let lat,lon;if(k<18){lon=Math.floor(k/1.5)*Math.PI/6;lat=(rnd()-.5)*Math.PI}else{lat=(Math.floor((k-18)/2.6)-3)*Math.PI/8;lon=rnd()*Math.PI*2}
    o.push([r*Math.cos(lat)*Math.cos(lon),r*Math.sin(lat),r*Math.cos(lat)*Math.sin(lon)])}
  else{const y=1-2*(i+.5)/n,rr=Math.sqrt(1-y*y),a=g*i;o.push([r*rr*Math.cos(a),r*y,r*rr*Math.sin(a)])}}return o}
function ibeam(n){const h=.62,b=.5,tf=.08,tw=.06;const sec={outer:[[-b/2,-h/2],[b/2,-h/2],[b/2,-h/2+tf],[tw/2,-h/2+tf],[tw/2,h/2-tf],[b/2,h/2-tf],[b/2,h/2],[-b/2,h/2],[-b/2,h/2-tf],[-tw/2,h/2-tf],[-tw/2,-h/2+tf],[-b/2,-h/2+tf]],holes:[]};
  return cloud([prism(sec,1.9,(u,v,w)=>[w,v,u])],n)}
function hollowcore(n){const B=1.0,h=.24,holes=[];for(let k=0;k<6;k++)holes.push(circle(-B/2+B/12+k*B/6,0,.07,20));
  const sec={outer:[[-B/2,-h/2],[B/2,-h/2],[B/2*.97,h/2],[-B/2*.97,h/2]],holes};return cloud([prism(sec,1.8,(u,v,w)=>[w,v-.05,u])],n)}
function arch(n){const out=[],inn=[],M=40,th=.15;for(let i=0;i<=M;i++){const s=i/M,a=Math.PI*(1-s);
    const cx0=.66*Math.cos(a)*(1+.18*Math.pow(Math.abs(Math.cos(a)),3)),cy0=-.5+1.0*Math.pow(Math.sin(a),.75);
    const s2=Math.min(1,(i+1)/M),a2=Math.PI*(1-s2),s0=Math.max(0,(i-1)/M),a0=Math.PI*(1-s0);
    const f=a=>[.66*Math.cos(a)*(1+.18*Math.pow(Math.abs(Math.cos(a)),3)),-.5+Math.pow(Math.sin(a),.75)];
    const p2=f(a2),p0=f(a0);let dx=p2[0]-p0[0],dy=p2[1]-p0[1];const l=Math.hypot(dx,dy)||1;const nx=-dy/l,ny=dx/l;
    out.push([cx0+nx*th,cy0+ny*th]);inn.push([cx0-nx*th,cy0-ny*th])}
  const sec={outer:[...out,...inn.reverse()],holes:[]};return cloud([prism(sec,.34,(u,v,w)=>[u,v,w])],n)}
function rcbeam(n){const b=.32,h=.56,L=1.9,c=.045,M=(u,v,w)=>[w,v,u];
  const con=W8(prism({outer:[[-b/2,-h/2],[b/2,-h/2],[b/2,h/2],[-b/2,h/2]],holes:[]},L,M,.75),.55);
  const sg=[];const yb=-h/2+c,yt=h/2-c,xs=b/2-c;
  for(const u of[-xs,0,xs])sg.push([M(u,yb,-L/2+.03),M(u,yb,L/2-.03)]);
  for(const u of[-xs,xs])sg.push([M(u,yt,-L/2+.03),M(u,yt,L/2-.03)]);
  for(let w=-L/2+.06;w<=L/2-.05;w+=.12)sg.push(...loop([M(-xs,yb,w),M(xs,yb,w),M(xs,yt,w),M(-xs,yt,w)]));
  return cloud([con,W8(bars(sg),.45)],n)}
function ttslab(n){const sec={outer:[[-.6,.2],[.6,.2],[.6,.14],[.34,.14],[.32,-.22],[.26,-.22],[.24,.14],[-.24,.14],[-.26,-.22],[-.32,-.22],[-.34,.14],[-.6,.14]],holes:[]};
  return cloud([prism(sec,1.9,(u,v,w)=>[w,v,u])],n)}
function wall(n){const sec={outer:[[-.75,-.48],[.75,-.48],[.75,.48],[-.75,.48]],holes:[[[-.45,-.12],[.05,-.12],[.05,.3],[-.45,.3]],[[.25,-.48],[.55,-.48],[.55,.25],[.25,.25]]]};
  sec.outer=[[-.75,-.48],[.25,-.48],[.25,.25],[.55,.25],[.55,-.48],[.75,-.48],[.75,.48],[-.75,.48]];sec.holes=[sec.holes[0]];
  return cloud([prism(sec,.12,(u,v,w)=>[u,v,w])],n)}
function stairs(n){const g=.2,r=.14,x0=-.6,y0=-.42,P=[[x0,y0]];for(let k=0;k<6;k++){P.push([x0+k*g,y0+(k+1)*r]);P.push([x0+(k+1)*g,y0+(k+1)*r])}
  P.push([x0+6*g,y0+6*r-.2]);P.push([x0+6*g-(6*r-.2)/(r/g),y0]);
  return cloud([prism({outer:P,holes:[]},.6,(u,v,w)=>[u,v,w])],n)}

function inSec(u,v,sec){return inPoly(u,v,sec.outer)&&!sec.holes.some(h=>inPoly(u,v,h))}
function mesh(sec,sp,w,M,ins){const sg=[],st=.02;const bb=sec.outer.reduce((b,[u,v])=>[Math.min(b[0],u),Math.min(b[1],v),Math.max(b[2],u),Math.max(b[3],v)],[1e9,1e9,-1e9,-1e9]);
  const ok=(u,v)=>inSec(u,v,sec)&&[[ins,0],[-ins,0],[0,ins],[0,-ins]].every(([a,c])=>inSec(u+a,v+c,sec));
  for(let v=bb[1]+ins;v<=bb[3]-ins+1e-6;v+=sp)for(let u=bb[0];u<bb[2];u+=st)if(ok(u+st/2,v))sg.push([M(u,v,w),M(u+st,v,w)]);
  for(let u=bb[0]+ins;u<=bb[2]-ins+1e-6;u+=sp)for(let v=bb[1];v<bb[3];v+=st)if(ok(u,v+st/2))sg.push([M(u,v,w),M(u,v+st,w)]);return sg}
const CW=.55,RW=.45;
function ibeamP(n){const h=.62,b=.5,tf=.08,tw=.06,L=1.9,M=(u,v,w)=>[w,v,u];const sec={outer:[[-b/2,-h/2],[b/2,-h/2],[b/2,-h/2+tf],[tw/2,-h/2+tf],[tw/2,h/2-tf],[b/2,h/2-tf],[b/2,h/2],[-b/2,h/2],[-b/2,h/2-tf],[-tw/2,h/2-tf],[-tw/2,-h/2+tf],[-b/2,-h/2+tf]],holes:[]};
  const sg=[],E=L/2-.02;for(const u of[-.18,-.06,.06,.18])for(const v of[-h/2+.025,-h/2+.055])sg.push([M(u,v,-E),M(u,v,E)]);
  for(const u of[-.15,.15])sg.push([M(u,h/2-.03,-E),M(u,h/2-.03,E)]);
  for(let w=-E+.04;w<=E;w+=.14)sg.push([M(0,-h/2+.03,w),M(0,h/2-.03,w)]);
  return cloud([W8(prism(sec,L,M,.75),CW),W8(bars(sg),RW)],n)}
function hollowcoreP(n){const B=1.0,h=.24,L=1.8,holes=[];for(let k=0;k<6;k++)holes.push(circle(-B/2+B/12+k*B/6,0,.07,20));
  const M=(u,v,w)=>[w,v-.05,u];const sec={outer:[[-B/2,-h/2],[B/2,-h/2],[B/2*.97,h/2],[-B/2*.97,h/2]],holes};
  const sg=[],E=L/2-.02;for(let k=0;k<7;k++)sg.push([M(-B/2+k*B/6+(k==0?.03:k==6?-.03:0),-h/2+.03,-E),M(-B/2+k*B/6+(k==0?.03:k==6?-.03:0),-h/2+.03,E)]);
  return cloud([W8(prism(sec,L,M,.75),CW),W8(bars(sg),.35)],n)}
function ttslabP(n){const L=1.55,M=(u,v,w)=>[w,v,u];const sec={outer:[[-.6,.2],[.6,.2],[.6,.14],[.34,.14],[.32,-.22],[.26,-.22],[.24,.14],[-.24,.14],[-.26,-.22],[-.32,-.22],[-.34,.14],[-.6,.14]],holes:[]};
  const sg=[],E=L/2-.02;for(const c of[-.29,.29])for(const v of[-.19,-.15,-.11])sg.push([M(c,v,-E),M(c,v,E)]);
  for(let u=-.55;u<=.56;u+=.11)sg.push([M(u,.17,-E),M(u,.17,E)]);for(let w=-E;w<=E;w+=.16)sg.push([M(-.57,.17,w),M(.57,.17,w)]);
  return cloud([W8(prism(sec,L,M,.75),CW),W8(bars(sg),RW)],n)}
function archP(n){const f=a=>[.66*Math.cos(a)*(1+.18*Math.pow(Math.abs(Math.cos(a)),3)),-.5+Math.pow(Math.sin(a),.75)];
  const Mn=40,th=.15,D=.34,out=[],inn=[],axis=[];for(let i=0;i<=Mn;i++){const a=Math.PI*(1-i/Mn),c=f(a),p2=f(Math.PI*(1-Math.min(1,(i+1)/Mn))),p0=f(Math.PI*(1-Math.max(0,(i-1)/Mn)));
    const dx=p2[0]-p0[0],dy=p2[1]-p0[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;out.push([c[0]+nx*th,c[1]+ny*th]);inn.push([c[0]-nx*th,c[1]-ny*th]);axis.push([c,nx,ny])}
  const sec={outer:[...out,...inn.slice().reverse()],holes:[]};const sg=[];
  for(const o of[th-.035,-(th-.035)])for(const z of[-D/2+.04,D/2-.04])for(let i=0;i<Mn;i++){const[c,nx,ny]=axis[i],[c2,nx2,ny2]=axis[i+1];sg.push([[c[0]+nx*o,c[1]+ny*o,z],[c2[0]+nx2*o,c2[1]+ny2*o,z]])}
  for(let i=1;i<Mn;i+=2){const[c,nx,ny]=axis[i],o=th-.035,z=D/2-.04;sg.push(...loop([[c[0]+nx*o,c[1]+ny*o,-z],[c[0]-nx*o,c[1]-ny*o,-z],[c[0]-nx*o,c[1]-ny*o,z],[c[0]+nx*o,c[1]+ny*o,z]]))}
  return cloud([W8(prism(sec,D,(u,v,w)=>[u,v,w],.75),CW),W8(bars(sg),RW)],n)}
function wallP(n){const sec={outer:[[-.75,-.48],[.25,-.48],[.25,.25],[.55,.25],[.55,-.48],[.75,-.48],[.75,.48],[-.75,.48]],holes:[[[-.45,-.12],[.05,-.12],[.05,.3],[-.45,.3]]]};
  const M=(u,v,w)=>[u,v,w];return cloud([W8(prism(sec,.12,M,.75),CW),W8(bars(mesh(sec,.1,0,M,.04)),RW)],n)}
function stairsP(n){const g=.2,r=.14,x0=-.6,y0=-.42,Wd=.6,P=[[x0,y0]];for(let k=0;k<6;k++){P.push([x0+k*g,y0+(k+1)*r]);P.push([x0+(k+1)*g,y0+(k+1)*r])}
  const xb=x0+6*g-(6*r-.2)/(r/g);P.push([x0+6*g,y0+6*r-.2]);P.push([xb,y0]);
  const M=(u,v,w)=>[u,v,w],sg=[],c=.04,ux=g/Math.hypot(g,r),uy=r/Math.hypot(g,r),nx=-uy,ny=ux;
  const A=[xb+nx*c,y0+ny*c+.0],B=[x0+6*g-c,y0+6*r-.2+ny*c];
  for(let z=-Wd/2+.05;z<=Wd/2-.04;z+=.1)sg.push([[A[0],A[1],z],[B[0],B[1],z]]);
  for(let t=0;t<=1.0001;t+=.1){const x=A[0]+(B[0]-A[0])*t,y=A[1]+(B[1]-A[1])*t;sg.push([[x,y,-Wd/2+.04],[x,y,Wd/2-.04]])}
  for(const z of[-Wd/2+.05,0,Wd/2-.05]){let q=[x0+c,y0+r-c];for(let k=0;k<6;k++){const a=[x0+k*g+c,y0+(k+1)*r-c],b=[x0+(k+1)*g-c+(k<5?c:0),y0+(k+1)*r-c];if(k>0)sg.push([[q[0],q[1],z],[a[0],a[1],z]]);sg.push([[a[0],a[1],z],[b[0],b[1],z]]);q=b}}
  return cloud([W8(prism({outer:P,holes:[]},Wd,M,.75),CW),W8(bars(sg),RW)],n)}
const SYMP=[[0.0215,0.4766],[0.0886,0.4769],[0.1053,0.4732],[0.1220,0.4731],[0.1571,0.4655],[0.1755,0.4631],[0.1885,0.4582],[0.2050,0.4555],[0.2179,0.4505],[0.2363,0.4459],[0.2638,0.4363],[0.2803,0.4276],[0.2894,0.4248],[0.2986,0.4199],[0.3077,0.4172],[0.3515,0.3942],[0.3606,0.3873],[0.3769,0.3777],[0.3842,0.3750],[0.4042,0.3605],[0.4132,0.3559],[0.4198,0.3496],[0.4386,0.3367],[0.4596,0.3189],[0.4683,0.3132],[0.4777,0.3036],[0.4864,0.2979],[0.4993,0.2845],[0.5091,0.2777],[0.5307,0.2548],[0.5415,0.2471],[0.6106,0.1734],[0.6161,0.1638],[0.6393,0.1389],[0.6447,0.1293],[0.6617,0.1109],[0.6647,0.1044],[0.6724,0.0956],[0.6760,0.0883],[0.6867,0.0765],[0.6903,0.0691],[0.6974,0.0611],[0.7010,0.0538],[0.7081,0.0458],[0.7117,0.0385],[0.7188,0.0305],[0.7224,0.0232],[0.7300,0.0144],[0.7325,0.0086],[0.7443,-0.0086],[0.7503,-0.0220],[0.7580,-0.0308],[0.7610,-0.0373],[0.7656,-0.0431],[0.7717,-0.0565],[0.7763,-0.0622],[0.7788,-0.0680],[0.7905,-0.0852],[0.7965,-0.0986],[0.8082,-0.1159],[0.8143,-0.1293],[0.8189,-0.1350],[0.8320,-0.1637],[0.8366,-0.1695],[0.8674,-0.2365],[0.8720,-0.2423],[0.8950,-0.2921],[0.8992,-0.3055],[0.9109,-0.3304],[0.9134,-0.3400],[0.9215,-0.3572],[0.9240,-0.3668],[0.9320,-0.3840],[0.9345,-0.3936],[0.9391,-0.4032],[0.9416,-0.4127],[0.9462,-0.4223],[0.9500,-0.4357],[0.9500,-0.4645],[0.9465,-0.4740],[0.9439,-0.4765],[0.9403,-0.4769],[0.6331,-0.4769],[0.6295,-0.4754],[0.6224,-0.4745],[0.6010,-0.4664],[0.5798,-0.4543],[0.5579,-0.4376],[0.5271,-0.4020],[0.5217,-0.3928],[0.5158,-0.3859],[0.5133,-0.3802],[0.5086,-0.3744],[0.5024,-0.3610],[0.4977,-0.3553],[0.4869,-0.3323],[0.4844,-0.3227],[0.4689,-0.2902],[0.4663,-0.2806],[0.4580,-0.2633],[0.4554,-0.2538],[0.4508,-0.2442],[0.4482,-0.2346],[0.4399,-0.2174],[0.4373,-0.2078],[0.4182,-0.1676],[0.4156,-0.1580],[0.3811,-0.0852],[0.3746,-0.0756],[0.3629,-0.0507],[0.3564,-0.0412],[0.3484,-0.0239],[0.3418,-0.0143],[0.3374,-0.0048],[0.3236,0.0163],[0.3192,0.0259],[0.3090,0.0393],[0.2900,0.0699],[0.2729,0.0921],[0.2674,0.1014],[0.2546,0.1151],[0.2482,0.1255],[0.2050,0.1705],[0.1951,0.1772],[0.1855,0.1868],[0.1766,0.1925],[0.1708,0.1983],[0.1552,0.2073],[0.1423,0.2180],[0.1164,0.2314],[0.1071,0.2341],[0.0979,0.2390],[0.0867,0.2429],[0.0253,0.2433],[0.0215,0.2429],[-0.0009,0.2352],[-0.0197,0.2257],[-0.0290,0.2188],[-0.0384,0.2142],[-0.0516,0.2034],[-0.0712,0.1906],[-0.0930,0.1705],[-0.0987,0.1666],[-0.1318,0.1331],[-0.1394,0.1216],[-0.1555,0.1052],[-0.1613,0.0960],[-0.1670,0.0899],[-0.1727,0.0806],[-0.1904,0.0584],[-0.1956,0.0500],[-0.2013,0.0439],[-0.2133,0.0259],[-0.2179,0.0163],[-0.2325,-0.0048],[-0.2409,-0.0220],[-0.2594,-0.0507],[-0.2794,-0.0910],[-0.2845,-0.0986],[-0.2872,-0.1063],[-0.2922,-0.1139],[-0.2949,-0.1216],[-0.3038,-0.1369],[-0.3065,-0.1446],[-0.3270,-0.1848],[-0.3298,-0.1944],[-0.3504,-0.2346],[-0.3531,-0.2442],[-0.3620,-0.2614],[-0.3648,-0.2710],[-0.3738,-0.2882],[-0.3765,-0.2978],[-0.3816,-0.3074],[-0.3844,-0.3170],[-0.4001,-0.3476],[-0.4276,-0.3898],[-0.4341,-0.3966],[-0.4400,-0.4059],[-0.4749,-0.4396],[-0.4996,-0.4555],[-0.5236,-0.4669],[-0.5478,-0.4746],[-0.5558,-0.4754],[-0.5599,-0.4769],[-0.9136,-0.4769],[-0.9314,-0.4746],[-0.9341,-0.4731],[-0.9432,-0.4664],[-0.9493,-0.4587],[-0.9500,-0.4434],[-0.9376,-0.4185],[-0.9307,-0.4089],[-0.9218,-0.3878],[-0.9104,-0.3706],[-0.9069,-0.3610],[-0.9006,-0.3515],[-0.8972,-0.3419],[-0.8629,-0.2863],[-0.8597,-0.2768],[-0.8505,-0.2614],[-0.8424,-0.2519],[-0.8058,-0.1886],[-0.7978,-0.1791],[-0.7839,-0.1542],[-0.7760,-0.1446],[-0.7665,-0.1274],[-0.7459,-0.0986],[-0.7407,-0.0890],[-0.7246,-0.0680],[-0.7195,-0.0584],[-0.7119,-0.0488],[-0.6942,-0.0201],[-0.6867,-0.0124],[-0.6727,0.0075],[-0.6658,0.0144],[-0.6525,0.0335],[-0.6333,0.0557],[-0.6271,0.0650],[-0.6210,0.0711],[-0.6148,0.0803],[-0.6046,0.0902],[-0.5985,0.0994],[-0.5853,0.1121],[-0.5781,0.1224],[-0.5609,0.1389],[-0.5538,0.1492],[-0.5327,0.1695],[-0.5166,0.1887],[-0.4717,0.2318],[-0.4519,0.2471],[-0.4282,0.2701],[-0.4175,0.2768],[-0.4034,0.2902],[-0.3939,0.2959],[-0.3799,0.3094],[-0.3705,0.3151],[-0.3643,0.3208],[-0.3548,0.3266],[-0.3323,0.3444],[-0.3090,0.3597],[-0.2993,0.3643],[-0.2897,0.3712],[-0.2723,0.3797],[-0.2627,0.3865],[-0.2300,0.4026],[-0.2204,0.4095],[-0.2108,0.4122],[-0.1860,0.4248],[-0.1765,0.4276],[-0.1670,0.4325],[-0.1347,0.4429],[-0.1252,0.4478],[-0.0647,0.4631],[-0.0572,0.4639],[-0.0441,0.4673],[-0.0384,0.4674],[-0.0328,0.4693],[-0.0234,0.4693],[-0.0065,0.4731],[0.0066,0.4732],[0.0215,0.4766]];const SYG=[-0.5957,0.4067,0.5610,-0.2128];
function brandArch(n){const o=cloud([prism({outer:SYMP,holes:[]},.22,(u,v,w)=>[u,v,w],.3)],n);
  for(const q of o){const t=((q[0]-SYG[0])*SYG[2]+(q[1]-SYG[1])*SYG[3]);q[3]=2+Math.max(0,Math.min(4,Math.floor(t*5)))}
  o.ls=SYMP.map((p,i)=>{const q=SYMP[(i+1)%SYMP.length],t=((p[0]+q[0])/2-SYG[0])*SYG[2]+((p[1]+q[1])/2-SYG[1])*SYG[3];return[[p[0],p[1],0],[q[0],q[1],0],2+Math.max(0,Math.min(4,Math.floor(t*5)))]});return o}
function column(n){const a=.3,c=.04,M=(u,v,w)=>[u-.15,w-.05,v];
  const col=W8(prism({outer:[[-a/2,-a/2],[a/2,-a/2],[a/2,a/2],[-a/2,a/2]],holes:[]},1.3,M,.75),.4);
  const cor=W8(prism({outer:[[0,-.15],[.4,-.15],[.4,-.3],[0,-.5]],holes:[]},a,(u,v,w)=>[u,v+.35,w],.75),.15);
  const sg=[],e=a/2-c;for(const[u,v]of[[-e,-e],[e,-e],[e,e],[-e,e]])sg.push([M(u,v,-.62),M(u,v,.62)]);
  for(let w=-.6;w<=.61;w+=.1)sg.push(...loop([M(-e,-e,w),M(e,-e,w),M(e,e,w),M(-e,e,w)]));
  for(const z of[-e,0,e]){sg.push([[-.11,.17,z],[.36,.17,z]]);sg.push([[.36,.17,z],[.36,.03,z]])}
  return cloud([col,cor,W8(bars(sg),.45)],n)}
const CWR=1.1;
function fit(o,ex=2.2,ey=1.9){let b=[1e9,1e9,1e9,-1e9,-1e9,-1e9];for(const p of o)for(let j=0;j<3;j++){b[j]=Math.min(b[j],p[j]);b[j+3]=Math.max(b[j+3],p[j])}
  const k=Math.min(ex/Math.max(b[3]-b[0],b[5]-b[2]),ey/(b[4]-b[1])),c=[(b[0]+b[3])/2,(b[1]+b[4])/2,(b[2]+b[5])/2];
  for(const p of o)for(let j=0;j<3;j++)p[j]=(p[j]-c[j])*k;if(o.ls)for(const s of o.ls)for(let j=0;j<2;j++)s[j]=[0,1,2].map(i=>(s[j][i]-c[i])*k);return o}
const rect=(b,h)=>[[-b/2,-h/2],[b/2,-h/2],[b/2,h/2],[-b/2,h/2]];
function spos(L,e0,z,sd,sm){const a=[];for(let x=e0;x<=z+1e-6;x+=sd)a.push(x);const n=Math.max(1,Math.round((L-2*z)/sm)),st=(L-2*z)/n;const m=[];for(let i=1;i<n;i++)m.push(z+i*st);
  return[...a,...m,...a.slice().reverse().map(x=>L-x)].map(x=>x-L/2)}
function oval(cx0,cy0,a,b,n=22){const o=[];for(let i=0;i<n;i++){const t=i/n*Math.PI*2,c=Math.cos(t),s=Math.sin(t);o.push([cx0+a*Math.sign(c)*Math.pow(Math.abs(c),.8),cy0+b*Math.sign(s)*Math.pow(Math.abs(s),.8)])}return o}
function meshR(sec,sp,w,M,ins){const sg=[],st=.02;const bb=sec.outer.reduce((b,[u,v])=>[Math.min(b[0],u),Math.min(b[1],v),Math.max(b[2],u),Math.max(b[3],v)],[1e9,1e9,-1e9,-1e9]);
  const ok=(u,v)=>[[0,0],[ins,0],[-ins,0],[0,ins],[0,-ins]].every(([a,c])=>inSec(u+a,v+c,sec));
  const run=(f,a0,a1)=>{let s=null;for(let a=a0;a<=a1+1e-9;a+=st){const g=ok(...f(a));if(g&&s===null)s=a;if((!g||a+st>a1+1e-9)&&s!==null){const e=g?a:a-st;if(e-s>st)sg.push([M(...f(s),w),M(...f(e),w)]);s=null}}};
  for(let v=bb[1]+ins;v<=bb[3]-ins+1e-6;v+=sp)run(a=>[a,v],bb[0],bb[2]);
  for(let u=bb[0]+ins;u<=bb[2]-ins+1e-6;u+=sp)run(a=>[u,a],bb[1],bb[3]);return sg}

function ibeamR(n){const L=6,M=(u,v,w)=>[w,v,u];
  const sec={outer:[[-.2,-.45],[.2,-.45],[.2,-.3],[.07,-.22],[.07,.3],[.25,.35],[.25,.45],[-.25,.45],[-.25,.35],[-.07,.3],[-.07,-.22],[-.2,-.3]],holes:[]};
  const sg=[],E=L/2-.02;for(const u of[-.15,-.05,.05,.15])for(const v of[-.4,-.35])sg.push([M(u,v,-E),M(u,v,E)]);
  for(const u of[-.18,.18])sg.push([M(u,.4,-E),M(u,.4,E)]);
  const lk=[[-.16,-.415],[.16,-.415],[.16,-.315],[.035,-.235],[.035,.31],[.21,.36],[.21,.415],[-.21,.415],[-.21,.36],[-.035,.31],[-.035,-.235],[-.16,-.315]];
  for(const w of spos(L,.05,.9,.15,.3))sg.push(...loop(lk.map(([u,v])=>M(u,v,w))));
  return fit(cloud([W8(prism(sec,L,M,1),CWR),W8(bars(sg),RW)],n))}
function rcbeamR(n){const b=.3,h=.6,L=3.6,M=(u,v,w)=>[w,v,u];
  const sg=[],E=L/2-.03,ub=b/2-.048,yb=-h/2+.048,yt=h/2-.046,xs=b/2-.034,ys=h/2-.034;
  for(const u of[-ub,0,ub]){sg.push([M(u,yb,-E),M(u,yb,E)]);for(const s of[-1,1])sg.push([M(u,yb,s*E),M(u,yb+.3,s*E)])}
  for(const u of[-ub,ub])sg.push([M(u,yt,-E),M(u,yt,E)]);
  for(const w of spos(L,.05,.6,.1,.2))sg.push(...loop([M(-xs,-ys,w),M(xs,-ys,w),M(xs,ys,w),M(-xs,ys,w)]));
  return fit(cloud([W8(prism({outer:rect(b,h),holes:[]},L,M,1),CWR),W8(bars(sg),RW)],n))}
function hollowcoreR(n){const L=3,h=.265,M=(u,v,w)=>[w,v,u],holes=[],p=.195;for(let k=0;k<6;k++)holes.push(oval((k-2.5)*p,.005,.08,.095));
  const e=.598,outer=[[-e,-h/2],[e,-h/2],[e,-h/2+.03],[e-.012,-h/2+.05],[e-.012,h/2-.06],[e,h/2-.035],[e-.006,h/2],[-e+.006,h/2],[-e,h/2-.035],[-e+.012,h/2-.06],[-e+.012,-h/2+.05],[-e,-h/2+.03]];
  const sg=[],E=L/2-.01;for(let k=0;k<7;k++){const u=k===0?-(2.5*p+.06):k===6?2.5*p+.06:(k-3)*p;sg.push([M(u,-h/2+.04,-E),M(u,-h/2+.04,E)])}
  return fit(cloud([W8(prism({outer,holes},L,M,1),CWR),W8(bars(sg),.35)],n))}
function ttslabR(n){const L=5,M=(u,v,w)=>[w,v,u];
  const sec={outer:[[-1.2,.25],[1.2,.25],[1.2,.19],[.7,.19],[.66,-.25],[.54,-.25],[.5,.19],[-.5,.19],[-.54,-.25],[-.66,-.25],[-.7,.19],[-1.2,.19]],holes:[]};
  const sg=[],E=L/2-.02;for(const c of[-.6,.6]){for(const v of[-.205,-.155])for(const d of[-.028,.028])sg.push([M(c+d,v,-E),M(c+d,v,E)]);
    for(const w of spos(L,.05,.75,.15,.3))sg.push([M(c-.035,.22,w),M(c-.035,-.215,w)],[M(c-.035,-.215,w),M(c+.035,-.215,w)],[M(c+.035,-.215,w),M(c+.035,.22,w)])}
  const ms=[];for(let u=-1.05;u<=1.051;u+=.3)ms.push([M(u,.22,-E),M(u,.22,E)]);for(let w=-E+.1;w<=E-.1+1e-6;w+=.3)ms.push([M(-1.17,.22,w),M(1.17,.22,w)]);
  return fit(cloud([W8(prism(sec,L,M,1),CWR),W8(bars(sg),.3),W8(bars(ms),.12)],n))}
function wallR(n){const t=.2,M=(u,v,w)=>[u,v,w];
  const win=[[-2.2,-.6],[-.7,-.6],[-.7,.8],[-2.2,.8]],sec={outer:[[-3,-1.5],[.6,-1.5],[.6,.6],[1.6,.6],[1.6,-1.5],[3,-1.5],[3,1.5],[-3,1.5]],holes:[win]};
  const ms=[...meshR(sec,.3,-t/2+.04,M,.06),...meshR(sec,.3,t/2-.04,M,.06)],sg=[],o=.06,x=.5,d=.42;
  for(const v of[-.6-o,.8+o])sg.push([M(-2.2-x,v,0),M(-.7+x,v,0)]);for(const u of[-2.2-o,-.7+o])sg.push([M(u,-.6-x,0),M(u,.8+x,0)]);
  sg.push([M(.6-o,-1.46,0),M(.6-o,.6+x,0)],[M(1.6+o,-1.46,0),M(1.6+o,.6+x,0)],[M(.6-x,.6+o,0),M(1.6+x,.6+o,0)]);
  for(const[u,v,su,sv]of[[-2.2,-.6,-1,-1],[-.7,-.6,1,-1],[-.7,.8,1,1],[-2.2,.8,-1,1],[.6,.6,-1,1],[1.6,.6,1,1]]){const cu=u+su*.1,cv=v+sv*.1;sg.push([M(cu+su*d,cv-sv*d,0),M(cu-su*d,cv+sv*d,0)])}
  return fit(cloud([W8(prism(sec,t,M,1),CWR),W8(bars(ms),.4),W8(bars(sg),.12)],n))}
function columnR(n){const a=.5,H=3.6,M=(u,v,w)=>[u,w,v];
  const col=W8(prism({outer:rect(a,a),holes:[]},H,M,1),1.0);
  const yb=2.7-H/2,cor=W8(prism({outer:[[a/2,yb-.6],[a/2+.35,yb-.3],[a/2+.35,yb],[a/2,yb]],holes:[]},a,(u,v,w)=>[u,v,w],1),.32);
  const sg=[],e=a/2-.05,E=H/2-.03;for(const[u,v]of[[-e,-e],[0,-e],[e,-e],[e,0],[e,e],[0,e],[-e,e],[-e,0]])sg.push([M(u,v,-E),M(u,v,E)]);
  const ys=[];for(let y=.05;y<=.53;y+=.12)ys.push(y);for(let y=.78;y<1.95;y+=.25)ys.push(y);for(let y=1.95;y<=3.15;y+=.12)ys.push(y);for(let y=3.3;y<=3.56;y+=.12)ys.push(y);
  const ec=a/2-.034;for(const y of ys){const w=y-H/2;sg.push(...loop([M(-ec,-ec,w),M(ec,-ec,w),M(ec,ec,w),M(-ec,ec,w)]))}
  for(const z of[-.13,0,.13])sg.push([[-ec,yb-.05,z],[a/2+.31,yb-.05,z]],[[a/2+.31,yb-.05,z],[a/2+.31,yb-.32,z]]);
  for(const dy of[.15,.27,.39]){const y=yb-dy,xt=a/2+.31-(dy>.3?.08:0);sg.push(...loop([[-ec,y,-.15],[xt,y,-.15],[xt,y,.15],[-ec,y,.15]]))}
  return fit(cloud([col,cor,W8(bars(sg),.45)],n))}
function stairsR(n){const g=.28,r=.17,N0=10,t=.16,Wd=1.2,P=[[0,0]];for(let k=0;k<N0;k++){P.push([k*g,(k+1)*r]);P.push([(k+1)*g,(k+1)*r])}
  const cs=g/Math.hypot(g,r),dr=t/cs,xb=dr*g/r;P.push([N0*g,N0*r-dr]);P.push([xb,0]);
  const M=(u,v,w)=>[u,v,w],sg=[],c=.035,yl=x=>r/g*x-dr+c/cs,A=[xb+.06,yl(xb+.06)],B=[N0*g-.04,yl(N0*g-.04)];
  for(let z=-Wd/2+.05;z<=Wd/2-.049;z+=.15)sg.push([[A[0],A[1],z],[B[0],B[1],z]]);
  for(let s=0;s<=1.0001;s+=.25/Math.hypot(B[0]-A[0],B[1]-A[1]))sg.push([[A[0]+(B[0]-A[0])*s,A[1]+(B[1]-A[1])*s,-Wd/2+.04],[A[0]+(B[0]-A[0])*s,A[1]+(B[1]-A[1])*s,Wd/2-.04]]);
  for(let k=0;k<N0;k++)sg.push([[(k+1)*g-.04,(k+1)*r-.04,-Wd/2+.04],[(k+1)*g-.04,(k+1)*r-.04,Wd/2-.04]]);
  const ed=bars(P.map(([u,v])=>[[u,v,-Wd/2],[u,v,Wd/2]]));ed.f=0;
  return fit(cloud([W8(prism({outer:P,holes:[]},Wd,M,1),CWR*.7),W8(ed,.45),W8(bars(sg),RW)],n))}
function roofgirderR(n){const L=8,hl=L/2,s=Math.hypot(hl,.65),ca=hl/s,sa=.65/s,yt=x=>.45+.65*(1-Math.abs(x)/hl);
  const web=W8(prism({outer:[[-hl,.2],[hl,.2],[hl,.45],[0,1.1],[-hl,.45]],holes:[]},.12,(u,v,w)=>[u,v,w],1),CWR*.45);
  const bot=W8(prism({outer:rect(.4,.2),holes:[]},L,(u,v,w)=>[w,v+.1,u],1),CWR*.35);
  const tl=W8(prism({outer:rect(.4,.15),holes:[]},s,(u,v,w)=>[-hl/2+w*ca-v*sa,.85+w*sa+v*ca,u],1),CWR*.25);
  const tr=W8(prism({outer:rect(.4,.15),holes:[]},s,(u,v,w)=>[hl/2+w*ca+v*sa,.85-w*sa+v*ca,u],1),CWR*.25);
  const sg=[],E=hl-.03;for(const z of[-.13,-.045,.045,.13])for(const y of[.05,.11])sg.push([[-E,y,z],[E,y,z]]);
  for(const z of[-.14,.14]){sg.push([[-E,yt(-E)+.09,z],[0,yt(0)+.09,z]],[[0,yt(0)+.09,z],[E,yt(E)+.09,z]])}
  for(const x of spos(L,.05,1.0,.15,.35)){const y1=yt(x)+.11;sg.push([[x,.04,-.03],[x,y1,-.03]],[[x,.04,.03],[x,y1,.03]],[[x,.04,-.03],[x,.04,.03]])}
  return fit(cloud([web,bot,tl,tr,W8(bars(sg),RW)],n))}
function socketR(n){const slab=W8(prism({outer:rect(1.8,1.8),holes:[]},.5,(u,v,w)=>[u,w+.25,v],1),CWR*.55);
  const sock=W8(prism({outer:rect(1.1,1.1),holes:[rect(.7,.7)]},.7,(u,v,w)=>[u,w+.85,v],1),CWR*.5);
  const sg=[],e=.84;for(let a=-.8;a<=.801;a+=.2){sg.push([[a,.06,-e],[a,.06,e]],[[-e,.09,a],[e,.09,a]])}
  const c=.45;for(const[x,z]of[[-c,-c],[0,-c],[c,-c],[c,0],[c,c],[0,c],[-c,c],[-c,0]]){sg.push([[x,.1,z],[x,1.15,z]],[[x,.1,z],[x*1.6,.1,z*1.6]])}
  for(const y of[.6,.8,.95,1.05,1.15])sg.push(...loop([[-c,y,-c],[c,y,-c],[c,y,c],[-c,y,c]]));
  return fit(cloud([slab,sock,W8(bars(sg),RW)],n),1.5,1.3)}
function filigreeR(n){const L=3.6,B=2.4,M=(u,v,w)=>[w,v+.03,u];
  const sh=W8(prism({outer:rect(B,.06),holes:[]},L,M,1),CWR*.8);
  const lg=[],E=L/2-.05;for(const zc of[-.8,0,.8]){lg.push([[-E,.18,zc],[E,.18,zc]]);for(const d of[-.04,.04]){lg.push([[-E,.03,zc+d],[E,.03,zc+d]]);
    for(let x=-E;x<E-1e-6;x+=.2){lg.push([[x,.03,zc+d],[x+.1,.18,zc]],[[x+.1,.18,zc],[x+.2,.03,zc+d]])}}}
  const tb=[];for(let x=-E+.05;x<=E;x+=.25)tb.push([[x,.022,-B/2+.04],[x,.022,B/2-.04]]);
  return fit(cloud([sh,W8(bars(lg),1.1),W8(bars(tb),.07)],n),1.8)}
const SHAPES=[brandArch,wallR,ttslabR,ibeamR,stairsR,hollowcoreR,columnR,filigreeR,rcbeamR,socketR,roofgirderR];
const VIEW=new Map([[ibeamR,[.35,-.06,1.45,.35]],[rcbeamR,[.35,-.06,1.45,.35]],[hollowcoreR,[.25,0,1.3,.45]],[roofgirderR,[.12,-.12,1.35,.4]],[columnR,[0,-.1,1.25,1]],[ttslabR,[.1,0,1.15,.6]],[filigreeR,[0,-.3,1,1]]]);
const VW=SHAPES.map(f=>VIEW.get(f)||[0,0,1,1]);
const CAP=new Map([[ibeamR,['Prestressed I-girder','h 0.9 · L 6.0 m']],[rcbeamR,['RC beam','300 × 600 · L 3.6 m']],[hollowcoreR,['Hollow-core slab','HC265 · 1.2 × 3.0 m']],
 [ttslabR,['Double-tee slab','2.4 × 0.5 × 5.0 m']],[wallR,['Wall panel','6.0 × 3.0 × 0.2 m']],[columnR,['Column with corbel','500 × 500 · H 3.6 m']],
 [stairsR,['Stair flight','10 × 170 / 280']],[roofgirderR,['Roof girder','h 0.6–1.25 · L 8.0 m']],[socketR,['Socket foundation','1.8 × 1.8 m']],[filigreeR,['Lattice-girder slab','2.4 × 3.6 m · 60 mm shell']]]);
if(document.documentElement.lang==='pl')for(const[k,v]of [[ibeamR,['Dźwigar I sprężony','h 0,9 · L 6,0 m']],[rcbeamR,['Belka żelbetowa','300 × 600 · L 3,6 m']],[hollowcoreR,['Płyta kanałowa','HC265 · 1,2 × 3,0 m']],[ttslabR,['Płyta TT','2,4 × 0,5 × 5,0 m']],[wallR,['Ściana prefabrykowana','6,0 × 3,0 × 0,2 m']],[columnR,['Słup z konsolą','500 × 500 · H 3,6 m']],[stairsR,['Bieg schodowy','10 × 170 / 280']],[roofgirderR,['Dźwigar dachowy','h 0,6–1,25 · L 8,0 m']],[socketR,['Stopa kielichowa','1,8 × 1,8 m']],[filigreeR,['Płyta filigranowa','2,4 × 3,6 m · gr. 60 mm']]])CAP.set(k,v);
const CAPS=SHAPES.map(f=>CAP.get(f)||null);
function build(){N=Math.min(16000,Math.round(W*H/(touch?220:160)*S.d));
  CF=[];SL=[];BS=[];LD.ci=-1;SH=SHAPES.map((f,fi)=>{const p=f(N);let ls=p.ls||[];const sp=BEND.get(f);BS[fi]=null;
    if(sp){const b=[1e9,1e9,1e9,-1e9,-1e9,-1e9];for(const v of p)for(let j=0;j<3;j++){b[j]=Math.min(b[j],v[j]);b[j+3]=Math.max(b[j+3],v[j])}
      const bs=Object.assign({},sp,{b,c:[(b[0]+b[3])/2,(b[1]+b[4])/2,(b[2]+b[5])/2],s0:b[sp.ax],s1:b[sp.ax+3]});bs.L=bs.s1-bs.s0;bs.Lt=sp.lt?sp.lt*bs.L:0;BS[fi]=bs;
      const st=bs.L/24,o=[],lp=(a,c,u)=>[a[0]+(c[0]-a[0])*u,a[1]+(c[1]-a[1])*u,a[2]+(c[2]-a[2])*u];
      for(const[a,c,fl]of ls){const n=Math.max(1,Math.ceil(Math.abs(c[sp.ax]-a[sp.ax])/st));for(let j=0;j<n;j++)o.push([lp(a,c,j/n),lp(a,c,(j+1)/n),fl])}ls=o}
    const _ls=ls,la=new Float32Array(_ls.length*7);_ls.forEach(([a,b,fl],i)=>{la.set([a[0],a[1],a[2],b[0],b[1],b[2],fl],i*7)});SL.push(la);p.sort((A,B)=>(A[0]+.3*A[1])-(B[0]+.3*B[1]));const a=new Float32Array(N*3),cf=new Uint8Array(N);p.forEach((v,i)=>{a[i*3]=v[0];a[i*3+1]=v[1];a[i*3+2]=v[2];cf[i]=v[3]||0});CF.push(cf);return a});
  X=new Float32Array(N);Y=new Float32Array(N);Z=new Float32Array(N);OX=new Float32Array(N);OY=new Float32Array(N);PH=new Float32Array(N);DL=new Float32Array(N);C=new Uint8Array(N);
  for(let i=0;i<N;i++){PH[i]=rnd()*6.283;C[i]=0;DL[i]=i/N*.35+rnd()*.08}
  EX=SH.map((a,i)=>ext(a,VW[i]))}
function ext(a,v=[0,0,1,1]){let mx0=0,my0=0;const R=[[0,0]];for(let s0=-1;s0<=1.001;s0+=.08)for(const rx of[.46,.52,.58])R.push([.42+.3*v[3]*s0+v[0],rx+v[1]]);
  for(const[ry,rx]of R){const cy=Math.cos(ry),sy=Math.sin(ry),cr=Math.cos(rx),sr=Math.sin(rx);for(let k=0;k<a.length;k+=21){const x=a[k],y=a[k+1],z=a[k+2];
    let X1=x*cy+z*sy,Z1=-x*sy+z*cy;let Y1=y*cr-Z1*sr;Z1=y*sr+Z1*cr;const p=1/(1+Z1*.35);mx0=Math.max(mx0,Math.abs(X1*p));my0=Math.max(my0,Math.abs(Y1*p))}}
  return[mx0+.02,my0+.02]}
function box(){const d=document.querySelector('main>div');if(!d)return null;const L=d.getBoundingClientRect().left;let Rt=L;for(const c of d.children){if(getComputedStyle(c).position==='absolute')continue;const r=c.getBoundingClientRect();if(r.width)Rt=Math.max(Rt,r.right)}
  const gap=Math.max(48,W*.04),x0=Rt+gap,x1=W-L;return x1-x0>200?{x0,x1,m:L}:null}
function mbox(){const l=document.querySelector('.lockup');if(!l||W>=900||S.p!=='r')return null;const r=l.getBoundingClientRect(),b=bg.getBoundingClientRect();return{cx:W/2,cy:r.top-b.top+r.height/2,hw:Math.min(W/2-24,r.height*1.25),hh:r.height/2}}
function resize(){DPR=Math.min(devicePixelRatio||1,2);W=bg.clientWidth;H=bg.clientHeight;cv.width=W*DPR;cv.height=H*DPR;cx.setTransform(DPR,0,0,DPR,0,0);LCV.width=W*DPR;LCV.height=H*DPR;LCX.setTransform(DPR,0,0,DPR,0,0);build();BX=box();MB=mbox()}
const BEND=new Map([[wallR,{ax:0,dk:'g',ty:'s'}],[ttslabR,{ax:0,dk:'g',ty:'s',lat:2,lt:.8}],[ibeamR,{ax:0,dk:'g',ty:'s'}],[stairsR,{ax:0,dk:'g',ty:'s',lat:2,lt:1,am:.045}],
 [hollowcoreR,{ax:0,dk:'g',ty:'s',lat:2,lt:.8}],[columnR,{ax:1,dk:'h',ty:'c',am:.07}],[filigreeR,{ax:0,dk:'g',ty:'s',lat:2,lt:.8}],[rcbeamR,{ax:0,dk:'g',ty:'s'}],[roofgirderR,{ax:0,dk:'g',ty:'s'}]]);
let BS=[],DF=null,DM=0;const LD={p:0,v:0,a:.5,t:0,d:[0,-1,0],ci:-1,mx:0,my:0,on:0};
const MONO=getComputedStyle(document.documentElement).getPropertyValue('--mono')||'monospace';
function wN(ty,x,a){if(ty==='c'){if(x<=0)return 0;return(x<=a?x*x*(3*a-x):a*a*(3*x-a))/2}
  if(x<=0||x>=1)return 0;const b=1-a;return x<=a?8*b*x*(1-b*b-x*x):8*a*(1-x)*(1-a*a-(1-x)*(1-x))}
function mN(ty,x,a){if(ty==='c')return x<0||x>=a?0:(a-x)/a;if(x<=0||x>=1)return 0;return x<=a?x/a:(1-x)/(1-a)}
function dW(x,y,z){const s=DF.s,xn=((s.ax===0?x:s.ax===1?y:z)-s.s0)/s.L;let l=1;if(s.Lt){const t=s.lat===2?z:s.lat===1?y:x,u=(t-DF.t)/s.Lt;l=1/(1+u*u)}
  DM=mN(s.ty,xn,DF.a)*l;return wN(s.ty,xn,DF.a)*l*DF.amp}
let EX=[],BX=null,MB=null;const capEl=document.getElementById('cap');let capI=-1;
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(W){BX=box();MB=mbox()}});
const GP=[];{let s2=11;const rr=()=>(s2=(s2*16807)%2147483647)/2147483647;for(let i=0;i<9000;i++){const a=rr()*6.283,d=Math.sqrt(rr()),x=Math.cos(a)*d*1.6,z=Math.sin(a)*d*.95+.15;GP.push(x,z,Math.pow(1-d,.55))}}
const SGX=72,SGZ=58,GX0=-1.6,GX1=1.6,GZ0=-1.0,GZ1=1.2,LX=.3,LZ=.3,GY=-.78;const SM=new Float32Array(SGX*SGZ),SM2=new Float32Array(SGX*SGZ),SMS=new Float32Array(SGX*SGZ);
const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const COL=['214,204,188','217,82,74','246,236,226','238,196,184','226,150,136','206,98,86','178,48,40','255,150,128'];
let t0=performance.now(),last=t0,T=0;
function frame(dt){
  T+=dt/60*S.t;
  const hold=7,mor=4,cyc=hold+mor,ci=Math.floor(T/cyc),ph=T-ci*cyc,A=SH[ci%SH.length],B=SH[(ci+1)%SH.length],FA=CF[ci%SH.length],FB=CF[(ci+1)%SH.length];
  const g=ph<hold?0:(ph-hold)/mor;
  const sh=ci%SH.length,spin=T*2*Math.PI/25,osc0=Math.sin(T*2*Math.PI/40);const wg=0;const fw=sh===0?(ph<hold?1:1-ease(g)):(sh===SH.length-1&&ph>=hold?ease(g):0);const va=VW[ci%SH.length],vb=VW[(ci+1)%SH.length],eg=ease(g),yb=va[0]+(vb[0]-va[0])*eg,xb=va[1]+(vb[1]-va[1])*eg,osc=.42+.28*osc0*(va[3]+(vb[3]-va[3])*eg);const ry=(osc*(1-wg)+(spin)*wg+yb)*(1-fw), rx=(.52+xb+.06*Math.sin(T/9))*(1-fw), cy=Math.cos(ry),sy=Math.sin(ry),cr=Math.cos(rx),sr=Math.sin(rx);
  const SPL=S.p==='r'&&W>=900;let sc=SPL?Math.min(W*.2,H*.4):Math.min(W*.36,H*.5), ox=SPL?W*.74:W*.5, oy=SPL?H*.5:H*.47;
  if(SPL&&BX&&EX.length){const hw=(BX.x1-BX.x0)/2,hh=H*.5-Math.max(72,BX.m*.6);ox=(BX.x0+BX.x1)/2;const f=i=>Math.min(sc*VW[i][2],hw/EX[i][0],hh/EX[i][1]);const ia=ci%SH.length,ib=(ci+1)%SH.length;sc=f(ia)+(f(ib)-f(ia))*ease(g);
    const ci0=ci%SH.length,c0=CAPS[ci0];if(capI!==ci0){capI=ci0;capEl.innerHTML=c0?'<i></i><b>'+c0[0]+'</b> &nbsp;·&nbsp; '+c0[1]:''}
    capEl.style.opacity=c0&&ph<hold?Math.min(1,ph/.9,(hold-ph)/.6):0;capEl.style.left=ox+'px';capEl.style.top=Math.min(H-Math.max(56,BX.m*.45),oy+EX[ci0][1]*sc+28)+'px'}
  else if(!SPL&&MB&&EX.length){ox=MB.cx;oy=MB.cy;const f=i=>Math.min(MB.hw/EX[i][0],MB.hh/EX[i][1])*(i===0?1:VW[i][2]>1?1:1);const ia=ci%SH.length,ib=(ci+1)%SH.length;sc=f(ia)+(f(ib)-f(ia))*ease(g)}
  bendLoad(dt,ci,ph,hold,ox,oy,sc,cy,sy,cr,sr);
  cx.clearRect(0,0,W,H);cx.globalCompositeOperation='lighter';
  if(S.g){
    if(S.sh){SM.fill(0);const st=3;for(let i=0;i<N;i+=st){const k=i*3;const e=g>0?ease(Math.min(1,Math.max(0,(g-DL[i])/(1-.43)))):0;
        const x=A[k]+(B[k]-A[k])*e,y=A[k+1]+(B[k+1]-A[k+1])*e,z=A[k+2]+(B[k+2]-A[k+2])*e,h=y-GY;
        const gx=x+LX*h,gz=z+LZ*h;const ix=Math.floor((gx-GX0)/(GX1-GX0)*SGX),iz=Math.floor((gz-GZ0)/(GZ1-GZ0)*SGZ);
        if(ix>=0&&ix<SGX&&iz>=0&&iz<SGZ)SM[iz*SGX+ix]+=1}
      const thr=Math.max(1,N/st/(SGX*SGZ)*.6);
      for(let iz=0;iz<SGZ;iz++)for(let ix=0;ix<SGX;ix++){let a=0,w=0;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){const u=ix+dx,v=iz+dz;if(u<0||v<0||u>=SGX||v>=SGZ)continue;const ww=(dx||dz)?.5:1;a+=Math.min(1,SM[v*SGX+u]/thr)*ww;w+=ww}SM2[iz*SGX+ix]=a/w}
      const kk=1-Math.pow(.85,dt);for(let j=0;j<SMS.length;j++)SMS[j]+=(SM2[j]-SMS[j])*kk}
    cx.fillStyle=S.sh?'rgb(183,171,151)':'rgba(214,204,188,1)';for(let k=0;k<GP.length;k+=3){const x=GP[k],z=GP[k+1],y=GY;let X1=x*cy+z*sy,Z1=-x*sy+z*cy;let Y1=y*cr-Z1*sr;Z1=y*sr+Z1*cr;const pp=1/(1+Z1*.35);
      let sh=0;if(S.sh){const ix=Math.floor((x-GX0)/(GX1-GX0)*SGX),iz=Math.floor((z-GZ0)/(GZ1-GZ0)*SGZ);if(ix>=0&&ix<SGX&&iz>=0&&iz<SGZ)sh=SMS[iz*SGX+ix]}
      if(S.sh){if(sh<.12)continue;cx.globalAlpha=.5*S.j*Math.min(1,(sh-.12)/.6)}else cx.globalAlpha=Math.min(1,.62*GP[k+2]*S.j/S.ds);const r=.8*pp*S.ds;cx.fillRect(ox+X1*sc*pp-r,oy-Y1*sc*pp-r,2*r,2*r)}cx.globalAlpha=1}
  const R=130,R2=R*R; const bk=COL.map(()=>[[],[],[]]).flat();
  const la=S.ln&&ph<hold?Math.max(0,Math.min(1,(ph-.8)/1,(hold-.6-ph)/1)):0;
  if(la>0)drawLines(SL[ci%SH.length],la,ox,oy,sc,cy,sy,cr,sr);
  const bsc=DF&&DF.s,sgn=bsc&&bsc.ty==='c'?-1:1,hd=bsc?.5*(Math.abs(DF.d[0])*(bsc.b[3]-bsc.b[0])+Math.abs(DF.d[1])*(bsc.b[4]-bsc.b[1])+Math.abs(DF.d[2])*(bsc.b[5]-bsc.b[2])):0;
  for(let i=0;i<N;i++){const k=i*3;let e=g>0?ease(Math.min(1,Math.max(0,(g-DL[i])/(1-.43)))):0;
    const jx=.006*Math.sin(T*.9+PH[i]),jy=.006*Math.cos(T*.7+PH[i]*1.3);
    let x=A[k]+(B[k]-A[k])*e+jx,y=A[k+1]+(B[k+1]-A[k+1])*e+jy,z=A[k+2]+(B[k+2]-A[k+2])*e;
    let col=(e<.5?FA[i]:FB[i])||C[i];
    if(DF&&e<.5){const w=dW(x,y,z)*(1-e);
      if(S.sw&&col===1&&DM*LD.p>.3&&((x-bsc.c[0])*DF.d[0]+(y-bsc.c[1])*DF.d[1]+(z-bsc.c[2])*DF.d[2])*sgn>.12*hd)col=7;
      x+=w*DF.d[0];y+=w*DF.d[1];z+=w*DF.d[2]}
    let X1=x*cy+z*sy,Z1=-x*sy+z*cy;let Y1=y*cr-Z1*sr;Z1=y*sr+Z1*cr;
    const p=1/(1+Z1*.35);let sx=ox+X1*sc*p,sy2=oy-Y1*sc*p;
    const dx=sx-mx,dy=sy2-my,d2=dx*dx+dy*dy;
    if(S.cu==='r'&&d2<R2){const d=Math.sqrt(d2)||1,f=(1-d/R);OX[i]+=dx/d*f*f*9*dt;OY[i]+=dy/d*f*f*9*dt}
    OX[i]*=Math.pow(.94,dt);OY[i]*=Math.pow(.94,dt);sx+=OX[i];sy2+=OY[i];
    const depth=Math.min(2,Math.max(0,Math.floor((1-Z1)*1.5)));bk[col*3+depth].push(sx,sy2,p)}
  for(let b=0;b<bk.length;b++){const s=bk[b];if(!s.length)continue;const dim=la>0&&(b<3||b>5||S.ln===2)?1-.5*la:1;const al=dim*Math.min(1,[.38,.62,.9][b%3]*S.j/S.ds*(b>2?1.1:1)*(b>5?1.15:1));
    cx.fillStyle=`rgba(${COL[Math.floor(b/3)]},${al})`;cx.beginPath();const r0=[.85,1.05,1.3][b%3]*S.ds;
    for(let k=0;k<s.length;k+=3){const r=r0*s[k+2];cx.rect(s[k]-r,s[k+1]-r,2*r,2*r)}cx.fill()}
  if(S.fa&&DF&&LD.p>.02)drawArrow(ox,oy,sc,cy,sy,cr,sr);
}
function bendLoad(dt,ci,ph,hold,ox,oy,sc,cy,sy,cr,sr){const si=ci%SH.length,bs=BS[si];if(LD.ci!==ci){LD.ci=ci;LD.p=LD.v=0}DF=null;if(!bs)return;
  const pr=(x,y,z)=>{let X1=x*cy+z*sy,Z1=-x*sy+z*cy;const Y1=y*cr-Z1*sr;Z1=y*sr+Z1*cr;const p=1/(1+Z1*.35);return[ox+X1*sc*p,oy-Y1*sc*p]};
  const P0=bs.c.slice(),P1=bs.c.slice();P0[bs.ax]=bs.s0;P1[bs.ax]=bs.s1;const q0=pr(...P0),q1=pr(...P1),ex=q1[0]-q0[0],ey=q1[1]-q0[1],l2=ex*ex+ey*ey||1;
  LD.q=[q0,q1];const u=((mx-q0[0])*ex+(my-q0[1])*ey)/l2,dd=Math.abs((mx-q0[0])*ey-(my-q0[1])*ex)/Math.sqrt(l2);let hw=0;const b=bs.b;
  for(let m=0;m<8;m++){const q=pr(b[m&1?3:0],b[m&2?4:1],b[m&4?5:2]);hw=Math.max(hw,Math.abs((q[0]-q0[0])*ey-(q[1]-q0[1])*ex)/Math.sqrt(l2))}
  const on=S.cu==='u'&&mx>-1e3&&ph>1&&ph<hold-.9&&u>-.03&&u<1.03&&dd<hw+14;LD.on=on;
  if(on){const ua=Math.min(.94,Math.max(.06,u)),k=LD.p<.03?1:Math.min(1,.2*dt);LD.a+=(ua-LD.a)*k;LD.mx=mx;LD.my=my;
    if(bs.Lt){const L0=bs.c.slice(),L1=bs.c.slice();L0[bs.lat]=b[bs.lat];L1[bs.lat]=b[bs.lat+3];const r0=pr(...L0),r1=pr(...L1),fx=r1[0]-r0[0],fy=r1[1]-r0[1];
      const ul=Math.min(1,Math.max(0,((mx-r0[0])*fx+(my-r0[1])*fy)/(fx*fx+fy*fy||1))),tl=b[bs.lat]+(b[bs.lat+3]-b[bs.lat])*ul;LD.t+=(tl-LD.t)*k}
    if(LD.p<.03){if(bs.dk==='g')LD.d=[0,-1,0];else if(bs.dk==='v'){LD.d=[0,0,cy*cr>0?1:-1]}else{const sg=mx<q0[0]+ex*u?1:-1;LD.d=[sg*cy,0,sg*sy]}}}
  const om=9.4,ze=.4,h=dt/60/2;for(let j=0;j<2;j++){LD.v+=(om*om*((on?1:0)-LD.p)-2*ze*om*LD.v)*h;LD.p+=LD.v*h}
  if(Math.abs(LD.p)>.002||Math.abs(LD.v)>.01)DF={s:bs,a:LD.a,t:LD.t,d:LD.d,amp:(bs.am||.03)*bs.L*LD.p}}
function drawArrow(ox,oy,sc,cy,sy,cr,sr){const bs=DF.s,pr=(x,y,z)=>{let X1=x*cy+z*sy,Z1=-x*sy+z*cy;const Y1=y*cr-Z1*sr;Z1=y*sr+Z1*cr;const p=1/(1+Z1*.35);return[ox+X1*sc*p,oy-Y1*sc*p]};
  const c=bs.c,a=pr(c[0],c[1],c[2]),b=pr(c[0]+DF.d[0]*.2,c[1]+DF.d[1]*.2,c[2]+DF.d[2]*.2);let ux=b[0]-a[0],uy=b[1]-a[1];const l=Math.hypot(ux,uy);if(l<1)return;ux/=l;uy/=l;
  const al=Math.min(1,LD.p),tx=LD.mx,ty=LD.my,L=42;cx.globalCompositeOperation='source-over';cx.strokeStyle=cx.fillStyle=`rgba(246,239,232,${al})`;cx.lineWidth=2;
  cx.save();cx.strokeStyle=`rgba(17,17,14,${.85*al})`;cx.lineWidth=7;cx.beginPath();cx.moveTo(tx-ux*L,ty-uy*L);cx.lineTo(tx,ty);cx.stroke();cx.restore();
  cx.beginPath();cx.moveTo(tx-ux*L,ty-uy*L);cx.lineTo(tx-ux*7,ty-uy*7);cx.stroke();cx.beginPath();cx.moveTo(tx,ty);cx.lineTo(tx-ux*10-uy*5,ty-uy*10+ux*5);cx.lineTo(tx-ux*10+uy*5,ty-uy*10-ux*5);cx.fill();
  cx.font='12px '+MONO;cx.fillText('P',tx-ux*L+uy*9-3,ty-uy*L-ux*9+4)}
function drawLines(L,la,ox,oy,sc,cy,sy,cr,sr){const g=LCX;g.globalCompositeOperation='source-over';g.clearRect(0,0,W,H);g.lineWidth=1.3;g.lineCap='round';
  const P=COL.map(()=>[[],[],[]]),pr=(x,y,z)=>{let X1=x*cy+z*sy,Z1=-x*sy+z*cy;const Y1=y*cr-Z1*sr;Z1=y*sr+Z1*cr;const p=1/(1+Z1*.35);return[ox+X1*sc*p,oy-Y1*sc*p,Z1]};
  for(let k=0;k<L.length;k+=7){const fl=L[k+6];if(fl===1&&S.ln!==2)continue;let a,b;if(DF){const w0=dW(L[k],L[k+1],L[k+2]),w1=dW(L[k+3],L[k+4],L[k+5]),d=DF.d;a=pr(L[k]+w0*d[0],L[k+1]+w0*d[1],L[k+2]+w0*d[2]);b=pr(L[k+3]+w1*d[0],L[k+4]+w1*d[1],L[k+5]+w1*d[2])}else{a=pr(L[k],L[k+1],L[k+2]);b=pr(L[k+3],L[k+4],L[k+5])}
    const d=Math.min(2,Math.max(0,Math.floor((1-(a[2]+b[2])/2)*1.5)));P[fl][d].push(a[0],a[1],b[0],b[1])}
  for(let c=0;c<P.length;c++)for(let d=0;d<3;d++){const s=P[c][d];if(!s.length)continue;g.strokeStyle=`rgba(${COL[c]},${Math.min(1,[.3,.5,.72][d]*S.j*(c===1?.8:1))})`;g.beginPath();
    for(let k=0;k<s.length;k+=4){g.moveTo(s[k],s[k+1]);g.lineTo(s[k+2],s[k+3])}g.stroke()}
  if(S.cu==='r'&&mx>-1e3){g.globalCompositeOperation='destination-out';const r=g.createRadialGradient(mx,my,0,mx,my,130);r.addColorStop(0,'rgba(0,0,0,1)');r.addColorStop(.6,'rgba(0,0,0,1)');r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(mx-130,my-130,260,260)}
  cx.globalAlpha=la;cx.drawImage(LCV,0,0,W,H);cx.globalAlpha=1}
function tick(now){const dt=Math.max(0,Math.min(3,(now-last)/16.67));last=now;if(S.on)frame(dt);else cx.clearRect(0,0,W,H);
  if(!RM&&vis)requestAnimationFrame(tick);else running=false}
let vis=true,running=true;
function wake(){if(!RM&&vis&&!running){running=true;last=performance.now();requestAnimationFrame(tick)}}
new IntersectionObserver(e=>{vis=e[0].isIntersecting&&!document.hidden;wake()}).observe(bg);
document.addEventListener('visibilitychange',()=>{vis=!document.hidden;wake()});
addEventListener('mousemove',e=>{const r=bg.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top},{passive:true});
addEventListener('mouseleave',()=>{mx=my=-1e4});
addEventListener('resize',()=>{clearTimeout(window.__rz);window.__rz=setTimeout(resize,150)});
resize();
if(RM){T=2;frame(0);bg.classList.add('in')}
else{setTimeout(()=>bg.classList.add('in'),MB?250:1200);requestAnimationFrame(tick)}
})();
