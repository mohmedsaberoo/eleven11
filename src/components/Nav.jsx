import {useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react'
import {MSG,useLang,useT} from '../i18n'
import {store} from '../store'

const LINKS=[['home','n1','HOME'],['about','n2','ABOUT'],['expertise','n3','EXPERTISE'],['skills','n4','SKILLS'],['credentials','n5','CREDENTIALS'],['journey','n8','JOURNEY'],['training','n6','TRAINING'],['contact','n7','CONTACT']]

export default function Nav(){
  const {lang,setLang}=useLang(),tt=useT()
  const [open,setOpen]=useState(false),[cur,setCur]=useState(0),[ind,setInd]=useState({l:0,w:0}),[snd,setSnd]=useState(false)
  const links=useRef(null),au=useRef(null)
  const measure=useCallback(()=>{const a=links.current&&links.current.querySelectorAll('a')[cur];if(a)setInd({l:a.offsetLeft,w:a.offsetWidth})},[cur])
  useEffect(()=>{store.onSection=setCur;return()=>{store.onSection=null}},[])
  useEffect(()=>{store.onResize=measure;document.fonts&&document.fonts.ready.then(measure);return()=>{store.onResize=null}},[measure])
  useLayoutEffect(measure,[measure,lang])
  useEffect(()=>{
    const k=e=>{if(e.key==='Escape')setOpen(false)}
    addEventListener('keydown',k);return()=>removeEventListener('keydown',k)
  },[])
  useEffect(()=>()=>{au.current&&au.current.osc&&au.current.osc.stop()},[])
  const toggleSound=()=>{ // audio is OFF by default and never autoplays
    if(!snd){const ac=(au.current&&au.current.ac)||new AudioContext(),osc=ac.createOscillator(),g=ac.createGain()
      osc.type='sine';osc.frequency.value=55;g.gain.value=.03;osc.connect(g).connect(ac.destination);osc.start();au.current={ac,osc}}
    else{au.current.osc.stop();au.current.osc=null}
    setSnd(!snd)
  }
  const label=tt(LINKS[cur][1],LINKS[cur][2])
  return (
    <nav id="nav" aria-label="Main">
      <a href="#home" className="logo">ELEVEN<b>.</b></a>
      <span className="mono" id="secl" aria-hidden="true">{String(cur+1).padStart(2,'0')} / 08 — {label}</span>
      <div className={'links'+(open?' open':'')} id="lk" ref={links} onClick={e=>{if(e.target.tagName==='A')setOpen(false)}}>
        <i className="ind" style={{left:ind.l+'px',width:ind.w+'px'}}/>
        {LINKS.map(([id,k,en],i)=><a key={id} href={'#'+id} className={cur===i?'on':''} aria-current={cur===i?'true':undefined}>{tt(k,en)}</a>)}
      </div>
      <div className="tools">
        <button className="tb" id="snd" aria-pressed={snd} onClick={toggleSound}>{MSG[lang].snd[+snd]}</button>
        <button className="tb" id="lang" aria-label="Switch language" onClick={()=>setLang(lang==='en'?'ar':'en')}>{lang==='en'?'العربية':'English'}</button>
        <button className="tb burger" id="bg" aria-expanded={open} aria-controls="lk" onClick={()=>setOpen(!open)}>{tt('menu','MENU')}</button>
      </div>
    </nav>
  )
}
