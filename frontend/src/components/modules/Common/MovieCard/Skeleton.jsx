const Skeleton = () => {
  return (
    <div className="grid grid-cols-7 gap-2 p-1 mr-[50px]">
      <div className="w-80">
        <div className="w-full h-40 skeleton"></div>
      </div>
    </div>
  );
};

export default Skeleton;
