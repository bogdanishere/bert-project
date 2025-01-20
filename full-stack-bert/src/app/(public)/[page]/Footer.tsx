import Image from "next/image";
import imageIcon from "../../../../public/icon.png";

export default function Footer() {
  return (
    <footer className="dark:bg-[#333333]">
      <div
        className="
        bg-[rgba(0,0,0,0.8)]
        text-[#f7f7f7]
        pt-[20rem]
        pb-[10rem]
        text-[1.4rem]
        [clip-path:polygon(0_25vh,_100%_0,_100%_100%,_0_100%)]
        max-[600px]:[clip-path:polygon(0_15vh,_100%_0,_100%_100%,_0_100%)]
      "
      >
        <div className="text-center mb-[6rem] w-full flex justify-center">
          <Image
            src={imageIcon}
            alt="Full logo"
            className="w-[20rem] h-[20rem]"
          />
        </div>

        <div className="text-center">
          <div
            className="
              w-4/5
              mx-auto
              flex
              justify-between
              items-center
              border-t
              border-[#777]
              pt-[2rem]
              max-[600px]:flex-col
            "
          >
            <span>
              Build by
              <a
                href="https://github.com/bogdanishere"
                className="
                  pl-[1rem]
                  pr-[2rem]
                  no-underline
                  uppercase
                  inline-block
                  transition
                  duration-200
                  hover:[transform:rotate(5deg)_scale(1.3)]
                  hover:shadow-[0_1rem_2rem_rgba(0,0,0,0.2)]
                  hover:text-[#38bdf8]
                "
              >
                {" "}
                Bogdan Vasilescu and Viorel Baciu
              </a>
            </span>
            <span>
              Copyright &copy; by Bogdan Vasilescu and Viorel Baciu. All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
