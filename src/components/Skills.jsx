import {memo} from 'react'
import {useState} from 'react'
import {T} from '../i18n'
import {store} from '../store'

const SK=[['Network Security','Web Security','Ethical Hacking Fundamentals','Vulnerability Assessment','Cryptography','Reverse Engineering Fundamentals','Security Analysis'],['TryHackMe','Wireshark','Linux','Nmap','Burp Suite'],['Python','HTML','CSS','JavaScript','Figma','UI/UX Design']]
const TABS=[['s1','CYBERSECURITY'],['s2','TOOLS & PLATFORMS'],['s3','DEVELOPMENT & DESIGN']]

function Skills(){
  const [tab,setTab]=useState(0)
  const pick=i=>{setTab(i);store.tab=i}
  return (
    <section id="skills">
      <T as="h2" k="s_h" className="rv">THE CYBER CORE.</T>
      <T as="p" k="s_hint" className="hint mono">SELECT A CATEGORY TO ACTIVATE ITS RING</T>
      <div className="tabs" role="tablist">
        {TABS.map(([k,en],i)=><T key={k} as="button" k={k} className="btn" role="tab" aria-selected={tab===i} onClick={()=>pick(i)}>{en}</T>)}
      </div>
      <div className="chips glass" aria-live="polite">
        {SK[tab].map((c,i)=><span key={tab+c} className="chip" style={{animationDelay:i*60+'ms'}}>{c}</span>)}
      </div>
    </section>
  )
}

export default memo(Skills)
