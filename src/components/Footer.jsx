import {memo} from 'react'
import {T} from '../i18n'
import Dock from './Dock'
function Footer(){
  return (
<footer>
<a href="#home" className="logo">ELEVEN<b>.</b></a>
<T as="p" k="tag" className="mono">THINK BEYOND THE SURFACE.</T>
<T as="p" k="brand" className="mono">ELEVEN — A DIGITAL IDENTITY BEYOND THE ORDINARY.</T>
<T as="p" k="f_b">Built with curiosity. Driven by security.</T>
<Dock id="dk3"/>
<div className="fl mono"><T as="a" k="n2" href="#about">ABOUT</T><T as="a" k="n4" href="#skills">SKILLS</T><T as="a" k="n5" href="#credentials">CREDENTIALS</T><T as="a" k="n7" href="#contact">CONTACT</T></div>
<T as="p" k="f_c" className="mono" style={{marginTop:'22px'}}>© 2026 ELEVEN. All Rights Reserved.</T>
</footer>
  )
}

export default memo(Footer)
