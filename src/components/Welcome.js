import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const Welcome = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    
      <div className=" h-screen flex flex-col overflow-x-hidden justify-between ">
        <nav className="flex flex-wrap text-4xl justify-between border-b-2 border-black py-4 px-10">
          <div>
            <label className="font-extrabold">Notenique</label>
          </div>
          <div className="flex flex-wrap gap-1 text-sm font-bold">
            <Link
              class="inline-block px-6 py-2 border-2 bg-gray-400 border-gray-800 text-gray-800  leading-tight uppercase rounded hover:bg-black hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              to="/Login"
            >
              Login
            </Link>
            <Link
              class="inline-block px-6 py-2 border-2 bg-white border-gray-800 text-gray-800  leading-tight uppercase rounded hover:bg-black hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              to="/Register"
            >
              Register
            </Link>
          </div>
        </nav>
        <main className="">
          <div class="relative flex overflow-x-hidden">
            <div class="py-12 text-4xl mx-4 animate-marquee whitespace-nowrap">
              <span>
                -<b>EMBRACE THE JOURNEY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BE THE CHANGE</b>-{date.toLocaleDateString()}
              </span>
              <span>
                -<b>START WITH WHY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>EMBRACE THE JOURNEY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BE THE CHANGE</b>-{date.toLocaleDateString()}
              </span>
            </div>

            <div class="absolute top-0 py-12 text-4xl mx-4 animate-marquee2 whitespace-nowrap">
              <span>
                -<b>EMBRACE THE JOURNEY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BE THE CHANGE</b>-{date.toLocaleDateString()}
              </span>
              <span>
                -<b>START WITH WHY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>EMBRACE THE JOURNEY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BE THE CHANGE</b>-{date.toLocaleDateString()}
              </span>
            </div>
          </div>
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-2 mx-auto">
              <div class="flex flex-wrap -m-4">
                <div class="p-4 md:w-1/3">
                  <div class="h-full border-2 border-black rounded-lg overflow-hidden">
                    <img
                      class="lg:h-48 md:h-36 w-full object-cover object-center"
                      src="https://images.pexels.com/photos/68562/pexels-photo-68562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="blog"
                    />
                    <div class="p-6">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        WRITE
                      </h2>
                      <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                        Note Everthing
                      </h1>
                      <p class="leading-relaxed mb-3">
                      With our web application, creating and organizing your notes has never been easier!
                      </p>
                      <div class="flex items-center flex-wrap ">
                        <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-4 md:w-1/3">
                  <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      class="lg:h-48 md:h-36 w-full object-cover object-center"
                      src="https://images.pexels.com/photos/6937932/pexels-photo-6937932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="blog"
                    />
                    <div class="p-6">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        DIAGRAM
                      </h2>
                      <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                        Create Mindmap
                      </h1>
                      <p class="leading-relaxed mb-3">
                      One of our key features is the ability to create notes use it on mind maps, which are both powerful tools for brainstorming and organizing information. 
                      </p>
                    </div>
                  </div>
                </div>
                <div class="p-4 md:w-1/3">
                  <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      class="lg:h-48 md:h-36 w-full object-cover object-center"
                      src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="blog"
                    />
                    <div class="p-6">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        SECURE
                      </h2>
                      <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                        Password Protection
                      </h1>
                      <p class="leading-relaxed mb-3">
                      we take your privacy seriously, which is why we offer password protection for your notes. With our password protection feature, you can rest assured that your personal and confidential information is safe and secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer>
        <div class="relative flex overflow-hidden bg-black text-white">
            <div class="py-10 text-4xl mx-4  animate-marquee whitespace-nowrap">
              <span>
                -<b>NOTENIQUE</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BY</b>-{date.toLocaleDateString()}
              </span>
              <span>
                -<b>@eMKay</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>WRITE NOTES EVERYDAY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BE THE CHANGE</b>-{date.toLocaleDateString()}
              </span>
            </div>

            <div class="absolute py-10 text-4xl mx-4 animate-marquee2 whitespace-nowrap">
            <span>
                -<b>NOTENIQUE</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BY</b>-{date.toLocaleDateString()}
              </span>
              <span>
                -<b>@eMKay</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>WRITE NOTES EVERYDAY</b>-{date.toLocaleTimeString()}
              </span>
              <span>
                -<b>BE THE CHANGE</b>-{date.toLocaleDateString()}
              </span>
            </div>
          </div>
        </footer>
      </div>
    
  );
};
export default Welcome;
