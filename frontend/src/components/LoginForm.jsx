const LoginForm = ({ setMode, email, setEmail, password, setPassword, handleLogin }) => {
    return (
        <>
      <h2 className="text-3xl font-bold mb-6 text-gray-200">Login to CareerLink!</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg shadow-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg shadow-md"
      />
      <button onClick={handleLogin} className="w-full px-5 py-3 font-bold cursor-pointer text-lg bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg transform active:scale-95">
        Login
      </button>
      <p className="mt-4 text-gray-400 text-sm">
        Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setMode("signup")}>Sign up here</span>
      </p>
    </>
    )
};

export default LoginForm;  