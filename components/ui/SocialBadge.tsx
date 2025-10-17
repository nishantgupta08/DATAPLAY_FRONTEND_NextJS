import Image from "next/image";
import Link from "next/link";
import React from "react";

const SocialBadge = () => {
    return (
        <div
            className="
        flex flex-col justify-center 
        gap-0 
        fixed bottom-[2%] right-[2%] 
        z-20
      "
        >
            <div
                className="
          ml-auto 
          w-max 
          rounded-full 
          shadow-[0_15px_25px_rgba(0,0,0,0.15),_0_5px_10px_rgba(0,0,0,0.05)]
        "
            >
                <Link href="https://wa.me/917427071631" target="_blank">
                    <Image
                        src="/assets/icons/whatsapp-logo.png"
                        height={55}
                        width={55}
                        alt="whatsapp-logo"
                    />
                </Link>
            </div>
        </div>
    );
};

export default SocialBadge;
