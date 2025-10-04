"use client";
import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

type PersonDetail = {
    img: string;
    name: string;
    designation: string;
    linkdin_profile?: string;
};

type Transformation = {
    old_designation: string;
    old_title: string;
    new_designation: string;
    new_title: string;
};

type Testimonial = {
    id: number;
    isTypeVideo: boolean;
    video_url?: string;
    description?: string;
    person_detail: PersonDetail;
    transformation: Transformation;
};

type Props = {
    t: Testimonial;
    onReadMore: (text: string) => void;
};

const TestimonialCard: React.FC<Props> = ({ t, onReadMore }) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            setIsOverflowing(el.scrollHeight > el.clientHeight);
        }
    }, [t.description]);

    return (
        <div className="relative flex flex-col justify-between p-3 sm:p-4 lg:p-5 gap-3 sm:gap-4 lg:gap-5 border border-black bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl transition overflow-hidden drop-shadow-[2px_2px_0_black] sm:drop-shadow-[3px_3px_0_black] lg:drop-shadow-[4px_4px_0_black] h-full">
            {/* Video or Text */}
            {t.isTypeVideo ? (
                <div className="relative h-[200px] sm:h-[250px] lg:h-[300px]">
                    <iframe
                        className="w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl border border-black"
                        src={t.video_url}
                        title="Testimonial Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className="relative">
                    {t.description && (
                        <>
                            <p
                                ref={textRef}
                                className="text-black text-base sm:text-lg lg:text-xl font-light line-clamp-4 sm:line-clamp-9"
                            >
                                {t.description}
                            </p>
                            {isOverflowing && (
                                <button
                                    className="text-orange cursor-pointer font-medium text-sm sm:text-base transition duration-300 hover:underline mt-2"
                                    onClick={() => onReadMore(t.description!)}
                                >
                                    Read More
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Profile Section */}
            <div className="relative">
                <div className="flex items-center mb-3 sm:mb-4 gap-3 sm:gap-4">
                    <div className="relative flex-center">
                        <img
                            src={t.person_detail.img}
                            alt={t.person_detail.name}
                            className="size-12 sm:size-16 lg:size-[72px] bg-gray-300 rounded-full"
                        />
                        {t.person_detail.linkdin_profile && t.person_detail.linkdin_profile?.length > 0 && (
                            <a
                                href={t.person_detail.linkdin_profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-0 right-0"
                            >
                                <Icon icon="skill-icons:linkedin" className="size-3 sm:size-4" />
                            </a>
                        )}
                    </div>
                    <div className="flex flex-col gap-0 flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg lg:text-xl font-bold truncate">
                            {t.person_detail.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                            {t.person_detail.designation}
                        </p>
                    </div>
                </div>

                {/* Career Path */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <div className="text-black flex flex-col gap-0 text-center flex-1 min-w-0">
                        <p className="text-sm sm:text-base lg:text-xl font-semibold truncate">
                            {t.transformation.old_designation}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                            {t.transformation.old_title}
                        </p>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                        <svg
                            className="w-8 sm:w-10 lg:w-[51px] h-3 sm:h-4 lg:h-4"
                            viewBox="0 0 51 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 8V9H50V8V7H0V8Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <div className="text-black flex flex-col gap-0 text-center flex-1 min-w-0">
                        <p className="text-sm sm:text-base lg:text-xl font-semibold truncate">
                            {t.transformation.new_designation}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                            {t.transformation.new_title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
