// import React from "react";
// import logo from "../assets/Vchat.png";

// const Navbar = () => {
//   return (
//     <div className="Navbar w-full h-[80px] bg-gray-600 flex items-center px-6 sticky top-0 z-10 justify-between">
//       <div className="flex gap-1 align-middle justify-center text-center">
//       <img src={logo} alt="Vchat Logo" className="w-[60px] h-[60px] m-2" />
//       <h1 className="text-white text-2xl font-bold">Vchat</h1>
//       </div>
//       <div className="">
//         this is your chat room
//       </div>

//       <div>
//         <ul>
//           <li>Home</li>
//           <li>About</li>
//           <li>Contact us</li>
//         </ul>
//       </div>
//     </div>
//   );
// };



// export default Navbar;




import React from "react";
import logo from "../assets/Vchat.png";

const Navbar = () => {
  return (
    <div className="Navbar w-full h-[80px] bg-gray-600 flex items-center px-6 sticky top-0 z-10 justify-between backdrop-blur-sm">
      {/* Logo & Title */}
      <div className="flex gap-1 items-center">
        <img src={logo} alt="Vchat Logo" className="w-[60px] h-[60px] m-2" />
        <h1 className="text-white text-2xl font-bold">Vchat</h1>
      </div>

      {/* Chatroom Info */}
      <div className="text-white text-lg">This is your chat room</div>

      {/* Navigation Links */}
      <div className="max-md:hidden"> 
        <ul className="flex gap-4 text-white">
          <li>Home</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

