import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextType from "./components/TextType";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function App() {
  const [word, setWord] = useState("0");
  const [theme, setTheme] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5*60); 
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const toggleTheme = () => setTheme((prev) => !prev);

  const handleWords = (e) => {
    const content = e.target.textContent;
    setWord(content.length);
    setIsActive(true);
  };

  return (
    <div className={theme ? "bg-[#111] text-white " : "bg-white text-black"}>
      <div className="text-center my-4 font-semibold text-2xl">
        <TextType
          text={[
            "Aakash Typing",
            "Mangal Font",
            "Callibri Font",
            "Stoke Counter App ",
            "By Aakash Sahu",
          ]}
          typingSpeed={75}
          pauseDuration={1000}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>

      <div className="w-screen justify-center grid gap-2 px-30">
        <div className="w-full flex justify-between">
          <div className="flex gap-2 text-nowrap">
            <span>Word Count : {word}</span>
            <span>|</span>
            <span>Timer: {formatTime(timeLeft)}</span>
          </div>
          <button
            className="rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center text-[#111]"
            onClick={toggleTheme}
          >
            {theme == true ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
          </button>
        </div>

        <div
          onInput={handleWords}
          contentEditable
          spellCheck={false}
          className="w-[80vw] 
        h-[80vh]
        text-lg
        p-3
        border border-white/30
        rounded-md
        overflow-x-auto
        whitespace-nowrap
        outline-none
        text-white
        align-top
      "
        ></div>
      </div>
    </div>
  );
}

export default App;
