import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

const Alert = ({
    width,
    classes,
    backgroundColor,
    textColor,
    leadingIconAltText,
    leadingIconPath,
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
    leadingIconPath?: string;
    trailingIconPath?: string;
    leadingIconAltText?: string;
    trailingIconAltText: string;
    trailingAction: string;
    message: string;
    trailingChildren: ReactNode | ReactNode[],
    show: boolean;
    setParentShowAlert: any
}) => {

    const [showAlert, setShowAlert] = useState<boolean>(show);
    useEffect(() => {
        setShowAlert(show);
    }, [])

    const dismissAlert = () => {
        setShowAlert(false);
        setParentShowAlert(false)
    }
    const revealAlert = () => {
        setShowAlert(true);
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