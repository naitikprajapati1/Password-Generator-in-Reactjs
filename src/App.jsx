/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react'
import copy from './assets/copy.svg'
import mouseClick from './assets/mouse-click.mp3'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setIsLength] = useState(8);
  const [isUpperCase, setIsUpperCase] = useState(true)
  const [isLowerCase, setIsLowerCase] = useState(false)
  const [isNumber, setIsNumber] = useState(false)
  const [isSymbol, setIsSymbol] = useState(false);


  const inputPassword = useRef(null);
  const indicator = useRef(null);
  const copyBtn = useRef(null);
  const copyAudio = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    copyAudio.current.play();
    if (isNumber) str += "0123456789";
    if (isUpperCase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isLowerCase) str += "abcdefghijklmnopqrstuvwxyz";
    if (isSymbol) str += "!@~#$%^&*()_+{}:?><*-+~";


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }

    setPassword(pass);
    if (pass) {

      if ((isNumber || isSymbol && isUpperCase && isLowerCase) && length >= 7) {
        indicator.current.style.background = 'green';
        indicator.current.style.boxShadow = '0px 0px 12px 1px green';
      } else if (((isNumber && isSymbol && isUpperCase && isLowerCase) && length <= 6)) {
        indicator.current.style.background = 'yellow';
        indicator.current.style.boxShadow = '0px 0px 12px 1px yellow';
      } else {
        indicator.current.style.background = 'red';
        indicator.current.style.boxShadow = '0px 0px 12px 1px red';
      }

    }

  }, [isNumber, isUpperCase, isLowerCase, isSymbol, setPassword, length])
  const copyPassword = async () => {
    try {
      await window.navigator.clipboard.writeText(password);
      copyBtn.innerHtml = "Copied 💯"
      copyAudio.current.play();
      copyBtn.current.classList.add("active");
    } catch (error) {
      copyBtn.innerHtml = "Error ❗"
    }

    setTimeout(() => {
      copyBtn.current.classList.remove("active");

    }, 1000);
  }
  return (
    <div className="container">
      <h1 style={{ fontSize: 33 }}>PASSWORD GENERATOR</h1>
      {/* <div className="center"> */}
      <div className="display-container">
        {/* data-passwordDisplay custom data attribute */}
        <input
          value={password}
          ref={inputPassword}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          readOnly=""
          name="ptext"
          className="display"
          placeholder="PASSWORD"
        />
        <button className="copyBtn" onClick={copyPassword}  >
          <span className="tooltip" ref={copyBtn}>Copy</span>
          <img src={copy} alt="copy" width={23} height={23} />
          <audio src={mouseClick} id="clickAudio" ref={copyAudio} />

        </button>
      </div>
      <div className="input-container">
        {/* password length section */}
        <div className="length-container">
          <p>Password length</p>
          <p>{length}</p>
        </div>
        <input
          type="range"
          min={3}
          max={20}
          value={length}
          onChange={(e) => setIsLength(e.target.value)}
          className="slider"
          step={1}

        />
        {/* Checkbox group */}
        <div className="check">
          <input type="checkbox"
            checked={isUpperCase}
            onChange={() => setIsUpperCase(!isUpperCase)}
            id="upperCase"
          />
          <label htmlFor="upperCase">Include upperCase Latter</label>
        </div>
        <div className="check">
          <input type="checkbox" id="Lowercase"
            checked={isLowerCase}
            onChange={() => setIsLowerCase(!isLowerCase)}
          />
          <label htmlFor="Lowercase">Include Lowercase Letters</label>
        </div>
        <div className="check">
          <input type="checkbox" id="Numbers"
            checked={isNumber}
            onChange={() => setIsNumber(!isNumber)}
          />
          <label htmlFor="Numbers">Include Numbers</label>
        </div>
        <div className="check">
          <input type="checkbox"
            checked={isSymbol}
            onChange={() => setIsSymbol(!isSymbol)}
            id="Symbols" />
          <label htmlFor="Symbols">Include Symbols</label>
        </div>
        {/* strength */}
        <div className="strength-container">
          <p>strength</p>
          <div ref={indicator} className="indicator" />
        </div>
        {/* generate password button */}
        <p id="error-para">Please Select the checkBox</p>
        <button className="generateButton" onClick={passwordGenerator}>generate password</button>
      </div>
    </div>
    // </div>

  )
}

export default App
