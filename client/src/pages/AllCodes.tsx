import CodeItem from "@/components/CodeItem";
import { useGetAllCodesQuery } from "@/redux/slices/api";

export default function AllCodes() {
  const { data: allCodes } = useGetAllCodesQuery();

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    // Add any other grid-related styles here
  };

  return allCodes?.length !== 0 ? (
    <div className="gap-3 p-3 pt-[80px]" style={gridStyles}>
      {" "}
      {allCodes?.map((codeItem) => {
        return (
          <CodeItem deleteBtn={false} key={codeItem._id} data={codeItem} />
        );
      })}
    </div>
  ) : (
    <>
      <p className="block text-center font-mono text-slate-600 p-3 text-2xl">
        No code found.
      </p>
    </>
  );
}
