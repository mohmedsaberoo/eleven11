import {useCallback,useEffect,useRef,useState} from 'react'
import {T,useT} from '../i18n'
import {store} from '../store'
import {scr} from '../scramble'
import {rm} from '../env'
const ST=[['st0','LOADING TYPOGRAPHY'],['st1','PREPARING PORTRAIT'],['st2','LOADING 3D SCENE'],['st3','RENDERING FIRST FRAME'],['st4','READY']]

// Shows immediately, reports real loading stages, and hands over to the page as soon as it is ready (never longer than 8 s).
const seen=(()=>{try{return sessionStorage.getItem('ei')==='1'}catch(e){return false}})()
export default function Intro({gl,progress}){
  const skipIntro=rm||seen
  const tt=useT(),[out,setOut]=useState(skipIntro),[gone,setGone]=useState(skipIntro),[sc,setSc]=useState(false),nm=useRef(null)
  const enter=useCallback(()=>{
    if(store.entered)return
    store.entered=true;store.started=true;setOut(true)
    try{sessionStorage.setItem('ei','1')}catch(e){}
    window.dispatchEvent(new Event('eleven:enter'))
    const nt=document.getElementById('nt');nt&&scr(nt,'ELEVEN',1100)
  },[])
  useEffect(()=>{
    if(skipIntro){store.started=true;store.entered=true;window.dispatchEvent(new Event('eleven:enter'));return}
    const nt=document.getElementById('nt');if(nt)nt.textContent='MOHAMED'
    const a=setTimeout(()=>nm.current&&scr(nm.current,'ELEVEN',1100,()=>setSc(true)),350),b=setTimeout(enter,8000)
    return()=>{clearTimeout(a);clearTimeout(b)}
  },[enter])
  useEffect(()=>{if(gl==='fail')enter()},[gl,enter])
  useEffect(()=>{if(sc&&progress>=100){const id=setTimeout(enter,700);return()=>clearTimeout(id)}},[sc,progress,enter])
  useEffect(()=>{if(!out)return;const id=setTimeout(()=>setGone(true),1300);return()=>clearTimeout(id)},[out])
  useEffect(()=>{ // keep the page behind the intro out of the tab order until it closes
    const els=['main','nav'].map(i=>document.getElementById(i));if(!out)els.forEach(e=>{if(e)e.inert=true})
    return()=>els.forEach(e=>{if(e)e.inert=false})
  },[out])
  if(gone)return null
  const st=ST[Math.min(4,Math.floor(progress/25))]
  return (
    <div id="intro" className={out?'out':''} role="dialog" aria-modal="true" aria-label="ELEVEN">
      <div className="ig" aria-hidden="true"/><div className="orb" aria-hidden="true"/><div className="orb b" aria-hidden="true"/>
      <T as="button" k="skip" className="btn" id="skip" onClick={enter}>SKIP INTRO</T>
      <div className="ic">
        <div id="in-name" ref={nm} aria-live="polite">MOHAMED</div>
        <T as="p" k="tag" className={'mono tg'+(sc?' on':'')}>THINK BEYOND THE SURFACE.</T>
        <T as="p" k="init" className="mono il">INITIALIZING ELEVEN EXPERIENCE...</T>
        <p className="mono is" aria-live="polite">{tt(st[0],st[1])}</p>
      </div>
      <div id="ldr" aria-hidden="true"><i style={{width:progress+'%'}}/></div>
      <span className="mono" id="pct" aria-hidden="true">{progress}%</span>
    </div>
  )
}
