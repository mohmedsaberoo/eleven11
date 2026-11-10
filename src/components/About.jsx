import {memo} from 'react'
import {T} from '../i18n'
function About(){
  return (
<section id="about" className="ab">
<T as="h2" k="a_h" className="rv">BEHIND THE TERMINAL.</T>
<div className="glass rv">
<T as="p" k="a1">I’m Mohamed, known as ELEVEN — a cybersecurity enthusiast driven by curiosity, technical exploration, and the challenge of understanding complex digital systems.</T>
<T as="p" k="a2">My interests span Red Team methodologies, network security, web application security, cryptography, and reverse engineering.</T>
<T as="p" k="a3">I believe that understanding how systems work — and how they fail — is essential to building stronger digital environments.</T>
<T as="p" k="a4">I continuously develop my technical knowledge through structured learning, authorized labs, and practical experimentation.</T></div>
</section>
  )
}

export default memo(About)
