import {memo,useEffect,useRef} from 'react'
import {m} from 'framer-motion'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {T} from '../i18n'
import {JOURNEY} from '../data/journey'
import {rm} from '../env'
const SL={studied:'STUDIED',hands:'HANDS-ON',earned:'EARNED'}

// Scroll-scrubbed timeline: the line fills as you read, milestones reveal in sequence.
function Journey(){
  const root=useRef(null),fill=useRef(null)
  useEffect(()=>{
    const ms=root.current.querySelectorAll('.tm')
    if(rm){gsap.set(fill.current,{scaleY:1});ms.forEach(e=>e.classList.add('on'));return}
    const ctx=gsap.context(()=>{
      gsap.fromTo(fill.current,{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:root.current,start:'top 65%',end:'bottom 60%',scrub:.4}})
      gsap.set(ms,{opacity:0,y:34})
      ScrollTrigger.batch(ms,{start:'top 88%',once:true,onEnter:b=>{b.forEach(e=>e.classList.add('on'));gsap.to(b,{opacity:1,y:0,duration:.8,stagger:.12,ease:'power3.out'})}})
    },root)
    return()=>ctx.revert()
  },[])
  return (
    <section id="journey">
      <T as="h2" k="j_h" className="rv">MY CYBERSECURITY JOURNEY</T>
      <T as="p" k="j_d" className="lead rv">A map of the learning areas and training behind my journey. The order does not imply dates, and only the international license is an earned credential.</T>
      <div className="tl" ref={root}>
        <i className="tl-line" aria-hidden="true"><b ref={fill}/></i>
        <ol className="tml">
          {JOURNEY.map((j,i)=>(
            <li className="tm" key={j.id}>
              <span className="nd" aria-hidden="true"/>
              <m.div className="tc glass" whileHover={{y:-4}} transition={{duration:.2}}>
                <div className="tch"><span className="mono">0{i+1}</span><T className={'bd'+(j.status==='earned'?' ok':j.status==='hands'?' hn':'')} k={j.status}>{SL[j.status]}</T></div>
                <h3>{j.title}</h3>
                {j.date&&<span className="mono">{j.date}</span>}
                <T as="p" k={j.desc}>{j.en}</T>
              </m.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
export default memo(Journey)
