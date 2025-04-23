'use client'

export default function LeftSide(){
    return(
      <div className="bg-[#A78BFA] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('Background.png')] bg-cover opacity-70"/>
        <img
          src="/image1.png"
          alt="Ilustração Educacional"
          className="relative w-[500px]"
        />
      </div>
    );
}