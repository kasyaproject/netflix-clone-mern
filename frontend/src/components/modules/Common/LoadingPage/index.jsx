const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-950">
      <span className="w-64 h-64 loading loading-spinner text-error"></span>

      <div className="absolute">
        <p className="text-lg font-bold">Loading...</p>
      </div>
    </div>
  );
};
export default LoadingPage;
