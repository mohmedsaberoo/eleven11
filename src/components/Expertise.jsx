import {memo,useEffect,useState} from 'react'
import {AnimatePresence,m} from 'framer-motion'
import {T,useT} from '../i18n'
import {store} from '../store'
const X=[['e1t','e1d','RED TEAM & ETHICAL HACKING','Understanding offensive security methodologies and authorized security testing.'],
['e2t','e2d','NETWORK SECURITY','Exploring network architecture, protocols, traffic analysis, and network protection.'],
['e3t','e3d','WEB APPLICATION SECURITY','Studying application vulnerabilities, security testing, and secure development principles.'],
['e4t','e4d','REVERSE ENGINEERING','Exploring software behavior, binary analysis concepts, and application internals.'],
['e5t','e5d','CRYPTOGRAPHY','Understanding encryption, hashing, cryptographic principles, and secure communication.'],
['e6t','e6d','SECURITY RESEARCH','Technical investigation, continuous learning, and practical security analysis.']]
// The 3D objects live in the fixed WebGL scene behind #stage; clicking an object (scene.js raycast) or a button selects it.
function Expertise(){
  const tt=useT(),[sel,setSel]=useState(-1)
  useEffect(()=>{store.onSelect=setSel;return()=>{store.onSelect=null;store.sel=-1;store.hov=-1}},[])
  const pick=i=>{const n=sel===i?-1:i;store.sel=n;setSel(n)}
  const cur=sel>=0?X[sel]:null
  return (
    <section id="expertise">
      <T as="h2" k="e_h" className="rv">SIX DISCIPLINES.<br/>ONE MINDSET.</T>
      <T as="p" k="e_hint" className="hint mono">SELECT AN OBJECT OR A FIELD TO EXPLORE</T>
      <div id="stage" className="stage" aria-hidden="true"/>
      <div className="xd glass" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={sel} className="xdi" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.22}}>
            {cur?<><span className="mono n">0{sel+1}</span><h3>{tt(cur[0],cur[2])}</h3><p>{tt(cur[1],cur[3])}</p></>:<T as="p" k="e_idle" className="xidle">Choose a field or an object to see its description.</T>}
          </m.div>
        </AnimatePresence>
      </div>
      <div className="xsel">
        {X.map((x,i)=><button key={i} type="button" className="xb" aria-pressed={sel===i} onClick={()=>pick(i)}
          onMouseEnter={()=>{store.hov=i}} onFocus={()=>{store.hov=i}} onMouseLeave={()=>{store.hov=-1}} onBlur={()=>{store.hov=-1}}>
          <span className="mono">0{i+1}</span><b>{tt(x[0],x[2])}</b></button>)}
      </div>
    </section>
  )
}
export default memo(Expertise)
