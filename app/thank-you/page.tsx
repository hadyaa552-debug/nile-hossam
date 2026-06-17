"use client";
import{useEffect}from"react";
const PI="+201020067990",PD="0102 006 7990";
const WU=`https://wa.me/201020067990?text=${encodeURIComponent("مرحباً، لسه سجلت في ريفر ديستريكت — River District وعايز التفاصيل")}`;
const LOGO="https://nile-developments.com/mainsite/wp-content/uploads/2026/06/River-District-Logo-pdf.jpg";
export default function ThankYou(){
  useEffect(()=>{
    const w=window as any;
    if(w.gtag)w.gtag("event","conversion",{send_to:"AW-17039137293/lXETCNDk2cAcEI208rw_",value:1.0,currency:"USD"});
  },[]);
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0a1628,#0d1f35)",padding:"40px 24px",fontFamily:"'IBM Plex Sans Arabic',sans-serif",textAlign:"center",color:"#fff"}}>
      <img src={LOGO} alt="River District ريفر ديستريكت النيل" style={{height:56,marginBottom:24,borderRadius:8}}/>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(12,59,94,.15)",border:"2px solid rgba(12,59,94,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,marginBottom:20}}>✓</div>
      <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(26px,5vw,42px)",fontWeight:600,marginBottom:10}}>شكراً! تم استلام طلبك</h1>
      <p style={{fontSize:15,color:"rgba(255,255,255,.6)",maxWidth:460,lineHeight:1.7,marginBottom:6}}>فريق مبيعات <strong style={{color:"#c07830"}}>ريفر ديستريكت — River District</strong> من النيل للتطوير العقاري Nile Developments هيتواصل معاك قريب.</p>
      <p style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:28}}>ريفر ديستريكت العاصمة الإدارية · بحيرة العاصمة · River District Nile Developments</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:28}}>
        <a href={WU} target="_blank" rel="noopener" style={{display:"flex",alignItems:"center",gap:7,padding:"13px 26px",background:"#25d366",color:"#fff",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>💬 واتساب ريفر ديستريكت</a>
        <a href={`tel:${PI}`} style={{display:"flex",alignItems:"center",gap:7,padding:"13px 26px",border:"1px solid rgba(192,120,48,.3)",color:"#c07830",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none",direction:"ltr"}}>📞 {PD}</a>
        <a href="/" style={{padding:"13px 26px",border:"1px solid rgba(255,255,255,.12)",color:"rgba(255,255,255,.6)",borderRadius:10,fontSize:12,fontWeight:600,textDecoration:"none"}}>← العودة</a>
      </div>
      <div style={{display:"flex",gap:18,flexWrap:"wrap",justifyContent:"center",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.05)",borderRadius:12,padding:"16px 22px"}}>
        {[["٤٠","فدان"],["٥٪","مقدم"],["١٠","سنوات"],["٣٠٪","خصم كاش"]].map(([v,l],i)=><div key={i} style={{textAlign:"center",minWidth:70}}><div style={{fontSize:17,fontWeight:800,color:"#c07830"}}>{v}</div><div style={{fontSize:9,color:"rgba(255,255,255,.35)",marginTop:2}}>{l}</div></div>)}
      </div>
      <p style={{fontSize:8,color:"rgba(255,255,255,.15)",marginTop:24}}>© 2026 River District · ريفر ديستريكت · النيل للتطوير العقاري Nile Developments</p>
    </div>
  );
}
