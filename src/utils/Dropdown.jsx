import { useEffect, useRef, useState } from "react";

function Dropdown({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const divElemt = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!divElemt.current) {
                return;
            }

            if (!divElemt.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handler, true);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    const renderedOptions = options.map((option) => {
        return (
            <div
                className="hover:bg-sky-100 rounded cursor-pointer p-1"
                onClick={() => handleOptionClick(option)}
                key={option.value}
            >
                {option.label}
            </div>
        );
    });

    return (
        <div ref={divElemt} className="w-36 relative ">
            <div
                className="flex justify-between items-center cursor-pointer border rounded px-3 py-2 shadow bg-white w-full "
                onClick={handleClick}
            >
                {value?.label || "Select ..."}
                <i
                    className={`bx ${
                        isOpen ? "bxs-chevron-up" : "bxs-chevron-down"
                    }`}
                ></i>
            </div>
            {isOpen && (
                <div className="absolute top-full border rounded p-3 shadow bg-white w-full">{renderedOptions}</div>
            )}
        </div>
    );
}
export default Dropdown;
