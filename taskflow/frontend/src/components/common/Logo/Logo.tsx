import logo from "../../../assets/images/Logo.png";

function Logo() {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex justify-center">
        <img
          src={logo}
          alt="TaskFlow Logo"
          className="h-16 w-16 object-contain"
        />
      </div>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
        TaskFlow
      </h1>

      <p className="text-sm text-slate-500">
        Precision engineering for high-performance teams.
      </p>
    </div>
  );
}

export default Logo;