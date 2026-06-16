"use client";
import{useState,useEffect,useRef,FormEvent}from"react";
import{useRouter}from"next/navigation";

/* ═══ CONFIG ═══ */
const P="01020067990",PD="0102 006 7990",PI="+201020067990",WN="201020067990";
const WM="مرحباً، أريد الاستفسار عن ريفر ديستريكت العاصمة الإدارية من النيل — River District Nile Developments";
const WU=`https://wa.me/${WN}?text=${encodeURIComponent(WM)}`;
const WK="9e735802-47b3-4573-ba78-ac61b583cc85";

/* ═══ TRACKING PLACEHOLDERS ═══ */
function trackCall(l="call"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_call",{event_category:"contact",event_label:l});}
function trackWA(l="wa"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","click_whatsapp",{event_category:"contact",event_label:l});}
function trackLead(l="form"){if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","generate_lead",{event_category:"lead",event_label:l});}

/* ═══ IMAGES ═══ */
const CDN="https://nile-developments.com/mainsite/wp-content/uploads/2026/06/";
const I={hero:CDN+"1500-x-694-158-KB.jpg",slide1:CDN+"1500-X-694-1.png",slide2:CDN+"1500-X-694-2.png",logo:CDN+"River-District-Logo-pdf.jpg"};

type UT="all"|"apt2"|"apt3"|"gvilla"|"svilla";
const UNITS=[
  {t:"apt2"as UT,tl:"شقة",n:"شقق غرفتين نوم",en:"2 Bedrooms Apartment",p:"من ٩.٦ مليون",area:"من ١٢٥ م²",specs:["إطلالة بحيرة","٥٪ مقدم","قسط ٣٦ ألف/شهر"]},
  {t:"apt3"as UT,tl:"شقة",n:"شقق ٣ غرف نوم",en:"3 Bedrooms Apartment",p:"اتصل للسعر",area:"مساحات متعددة",specs:["تصميم فاخر","إطلالة النهر الأخضر","خصوصية عالية"]},
  {t:"gvilla"as UT,tl:"جاردن فيلا",n:"جاردن فيلا",en:"Garden Villa",p:"اتصل للسعر",area:"مساحات واسعة",specs:["حديقة خاصة","إطلالة مائية","تصميم عصري"]},
  {t:"svilla"as UT,tl:"سكاي فيلا",n:"سكاي فيلا",en:"Sky Villa",p:"اتصل للسعر",area:"حتى ٦٠٠ م²",specs:["فيو بانورامي ٣٦٠°","أعلى مستوى فخامة","روف خاص"]},
];
const FAQS=[
  {q:"أين يقع ريفر ديستريكت — River District؟",a:"ريفر ديستريكت العاصمة الإدارية يقع عند المدخل الرئيسي للعاصمة، مباشرة على بحيرة العاصمة وفي قلب النهر الأخضر. على بُعد دقيقتين من البرج الأيقوني — River District Nile Developments."},
  {q:"ما أنواع وحدات ريفر ديستريكت المتاحة؟",a:"River District يتضمن شقق غرفتين و٣ غرف، جاردن فيلا Garden Villa، وسكاي فيلا Sky Villa. ريفر ديستريكت النيل يوفر مساحات من ١٢٥ حتى ٦٠٠ م²."},
  {q:"ما أسعار ريفر ديستريكت من النيل — River District؟",a:"تبدأ من ٧٧,٠٠٠ جنيه/م² في ريفر ديستريكت. أقساط تبدأ من ٣٦,٠٠٠ جنيه/شهر. أسعار النيل للتطوير العقاري Nile Developments استرشادية."},
  {q:"ما خطة سداد River District النيل للتطوير العقاري؟",a:"٥٪ مقدم مع تقسيط حتى ١٠ سنوات. خصم ١٠٪ لكل ١٠٪ زيادة في المقدم — حتى ٢٠٪ خصم. كاش حتى ٣٠٪ خصم — ريفر ديستريكت النيل."},
  {q:"ما مساحة مشروع ريفر ديستريكت العاصمة الإدارية؟",a:"٤٠ فدان مع ١٢٪ فقط مباني. ١٣٠٠ متر واجهة على محور بن زايد الجنوبي، و١٥٠٠ متر إطلالة مباشرة على البحيرة. River District — Nile Developments."},
  {q:"من المطور العقاري لريفر ديستريكت — River District؟",a:"النيل للتطوير العقاري — Nile Developments، من الشركات الرائدة في العاصمة الإدارية. مشاريعهم: تايكون تاور، ٣١ نورث، نايل بيزنس سيتي."},
];
const NAV=[["#about","عن المشروع"],["#units","الوحدات"],["#payment","السداد"],["#gallery","المعرض"],["#amenities","المرافق"],["#contact","احجز الآن"]];
const PhI=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Chv=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

export default function Home(){
  const router=useRouter();
  const[uf,sUf]=useState<UT>("all");const[fq,sFq]=useState<number|null>(null);const[mn,sMn]=useState(false);
  const[fs,sFs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[pop,sPop]=useState(false);const[ps,sPs]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const[ck,sCk]=useState(false);const[prv,sPrv]=useState(false);
  const pr=useRef(false);const fr=useRef<HTMLFormElement>(null);const pfr=useRef<HTMLFormElement>(null);
  useEffect(()=>{document.querySelectorAll(".fin").forEach(el=>{new IntersectionObserver(([e])=>{if(e.isIntersecting)e.target.classList.add("vis")},{threshold:.1}).observe(el)});try{if(!localStorage.getItem("rd_ck"))sCk(true)}catch{sCk(true)}},[]);
  useEffect(()=>{if(pr.current)return;const os=()=>{if(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)>=.55)go()};const t=setTimeout(()=>go(),16000);window.addEventListener("scroll",os,{passive:true});function go(){if(pr.current)return;pr.current=true;sPop(true);document.body.classList.add("p-on");window.removeEventListener("scroll",os);clearTimeout(t)}return()=>{window.removeEventListener("scroll",os);clearTimeout(t)}},[]);
  const fl=uf==="all"?UNITS:UNITS.filter(u=>u.t===uf);
  function cp(){sPop(false);document.body.classList.remove("p-on")}
  async function sub(r:React.RefObject<HTMLFormElement|null>,ss:(s:any)=>void,src:string){if(!r.current)return;ss("sending");const fd=new FormData(r.current);const pl:Record<string,string>={};fd.forEach((v,k)=>pl[k]=v.toString());try{const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(pl)});const d=await res.json();if(d.success){ss("sent");trackLead(src);r.current.reset();if(src==="main_form")setTimeout(()=>router.push("/thank-you"),800)}else throw 0}catch{ss("error")}}

  return(<>
    <header className="hd"><div className="hd-in">
      <a className="hd-logo" href="#hero"><img src={I.logo} alt="ريفر ديستريكت River District النيل Nile"/><div><div className="hd-logo-t">RIVER DISTRICT</div><div className="hd-logo-s">ريفر ديستريكت · النيل للتطوير</div></div></a>
      <nav className="hd-nav">{NAV.map(([h,l])=><a key={h} href={h}>{l}</a>)}</nav>
      <div className="hd-acts"><a className="hd-call" href={`tel:${PI}`} onClick={()=>trackCall("header")}><PhI/><span>{PD}</span></a><a className="hd-book" href="#contact">سجل اهتمامك</a><button className="hd-mob" onClick={()=>sMn(!mn)}>☰</button></div>
    </div>{mn&&<div style={{background:"#0a1628",padding:"10px 20px"}}>{NAV.map(([h,l])=><a key={h} href={h} onClick={()=>sMn(false)} style={{display:"block",padding:"9px 0",color:"rgba(255,255,255,.65)",textDecoration:"none",fontSize:"13px",borderBottom:"1px solid rgba(255,255,255,.03)"}}>{l}</a>)}</div>}</header>

    <section className="hero" id="hero"><div className="hero-bg"><img src={I.hero} alt="ريفر ديستريكت العاصمة الإدارية — River District Nile Developments بحيرة العاصمة"/><div className="hero-ov"/></div>
    <div className="hero-ct">
      <span className="hero-tag">🌊 Nile Developments · النيل للتطوير العقاري</span>
      <h1 className="hero-h">ريفر <em>ديستريكت</em><br/>River <em>District</em></h1>
      <p className="hero-p">ريفر ديستريكت العاصمة الإدارية من النيل للتطوير العقاري — River District by Nile Developments. العنوان الوحيد على بحيرة العاصمة. ٤٠ فدان بإطلالة مباشرة على النهر الأخضر والبرج الأيقوني.</p>
      <p className="hero-kw">ريفر ديستريكت · River District · النيل للتطوير العقاري · Nile Developments · ريفر ديستريكت النيل · بحيرة العاصمة</p>
      <div className="hero-stats">
        <div className="hero-st"><strong>٤٠ فدان</strong><span>مساحة المشروع</span></div>
        <div className="hero-st"><strong>٥٪ مقدم</strong><span>سداد مرن</span></div>
        <div className="hero-st"><strong>١٠ سنوات</strong><span>تقسيط</span></div>
        <div className="hero-st"><strong>حتى ٣٠٪</strong><span>خصم كاش</span></div>
      </div>
      <div className="hero-btns">
        <a className="b-copper" href="#contact">سجل اهتمامك الآن</a>
        <a className="b-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("hero")}>💬 واتساب</a>
        <a className="b-ghost" href="#units">استكشف الوحدات</a>
      </div>
    </div></section>

    <div className="trust"><div className="trust-in">
      <div className="trust-i"><strong>٤٠</strong> فدان</div><div className="trust-i"><strong>١٢٪</strong> مباني فقط</div>
      <div className="trust-i"><strong>١٥٠٠</strong> م واجهة بحيرة</div><div className="trust-i"><strong>٣٠+</strong> فدان مياه</div>
      <div className="trust-i"><strong>٥٪</strong> مقدم</div><div className="trust-i"><strong>٣٠٪</strong> خصم كاش</div>
    </div></div>

    <section className="sec about" id="about"><div className="sec-in">
      <div className="fin" style={{textAlign:"center"}}><span className="sec-tag">River District · ريفر ديستريكت النيل</span>
        <h2 className="sec-h" style={{textAlign:"center"}}>العنوان الوحيد على <em>بحيرة العاصمة</em></h2>
        <p className="sec-p c">ريفر ديستريكت River District من النيل للتطوير العقاري Nile Developments — وجهة سكنية فريدة عند المدخل الرئيسي للعاصمة الإدارية، مباشرة على بحيرة العاصمة وفي قلب النهر الأخضر. ريفر ديستريكت النيل يجمع بين الموقع النادر والإطلالة الاستثنائية والفرصة الاستثمارية.</p>
      </div>
      <div className="about-grid fin">
        <div className="about-img"><img src={I.slide1} alt="ريفر ديستريكت العاصمة الإدارية — River District Nile بحيرة العاصمة والنهر الأخضر"/></div>
        <div className="about-pts">
          {[{i:"🌊",t:"١٥٠٠ م إطلالة على البحيرة",d:"ريفر ديستريكت — واجهة مائية مباشرة على بحيرة العاصمة"},{i:"🏙️",t:"دقيقتين من البرج الأيقوني",d:"River District عند بوابة العاصمة الرئيسية — موقع لا يتكرر"},{i:"🌿",t:"١٢٪ مباني — ٨٨٪ مساحات مفتوحة",d:"ريفر ديستريكت النيل — تصميم يمنح أقصى خصوصية وإطلالات"},{i:"🏛️",t:"النيل للتطوير العقاري — Nile Developments",d:"مطور تايكون تاور و٣١ نورث — خبرة أيقونية في العاصمة الإدارية"}].map((x,i)=>
            <div key={i} className="about-pt"><div className="about-pt-i">{x.i}</div><div><h3>{x.t}</h3><p>{x.d}</p></div></div>
          )}
        </div>
      </div>
      <div className="about-stats fin">
        {[{v:"40",l:"فدان — مساحة ريفر ديستريكت"},{v:"1500",l:"م واجهة على البحيرة"},{v:"1300",l:"م على محور بن زايد"},{v:"77K",l:"جنيه/م² يبدأ من"}].map((s,i)=>
          <div key={i} className="about-stat"><strong>{s.v}</strong><span>{s.l}</span></div>
        )}
      </div>
    </div></section>

    <div className="band"><h3>احجز في ريفر ديستريكت — River District العاصمة الإدارية</h3><p>٥٪ مقدم — تقسيط ١٠ سنوات — خصم كاش حتى ٣٠٪ — النيل للتطوير العقاري Nile Developments</p>
      <div className="band-btns"><a className="b-copper" href="#contact">سجل اهتمامك</a><a className="b-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("mid")}>💬 واتساب</a><a className="b-ghost" href={`tel:${PI}`} onClick={()=>trackCall("mid")}><PhI/> اتصل</a></div>
    </div>

    <section className="sec units" id="units"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">وحدات ريفر ديستريكت · River District Units</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>الوحدات المتاحة في <em>ريفر ديستريكت</em></h2>
      <p className="sec-p c">شقق وجاردن فيلا وسكاي فيلا من النيل للتطوير العقاري — Nile Developments بإطلالات على بحيرة العاصمة والنهر الأخضر</p>
      <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap",margin:"18px 0"}}>
        {([["all","الكل"],["apt2","غرفتين"],["apt3","٣ غرف"],["gvilla","جاردن فيلا"],["svilla","سكاي فيلا"]]as[UT,string][]).map(([k,l])=>
          <button key={k} onClick={()=>sUf(k)} style={{padding:"7px 16px",borderRadius:50,border:`2px solid ${uf===k?"var(--color-blue)":"rgba(12,59,94,.08)"}`,background:uf===k?"var(--color-blue)":"transparent",color:uf===k?"#fff":"var(--color-dark)",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"var(--font-body)"}}>{l}</button>
        )}
      </div>
      <div className="u-grid">{fl.map((u,i)=><div key={i} className="u-card"><div className="u-body"><span className="u-type">{u.tl} · River District</span><div className="u-name">{u.n}</div><div className="u-en">{u.en}</div>
        <div className="u-from">يبدأ من</div><div className="u-price">{u.p}</div><div style={{fontSize:10,color:"var(--color-blue)",marginBottom:8}}>📐 {u.area}</div>
        <div className="u-specs">{u.specs.map((s,j)=><span key={j} className="u-spec">{s}</span>)}</div>
        <a href={WU} target="_blank" rel="noopener" className="u-btn" onClick={()=>trackWA(`unit_${u.t}`)}>استفسر على واتساب</a>
      </div></div>)}</div>
      <p className="u-note">أسعار ريفر ديستريكت — River District من النيل للتطوير العقاري Nile Developments استرشادية وقابلة للتغيير</p>
    </div></section>

    <section className="sec pay" id="payment"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">سداد ريفر ديستريكت · Payment</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>خطة سداد <em>River District</em></h2>
      <div className="pay-grid" style={{textAlign:"right"}}>
        <div className="pay-c"><h3>نظام التقسيط</h3>
          <ul className="pay-list"><li>٥٪ مقدم فقط</li><li>أقساط تبدأ من ٣٦,٠٠٠ جنيه/شهر</li><li>تقسيط حتى ١٠ سنوات</li><li>سعر المتر يبدأ من ٧٧,٠٠٠ جنيه</li></ul>
          <div style={{marginTop:14}}><a className="b-blue" href={WU} target="_blank" rel="noopener" style={{width:"100%",justifyContent:"center"}} onClick={()=>trackWA("payment")}>اطلب تفاصيل السداد</a></div>
        </div>
        <div className="pay-c"><h3>عروض وخصومات ريفر ديستريكت</h3>
          <ul className="pay-list"><li>خصم ١٠٪ لكل ١٠٪ زيادة في المقدم</li><li>حتى ٢٠٪ خصم إجمالي</li><li>خصم كاش حتى ٣٠٪</li><li>النيل — Nile Developments مطور أيقوني</li></ul>
        </div>
      </div>
    </div></section>

    <section className="sec gal" id="gallery"><div className="sec-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag">معرض ريفر ديستريكت · Gallery</span>
      <h2 className="sec-h" style={{textAlign:"center"}}>معرض <em>River District</em> النيل</h2>
      <div className="gal-grid">
        <div className="gal-it big"><img src={I.hero} alt="ريفر ديستريكت العاصمة — River District Nile بحيرة العاصمة"/><div className="gal-cap">ريفر ديستريكت — إطلالة بحيرة العاصمة</div></div>
        <div className="gal-it"><img src={I.slide2} alt="ريفر ديستريكت النيل للتطوير"/><div className="gal-cap">River District — منظر جوي</div></div>
        <div className="gal-it"><img src={I.slide1} alt="ريفر ديستريكت النهر الأخضر"/><div className="gal-cap">ريفر ديستريكت — النهر الأخضر</div></div>
      </div>
    </div></section>

    <section className="am" id="amenities"><div className="am-in fin" style={{textAlign:"center"}}>
      <span className="sec-tag" style={{color:"var(--color-copper)"}}>مرافق ريفر ديستريكت · Amenities</span>
      <h2 className="sec-h" style={{color:"#fff",textAlign:"center"}}>مرافق <em style={{color:"var(--color-copper)"}}>River District</em></h2>
      <div className="am-grid">{[{i:"🏊",n:"حمام سباحة بانورامي"},{i:"🏋️",n:"جيم خارجي"},{i:"🧘",n:"يوغا خارجية"},{i:"🏃",n:"مسارات جري"},{i:"🏪",n:"منطقة تجارية"},{i:"💆",n:"مركز صحي وسبا"},{i:"👥",n:"منطقة اجتماعية"},{i:"🔒",n:"أمن ٢٤/٧"},{i:"🌊",n:"إطلالة بحيرة"},{i:"🌳",n:"٨٨٪ مساحات مفتوحة"},{i:"🏙️",n:"دقيقتين من الأيقوني"},{i:"🚆",n:"٥ دقائق من المونوريل"}].map((x,i)=>
        <div key={i} className="am-c"><div className="am-c-i">{x.i}</div><div className="am-c-n">{x.n}</div></div>
      )}</div>
    </div></section>

    <section className="sec loc"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>موقع <em>ريفر ديستريكت</em> — River District Location</h2>
      <div className="loc-grid" style={{textAlign:"right"}}>
        <div className="loc-img"><img src={I.slide2} alt="موقع ريفر ديستريكت العاصمة الإدارية Nile"/></div>
        <div>
          {[{t:"بوابة العاصمة الرئيسية",d:"ريفر ديستريكت عند المدخل الرئيسي للعاصمة الإدارية"},{t:"دقيقتين من البرج الأيقوني",d:"أقرب مشروع سكني للبرج الأيقوني — River District"},{t:"على بحيرة العاصمة",d:"١٥٠٠ متر واجهة مباشرة على البحيرة والنهر الأخضر"},{t:"٥ دقائق من المونوريل",d:"سهولة وصول فريدة — النيل للتطوير العقاري Nile Developments"}].map((x,i)=>
            <div key={i} className="loc-f"><h4>{x.t}</h4><p>{x.d}</p></div>
          )}
        </div>
      </div>
    </div></section>

    <section className="sec faq"><div className="sec-in fin" style={{textAlign:"center"}}>
      <h2 className="sec-h" style={{textAlign:"center"}}>أسئلة عن <em>ريفر ديستريكت</em> — River District FAQ</h2>
      <div className="faq-list">{FAQS.map((x,i)=><div key={i} className="faq-i"><button className={`faq-q ${fq===i?"op":""}`} onClick={()=>sFq(fq===i?null:i)}><span>{x.q}</span><span className="arr"><Chv/></span></button><div className={`faq-a ${fq===i?"op":""}`}><p>{x.a}</p></div></div>)}</div>
    </div></section>

    <div className="disc"><p>هذا الموقع يقدم معلومات استشارية عن ريفر ديستريكت — River District من النيل للتطوير العقاري — Nile Developments. جميع الأسعار استرشادية وقابلة للتغيير. التعاقد النهائي مع المطور مباشرة.</p>
      <p>تواصل: <a href={`tel:${PI}`} style={{color:"var(--color-blue)",fontWeight:700}}>{PD}</a></p>
    </div>

    <section className="ct" id="contact"><div className="sec-in fin">
      <div style={{textAlign:"center"}}><span className="sec-tag" style={{color:"var(--color-copper)"}}>سجل اهتمامك · Register</span><h2 className="sec-h" style={{color:"#fff",textAlign:"center"}}>احجز في <em style={{color:"var(--color-copper)"}}>ريفر ديستريكت</em> — River District</h2></div>
      <div className="ct-wrap">
        <div className="ct-left">
          <p>سجّل اهتمامك في ريفر ديستريكت العاصمة الإدارية من النيل — River District Nile Developments وفريق المبيعات هيتواصل معاك لآخر الأسعار والوحدات.</p>
          <a className="ct-row" href={`tel:${PI}`} onClick={()=>trackCall("contact")}><PhI/><span>{PD}</span><span style={{marginRight:"auto",fontSize:9,color:"rgba(255,255,255,.35)"}}>اتصل مباشرة</span></a>
          <a className="ct-row" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("contact")}>💬<span>واتساب ريفر ديستريكت — River District</span></a>
          <div style={{marginTop:16}}><a className="b-wa" href={WU} target="_blank" rel="noopener" style={{width:"100%",justifyContent:"center"}} onClick={()=>trackWA("contact_big")}>💬 واتساب الآن — ريفر ديستريكت</a></div>
        </div>
        <div className="ct-form"><div className="cf-title">سجل في ريفر ديستريكت — River District</div>
          <form ref={fr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(fr,sFs,"main_form")}} style={{textAlign:"right"}}>
            <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Lead — ريفر ديستريكت River District النيل"/><input type="hidden" name="from_name" value="River District Landing"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
            <div className="cf-row"><div className="cf-f"><label>الاسم *</label><input name="name" placeholder="اسمك" required/></div><div className="cf-f"><label>الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div></div>
            <div className="cf-row"><div className="cf-f"><label>الإيميل</label><input name="email" type="email" dir="ltr" placeholder="email@example.com"/></div><div className="cf-f"><label>نوع الوحدة</label><select name="unit_type"><option value="غير محدد">اختر</option><option value="شقة غرفتين">شقة — غرفتين</option><option value="شقة ٣ غرف">شقة — ٣ غرف</option><option value="جاردن فيلا">جاردن فيلا</option><option value="سكاي فيلا">سكاي فيلا</option></select></div></div>
            {fs==="sent"?<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-copper)",fontWeight:700,marginTop:4}}>تم — جاري التحويل...</p></div>
            :<button type="submit" className="cf-sub" disabled={fs==="sending"}>{fs==="sending"?"جاري...":"إرسال — احجز في ريفر ديستريكت"}</button>}
            {fs==="error"&&<p style={{color:"#ef4444",fontSize:10,textAlign:"center",marginTop:6}}>خطأ — <a href={WU} target="_blank" style={{color:"var(--color-copper)"}}>واتساب</a></p>}
            <p style={{fontSize:8,color:"rgba(255,255,255,.22)",textAlign:"center",marginTop:8}}>بإرسال النموذج توافق على <button onClick={()=>sPrv(true)} type="button" style={{background:"none",border:"none",color:"var(--color-copper)",textDecoration:"underline",cursor:"pointer",fontSize:8,fontFamily:"var(--font-body)"}}>سياسة الخصوصية</button></p>
          </form>
        </div>
      </div>
    </div></section>

    <footer className="ft"><div className="sec-in"><div className="ft-in">
      <div className="ft-brand"><img src={I.logo} alt="River District النيل"/><p>ريفر ديستريكت — River District من النيل للتطوير العقاري Nile Developments. العنوان الوحيد على بحيرة العاصمة الإدارية. ريفر ديستريكت النيل — أسعار استرشادية.</p></div>
      <div><div className="ft-h">روابط سريعة</div><div className="ft-links">{NAV.map(([h,l])=><a key={h} href={h}>{l}</a>)}</div></div>
      <div><div className="ft-h">تواصل معنا</div><div className="ft-links"><a href={`tel:${PI}`} onClick={()=>trackCall("footer")}>📞 {PD}</a><a href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("footer")}>💬 واتساب ريفر ديستريكت</a><span>📍 العاصمة الإدارية الجديدة</span></div></div>
    </div><div className="ft-bottom"><p className="ft-cr">© 2026 River District · ريفر ديستريكت · النيل للتطوير العقاري Nile Developments · أسعار استرشادية</p>
      <div className="ft-legal"><button onClick={()=>sPrv(true)}>سياسة الخصوصية</button><a href="#about">عن المشروع</a></div>
    </div></div></footer>

    <div className="float-btns"><a className="float-btn float-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("float")} aria-label="واتساب">💬</a><a className="float-btn float-call" href={`tel:${PI}`} onClick={()=>trackCall("float")} aria-label="اتصل">📞</a></div>

    <div className={`p-bk ${pop?"on":""}`} onClick={cp}/><div className={`p-dlg ${pop?"on":""}`}><button className="p-x" onClick={cp}>✕</button>
      <span className="p-tag">🌊 ريفر ديستريكت — River District</span><h2 className="p-h">احجز في ريفر ديستريكت العاصمة الإدارية</h2>
      <p className="p-desc">سجّل في River District من النيل Nile Developments واحصل على أولوية — ٥٪ مقدم وخصم كاش حتى ٣٠٪</p>
      <ul className="p-perks"><li>أولوية اختيار الوحدة في ريفر ديستريكت</li><li>٥٪ مقدم — قسط من ٣٦ ألف/شهر</li><li>خصم كاش حتى ٣٠٪ من النيل</li></ul>
      {ps==="sent"?<div style={{textAlign:"center",padding:"12px 0"}}><div style={{fontSize:36}}>✓</div><p style={{color:"var(--color-copper)",fontWeight:700}}>تم — ريفر ديستريكت</p></div>
      :<form className="p-form" ref={pfr} onSubmit={(e:FormEvent)=>{e.preventDefault();sub(pfr,sPs,"popup").then(()=>setTimeout(cp,2500))}}>
        <input type="hidden" name="access_key" value={WK}/><input type="hidden" name="subject" value="Popup — ريفر ديستريكت River District النيل"/><input type="hidden" name="from_name" value="River District Popup"/><input type="checkbox" name="botcheck" style={{display:"none"}}/>
        <div className="cf-f"><label>الاسم *</label><input name="name" placeholder="اسمك" required/></div>
        <div className="cf-f"><label>الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required/></div>
        <button type="submit" className="p-sub" disabled={ps==="sending"}>{ps==="sending"?"جاري...":"احجز في ريفر ديستريكت الآن"}</button>
        <a className="p-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("popup")}>💬 واتساب ريفر ديستريكت — River District</a>
      </form>}
    </div>

    {prv&&<><div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)"}} onClick={()=>sPrv(false)}/><div style={{position:"fixed",zIndex:301,top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(520px,92vw)",maxHeight:"85vh",overflowY:"auto",background:"#fff",borderRadius:16,padding:"28px 24px",color:"var(--color-dark)"}}>
      <button onClick={()=>sPrv(false)} style={{position:"absolute",top:10,left:10,background:"#f0f0f0",border:"none",borderRadius:"50%",width:28,height:28,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      <h2 style={{fontFamily:"var(--font-head)",fontSize:22,fontWeight:600,marginBottom:12}}>سياسة الخصوصية</h2>
      <div style={{fontSize:11,lineHeight:1.8,color:"var(--color-muted)"}}>
        <p style={{marginBottom:8}}>نجمع الاسم والهاتف والإيميل فقط عند تعبئة النموذج — للتواصل بخصوص ريفر ديستريكت River District من النيل.</p>
        <p style={{marginBottom:8}}>بياناتك مشفرة HTTPS ومحمية عبر Web3Forms. لا نبيع أو نشارك بياناتك مع أطراف ثالثة.</p>
        <p style={{marginBottom:8}}>يحق لك الاطلاع أو التصحيح أو الحذف في أي وقت.</p>
        <p>تواصل: <a href={`tel:${PI}`} style={{color:"var(--color-blue)"}}>{PD}</a></p>
      </div></div></>}

    {ck&&<div className="ck"><p>نستخدم cookies لتحسين تجربتك. <button onClick={()=>sPrv(true)} style={{background:"none",border:"none",color:"var(--color-copper)",textDecoration:"underline",cursor:"pointer",fontSize:10,fontFamily:"var(--font-body)"}}>سياسة الخصوصية</button></p>
      <div className="ck-btns"><button className="ck-ok" onClick={()=>{sCk(false);try{localStorage.setItem("rd_ck","1")}catch{}}}>موافق</button><button className="ck-no" onClick={()=>sCk(false)}>رفض</button></div>
    </div>}

    <nav className="mbar"><div className="mbar-in"><a className="m-call" href={`tel:${PI}`} onClick={()=>trackCall("mobile")}><PhI/>{PD}</a><a className="m-wa" href={WU} target="_blank" rel="noopener" onClick={()=>trackWA("mobile")}>💬</a><a className="m-book" href="#contact">سجل</a></div></nav>
  </>);
}
