import {memo} from 'react'
import {T} from '../i18n'
import ContactForm from './ContactForm'
import CopyBtn from './CopyBtn'
function Contact(){
  return (
<section id="contact">
<T as="h2" k="ct_h" className="rv">LET’S CONNECT.</T>
<T as="p" k="ct_s" className="mono rv" style={{color:'var(--ac)',margin:'-14px 0 14px'}}>EVERY CONNECTION STARTS SOMEWHERE.</T>
<T as="p" k="ct_p" className="lead rv">Have an opportunity, a technical discussion, or a cybersecurity collaboration in mind? Let’s connect.</T>
<div className="ct">
<div className="cards rv">
<div className="cc glass"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg><div><T as="span" k="l_ph" className="mono">PHONE / WHATSAPP</T><a href="tel:+201127503669"><b>+201127503669</b></a></div><CopyBtn inline text="+201127503669"/><a className="wa" href="https://wa.me/201127503669" target="_blank" rel="noopener">WHATSAPP ↗</a></div>
<div className="cr2"><a className="cc glass" href="mailto:eovowasoa10180@gmail.com"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><div><T as="span" k="l_em" className="mono">EMAIL</T><b>eovowasoa10180@gmail.com</b></div></a><CopyBtn text="eovowasoa10180@gmail.com"/></div>
<a className="cc glass" href="https://www.facebook.com/share/1DYdfiWSEH/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg><div><span className="mono">FACEBOOK</span><b>facebook.com/share/1DYdfiWSEH</b></div></a>
<a className="cc glass" href="https://www.tiktok.com/@eleven2197" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V3a5 5 0 0 0 5 5"/></svg><div><span className="mono">TIKTOK</span><b>@eleven2197</b></div></a>
</div>
<ContactForm/>
</div>
</section>
  )
}

export default memo(Contact)
