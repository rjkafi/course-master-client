export default function Hero() {
  return (
    <>
      <div className="pt-6 sm:pt-6 md:pt-10 lg:pt-16 pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0">
        <div className="w-full max-w-[937px] lg:w-[937px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Main Heading  */}
            <div className="w-full max-w-[748.71px] lg:w-[748.71px] text-center flex justify-center flex-col text-[#37322F] text-[24px] xs:text-[28px] sm:text-[36px] md:text-[52px] lg:text-[80px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.23] lg:leading-[1.24] px-2 sm:px-4 md:px-0 font-serif">
              Professionals and <br />
              Life Long
              <br />
              Learning Comes
              <br />
              Here
            </div>
            {/* <!-- Subheading --> */}
            <div className="w-full max-w-[506.08px] lg:w-[506.08px] text-center flex justify-center flex-col text-[rgba(55,50,47,0.80)] sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-normal lg:leading-7 px-2 sm:px-4 md:px-0 lg:text-lg font-medium text-sm">
              Life Tech bootcamps and online classes to kickstart's
              <br className="hidden sm:block" />
              your career
            </div>
          </div>
        </div>

        {/* Button  */}
      </div>
    </>
  );
}
