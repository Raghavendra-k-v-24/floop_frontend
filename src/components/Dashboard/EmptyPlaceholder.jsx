// images
import Ghost from "@/assets/ghost.svg";

const EmptyPlaceholder = ({ message }) => {
  return (
    <div className="w-full h-100 bg-background rounded-2xl gap-2 flex flex-col items-center justify-center">
      <img src={Ghost} alt="Ghost" className="w-10 h-10" />
      <h1 className="text-xs text-wrap text-center text-secondary">
        {message}
      </h1>
    </div>
  );
};

export default EmptyPlaceholder;
