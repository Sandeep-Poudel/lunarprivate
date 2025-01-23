import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children, setOpen }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setOpen]);

    return ReactDOM.createPortal(
        <div className="relative">
            <div
                className="inset-0 z-[500] bg-black bg-opacity-90 flex justify-center items-center fixed "
                onClick={() => setOpen(false)}
            >
                <div onClick={(e) => e.stopPropagation()}>{children}</div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default Modal;
