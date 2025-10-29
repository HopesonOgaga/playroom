import FeaturedPrograms from "../components/featurd";
import Games from "../components/grid";
import FOOTER from "./footer";
import HEADER from "./header";

function HOME() {
  return (
    <>
      <HEADER></HEADER>
      <section className="flex h-full flex-col gap-10 justify-center items-center mt-25 p-10">
        <div>
          <p className=" text-center font-bold text-2xl capitalize md:text-5xl">
            {" "}
            welcome to playroom{" "}
          </p>
        </div>
        <section className="flex w-full h-full justify-between items-center">
          <div className="flex gap-4 flex-col ">
            <p>
              <b> CREATE. COMPETE. CONQUER. </b>
            </p>
            <p>
              with over millions of gameply evdry week playroom is the platform
              of choice for top publisher and pro gamers around the world Prow
              scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
              yardarm. Pinnace holystone mizzenmast quarter crow's nest
              nipperkin grog yardarm hempen halter furl. Swab barque interloper
              chantey doubloon starboard grog black jack gangway rutters.
            </p>
            <div>
              <button className="w-32 h-12  rounded-md border-0 shadow-md capitalize font-semibold">
                get started
              </button>
            </div>
          </div>
          {/* image of games */}
          <div className="rounded-b-md shadow-md border-2 border ">
            <img src="/images/image.png" alt=""></img>
          </div>
        </section>
        <section>
          <div>
           
            <Games></Games>
            <FeaturedPrograms></FeaturedPrograms>
          </div>
        </section>
      </section>
      <FOOTER></FOOTER>
    </>
  );
}

export default HOME;
