export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-12 pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold uppercase mb-4">GET IN TOUCH</h4>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no
            </p>
            <p className="text-gray-400 text-sm mb-2"><i className="mr-2">📍</i>123 Street, New York, USA</p>
            <p className="text-gray-400 text-sm mb-2"><i className="mr-2">📧</i>info@example.com</p>
            <p className="text-gray-400 text-sm mb-2"><i className="mr-2">📞</i>+012 345 67890</p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold uppercase mb-4">QUICK SHOP</h4>
            <ul className="text-gray-400 text-sm flex flex-col gap-2">
              <li><a href="#" className="hover:text-primary transition-colors">➤ Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Our Shop</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Shop Detail</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Shopping Cart</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Checkout</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold uppercase mb-4">MY ACCOUNT</h4>
            <ul className="text-gray-400 text-sm flex flex-col gap-2">
              <li><a href="#" className="hover:text-primary transition-colors">➤ Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Our Shop</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Shop Detail</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Shopping Cart</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Checkout</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">➤ Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold uppercase mb-4">NEWSLETTER</h4>
            <p className="text-gray-400 text-sm mb-4">Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
            <div className="flex">
              <input type="email" placeholder="Your Email Address" className="w-full px-4 py-2 text-dark focus:outline-none" />
              <button className="bg-primary text-dark font-medium px-4 py-2 hover:bg-yellow-500 transition-colors">Sign Up</button>
            </div>
            <h6 className="text-gray-400 font-bold uppercase mt-6 mb-3 text-sm">FOLLOW US</h6>
            <div className="flex gap-2">
              <div className="bg-primary text-dark w-10 h-10 flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors">TW</div>
              <div className="bg-primary text-dark w-10 h-10 flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors">FB</div>
              <div className="bg-primary text-dark w-10 h-10 flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors">IN</div>
              <div className="bg-primary text-dark w-10 h-10 flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors">IG</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; <a href="#" className="text-primary hover:underline">Domain</a>. All Rights Reserved. Designed by <a href="#" className="text-primary hover:underline">HTML Codex</a>
          </p>
          <div className="flex gap-2 mt-4 md:mt-0 opacity-50">
            {/* Payment methods mock */}
            <div className="w-10 h-6 bg-white rounded"></div>
            <div className="w-10 h-6 bg-white rounded"></div>
            <div className="w-10 h-6 bg-white rounded"></div>
            <div className="w-10 h-6 bg-white rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
