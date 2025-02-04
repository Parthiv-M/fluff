import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

const Alert = ({
    width,
    classes,
    backgroundColor,
    textColor,
    trailingChildren,
    trailingIconAltText,
    trailingIconPath,
    trailingAction,
    message,
    show,
    setParentShowAlert
}: {
    backgroundColor: string;
    textColor?: string;
    width: string;
    classes?: string;
    trailingIconPath?: string;
    trailingIconAltText: string;
    trailingAction: string;
    message: string;
    trailingChildren: ReactNode | ReactNode[],
    show: boolean;
    setParentShowAlert: Dispatch<SetStateAction<boolean>>
}) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showAlert, setShowAlert] = useState<boolean>(show);
    useEffect(() => {
        setShowAlert(show);
    }, [show])

    const dismissAlert = () => {
        setShowAlert(false);
        setParentShowAlert(false)
    }

    const baseClasses: string = "justify-between fixed bottom-10 rounded-sm py-3 px-4 z-20";
    let computedClasses: string = baseClasses;
    if (width) computedClasses += (" w-" + width);
    if (backgroundColor) computedClasses += (" bg-" + backgroundColor);
    if (textColor) computedClasses += (" text-" + textColor);
    if (classes) computedClasses += classes;
    if (show) computedClasses += " flex md:flex-nowrap md:gap-0 flex-wrap gap-4"
    else computedClasses += " hidden";

    return (
        <div className={computedClasses}>
            <div className="flex gap-2 w-full">
                <p>{message}</p>
            </div>
            <div className="flex gap-3 w-full justify-between md:justify-end items-center">
                <div>
                    {trailingChildren}
                </div>
                {
                    trailingIconPath
                    && <Image
                        onClick={trailingAction === "dismiss" ? dismissAlert : () => { }}
                        className="cursor-pointer"
                        src={trailingIconPath}
                        height={17}
                        width={17}
                        alt={trailingIconAltText}
                    />
                }
            </div>
        </div>
    )
}

export default Alert;