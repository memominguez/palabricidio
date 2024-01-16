import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { words } from "../data/palabras";
import Progressbar from "./Progressbar";
import iconoletras from "../assets/iconoletras.png";
import ringbell from "../assets/reception-bell.mp3"

const Palabricidio = () => {
  const [correctWord, setCorrectWord] = useState("");
  const [hint, setHint] = useState("");
  const [next, setNext] = useState(0);
  const [timer, setTimer] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  let trialsNumber = 5; // how many questions per test
  let wordTimeout = 90000; // waiting time for response
  let deltaProgressbar = (0.2 / wordTimeout) * 1000 * 100; // Progress bar parameter
 
  const inputRef = useRef(null);
  let shuffledWord = "";

  useEffect(() => {
    getRandomObj();
    toast.info(`Descifra la palabra. Harás ${trialsNumber} intentos. Responde antes de 90 segundos`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",      
      });
  }, []);

  useEffect(() => {
    setTimer(true);
    getRandomObj();
  }, [next]);

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      setTimer(false);
      setNext((prev) => prev + 1);
    }, wordTimeout);

    return () => clearTimeout(timeoutId);
  }, [next]);

  // **************************************************************

  function getRandomObj() {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    setCorrectWord(randomObj.word);
    setHint(randomObj.hint);
    // Next is kind of troubleshooting
    if (next < trialsNumber) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  // **************************************************************

  let wordArray = Array.from(correctWord);
  // Shuffle the word by the Fisher-Yates sorting algorithm
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  shuffledWord = wordArray.join("");

  // ***************************************************************

  const checkWord = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) {
      return toast.warn("Favor escribir palabra", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
    if (inputRef.current.value !== correctWord) {
      toast.error(`${inputRef.current.value} no es la palabra correcta`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    } else {
      toast.success(`${inputRef.current.value} ERA CORRECTA!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      setTimer(false);
      setNext((prev) => prev + 1);
      setSuccessCount((prevCount) => prevCount + 1);
    }
  };

  // ************************************************************

  if (next === trialsNumber) {
    playRingbell()
  }

  // *************************************************************

  function playRingbell() {
    new Audio(ringbell).play();
  }


  // **************************************************************

  const handleStartover = () => {
    // location.reload();
    setTimer(false)
    setNext(0)
    setSuccessCount(0)
    // getRandomObj()

  };  


  return (
    <>
      {next >= trialsNumber ? (
        <div className="container">
          <div className="endgame">
          <h1>{trialsNumber} INTENTOS</h1>
          <h1>Aciertos: {successCount}</h1>
          <button className="endgamebtn" onClick={handleStartover}>
            Intentar otro ejercicio
          </button>
          </div>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="heading">
              <h2>Ordena las letras y descifra la palabra</h2>
              <img src={iconoletras} alt="imagen" />
            </div>
            <div className="content">
              <p className="word">{shuffledWord}</p>

              <div className="details">
                <p><span>{hint}</span></p>
              </div>

              <form>
                <input
                  type="text"
                  placeholder="Escribe aquí la palabra"
                  autoComplete="off"
                  ref={inputRef}
                />

                <div className="time">
                  <p>Tiempo corre:</p>
                  <Progressbar pleaseGo={timer} increment={deltaProgressbar} />
                </div>

                <div className="buttons">
                  <button
                    type="button"
                    className="refresh-word"
                    onClick={getRandomObj}
                  >
                    Cambiar palabra
                  </button>
                  <button
                    type="submit"
                    className="check-word"
                    onClick={checkWord}
                  >
                    Responder
                  </button>
                </div>
              </form>
            </div>
            <div className="comments">
              <p>
                Intentos: <span>{next}</span>
              </p>
              <p>
                Aciertos: <span>{successCount}</span>
              </p>
            </div>
          </div>
          <div className="outcontent">
            <button onClick={handleStartover}>Re-iniciar</button>
          </div>
        </>
      )}
    </>
  );
};

export default Palabricidio;
