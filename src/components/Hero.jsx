import {memo} from 'react'
import {T} from '../i18n'
import Dock from './Dock'
function Hero(){
  return (
<section id="home" className="hero">
<div>
<T as="p" k="h_lab" className="mono" style={{color:'var(--ac)'}}>CYBERSECURITY ENTHUSIAST</T>
<h1 id="name" aria-label="ELEVEN"><span id="nt">ELEVEN</span><i className="cur"></i></h1>
<p className="hl"><T as="span" k="h_head">THINK BEYOND THE SURFACE.</T></p>
<T as="p" k="h_sup" className="sup">Exploring systems. Understanding vulnerabilities. Strengthening the digital world.</T>
<T as="p" k="h_spec" className="mono">RED TEAM | NETWORK SECURITY | WEB SECURITY</T>
<div className="btns"><T as="a" k="b1" className="btn p" href="#about">[ EXPLORE MY PROFILE ]</T><T as="a" k="b2" className="btn" href="#contact">[ CONTACT ME ]</T></div>
<Dock id="dk1"/>
<div className="st mono"><i className="dot"></i><T as="span" k="h_stat">CONTINUOUSLY LEARNING &amp; BUILDING</T></div>
</div>
<div className="pw" id="pw"><div className="pf" id="pf"><i></i><div className="ph"><img src="/portrait.webp" srcSet="/portrait-480.webp 480w, /portrait.webp 740w" sizes="(max-width:880px) 68vw, 430px" alt="Portrait of Mohamed (ELEVEN)" width="740" height="925" decoding="async" fetchPriority="high"/><span className="cap mono"><span>SUBJECT / ELEVEN</span><span>FILE 01</span></span></div><span className="vt mono">A DIGITAL IDENTITY</span></div></div>
<div className="hud" aria-hidden="true"><span>SYS://ELEVEN</span><span>FIG.01 — SUBJECT</span><span>SEC 01 / 08</span></div>
</section>
  )
}

export default memo(Hero)
