import { useState, useCallback,useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);

  const [numAllowed, setnumAllowed] = useState(false);

  const [charAllowed, setcharAllowed] = useState(false);

  const [password, setPassword] = useState("");

// use ref hook 
   const passwordRef = useRef(null)



  const passwordGen = useCallback(() => {
    let pswrd = "";
    let strng = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw";

    if (numAllowed) {
      strng += "0123456789";
    }
    if (charAllowed) {
      strng += "!@#$%^&*()~+-=`[]{};.?/|";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * strng.length + 1);

      pswrd += strng.charAt(char);
    }

    setPassword(pswrd);
  }, [length, numAllowed, charAllowed, setPassword])

      const copyPaswrdToClipboard = useCallback(()=> {
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0,8)
        window.navigator.clipboard.writeText(password)
      },[password])

    useEffect(()=>{passwordGen()},
    [length, numAllowed, charAllowed, passwordGen])
   
  return (
    <>
      <h1 className="text-white text-4xl  text-center p-4 ">
        Password generator
      </h1>
      <div
        className="h-18 w-full max-w-md mx-auto shadow-md rounded-lg 
     px-4 my-8 py-4 flex flex-col text-orange-600 bg-zinc-400  text-xl"
      >
        <div
          className="flex shadow rounded-lg  w-full
      overflow-hidden mb-4 ">

          <input
            type="text"
            value={password}
            className="outline-none w-full px-1 py-2"
            placeholder="password"
            readOnly
             ref={passwordRef}
          />
          <button
             onClick={copyPaswrdToClipboard}
             className="outline-none bg-blue-500 text-white 
             px-3 py-0.5 shrink-0 hover:bg-pink-500 active:scale-95 
             transition-transform duration-150"

          >
            copy
          </button>
         </div>


          <div 
        className=" flex w-full gap-y-4">
          <div className=" gap-x-2  ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(parseInt(e.target.value));
              }}
            />
            <label> length : {length} </label>
          </div>
           <div className=" flex justify-evenly w-full gap-y-4">
          <div className=" flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() =>{
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
          </div>
        </div>

      </div>
     




   
    </>
  );
}

export default App;
