import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

// ==============================
// 🔧 CUSTOMIZE THESE SETTINGS!
// ==============================

const YOUR_ANNIVERSARY = "2022-10-31"; 
const YOUR_PHOTOS = [
  "us1.jpeg",
  "us2.jpeg",
  "us5.jpeg",
  "us6.jpeg" 
];
const MUSIC_URL = "jani.mp3"; 

// 🆕 IDEA #3: COMPLIMENTS FOR BALLOONS
const BALLOON_COMPLIMENTS = [
  "Your Smile muah >3", "Your Eyes  muah >3 ", "Your Butt muah🍑", "Your Laugh  muah >3 ", 
  "Your Kindness  muah >3 ", "Your Hugs muah >3 ", "Everything!  muah >3 "
];

// 🆕 IDEA #1: PROMISES FOR THE CONTRACT
const CONTRACT_PROMISES = [
  "I promise to always give you the last bite & sip of Food and drinks ",
  "I promise to notice every slightest problem u face🕷️",
  "I promise to listen to your drama even if I'm sleepy 😴",
  "I promise to love you even when you are angry 😡",
  "I promise to be your biggest fan forever 📣",
  "I promise to hug you after dhuadhar intercourse 😂"
];

// ---------------------------------------------------------
// 👇 THE FLATTERY MESSAGES
// ---------------------------------------------------------
const FLATTERY_LINES = [
  "Hey beautiful! 🌻",
  "I was just sitting here thinking...",
  "How did I get so lucky to have you?",
  "Are you a camera? 📸",
  "Because every time I look at you, I smile! (cringy ceingy h but yhi thk h 😆)",
  "Okay, okay, enough cheesiness...",
  "I actually have a serious question for you..."
];

// ==============================
// 📠 TYPEWRITER COMPONENT
// ==============================
const Typewriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

// ==============================

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  
  // STATE MANAGEMENT
  const [started, setStarted] = useState(false); 
  const [currentLine, setCurrentLine] = useState(0); 
  const [questionShown, setQuestionShown] = useState(false); 
  const [couponRevealed, setCouponRevealed] = useState(false); 
  const [showSecret, setShowSecret] = useState(false); 
  
  // 🆕 NEW STATE FOR IDEAS
  const [balloons, setBalloons] = useState([]);
  const [poppedMessage, setPoppedMessage] = useState("");
  const [checkedPromises, setCheckedPromises] = useState({});
  
  const audioRef = useRef(null);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const yesButtonSize = noCount * 20 + 16;
  
  // Check if all contract boxes are ticked
  const allPromisesChecked = CONTRACT_PROMISES.every((_, index) => checkedPromises[index]);

  const phrases = [
    "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!", 
    "Surely not?", "You might regret this!", "Give it another thought!", 
    "Are you absolutely certain?", "This could be a mistake!", "Have a heart!", 
    "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?", 
    "Is that your final answer?", "You're breaking my heart ;(", 
    "Pookie please?", "Don't do this to me :(", "I'm gonna cry...", 
    "You're breaking my heart!", "Okay, I'll stop asking...", 
    "Just kidding, PLEASE SAY YES", "You are being so mean!", 
    "I'll give you a massage?", "I'll make you food?", "I'll do the laundry?", 
    "Pretty please?", "With a cherry on top?", "PLEASE POOKIE", 
    "But I love you so much!", "I am going to die alone", 
    "Don't let me die alone", "Talk to me :(", "Why are you doing this?", 
    "Please give me a chance!", "I beg you!", 
    "Ok, fine, I will just keep asking", "FINAL CHANCE!"
  ];

  function handleNoClick() { setNoCount(noCount + 1); }
  function getNoButtonText() { return phrases[Math.min(noCount, phrases.length - 1)]; }

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio error:", e));
      setIsPlaying(true);
    }
  };

  const handleNextLine = () => {
    if (currentLine < FLATTERY_LINES.length - 1) {
      setCurrentLine(currentLine + 1);
    } else {
      setQuestionShown(true);
    }
  };

  function toggleMusic() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  // 🆕 BALLOON LOGIC
  useEffect(() => {
    if (!yesPressed) return;
    const interval = setInterval(() => {
      const id = Date.now();
      const text = BALLOON_COMPLIMENTS[Math.floor(Math.random() * BALLOON_COMPLIMENTS.length)];
      const x = Math.random() * 80 + 10; // Random horizontal position
      
      setBalloons(prev => [...prev, { id, text, x }]);

      // Remove balloon after 8 seconds if not clicked
      setTimeout(() => {
        setBalloons(prev => prev.filter(b => b.id !== id));
      }, 8000);
    }, 2500); // Spawn every 2.5 seconds

    return () => clearInterval(interval);
  }, [yesPressed]);

  const popBalloon = (id, text) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setPoppedMessage(text);
    setTimeout(() => setPoppedMessage(""), 2000); // Hide message after 2s
  };

  // 🆕 CONTRACT LOGIC
  const handlePromiseCheck = (index) => {
    setCheckedPromises(prev => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(YOUR_ANNIVERSARY);
      const now = new Date();
      const difference = now - start;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (yesPressed) {
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [yesPressed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative text-zinc-900 select-none">
      
      {/* Floating Hearts BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300 text-4xl"
            initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: 360 }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <audio ref={audioRef} loop src={MUSIC_URL} />

      {!started ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="z-50 flex flex-col items-center justify-center text-center cursor-pointer"
          onClick={handleStart}
        >
          <div className="animate-bounce text-6xl mb-4">💌</div>
          <h1 className="text-3xl font-bold text-rose-600 font-dancing-script mb-2">
            I have a surprise for you...
          </h1>
          <p className="text-gray-500 text-sm"></p>
          <button className="mt-8 bg-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
            Open Letter
          </button>
        </motion.div>
      ) : (
        <>
          <button 
            onClick={toggleMusic}
            className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-200 text-xl hover:scale-110 transition duration-300"
          >
            {isPlaying ? "🔇" : "🎵"}
          </button>

          {!questionShown ? (
            <motion.div
              key={currentLine} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="z-50 flex flex-col items-center text-center max-w-md px-4"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-rose-600 font-dancing-script mb-8 leading-normal min-h-[120px]">
                <Typewriter text={FLATTERY_LINES[currentLine]} speed={40} />
              </h2>
              <button
                onClick={handleNextLine}
                className="bg-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-rose-600 transition-all animate-pulse"
              >
                {currentLine === FLATTERY_LINES.length - 1 ? "Ask me! 🥺" : "Next 👉"}
              </button>
            </motion.div>
          ) : (
            <AnimatePresence>
              {yesPressed ? (
                /* YES PRESSED STATE */
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="fixed inset-0 z-10 flex flex-col items-center overflow-y-auto no-scrollbar bg-white/30 backdrop-blur-sm"
                >
                  <div className="pt-24 pb-10 w-full flex flex-col items-center">
                    <Confetti 
                      width={window.innerWidth} 
                      height={window.innerHeight} 
                      recycle={showConfetti}
                      numberOfPieces={500}
                    />
                    
                    <h1 className="text-4xl md:text-6xl font-bold text-rose-600 font-dancing-script mb-6 text-center leading-tight drop-shadow-sm">
                      YAAAY!!! Happy Valentine's! 💖
                    </h1>

                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-rose-200 mb-8 mx-4">
                      <h3 className="text-xs font-bold text-rose-500 mb-2 text-center uppercase tracking-wider">
                        We've been in love for:
                      </h3>
                      <div className="grid grid-cols-4 gap-4 text-rose-600 text-center">
                        <div className="flex flex-col"><span className="text-xl font-bold font-mono">{timeTogether.days}</span><span className="text-[10px] uppercase">Days</span></div>
                        <div className="flex flex-col"><span className="text-xl font-bold font-mono">{timeTogether.hours}</span><span className="text-[10px] uppercase">Hrs</span></div>
                        <div className="flex flex-col"><span className="text-xl font-bold font-mono">{timeTogether.minutes}</span><span className="text-[10px] uppercase">Mins</span></div>
                        <div className="flex flex-col"><span className="text-xl font-bold font-mono">{timeTogether.seconds}</span><span className="text-[10px] uppercase">Secs</span></div>
                      </div>
                    </div>

                    {/* PHOTO GALLERY with Hidden Heart & FOXES & BALLOONS */}
                    <div className="relative w-full max-w-lg mb-8">
                      
                      {/* 🎈 IDEA #3: BALLOONS OVERLAY */}
                      {balloons.map(b => (
                        <motion.div
                          key={b.id}
                          className="absolute bottom-0 z-40 cursor-pointer"
                          style={{ left: `${b.x}%` }}
                          initial={{ y: 0, opacity: 0 }}
                          animate={{ y: -400, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 10, ease: "linear" }}
                          onClick={() => popBalloon(b.id, b.text)}
                        >
                          <div className="relative group">
                            <span className="text-5xl drop-shadow-md hover:scale-110 transition-transform block">🎈</span>
                            <span className="absolute top-2 left-0 w-full text-center text-[10px] font-bold text-white px-1 leading-tight opacity-80">Click</span>
                          </div>
                        </motion.div>
                      ))}

                      {/* POPPED BALLOON MESSAGE */}
                      <AnimatePresence>
                        {poppedMessage && (
                           <motion.div 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1.2, opacity: 1, y: -50 }}
                              exit={{ opacity: 0 }}
                              className="absolute top-1/2 left-0 right-0 text-center z-50 pointer-events-none"
                           >
                              <span className="bg-white/95 px-6 py-3 rounded-full text-rose-600 font-bold text-xl shadow-xl border-4 border-rose-300">
                                {poppedMessage}
                              </span>
                           </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 🦊 FOX GIFS */}
                      <img src="https://media.tenor.com/NnZ3JaaqGjAAAAAi/cute-fox.gif" alt="Cute Fox" className="absolute -top-12 -left-6 w-24 md:w-28 z-20 drop-shadow-lg" />
                      <img src="https://media.tenor.com/J_vFv-aqQpIAAAAi/fox-cute.gif" alt="Dancing Fox" className="absolute -bottom-8 -right-6 w-24 md:w-28 z-20 drop-shadow-lg transform scale-x-[-1]" />

                      {/* 🕵️ THE HIDDEN HEART */}
                      <div onClick={() => setShowSecret(true)} className="absolute -top-6 -right-2 text-3xl cursor-pointer opacity-10 hover:opacity-100 transition-opacity duration-500 z-50 animate-pulse" title="Click me?">💖</div>

                      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 px-4">
                        {YOUR_PHOTOS.map((photo, index) => (
                          <motion.img
                            key={index}
                            src={photo}
                            alt="Us"
                            className="w-full h-40 md:h-60 object-cover rounded-xl shadow-lg border-4 border-white rotate-1 hover:rotate-0 hover:scale-105 transition duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 🫣 BLURRED COUPON REVEAL */}
                    <div 
                      onClick={() => setCouponRevealed(true)}
                      className="bg-white p-6 rounded-lg shadow-xl border-dashed border-2 border-rose-300 transform -rotate-2 hover:rotate-0 transition duration-300 max-w-xs w-full text-center relative overflow-hidden group cursor-pointer mb-8"
                    >
                      <div className="absolute top-0 left-0 w-full h-2 bg-rose-300"></div>
                      <h2 className="text-2xl font-bold text-rose-500 font-dancing-script mt-2">Special Coupon</h2>
                      <p className="text-gray-600 my-4 text-sm font-medium">Tap to reveal...</p>
                      
                      <div className={`transition-all duration-700 ${couponRevealed ? "filter-none blur-0" : "filter blur-md select-none"}`}>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Redeemable For:</p>
                        <div className="text-4xl animate-bounce"> 💦 + 🫱 </div>
                        <p className="text-xs text-gray-400 mt-2 italic">1 Day of Privacy</p>
                      </div>

                      {!couponRevealed && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/10 z-10">
                            <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-md">Click to Reveal!</span>
                          </div>
                      )}
                    </div>

                    {/* 📜 IDEA #1: THE LOVE CONTRACT */}
                    <div className="w-full max-w-sm bg-yellow-50 p-6 rounded-sm shadow-xl border border-yellow-200 relative mb-12 transform rotate-1">
                      {/* Decorative Tape */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-rose-200/50 rotate-2"></div>

                      <h3 className="text-2xl font-dancing-script font-bold text-gray-800 text-center mb-4 border-b-2 border-gray-200 pb-2">
                         Official Love Contract 🖋️
                      </h3>
                      <div className="space-y-3">
                        {CONTRACT_PROMISES.map((promise, index) => (
                          <div key={index} className="flex items-start gap-3 text-left">
                            <input 
                              type="checkbox" 
                              id={`promise-${index}`}
                              checked={!!checkedPromises[index]}
                              onChange={() => handlePromiseCheck(index)}
                              className="mt-1 w-5 h-5 text-rose-500 rounded focus:ring-rose-500 cursor-pointer accent-rose-500"
                            />
                            <label 
                              htmlFor={`promise-${index}`} 
                              className={`text-sm text-gray-700 cursor-pointer select-none transition-all ${checkedPromises[index] ? 'line-through opacity-50' : ''}`}
                            >
                              {promise}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      {/* Signature Stamp - Appears when all checked */}
                      <AnimatePresence>
                        {allPromisesChecked && (
                          <motion.div 
                            initial={{ scale: 2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mt-6 border-4 border-rose-500 text-rose-500 font-bold text-xl p-2 transform -rotate-12 inline-block rounded opacity-80"
                          >
                            SIGNED & SEALED 💋
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="h-40 w-full"></div>
                  </div>

                  {/* 🤫 SECRET MODAL POPUP */}
                  {showSecret && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowSecret(false)}>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                          <button onClick={() => setShowSecret(false)} className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        <h2 className="text-3xl font-bold text-rose-600 font-dancing-script mb-4">You found the Secret! 🤫</h2>
                        <p className="text-gray-600 mb-6 text-lg">
                          Congratulations! You found the hidden heart. 
                          <br/><br/>
                          This means I owe you <b>one extra finger inside you 😳</b>  or maybe<b> 2 </b>  😆
                        </p>
                        <button
                          onClick={() => setShowSecret(false)}
                          className="bg-rose-500 text-white font-bold py-2 px-6 rounded-full hover:bg-rose-600 shadow-lg"
                        >
                          Claim Prize
                        </button>
                      </motion.div>
                    </div>
                  )}

                </motion.div>
              ) : (
                /* ASKING STATE */
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="z-10 flex flex-col items-center"
                >
                  <div className="mb-6">
                    <img className="w-full max-w-[200px] rounded-lg shadow-lg" src="https://media.tenor.com/ManV39fXjF4AAAAi/bear-rose.gif" alt="Bear" />
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-rose-500 font-dancing-script">Will you be my Valentine?</h1>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    <button
                      className="bg-rose-500 text-white font-bold transition-all shadow-lg hover:bg-rose-600 rounded-full"
                      style={{ fontSize: yesButtonSize, padding: '15px 30px' }}
                      onClick={() => setYesPressed(true)}
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleNoClick}
                      className="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      {noCount === 0 ? "No" : getNoButtonText()}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </>
      )}
    </div>
  );
}