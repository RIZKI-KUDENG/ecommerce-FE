import Image from "next/image";
export default function Footer() {
    return (
        <div className="bg-black text-white py-5">
                <div className="flex justify-around">
                  <div>
                    <h1 className="text-xl font-bold">Exclusive</h1>
                    <ul className="text-sm text-slate-50 py-3 flex flex-col gap-2">
                      <li>Subscribe</li>
                      <li>Get 10% off your first order</li>
                    </ul>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Support</h1>
                    <ul className="text-sm text-slate-50 py-3 flex flex-col gap-2">
                      <li>
                        Jl. Mangga No. 1 Bandung, <br />
                        Indonesia
                      </li>
                      <li>exclusive@gmail.com</li>
                      <li>+62 123 456 789</li>
                    </ul>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Account</h1>
                    <ul className="text-sm text-slate-50 py-3 flex flex-col gap-2">
                      <li>My Account</li>
                      <li>Login / Register</li>
                      <li>Cart</li>
                      <li>Wishlist</li>
                      <li>Shop</li>
                    </ul>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Quick Link</h1>
                    <ul className="text-sm text-slate-50 py-3 flex flex-col gap-2">
                      <li>Privacy Policy</li>
                      <li>Terms & Conditions</li>
                      <li>FAQ</li>
                      <li>Contact</li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Download App</h1>
                    <p className="text-sm text-slate-50">save $3 with exclusive app</p>
                    <div>
                      <div className="flex gap-3">
                        <Image
                          src="/Qrcode.png"
                          alt="logo"
                          width={100}
                          height={100}
                          className="w-20 h-20"
                        />
                        <div>
                          <Image
                            src="/playstore.png"
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-20 h-10"
                          />
                          <Image
                            src="/appstore.png"
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-20 h-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-2">
                        {[
                          "/Facebook.png",
                          "/instagram.png",
                          "/Twitter.png",
                          "/Linkedin.png",
                        ].map((item, index) => {
                          return (
                            <Image
                              src={item}
                              alt="logo"
                              width={100}
                              height={100}
                              className="w-8 h-8"
                              key={index}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-slate-500 mt-5">
                  <h5>&copy; 2023 Exclusive</h5>
                </div>
              </div>
    )
}