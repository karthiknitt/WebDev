import Image from "next/image";
export const metadata = {
  title: "Page Not Found",
};
export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="flex flex-col mx-auto py-4 justify-center items-center gap-4">
        <h2 className="text-2xl"> Page Not Found</h2>

        <Image
          className="m-0 rounded-xl"
          height={300}
          width={300}
          src="/images/not-found.png"
          sizes="300px"
          alt="Page Not Found"
          title="Page Not Found"
          priority={true}
        />
      </div>
    </div>
  );
}
