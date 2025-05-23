import Barcode from "react-barcode";

export function FormHeader({ code }: { code: string }) {
  return (
    <div className="items-center grid grid-cols-2 h-40">
      <div className="flex flex-col gap-4">
        <div>
          <img src="/logo.png" className="h-20" />
        </div>
        <Barcode
          value={code}
          fontSize={60}
          format="CODE39"
          width={8}
          className="w-fit h-10"
        />
      </div>
      <div className="flex justify-center items-center border h-full"></div>
    </div>
  );
}
