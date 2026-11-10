import * as THREE from 'three'
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json'
import {rm,mob} from './env'
// 3D universe: scroll-driven camera path, PMREM reflections, instanced particles, adaptive quality.
export function startScene(S){
const $=s=>document.querySelector(s),st=S,nav=$('#nav')
const ac=new AbortController(),on=(t,f,o)=>addEventListener(t,f,Object.assign({signal:ac.signal},o||{}))
let raf,ro,failed=false
/* ===== WebGL universe ===== */
const ids=['home','about','expertise','skills','credentials','journey','training','contact'],SEC=ids.map(i=>$('#'+i)),D=-32;
let cam,scene,ren,ex=[],rings=[],core,mx=0,my=0,camZ=60,txt,fxo=0,rc,ptr={x:0,y:0,in:false,d:false};
try{
const cv=$('#gl');ren=new THREE.WebGLRenderer({canvas:cv,antialias:!mob,alpha:true,powerPreference:'high-performance'});
const gx=ren.getContext(),gie=gx.getExtension('WEBGL_debug_renderer_info'),weak=/intel|swiftshader|llvmpipe|software/i.test(gie?String(gx.getParameter(gie.UNMASKED_RENDERER_WEBGL)):'');let pr=(mob||weak)?1:Math.min(devicePixelRatio,1.75);ren.setPixelRatio(pr);
scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x030303,.018);
cam=new THREE.PerspectiveCamera(60,1,.1,300);
scene.add(new THREE.AmbientLight(0x404040,.5));
{const pm=new THREE.PMREMGenerator(ren),es=new THREE.Scene(),mk=(w,h,x,y,z,c,i)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(i),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m)};
es.background=new THREE.Color(0x020202);mk(10,2,0,8,0,0xffffff,4);mk(2,10,-8,0,2,0xffffff,2.5);mk(8,2,6,-4,6,0xB8FF00,2.2);mk(6,6,0,0,-9,0xcccccc,.8);
scene.environment=pm.fromScene(es,.04).texture;pm.dispose()}
const dl=new THREE.DirectionalLight(0xffffff,1.1);dl.position.set(4,6,8);scene.add(dl);
const gp=new THREE.PointLight(0xB8FF00,1.6,40);scene.add(gp);
const metal=c=>new THREE.MeshStandardMaterial({color:c||0x2a2a2a,metalness:.85,roughness:.28});
const glow=()=>new THREE.MeshStandardMaterial({color:0x111111,emissive:0xB8FF00,emissiveIntensity:.15,metalness:.9,roughness:.3});
const wire=(g,o)=>new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:0xB8FF00,transparent:true,opacity:o||.35}));
const G=i=>{const g=new THREE.Group();g.position.z=D*i;scene.add(g);return g};
/* 0 hero structure */
const g0=G(0),ico=new THREE.IcosahedronGeometry(3,1);const m0=new THREE.Mesh(ico,metal());m0.position.set(mob?0:-1,mob?3:0,-8);m0.scale.setScalar(1.3);g0.add(m0,Object.assign(wire(ico,.5),{position:m0.position.clone(),scale:m0.scale.clone().multiplyScalar(1.03)}));g0.userData.s=[m0,g0.children[1]];
/* 1 about: glass panels */
const g1=G(1);for(let i=0;i<5;i++){const b=new THREE.BoxGeometry(3.2,2,.05);const m=new THREE.Mesh(b,new THREE.MeshPhysicalMaterial({color:0x1a2406,transparent:true,opacity:.18,metalness:.3,roughness:.1}));m.add(wire(b,.5));m.position.set((i-2)*4.2,Math.sin(i*1.7)*2,-4-Math.abs(i-2));m.rotation.y=(2-i)*.25;m.userData.f=i;g1.add(m)}
/* 2 expertise: six shapes */
const g2=G(2),geos=[new THREE.OctahedronGeometry(1.1),new THREE.TorusGeometry(.9,.3,12,32),new THREE.BoxGeometry(1.5,1.5,1.5),new THREE.TorusKnotGeometry(.7,.22,64,10),new THREE.IcosahedronGeometry(1.1),new THREE.DodecahedronGeometry(1.1)];
geos.forEach((g,i)=>{const m=new THREE.Mesh(g,glow());m.add(wire(g,.5));const a=i/6*Math.PI*2;m.userData.b=new THREE.Vector3(Math.cos(a)*6,Math.sin(a)*3.2,-5+Math.sin(a)*2);m.position.copy(m.userData.b);m.userData.h=m.userData.b.clone().multiplyScalar(.7).setZ(m.userData.b.z+4);g2.add(m);ex.push(m)});
/* 3 skills core */
const g3=G(3);core=new THREE.Mesh(new THREE.SphereGeometry(1.7,mob?24:48,mob?16:32),metal(0x333333));core.position.z=-6;g3.add(core);
[3,4.2,5.4].forEach((r,i)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.06,12,mob?48:96),glow());t.rotation.set(1.1+i*.4,i*.7,0);t.position.z=-6;g3.add(t);rings.push(t)});
/* 4 credentials: arc of panels */
const g4=G(4);for(let i=0;i<7;i++){const b=new THREE.BoxGeometry(1.6,2.4,.12),m=new THREE.Mesh(b,metal(i===6?0x3a4a10:0x222222));m.add(wire(b,i===6?.9:.3));const a=(i-3)*.42;m.position.set(Math.sin(a)*9,Math.sin(i*2)*.6,-9+Math.cos(a)*4);m.rotation.y=-a;m.userData.f=i;g4.add(m)}
/* 5 lab: servers */
const gj=G(5);{const pts=[];for(let i=0;i<6;i++)pts.push(new THREE.Vector3((i-2.5)*3.2,Math.sin(i*1.1)*1.6,-6-Math.cos(i)*1.2));const cv=new THREE.CatmullRomCurve3(pts);gj.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cv.getPoints(80)),new THREE.LineBasicMaterial({color:0xB8FF00,transparent:true,opacity:.5})));pts.forEach((p,i)=>{const n=new THREE.Mesh(new THREE.IcosahedronGeometry(i===5?.34:.22,1),glow());n.position.copy(p);n.material.emissiveIntensity=i===5?1:.35;gj.add(n)})}
const g5=G(6);for(let x=-3;x<=3;x++)for(let r=0;r<2;r++){if(!x&&!r)continue;const h=3+Math.abs((x*7+r*3)%4);const m=new THREE.Mesh(new THREE.BoxGeometry(1.3,h,1.3),metal(0x1c1c1c));m.position.set(x*2.6,h/2-3,-6-r*6);const l=new THREE.Mesh(new THREE.BoxGeometry(.9,.06,.02),new THREE.MeshBasicMaterial({color:0xB8FF00}));l.position.set(0,h*.2,.66);m.add(l);m.userData.p=x;g5.add(m)}
/* 6 portal */
const g6=G(7),pt=new THREE.Mesh(new THREE.TorusGeometry(4.4,.16,12,mob?64:128),glow());pt.position.z=-8;pt.material.emissiveIntensity=.6;const pt2=new THREE.Mesh(new THREE.TorusGeometry(3.1,.05,12,96),metal(0x888888));pt2.position.z=-8;g6.add(pt,pt2);
/* particles */
const Q=(mob||weak)?0:(navigator.hardwareConcurrency>=8?2:1),N=[350,900,1600][Q],pos=new Float32Array(N*3);for(let i=0;i<N;i++){pos.set([(Math.random()-.5)*34,(Math.random()-.5)*18,25+D*-0.1-Math.random()*(-D*7+60)*1+ -0],i*3);pos[i*3+2]=20+D*7.6*Math.random()}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xB8FF00,size:.07,transparent:true,opacity:.55,depthWrite:false}));scene.add(pts);
const gr=new THREE.GridHelper(300,150,0xB8FF00,0x1f2a08);gr.position.set(0,-6,D*3.5);gr.scale.z=1.6;gr.material.transparent=true;gr.material.opacity=.14;scene.add(gr);
const fm=new THREE.InstancedMesh(new THREE.OctahedronGeometry(.12),new THREE.MeshStandardMaterial({color:0x888888,metalness:1,roughness:.25}),[30,60,110][Q]),dm=new THREE.Object3D();for(let i=0;i<fm.count;i++){dm.position.set((Math.random()-.5)*26,(Math.random()-.5)*12,20+D*7.6*Math.random());dm.rotation.set(Math.random()*6,Math.random()*6,0);dm.scale.setScalar(.5+Math.random()*1.5);dm.updateMatrix();fm.setMatrixAt(i,dm.matrix)}scene.add(fm);
const hp=new THREE.Mesh(new THREE.PlaneGeometry(5,3,10,6),new THREE.MeshBasicMaterial({color:0xB8FF00,wireframe:true,transparent:true,opacity:.16}));hp.position.set(0,3.2,-10);g5.add(hp);
if(Q>0){const tg=new THREE.TextGeometry('ELEVEN',{font:new THREE.FontLoader().parse(fontData),size:2.4,height:.5,curveSegments:mob?3:6,bevelEnabled:true,bevelThickness:.05,bevelSize:.03,bevelSegments:2});tg.center();txt=new THREE.Mesh(tg,new THREE.MeshStandardMaterial({color:0x3a3a3a,metalness:.95,roughness:.22}));txt.position.set(0,-4.2,-20);g0.add(txt)}
{const p=[];let x=-10,y=-3;for(let i=0;i<48;i++){const nx=x+(Math.random()<.5?(Math.random()-.5)*5:0),ny=nx===x?y+(Math.random()-.5)*4:y;p.push(x,y,-7,nx,ny,-7);x=Math.max(-12,Math.min(12,nx));y=Math.max(-5,Math.min(5,ny));if(i%10===9){x=-10+Math.random()*20;y=(Math.random()-.5)*8}}
const cg=new THREE.BufferGeometry();cg.setAttribute('position',new THREE.Float32BufferAttribute(p,3));const cp=new THREE.Group();cp.position.z=D;cp.add(new THREE.LineSegments(cg,new THREE.LineBasicMaterial({color:0xB8FF00,transparent:true,opacity:.18})));scene.add(cp)}
const sm=new THREE.InstancedMesh(new THREE.BoxGeometry(.02,.7,.02),new THREE.MeshBasicMaterial({color:0xB8FF00,transparent:true,opacity:.45}),[20,40,70][Q]),sd=[];for(let i=0;i<sm.count;i++)sd.push({x:(Math.random()-.5)*16,y:Math.random()*10-4,z:-4-Math.random()*10,v:.02+Math.random()*.05});g5.add(sm);
function rs(){ren.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.fov=innerWidth<800?75:60;cam.updateProjectionMatrix()}
rs();let rt;on('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{rs();st.onResize&&st.onResize()},120)});
on('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
let ldd=0,offs=[],maxS=1,lastI=-1,lsc=null,cx=0,cy=0,fr=0,acc=0,chk=0,last=performance.now();const pgEl=$('#pg'),pf=$('#pf');
function cache(){offs=SEC.map(s=>[s.offsetTop,s.offsetHeight]);maxS=Math.max(1,document.body.scrollHeight-innerHeight)}
ro=new ResizeObserver(cache);ro.observe(document.body);on('load',cache);cache();
rc=new THREE.Raycaster();const ndc=new THREE.Vector2();
const pickAt=(x,y)=>{ndc.set(x/innerWidth*2-1,-(y/innerHeight)*2+1);rc.setFromCamera(ndc,cam);const h=rc.intersectObjects(ex,true)[0];if(!h)return -1;let o=h.object;while(o&&ex.indexOf(o)<0)o=o.parent;return o?ex.indexOf(o):-1};
const inStage=e=>st.curI===2&&e.target&&e.target.closest&&e.target.closest('#stage');
on('pointermove',e=>{if(!inStage(e)){if(ptr.in){ptr.in=false;st.hov=-1}return}ptr.in=true;ptr.x=e.clientX;ptr.y=e.clientY;ptr.d=true},{passive:true});
on('click',e=>{if(!inStage(e))return;const i=pickAt(e.clientX,e.clientY);st.sel=i===st.sel?-1:i;st.onSelect&&st.onSelect(st.sel)});
const clock=new THREE.Clock();
function tick(){raf=requestAnimationFrame(tick);if(document.hidden)return;const t=clock.getElapsedTime(),k=rm?0:1;
const now=performance.now();acc+=now-last;last=now;if(++fr===90){const a=acc/90;fr=0;acc=0;if(chk++>0&&a>26&&pr>.55){pr=Math.max(.55,pr*.8);ren.setPixelRatio(pr);rs();pg.setDrawRange(0,Math.max(120,((pg.drawRange.count>1e9?N:pg.drawRange.count)*.6)|0))}}
/* scroll -> camera path */
const y=scrollY+innerHeight*.5;let i=0;for(let j=0;j<SEC.length;j++)if(offs[j][0]<=y)i=j;
const f=Math.min(1,Math.max(0,(y-offs[i][0])/offs[i][1]));
const tz=st.started?D*(i+(i===2?f*.25:f))+10:70-(Math.min(t,3)/3)*60;camZ+=(tz-camZ)*.07;
fxo+=(((st.sel>=0&&i===2&&ex[st.sel])?ex[st.sel].userData.b.x*.4:0)-fxo)*.06;cam.position.set(mx*1.6+fxo,-my*1+Math.sin(t*.3)*.15*k,camZ);cam.lookAt(mx*.8+fxo*.6,-my*.5,camZ-10);gp.position.set(cam.position.x+2,cam.position.y+2,camZ-4);
g0.children[0].rotation.y=t*.12*k;g0.children[0].rotation.x=t*.06*k;g0.children[1].rotation.copy(g0.children[0].rotation);
g1.children.forEach(m=>m.position.y+=(Math.sin(t*.6+m.userData.f)*.004)*k);
if(ptr.in&&ptr.d){ptr.d=false;const hi=pickAt(ptr.x,ptr.y);st.hov=hi;const sg=document.getElementById('stage');sg&&sg.classList.toggle('hv',hi>=0)}
const act=st.sel>=0?st.sel:st.hov;ex.forEach((m,j)=>{const a=j===act,dim=st.sel>=0&&!a;m.rotation.x+=(.004+(a?.02:0))*k;m.rotation.y+=(.006+(a?.03:0))*k;m.position.lerp(a?m.userData.h:m.userData.b,.08);const ts=a?(st.sel>=0?1.7:1.4):(dim?.7:1);m.scale.setScalar(m.scale.x+(ts-m.scale.x)*.1);m.material.emissiveIntensity+=((a?1:(dim?.04:.15))-m.material.emissiveIntensity)*.1});
core.rotation.y=t*.2*k;rings.forEach((r,j)=>{r.rotation.z=t*(.15+j*.1)*k*(j%2?-1:1);r.material.emissiveIntensity+=((j===st.tab?1.1:.1)-r.material.emissiveIntensity)*.1;r.scale.setScalar(1+(j===st.tab?.05:0))});

pt.rotation.z=t*.1*k;pt2.rotation.z=-t*.2*k;pt.rotation.y=Math.sin(t*.3)*.2*k;
pts.rotation.z=t*.01*k;fm.rotation.y=t*.015*k;gj.rotation.y=Math.sin(t*.2)*.1*k;if(txt)txt.rotation.y=mx*.35+Math.sin(t*.4)*.1*k;if(st.curI===6&&!rm){for(let i=0;i<sm.count;i++){const o=sd[i];o.y-=o.v;if(o.y<-4)o.y=6;dm.position.set(o.x,o.y,o.z);dm.rotation.set(0,0,0);dm.scale.setScalar(1);dm.updateMatrix();sm.setMatrixAt(i,dm.matrix)}sm.instanceMatrix.needsUpdate=true}hp.position.y=3.2+Math.sin(t*.8)*.15*k;if(!ldd){ldd=1;st.onReady&&st.onReady()}
pgEl.style.width=(scrollY/maxS*100).toFixed(1)+'%';
const sc=scrollY>40;if(sc!==lsc){lsc=sc;nav.classList.toggle('sc',sc)}
if(i!==lastI){lastI=i;st.curI=i;st.onSection&&st.onSection(i)}
if(!rm&&scrollY<1100){const ty=mx*7+Math.sin(t*.5)*3+Math.sin(scrollY*.004)*5,tx=-my*9+Math.min(scrollY,700)*.012;cy+=(ty-cy)*.08;cx+=(tx-cx)*.08;pf.style.transform='rotateY('+cy.toFixed(2)+'deg) rotateX('+cx.toFixed(2)+'deg)'}
ren.render(scene,cam)}
tick();on('pagehide',()=>{scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)[].concat(o.material).forEach(m=>m.dispose())});ren.dispose()});
}catch(e){failed=true;document.body.classList.add('nogl');st.started=true}

return {ok:!failed,dispose(){ac.abort();cancelAnimationFrame(raf);ro&&ro.disconnect();try{scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)[].concat(o.material).forEach(m=>m.dispose())});scene.environment&&scene.environment.dispose();ren.dispose()}catch(e){}}}
}
