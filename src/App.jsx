import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+~|}{:;?><";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)
  
  }, [length, numberAllow, charAllow, setPassword]);


  useEffect(()=>{
      passwordGenerator();
  },[length, numberAllow, charAllow, setPassword]);



  const copyText = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-white mt-10">Password Generator</h1>
      <main className="container h-full pb-10 mx-auto mt-10 bg-gray-700 rounded-3xl">
        <div className="flex justify-center p-10">
          <input
            className="w-1/2 p-2 rounded-l-lg text-xl font-bold"
            type="text"
            value={password}
            ref={passwordRef}
          />
          <button className="bg-red-500 px-8 rounded-r-lg text-xl font-bold text-white flex items-center hover:text-black transition-all hover:duration-200" onClick={copyText}>Copy</button>
        </div>
        <div className="w-full flex justify-around items-center">
          <div className="flex items-center gap-2">
            <input
              className="w-[15rem]"
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="font-bold text-xl" >Length: {length}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="w-[20px] h-[20px]"
              type="checkbox"
              defaultChecked={numberAllow}
              onChange={() => setNumberAllow((prev) => !prev)}
            />
            <label className="text-xl font-bold">Number</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="w-[20px] h-[20px]"
              type="checkbox"
              defaultChecked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label className="text-xl font-bold">Characters</label>
          </div>

        </div>
     

      </main>


    </>
  )
}

export default App