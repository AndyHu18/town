import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0B1221] to-[#050811] text-white py-24 border-t border-primary/30 relative overflow-hidden">
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-primary/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(234,179,8,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-5">
              <h3 className="text-4xl font-serif font-bold tracking-[0.3em] text-primary drop-shadow-[0_0_20px_rgba(234,179,8,0.6)] relative inline-block">
                華友聯健康園區
                <div className="absolute -bottom-3 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />
              </h3>
              <p className="text-base font-sans tracking-[0.25em] text-primary/70 uppercase font-light">
                FULL LIFE VILLA
              </p>
            </div>
            <p className="font-serif text-white/80 leading-loose text-justify text-base">
              擁抱翠綠山水自然恩惠，享受華友聯宜蘭富居。
              <br />
              高端奢侈健康生活園區，為您打造身心靈的極致歸屬。
            </p>
            <div className="flex gap-4 pt-2">
              {/* Enhanced Social Icons */}
              <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-[#0B1221] hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/5 group">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-[#0B1221] hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/5 group">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm0 2H12.2c-2.605 0-2.917.01-3.94.058-.973.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.884-.344 1.857-.047 1.023-.058 1.351-.058 3.941v.178c0 2.589.01 2.916.058 3.94.045.974.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.884.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.94-.058.975-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.884.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.94-.045-.973-.207-1.504-.344-1.857a2.497 2.497 0 01-.748-1.15c-.35-.35-.683-.566-1.15-.748-.353-.137-.884-.3-1.857-.344-1.023-.047-1.351-.058-3.941-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-[#0B1221] hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/5 group">
                <span className="sr-only">LINE</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
              </div>
            </div>
          </div>

          {/* Quick Links Section - Complete Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-serif font-bold mb-10 text-primary relative inline-block drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              快速連結
              <span className="absolute -bottom-3 left-0 w-2/3 h-[2px] bg-gradient-to-r from-primary to-transparent shadow-[0_0_10px_rgba(234,179,8,0.6)]"></span>
            </h4>
            <ul className="space-y-5 font-sans text-sm tracking-[0.15em]">
              <li>
                <Link href="/about" className="text-white/80 hover:text-primary transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:w-3 group-hover:bg-primary transition-all duration-300"></span>
                  進入園區
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-white/80 hover:text-primary transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:w-3 group-hover:bg-primary transition-all duration-300"></span>
                  六大面向
                </Link>
              </li>
              <li>
                <Link href="/wellness" className="text-white/80 hover:text-primary transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:w-3 group-hover:bg-primary transition-all duration-300"></span>
                  健康醫療
                </Link>
              </li>
              <li>
                <Link href="/farm" className="text-white/80 hover:text-primary transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:w-3 group-hover:bg-primary transition-all duration-300"></span>
                  休閒農場
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="text-white/80 hover:text-primary transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:w-3 group-hover:bg-primary transition-all duration-300"></span>
                  生活服務
                </Link>
              </li>
              <li>
                <Link href="/video-tour" className="text-white/80 hover:text-primary transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:w-3 group-hover:bg-primary transition-all duration-300"></span>
                  介紹影片
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-primary transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:w-3 group-hover:bg-primary transition-all duration-300"></span>
                  聯絡我們
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter - Enhanced */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h4 className="text-xl font-serif font-bold mb-10 text-primary relative inline-block drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                聯絡資訊
                <span className="absolute -bottom-3 left-0 w-2/3 h-[2px] bg-gradient-to-r from-primary to-transparent shadow-[0_0_10px_rgba(234,179,8,0.6)]"></span>
              </h4>
              <ul className="space-y-5 font-sans text-sm tracking-wide text-white/80">
                <li className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-300">
                  <span className="text-primary mt-1 text-xl group-hover:scale-110 transition-transform">📍</span>
                  <span className="leading-relaxed">宜蘭縣蘇澳鎮 (詳細地址待補)</span>
                </li>
                <li className="flex items-center gap-4 group hover:translate-x-1 transition-transform duration-300">
                  <span className="text-primary text-xl group-hover:scale-110 transition-transform">📞</span>
                  <span>+886 3 999 9999</span>
                </li>
                <li className="flex items-center gap-4 group hover:translate-x-1 transition-transform duration-300">
                  <span className="text-primary text-xl group-hover:scale-110 transition-transform">✉️</span>
                  <span>info@fufuvilla.com</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="font-serif text-base text-white/70 mb-5 tracking-wide">
                訂閱以獲取最新活動與健康資訊
              </p>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="您的 Email" 
                  className="bg-white/5 border-2 border-white/20 px-5 py-3.5 w-full focus:outline-none focus:border-primary/70 focus:bg-white/10 text-sm text-white placeholder:text-white/40 transition-all rounded-md backdrop-blur-sm"
                />
                <button className="bg-gradient-to-r from-primary to-primary/90 text-[#0B1221] px-8 py-3.5 font-serif font-bold text-sm hover:from-primary/90 hover:to-primary hover:scale-105 transition-all tracking-[0.2em] rounded-md shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
                  訂閱
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="mt-24 pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-xs text-white/50 tracking-[0.2em]">
          <p className="flex items-center gap-2">
            <span className="text-primary">©</span>
            {new Date().getFullYear()} 華友聯健康科技健康園區. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors duration-300 relative group">
              隱私權政策
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300 relative group">
              使用條款
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
