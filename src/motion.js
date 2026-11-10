import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {rm,mob} from './env'
gsap.registerPlugin(ScrollTrigger)
const GLOW=[[-20,-10],[40,0],[-10,40],[50,30],[-30,10],[30,-20],[-20,30],[10,-10]]

// One animation system: GSAP ticker drives Lenis (desktop pointer devices only) and ScrollTrigger.
export function initMotion(){
  const root=document.documentElement;root.classList.add('mx')
  let lenis,tickFn,done=false,timer
  if(!rm&&!mob&&matchMedia('(pointer:fine)').matches){
    lenis=new Lenis({duration:1.1,anchors:{offset:-90}})
    lenis.on('scroll',ScrollTrigger.update)
    tickFn=t=>lenis.raf(t*1000);gsap.ticker.add(tickFn);gsap.ticker.lagSmoothing(0)
  }
  const els=[...document.querySelectorAll('.rv')]
  const hero=[...document.querySelectorAll('.hero>div:first-child>*')],frame=[...document.querySelectorAll('.pf .ph,.pf i')]
  const go=()=>{ // hero entrance — runs when the intro hands over
    if(done||rm)return;done=true
    gsap.to(hero,{opacity:1,y:0,duration:.9,ease:'power3.out',stagger:.08,clearProps:'opacity,transform'})
    gsap.to(frame,{opacity:1,y:0,scale:1,duration:1.2,ease:'power3.out',delay:.15,clearProps:'opacity,transform'})
  }
  if(rm)els.forEach(e=>e.classList.add('in'))
  else{
    gsap.set(hero,{opacity:0,y:24});gsap.set(frame,{opacity:0,y:30,scale:.95})
    window.addEventListener('eleven:enter',go);timer=setTimeout(go,9000)
    ScrollTrigger.batch(els,{start:'top 90%',once:true,onEnter:b=>{
      b.forEach(e=>{e.style.transition='none'})
      gsap.fromTo(b.filter(e=>e.tagName==='H2'),{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.9,ease:'power3.out',clearProps:'clipPath'})
      gsap.fromTo(b,{opacity:0,y:28},{opacity:1,y:0,duration:.9,ease:'power3.out',stagger:.09,overwrite:true,onComplete:()=>b.forEach(e=>{e.classList.add('in');e.style.transition='';gsap.set(e,{clearProps:'opacity,transform'})})})
    }})
    // ambient light drifts between sections
    const amb=document.getElementById('amb')
    document.querySelectorAll('main>section').forEach((s,i)=>ScrollTrigger.create({trigger:s,start:'top 55%',end:'bottom 55%',onToggle:self=>{if(self.isActive&&amb){const g=GLOW[i%GLOW.length];gsap.to(amb,{xPercent:g[0],yPercent:g[1],duration:1.6,ease:'power2.out',overwrite:true})}}}))
  }
  document.fonts&&document.fonts.ready.then(()=>ScrollTrigger.refresh())
  return ()=>{clearTimeout(timer);window.removeEventListener('eleven:enter',go);ScrollTrigger.getAll().forEach(t=>t.kill());lenis&&lenis.destroy();tickFn&&gsap.ticker.remove(tickFn);root.classList.remove('mx')}
}
export const refreshScroll=()=>ScrollTrigger.refresh()
