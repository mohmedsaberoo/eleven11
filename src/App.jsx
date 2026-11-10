import {useEffect,useLayoutEffect,useState} from 'react'
import {LazyMotion,domAnimation} from 'framer-motion'
import {store} from './store'
import {useLang} from './i18n'
import {initMotion,refreshScroll} from './motion'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Skills from './components/Skills'
import Credentials from './components/Credentials'
import Journey from './components/Journey'
import Training from './components/Training'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Dock from './components/Dock'

export default function App(){
  const [gl,setGl]=useState('loading'),[progress,setProgress]=useState(0),{lang}=useLang()
  useLayoutEffect(()=>initMotion(),[])
  useEffect(()=>{const id=requestAnimationFrame(refreshScroll);return()=>cancelAnimationFrame(id)},[lang])
  useEffect(()=>{
    let dead=false,scene,n=0
    // Real progress: 4 tasks (fonts, portrait decode, 3D chunk, first rendered frame), 25% each.
    const bump=()=>{if(dead)return;n+=1;setProgress(Math.min(100,n*25))}
    store.onReady=bump
    ;(document.fonts?document.fonts.ready:Promise.resolve()).then(bump)
    const el=document.querySelector('.ph img');(el&&el.decode?el.decode():Promise.resolve()).catch(()=>{}).then(bump)
    // Three.js is code-split and loaded after first paint, so the page is usable immediately.
    import('./scene').then(m=>{if(dead)return;bump();scene=m.startScene(store);setGl(scene.ok?'ok':'fail')}).catch(()=>{if(!dead)setGl('fail')})
    return()=>{dead=true;store.onReady=null;scene&&scene.dispose()}
  },[])
  return (
    <LazyMotion features={domAnimation}>
      <a className="skip" href="#main">Skip to content</a>
      <canvas id="gl" aria-hidden="true"/><div id="amb" aria-hidden="true"/><div id="pg"/>
      <Intro gl={gl} progress={progress}/><Nav/>
      <main id="main"><Hero/><About/><Expertise/><Skills/><Credentials/><Journey/><Training/><Contact/></main>
      <Footer/><Dock id="dk2"/>
    </LazyMotion>
  )
}
