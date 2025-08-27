import { useCallback, useState, useEffect } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [charAlow, setCharAlow] = useState(true);
  const [numalow, setNumalow] = useState(true);
  const [Password, setPassword] = useState("");

  const generatepassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (charAlow) str += "!@#$%^&*(){}<>?[]";
    if (numalow) str += "1234567890";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numalow, charAlow, setPassword]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    generatepassword();
  }, [length, numalow, charAlow, generatepassword]);

  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-gray-900 text-white">
        <h1 className="text-2xl font-bold text-center mb-6">🔐 Password Generator</h1>

        {/* Password Box */}
        <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={Password}
            className="text-black bg-yellow-50 outline-none w-full py-3 px-4 text-lg rounded-l-lg text-center"
            readOnly
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 transition-all px-5 py-3 text-white font-semibold rounded-r-lg active:scale-95"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer accent-indigo-500 w-2/3"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              checked={numalow}
              className="w-5 h-5 accent-pink-500 cursor-pointer"
              onChange={() => {
                setNumalow((prev) => !prev);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Include Special Characters</label>
            <input
              type="checkbox"
              checked={charAlow}
              className="w-5 h-5 accent-green-500 cursor-pointer"
              onChange={() => {
                setCharAlow((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
