import CodeItem from "@/components/CodeItem";
import { useGetMyCodesQuery } from "@/redux/slices/api";

export default function MyCodes() {
  const { data: myCodes } = useGetMyCodesQuery();

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    // Add any other grid-related styles here
  };

  return myCodes?.length !== 0 ? (
    <div className=" p-3 gap-3 pt-[80px]" style={gridStyles}>
      {myCodes?.map((item) => {
        return <CodeItem deleteBtn={true} key={item._id} data={item} />;
      })}
    </div>
  ) : (
    <>
      <p className="text-center font-mono text-slate-600 p-3 text-2xl">
        You don't have any saved codes.
      </p>
    </>
  );
}
