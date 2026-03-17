import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const credits = userData.credits;
  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
        await axios.get(serverUrl+"/auth/logout",{
            withCredentials: true
        });
        dispatch(setUserData(null));
        useNavigate("/login");
    } catch (error) {
        console.log("logout error", error);
    }
  }
  return (
    <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative z-20 mx-6 mt-6
rounded-2xl
bg-gradient-to-br from-black/90 via-black/80 to-black/90
backdrop-blur-2xl
border border-white/10
shadow-[0_22px_55px_rgba(0,0,0,0.75)]
flex items-center justify-between px-8 py-4"
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="examnotes" className="w-9 h-9" />
        <span className="text-lg hidden md:block font-semibold text-white">
          ExamNotes <span className="text-gray-400">AI</span>
        </span>
      </div>

      <div className="flex items-center gap-6 relative">
        {/* credit button container */}
        <div className="relative">
          {/* credit button */}
          <motion.div
            onClick={() => {
              setShowCredits(!showCredits);
              setShowProfile(false);
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
          >
            <span className="text-xl">💎</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold"
            >
              ➕
            </motion.span>
          </motion.div>
          {/* popup after clicking credit button */}
          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-64
                    rounded-2xl
                    bg-black/90 backdrop-blur-xl
                    border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                    p-4 text-white"
              >
                <h4 className="font-semibold mb-2">Buy Credits</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Use credits to generate AI notes, diagrams & PDFs.
                </p>
                <button
                  onClick={() => {
                    setShowCredits(false);
                    navigate("/pricing");
                  }}
                  className="w-full py-2 rounded-lg
bg-gradient-to-br from-white to-gray-200
text-black font-semibold
hover:opacity-90"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* profile button container*/}
        <div className="relative">
          {/* profile button */}
          <motion.div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredits(false);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
          >
            <span className="text-lg">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </span>
          </motion.div>
          {/* profile option popup */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[-50px] mt-4 w-52
                    rounded-2xl
                    bg-black/90 backdrop-blur-xl
                    border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                    p-4 text-white"
              >
                <MenuItem label="History" onClick={()=>{setShowProfile(false); navigate("/history");}}/>
                <div className="h-px bg-white/10 mx-3" />
                <MenuItem label="Logout" red onClick={handleLogout}/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
