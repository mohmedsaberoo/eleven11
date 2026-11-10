import {memo} from 'react'
import {T} from '../i18n'
function Credentials(){
  return (
<section id="credentials" className="cr">
<T as="h2" k="c_h" className="rv">KNOWLEDGE IS BUILT.<br/>NOT CLAIMED.</T>
<div className="row glass rv"><h3>COMPTIA SECURITY+</h3><T as="p" k="c1">Studied learning track covering cybersecurity concepts, security architecture, threats, and defensive security fundamentals.</T><T as="span" k="studied" className="bd">STUDIED</T></div>
<div className="row glass rv"><h3>eJPT — INE</h3><T as="p" k="c2">Studied learning track covering practical penetration testing concepts and methodologies.</T><T as="span" k="studied" className="bd">STUDIED</T></div>
<div className="row glass rv"><h3>CEH — EC-COUNCIL</h3><T as="p" k="c3">Studied learning track covering ethical hacking concepts and offensive security fundamentals.</T><T as="span" k="studied" className="bd">STUDIED</T></div>
<div className="row glass rv"><h3>CRYPTOGRAPHY</h3><T as="p" k="c4">Studied encryption principles and cryptographic concepts.</T><T as="span" k="studied" className="bd">STUDIED</T></div>
<div className="row glass rv"><h3>REVERSE ENGINEERING</h3><T as="p" k="c5">Studied reverse engineering fundamentals and software analysis.</T><T as="span" k="studied" className="bd">STUDIED</T></div>
<div className="row glass rv"><h3>TRYHACKME</h3><T as="p" k="c6">Hands-on cybersecurity training through interactive learning environments.</T><T as="span" k="hands" className="bd">HANDS-ON</T></div>
<div className="row glass rv"><h3>INTERNATIONAL CYBERSECURITY LICENSE</h3><T as="p" k="c7">International License in Cybersecurity — Million International Licenses Initiative.</T><T as="span" k="earned" className="bd ok">EARNED</T></div>
</section>
  )
}

export default memo(Credentials)
