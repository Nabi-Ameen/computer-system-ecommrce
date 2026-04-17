import React from 'react'

const Typography = ({ varient, effect, children, style }) => {

    const tagVarient = {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
        p: "p",
        small: "small"
    }

    const effectStyle = {
        muted: "text-gray-400"
    }



    const tagStyle = {
        h1: "text-18 md:text-[30px] lg:text-[45px]",
        h2: "text-16 md:text-[26px] lg:text-[40px]",
        h3: "text-14 md:text-[20px] lg:text-[25px]",
        h4: "text-14 md:text-[18px] lg:text-[23px]",
        h5: "text-12 md:text-[16px] lg:text-[18px]",
        h6: "text-12 md:text-[14px] lg:text-[16px] font-bold",
        p: "text-12 md:text-[14px] lg:text-[16px]",
        small: "text-10 md:text-[12px] lg:text-[14px]",

    }

    const Tag = tagVarient[varient]
    return (
        <Tag className={`${tagStyle[varient]} ${effectStyle[effect]} ${style}`}>{children}</Tag>
    )
}

export default Typography