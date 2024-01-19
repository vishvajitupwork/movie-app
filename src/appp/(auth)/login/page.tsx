import SignForm from "../../../components/signForm";

export default function Page() {
  return (
    <section className="flex min-h-[calc(100vh-117px)] flex-col items-center justify-center p-24">
      <div className="max-w-[300px] w-full">
        <h2 className=" text-[64px] font-semibold mb-10 text-center">
          Sign in
        </h2>
        <SignForm />
      </div>
    </section>
  );
}
